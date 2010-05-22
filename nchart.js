// TODO:
// Hinting for where you'd like to see nodes sorted
// Show events
// More intelligent insertion of p,q,r nodes?
// Optimize?
// Sorting in Step 2, a better measure
// Do the y portion of name sliding
// Test speed of alternate getting of segment lengths (not actually drawing, use tags, etc)
// Support flipping x and y
// Add name sliding to the straight line graph
// Add centering to the straight line graph
// Deal with names that are too long for their paths

(function(window) {
    goog.require('goog.array');
    goog.require('goog.object');
    goog.require('goog.math.Bezier');

    // Extend goog's Bezier curve implementation with a few enhancements
    $(function() {
        /* Modified from Raphael.js, by Dmitry Baranovskiy */
        goog.math.Bezier.prototype.length = function() {
            var old = {'x': 0, 'y': 0},
            len = 0;
            for (var i = 0; i < 1.01; i+=.1) {
                var dot = this.getPoint(i);
                i && (len += Math.sqrt(Math.pow(old.x - dot.x, 2) + Math.pow(old.y - dot.y, 2)));
                old = dot;
            }
            return len;
        }

        goog.math.Bezier.prototype.lengthAtPoint = function(t) {
            var clone = this.clone();
            clone.subdivideLeft(t);
            return clone.length();
        }

    });

    // Apparently goog.array doesn't have an intersect?
    function intersect(arr1, arr2) {
        if(arr1.length <= arr2.length) {
            var short_arr = arr1,
                long_arr = arr2;
        } else {
            var short_arr = arr2,
                long_arr = arr1;
        }
        return goog.array.filter(short_arr, function(el) {
            return goog.array.contains(long_arr, el);
        });
    }

    function copy_node(node, dest_layer) {
        return {'id': dest_layer.num + '-' + dest_layer.nodes.length,
                'sub_nodes': node.sub_nodes.slice(0),
                'x': dest_layer.nodes[0].x,
                'duration': 0,
                'parents': [],
                'children': [],
                'layer': dest_layer,
                'edges': {}};
    }

    function copy_segment(segment, dest_layer) {
        return {'id': segment.id,
                'nodes': segment.nodes.slice(0),
                'sub_nodes': segment.sub_nodes.slice(0),
                'draw': segment.draw,
                'layer': dest_layer,
                'edges': {},
                'parents': [],
                'children': []};
    }

    function add_layer_edges(layers, layer_num1, layer_num2, node1, node2, sub_nodes, segment) {
        var v_1 = node1;
        var v_2 = !segment ? node2 : copy_segment(segment, layers[layer_num1 + 1]);
        var pq_segs = {};

        if(node1.p && !layers[layer_num1].segs[v_2.id]) {
            layers[layer_num1].segs[v_2.id] = v_2;
            pq_segs[node1.id] = v_2;
        }
        if(layer_num2 - layer_num1 == 1) {
            v_2 = node2;
        }
        for(var i=layer_num1; i<layer_num2; i++) {
            var layer1 = layers[i];
            var layer2 = layers[i + 1];
            v_1.children.push(v_2);
            v_2.parents.push(v_1);

            is_seg = !!(v_1.nodes || v_2.nodes || v_1.p || v_2.q);

            v_1.edges[v_2.id] = {'source': v_1,
                                 'target': v_2,
                                 'is_seg': is_seg,
                                 'sub_nodes': sub_nodes,
                                 'weight': sub_nodes.length};
            v_2.edges[v_1.id] = {'source': v_2,
                                 'target': v_1,
                                 'is_seg': is_seg,
                                 'sub_nodes': sub_nodes,
                                 'weight': sub_nodes.length};

            if(v_1.nodes && !layer1.segs[v_1.id]) {
                layer1.segs[v_1.id] = v_1;
            }
            if(v_2.nodes && !layer2.segs[v_2.id]) {
                layer2.segs[v_2.id] = v_2;
            }

            v_1 = v_2;
            if(i >= layer_num2 - 2) {
                if(node2.q) {
                    var seg = v_2.nodes ? v_2 : copy_segment(segment, layers[layer_num2]);
                    if(!layers[layer_num2].segs[seg.id]) {
                        layers[layer_num2].segs[seg.id] = seg;
                        pq_segs[node2.id] = seg
                    }
                }
                v_2 = node2;
            } else {
                v_2 = copy_segment(segment, layers[i + 2]);
            }
        }

        return pq_segs;
    }

    function copy_segment_container(container, layer) {
        var new_c = {'segs': []};
        for(var i=0; i<container.segs.length; i++) {
            var seg = container.segs[i];
            new_c.segs.push(layer.segs[seg.id]);
        }
        return new_c;
    }

    function update_last_nodes(names, node, last_nodes) {
        for(var i=0; i<names.length; i++) {
            var name = names[i];
            last_nodes[name] = node;
        }
    }

    function parse_layers(layers, characters) {
        var edges = {};
        var last_nodes = {};
        var pq_segs = {};
        var flat_nodes = {};
        var p_nodes = [];
        var q_nodes = [];
        var r_nodes = [];
        var c_nodes = {};
        for(var i=0; i<layers.length; i++) {
            var layer = layers[i];
            layer.segs = {};
            layer.num = i;
            for(var j=0; j<layer.nodes.length; j++) {
                var node = layer.nodes[j];
                node.id = i + '-' + j;
                node.duration = layer.duration;
                node.parents = [];
                node.children = [];
                node.layer = layer;
                node.draw = true;
                node.edges = {};
                flat_nodes[node.id] = node;
                for(var k=0; k<node.sub_nodes.length; k++) {
                    var name = node.sub_nodes[k];
                    var last_node = last_nodes[name];

                    goog.object.setIfUndefined(c_nodes, name, []);

                    if(!last_node && i) {
                        var all_new = true;
                        for(var l=0; l<node.sub_nodes.length; l++) {
                            if(last_nodes[node.sub_nodes[l]]) {
                                all_new = false;
                            }
                        }
                        if(!all_new) {
                            last_node = node;
                        } else {
                            last_node = copy_node(node, layers[0]);
                            last_node.draw = false;
                            layers[0].nodes.unshift(last_node);
                            update_last_nodes(node.sub_nodes, last_node, last_nodes);
                        }
                    }
                    if(i && last_node != node) {
                        var span = i - last_node.layer.num;
                        var seg_sub_nodes = intersect(node.sub_nodes, last_node.sub_nodes);
                        if(span > 2) {
                            //Add two new vertices at layers last_node.layer.num + 1 and i - 1
                            var p_layer = layers[last_node.layer.num + 1];
                            var q_layer = layers[i - 1];
                            var p_node = {'id': (last_node.layer.num + 1) + '-' + p_layer.nodes.length,
                                          'sub_nodes': seg_sub_nodes,
                                          'duration': 0,
                                          'layer': p_layer,
                                          'p': true,
                                          'span': span,
                                          'draw': last_node.draw,
                                          'edges': {},
                                          'parents': [],
                                          'children': []};
                            var q_node = {'id': (i - 1) + '-' + q_layer.nodes.length,
                                          'sub_nodes': seg_sub_nodes.slice(0),
                                          'duration': 0,
                                          'layer': q_layer,
                                          'q': true,
                                          'span': span,
                                          'draw': last_node.draw,
                                          'edges': {},
                                          'parents': [],
                                          'children': []};
                            p_nodes.push(p_node);
                            q_nodes.push(q_node);
                            p_layer.nodes.push(p_node);
                            q_layer.nodes.push(q_node);

                            //Add two new edges last_node.layer -> p_layer, p_layer -> q_layer
                            //for each name in this node
                            for(var n=0; n<seg_sub_nodes.length; n++) {
                                var seg_name = seg_sub_nodes[n];
                                if(last_node == last_nodes[seg_name]) {
                                    goog.object.setIfUndefined(c_nodes, seg_name, []);
                                    if(last_node.draw) {
                                        c_nodes[seg_name].push(p_node);
                                        c_nodes[seg_name].push(q_node);
                                    }
                                } else {
                                    seg_sub_nodes.splice(n, 1);
                                    q_node.sub_nodes.splice(n, 1);
                                    n--;
                                }
                            }
                            //Add the segment between p_node and q_node to each of the layers it crosses
                            var segment = {'id': p_node.id + '-' + q_node.id,
                                           'nodes': [p_node, q_node],
                                           'sub_nodes': seg_sub_nodes.slice(0),
                                           'draw': last_node.draw};

                            add_layer_edges(layers, last_node.layer.num, last_node.layer.num + 1, last_node, p_node, seg_sub_nodes);
                            var new_pqs = add_layer_edges(layers, last_node.layer.num + 1, i - 1, p_node, q_node, seg_sub_nodes, segment);
                            goog.object.extend(new_pqs, pq_segs);
                            pq_segs = new_pqs;

                            last_node = q_node;
                            update_last_nodes(seg_sub_nodes, q_node, last_nodes);

                        } else if(span == 2) {
                            //Add one new vertex at layer i - 1
                            var r_layer = layers[i - 1];
                            var r_node = {'id': (i - 1) + '-' + r_layer.nodes.length,
                                          'sub_nodes': seg_sub_nodes,
                                          'duration': 0,
                                          'layer': r_layer,
                                          'r': true,
                                          'draw': last_node.draw,
                                          'edges': {},
                                          'parents': [],
                                          'children': []};
                            r_nodes.push(r_node);
                            r_layer.nodes.push(r_node);
                            //Add two new edges last_node.layer -> r_layer
                            //for each name in this node
                            for(var n=0; n<seg_sub_nodes.length; n++) {
                                var seg_name = seg_sub_nodes[n];
                                if(last_node == last_nodes[seg_name]) {
                                    goog.object.setIfUndefined(c_nodes, seg_name, []);
                                    if(last_node.draw) {
                                        c_nodes[seg_name].push(r_node);
                                    }
                                } else {
                                    seg_sub_nodes.splice(n, 1);
                                    n--;
                                }
                            }
                            add_layer_edges(layers, last_node.layer.num, i - 1, last_node, r_node, seg_sub_nodes);
                            update_last_nodes(r_node.sub_nodes, r_node, last_nodes);
                            last_node = r_node;
                        }

                        //Add one edge normally
                        add_layer_edges(layers, last_node.layer.num, i, last_node, node, seg_sub_nodes);
                        update_last_nodes(seg_sub_nodes, node, last_nodes);
                    }
                    c_nodes[name].push(node);
                    last_nodes[name] = node;
                }
            }
        }

        var char_nodes = [];
        goog.object.forEach(c_nodes, function(nodes, name) {
            var character = characters[name];
            character.short_name = name;
            char_nodes.push({'character': character, 'nodes': nodes});
        });

        return {'layers': layers, 'pq_segs': pq_segs, 'flat_nodes': flat_nodes, 'q_nodes': q_nodes,
                'p_nodes': p_nodes, 'r_nodes': r_nodes, 'char_nodes': char_nodes};
    }

    function copy_L(L) {
        var new_L = [];
        for(var i=0; i<L.length; i++) {
            var item = L[i];
            if(item.segs) {
                new_L.push({'segs': item.segs.slice(0)});
            } else {
                new_L.push(item);
            }
        }
        return new_L;
    }

    function next2power(x) {
        x--;
        x |= x >> 1;
        x |= x >> 2;
        x |= x >> 4;
        x |= x >> 8;
        x |= x >> 16;
        return x + 1;
    }

    function count_crossings(q, layer_edges, lower_positions, lower_weights) {
        // Build the accumulator tree
        var first_index = next2power(q);
        var tree_size = 2 * first_index - 1; /* number of tree nodes */
        first_index--;
        var tree = [];
        var seg_tree = [];
        for(var t=0; t<tree_size; t++) {
            tree[t] = 0;
            seg_tree[t] = 0;
        }
        
        var cross_count = 0; /* number of crossings */
        for(var k=0; k<lower_positions.length; k++) { /* insert edge k */
            var index = lower_positions[k] + first_index;
            var edge = layer_edges[k];
            tree[index] += lower_weights[k];
            if(edge.is_seg) {
                seg_tree[index] += 1;
            }
            var weight_sum = 0;
            var seg_sum = 0;
            while(index > 0) {
                if (index % 2) {
                    weight_sum += tree[index+1];
                    seg_sum += seg_tree[index+1];
                }
                index = Math.floor((index - 1) / 2);
                tree[index] += lower_weights[k];
                if(edge.is_seg) {
                    seg_tree[index] += 1;
                }
            }
            cross_count += (lower_weights[k] * weight_sum);
            if(seg_sum > 0) {
                edge.marked = true;
                edge.target.edges[edge.source.id].marked = true;
            } else {
                edge.marked = false;
                edge.target.edges[edge.source.id].marked = false;
            }

            // If we're adding a segment, mark any edges it crosses
            if(edge.is_seg) {
                var pos = lower_positions[k];
                for(var l=0; l<k; l++) {
                    if(pos < lower_positions[l]) {
                        var added_edge = layer_edges[l];
                        added_edge.marked = true;
                        added_edge.target.edges[added_edge.source.id].marked = true;
                    }
                }
            }
        }

        return cross_count;
    }

    function count_sub_crossings(q, lower_positions) {
        var first_index = next2power(q);
        var tree_size = 2 * first_index - 1; /* number of tree nodes */
        first_index--; /* index of leftmost leaf */

        var tree = [];
        for(var t=0; t<tree_size; t++) {
            tree[t] = 0;
        }
        
        var cross_count = 0;
        for(var k=0; k<lower_positions.length; k++) {
            var index = lower_positions[k] + first_index;
            tree[index]++;

            while(index > 0) {
                if(index % 2) {
                    cross_count += tree[index + 1];
                }
                index = Math.floor((index - 1) / 2);
                tree[index]++;
            }
        }
        return cross_count;
    }

    function step1(graph, Li, seg_begin) {
        // Step 1
        for(var j=0; j<Li.length; j++) {
            var item = Li[j];
            if(item[seg_begin]) {
                // Join segment container Li[j-1], this p_node's segment, and Li[j+1]
                Li[j-1].segs = Li[j-1].segs.concat(graph.pq_segs[item.id],
                                                   Li.splice(j+1, 1)[0].segs);
                // Remove the p-node
                Li.splice(j, 1);
                j--;
            }
        }
    }

    function step2(Li, next_layer, seg_end, parents, last_pos) {
        // Step 2
        // Assign pos to layer
        var LS = [];
        var pos = 0;
        for(var j=0; j<Li.length; j+=2) {
            var segment = copy_segment_container(Li[j], next_layer);
            pos = j ? pos + 1 : 0;
            segment.measure = segment.pos = pos
            pos += segment.segs.length;
            if(segment.segs.length > 0) {
                LS.push(segment);
            }
            if(j < Li.length - 1) {
                var node = Li[j + 1];
                node.pos = pos;
            }
        }

        // Figure out measures of non-q nodes in next_layer based on pos of parent nodes in layer
        var LV = [];
        for(var j=0; j<next_layer.nodes.length; j++) {
            var node = next_layer.nodes[j];
            if(!node[seg_end]) {
                LV.push(node);
            }
        }

        // var same_measures = {};
        for(var j=0; j<LV.length; j++) {
            var node = LV[j];
            var num_parents = 0;
            var total_pos = 0;
            var ps = node[parents];
            for(var k=0; k<ps.length; k++) {
                var parent = ps[k];
                var edge_weight = node.edges[parent.id].weight;
                total_pos += edge_weight * parent.pos;
                num_parents += edge_weight;
            }
            node.measure = num_parents > 0 ? total_pos / num_parents : node.measure ? node.measure : 0;
            // goog.object.setIfUndefined(same_measures, node.measure, []);
            // same_measures[node.measure].push(node);
        }

        // for(var j in same_measures) {
        //     var nodes = same_measures[j];
        //     if(nodes.length > 1) {
        //         var used_measures = [];
        //         for(var k=0; k<nodes.length; k++) {
        //             var node = nodes[k];
        //             var sub_pos = 0;
        //             var subs = 0;
        //             for(var l=0; l<node.sub_nodes.length; l++) {
        //                 var last = last_pos[node.sub_nodes[l]];
        //                 if(last) {
        //                     sub_pos += last[1];
        //                     subs++;
        //                 }
        //             }
        //             node.sub_measure = sub_pos / subs;
        //             while(goog.array.contains(used_measures, node.sub_measure)) {
        //                 node.sub_measure += .000001;
        //             }
        //             used_measures.push(node.sub_measure);
        //         }

        //         nodes.sort(sub_measure_sort);
        //         for(var k=1; k<nodes.length; k++) {
        //             node.measure += .000001 * k;
        //         }
        //     }
        // }

        goog.array.stableSort(LV, measure_sort);
        goog.array.stableSort(LS, measure_sort);

        return [LS, LV];
    }

    function measure_sort(a, b) {
        return a.measure - b.measure;
    }

    function sub_measure_sort(a, b) {
        return a.sub_measure - b.sub_measure;
    }

    function step3(LS, LV) {
        // Step 3
        var L = [];

        while(LS.length && LV.length) {
            if(LV[0].measure <= LS[0].pos) {
                L.push(LV.shift());
            } else {
                var S = LS.shift();
                if(LV[0].measure >= S.pos + S.segs.length - 1) {
                    L.push(S);
                } else {
                    var v = LV.shift();
                    var k = Math.ceil(v.measure - S.pos);
                    var S1 = {'pos': S.pos, 'segs': S.segs.splice(0, k)};
                    var S2 = S;
                    if(S1.segs.length) {
                        L.push(S1);
                    }
                    L.push(v);
                    if(S2.segs.length) {
                        S2.pos += k;
                        LS.unshift(S2);
                    }
                }
            }
        }
        L = L.concat(LV, LS);
        return L;
    }

    function step4(L, layer, next_layer, reverse) {
        // Step 4
        var pq = reverse ? 0 : 1;
        for(var j=0; j<L.length; j++) {
            var item = L[j];
            if(item.segs) {
                // It's actually a segment container
                var S = item;
                for(var k=0; k<S.segs.length; k++) {
                    if(S.segs[k].nodes[pq].layer.num == next_layer.num) {
                        // It's a q node
                        var S_segs = S.segs.splice(0, k);
                        var S1 = {'pos': S.pos, 'segs': S_segs};
                        var S2 = S;
                        var v = S2.segs.splice(0, 1)[0].nodes[pq];

                        // S2 is already in L, need to insert v and S1 before it
                        // And remove it if it's empty
                        var remove_s2 = S2.segs.length ? 0 : 1;
                        if(S1.segs.length) {
                            L.splice(j, remove_s2, S1, v);
                            j += 2;
                        } else {
                            L.splice(j, remove_s2, v);
                            j++;
                        }
                        if(remove_s2) {
                            j--;
                        }
                        k = -1;
                    }
                }
            }
        }
    }

    function step5(L, prev_L, last_pos, children, parents) {
        // Step 5
        // Need to find edges between L - 1 and L
        var L_map = {};
        var L_sub_map = {};
        var sub_node_map = {};
        var position = 0;
        for(var j=0; j<L.length; j++) {
            var node = L[j];
            if(node.sub_nodes) {
                if(node[parents] && node.draw) {
                    node.sub_node_pos = {};
                    for(var k=0; k<node.sub_nodes.length; k++) {
                        var sub_node = node.sub_nodes[k];
                        node.sub_node_pos[sub_node] = last_pos[sub_node] ? last_pos[sub_node] : [j,k];
                        sub_node_map[sub_node] = node;
                    }

                    goog.array.stableSort(node.sub_nodes, function(a, b) {
                        if(node.sub_node_pos[a][0] != node.sub_node_pos[b][0]) {
                            return node.sub_node_pos[a][0] - node.sub_node_pos[b][0];
                        } else {
                            return node.sub_node_pos[a][1] - node.sub_node_pos[b][1];
                        }
                    });
                    for(var k=0; k<node.sub_nodes.length; k++) {
                        var sub_node = node.sub_nodes[k];
                        last_pos[sub_node] = [j,k];
                        L_sub_map[sub_node] = position;
                    }
                    L_map[node.id] = position;
                    position++;
                }
            } else {
                var drew_one = false;
                for(var k=0; k<node.segs.length; k++) {
                    var seg = node.segs[k];
                    if(seg.draw) {
                        drew_one = true;
                        for(var l=0; l<seg.sub_nodes.length; l++) {
                            var sub_node = seg.sub_nodes[l];
                            last_pos[sub_node][0] = j;
                            sub_node_map[sub_node] = seg;
                            L_sub_map[sub_node] = position;
                        }
                        L_map[seg.id] = position;
                    }
                }
                if(drew_one) {
                    position++;
                }
            }
        }

        function children_sort(a, b) {
            return L_map[a.id] - L_map[b.id];
        }

        var layer_edges = [];
        var lower_positions = [];
        var edge_weights = [];
        var crossings = 0;
        for(var j=0; j<prev_L.length; j++) {
            var proto_node = prev_L[j];
            var nodes;
            if(proto_node.segs) {
                nodes = proto_node.segs;
            } else {
                nodes = [proto_node];
            }
            for(var k=0; k<nodes.length; k++) {
                var node = nodes[k];
                var count_subs = false;

                // do this above?
                var cs = node[children];
                if(cs.length > 1) {
                    goog.array.stableSort(cs, children_sort);
                    count_subs = true;
                }

                var sub_position = 0;
                var L_sub_map = {};
                for(var l=0; l<cs.length; l++) {
                    var L_node = cs[l];
                    var edge = node.edges[L_node.id];
                    layer_edges.push(edge);
                    lower_positions.push(L_map[edge.target.id]);
                    edge_weights.push(edge.weight);
                    if(count_subs) {
                        for(var m=0; m<edge.sub_nodes.length; m++) {
                            L_sub_map[edge.sub_nodes[m]] = sub_position;
                        }
                        sub_position++;
                    }
                }
                if(count_subs) {
                    var lower_sub_positions = [];
                    for(var l=0; l<node.sub_nodes.length; l++) {
                        lower_sub_positions.push(L_sub_map[node.sub_nodes[l]]);
                    }
                    crossings += count_sub_crossings(sub_position, lower_sub_positions);
                }
            }
        }
        // position just happens to be the number of nodes in L that have edges back to prev_L
        crossings += count_crossings(position, layer_edges, lower_positions, edge_weights);
        return crossings;
    }

    function step6(L, next_layer) {
        // Step 6
        var alternating_L = copy_L(L);
        var last = 'node';
        for(var j=0; j<alternating_L.length; j++) {
            var item = alternating_L[j];
            if(last == 'node' && item.sub_nodes) {
                alternating_L.splice(j, 0, {'segs': []});
                last = 'segment';
            } else if(last == 'segment' && item.segs) {
                alternating_L[j - 1].segs = alternating_L[j - 1].segs
                    .concat(alternating_L.splice(j, 1)[0].segs);
                j--;
                last = 'segment';
            } else {
                last = last == 'node' ? 'segment' : 'node';
            }
        }
        if(last == 'node') {
            alternating_L.push({'segs': []});
        }
        next_layer.nodes = [];
        next_layer.segments = [];
        for(var j=0; j<alternating_L.length; j++) {
            if(j % 2) {
                next_layer.nodes.push(alternating_L[j]);
            } else {
                next_layer.segments.push(alternating_L[j]);
            }
        }

        return alternating_L;
    }

    function minimize_crossings(graph, Li, i, compaction, reverse, last_pos) {
        if(reverse) {
            var seg_begin = 'q';
            var seg_end = 'p';
            var children = 'parents';
            var parents = 'children';
        } else {
            var seg_begin = 'p';
            var seg_end = 'q';
            var children = 'children';
            var parents = 'parents';
        }            

        var layers = graph.layers;
        var layer = layers[i];
        var next_layer = layers[i + 1];
        var prev_L = compaction[i];

        step1(graph, Li, seg_begin);
        var ls = step2(Li, next_layer, seg_end, parents, last_pos);
        var LS = ls[0];
        var LV = ls[1];
        var L = step3(LS, LV);
        step4(L, layer, next_layer, reverse);
        var crossings = step5(L, prev_L, last_pos, children, parents);
        var alternating_L = step6(L, next_layer);
        return [crossings, compaction.concat([L]), alternating_L];
    }

    function align_vertically(graph, up_down, left_right) {
        var align_to = up_down ? 'children' : 'parents';
        var pos = left_right ? 'r_pos' : 'pos';
        for(var i=0; i<graph.e_compaction.length; i++) {
            var layer = graph.layers[i];
            var L = graph.e_compaction[i];
            if(left_right) {
                L.reverse();
            }
            var r = -1;
            for(var j=0; j<L.length; j++) {
                var v = L[j];
                var aligners = v[align_to];
                if(aligners.length) {
                    if(left_right) {
                        aligners.reverse();
                    }
                    var parent_arr = [];
                    for(var k=0; k<aligners.length; k++) {
                        var aligner = aligners[k];
                        var edge = v.edges[aligner.id];
                        for(var l=0; l<edge.weight; l++) {
                            parent_arr.push(aligner);
                        }
                    }
                    var proto_median = ((parent_arr.length + 1) / 2) - 1;
                    for(var m=Math.floor(proto_median); m<=Math.ceil(proto_median); m++) {
                        if(v.align == v) {
                            var n = parent_arr[m];
                            var edge = v.edges[n.id];
                            if((!edge || !edge.marked) && r < n[pos]) {
                                n.align = v;
                                v.root = n.root;
                                v.align = v.root;
                                r = n[pos];
                            }
                        }
                    }
                    if(left_right) {
                        aligners.reverse();
                    }
                }
            }
            if(left_right) {
                L.reverse();
            }
        }
    }

    function place_block(v, delta, up_down, left_right) {
        if(v.y == null) {
            var seg_start = up_down ? 'q' : 'p';
            var pos, pred, shift_func, set_func;
            if(left_right) {
                pos = 'r_pos';
                pred = 'succ';
                shift_func = Math.max;
                set_func = Math.min;
            } else {
                pos = 'pos';
                pred = 'pred';
                shift_func = Math.min;
                set_func = Math.max;
            }
            v.y = 0;
            var w = v;
            do {
                if(w[pos] > 0) {
                    var u = w[pred].root;
                    place_block(u, delta, up_down, left_right);
                    if(v.sink == v) {
                        v.sink = u.sink;
                    }
                    if(!left_right && v[seg_start]) {
                        var u_align = u;
                        var u_size = 0;
                        var i = 0;
                        do {
                            if(u_align.layer.num >= v.layer.num) {
                                u_size = Math.max(u_size, u_align.size);
                                i++;
                            }
                            u_align = u_align.align;
                        } while(i < v.span && u_align != u);
                    } else {
                        u_size = w[pred].size;
                    }
                    var node_delta = left_right ? 15 * -w.size - delta : 15 * u_size + delta; //*** 15 spacing
                    if(v.sink != u.sink) {
                        u.sink.shift = shift_func(u.sink.shift, v.y - u.y - node_delta);
                    } else {
                        v.y = set_func(v.y, u.y + node_delta);
                    }
                }
                w = w.align;
            } while(w != v);
        }
    }

    function compact_horizontally(graph, delta, up_down, left_right) {
        for(var i=0; i<graph.e_compaction.length; i++) {
            var L = graph.e_compaction[i];
            for(var j=0; j<L.length; j++) {
                var v = L[j];
                if(v.root == v) {
                    place_block(v, delta, up_down, left_right);
                }
            }
        }
        var y_coords = [];
        var min_coord = Infinity;
        var max_coord = -Infinity;
        for(var i=0; i<graph.e_compaction.length; i++) {
            var L = graph.e_compaction[i];
            if(left_right) {
                L.reverse();
            }
            var L_y = [];
            for(var j=0; j<L.length; j++) {
                var v = L[j];
                v.y = v.root.y;
                if((!left_right && v.sink.shift < Infinity) || (left_right && v.sink.shift > -Infinity)) {
                    v.y = v.y + v.sink.shift;
                }
                L_y.push(v.y);
                min_coord = Math.min(min_coord, v.y);
                max_coord = Math.max(max_coord, v.y);
            }
            if(left_right) {
                L.reverse();
                L_y.reverse();
            }
            y_coords.push(L_y);
        }
        var width = max_coord - min_coord;
        return {'y_coords': y_coords, 'width': width, 'max_coord': max_coord, 'min_coord': min_coord};
    }

    function order(graph) {
        var total_crossings;
        var a = 0;
        var best = {'crossings': Infinity, 'compaction': []};
        goog.object.extend(best, graph);
        var layer = graph.layers[0];
        var reverse = false;
        var Li = [{'segs': []}];
        var last_pos = {};
        for(var i=0; i<layer.nodes.length; i++) {
            var v = layer.nodes[i];
            Li.push(v);
            Li.push({'segs': []});
            for(var j=0; j<v.sub_nodes.length; j++) {
                last_pos[v.sub_nodes[j]] = [i,j];
            }
        }
        do {
            var old_total_crossings = total_crossings;
            total_crossings = 0;
            var compaction = [layer.nodes.slice(0)];
            for(var i=0; i<graph.layers.length - 1; i++) {
                var results = minimize_crossings(graph, Li, i, compaction, reverse, last_pos);
                total_crossings += results[0];
                compaction = results[1];
                Li = results[2];
            }
            console.log(a, total_crossings);
            var difference = Math.abs(total_crossings - old_total_crossings);
            if(total_crossings < best.crossings) {
                best.crossings = total_crossings;
                best.compaction = compaction;
                best.marked = {};
                best.sub_nodes = {};
                for(var i=0; i<graph.layers.length; i++) {
                    layer = graph.layers[i];
                    for(var j=0; j<layer.nodes.length; j++) {
                        var node = layer.nodes[j];
                        best.sub_nodes[node.id] = node.sub_nodes.slice(0);

                        best.marked[node.id] = {};
                        for(var target_id in node.edges) {
                            var edge = node.edges[target_id];
                            best.marked[node.id][target_id] = edge.marked;
                        }
                    }
                }
                if(reverse) {
                    best.compaction.reverse();
                }
            }

            // Go backwards
            reverse = !reverse;
            graph.layers.reverse();
            layer = graph.layers[0];
            last_pos = {};
            for(var i=0; i<layer.nodes.length; i++) {
                var v = layer.nodes[i];
                for(var j=0; j<v.sub_nodes.length; j++) {
                    last_pos[v.sub_nodes[j]] = [i,j];
                }
            }
            a++;
        } while(a < 21);

        if(a % 2) {
            graph.layers.reverse();
        }

        //Un-segmentify the compaction
        best.e_compaction = [];
        for(var i=0; i<best.compaction.length; i++) {
            var L = best.compaction[i].slice(0);
            for(var j=0; j<L.length; j++) {
                var v = L[j];
                if(v.segs) {
                    var segs = v.segs.slice(0);
                    // Remove v from L and put the segs from v directly into L
                    L.splice(j, 1);
                    while(segs.length) {
                        var seg = segs.shift();
                        if(seg.draw) {
                            L.splice(j, 0, seg);
                            j++;
                        }
                    }
                    j--;
                } else if(!v.draw) {
                    L.splice(j, 1);
                    v.children[0].parents = [];
                    j--;
                }
            }
            best.e_compaction.push(L);
        }

        // var last_pos = {};
        // for(var i=0; i<best.e_compaction.length; i++) {
        //     var L = best.e_compaction[i];
        //     // Reset the best sub node order
        //     for(var j=0; j<L.length; j++) {
        //         var node = L[j];
        //         if(node.draw) {
        //             if(node.nodes) {
        //                 for(var k=0; k<node.sub_nodes.length; k++) {
        //                     var sub_node = node.sub_nodes[k];
        //                     last_pos[sub_node][0] = j;
        //                 }
        //             } else {
        //                 node.sub_node_order = {};
        //                 for(var k=0; k<node.sub_nodes.length; k++) {
        //                     var sub_node = node.sub_nodes[k];
        //                     node.sub_node_pos[sub_node] = last_pos[sub_node] ? last_pos[sub_node] : [j,k];
        //                 }
        //                 node.sub_nodes.sort(function(a, b) {
        //                     if(node.sub_node_pos[a][0] != node.sub_node_pos[b][0]) {
        //                         return node.sub_node_pos[a][0] - node.sub_node_pos[b][0];
        //                     } else {
        //                         return node.sub_node_pos[a][1] - node.sub_node_pos[b][1];
        //                     }
        //                 });
        //                 for(var k=0; k<node.sub_nodes.length; k++) {
        //                     var sub_node = node.sub_nodes[k];
        //                     node.sub_node_order[sub_node] = k;
        //                     last_pos[sub_node] = [j,k];
        //                 }
                        
        //                 // Reset markedness
        //                 for(var target_id in node.edges) {
        //                     var edge = node.edges[target_id];
        //                     edge.marked = best.marked[node.id][target_id];
        //                 }
        //             }
        //         }
        //     }
        // }

        best.layers = graph.layers;
        neighborify(best);
        return best;
    }

    function neighborify(graph) {
        var l_orders = [];
        var childrens = [];
        var order;

        function node_sort(a, b) {
            return order[a.id] - order[b.id];
        }

        for(var i=0; i<graph.e_compaction.length; i++) {
            var L = graph.e_compaction[i];
            
            var l_order = {};
            var last_childrens = childrens;
            childrens = [];
            for(var j=0; j<L.length; j++) {
                var v = L[j];
                l_order[v.id] = j;

                order = l_orders[i - 1];
                goog.array.stableSort(v.parents, node_sort);
                childrens.push(v.children);

                if(j > 0) {
                    v.pred = L[j - 1];
                }
                if(j < L.length - 1) {
                    v.succ = L[j + 1];
                }
                l_order[v.id] = j;

                // Reset the pos, because the current configuration probably won't be the same as the last time through
                // the crossing reduction
                v.pos = j;
                v.r_pos = L.length - j - 1;
            }

            for(var j=0; j<last_childrens.length; j++) {
                order = l_order;
                goog.array.stableSort(last_childrens[j], node_sort);
            }
            l_orders.push(l_order);
        }
    }

    function place_nodes(graph, delta) {
        var l_alignments = [];
        var r_alignments = [];
        var alignments = [];
        for(var i in ['up', 'down']) {
            i = parseInt(i);
            if(i) {
                graph.compaction.reverse();
                graph.e_compaction.reverse();
                graph.layers.reverse();
            }
            for(var j in ['left', 'right']) {
                j = parseInt(j);
                initialize_nodes(graph, j);
                align_vertically(graph, i, j);
                var alignment = compact_horizontally(graph, delta, i, j);
                if(i) {
                    alignment.y_coords.reverse();
                }
                alignments.push(alignment);
                if(j) {
                    r_alignments.push(alignment);
                } else {
                    l_alignments.push(alignment);                    
                }
            }
            if(i) {
                graph.compaction.reverse();
                graph.e_compaction.reverse();
                graph.layers.reverse();
            }
        }
        // Choose narrowest alignment
        var narrowest = {'width': Infinity};
        for(var i=0; i<alignments.length; i++) {
            var alignment = alignments[i];
            if(alignment.width < narrowest.width) {
                narrowest = alignment;
            }
        }

        // Align to narrowest
        var lr_alignments = [l_alignments, r_alignments];
        for(var h=0; h<lr_alignments.length; h++) {
            var min_or_max = h ? 'max_coord' : 'min_coord';
            for(var i=0; i<lr_alignments[h].length; i++) {
                var alignment = lr_alignments[h][i];
                var delta = alignment[min_or_max] - narrowest[min_or_max];
                if(delta != 0) {
                    for(var j=0; j<alignment.y_coords.length; j++) {
                        var L = alignment.y_coords[j];
                        for(var k=0; k<L.length; k++) {
                            L[k] -= delta;
                        }
                    }
                }
            }
        }

        // Set y coordinates
        var min_y = Infinity;
        var max_y = -Infinity;
        for(var i=0; i<graph.e_compaction.length; i++) {
            var L = graph.e_compaction[i];
            for(var j=0; j<L.length; j++) {
                var v = L[j];
                var v_coords = [alignments[0].y_coords[i][j],
                                alignments[1].y_coords[i][j],
                                alignments[2].y_coords[i][j],
                                alignments[3].y_coords[i][j]];
                v_coords.sort(function(a, b) { return a - b; });
                // Set the y coordinate to be the average median (rounded) of the four alignments
                v.y = Math.round((v_coords[1] + v_coords[2]) / 2);
                // v.y = alignments[0].y_coords[i][j];
                min_y = Math.min(v.y, min_y);
                max_y = Math.max(v.y + ((v.size - 1) * 15), max_y); //*** 15 spacing
            }
        }

        // For now, just make sure there's no negative y values
        var width = max_y - min_y;
        var center = width / 2;
        if(min_y != 20) {
            var shift = -min_y + 20;
            max_y += shift;
            for(var i=0; i<graph.e_compaction.length; i++) {
                var L = graph.e_compaction[i];
                for(var j=0; j<L.length; j++) {
                    L[j].y += shift;
                }
            }
        }
        graph.max_y = max_y;

        for(var i=0; i<graph.char_nodes.length; i++) {
            var c_nodes = graph.char_nodes[i];
            var posen = 0;
            for(var j=0; j<c_nodes.nodes.length; j++) {
                posen += c_nodes.nodes[j].pos;
            }
            c_nodes.avg_pos = posen / j;
        }

        place_x(graph);
        graph.max_x = graph.e_compaction[graph.e_compaction.length - 1][0].x
    }

    function place_x(graph) {
        var last_x = 100; //*** start x
        for(var i=0; i<graph.e_compaction.length; i++) {
            var L = graph.e_compaction[i];
            var max_y_diff = 0;
            var use_slope = Infinity;
            for(var j=0; j<L.length; j++) {
                var v = L[j];
                v.x = last_x;
                for(var k=0; k<v.children.length; k++) {
                    var c = v.children[k];
                    if(v.y != c.y) {
                        var edge = v.edges[c.id];
                        var slope = Math.max(1.5, 3.5 - (edge.weight / 7));  //*** slope
                        var y_diff = Math.abs(v.y - c.y) + v.layer.duration * slope;
                        if(y_diff > max_y_diff) {
                            max_y_diff = y_diff;
                        }
                        if(slope < use_slope) {
                            use_slope = slope;
                        }
                    }
                }
            }
            last_x += Math.floor(Math.max(max_y_diff / use_slope, 100));
        }
    }


    function initialize_nodes(graph, left_right) {
        for(var i=0; i<graph.e_compaction.length; i++) {
            var L = graph.e_compaction[i];
            for(var j=0; j<L.length; j++) {
                var v = L[j];
                v.root = v;
                v.align = v;
                v.sink = v;
                v.shift = left_right ? -Infinity : Infinity;
                v.size = v.sub_nodes.length;
                v.y = null;
            }
        }
    }

    function draw_straight(svg, original_scale) {
        var g = svg.group('graph');
        var pov = svg.group(g, 'pov', {'stroke-width': 2});
        var non_pov = svg.group(g, 'non_pov', {'stroke-width': 1});
        var death_icon_settings = {'fill': 'black'};
        var undeath_icon_settings = {'stroke': 'black', 'fill': 'white'};
        for(var i=0; i<graph.char_nodes.length; i++) {
            var c_nodes = graph.char_nodes[i];
            var edge_arr = ['M'];
            var box_arr = ['M'];
            var dead_arr = [];
            var back_box_arr = ['z'];
            var short_name = c_nodes.character.short_name;
            var deaths = [];
            var undeaths = [];
            var dead = false;
            for(var j=0; j<c_nodes.nodes.length; j++) {
                var node = c_nodes.nodes[j];
                if(j) {
                    if(dead) {
                        edge_arr.push('M');
                        box_arr.push('M');
                        dead_arr.push('L');
                    } else {
                        edge_arr.push('L');
                        box_arr.push('L');
                    }
                }
                var edge_y = node.y + (node.sub_node_order[short_name] * 15); //*** 15 spacing
                var box_y = edge_y - 4;
                var back_box_y = edge_y + 4;
                edge_arr.push(node.x + ' ' + edge_y);
                box_arr.push(node.x + ' ' + box_y);
                if(dead) {
                    dead_arr.push(node.x + ' ' + edge_y);
                }
                if(node.duration) {
                    if(dead) {
                        dead_arr.push('h' + node.duration);
                    } else {
                        edge_arr.push('h' + node.duration);
                    }
                    box_arr.push('h' + node.duration);
                    back_box_arr.push('h-' + node.duration);
                }

                var dur = node.x + node.duration;
                if(j < c_nodes.nodes.length - 1) {
                    back_box_arr.push('L' + dur + ' ' + back_box_y);
                }
                if(node.deaths && goog.array.contains(node.deaths, short_name)) {
                    deaths.push([dur, edge_y, 5]);
                    if(!dead) {
                        dead_arr.push('M' + dur + ' ' + edge_y);
                        dead = true;
                    }
                }
                if(node.undeaths && goog.array.contains(node.undeaths, short_name)) {
                    undeaths.push([dur, edge_y, 5]);
                    dead = false;
                }
            }
            var group = c_nodes.character.pov ? pov : non_pov;
            box_arr.push('v8');
            back_box_arr.reverse();
            
            var char_group = svg.group(group,
                                       short_name + '_group',
                                       {'stroke-width': 'inherit'});
            var box = svg.path(char_group,
                               box_arr.concat(back_box_arr).join(''),
                               {'id': short_name + '_box',
                                'class': 'box',
                                'fill': 'none'});
            var p = svg.path(char_group,
                             edge_arr.join(''),
                             {'id': short_name,
                              'stroke': group_colors[c_nodes.character.group],
                              'stroke-width': 'inherit',
                              'stroke-linecap': 'round',
                              'stroke-linejoin': 'round',
                              'fill': 'none'});
            if(dead_arr.length > 1) {
                svg.path(char_group,
                         dead_arr.join(''),
                         {'id': short_name + '_dead',
                          'stroke': group_colors[c_nodes.character.group],
                          'stroke-width': 'inherit',
                          'stroke-linecap': 'round',
                          'stroke-linejoin': 'round',
                          'stroke-dasharray': '10',
                          'fill': 'none'});
            }
            for(var j=0; j<deaths.length; j++) {
                var death = deaths[j];
                svg.circle(char_group, death[0], death[1], death[2], death_icon_settings);
            }
            for(var j=0; j<undeaths.length; j++) {
                var undeath = undeaths[j];
                svg.circle(char_group, undeath[0], undeath[1], undeath[2], undeath_icon_settings);
            }
        }
        svg.change(g, {'transform': 'scale(' + original_scale + ')'});
        $(g).mouseover(function(e) {
            if(e.target.className.baseVal == 'box') {
                var parent_stroke = e.target.parentNode.parentNode.getAttribute('stroke-width');
                var corrected_scale = scale > 1 ? 4 / scale : 4;
                svg.change(e.target.nextElementSibling, {'stroke-width': parent_stroke});
                $(e.target.nextElementSibling).animate({'svgStrokeWidth': corrected_scale}, 200);
            }
        });
        $(g).mouseout(function(e) {
            if(e.target.className.baseVal == 'box') {
                var parent_stroke = e.target.parentNode.parentNode.getAttribute('stroke-width');
                $(e.target.nextElementSibling).animate({'svgStrokeWidth': parent_stroke}, 200);
                svg.change(e.target.nextElementSibling, {'stroke-width': 'inherit'});
            }
        });
    }

    function draw_curvy(graph, group_colors, svg, original_scale, x_offset, y_offset) {
        var g = svg.group('graph');
        var pov = svg.group(g, 'pov', {'stroke-width': 3}); //***
        var non_pov = svg.group(g, 'non_pov', {'stroke-width': 1}); //***
        var death_icon_settings = {'fill': 'black'}; //***
        var undeath_icon_settings = {'stroke': 'black', 'fill': 'white'}; //***
        for(var i=0; i<graph.char_nodes.length; i++) {
            var c_nodes = graph.char_nodes[i];
            var dead_arr = [];
            var short_name = c_nodes.character.short_name;
            var last = {'x': c_nodes.nodes[0].x, 'y': c_nodes.nodes[0].y + c_nodes.nodes[0].sub_node_order[short_name] * 15}; //*** 15 spacing
            var edge_arr = ['M', last.x, last.y];
            var start = 'M' + last.x + ' ' + last.y;
            var deaths = [];
            var undeaths = [];
            var dead = false;
            var segments = [];
            var horiz = false;
            var last_horiz = false;
            for(var j=0; j<c_nodes.nodes.length; j++) {
                var node = c_nodes.nodes[j];
                if(node.r) continue;
                var edge_y = node.y + (node.sub_node_order[short_name] * 15); //*** 15 size here
                var end_x = node.x + node.duration;
                var this_seg = [];
                if(j) {
                    var bend = Math.min(node.x - last.x - 50, Math.floor(.375 * Math.abs(last.y - edge_y))); //*** bendiness
                    var last_segment = segments[segments.length - 1];
                    last_horiz = horiz;
                    horiz = last.y == edge_y;
                    if(horiz) {
                        if(last_horiz) {
                            edge_arr[edge_arr.length - 1] = end_x;
                            last_segment.x_range[1] = end_x;
                            last_segment.d[1] = end_x;
                        } else {
                            this_seg = ['H', end_x];
                            segments.push({'x_range': [last.x, end_x],
                                           'y_range': [edge_y, edge_y],
                                           'type': 'H',
                                           'd': this_seg});
                        }
                    } else {
                        this_seg = ['C', last.x + bend, last.y, node.x - bend, edge_y, node.x, edge_y];
                        segments.push({'x_range': [last.x, node.x],
                                       'y_range': [last.y, edge_y],
                                       'type': 'C',
                                       'd': this_seg,
                                       'bezier': new goog.math.Bezier(last.x, last.y, last.x + bend, last.y, node.x - bend, edge_y, node.x, edge_y)});
                        last_horiz = false;
                    }
                    if(this_seg.length) {
                        edge_arr = edge_arr.concat(this_seg);
                    }

                    if(dead) {
                        if(last_horiz) {
                            dead_arr[dead_arr.length - 1] = end_x;
                        } else {
                            dead_arr = dead_arr.concat(this_seg);
                        }
                    }
                }
                if(node.duration && !horiz) {
                    edge_arr.push('H', end_x);
                    if(dead) {
                        dead_arr.push('H', end_x);
                    }
                    segments.push({'x_range': [node.x, end_x],
                                   'y_range': [edge_y, edge_y],
                                   'type': 'H',
                                   'd': ['H', end_x]});
                    horiz = true;
                }
                last = {'x': end_x, 'y': edge_y};

                if(node.deaths && goog.array.contains(node.deaths, short_name)) {
                    deaths.push([end_x, edge_y, 5]); //*** 5?
                    if(!dead) {
                        dead_arr.push('M', end_x, edge_y);
                        dead = true;
                    }
                }
                if(node.undeaths && goog.array.contains(node.undeaths, short_name)) {
                    undeaths.push([end_x, edge_y, 5]); //*** 5?
                    dead = false;
                }
            }
            var group = c_nodes.character.pov ? pov : non_pov;
            
            var char_group = svg.group(group,
                                       short_name + '_group',
                                       {'stroke-width': 'inherit'});
            var p = svg.path(char_group,
                             start,
                             {'id': short_name,
                              'class': 'character',
                              'stroke': group_colors[c_nodes.character.group],
                              'stroke-width': 'inherit',
                              'stroke-linecap': 'round',
                              'stroke-linejoin': 'round',
                              'fill': 'none'});

            var last_len = 0;
            for(var j=0; j<segments.length; j++) {
                var seg = segments[j];
                var d = $(p).attr('d') || '';
                svg.change(p, {'d': d + seg.d.join(' ')});
                if(seg.type == 'C') {
                    var p_len = p.getTotalLength();
                    seg.len_range = [last_len, p_len];
                    last_len = p_len;
                } else if(seg.type == 'H') {
                    var p_len = last_len + seg.x_range[1] - seg.x_range[0];
                    seg.len_range = [last_len, p_len];
                    last_len = p_len;
                }
            }

            var p_jq = $(p);
            p_jq.data('segments', segments);
            p_jq.data('length', last_len);
            var skip_points = [];
            p_jq.data('skip_points', skip_points);
            if(dead_arr.length > 1) {
                svg.path(char_group,
                         dead_arr.join(' '),
                         {'id': short_name + '_dead_background',
                          'stroke': 'white', //*** Should match background color
                          'stroke-width': '4', //*** really ought to be whatever plus 1
                          'stroke-linecap': 'round',
                          'stroke-linejoin': 'round',
                          'fill': 'none'});
                svg.path(char_group,
                         dead_arr.join(' '),
                         {'id': short_name + '_dead',
                          'stroke': group_colors[c_nodes.character.group],
                          'stroke-width': 'inherit',
                          'stroke-linecap': 'round',
                          'stroke-linejoin': 'round',
                          'stroke-dasharray': '10',
                          'fill': 'none'});
            }
            for(var j=0; j<deaths.length; j++) {
                var death = deaths[j];
                svg.circle(char_group, death[0], death[1], death[2], death_icon_settings);
                skip_points.push(death);
            }
            for(var j=0; j<undeaths.length; j++) {
                var undeath = undeaths[j];
                svg.circle(char_group, undeath[0], undeath[1], undeath[2], undeath_icon_settings);
                skip_points.push(undeath);
            }

            var name_text = svg.text(char_group, null, null, '', {'fill': 'black',
                                                                  'font-family': 'fantasy',
                                                                  'font-size': '9',
                                                                  'dy': '-2'}); //**** all this stuff
            // if(text_len > path_len) {
            //     //do voodoo here
            //     svg.remove(name_text);
            // } else {
                //do a use
            // }
            p_jq.data('name_path', svg.textpath(name_text,
                                                '#' + short_name,
                                                c_nodes.character.name));
            p_jq.data('name_len', name_text.getComputedTextLength());
        }
        svg.change(g, {'transform': 'translate(' + x_offset + ',' + y_offset + '), scale(' + original_scale + ')'});
    }

    function draw_graph(paper_id, graph, group_colors) {
        var paper_jq = $('#' + paper_id);
        paper_jq.children().remove();
        var body = $('body');
        var p_width = paper_jq.width();
        var p_height = paper_jq.height();
        var w_scale = p_width / graph.max_x;
        var h_scale = p_height / graph.max_y;
        if(w_scale < h_scale) {
            var original_scale = w_scale;
            var x_offset = 0;
            var y_offset = (p_height / 2) - (w_scale * graph.max_y / 2);
        } else {
            var original_scale = h_scale;
            var x_offset = (p_width / 2) - (h_scale * graph.max_x / 2);
            var y_offset = 0;
        }
        var scale = original_scale;
        paper_jq.svg({
            'onLoad': function(svg) { draw_curvy(graph, group_colors, svg, original_scale, x_offset, y_offset); },
            'settings': {'width': p_width,
                         'height': p_height - 15}
            }
        );

        var translate = {'x': x_offset, 'y': y_offset};
        var svg = paper_jq.svg('get');
        var g = svg.getElementById('graph');
        var pov = svg.getElementById('pov');
        var non_pov = svg.getElementById('non_pov');
        var old_scale;

        function segment_search(a, b) {
            return a > b.x_range[1] ? 1 : a < b.x_range[0] ? -1 : 0;
        }

        function point_and_length_at_x(seg, x, tol) {
            var mid_x = (seg.x_range[0] + seg.x_range[1]) / 2;
            var mid_len = (seg.len_range[0] + seg.len_range[1]) / 2;
            var left, right;

            // Since we know the curve is symmetrical, we can do one iteration
            // without going through the expensive math.
            if(x < mid_x - tol) {
                left = 0;
                right = .5;
            } else if(x > mid_x + tol) {
                left = .5;
                right = 1;
            } else {
                return mid_len;
            }
            
            while(true) {
                mid_len = (left + right) / 2;
                var mid_result = seg.bezier.getPoint(mid_len);
                if(x < mid_result.x - tol) {
                    right = mid_len;
                } else if(x > mid_result.x + tol) {
                    left = mid_len;
                } else {
                    return {'point': mid_result,
                            'length': seg.bezier.lengthAtPoint(mid_len) + seg.len_range[0]};
                }
            }
        }

        function point_and_length_at_y(seg, y, tol) {
            var mid_y = (seg.y_range[0] + seg.y_range[1]) / 2;
            var mid_len = (seg.len_range[0] + seg.len_range[1]) / 2;
            var left, right;

            // Since we know the curve is symmetrical, we can do one iteration
            // without going through the expensive math.
            if(y < mid_y - tol) {
                left = 0;
                right = .5;
            } else if(y > mid_y + tol) {
                left = .5;
                right = 1;
            } else {
                return mid_len;
            }
            
            while(true) {
                mid_len = (left + right) / 2;
                var mid_result = seg.bezier.getPoint(mid_len);
                if(y < mid_result.y - tol) {
                    right = mid_len;
                } else if(y > mid_result.y + tol) {
                    left = mid_len;
                } else {
                    return {'point': mid_result,
                            'length': seg.bezier.lengthAtPoint(mid_len) + seg.len_range[0]};
                }
            }
        }

        function point_and_length_at_y_neg(seg, y, tol) {
            var mid_y = (seg.y_range[0] + seg.y_range[1]) / 2;
            var mid_len = (seg.len_range[0] + seg.len_range[1]) / 2;
            var left, right;

            // Since we know the curve is symmetrical, we can do one iteration
            // without going through the expensive math.
            if(y > mid_y + tol) {
                left = 0;
                right = .5;
            } else if(y < mid_y - tol) {
                left = .5;
                right = 1;
            } else {
                return mid_len;
            }
            
            while(true) {
                mid_len = (left + right) / 2;
                var mid_result = seg.bezier.getPoint(mid_len);
                if(y > mid_result.y + tol) {
                    right = mid_len;
                } else if(y < mid_result.y - tol) {
                    left = mid_len;
                } else {
                    return {'point': mid_result,
                            'length': seg.bezier.lengthAtPoint(mid_len) + seg.len_range[0]};
                }
            }
        }

        function move_name(left_x, right_x, top_y, bottom_y) {
            left_x += 20; //****
            top_y += 20; //***
            bottom_y -= 20; //***
            return function() {
                var p = $(this);
                var segments = p.data('segments');
                var last_index = segments.length - 1;

                if(left_x > segments[last_index].x_range[1]) {
                    return;
                }

                var p_len = p.data('length');
                var name_len = p.data('name_len');
                var skip_points = p.data('skip_points');
                var max_offset = p_len - name_len;
                var seg, start_offset, index;
                var right_of_left = false;

                if(left_x < segments[0].x_range[0]) {
                    seg = segments[0];
                    index = 0;
                    right_of_left = true;
                } else if(left_x <= segments[last_index].x_range[1]) {
                    index = goog.array.binarySearch(segments, left_x, segment_search);
                    seg = segments[index];
                }

                var crossing_y, p_and_l;
                if(seg.type == 'H') {
                    crossing_y = seg.y_range[0];
                    p_and_l = {'point': {'x': left_x, 'y': crossing_y},
                               'length': seg.len_range[0] + left_x - seg.x_range[0]};
                } else if(seg.type == 'C') {
                    p_and_l = point_and_length_at_x(seg, left_x, .1);  //*** .1 tolerance
                    crossing_y = p_and_l.point.y;
                }

                if(crossing_y >= top_y && crossing_y <= bottom_y) {
                    start_offset = right_of_left ? 0 : Math.min(p_and_l.length, max_offset);
                } else {
                    while(!start_offset && seg && seg.x_range[0] < right_x) {
                        if(seg.type == 'C') {
                            var y_p_and_l;
                            if(crossing_y < top_y && seg.y_range[1] >= top_y) {
                                y_p_and_l = point_and_length_at_y(seg, top_y, 1); //*** .1 tol
                            } else if(crossing_y > bottom_y && seg.y_range[1] <= bottom_y) {
                                y_p_and_l = point_and_length_at_y_neg(seg, bottom_y, 1); //*** .1 tol
                            }
                            if(y_p_and_l) {
                                start_offset = Math.min(y_p_and_l.length, max_offset);
                            }
                        }
                        index++;
                        seg = segments[index];
                    }
                }

                if(!start_offset) {
                    return;
                }

                var len_right = seg.len_range[1];
                var segs = [seg];
                index++;
                seg = segments[index];
                while(seg && len_right < start_offset + name_len) {
                    segs.push(seg);
                    len_right = seg.len_range[1];
                    index++;
                    seg = segments[index];
                }

                for(var i=0; i<skip_points.length; i++) {
                    var pt = skip_points[i];
                    var pt_diam = pt[2];
                    for(var j=0; j<segs.length; j++) {
                        var s = segs[j];
                        if(s.x_range[0] == pt[0]) {
                            if(start_offset < s.len_range[0] + pt_diam) {
                                start_offset = s.len_range[0] + pt_diam;
                            }
                        } else if(s.x_range[1] == pt[0]) {
                            if(start_offset + name_len > s.len_range[1] - pt_diam) {
                                start_offset = s.len_range[1] - name_len - pt_diam;
                            }
                        }
                    }
                }
                svg.change(p.data('name_path'), {'startOffset': start_offset});
            };
        }

        function zoom_graph(e, delta) {
            old_scale = scale;
            scale = Math.min(10, Math.max(.05, scale * Math.pow(1.2, (delta / Math.abs(delta))))); //*** min and max scales
            if(scale != old_scale) {
                var k = scale / old_scale;
                translate = {'x': e.pageX + (k * (translate.x - e.pageX)),
                             'y': e.pageY + (k * (translate.y - e.pageY))};
                svg.change(g, {'transform': 'translate(' + translate.x + ',' + translate.y + '), scale(' + scale + ')'});
                if(scale > 1) {
                    svg.change(pov, {'stroke-width': 3 / scale}); //*** pov width
                    svg.change(non_pov, {'stroke-width': 1 / scale}); //*** non-pov width
                }
                var left_x = -translate.x / scale;
                var right_x = left_x + (p_width / scale);
                var top_y = -translate.y / scale;
                var bottom_y = top_y + (p_height / scale);
                $('path.character').each(move_name(left_x, right_x, top_y, bottom_y));
            }
            return false;
        }

        paper_jq.mousewheel(zoom_graph);
        paper_jq.dblclick(function(e) {
            var in_out;
            if(e.which == 1) {
                in_out = 2;
            } else if(e.which == 3) {
                in_out = -2;
            }
            if(in_out) {
                zoom_graph(e, in_out);
            }
        });

        var mouse_position;
        paper_jq.mousedown(function(e) {
            mouse_position = {'x': e.pageX, 'y': e.pageY};
            original_translate = {};
            goog.object.extend(original_translate, translate);
            paper_jq.mousemove(function(e) {
                translate = {'x': original_translate.x + e.pageX - mouse_position.x,
                             'y': original_translate.y + e.pageY - mouse_position.y};

                svg.change(g, {'transform': 'translate(' + translate.x + ',' + translate.y + '), scale(' + scale + ')'});
                var left_x = -translate.x / scale;
                var right_x = left_x + (p_width / scale);
                var top_y = -translate.y / scale;
                var bottom_y = top_y + (p_height / scale);
                $('path.character').each(move_name(left_x, right_x, top_y, bottom_y));
            });
        });

        paper_jq.mouseup(function(e) {
            paper_jq.unbind('mousemove');
        });

        // for(var i in graph.flat_nodes) {
        //     var node = graph.flat_nodes[i];
        //     if(node.draw) {
        //         var c = svg.circle(g, node.x, node.y, 10, {'fill': 'red'});

        //         (function(node) {
        //             $(c).click(function() {
        //                 console.log(node);
        //             });
        //         })(node);
        //     }
        // }

        // for(var i in graph.p_nodes) {
        //     var node = graph.p_nodes[i];
        //     if(node.draw) {
        //         var c = svg.circle(g, node.x, node.y, 10, {'fill': 'green'});

        //         (function(node) {
        //             $(c).click(function() {
        //                 console.log(node);
        //             });
        //         })(node);
        //     }
        // }

        // for(var i in graph.q_nodes) {
        //     var node = graph.q_nodes[i];
        //     if(node.draw) {
        //         var c = svg.circle(g, node.x, node.y, 10, {'fill': 'blue'});

        //         (function(node) {
        //             $(c).click(function() {
        //                 console.log(node);
        //             });
        //         })(node);
        //     }
        // }

        // for(var i in graph.r_nodes) {
        //     var node = graph.r_nodes[i];
        //     if(node.draw) {
        //         var c = svg.circle(g, node.x, node.y, 10, {'fill': 'yellow'});

        //         (function(node) {
        //             $(c).click(function() {
        //                 console.log(node);
        //             });
        //         })(node);
        //     }
        // }
    }

    function post_process(graph) {
        var grouped_already = [];
        var current_groups = [];
        var group_hash = {};
        for(var i=0; i<graph.e_compaction.length; i++) {
            var L = graph.e_compaction[i];
            for(var j=0; j<L.length; j++) {
                var node = L[j];

                for(var k=0; k<current_groups.length; k++) {
                    var groups = current_groups[k].groups;
                    for(var l=0; l<groups.length; l++) {
                        var group = groups[l];
                        if(group.length == 1) {
                            continue;
                        }
                        var intersection = intersect(group, node.sub_nodes);
                        if(intersection.length && intersection.length != group.length) {
                            for(var m=0; m<intersection.length; m++) {
                                group.splice(goog.array.indexOf(group, intersection[m]), 1);
                            }
                            groups.splice(l, 0, intersection);
                            l++;
                        }
                    }
                }

                var initials = [];
                var node_groups = {'node': node, 'groups': [node.sub_nodes.slice(0)]};
                for(var k=0; k<node.sub_nodes.length; k++) {
                    var sub_node = node.sub_nodes[k];
                    if(!goog.array.contains(grouped_already, sub_node)) {
                        initials.push(sub_node);
                        group_hash[sub_node] = node_groups;
                    }
                }

                if(initials.length) {
                    current_groups.push(node_groups);
                    grouped_already = grouped_already.concat(initials);
                }
            }
        }

        for(var i=0; i<current_groups.length; i++) {
            current_groups[i].node.initial_ordering = current_groups[i].groups;
            current_groups[i].node.sub_nodes = goog.array.flatten(current_groups[i].groups);
        }

        var last_pos = {};
        for(var i=0; i<graph.e_compaction.length; i++) {
            var L = graph.e_compaction[i];
            // Reset the graph sub node order
            for(var j=0; j<L.length; j++) {
                var node = L[j];
                if(node.draw) {
                    if(node.nodes) {
                        // If this is a segment, just reset the node position for all sub nodes;
                        // sub node position is guaranteed to remain the same
                        for(var k=0; k<node.sub_nodes.length; k++) {
                            var sub_node = node.sub_nodes[k];
                            last_pos[sub_node][0] = j;
                        }
                    } else {

                        function sub_node_compare(a, b) {
                            if(node.sub_node_pos[a][0] != node.sub_node_pos[b][0]) {
                                return node.sub_node_pos[b][0]- node.sub_node_pos[a][0];
                            } else {
                                return node.sub_node_pos[b][1] - node.sub_node_pos[a][1];
                            }
                        }

                        node.sub_node_order = {};

                        var initials = [];
                        for(var k=0; k<node.sub_nodes.length; k++) {
                            var sub_node = node.sub_nodes[k];
                            if(last_pos[sub_node]) {
                                node.sub_node_pos[sub_node] = last_pos[sub_node];
                            } else {
                                node.sub_node_pos[sub_node] = [j,k,0];
                                initials.push(sub_node);
                            }
                        }
                        if(initials.length && initials.length != node.sub_nodes.length) {
                            for(var k=0; k<node.initial_ordering.length; k++) {
                                var group = node.initial_ordering[k];
                                var initials_in_group = intersect(group, initials);
                                if(initials_in_group.length && initials_in_group.length < group.length) {
                                    var non_initials_in_group = goog.array.filter(group, function(sub_node) {
                                        return !goog.array.contains(initials_in_group, sub_node);
                                    });
                                    goog.array.stableSort(non_initials_in_group, sub_node_compare);
                                    var lowest_pos = node.sub_node_pos[non_initials_in_group[0]];
                                    for(var l=0; l<initials_in_group.length; l++) {
                                        var initial = initials_in_group[l];
                                        node.sub_node_pos[initial] = lowest_pos.slice(0);
                                        node.sub_node_pos[initial][2] = l + 1;
                                    }
                                }
                            }
                        }
                                    
                        goog.array.stableSort(node.sub_nodes, function(a, b) {
                            if(node.sub_node_pos[a][0] != node.sub_node_pos[b][0]) {
                                return node.sub_node_pos[a][0] - node.sub_node_pos[b][0];
                            } else {
                                return node.sub_node_pos[a][1] - node.sub_node_pos[b][1];
                            }
                        });

                        for(var k=0; k<node.sub_nodes.length; k++) {
                            var sub_node = node.sub_nodes[k];
                            node.sub_node_order[sub_node] = k;
                            last_pos[sub_node] = [j,k,0];
                        }
                        
                        // Reset markedness
                        for(var target_id in node.edges) {
                            var edge = node.edges[target_id];
                            edge.marked = graph.marked[node.id][target_id];
                        }
                    }
                }
            }
        }

        return graph;
    }

    var NChart = function(paper_id, character_info, layers) {
        this.paper_id = paper_id;
        this.character_info = character_info;
        this.layers = layers;
    };

    NChart.prototype.draw = function() {
        var graph = parse_layers(this.layers, this.character_info.characters);
        var ordered_graph = order(graph);
        post_process(ordered_graph);
        place_nodes(ordered_graph, 50);
        draw_graph('paper', ordered_graph, this.character_info.colors);

        return this;
    };

    window.NChart = NChart;
})(window);