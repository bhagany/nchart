// TODO:
// Hinting for where you'd like to see nodes sorted
// Show events
// Test speed of alternate getting of segment lengths (not actually drawing, use tags, etc)
// Support flipping x and y
// Add name sliding to the straight line graph
// Add centering to the straight line graph
// Deal with names that are too long for their paths
// Take out unnecessary stableSorts
// Fix Aeron and Victarion crossing Essos line
// Disappearances (alongside deaths and undeaths) - create a general configurable thing?
// Debug:
//  Display final number of crossings
//  Highlight and info on mouseover for debug stuff
//  Show anchors
//  Step-through of crossing reduction
// If we're going to reorder paths, they can't be in a group for each type (default, pov, etc)
// What if you disappear while dead?
// Beginning the story in a non-default state
// Draw segments between unaligned nodes behind other lines
// Calc arc radius based on # of nodes going in a direction, not on absolute subnode order
// CSS instead of JS for most styles
// Switching allegiances / colors on character paths
// Allow deaths, undeaths, etc at different times in a layer


(function(window) {

    goog.require('goog.array');
    goog.require('goog.object');
    goog.require('goog.math');

    var NChart = function(paper_id, characters, layers, conf) {
        this.paper_id = paper_id;
        this.characters = characters;

        goog.object.extend(this, this.defaults(), conf);

        if(!this.group_styles.default_group) {
            this.group_styles.default_group = {'stroke-width': 1};
        }

        var self = this;
        goog.array.forEach(['top', 'right', 'bottom', 'left'], function(dir) {
            self.initial_padding[dir] = self.initial_padding[dir] || 0;
        });
        if(this.start_scale == 'auto') {
            this.start_scale = null;
        }

        if(this.debug && !(this.debug.direction > 0 && this.debug.direction < 5)) {
            var self = this;
            goog.array.forEach(['blocks', 'classes'], function(feature) {
                if(goog.array.contains(self.debug.features, feature)) {
                    goog.array.remove(self.debug.features, feature);
                    alert('Cannot draw ' + feature + ' without a direction');
                }
            });
            delete this.debug.direction;
        }
        this.plotter = conf.plotter ? new conf.plotter(this) : new NChart.Plotter(this);
        this.drawer = conf.drawer ? new conf.drawer(this) : new NChart.SvgDrawer(this);

        this.graph = this.parse_layers(layers);
    };

    NChart.prototype.defaults = function() {
        var node_spacing = 50;
        return {
            node_spacing: node_spacing,
            subnode_spacing: 15,
            min_layer_spacing: 50,
            min_arc_radius: 30,
            max_line_slope: 10,
            states: {
                'default': {
                    'icon': null,
                    'noun': null,
                    'following_style': 'default'
                },
                'dead': {
                    'icon': {
                        'circle': {
                            'r': 5,
                            'fill': 'black'
                        },
                        'skip_radius': 7,
                        'placement': 'end'
                    },
                    'noun': 'deaths',
                    'following_style': 'dead',
                    'reverses': 'default'
                },
                'undead': {
                    'icon': {
                        'circle': {
                            'r': 5,
                            'fill': 'white',
                            'stroke': 'black'
                        },
                        'skip_radius': 7,
                        'placement': 'end'
                    },
                    'noun': 'undeaths',
                    'reverses': 'dead'
                },
                'disappeared': {
                    'icon': {
                        'path': {
                            'd': [
                                'm2,0',
                                'm-3.5,-6.06218', 'l-4,-6.92822',
                                'm7.5,12.9904',
                                'm-3.5,6.06218', 'l-4,6.92822',
                                'm7.5,-12.9904',
                                'm3.5,-6.06218', 'l4,-6.92822',
                                'm-7.5,12.9904',
                                'm3.5,6.06218', 'l4,6.92822',
                                'm-7.5,-12.9904',
                                'm7,0', 'l8,0'
                            ].join(' '),
                            'stroke': 'black',
                            'stroke-width': 2,
                            'stroke-linecap': 'round'
                        },
                        'skip_radius': 8,
                        'placement': 'end'
                    },
                    'noun': 'disappearances',
                    'following_style': 'disappeared',
                    'reverses': 'default'
                },
                'reappeared': {
                    'icon': {
                        'path': {
                            'd': [
                                'm-2,0',
                                'm-3.5,-6.06218', 'l-4,-6.92822',
                                'm7.5,12.9904',
                                'm-3.5,6.06218', 'l-4,6.92822',
                                'm7.5,-12.9904',
                                'm3.5,-6.06218', 'l4,-6.92822',
                                'm-7.5,12.9904',
                                'm3.5,6.06218', 'l4,6.92822',
                                'm-7.5,-12.9904',
                                'm-7,0', 'l-8,0'
                            ].join(' '),
                            'stroke': 'black',
                            'stroke-width': 2,
                            'stroke-linecap': 'round'
                        },
                        'skip_radius': 8,
                        'placement': 'start'
                    },
                    'noun': 'reappearances',
                    'reverses': 'disappeared'
                }
            },
            group_styles: {
                'default': {
                    'stroke-width': 1
                }
            },
            path_styles: {
                'default': {
                    'stroke-width': 'inherit',
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'fill': 'none'
                },
                'dead': {
                    'stroke-width': 'inherit',
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'stroke-dasharray': '10',
                    'fill': 'none'
                },
                'disappeared': null
            },
            death_style: {
                'fill': 'black',
                'radius': 5
            },
            undeath_style: {
                'fill': 'white',
                'stroke': 'black',
                'radius': 5
            },
            name_style: {
                'fill': 'black',
                'font-family': 'fantasy',
                'font-size': '9',
                'dy': '-2'
            },
            name_padding: {
                'top': 20,
                'bottom': 20,
                'left': 20
            },
            initial_padding: {
                'top': 20,
                'right': 20,
                'bottom': 20,
                'left': 20
            },
            max_scale: 10,
            min_scale: .05,
            start_scale: 'auto',
            path_breakers: ['disappearances'],
            debug: null
        };
    };

    NChart.prototype.calc = function() {
        this.order();
        this.post_process();
        return this;
    };

    NChart.prototype.plot = function() {
        this.plotter.place_nodes();
        return this;
    };

    NChart.prototype.draw = function() {
        var self = this;
        $(function() {
            self.paper = $('#' + self.paper_id);
            self.drawer.draw_graph();
        });
        return this;
    };

    NChart.prototype.parse_layers = function(layers) {
        var last_nodes = {};
        function update_last_nodes(node, names) {
            for(var i=0; i<names.length; i++) {
                var name = names[i];
                last_nodes[name] = node;
            }
        }

        var c_nodes = {};
        var char_nodes = [];
        for(var i=0; i<layers.length; i++) {
            var layer = layers[i];
            layer.segs = {};
            layer.num = i;
            layer.prev = layers[i - 1];
            layer.next = layers[i + 1];
            layer.node_positions = {};

            for(var j=0; j<layer.nodes.length; j++) {
                var node = layer.nodes[j];
                node.id = i + '-' + j;
                node.duration = layer.duration;
                node.parents = [];
                node.children = [];
                node.layer = layer;
                node.draw = true;
                node.edges = {};
                node.subnode_positions = {};
                layer.node_positions[node.id] = j;
                for(var k=0; k<node.subnodes.length; k++) {
                    var name = node.subnodes[k];
                    var last_node = last_nodes[name];
                    node.subnode_positions[name] = k

                    goog.object.setIfUndefined(c_nodes, name, []);

                    if(last_node && last_node != node) {
                        var span = i - last_node.layer.num;
                        var subnodes = intersect(node.subnodes, last_node.subnodes);

                        // Other characters may be present in last_node and node, but
                        // not be included in this edge, because they were referenced
                        // by other nodes in the interim. Remove those.
                        for(var l=0; l<subnodes.length; l++) {
                            if(last_nodes[subnodes[l]] != last_node) {
                                subnodes.splice(l, 1);
                                l--;
                            }
                        }
                        if(span > 2) {
                            // Add two new nodes at layers last_node.layer.num + 1 and i - 1
                            var p_layer = layers[last_node.layer.num + 1];
                            var q_layer = layers[i - 1];
                            var p_node = {
                                'id': (last_node.layer.num + 1) + '-' + p_layer.nodes.length,
                                'subnodes': subnodes,
                                'duration': 0,
                                'layer': p_layer,
                                'p': true,
                                'span': span,
                                'draw': last_node.draw,
                                'edges': {},
                                'parents': [],
                                'children': []
                            };
                            var q_node = {
                                'id': (i - 1) + '-' + q_layer.nodes.length,
                                'subnodes': subnodes,
                                'duration': 0,
                                'layer': q_layer,
                                'q': true,
                                'span': span,
                                'draw': last_node.draw,
                                'edges': {},
                                'parents': [],
                                'children': []
                            };
                            // We should place these nodes more intelligently, so that all subnodes in last_node.layer
                            // that came before last_node are still before p_node, and all subnodes in last_node.layer
                            // that came after last_node are still after p_node
                            p_layer.nodes.push(p_node);
                            q_layer.nodes.push(q_node);

                            // Add two new edges last_node.layer -> p_layer, p_layer -> q_layer
                            // for each name in this node
                            for(var n=0; n<subnodes.length; n++) {
                                var seg_name = subnodes[n];
                                if(last_node == last_nodes[seg_name]) {
                                    if(last_node.draw) {
                                        c_nodes[seg_name].push(p_node);
                                        c_nodes[seg_name].push(q_node);
                                    }
                                } else {
                                    subnodes.splice(n, 1);
                                    n--;
                                }
                            }

                            this.add_pq_edges(last_node, p_node, q_node, node, subnodes);
                        } else if(span == 2) {
                            // Add one new vertex at layer i - 1
                            var r_layer = layers[i - 1];
                            var r_node = {
                                'id': (i - 1) + '-' + r_layer.nodes.length,
                                'subnodes': subnodes,
                                'duration': 0,
                                'layer': r_layer,
                                'r': true,
                                'draw': last_node.draw,
                                'edges': {},
                                'parents': [],
                                'children': []
                            };
                            r_layer.nodes.push(r_node);
                            // Add one new edge last_node.layer -> r_layer
                            // for each name in this node
                            for(var n=0; n<subnodes.length; n++) {
                                var seg_name = subnodes[n];
                                if(last_node == last_nodes[seg_name]) {
                                    if(last_node.draw) {
                                        c_nodes[seg_name].push(r_node);
                                    }
                                } else {
                                    subnodes.splice(n, 1);
                                    n--;
                                }
                            }
                            this.add_r_edges(last_node, r_node, node, subnodes);
                        } else {
                            // Add one edge normally
                            this.add_simple_edges(last_node, node, subnodes);
                        }

                        update_last_nodes(node, subnodes);
                    }
                    c_nodes[name].push(node);
                    last_nodes[name] = node;
                }

                // Dangling nodes don't need to be positioned
                node.dangle = node.dangle_left = !!node.children.length;
                if(node.dangle) {
                    for(var k=0; k<node.parents.length; k++) {
                        if(node.parents[k].dangle_left == false) {
                            node.dangle = node.dangle_left = false;
                            break;
                        }
                    }
                }

                for(var k=0; k<this.path_breakers.length; k++) {
                    var path_breaker = this.path_breakers[k];
                    if(node[path_breaker] && node[path_breaker].length) {
                        for(var l=0; l<node[path_breaker].length; l++) {
                            var name = node[path_breaker][l];
                            var character = this.characters[name];
                            character.short_name = name;
                            char_nodes.push({'character': character, 'nodes': c_nodes[name]});
                            delete c_nodes[name];
                            delete last_nodes[name];
                        }
                    }
                }
            }
        }

        var self = this;
        goog.object.forEach(c_nodes, function(nodes, name) {
            var character = self.characters[name];
            character.short_name = name;
            char_nodes.push({'character': character, 'nodes': nodes});
        });

        return {'layers': layers, 'char_nodes': char_nodes};
    };

    NChart.prototype.copy_node = function(node, dest_layer) {
        return {'id': dest_layer.num + '-' + dest_layer.nodes.length,
                'subnodes': node.subnodes.slice(0),
                'x': dest_layer.nodes[0].x,
                'duration': node.duration,
                'parents': [],
                'children': [],
                'layer': dest_layer,
                'edges': {}};
    };

    NChart.prototype.add_simple_edges = function(node1, node2, subnodes) {
        node1.children.push(node2);
        node2.parents.push(node1);

        var is_seg = !!(node1.nodes || node2.nodes || node1.p || node2.q);

        node1.edges[node2.id] = {'source': node1,
                                 'target': node2,
                                 'is_seg': is_seg,
                                 'subnodes': subnodes,
                                 'weight': subnodes.length};
        node2.edges[node1.id] = {'source': node2,
                                 'target': node1,
                                 'is_seg': is_seg,
                                 'subnodes': subnodes,
                                 'weight': subnodes.length};
    };

    NChart.prototype.add_r_edges = function(last_node, r_node, node, subnodes) {
        this.add_simple_edges(last_node, r_node, subnodes);
        this.add_simple_edges(r_node, node, subnodes);
    };

    NChart.prototype.add_pq_edges = function(last_node, p_node, q_node, node, subnodes) {
        this.add_simple_edges(last_node, p_node, subnodes);
        this.add_simple_edges(q_node, node, subnodes);

        var segment = {'id': p_node.id + '-' + q_node.id,
                       'nodes': [p_node, q_node],
                       'subnodes': subnodes,
                       'draw': last_node.draw,
                       'layer': p_node.layer.next,
                       'edges': {},
                       'parents': [],
                       'children': []};

        p_node.layer.segs[segment.id] = p_node.pq_seg = this.copy_segment(segment, p_node.layer);
        q_node.layer.segs[segment.id] = q_node.pq_seg = this.copy_segment(segment, q_node.layer);

        var span = q_node.layer.num - p_node.layer.num;
        if(span == 1) {
            this.add_simple_edges(p_node, q_node, subnodes);
        } else if(span == 2) {
            this.add_simple_edges(p_node, segment, subnodes);
            this.add_simple_edges(segment, q_node, subnodes);

            segment.layer.segs[segment.id] = segment;
        } else {
            var v_1 = segment;
            var v_2 = this.copy_segment(segment, p_node.layer.next.next);

            for(var i=p_node.layer.num + 1; i<q_node.layer.num - 1; i++) {
                this.add_simple_edges(v_1, v_2, subnodes);

                v_1.layer.segs[v_1.id] = v_1;
                v_2.layer.segs[v_2.id] = v_2;

                v_1 = v_2;
                v_2 = this.copy_segment(segment, v_2.layer.next);
            }

            this.add_simple_edges(p_node, segment, subnodes);
            this.add_simple_edges(v_1, q_node, subnodes);
        }
    };

    NChart.prototype.copy_segment = function(segment, dest_layer) {
        return {'id': segment.id,
                'nodes': segment.nodes.slice(0),
                'subnodes': segment.subnodes.slice(0),
                'draw': segment.draw,
                'layer': dest_layer,
                'edges': {},
                'parents': [],
                'children': []};
    };

    NChart.prototype.order = function(graph) {
        var total_crossings;
        var a = 0;
        var best = {'crossings': Infinity, 'compaction': []};
        goog.object.extend(best, this.graph);

        var reverse = false;
        var layer = this.graph.layers[0];
        layer.alt_L = [{'segs': []}];
        layer.subnodes = [];
        for(var i=0; i<layer.nodes.length; i++) {
            var v = layer.nodes[i];
            layer.alt_L.push(v);
            layer.alt_L.push({'segs': []});
            if(v.subnodes) {
                layer.subnodes = layer.subnodes.concat(v.subnodes);
            }
        }
        var cycles_in_progress = [];
        var potential_cycles = {};
        var crossing_results = [];
        var done = false;
        do {
            total_crossings = 0;
            var compaction = [layer.nodes.slice(0)];
            layer.L = compaction[0];
            for(var i=0; i<this.graph.layers.length - 1; i++) {
                var results = this.minimize_crossings(layer, reverse);
                total_crossings += results[0];
                layer = results[1];
                layer.subnodes = [];
                for(var j=0; j<layer.L.length; j++) {
                    var v = layer.L[j];
                    if(v.subnodes) {
                        layer.subnodes = layer.subnodes.concat(v.subnodes);
                    }
                }
                compaction = compaction.concat([layer.L]);
            }
            console.log(a, total_crossings);
            for(var i=0; i<cycles_in_progress.length; i++) {
                var cycle = cycles_in_progress[i];
                if(cycle.next == total_crossings) {
                    cycle.run++;
                    next_index = cycle.run % cycle.pattern.length;
                    if(next_index == 0) {
                        // This is the last number in the cycle
                        if(cycle.run / cycle.pattern.length == 3) {
                            // This is the end of the third cycle
                            done = true;
                            break;
                        }
                    }
                    cycle.next = cycle.pattern[next_index];
                    // We are guaranteed that this is the shortest active cycle, and it's the only
                    // one we want to keep track of until it completes 3 times, or fails
                    cycles_in_progress.splice(1);
                } else {
                    // Cycle failed; remove it
                    cycles_in_progress.splice(i, 1);
                    i--;
                }
            }

            if(!done) {
                var entry = goog.object.setIfUndefined(potential_cycles, total_crossings, []);
                // We don't need to guess at potential cycles if there's an active one
                if(!cycles_in_progress.length) {
                    // Add each start point to cycles_in_progress
                    for(var i=0; i<entry.length; i++) {
                        var start_idx = entry[i];
                        var pattern = crossing_results.slice(start_idx);
                        cycles_in_progress.unshift({
                            'next': pattern[1],
                            'run': pattern.length + 1,
                            'pattern': pattern
                        });
                    }
                }
                // Add this number to potential_cycles
                entry.push(crossing_results.length);
                crossing_results.push(total_crossings);

                if(total_crossings < best.crossings) {
                    best.a = a;
                    best.crossings = total_crossings;
                    best.compaction = compaction;
                    best.marked = {};
                    best.subnodes = {};
                    for(var i=0; i<this.graph.layers.length; i++) {
                        layer = this.graph.layers[i];
                        for(var j=0; j<layer.nodes.length; j++) {
                            var node = layer.nodes[j];
                            best.subnodes[node.id] = node.subnodes.slice(0);

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
                this.graph.layers.reverse();
                layer = this.graph.layers[0];
                layer.subnodes = [];
                for(var i=0; i<layer.L.length; i++) {
                    var v = layer.nodes[i];
                    if(v.subnodes) {
                        layer.subnodes = layer.subnodes.concat(v.subnodes);
                    }
                }
                a++;
            }
        } while(!done && a <= 30);

        if(reverse) {
            this.graph.layers.reverse();
        }

        console.log('best:', best.a, best.crossings);
        this.graph = best;
    };

    NChart.prototype.minimize_crossings = function(layer, reverse) {
        if(reverse) {
            var p = 'q';
            var q = 'p';
            var children = 'parents';
            var parents = 'children';
            var next_layer = layer.prev;
            var pq_num = 0;
        } else {
            var p = 'p';
            var q = 'q';
            var children = 'children';
            var parents = 'parents';
            var next_layer = layer.next;
            var pq_num = 1;
        }

        next_layer.L = this.make_L(layer, next_layer, p, q, parents);
        next_layer.alt_L = this.make_alt_L(next_layer, pq_num);
        var crossings = this.get_crossings(layer, next_layer.L, children, parents);
        return [crossings, next_layer];
    };

    NChart.prototype.make_L = function(layer, next_layer, p, q, parents) {
        this.replace_p_nodes(layer.alt_L, p);

        // Step 2
        var LS = [];
        var pos;
        for(var j=0; j<layer.alt_L.length; j+=2) {
            var S = this.copy_segment_container(layer.alt_L[j], next_layer);
            pos = j ? pos + 1 : 0;
            S.measure = S.pos = pos;
            pos += S.segs.length;
            if(S.segs.length > 0) {
                LS.push(S);
            }
            if(j < layer.alt_L.length - 1) {
                var node = layer.alt_L[j + 1];
                node.pos = pos;
            }
        }

        // Figure out measures of non-q nodes in next_layer based on pos of parent nodes in layer
        var LV = [];
        for(var j=0; j<next_layer.nodes.length; j++) {
            var node = next_layer.nodes[j];
            if(!node[q]) {
                LV.push(node);
            }
        }

        var used_measures = {};
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
            goog.object.setIfUndefined(used_measures, node.measure, []);
            // Track nodes with duplicate measures
            used_measures[node.measure].push(node);
        }

        // If we have any nodes with duplicate measures, we can further refine
        // the node's measure by taking into account where the sub nodes came from in
        // the previous layer
        goog.object.forEach(used_measures, function(nodes) {
            if(nodes.length > 1) {
                for(var i=0; i<nodes.length; i++) {
                    var node = nodes[i];
                    var sub_pos = 0;
                    for(var j=0; j<node.subnodes.length; j++) {
                        sub_pos += goog.array.indexOf(layer.subnodes, node.subnodes[j]);
                    }
                    node.sub_measure = sub_pos / node.subnodes.length;
                }
            }
        });

        goog.array.stableSort(LV, this.measure_sort);
        goog.array.stableSort(LS, this.measure_sort);

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
    };

    NChart.prototype.replace_p_nodes = function(alt_L, p) {
        // Step 1
        // Nodes are always have odd indices in alternating layers
        for(var j=1; j<alt_L.length; j+=2) {
            var item = alt_L[j];
            if(item[p]) {
                // Join segment container alt_L[j-1], this p_node's segment, and alt_L[j+1]
                alt_L[j-1].segs = alt_L[j-1].segs.concat(item.pq_seg,
                                                         alt_L.splice(j+1, 1)[0].segs);
                // Remove the p-node
                alt_L.splice(j, 1);
                j -= 2;
            }
        }
    };

    NChart.prototype.copy_segment_container = function(container, layer) {
        var new_c = {'segs': []};
        for(var i=0; i<container.segs.length; i++) {
            var seg = container.segs[i];
            new_c.segs.push(layer.segs[seg.id]);
        }
        return new_c;
    };

    NChart.prototype.sort_gen = function(prop) {
        return function(a, b) {
            return a[prop] - b[prop];
        };
    };

    NChart.prototype.measure_sort = function(a, b) {
        if(a.measure != b.measure) {
            return a.measure - b.measure;
        } else {
            return a.sub_measure - b.sub_measure;
        }
    }

    //NChart.prototype.sub_measure_sort = NChart.prototype.sort_gen('sub_measure');

    NChart.prototype.lowest_sub_pos_sort = NChart.prototype.sort_gen('lowest_sub_pos');

    NChart.prototype.make_alt_L = function(next_layer, pq_num) {
        this.replace_q_nodes(next_layer, pq_num);
        // Step 6
        var alt_L = this.copy_L(next_layer.L);
        var last = 'node';
        for(var j=0; j<alt_L.length; j++) {
            var item = alt_L[j];
            if(last == 'node' && item.subnodes) {
                alt_L.splice(j, 0, {'segs': []});
                last = 'segment';
            } else if(last == 'segment' && item.segs) {
                alt_L[j - 1].segs = alt_L[j - 1].segs
                    .concat(alt_L.splice(j, 1)[0].segs);
                j--;
                last = 'segment';
            } else {
                last = last == 'node' ? 'segment' : 'node';
            }
        }
        if(last == 'node') {
            alt_L.push({'segs': []});
        }
        next_layer.nodes = [];
        next_layer.segments = [];
        for(var j=0; j<alt_L.length; j++) {
            if(j % 2) {
                next_layer.nodes.push(alt_L[j]);
            } else {
                next_layer.segments.push(alt_L[j]);
            }
        }

        return alt_L;
    };

    NChart.prototype.copy_L = function(L) {
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
    };

    NChart.prototype.replace_q_nodes = function(next_layer, pq_num) {
        // Step 4
        var L = next_layer.L;
        for(var j=0; j<L.length; j++) {
            var item = L[j];
            if(item.segs) {
                // It's actually a segment container
                var S = item;
                for(var k=0; k<S.segs.length; k++) {
                    if(S.segs[k].nodes[pq_num].layer.num == next_layer.num) {
                        // It's a q node
                        var S_segs = S.segs.splice(0, k);
                        var S1 = {'pos': S.pos, 'segs': S_segs};
                        var S2 = S;
                        var v = S2.segs.splice(0, 1)[0].nodes[pq_num];

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
    };

    NChart.prototype.get_crossings = function(layer, L, children, parents) {
        var subnode_map = {};
        for(var i=0; i<layer.subnodes.length; i++) {
            subnode_map[layer.subnodes[i]] = i;
        }

        function subnode_compare(a, b) {
            return subnode_map[a] - subnode_map[b];
        }

        var prev_L = layer.L
        // Step 5
        // Need to find edges between L - 1 and L
        var L_map = {};
        var L_sub_map = {};
        var position = 0;
        for(var j=0; j<L.length; j++) {
            var node = L[j];
            if(node.subnodes) {
                if(node[parents] && node.draw) {
                    node.subnodes.sort(subnode_compare);
                    for(var k=0; k<node.subnodes.length; k++) {
                        var subnode = node.subnodes[k];
                        if(subnode_map[subnode]) {
                            L_sub_map[subnode] = position;
                        }
                    }
                    L_map[node.id] = position;
                    position++;
                }
            } else {
                var drew_one = false;
                for(var k=0; k<node.segs.length; k++) {
                    var seg = node.segs[k];
                    if(seg.draw) {
                        L_map[seg.id] = position;
                        drew_one = true;
                    }
                    for(var l=0; l<seg.subnodes.length; l++) {
                        var subnode = seg.subnodes[l];
                        if(seg.draw) {
                            L_sub_map[subnode] = position;
                        }
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
                        for(var m=0; m<edge.subnodes.length; m++) {
                            L_sub_map[edge.subnodes[m]] = sub_position;
                        }
                        sub_position++;
                    }
                }
                if(count_subs) {
                    var lower_sub_positions = [];
                    for(var l=0; l<node.subnodes.length; l++) {
                        lower_sub_positions.push(L_sub_map[node.subnodes[l]]);
                    }
                    crossings += this.count_sub_crossings(sub_position, lower_sub_positions);
                }
            }
        }
        // position just happens to be the number of nodes in L that have edges back to prev_L
        crossings += this.count_crossings(position, layer_edges, lower_positions, edge_weights);
        return crossings;
    };

    NChart.prototype.count_crossings = function(q, layer_edges, lower_positions, lower_weights) {
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

        var cross_count = 0;
        for(var k=0; k<lower_positions.length; k++) {  // insert edge k
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
    };

    NChart.prototype.count_sub_crossings = function(q, lower_positions) {
        var first_index = next2power(q);
        var tree_size = 2 * first_index - 1;
        first_index--;  // index of leftmost leaf

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
    };

    NChart.prototype.expand_compaction = function() {
        // Un-segmentify the compaction
        this.graph.e_compaction = [];
        for(var i=0; i<this.graph.compaction.length; i++) {
            var L = this.graph.compaction[i].slice(0);
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
            this.graph.layers[i].L = L;
            this.graph.e_compaction.push(L);
        }
    };

    NChart.prototype.neighborify = function() {
        var childrens = [];

        var node_sort = this.sort_gen('pos');

        for(var i=0; i<this.graph.e_compaction.length; i++) {
            var L = this.graph.e_compaction[i];

            var last_childrens = childrens;
            childrens = [];
            for(var j=0; j<L.length; j++) {
                var v = L[j];

                // Reset the pos, because the current configuration probably won't be the same as the last
                // time through the crossing reduction
                v.pos = j;
                v.r_pos = L.length - j - 1;

                if(j > 0) {
                    v.pred = L[j - 1];
                }
                if(j < L.length - 1) {
                    v.succ = L[j + 1];
                }

                // Sort v's parents, which have already been assigned their pos
                goog.array.stableSort(v.parents, node_sort);

                // Save v's children, for sorting after the next i loop, when they will have their poses as well
                childrens.push(v.children);
            }

            // Sort the children arrays from the last i loop
            for(var j=0; j<last_childrens.length; j++) {
                goog.array.stableSort(last_childrens[j], node_sort);
            }
        }
    };

    NChart.prototype.group_initial_nodes = function() {
        var grouped_already = [];
        var current_groups = [];
        for(var i=0; i<this.graph.e_compaction.length; i++) {
            var L = this.graph.e_compaction[i];
            for(var j=0; j<L.length; j++) {
                var node = L[j];
                var child = node.children[0];

                for(var k=0; k<current_groups.length; k++) {
                    if(current_groups[k].node.layer.num < node.layer.num) {
                        var groups = current_groups[k].groups;
                        for(var l=0; l<groups.length; l++) {
                            var group = groups[l];
                            if(group.length == 1) {
                                continue;
                            }
                            var intersection = intersect(group, node.subnodes);
                            if(intersection.length && intersection.length != group.length) {
                                for(var m=0; m<intersection.length; m++) {
                                    group.splice(goog.array.indexOf(group, intersection[m]), 1);
                                }
                                groups.splice(l, 0, intersection);
                                l++;
                            }
                        }
                    }
                }

                if(node.parents.length == 0 &&
                   node.children.length == 1 &&
                   child.parents.length > 1 &&
                   !goog.array.contains(grouped_already, child.id)) {
                    var groups = [];
                    for(var k=0; k<child.parents.length; k++) {
                        groups = groups.concat(intersect(child.subnodes,
                                                         child.parents[k].subnodes));;
                    }
                    current_groups.push({'node': child, 'groups': [groups]});

                    grouped_already.push(child.id);
                }
            }
        }
        for(var i=0; i<current_groups.length; i++) {
            var cg = current_groups[i];
            var groupage = goog.array.flatten(cg.groups);
            for(var j=0; j<cg.node.parents.length; j++) {
                var parent = cg.node.parents[j];
                parent.lowest_sub_pos = Infinity;
                for(var k=0; k<parent.subnodes.length; k++) {
                    parent.lowest_sub_pos = Math.min(parent.lowest_sub_pos,
                                                     goog.array.indexOf(groupage, parent.subnodes[k]));
                }
            }
            goog.array.stableSort(cg.node.parents, this.lowest_sub_pos_sort);
            var parent_L = cg.node.parents[0].layer.L;
            var insert_point = -1;
            var to_insert = [];
            for(var j=0; j<cg.node.parents.length; j++) {
                var parent = cg.node.parents[j];
                if(parent.parents.length) {
                    if(insert_point < 0) {
                        insert_point = goog.array.indexOf(parent_L, parent);
                    }
                    while(to_insert.length) {
                        parent_L.splice(insert_point, 0, to_insert.pop());
                        insert_point++;
                    }
                    insert_point++;
                } else {
                    var index = goog.array.indexOf(parent_L, parent);
                    var insert = parent_L.splice(index, 1)[0];
                    if(insert_point >= 0) {
                        parent_L.splice(index < insert_point ? insert_point - 1 : insert_point, 0, insert);
                    } else {
                        to_insert.push(insert);
                    }
                }
            }

            if(to_insert.length) {
                var L = cg.node.layer.L;
                var node_index = goog.array.indexOf(L, cg.node);
                var index;
                if(node_index < L.length - 1) {
                    index = goog.array.indexOf(parent_L, L[node_index + 1].parents[0]);
                } else if(node_index > 0) {
                    do {
                        node_index--;
                        var pred_parents = L[node_index].parents;
                        var last_pred_parent = pred_parents[pred_parents.length - 1];
                        index = goog.array.indexOf(parent_L, last_pred_parent) + 1;
                    } while(node_index && !pred_parents.length);

                    if(!index) {
                        index = 0;
                    }
                } else {
                    index = parent_L.length;
                }

                while(to_insert.length) {
                    parent_L.splice(index, 0, to_insert.pop());
                }
            }
        }
    };

    NChart.prototype.group_subnodes = function() {
        var grouped_already = [];
        var current_groups = [];
        for(var i=0; i<this.graph.e_compaction.length; i++) {
            var L = this.graph.e_compaction[i];
            for(var j=0; j<L.length; j++) {
                var node = L[j];

                for(var k=0; k<current_groups.length; k++) {
                    var groups = current_groups[k].groups;
                    for(var l=0; l<groups.length; l++) {
                        var group = groups[l];
                        if(group.length == 1) {
                            continue;
                        }
                        var intersection = intersect(group, node.subnodes);
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
                for(var k=0; k<node.subnodes.length; k++) {
                    var subnode = node.subnodes[k];
                    if(!goog.array.contains(grouped_already, subnode)) {
                        initials.push(subnode);
                    }
                }

                if(initials.length) {
                    current_groups.push({'node': node, 'groups': [node.subnodes.slice(0)]});
                    grouped_already = grouped_already.concat(initials);
                }
            }
        }

        for(var i=0; i<current_groups.length; i++) {
            current_groups[i].node.initial_ordering = current_groups[i].groups;
            current_groups[i].node.subnodes = goog.array.flatten(current_groups[i].groups);
        }
    };

    NChart.prototype.sort_subnodes = function() {
        this.group_subnodes();
        var last_pos = {};
        for(var i=0; i<this.graph.layers.length; i++) {
            var layer = this.graph.layers[i];
            var L = layer.L;

            function subnode_compare(a, b) {
                if(node.subnode_pos[a][0] != node.subnode_pos[b][0]) {
                    return node.subnode_pos[b][0] - node.subnode_pos[a][0];
                } else {
                    return node.subnode_pos[b][1] - node.subnode_pos[a][1];
                }
            }

            // Reset the graph sub node order
            for(var j=0; j<L.length; j++) {
                var node = L[j];
                node.subnode_pos = {};

                if(!node.nodes) {
                    var initials = [];
                    for(var k=0; k<node.subnodes.length; k++) {
                        var subnode = node.subnodes[k];
                        if(last_pos[subnode]) {
                            node.subnode_pos[subnode] = last_pos[subnode];
                        } else {
                            node.subnode_pos[subnode] = [j,k,0];
                            initials.push(subnode);
                        }
                    }
                    if(initials.length && initials.length != node.subnodes.length) {
                        for(var k=0; k<node.initial_ordering.length; k++) {
                            var group = node.initial_ordering[k];
                            var initials_in_group = intersect(group, initials);
                            if(initials_in_group.length && initials_in_group.length < group.length) {
                                var non_initials_in_group = goog.array.filter(group, function(subnode) {
                                    return !goog.array.contains(initials_in_group, subnode);
                                });
                                goog.array.stableSort(non_initials_in_group, subnode_compare);
                                var lowest_pos = node.subnode_pos[non_initials_in_group[0]];
                                for(var l=0; l<initials_in_group.length; l++) {
                                    var initial = initials_in_group[l];
                                    node.subnode_pos[initial] = lowest_pos.slice(0);
                                    node.subnode_pos[initial][2] = l + 1;
                                }
                            }
                        }
                    }

                    goog.array.stableSort(node.subnodes, function(a, b) {
                        if(node.subnode_pos[a][0] != node.subnode_pos[b][0]) {
                            return node.subnode_pos[a][0] - node.subnode_pos[b][0];
                        } else if(node.subnode_pos[a][1] != node.subnode_pos[b][1]) {
                            return node.subnode_pos[a][1] - node.subnode_pos[b][1];
                        } else {
                            return node.subnode_pos[a][2] - node.subnode_pos[b][2];
                        }
                    });

                    node.subnode_order = {};
                    for(var k=0; k<node.subnodes.length; k++) {
                        var subnode = node.subnodes[k];
                        node.subnode_order[subnode] = k;
                        last_pos[subnode] = [j,k,0];
                    }

                    // Reset markedness
                    for(var target_id in node.edges) {
                        var edge = node.edges[target_id];
                        edge.marked = this.graph.marked[node.id][target_id];
                    }
                }
            }
        }
    };

    NChart.prototype.post_process = function() {
        this.expand_compaction();
        //this.group_initial_nodes();
        this.neighborify();
        this.sort_subnodes();
    };

    NChart.Plotter = function(nchart) {
        this.nchart = nchart;
    }

    NChart.Plotter.prototype.align_horizontally = function(left_right, up_down) {
        var align_to = left_right ? 'children' : 'parents';
        for(var i=0; i<this.nchart.graph.e_compaction.length; i++) {
            var L = this.nchart.graph.e_compaction[i];
            if(up_down) {
                L.reverse();
            }
            var r = -1;
            for(var j=0; j<L.length; j++) {
                var v = L[j];
                var aligners = v[align_to];
                if(aligners.length) {
                    if(up_down) {
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
                            if((!edge || !edge.marked) && r < n[this.dir.pos]) {
                                n.align = v;
                                v.root = n.root;
                                v.align = v.root;
                                r = n[this.dir.pos];
                            }
                        }
                    }
                    if(up_down) {
                        aligners.reverse();
                    }
                }
            }
            if(up_down) {
                L.reverse();
            }
        }
    };

    NChart.Plotter.prototype.place_block = function(v, left_right, up_down) {
        if(v.y == null) {
            v.y = 0;
            var w = v;
            do {
                if(w[this.dir.pos] > 0) {
                    var u = w[this.dir.pred].root;
                    this.place_block(u, left_right, up_down);
                    if(v.sink == v) {
                        v.sink = u.sink;
                    }

                    if(v.sink != u.sink) {
                        this.shift_all(u, v, w, left_right, up_down);
                    } else {
                        var delta = this.get_delta(u, v, w, left_right, up_down);
                        v.y = this.dir.set_func(v.y, u.y + delta);
                    }
                }
                w = w.align;
            } while(w != v);
        }
    };

    NChart.Plotter.prototype.get_delta = function(u, v, w, left_right, up_down) {
        var seg_start = left_right ? 'q' : 'p';
        if(!up_down && v[seg_start]) {
            var u_align = u;
            var u_size = 0;
            do {
                if((left_right && u_align.layer.num <= v.layer.num && u_align.layer.num >= w.layer.num) ||
                   (!left_right && u_align.layer.num >= v.layer.num && u_align.layer.num <= w.layer.num)) {
                    u_size = Math.max(u_size, u_align.size);
                }
                u_align = u_align.align;
            } while(u_align != u);
        } else {
            u_size = w[this.dir.pred].size;
        }

        return up_down ? this.nchart.subnode_spacing * -w.size - this.nchart.node_spacing
            : this.nchart.subnode_spacing * u_size + this.nchart.node_spacing;
    };


    // This is a departure from the algorithm given by Brandes and Kopf, which doesn't
    // account for the case of three or more stacked classes where one class may be completely
    // isolated from another, and thus will not be shifted.  This can result in overlapping
    // classes. To solve, we build up a hash of previously shifted sinks, and shift them all
    // again whenever a shift happens.
    NChart.Plotter.prototype.shift_all = function(u, v, w, left_right, up_down) {
        this.shift(u, v, w, left_right, up_down);

        var self = this;
        goog.object.forEach(this.shifted, function(vs, u_id) {
            if(u.id != u_id) {
                goog.object.forEach(vs, function(uv) {
                    self.shift(uv[0], uv[1], uv[2], left_right, up_down);
                });
            }
        });

        goog.object.setIfUndefined(this.shifted, u.id, {});
        goog.object.setIfUndefined(this.shifted[u.id], v.id, [u, v, w]);
    };

    NChart.Plotter.prototype.shift = function(u, v, w, left_right, up_down) {
        var delta = this.get_delta(u, v, w, left_right, up_down);
        var prev_shift = 0;
        if((up_down && v.sink.shift > -Infinity) || (!up_down && v.sink.shift < Infinity)) {
            prev_shift = v.sink.shift;
        }
        u.sink.shift = this.dir.shift_func(u.sink.shift, v.y - u.y - delta + prev_shift);
    };

    NChart.Plotter.prototype.compact_vertically = function(left_right, up_down) {
        this.shifted = {};

        for(var i=0; i<this.nchart.graph.e_compaction.length; i++) {
            var L = this.nchart.graph.e_compaction[i];
            for(var j=0; j<L.length; j++) {
                var v = L[j];
                if(v.root == v) {
                    this.place_block(v, left_right, up_down);
                }
            }
        }
        var y_coords = [];
        var min_coord = Infinity;
        var max_coord = -Infinity;
        for(var i=0; i<this.nchart.graph.e_compaction.length; i++) {
            var L = this.nchart.graph.e_compaction[i];
            if(up_down) {
                L.reverse();
            }
            var L_y = [];
            for(var j=0; j<L.length; j++) {
                var v = L[j];
                v.y = v.root.y;
                if((!up_down && v.sink.shift < Infinity) || (up_down && v.sink.shift > -Infinity)) {
                    v.y = v.y + v.sink.shift;
                }
                L_y.push(v.y);
                min_coord = Math.min(min_coord, v.y);
                max_coord = Math.max(max_coord, v.y);
            }
            if(up_down) {
                L.reverse();
                L_y.reverse();
            }
            y_coords.push(L_y);
        }
        var width = max_coord - min_coord;
        if(left_right) {
            y_coords.reverse();
        }
        return {'y_coords': y_coords, 'width': width, 'max_coord': max_coord, 'min_coord': min_coord};
    };

    NChart.Plotter.prototype.place_nodes = function() {
        this.alignments = [];
        var u_alignments = [];
        var d_alignments = [];
        var horiz_dirs = [0,1];
        var vert_dirs = [0,1];

        if(this.nchart.debug && this.nchart.debug.direction) {
            if(this.nchart.debug.direction == 1) {
                horiz_dirs = [0];
                vert_dirs = [0];
            } else if(this.nchart.debug.direction == 2) {
                horiz_dirs = [1];
                vert_dirs = [0];
            } else if(this.nchart.debug.direction == 3) {
                horiz_dirs = [0];
                vert_dirs = [1];
            } else if(this.nchart.debug.direction == 4) {
                horiz_dirs = [1];
                vert_dirs = [1];
            }
        }

        var self = this;
        goog.array.forEach(horiz_dirs, function(left_right) {
            self.right_reverse(left_right);
            goog.array.forEach(vert_dirs, function(up_down) {
                self.initialize(up_down);
                self.align_horizontally(left_right, up_down);

                var alignment = self.compact_vertically(left_right, up_down);
                self.alignments.push(alignment);
                if(up_down) {
                    d_alignments.push(alignment);
                } else {
                    u_alignments.push(alignment);
                }
            });
            self.right_reverse(left_right);
        });

        this.normalize_alignments(u_alignments, d_alignments);
        this.place_y();
        this.place_x();
    };

    NChart.Plotter.prototype.right_reverse = function(left_right) {
        if(left_right) {
            this.nchart.graph.compaction.reverse();
            this.nchart.graph.e_compaction.reverse();
            this.nchart.graph.layers.reverse();
        }
    };

    NChart.Plotter.prototype.normalize_alignments = function(u_alignments, d_alignments) {
        // Choose narrowest alignment
        var narrowest = {'width': Infinity};
        for(var i=0; i<this.alignments.length; i++) {
            var alignment = this.alignments[i];
            if(alignment.width < narrowest.width) {
                narrowest = alignment;
            }
        }

        // Align to narrowest
        var ud_alignments = [u_alignments, d_alignments];
        for(var h=0; h<ud_alignments.length; h++) {
            var min_or_max = h ? 'max_coord' : 'min_coord';
            for(var i=0; i<ud_alignments[h].length; i++) {
                var alignment = ud_alignments[h][i];
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
    };

    NChart.Plotter.prototype.place_y = function() {
        // Set y coordinates
        var min_y = Infinity;
        var max_y = -Infinity;
        for(var i=0; i<this.nchart.graph.e_compaction.length; i++) {
            var L = this.nchart.graph.e_compaction[i];
            for(var j=0; j<L.length; j++) {
                var v = L[j];
                if(!(this.nchart.debug && this.nchart.debug.direction)) {
                    var v_coords = [this.alignments[0].y_coords[i][j],
                                    this.alignments[1].y_coords[i][j],
                                    this.alignments[2].y_coords[i][j],
                                    this.alignments[3].y_coords[i][j]];
                    v_coords.sort(function(a, b) { return a - b; });
                    // Set the y coordinate to be the rounded average median (yeah, that's right) of the four alignments
                    v.y = Math.round((v_coords[1] + v_coords[2]) / 2);
                }
                v.arc_centers = {
                    'up': v.y - this.nchart.min_arc_radius,
                    'down': v.y + ((v.subnodes.length - 1) * this.nchart.subnode_spacing) + this.nchart.min_arc_radius
                }
                min_y = Math.min(v.y, min_y);
                max_y = Math.max(v.y + ((v.size - 1) * this.nchart.subnode_spacing), max_y);
            }
        }

        // For now, just make sure there's no negative y values
        if(min_y != this.nchart.initial_padding['top']) {
            var shift = this.nchart.initial_padding['top'] - min_y;
            max_y += shift;
            for(var i=0; i<this.nchart.graph.e_compaction.length; i++) {
                var L = this.nchart.graph.e_compaction[i];
                for(var j=0; j<L.length; j++) {
                    var v = L[j];
                    v.y += shift;
                    v.arc_centers.up += shift;
                    v.arc_centers.down += shift;
                }
            }
        }
        this.nchart.graph.max_y = max_y;
    };

    NChart.Plotter.prototype.place_x = function() {
        var layer_x = 0;
        for(var i=0; i<this.nchart.graph.e_compaction.length; i++) {
            var L = this.nchart.graph.e_compaction[i];
            var layer_spacing = this.nchart.min_layer_spacing;

            var use_slope = Infinity;
            for(var j=0; j<L.length; j++) {
                var v = L[j];
                v.x = layer_x;
                v.arc_centers.left = v.x;
                v.arc_centers.right = v.x + v.duration;
                if(!v.nodes) {
                    for(var k=0; k<v.children.length; k++) {
                        var c = v.children[k];
                        if(!c.nodes) {
                            var edge = v.edges[c.id];
                            for(var l=0; l<edge.subnodes.length; l++) {
                                var subnode = edge.subnodes[l];
                                var v_sub_order = v.subnode_order[subnode];
                                var c_sub_order = c.subnode_order[subnode];
                                var rel_v_sub_y = v_sub_order * this.nchart.subnode_spacing;
                                var rel_c_sub_y = c_sub_order * this.nchart.subnode_spacing;
                                var v_sub_y = v.y + rel_v_sub_y;
                                var c_sub_y = c.y + rel_c_sub_y;
                                if(v_sub_y == c_sub_y) {
                                    continue;
                                }
                                if(v_sub_y > c_sub_y) {
                                    var fb_radius = rel_v_sub_y + this.nchart.min_arc_radius;
                                    var sb_radius = ((c.subnodes.length - c_sub_order - 1) * this.nchart.subnode_spacing) + this.nchart.min_arc_radius;
                                    var y_distance = c.arc_centers.down - v.arc_centers.up;
                                } else {
                                    var fb_radius = ((v.subnodes.length - v_sub_order - 1) * this.nchart.subnode_spacing) + this.nchart.min_arc_radius;
                                    var sb_radius = rel_c_sub_y + this.nchart.min_arc_radius;
                                    var y_distance = c.arc_centers.up - v.arc_centers.down;
                                }
                                var total_radius = fb_radius + sb_radius;
                                var center_distance = Math.sqrt(Math.pow(layer_spacing, 2) + Math.pow(y_distance, 2));
                                var good_tangent = false;
                                if(total_radius <= center_distance) {
                                    var tangent_center_angle = Math.asin(total_radius / center_distance);
                                    var center_x_angle = Math.asin(y_distance / center_distance);
                                    if(v_sub_y > c_sub_y) {
                                        var tangent_x_angle = center_x_angle - tangent_center_angle;
                                    } else {
                                        var tangent_x_angle = center_x_angle + tangent_center_angle;
                                    }

                                    var slope = Math.tan(tangent_x_angle);
                                    if(Math.abs(slope) <= this.nchart.max_line_slope && ((v_sub_y > c_sub_y && slope < 0)) || (v_sub_y < c_sub_y && slope > 0)) {
                                        good_tangent = true;
                                    }
                                }
                                if(!good_tangent) {
                                    var max_line_slope = this.nchart.max_line_slope;
                                    max_line_slope = y_distance < 0 ? -max_line_slope : max_line_slope;
                                    var slope_atan = Math.atan(max_line_slope);
                                    if(y_distance < 0) {
                                        var fb_angle = (Math.PI / 2) - slope_atan;
                                        var sb_angle = (3 * Math.PI / 2) - slope_atan;
                                    } else {
                                        var fb_angle = (3 * Math.PI / 2) + slope_atan;
                                        var sb_angle = (Math.PI / 2) + slope_atan;
                                    }
                                    var fb_cos_component = Math.cos(fb_angle);
                                    var fb_sin_component = Math.sin(fb_angle);
                                    var sb_cos_component = Math.cos(sb_angle);
                                    var sb_sin_component = Math.sin(sb_angle);
                                    var arc_widths = Math.abs(fb_radius * fb_cos_component) + Math.abs(sb_radius * sb_cos_component);
                                    var arc_heights = Math.abs(fb_radius * fb_sin_component) + Math.abs(sb_radius * sb_sin_component);
                                    var y_diff = Math.abs(v_sub_y - c_sub_y) - arc_heights;
                                    layer_spacing = Math.abs(y_diff / max_line_slope) + arc_widths;
                                }
                            }
                        }
                    }
                }
            }
            layer_x += layer_spacing + L[0].layer.duration;
        }
        this.nchart.graph.max_x = this.nchart.graph.e_compaction[this.nchart.graph.e_compaction.length - 1][0].x
    };

    NChart.Plotter.prototype.initialize = function(up_down) {
        this.dir = {};
        if(up_down) {
            this.dir.pos = 'r_pos';
            this.dir.pred = 'succ';
            this.dir.shift_func = Math.max;
            this.dir.set_func = Math.min;
        } else {
            this.dir.pos = 'pos';
            this.dir.pred = 'pred';
            this.dir.shift_func = Math.min;
            this.dir.set_func = Math.max;
        }

        for(var i=0; i<this.nchart.graph.e_compaction.length; i++) {
            var L = this.nchart.graph.e_compaction[i];
            for(var j=0; j<L.length; j++) {
                var v = L[j];
                v.root = v;
                v.align = v;
                v.sink = v;
                v.shift = up_down ? -Infinity : Infinity;
                v.size = v.subnodes.length;
                v.y = null;
            }
        }
    };

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
                var edge_y = node.y + (node.subnode_order[short_name] * this.nchart.subnode_spacing);
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
                              'stroke': c_nodes.character.color,
                              'stroke-width': 'inherit',
                              'stroke-linecap': 'round',
                              'stroke-linejoin': 'round',
                              'fill': 'none'});
            if(dead_arr.length > 1) {
                svg.path(char_group,
                         dead_arr.join(''),
                         {'id': short_name + '_dead',
                          'stroke': c_nodes.character.color,
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

    NChart.SvgDrawer = function(nchart) {
        this.nchart = nchart;
    };

    NChart.SvgDrawer.prototype.draw_curvy = function() {
        var self = this;
        var defs = this.svg.getElementById('path_defs');
        var g = this.svg.getElementById('graph');
        var used_names = {'p': {}};
        goog.object.forEach(this.nchart.path_styles, function(style, state) {
            used_names[state] = {};
        });
        var groups = {};
        goog.object.forEach(this.nchart.group_styles, function(style, group) {
            groups[group] = self.svg.group(g, group, style);
        });
        for(var i=0; i<this.nchart.graph.char_nodes.length; i++) {
            var c_nodes = this.nchart.graph.char_nodes[i];
            var short_name = c_nodes.character.short_name;
            var last = {'x': c_nodes.nodes[0].x,
                        'y': c_nodes.nodes[0].y + c_nodes.nodes[0].subnode_order[short_name]
                        * this.nchart.subnode_spacing};

            var states = {};
            var icon_places = {};
            var segments = {};
            goog.object.forEach(this.nchart.states, function(info, state) {
                icon_places[state] = [];
                if(info.following_style) {
                    states[info.following_style] = !!(c_nodes.nodes[0][info.following_style] &&
                                                      goog.array.contains(c_nodes.nodes[0][info.following_style], short_name));
                    segments[info.following_style] = [];
                }
            });

            if(!goog.object.contains(states, true)) {
                states['default'] = true;
            }

            var use_segments = ['M' + last.x + ',' + last.y];
            var horiz = false;
            var last_horiz = false;
            for(var j=0; j<c_nodes.nodes.length; j++) {
                var node = c_nodes.nodes[j];
                var edge_y = node.y + (node.subnode_order[short_name] * this.nchart.subnode_spacing);
                var end_x = node.x + node.duration;
                var this_segs = [];
                var this_seg = [];

                var active_states = goog.object.getKeys(goog.object.filter(states,
                                                                           function(state) { return state; }));
                var non_default_states = goog.object.clone(states);
                delete non_default_states['default'];

                var draw = !!goog.array.filter(active_states, function(state) { return !!self.nchart.path_styles[state]; }).length;

                if(draw) {
                    if(j) {
                        var last_segment = use_segments[use_segments.length - 1];
                        last_horiz = horiz;
                        horiz = last.y == edge_y;
                        if(horiz) {
                            this_seg = ['H', end_x]
                            this_segs.push(this_seg);
                            if(last_horiz) {
                                last_segment.x_range[1] = end_x;
                                last_segment.d[1] = end_x;
                            } else {
                                use_segments.push({'x_range': [last.x, end_x],
                                                   'y_range': [edge_y, edge_y],
                                                   'type': 'H',
                                                   'd': this_seg});
                            }
                        } else {
                            var slope = (edge_y - last.y) / (node.x - last.x);
                            var slope_atan = Math.atan(Math.abs(slope))
                            var x_distance = node.arc_centers.left - last_node.arc_centers.right;

                            if(last.y > edge_y) {
                                var y_distance = node.arc_centers.down - last_node.arc_centers.up;
                                var center_distance = Math.sqrt(Math.pow(x_distance, 2) + Math.pow(y_distance, 2));

                                // First bend
                                var fb_radius = ((last_node.subnode_order[short_name]) * this.nchart.subnode_spacing) + this.nchart.min_arc_radius;
                                // Second bend
                                var sb_radius = ((node.subnodes.length - node.subnode_order[short_name] - 1) * this.nchart.subnode_spacing) + this.nchart.min_arc_radius;
                                var total_radius = fb_radius + sb_radius;

                                var tangent_center_angle = Math.asin(total_radius / center_distance);  // theta
                                var center_x_angle = Math.asin(y_distance / center_distance);  // phi
                                var tangent_x_angle = tangent_center_angle - center_x_angle;

                                var fb_start_angle = Math.PI / 2;
                                var fb_end_angle = fb_start_angle - tangent_x_angle;
                                var fb_sweep_flag = 0;
                                var fb_center = {
                                    'x': last_node.arc_centers.right,
                                    'y': last_node.arc_centers.up
                                };

                                var fb_find_x_and_length = (function(fb_center, fb_radius, fb_start_angle) {
                                    return function(proto_theta) {
                                        return {
                                            'x': fb_center.x + (fb_radius * Math.cos(proto_theta)),
                                            'length': (fb_start_angle - proto_theta) * fb_radius
                                        };
                                    };
                                })(fb_center, fb_radius, fb_start_angle);

                                var fb_find_y_and_length = (function(fb_center, fb_radius, fb_start_angle) {
                                    return function(proto_theta) {
                                        return {
                                            'y': fb_center.y + (fb_radius * Math.sin(proto_theta)),
                                            'length': (fb_start_angle - proto_theta) * fb_radius
                                        };
                                    };
                                })(fb_center, fb_radius, fb_start_angle);

                                var sb_end_angle = 3 * Math.PI / 2;
                                var sb_start_angle = sb_end_angle - tangent_x_angle;
                                var sb_sweep_flag = 1;
                                var sb_center = {
                                    'x': node.arc_centers.left,
                                    'y': node.arc_centers.down
                                };
                                var sb_find_x_and_length = (function(sb_center, sb_radius, sb_start_angle) {
                                    return function(proto_theta) {
                                        var theta = Math.PI - proto_theta;  // proto_theta will be negative
                                        return {
                                            'x': sb_center.x + (sb_radius * Math.cos(theta)),
                                            'length': (theta - sb_start_angle) * sb_radius
                                        };
                                    };
                                })(sb_center, sb_radius, sb_start_angle);

                                var sb_find_y_and_length = (function(sb_center, sb_radius, sb_start_angle) {
                                    return function(proto_theta) {
                                        var theta = (2 * Math.PI) - proto_theta;
                                        return {
                                            'y': sb_center.y + (sb_radius * Math.sin(theta)),
                                            'length': (theta - sb_start_angle) * sb_radius
                                        };
                                    };
                                })(sb_center, sb_radius, sb_start_angle);

                            } else {
                                var y_distance = node.arc_centers.up - last_node.arc_centers.down;
                                var center_distance = Math.sqrt(Math.pow(x_distance, 2) + Math.pow(y_distance, 2));

                                // First bend
                                var fb_radius = ((last_node.subnodes.length - last_node.subnode_order[short_name] - 1) * this.nchart.subnode_spacing) + this.nchart.min_arc_radius;
                                // Second bend
                                var sb_radius = (node.subnode_order[short_name] * this.nchart.subnode_spacing) + this.nchart.min_arc_radius;
                                var total_radius = fb_radius + sb_radius;

                                var tangent_center_angle = Math.asin(total_radius / center_distance);  // theta
                                var center_x_angle = Math.asin(y_distance / center_distance);  // phi
                                var tangent_x_angle = tangent_center_angle + center_x_angle;

                                var fb_start_angle = 3 * Math.PI / 2;
                                var fb_end_angle = fb_start_angle + tangent_x_angle;
                                var fb_sweep_flag = 1;
                                var fb_center = {
                                    'x': last_node.arc_centers.right,
                                    'y': last_node.arc_centers.down
                                };
                                var fb_find_x_and_length = (function(fb_center, fb_radius, fb_start_angle) {
                                    return function(proto_theta) {
                                        var theta = (2 * Math.PI) + proto_theta;  // proto_theta will be negative
                                        return {
                                            'x': fb_center.x + (fb_radius * Math.cos(theta)),
                                            'length': (theta - fb_start_angle) * fb_radius
                                        };
                                    };
                                })(fb_center, fb_radius, fb_start_angle);

                                var fb_find_y_and_length = (function(fb_center, fb_radius, fb_start_angle) {
                                    return function(proto_theta) {
                                        var theta = (2 * Math.PI) - proto_theta;
                                        return {
                                            'y': fb_center.y + (fb_radius * Math.sin(proto_theta)),
                                            'length': (theta - fb_start_angle) * fb_radius
                                        };
                                    };
                                })(fb_center, fb_radius, fb_start_angle);

                                var sb_end_angle = Math.PI / 2;
                                var sb_start_angle = sb_end_angle + tangent_x_angle;
                                var sb_sweep_flag = 0;
                                var sb_center = {
                                    'x': node.arc_centers.left,
                                    'y': node.arc_centers.up
                                };
                                var sb_find_x_and_length = (function(sb_center, sb_radius, sb_start_angle) {
                                    return function(proto_theta) {
                                        var theta = Math.PI - proto_theta;
                                        return {
                                            'x': sb_center.x + (sb_radius * Math.cos(theta)),
                                            'length': (sb_start_angle - theta) * sb_radius
                                        };
                                    };
                                })(sb_center, sb_radius, sb_start_angle);

                                var sb_find_y_and_length = (function(sb_center, sb_radius, sb_start_angle) {
                                    return function(proto_theta) {
                                        return {
                                            'y': sb_center.y + (sb_radius * Math.sin(proto_theta)),
                                            'length': (sb_start_angle - proto_theta) * sb_radius
                                        };
                                    };
                                })(sb_center, sb_radius, sb_start_angle);
                            }

                            var fb_arc_end = {
                                'x': fb_center.x + (fb_radius * Math.cos(fb_end_angle)),
                                'y': fb_center.y + (fb_radius * Math.sin(fb_end_angle))
                            };
                            var sb_arc_start = {
                                'x': sb_center.x + (sb_radius * Math.cos(sb_start_angle)),
                                'y': sb_center.y + (sb_radius * Math.sin(sb_start_angle))
                            };

                            var first_bend = [
                                'A',
                                fb_radius,
                                fb_radius,
                                '0 0',  // x-axis rotation and large arc flag (we never want either of those)
                                fb_sweep_flag,
                                fb_arc_end.x,
                                fb_arc_end.y
                            ];
                            this_segs.push(first_bend);
                            use_segments.push({
                                'x_range': [last.x, fb_arc_end.x],
                                'y_range': [last.y, fb_arc_end.y],
                                'center': fb_center,
                                'start_angle': fb_start_angle,
                                'radius': fb_radius,
                                'find_x_and_length': fb_find_x_and_length,
                                'find_y_and_length': fb_find_y_and_length,
                                'type': 'A',
                                'd': first_bend
                            });

                            var middle_line = [
                                'L',
                                sb_arc_start.x,
                                sb_arc_start.y
                            ];
                            this_segs.push(middle_line);
                            use_segments.push({
                                'x_range': [fb_arc_end.x, sb_arc_start.x],
                                'y_range': [fb_arc_end.y, sb_arc_start.y],
                                'x_diff': sb_arc_start.x - fb_arc_end.x,
                                'y_diff': sb_arc_start.y - fb_arc_end.y,
                                'type': 'L',
                                'd': middle_line
                            });

                            var second_bend = [
                                'A',
                                sb_radius,
                                sb_radius,
                                '0 0',  // x-axis rotation and large arc flag (we never want either of those)
                                sb_sweep_flag,
                                node.x,
                                edge_y
                            ];
                            this_segs.push(second_bend);
                            use_segments.push({
                                'x_range': [sb_arc_start.x, node.x],
                                'y_range': [sb_arc_start.y, edge_y],
                                'center': sb_center,
                                'start_angle': sb_start_angle,
                                'radius': sb_radius,
                                'find_x_and_length': sb_find_x_and_length,
                                'find_y_and_length': sb_find_y_and_length,
                                'type': 'A',
                                'd': second_bend
                            });

                            last_horiz = false;
                        }

                        goog.array.forEach(active_states, function(state) {
                            var s_segments = segments[state];
                            var last_s_seg = s_segments[s_segments.length - 1];
                            goog.array.forEach(this_segs, function(this_seg) {
                                var s_horiz = this_seg[0] == 'H';
                                var s_last_horiz = last_s_seg[0] == 'H';
                                if(s_horiz && s_last_horiz) {
                                    last_s_seg[1] = end_x;
                                } else {
                                    s_segments.push(this_seg);
                                }
                            });
                        });
                    } else {
                        goog.array.forEach(active_states, function(state) {
                            segments[state].push(['M', last.x, last.y]);
                        });
                    }

                    if(node.duration && !horiz) {
                        goog.array.forEach(active_states, function(state) {
                            segments[state].push(['H', end_x]);
                        });
                        use_segments.push({
                            'x_range': [node.x, end_x],
                            'y_range': [edge_y, edge_y],
                            'type': 'H',
                            'd': ['H', end_x]
                        });
                        horiz = true;
                    }
                }

                goog.object.forEach(this.nchart.states, function(info, state) {
                    var noun = info.noun;
                    var icon = info.icon;
                    var fs = info.following_style;
                    var rev = info.reverses;
                    if(noun && node[noun] && goog.array.contains(node[noun], short_name)) {
                        if(icon) {
                            if(icon.placement == 'start') {
                                icon_places[state].push([icon, last.x, last.y]);
                            } else {
                                icon_places[state].push([icon, end_x, edge_y]);
                            }
                        }
                        if(fs && !states[fs]) {
                            segments[fs].push(['M', end_x, edge_y]);
                            states[fs] = true;
                            non_default_states[fs] = true;
                        }
                        if(rev && states[rev]) {
                            states[rev] = false;
                            if(rev != 'default') {
                                non_default_states[rev] = false;
                            }
                            if(!states['default'] && !goog.object.some(non_default_states,
                                                                       function(state) { return state; })) {
                                states['default'] = true;
                                segments['default'].push(['M', end_x, edge_y]);
                            }
                        }
                    }
                });
                last = {'x': end_x, 'y': edge_y};
                last_node = node;
            }
            var group = groups[c_nodes.character.group] || groups['default_group'];

            var p_id;
            if(used_names.p[short_name]) {
                used_names.p[short_name]++;
                p_id = short_name + '_' + used_names.p[short_name];
            } else {
                p_id = short_name;
                used_names.p[short_name] = 1;
            }

            var char_group = this.svg.group(group,
                                            p_id + '_group',
                                            {'stroke-width': 'inherit'});

            var p = this.svg.path(
                defs,
                use_segments.shift(),
                {
                    'id': p_id,
                    'class': 'character',
                    'fill': 'none'
                }
            );

            var last_len = 0;
            for(var j=0; j<use_segments.length; j++) {
                var seg = use_segments[j];
                var d = $(p).attr('d') || '';
                this.svg.change(p, {'d': [d, [seg.d[0], seg.d.slice(1).join(',')].join('')].join(' ')});
                if(seg.type == 'A' || seg.type == 'L') {
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
            p_jq.data('use_segments', use_segments);
            p_jq.data('length', last_len);
            var skip_points = [];
            p_jq.data('skip_points', skip_points);

            this.svg.use(char_group, '#' + p_id, {'stroke': 'white', //*** Should be background color
                                                  'stroke-width': 8, //*** Should be configurable, this and next 2
                                                  'stroke-linecap': 'round',
                                                  'stroke-linejoin': 'round',
                                                  'class': 'background'});

            goog.object.forEach(segments, function(segs, state) {
                var sub_p_id;
                if(used_names[state][short_name]) {
                    used_names[state][short_name]++;
                    sub_p_id = short_name + '_' + state + '_' + used_names[state][short_name];
                } else {
                    sub_p_id = short_name + '_' + state;
                    used_names[state][short_name] = 1;
                }
                if(segs.length > 1 && self.nchart.path_styles[state]) {
                    var unseg = goog.array.map(segs, function(seg) {
                        return [seg[0], seg.slice(1).join(',')].join('');
                    });
                    var settings = {'id': sub_p_id,
                                    'stroke': c_nodes.character.color};
                    goog.object.extend(settings, self.nchart.path_styles[state]);
                    self.svg.path(char_group,
                                  unseg.join(' '),
                                  settings);
                }
            });

            var min_offset = 0;
            goog.object.forEach(icon_places, function(places, state) {
                for(var j=0; j<places.length; j++) {
                    var place = places[j];
                    if(use_segments[0].x_range[0] == place[1]) {
                        min_offset = Math.max(min_offset, place[0].skip_radius);
                    }

                    goog.object.forEach(place[0], function(settings, shape) {
                        if(shape != 'skip_radius' && shape != 'placement') {
                            var set = goog.object.clone(settings);
                            var args;
                            if(shape == 'circle') {
                                goog.object.extend(set, {'cx': place[1], 'cy': place[2]});
                                args = [char_group, null, null, null, set];
                            } else if(shape == 'path') {
                                set.d = ['M' + place[1] + ',' + place[2], set.d].join(' ');
                                args = [char_group, '', set];
                            }
                            self.svg[shape].apply(self.svg, args);
                        }
                    });
                    skip_points.push([place[1], place[2], place[0].skip_radius || 0]);
                }
            });
            p_jq.data('min_offset', min_offset);

            var name_text = this.svg.text(char_group, null, null, '', this.nchart.name_style);
            // if(text_len > path_len) {
            //     //do voodoo here
            //     this.svg.remove(name_text);
            // } else {
            //do a use
            // }
            p_jq.data('name_path', this.svg.textpath(name_text,
                                                     '#' + p_id,
                                                     c_nodes.character.name,
                                                     {'startOffset': min_offset}));
            p_jq.data('name_len', name_text.getComputedTextLength());
        }
    };

    NChart.SvgDrawer.prototype.figure_scale = function() {
        if(this.nchart.start_scale) {
            this.start_scale = this.nchart.start_scale;
        } else {
            var width = this.nchart.paper.width() - this.nchart.initial_padding.left - this.nchart.initial_padding.right;
            var height = this.nchart.paper.height() - this.nchart.initial_padding.top - this.nchart.initial_padding.bottom;
            var w_scale = width / this.nchart.graph.max_x;
            var h_scale = height / this.nchart.graph.max_y;
            if(w_scale < h_scale) {
                this.start_scale = w_scale;
                this.start_x = this.nchart.initial_padding.left;
                this.start_y = (height / 2) - (w_scale * this.nchart.graph.max_y / 2) + this.nchart.initial_padding.top;
            } else {
                this.start_scale = h_scale;
                this.start_x = (width / 2) - (h_scale * this.nchart.graph.max_x / 2) + this.nchart.initial_padding.left;
                this.start_y = this.nchart.initial_padding.top;
            }
            this.translate = {'x': this.start_x, 'y': this.start_y};
        }
    };

    NChart.SvgDrawer.prototype.wireframe = function() {
        var g = this.svg.getElementById('graph');
        for(var i=0; i<this.nchart.graph.layers.length; i++) {
            var layer = this.nchart.graph.layers[i];
            for(var j=0; j<layer.nodes.length; j++) {
                var node = layer.nodes[j];
                if(node.draw) {
                    for(var k=0; k<node.children.length; k++) {
                        var child = node.children[k];
                        if(child.nodes) {
                            child = child.nodes[1];
                        }
                        this.svg.path(g,
                                      ['M', node.x, node.y, 'L', child.x, child.y].join(' '),
                                      {'stroke': 'black',
                                       'stroke-width': '3',
                                       'stroke-linecap': 'round',
                                       'stroke-linejoin': 'round',
                                       'fill': 'none'});
                    }
                }
            }
        }
    };

    NChart.SvgDrawer.prototype.debug_nodes = function() {
        var g = this.svg.getElementById('graph');
        var node_fill;
        for(var i=0; i<this.nchart.graph.layers.length; i++) {
            var layer = this.nchart.graph.layers[i];
            for(var j=0; j<layer.nodes.length; j++) {
                var v = layer.nodes[j];
                if(v.draw) {
                    if(v.p) {
                        node_fill = 'blue';
                    } else if(v.q) {
                        node_fill = 'green';
                    } else if(v.r) {
                        node_fill = 'yellow';
                    } else {
                        node_fill = 'red';
                    }
                    var node = this.svg.circle(g, v.x, v.y, 15, {'fill': node_fill,
                                                                 'id': 'node_' + v.id,
                                                                 'class': 'debug_node class_' + v.root.sink.id + ' block_' + v.root.id});
                }
            }
        }
    };

    NChart.SvgDrawer.prototype.debug_blocks = function() {
        var g = this.svg.getElementById('graph');

        for(var i=0; i<this.nchart.graph.layers.length; i++) {
            var layer = this.nchart.graph.layers[i];
            for(var j=0; j<layer.L.length; j++) {
                var v = layer.L[j];
                if(v.root == v) {
                    var w = v;
                    do {
                        w = w.align;
                    } while(w.align != v);

                    if(this.nchart.debug.direction % 2 == 0) {
                        var dummy = v;
                        v = w;
                        w = dummy;
                    }

                    var left = v.x - 17;
                    var top = v.y - 17;
                    var width = w.x - v.x + 34;

                    var dblock = this.svg.rect(g, left, top, width, 34, 8, 8, {'fill': 'blue',
                                                                               'opacity': '.25',
                                                                               'id': 'block_' + v.root.id,
                                                                               'class': 'debug_block class_' + v.root.sink.id});
                    $(dblock).data('root', 'node_' + v.root.id);
                }
            }
        }

        var self = this;
        $('.debug_block').mouseenter(function(e) {
            self.svg.change(this, {'fill': 'yellow'});
            if(goog.array.contains(self.nchart.debug.features, 'nodes')) {
                var root = self.svg.getElementById($(this).data('root'));
                self.svg.change(root, {'r': 40, 'stroke': 'black', 'stroke-width': 7});
            }
        }).mouseleave(function(e) {
            self.svg.change(this, {'fill': 'blue'});
            if(goog.array.contains(self.nchart.debug.features, 'nodes')) {
                var root = self.svg.getElementById($(this).data('root'));
                self.svg.change(root, {'r': 15, 'stroke': 'none'});
            }
        });
    };

    NChart.SvgDrawer.prototype.debug_classes = function() {
        var g = this.svg.getElementById('graph');

        var classes = {};
        for(var i=0; i<this.nchart.graph.layers.length; i++) {
            var layer = this.nchart.graph.layers[i];
            for(var j=0; j<layer.L.length; j++) {
                var v = layer.L[j];
                goog.object.setIfUndefined(classes, v.root.sink.id, {});
                goog.object.setIfUndefined(classes[v.root.sink.id], i, []);

                if(!classes[v.root.sink.id][i][0]) {
                    classes[v.root.sink.id][i][0] = v;
                }

                if(!classes[v.root.sink.id][i][1] || classes[v.root.sink.id][i][1].y < v.y) {
                    classes[v.root.sink.id][i][1] = v;
                }
            }
        }

        var self = this;
        goog.object.forEach(classes, function(layers, sink_id) {
            var forward = [];
            var backward = [];
            var last_vs;
            goog.object.forEach(layers, function(vs) {
                var left = vs[0].x - 22;
                var top = vs[0].y - 22;
                var bottom = vs[1].y + 22;

                if(forward[forward.length - 1]) {
                    var last_left = forward[forward.length - 1][0];
                    var last_top = forward[forward.length - 1][1];
                    if(last_top < top) {
                        forward.push([last_left + 44, last_top]);
                        forward.push([last_left + 44, top]);
                    } else {
                        forward.push([left, last_top]);
                    }
                }

                forward.push([left, top]);

                if(backward[backward.length - 1]) {
                    var last_left = backward[backward.length - 1][0];
                    var last_bottom = backward[backward.length - 1][1];
                    if(last_bottom > bottom) {
                        backward.push([last_left + 44, last_bottom]);
                        backward.push([last_left + 44, bottom]);
                    } else {
                        backward.push([left, last_bottom]);
                    }
                }

                backward.push([left, bottom]);
                last_vs = vs;
            });

            var right = last_vs[0].x + 22;
            forward.push([right, last_vs[0].y - 22]);
            backward.push([right, last_vs[1].y + 22]);

            backward.reverse();
            var poly = forward.concat(backward);

            var dclass = self.svg.polygon(g, poly, {'fill': 'green',
                                                    'opacity': '.15',
                                                    'id': 'class_' + sink_id,
                                                    'class': 'debug_class'});
            $(dclass).data('sink', 'node_' + sink_id);
            self.svg.polygon(g, poly, {'stroke': 'black', 'stroke-width': 2, 'fill': 'none'});
        });

        $('.debug_class').mouseenter(function(e) {
            self.svg.change(this, {'fill': 'yellow'});
            if(goog.array.contains(self.nchart.debug.features, 'nodes')) {
                var sink = self.svg.getElementById($(this).data('sink'));
                self.svg.change(sink, {'r': 40, 'stroke': 'black', 'stroke-width': 7});
            }
        }).mouseleave(function(e) {
            self.svg.change(this, {'fill': 'green'});
            if(goog.array.contains(self.nchart.debug.features, 'nodes')) {
                var sink = self.svg.getElementById($(this).data('sink'));
                self.svg.change(sink, {'r': 15, 'stroke': 'none'});
            }
        });
    };

    NChart.SvgDrawer.prototype.draw_graph = function() {
        this.figure_scale();
        this.nchart.paper.children().remove();
        this.scale = this.start_scale;
        var self = this;
        this.nchart.paper.svg({
            'onLoad': function(svg) {
                self.svg = svg;
                svg.defs('path_defs');
                var g = svg.group('graph');
                self.svg.change(g, {'transform': 'translate(' + self.start_x + ',' + self.start_y + '), scale(' + self.start_scale + ')'});

                if(self.nchart.debug && self.nchart.debug.wireframe) {
                    self.wireframe();
                } else {
                    self.draw_curvy();
                }

                if(self.nchart.debug) {
                    var defs = svg.defs('debug_defs');
                    var inner_glow = svg.filter(defs, 'inner_glow');
                    svg.filters.gaussianBlur(inner_glow, 'blur', null, 6);
                    svg.filters.composite(inner_glow, 'composite_blur', 'arithmetic', 'blur', 'SourceGraphic', 0, -1, 1);
                    goog.array.forEach(self.nchart.debug.features, function(feature) {
                        if(self['debug_' + feature]) {
                            self['debug_' + feature]();
                        } else {
                            alert('Debug option "' + feature + '" not supported');
                        }
                    });
                }
            },
            'settings': {'width': this.nchart.paper.width(),
                         'height': this.nchart.paper.height()}
            }
        );

        this.attach_events();
    };

    NChart.SvgDrawer.prototype.point_and_length_at_x = function(seg, x) {
        if(seg.type == 'L') {
            var rel_x = x - seg.x_range[0];
            var point_x_pct = rel_x / seg.x_diff;
            var rel_y = point_x_pct * seg.y_diff;
            var rel_length = Math.sqrt(Math.pow(rel_x, 2) + Math.pow(rel_y, 2));
            return {
                'point': {
                    'x': x,
                    'y': seg.y_range[0] + rel_y
                },
                'length': rel_length + seg.len_range[0]
            };
        } else if(seg.type == 'A') {
            var proto_theta = Math.acos((x - seg.center.x) / seg.radius);  // π to 0
            var y_and_len = seg.find_y_and_length(proto_theta);
            return {
                'point': {
                    'x': x,
                    'y': y_and_len.y
                },
                'length': y_and_len.length + seg.len_range[0]
            };
        }
    };

    NChart.SvgDrawer.prototype.point_and_length_at_y = function(seg, y) {
        if(seg.type == 'L') {
            var rel_y = y - seg.y_range[0];
            var point_y_pct = rel_y / seg.y_diff;
            var rel_x = point_y_pct * seg.x_diff;
            var rel_length = Math.sqrt(Math.pow(rel_y, 2) + Math.pow(rel_x, 2));
            return {
                'point': {
                    'x': seg.x_range[0] + rel_x,
                    'y': y
                },
                'length': rel_length + seg.len_range[0]
            };
        } else if(seg.type == 'A') {
            var proto_theta = Math.asin((y - seg.center.y) / seg.radius);  // -π/2 to π/2
            var x_and_len = seg.find_x_and_length(proto_theta);
            return {
                'point': {
                    'x': x_and_len.x,
                    'y': y
                },
                'length': x_and_len.length + seg.len_range[0]
            };
        }
    };

    NChart.SvgDrawer.prototype.adjust_graph = function() {
        var g = this.svg.getElementById('graph');

        this.svg.change(g, {'transform': 'translate(' + this.translate.x + ',' + this.translate.y + '), scale(' + this.scale + ')'});
        var left_x = -this.translate.x / this.scale;
        var right_x = left_x + (this.nchart.paper.width() / this.scale);
        var top_y = -this.translate.y / this.scale;
        var bottom_y = top_y + (this.nchart.paper.height() / this.scale);
        $('path.character').each(this.move_name(left_x, right_x, top_y, bottom_y));
    };


    NChart.SvgDrawer.prototype.attach_events = function() {
        var self = this;

        this.nchart.paper.mousewheel(this.zoom_graph());
        this.nchart.paper.dblclick(function(e) {
            var in_out;
            if(e.which == 1) {
                in_out = 2;
            } else if(e.which == 3) {
                in_out = -2;
            }
            if(in_out) {
                (self.zoom_graph())(e, in_out);
            }
        });

        var mouse_position;
        this.nchart.paper.mousedown(function(e) {
            mouse_position = {'x': e.pageX, 'y': e.pageY};
            original_translate = {};
            goog.object.extend(original_translate, self.translate);
            self.nchart.paper.mousemove(function(e) {
                self.translate = {'x': original_translate.x + e.pageX - mouse_position.x,
                                  'y': original_translate.y + e.pageY - mouse_position.y};
                self.adjust_graph();
            });
        });

        this.nchart.paper.mouseup(function(e) {
            self.nchart.paper.unbind('mousemove');
        });
    };

    NChart.SvgDrawer.prototype.zoom_graph = function() {
        var off = this.nchart.paper.offset();
        var self = this;
        return function(e, delta) {
            var old_scale = self.scale;
            var groups = {};
            goog.object.forEach(self.nchart.group_styles, function(style, group) {
                groups[group] = self.svg.getElementById(group);
            });
            self.scale = goog.math.clamp(self.scale * Math.pow(1.2, (delta / Math.abs(delta))),
                                         self.nchart.min_scale,
                                         self.nchart.max_scale);
            if(self.scale != old_scale) {
                var k = self.scale / old_scale;
                var mouse_x = e.pageX - off.left;
                var mouse_y = e.pageY - off.top;
                self.translate = {'x': mouse_x + (k * (self.translate.x - mouse_x)),
                                  'y': mouse_y + (k * (self.translate.y - mouse_y))};
                if(self.scale > 1) {
                    goog.object.forEach(self.nchart.group_styles, function(style, group) {
                        self.svg.change(groups[group], {'stroke-width': style['stroke-width'] / self.scale});
                    });
                }
                self.adjust_graph();
            }
            return false;
        }
    };

    NChart.SvgDrawer.prototype.move_name = function(left_x, right_x, top_y, bottom_y) {
        var self = this;
        left_x += this.nchart.name_padding.left;
        top_y += this.nchart.name_padding.top;
        bottom_y -= this.nchart.name_padding.bottom;
        return function() {
            var p = $(this);
            var segments = p.data('use_segments');
            var last_index = segments.length - 1;

            if(left_x > segments[last_index].x_range[1]) {
                return;
            }

            var p_len = p.data('length');
            var name_len = p.data('name_len');
            var skip_points = p.data('skip_points');
            var min_offset = p.data('min_offset');
            var max_offset = p_len - name_len;
            var seg, start_offset, index;
            var right_of_left = false;

            if(left_x < segments[0].x_range[0]) {
                seg = segments[0];
                index = 0;
                right_of_left = true;
            } else if(left_x <= segments[last_index].x_range[1]) {
                index = goog.array.binarySearch(segments, left_x, self.segment_search);
                seg = segments[index];
            }

            var crossing_y, p_and_l;
            if(seg.type == 'H') {
                crossing_y = seg.y_range[0];
                p_and_l = {'point': {'x': left_x, 'y': crossing_y},
                           'length': seg.len_range[0] + left_x - seg.x_range[0]};
            } else if(seg.type == 'A' || seg.type == 'L') {
                p_and_l = self.point_and_length_at_x(seg, left_x);
                crossing_y = p_and_l.point.y;
            }

            if(crossing_y >= top_y && crossing_y <= bottom_y) {
                start_offset = right_of_left ? min_offset : Math.min(p_and_l.length, max_offset);
            } else {
                while(!start_offset && seg && seg.x_range[0] < right_x) {
                    if(seg.type == 'A' || seg.type == 'L') {
                        var y_p_and_l;
                        if(crossing_y < top_y && seg.y_range[1] >= top_y) {
                            y_p_and_l = self.point_and_length_at_y(seg, top_y);
                        } else if(crossing_y > bottom_y && seg.y_range[1] <= bottom_y) {
                            y_p_and_l = self.point_and_length_at_y(seg, bottom_y);
                        }
                        if(y_p_and_l) {
                            start_offset = Math.min(y_p_and_l.length, max_offset);
                        }
                    }
                    index++;
                    seg = segments[index];
                }
            }

            if(!start_offset || start_offset == min_offset) {
                self.svg.change(p.data('name_path'), {'startOffset': start_offset});
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
                var pt_rad = pt[2];

                for(var j=0; j<segs.length; j++) {
                    var s = segs[j];
                    if(s.x_range[0] == pt[0]) {
                        if(start_offset < s.len_range[0] + pt_rad) {
                            start_offset = s.len_range[0] + pt_rad;
                        }
                    } else if(s.x_range[1] == pt[0]) {
                        if(start_offset + name_len > s.len_range[1] - pt_rad) {
                            start_offset = s.len_range[1] - name_len - pt_rad;
                        }
                    }
                }
            }
            self.svg.change(p.data('name_path'), {'startOffset': start_offset});
        };
    };

    NChart.SvgDrawer.prototype.segment_search = function(a, b) {
        return a > b.x_range[1] ? 1 : a < b.x_range[0] ? -1 : 0;
    };

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

    function next2power(x) {
        x--;
        x |= x >> 1;
        x |= x >> 2;
        x |= x >> 4;
        x |= x >> 8;
        x |= x >> 16;
        return x + 1;
    }

    window.NChart = NChart;
})(window);
