(ns nchart.core
  (:require [clojure.string :as s]
            [clojure.set :as set]
            [clojure.browser.repl]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [figwheel.client :as fw :include-macros true]))

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
(defrecord Edge [dest characters])
(defrecord Layer [id duration nodes])
(defrecord SegmentContainer [segments])
(defrecord Segment [edge])


(defn- add-edge [graph last-node node characters]
  "Creates an edge and adds it to the graph as a whole and to each participating node"
  (-> graph
      (update-in [:succs last-node] (fnil conj #{}) (Edge. node characters))
      (update-in [:preds node] (fnil conj #{}) (Edge. last-node characters))))


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
                      [])]
    (loop [g (update-in graph [:layers] conj layer)
           input-groups (input-layer :groups)]
      (if (empty? input-groups)
        g
        (recur (add-node g layer-id (first input-groups))
               (rest input-groups))))))


(defn make-graph
  "Main entry point, kicks off processing of input groupings"
  ([input]
     (make-graph input
                 {:layers []
                  :edges []
                  :last-nodes-by-character {}
                  :last-nodes-by-node {}}))
  ([input graph]
     (if (empty? input)
       graph
       (let [g (add-layer graph (first input))]
         (recur (rest input) g)))))
