(ns nchart.core
  (:require [clojure.browser.repl]
            [clojure.core.rrb-vector :as rrb]
            [clojure.set :as set]
            [clojure.string :as s]
            [figwheel.client :as fw :include-macros true]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]))

(def localhost? (-> js/window
                    (.-location)
                    (.-host)
                    (.indexOf "localhost")
                    (>= 0)))


(if localhost?
  (do
    (enable-console-print!)
    (fw/watch-and-reload
     :websocket-url   "ws://localhost:3449/figwheel-ws"
     :jsload-callback (fn [] (print "reloaded")))))


(defrecord Node [id layer-id characters])
(defrecord Edge [src dest characters])
(defrecord Layer [id duration nodes marked])
(defrecord SegmentContainer [segments])
(defrecord Segment [edge])
(defrecord AccumulatorNode [weight node-edges is-seg-c])


(defn- add-edge [graph last-node node characters]
  "Creates an edge and adds it to the graph as a whole and to each participating node"
  (let [forward-edge (Edge. last-node node characters)
        ;; We record the "true" forward edge here, for marking edges that
        ;; cross segment containers. The ordering algorithm works through
        ;; the graph backwards on every second pass, and the cross counting
        ;; algorithm switches the order of the layers depending on which
        ;; is smaller, but we always layout and draw the graph forward, so the
        ;; marked edges need to be the forward ones.
        edge-1 (-> forward-edge
                   (assoc :forward-edge forward-edge))
        edge-2 (-> (Edge. node last-node characters)
                   (assoc :forward-edge forward-edge))]
    (-> graph
        (update-in [:succs last-node] (fnil conj #{}) edge-1)
        (update-in [:preds node] (fnil conj #{}) edge-2))))


(defn- make-node [graph layer-id input]
  "Utility function that was abstracted to avoid mutually recursing back to add-node
  when creating helper (p, q, and r) nodes. In particular, helper nodes don't require
  character group processing or bookkeeping metadata"
  (let [node-num (count (-> graph :layers (get layer-id) :nodes))
        node-id (keyword (s/join "-" [layer-id node-num]))]
    (map->Node (assoc input :id node-id :layer-id layer-id))))


(defn- add-p-q-nodes [graph last-node node edge-characters]
  "When an edge would span more than 2 layers, two helper nodes are created. P nodes
  are placed on the layer following last-node's layer, and q nodes are placed on the
  layer preceding node's layer. Edges are then drawn from last-node -> p node and from
  p node to q node, regardless of the span between the p node and the q node"
  (let [proto-node {:characters edge-characters}
        p-layer-id (inc (:layer-id last-node))
        q-layer-id (dec (:layer-id node))
        p-node (make-node graph p-layer-id proto-node)
        q-node (make-node graph q-layer-id proto-node)
        g (-> graph
              (update-in [:layers p-layer-id :nodes] conj p-node)
              (update-in [:layers q-layer-id :nodes] conj q-node)
              (update-in [:p] conj p-node)
              (update-in [:q] conj q-node)
              (add-edge last-node p-node edge-characters)
              (add-edge p-node q-node edge-characters))]
    [g q-node]))


(defn- add-r-node [graph last-node node edge-characters]
  "R nodes are created to assist in drawing the graph, when an edge skips over a layer.
  In that case, the r node is placed in the intervening layer, and an edge is created
  from last-node to r node"
  (let [r-layer-id (inc (:layer-id last-node ))
        r-node (make-node graph r-layer-id {:characters edge-characters})
        g (-> graph
              (update-in [:layers r-layer-id :nodes] conj r-node)
              (update-in [:r] conj r-node)
              (add-edge last-node r-node edge-characters))]
    [g r-node]))


(defn- process-edge-characters [graph last-node node edge-characters]
  "Create edges and possibly new helper nodes for a set of characters that
  remain together from last-node to node"
  (let [span (- (:layer-id node) (:layer-id last-node))
        [g last-n] (cond
                    (= span 2) (add-r-node graph last-node node edge-characters)
                    (> span 2) (add-p-q-nodes graph last-node node edge-characters)
                    :else [graph last-node])]
    (add-edge g last-n node edge-characters)))


(defn- process-characters
  "Process each set of characters, where a set is defined as those characters
  present in the current node that also share their last node (ie. they define
  an edge in the graph)"
  [graph node]
  (loop [graph graph
         characters (:characters node)]
     (if (empty? characters)
       graph
       (let [character (first characters)
             last-node (-> graph :last-nodes-by-character character)
             [g c] (if last-node
                     (let [last-node-characters (-> graph
                                                    :last-nodes-by-node
                                                    ((:id last-node) #{}))
                           edge-characters (set/intersection last-node-characters characters)
                           g (process-edge-characters graph last-node node edge-characters)]
                       [g (set/difference characters last-node-characters)])
                     [graph (disj characters character)])]
         (recur g c)))))


(defn add-node
  "Create a new node, then deduce and create edges to that node
  from previous layers. Then, update the bookkeeping metadata for each
  character in a node for calculating future edges from this node"
  [graph layer-id input]
  (let [node (make-node graph layer-id input)]
    (loop [new-g (-> graph
                     (process-characters node)
                     (update-in [:layers layer-id :nodes] conj node))
           characters (:characters node)]
      ;; Update node metadata for all characters in the new node
      (if (empty? characters)
        new-g
        (let [character (first characters)
              last-node (-> new-g :last-nodes-by-character character)
              disappeared (contains? (-> node :path-mods character) :disappeared)
              g (cond-> new-g
                        disappeared (update-in [:last-nodes-by-character] dissoc character)
                        (not disappeared) (->
                                           (assoc-in [:last-nodes-by-character character] node)
                                           (update-in [:last-nodes-by-node (:id node)] (fnil conj #{}) character))
                        last-node (update-in [:last-nodes-by-node (:id last-node)] disj character))]
          (recur g (rest characters)))))))


(defn add-layer
  "Create the layer of our graph representation, and recursively
  create and add nodes from the groups in the input layer"
  [graph input-layer]
  (let [layers (:layers graph)
        layer-id (count layers)
        layer (Layer. layer-id
                      (input-layer :duration)
                      []
                      #{})]
    (loop [g (update-in graph [:layers] conj layer)
           input-groups (input-layer :groups)]
      (if (empty? input-groups)
        g
        (recur (add-node g layer-id (first input-groups))
               (rest input-groups))))))


(defn make-sparse-graph
  "Creates a sparse graph, as defined in ESK"
  ([input]
     (make-sparse-graph input
                        {:layers []
                         :succs {}
                         :preds {}
                         :p #{}
                         :q #{}
                         :r #{}
                         :last-nodes-by-character {}
                         :last-nodes-by-node {}}))
  ([input graph]
     (if (empty? input)
       graph
       (let [g (add-layer graph (first input))]
         (recur (rest input) g)))))


(def segment-containers
  "A lazy sequence of empty segment containers"
  (repeat (SegmentContainer. [])))


(defn replace-p-nodes
  "Step 1 of ESK - replace all p nodes with segments and merge segment containers"
  [graph layer]
  (->> (:alternating layer)
       (map #(if (contains? (:p graph) %)
               ;; p nodes always have only one successor
               (SegmentContainer. [(-> (:succs graph) (get %) first)])
               %))
       (reduce #(if (and (instance? SegmentContainer (peek %1))
                         (instance? SegmentContainer %2))
                  (update-in %1 [(dec (count %1)) :segments] rrb/catvec (:segments %2))
                  (conj %1 %2))
               [])
       (assoc layer :minus-ps)))


(defn- set-positions
  "Positions in an alternating layer are used to calculate the order of the next layer.
  ESK's description of the position algorithm is almost willfully circuitous and obtuse,
  so here's a simplified description: An item's position in an alternating layer is the
  sum of the size of all previous items, plus 1, where the size of a segment container
  is the number of segments it contains, and the size of a node is 1.

  Also, it doesn't really matter what seed you choose for the initial value of the sum. I
  chose -1, which is implied by the description in ESK."
  [layer]
  (loop [alt (:alternating layer)
         current-position -1
         positions {}]
    (if (empty? alt)
      (assoc layer :positions positions)
      (let [item (first alt)
            ;; When (count alt) is odd, item is a SegmentContainer
            c-p (if (odd? (count alt))
                  (+ current-position (count (:segments item)))
                  (inc current-position))]
        (recur (rest alt) c-p (assoc positions item (inc current-position)))))))


(defn- set-qs-non-qs
  "ESK requires a layer's nodes to be split into lists of q-nodes and non-q-nodes"
  [graph layer]
  (->> ((juxt filter remove) #(contains? (:q graph) %) (:nodes layer))
       (interleave [:qs :non-qs])
       (apply (partial assoc layer))))


(defn- get-measure
  "Calculate the average weighted position of a node's predecessors"
  [graph node pred-positions]
  (let [preds (get-in graph [:preds node])]
    (if preds
      (apply / (->> preds
                    (map #(let [weight (count (:characters %))
                                pos (get pred-positions (:dest %))]
                            [(* weight pos) weight]))
                    (reduce #(-> %1
                                 (update-in [0] + (get %2 0))
                                 (update-in [1] + (get %2 1)))
                            [0 0])))
      0)))


(defn set-measures
  "Step 2 of ESK - Use nodes' predecessors to calculate a 'measure' for the nodes
  and containers in a layer, which is used for ordering"
  [graph layer next-layer]
  (let [positions (:positions layer)
        non-qs (:non-qs next-layer)
        measures (reduce #(assoc %1 %2 (get-measure graph %2 positions)) {} non-qs)]
    (assoc next-layer :measures measures)))


(defn order-next-layer
  "Step 3 of ESK - Considers a layer as two lists, one of nodes and the other of segment
  containers. The items in these lists have 'measures' (for segment containers, this is
  equivalent to the position in the previous layer, so we just use that), and we merge
  the two lists into a single ordering based on these measures."
  [layer next-layer]
  (let [minus-ps (:minus-ps layer)
        positions (:positions layer)
        non-qs (:non-qs next-layer)
        measures (:measures layer)
        ordered (loop [nodes (sort-by #(get measures %) non-qs)
                       segments (sort-by #(get positions %) (take-nth 2 minus-ps))
                       pos positions
                       ord []]
                  (if (or (empty? nodes) (empty? segments))
                    ;; ESK's algorithm doesn't specify what to do with leftover things
                    ;; I think this is because it doesn't take into account nodes that don't have
                    ;; parents in layers > 0. In any case, at most one of rem-nodes or rem-segs
                    ;; will be non-empty
                    (-> ord (into nodes) (into (filter #(seq (:segments %)) segments)))
                    (let [node-1 (first nodes)
                          seg-1 (first segments)
                          node-measure (get measures node-1)
                          seg-position (get pos seg-1)
                          node-first (<= node-measure seg-position)
                          seg-first (>= node-measure (+ seg-position (count (:segments seg-1))))]
                      (cond node-first (recur (rest nodes) segments pos (conj ord node-1))
                            seg-first (recur nodes (rest segments) pos (conj ord seg-1))
                            :else (let [k (.ceil js/Math (- node-measure seg-position))
                                        s-1 (update-in seg-1 [:segments] rrb/subvec 0 k)
                                        s-2 (update-in seg-1 [:segments] rrb/subvec k)]
                                    (recur
                                     (rest nodes)
                                     (cons s-2 segments)
                                     (assoc pos s-2 (+ (get pos seg-1) 1))
                                     (into ord [s-1 node-1])))))))]
    (assoc next-layer :without-qs ordered)))


(defn add-qs
  "Step 4 of ESK - takes the results of step 3, which doesn't include the q-nodes, and adds them,
  splitting their segment containers in the process"
  [next-layer]
  (let [ordered (:without-qs next-layer)
        qs (:qs next-layer)
        flat (->> ordered
                  (mapcat #(if (instance? SegmentContainer %)
                             (:segments %)
                             [%]))
                  (map #(if (and (instance? Segment %)
                                 (contains? qs (-> % :edge :dest)))
                          (-> % :edge :dest)
                          %)))
        with-qs (loop [f flat
                       seg-c (take 1 segment-containers)
                       layer []]
                  (if (empty? f)
                    (if (empty? (:segments seg-c))
                      layer
                      (conj layer seg-c))
                    (let [item (first f)]
                      (if (instance? Segment item)
                        (recur (rest f) (update-in seg-c [:segments] conj item) layer)
                        (if (empty? (:segments seg-c))
                          (recur (rest f) seg-c (conj layer item))
                          (recur (rest f) [] (conj layer seg-c item)))))))]
    (assoc next-layer :with-qs with-qs)))


(defn ensure-alternating
  "Step 6 of ESK, ensure that the resulting layer is alternating. We do this in a
  different order than the paper first because we can due to not working with
  mutable state, and second because it just flows better this way. Specifically, it
  is conceptually easier to think of it as an algorithm for taking one alternating
  layer and using it to produce the next alternating layer in the graph (steps 1-4, 6),
  and then a separate algorithm that counts the crossings that result from the
  orderings on those two layers (step 5)."
  [next-layer]
  (->> (:with-qs next-layer)
       (partition-by #(instance? SegmentContainer %))
       (mapcat (fn [items]
                 (if (instance? SegmentContainer (first items))
                   [(reduce #(update-in %1 [:segments] rrb/catvec (:segments %2))
                            items)]
                   (interpose (first segment-containers) items))))
       vec
       (#(if (instance? SegmentContainer (first %))
           %
           (rrb/catvec (vec (take 1 segment-containers)) %)))
       (#(if (instance? SegmentContainer (peek %))
           %
           (rrb/catvec % (vec (take 1 segment-containers)))))
       (assoc next-layer :alternating)))



(defn- sorted-edge-order
  "Sorts edges between two ordered layers first by their index in the source
  layer, and then by their index in the destination layer. Then, returns seq
  of [order edge] pairs of the edge targets in the destination layer, using
  this edge ordering"
  [ordered next-ordered graph-edges]
  (let [next-order-map (->> next-ordered
                            (map-indexed #(-> [%2 %1]))
                            (into {}))
        ;; Edges between segment containers need to be counted as well
        ;; but they change with each new ordering, so we just temporarily
        ;; merge the current segment edges with the never-changing
        ;; node -> node edges
        edges (->> next-ordered
                   (filter #(instance? SegmentContainer %))
                   (map (juxt identity
                              (fn [seg-c]
                                (mapcat #(-> % :edge :characters)
                                        (:segments seg-c)))))
                   (map (fn [[seg-c characters]]
                          [seg-c (Edge. seg-c seg-c characters)]))
                   (into {})
                   graph-edges)]
    (->> ordered
         (mapcat (fn [item]
                   (sort-by #(get next-order-map (:dest %))
                            (get edges item))))
         (map #(-> [(get next-order-map (:dest %)) %])))))


(defn- next-power-of-2-minus-1
  "A helper for cross counting; the size of the accumulator tree needs to be 1
  less than the first power of 2 greater than the number of nodes in one layer.
  This function sets all the bits to the right of the first bit set in a 32 bit
  number, which is the same thing"
  [x]
  (loop [num x
         exp 0]
    (if (> exp 4)
      num
      (let [shifted (bit-shift-right num (.pow js/Math 2 exp))]
        (recur (bit-or num shifted)
               (inc exp))))))


(defn- single-edge-crossings
  "Counts the number of crossings that result from adding an edge, in order,
  to the accumulator tree. If the index is even, meaning it's a right child of its
  parent, we increment its value. If the index is odd (left child), we add the
  value of its right sibling times the current weight to the cross count, as the
  right sibling represents weight of the edges that were added ahead of this one,
  and therefore, crossings. Then we walk up the tree to the root, incrementing and
  adding right siblings, for a total count of edges that cross this one"
  [layer tree orig-index edge]
  (let [weight (count (:characters edge))
        is-seg-c (instance? SegmentContainer (:dest edge))]
    (loop [layer layer
           tree tree
           index orig-index
           crossings 0]
      (if (zero? index)
        [layer tree crossings]
        (let [parent-index (.floor js/Math (/ (dec index) 2))]
          (if (odd? index)
            (let [right-sib (get tree (inc index))
                  c (+ crossings (* weight (:weight right-sib)))
                  ;; Segments cannot cross each other, so the potential hole
                  ;; in this logic is not actually a hole
                  marked (if is-seg-c
                           (:node-edges right-sib)
                           (if (:is-seg-c right-sib)
                             #{(:forward-edge edge)}
                             #{}))
                  l (update-in layer [:marked] set/union marked)]
              (recur l tree parent-index c))
            (let [t (-> tree
                        (update-in [index :weight] + weight)
                        (cond->
                         is-seg-c (assoc-in [index :is-seg-c] true)
                         (not is-seg-c) (update-in [index :node-edges] conj (:forward-edge edge))))]
              (recur layer t parent-index crossings))))))))


(defn count-crossings
  "Step 5 of ESK, counts the number of crossings that result from a
  bi-layer ordering. Implements the algorithm found in Bilayer Cross Counting,
  by Wilhelm Barth, Petra Mutzel and Michael Jünger"
  [graph layer next-layer]
  (let [minus-p (:minus-ps layer)
        without-qs (:without-qs next-layer)
        [layer-1 layer-2 edges] (if (< minus-p without-qs)
                                  [without-qs minus-p (:preds graph)]
                                  [minus-p without-qs (:succs graph)])
        edge-order (sorted-edge-order layer-1 layer-2 edges)
        tree-size (next-power-of-2-minus-1 (count layer-2))
        first-leaf (/ (dec tree-size) 2)]
    (loop [layer layer
           tree (vec (repeat tree-size (AccumulatorNode. 0 #{} false)))
           crossings 0
           order edge-order]
      (if (empty? order)
        [layer crossings]
        (let [[ord edge] (first order)
              index (+ first-leaf ord)
              [l t c] (single-edge-crossings layer tree index edge)]
          (recur l t (+ crossings c) (rest order)))))))


(defn reverse-graph
  "Reverse a graph by reversing its layers and the direction of its edges"
  [graph]
  (assoc graph
    :succs (:preds graph)
    :preds (:succs graph)
    :p (:q graph)
    :q (:p graph)
    :layers (vec (rseq (:layers graph)))))


(defn order-graph-once
  "Performs one layer-by-layer sweep of the graph using ESK's algorithm"
  [sparse-graph]
  (loop [graph sparse-graph
         layer-idx 0
         next-layer-idx (inc layer-idx)]
    (if (>= next-layer-idx (-> graph :layers count))
      graph
      (let [layer (->> (-> graph :layers (get layer-idx))
                       (replace-p-nodes graph)
                       set-positions)
            next-layer (->> (-> graph :layers (get next-layer-idx))
                            (set-qs-non-qs graph)
                            (set-measures graph layer)
                            (order-next-layer layer)
                            add-qs
                            ensure-alternating)
            [marked-layer crossings] (count-crossings graph layer next-layer)
            g (-> graph
                  (update-in [:crossings] + crossings)
                  (update-in [:layers] assoc layer-idx marked-layer)
                  (update-in [:layers] assoc next-layer-idx next-layer))]
        (recur g next-layer-idx (inc next-layer-idx))))))


(defn order-graph
  "Implements the 2-layer crossing minimization algorithm on a sparse graph found in
  'An Efficient Implementation of Sugiyama’s Algorithm for Layered Graph Drawing',
  a paper by Markus Eiglsperger, Martin Sieberhaller, and Michael Kaufmann (ESK)"
  [sparse-graph]
  ;; seed the first layer with initial compact representation and alternating layer
  (let [nodes (-> sparse-graph :layers first :nodes)
        alternating (cons (first segment-containers)
                          (interleave nodes segment-containers))]
    (loop [seeded-graph (update-in sparse-graph [:layers 0] assoc :alternating alternating)
           counter 0]
      (if (= counter 30)
        seeded-graph
        (let [ordered-graph (order-graph-once seeded-graph)
              last-alternating (-> ordered-graph :layers peek :alternating)
              sd-graph (-> sparse-graph
                           (#(if (odd? counter)
                               (reverse-graph %)
                               %))
                           (update-in [:layers 0] assoc :alternating last-alternating))]
          (println counter (:crossings ordered-graph))
          (recur sd-graph (inc counter)))))))
