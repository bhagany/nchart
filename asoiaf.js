$(function() {
    var group_colors = {
        'stark': '#7c7c7c',
        'wolf': '#956b41',
        'baratheon': '#ffe557',
        'lannister': '#ff1414',
        'targaryen': '#ac1717',
        'night\'s watch': '#000000',
        'greyjoy': '#b15bc9',
        'other': '#ff7a32',
        'tyrell': '#31c105',
        'arryn': '#23d0f5',
        'kingsguard': '#ff7a32'
    };

    var characters = {
        'ned': {'name': 'Eddard Stark',
                'pov': true,
                'group': 'stark'},
        'cat': {'name': 'Catelyn Stark',
                'pov': true,
                'group': 'stark'},
        'robb': {'name': 'Robb Stark',
                 'pov': false,
                 'group': 'stark'},
        'sansa': {'name': 'Sansa Stark',
                  'pov': true,
                  'group': 'stark'},
        'arya': {'name': 'Arya Stark',
                 'pov': true,
                 'group': 'stark'},
        'bran': {'name': 'Bran Stark',
                 'pov': true,
                 'group': 'stark'},
        'rickon': {'name': 'Rickon Stark',
                   'pov': false,
                   'group': 'stark'},
        'jon': {'name': 'Jon Snow',
                'pov': true,
                'group': 'stark'},

        'grey wind': {'name': 'Grey Wind',
                      'pov': false,
                      'group': 'wolf'},
        'lady': {'name': 'Lady',
                 'pov': false,
                 'group': 'wolf'},
        'nymeria': {'name': 'Nymeria',
                    'pov': false,
                    'group': 'wolf'},
        'summer': {'name': 'Summer',
                   'pov': false,
                   'group': 'wolf'},
        'shaggydog': {'name': 'Shaggydog',
                      'pov': false,
                      'group': 'wolf'},
        'ghost': {'name': 'Ghost',
                  'pov': false,
                  'group': 'wolf'},

        'robert b': {'name': 'Robert Baratheon',
                     'pov': false,
                     'group': 'baratheon'},
        'joffrey': {'name': 'Joffrey Baratheon',
                    'pov': false,
                    'group': 'baratheon'},
        'myrcella': {'name': 'Myrcella Baratheon',
                     'pov': false,
                     'group': 'baratheon'},
        'tommen': {'name': 'Tommen Baratheon',
                   'pov': false,
                   'group': 'baratheon'},
        'stannis': {'name': 'Stannis Baratheon',
                    'pov': false,
                    'group': 'baratheon'},
        'renly': {'name': 'Renly Baratheon',
                  'pov': false,
                  'group': 'baratheon'},

        'tywin': {'name': 'Tywin Lannister',
                  'pov': false,
                  'group': 'lannister'},
        'cersei': {'name': 'Cersei Lannister',
                   'pov': true,
                   'group': 'lannister'},
        'jaime': {'name': 'Jaime Lannister',
                  'pov': true,
                  'group': 'lannister'},
        'tyrion': {'name': 'Tyrion Lannister',
                   'pov': true,
                   'group': 'lannister'},
        'sandor': {'name': 'Sandor Clegane',
                   'pov': false,
                   'group': 'lannister'},
        'gregor': {'name': 'Gregor Clegane',
                   'pov': false,
                   'group': 'lannister'},
        'ilyn': {'name': 'Ilyn Payne',
                 'pov': false,
                 'group': 'lannister'},

        'daenerys': {'name': 'Daenerys Targaryen',
                     'pov': true,
                     'group': 'targaryen'},
        'viserys': {'name': 'Viserys Targaryen',
                    'pov': false,
                    'group': 'targaryen'},

        'sam': {'name': 'Samwell Tarly',
                'pov': true,
                'group': 'night\'s watch'},
        'aemon': {'name': 'Maester Aemon',
                  'pov': false,
                  'group': 'night\'s watch'},
        'jeor': {'name': 'Jeor Mormont',
                 'pov': false,
                 'group': 'night\'s watch'},
        'benjen': {'name': 'Benjen Stark',
                   'pov': false,
                   'group': 'night\'s watch'},
        'will': {'name': 'Will',
                 'pov': true,
                 'group': 'night\'s watch'},
        'waymar': {'name': 'Waymar Royce',
                   'pov': false,
                   'group': 'night\'s watch'},
        'gared': {'name': 'Gared',
                  'pov': false,
                  'group': 'night\'s watch'},

        'theon': {'name': 'Theon Greyjoy',
                  'pov': true,
                  'group': 'greyjoy'},

        'barristan': {'name': 'Barristan Selmy',
                      'pov': false,
                      'group': 'kingsguard'},

        'petyr': {'name': 'Petyr Baelish',
                  'pov': false,
                  'group': 'other'},
        'varys': {'name': 'Varys',
                  'pov': false,
                  'group': 'other'},
        'pycelle': {'name': 'Maester Pycelle',
                    'pov': false,
                    'group': 'other'},
        'illyrio': {'name': 'Illyrio Mopatis',
                    'pov': false,
                    'group': 'other'},
        'jorah': {'name': 'Jorah Mormont',
                  'pov': false,
                  'group': 'other'},
        'drogo': {'name': 'Khal Drogo',
                  'pov': false,
                  'group': 'other'},
        'mirri': {'name': 'Mirri Maz Duur',
                  'pov': false,
                  'group': 'other'},

        'loras': {'name': 'Loras Tyrell',
                  'pov': false,
                  'group': 'tyrell'},
        'beric': {'name': 'Beric Dondarrion',
                  'pov': false,
                  'group': 'tyrell'},

        'brynden': {'name': 'Brynden Tully',
                    'pov': false,
                    'group': 'arryn'},
        'lysa': {'name': 'Lysa Arryn',
                 'pov': false,
                 'group': 'arryn'},
        'robert a': {'name': 'Robert Arryn',
                     'pov': false,
                     'group': 'arryn'}
    };

    var layers = [
        // 0
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['will', 'waymar', 'gared']}
         ],
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['will', 'waymar', 'gared']}
         ],
         'deaths': ['will'],
         'wights': ['waymar'],
         'event': 'Encounter with Others'
        },
        // 1
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'robb', 'bran', 'jon', 'theon', 'gared']},
         ],
         'deaths': ['gared'],
         'event': 'Execution of Gared'
        },
        // 2
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'robb', 'bran', 'jon', 'theon', 'grey wind',
                            'lady', 'nymeria', 'summer', 'shaggydog', 'ghost']},
         ],
         'event': 'Finding the Wolves'
        },
        // 3
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'cat', 'robb', 'sansa', 'arya', 'bran', 'rickon', 'jon',
                            'theon', 'grey wind', 'lady', 'nymeria', 'summer',
                            'shaggydog', 'ghost']},
         ]
        },
        // 4
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['daenerys', 'viserys', 'illyrio']},
             {'sub_nodes': ['jorah']},
             {'sub_nodes': ['drogo']}
         ]
        },
        // 5
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['daenerys', 'viserys', 'illyrio', 'jorah', 'drogo']}
         ],
         'event': 'Daenerys sold to Drogo'
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['benjen']},
             {'sub_nodes': ['robert b', 'cersei', 'jaime', 'tyrion', 'joffrey', 'myrcella', 'tommen',
                            'sandor']},
         ],
        },
        // 6
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'cat', 'robb', 'sansa', 'arya', 'bran', 'rickon', 'jon',
                            'theon', 'grey wind', 'lady', 'nymeria', 'summer',
                            'shaggydog', 'ghost', 'benjen', 'robert b', 'cersei',
                            'jaime', 'tyrion', 'joffrey', 'myrcella', 'tommen', 'sandor']},
         ],
         'event': 'Robert Visits Winterfell'
        },
        // 7
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['benjen', 'jon', 'ghost', 'tyrion']},
             {'sub_nodes': ['robb', 'bran', 'rickon', 'theon', 'grey wind', 'summer', 'shaggydog', 'cat']},
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'lady', 'nymeria']}
         ]
        },
        // 8
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['daenerys', 'viserys', 'illyrio', 'jorah', 'drogo']}
         ],
         'event': 'Drogo and Daenerys Married'
        },
        // 9
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['robb', 'bran', 'rickon', 'theon', 'grey wind', 'summer', 'shaggydog', 'cat']}
         ],
         'event': 'Assassination attempt on Bran'
        },
        // 10
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['cat']}
         ],
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['renly', 'barristan', 'ilyn']}
         ]
        },
        // 11
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'lady', 'nymeria']}
         ],
         'deaths': ['lady'],
         'event': 'Children Fight Near the Trident'
        },
        // 12
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'renly', 'barristan', 'ilyn']},
             {'sub_nodes': ['nymeria']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jeor', 'aemon']}
         ]
        },
        // 13
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['benjen', 'jon', 'ghost', 'tyrion', 'jeor', 'aemon']}
         ]
        },
        // 14
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jon', 'ghost', 'tyrion', 'jeor', 'aemon']},
             {'sub_nodes': ['benjen']}
         ]
        },
        // 15
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jon', 'ghost', 'jeor', 'aemon']},
             {'sub_nodes': ['tyrion']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['petyr', 'varys', 'pycelle']}
         ]
        },
        // 16
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['cat', 'petyr', 'varys', 'pycelle']}
         ]
        },
        // 17
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'cat', 'petyr', 'varys',
                            'pycelle']}
         ]
        },
        // 18
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['cat']}
         ]
        },
        // 19
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['robb', 'bran', 'rickon', 'theon', 'grey wind', 'summer', 'shaggydog', 'tyrion']},
         ],
        },
        // 20
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['robb', 'bran', 'rickon', 'theon', 'grey wind', 'summer', 'shaggydog']},
             {'sub_nodes': ['tyrion']}
         ],
        },
        // 21
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jon', 'ghost', 'jeor', 'aemon', 'sam']}
         ]
        },
        // 22
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['cat', 'tyrion']}
         ],
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['gregor']},
             {'sub_nodes': ['beric']},
             {'sub_nodes': ['loras']}
         ]
        },
        // 23
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
                            'pycelle', 'gregor', 'beric', 'loras']},
         ],
         'event': 'Hand\'s Tourney'
        },
        // 24
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
                            'pycelle', 'beric', 'loras']},
             {'sub_nodes': ['gregor']}
         ],
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
                            'pycelle', 'beric', 'loras', 'illyrio']},
         ],
        },
        // 28
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
                            'pycelle', 'beric', 'loras']},
             {'sub_nodes': ['illyrio']}
         ],
        },
        // 29
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
                            'pycelle', 'beric', 'loras']},
             {'sub_nodes': ['jaime']}
         ],
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['lysa', 'robert a']},
             {'sub_nodes': ['brynden']}
         ]
        },
        // 34
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['cat', 'lysa', 'robert a', 'brynden', 'tyrion']}
         ]
        },
        // 35
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['cat', 'brynden']},
             {'sub_nodes': ['tyrion']},
             {'sub_nodes': ['lysa', 'robert a']}
         ]
        },
        // 36
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
                            'pycelle', 'beric', 'loras']}
         ]
        },
        // 37
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
                            'pycelle', 'loras']},
             {'sub_nodes': ['beric']}
         ]
        },
        // 38
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['daenerys', 'viserys', 'jorah', 'drogo']}
         ],
         'deaths': ['viserys'],
         'event': 'Viserys Crowned'
        },
        // 39
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
                            'pycelle', 'loras']}
         ]
        },
        // 40
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'barristan', 'ilyn', 'petyr', 'varys', 'pycelle']},
             {'sub_nodes': ['renly', 'loras']}
         ],
        },
        // 41
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'barristan', 'ilyn', 'petyr', 'varys', 'pycelle']}
         ],
         'deaths': ['robert b'],
         'event': 'King Robert Gored and Killed'
        },
        // 42
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jon', 'ghost', 'jeor', 'aemon', 'sam']}
         ],
         'event': 'Wight Attack at Castle Black'
        },
        // 43
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['robb', 'bran', 'rickon', 'theon', 'grey wind', 'summer', 'shaggydog']},
         ],
         'event': 'Robb calls his banners'
        },
        // 44
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['bran', 'rickon', 'summer', 'shaggydog']},
             {'sub_nodes': ['robb', 'grey wind', 'theon']}
         ],
        },
        // 45
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['robb', 'grey wind', 'theon', 'cat', 'brynden']}
         ],
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['tywin']}
         ]
        },
        // 46
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['tyrion', 'tywin', 'gregor']}
         ],
        },
        // 47
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['daenerys', 'jorah', 'drogo']},
             {'sub_nodes': ['mirri']}
         ],
        },
        // 48
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['daenerys', 'jorah', 'drogo', 'mirri']}
         ],
         'event': 'Sack of the Lhazareen town'
        },
        // 49
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['tyrion', 'tywin', 'gregor']}
         ],
         'event': 'Battle of the Green Fork'
        },
        // 50
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['robb', 'grey wind', 'theon', 'cat', 'brynden', 'jaime']}
         ],
         'event': 'Battle of the Whispering Wood'
        },
        // 51
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['daenerys', 'jorah', 'drogo', 'mirri']}
         ],
         'event': 'Drogo falls off his horse, Dany goes into labor'
        },
        // 52
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'cersei', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'barristan', 'ilyn', 'petyr', 'varys', 'pycelle']}
         ],
         'deaths': ['ned'],
         'event': 'Ned beheaded at the Great Sept of Baelor'
        },
        // 53
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['daenerys', 'jorah', 'drogo', 'mirri']}
         ],
         'deaths': ['drogo'],
         'event': 'The breaking of Drogo\'s khalasar'
        },
        // 54
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['robb', 'grey wind', 'theon', 'cat', 'brynden', 'jaime']}
         ],
         'event': 'Seige of Riverrun broken, Robb proclaimed King in the North'
        },
        // 55
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['tyrion', 'tywin', 'gregor']}
         ],
        },
        // 56
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['tyrion']},
             {'sub_nodes': ['tywin']},
             {'sub_nodes': ['gregor']}
         ],
        },
        // 57
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['daenerys', 'jorah', 'mirri']}
         ],
         'deaths': ['mirri'],
         'event': 'Mother of Dragons'
        },
    ];

    function intersection(array1, array2) {
        return $.map(array1, function(item, i) {
            if($.inArray(item, array2) != -1) {
                return item;
            }
        });
    }

    function add_edge(edge_group, node1, node2) {
        if(!edge_group[node1.id]) {
            edge_group[node1.id] = {};
        }
        if(!edge_group[node1.id][node2.id]) {
            edge_group[node1.id][node2.id] = {'edge': [node1, node2], 'weight': 1};
        } else {
            edge_group[node1.id][node2.id].weight++;
        }
    }

    function copy_segment(segment) {
        return {'id': segment.id,
                'nodes': segment.nodes.slice(0),
                'prev_neighbors': segment.prev_neighbors.slice(0),
                'next_neighbors': segment.next_neighbors.slice(0)};
    }

    function add_layer_edges(layers, layer_num1, layer_num2, node1, node2, segment) {
        var v_1 = node1;
        var v_2 = !segment ? node2 : copy_segment(segment);
        pq_segs = {};

        if(node1.p) {
            if(!layers[layer_num1].seg_hash[v_2.id]) {
                layers[layer_num1].seg_hash[v_2.id] = v_2;
                pq_segs[node1.id] = v_2;
            }
        }
        if(layer_num2 - layer_num1 == 1) {
            v_2 = node2;
        }
        for(var i=layer_num1; i<layer_num2; i++) {
            var layer1 = layers[i];
            var layer2 = layers[i + 1];
            add_edge(layer1.next_edges, v_1, v_2);
            add_edge(layer2.prev_edges, v_2, v_1);

            if(v_1.nodes && !layer1.seg_hash[v_1.id]) {
                layer1.seg_hash[v_1.id] = v_1;
            }
            if(v_2.nodes && !layer2.seg_hash[v_2.id]) {
                layer2.seg_hash[v_2.id] = v_2;
            }

            v_1 = v_2;
            if(i >= layer_num2 - 2) {
                if(node2.q) {
                    var seg = v_2.nodes ? v_2 : copy_segment(segment);
                    if(!layers[layer_num2].seg_hash[seg.id]) {
                        layers[layer_num2].seg_hash[seg.id] = seg;
                        pq_segs[node2.id] = seg
                    }
                }
                v_2 = node2;
            } else {
                v_2 = copy_segment(segment);
            }
        }

        return pq_segs;
    }

    function copy_segment_container(container, layer) {
        var new_c = $.extend({}, container);
        new_c.segs = [];
        for(var i=0; i<container.segs.length; i++) {
            var seg = container.segs[i];
            new_c.segs.push(layer.seg_hash[seg.id]);
        }
        return new_c;
    }

    function copy_node(node) {
        return {'sub_nodes': node.sub_nodes.slice(0)};
    }

    function dupe_node(node) {
        return {'id': node.id,
                'x': node.x,
                'p': node.p,
                'q': node.q,
                'sub_nodes': node.sub_nodes.slice(0)};
    }

    function update_last_nodes(layer, name, node, last_nodes) {
        if(!layer.deaths || $.inArray(name, layer.deaths) == -1) {
            last_nodes[name] = node;
        }
    }

    function update_last_nodes_group(layer, names, node, last_nodes) {
        for(var i in names) {
            update_last_nodes(layer, names[i], node, last_nodes);
        }
    }

    function make_edges(layers, x_space) {
        var edges = {};
        var last_nodes = {};
        var pq_segs = {};
        var flat_nodes = {};
        var p_nodes = [];
        var q_nodes = [];
        var r_nodes = [];
        var c_nodes = {};
        var x = x_space;
        var i, j, k, nodes, start_y, node, node_id, name;
        for(i=0; i<layers.length; i++) {
            x += x_space;
            layer = layers[i];
            layer.prev_edges = {};
            layer.next_edges = {};
            layer.seg_hash = {};
            for(j=0; j<layer.nodes.length; j++) {
                node = layer.nodes[j];
                node.id = i + '-' + j;
                node.x = x;
                node.duration = layer.duration;
                node.prev_neighbors = [];
                node.next_neighbors = [];
                flat_nodes[node.id] = node;
                for(k in node.sub_nodes) {
                    name = node.sub_nodes[k];
                    if(!c_nodes[name]) {
                        c_nodes[name] = [];
                    }
                    var last_node = last_nodes[name];
                    if(last_node) {
                        var last_layer_parts = last_node.id.split('-');
                        var last_layer_num = parseInt(last_layer_parts[0]);
                        var last_layer = layers[last_layer_num]
                        var span = i - last_layer_num;
                        var seg_sub_nodes = intersection(node.sub_nodes, last_node.sub_nodes);
                        if(span > 2) {
                            //Add two new vertices at layers last_layer_num + 1 and i - 1
                            var p_layer = layers[last_layer_num + 1];
                            var q_layer = layers[i - 1];
                            var p_node = {'id': (last_layer_num + 1) + '-' + p_layer.nodes.length,
                                          'sub_nodes': seg_sub_nodes,
                                          'x': p_layer.nodes[0].x,
                                          'p': true,
                                          'prev_neighbors': [],
                                          'next_neighbors': []};
                            var q_node = {'id': (i - 1) + '-' + q_layer.nodes.length,
                                          'sub_nodes': seg_sub_nodes.slice(0),
                                          'x': q_layer.nodes[0].x,
                                          'q': true,
                                          'prev_neighbors': [],
                                          'next_neighbors': []};
                            p_nodes.push(p_node);
                            q_nodes.push(q_node);
                            p_layer.nodes.push(p_node);
                            q_layer.nodes.push(q_node);

                            //Add the segment between p_node and q_node to each of the layers it crosses
                            var segment = {'id': p_node.id + '-' + q_node.id,
                                           'nodes': [p_node, q_node],
                                           'prev_neighbors': [],
                                           'next_neighbors': []};

                            //Add two new edges last_layer -> p_layer, p_layer -> q_layer
                            //for each name in this node
                            for(var n=0; n<seg_sub_nodes.length; n++) {
                                var seg_name = seg_sub_nodes[n];
                                if(last_node == last_nodes[seg_name]) {
                                    add_edge(edges, last_node, p_node);
                                    add_edge(edges, p_node, q_node);
                                    add_layer_edges(layers, last_layer_num, last_layer_num + 1, last_node, p_node);
                                    var new_pqs = add_layer_edges(layers, last_layer_num + 1, i - 1, p_node, q_node, segment);
                                    pq_segs = $.extend(new_pqs, pq_segs);

                                    if(!c_nodes[seg_name]) {
                                        c_nodes[seg_name] = [];
                                    }
                                    c_nodes[seg_name].push(p_node);
                                    c_nodes[seg_name].push(q_node);
                                } else {
                                    seg_sub_nodes.splice(n, 1);
                                    n--;
                                }
                            }
                            last_node = q_node;
                            update_last_nodes_group(q_layer, seg_sub_nodes, q_node, last_nodes);
                            last_layer_num = i - 1;
                        } else if(span == 2) {
                            //Add one new vertex at layer i - 1
                            var r_layer = layers[i - 1];
                            var r_node = {'id': (i - 1) + '-' + r_layer.nodes.length,
                                          'sub_nodes': intersection(node.sub_nodes, last_node.sub_nodes),
                                          'x': r_layer.nodes[0].x,
                                          'r': true,
                                          'prev_neighbors': [],
                                          'next_neighbors': []};
                            r_nodes.push(r_node);
                            r_layer.nodes.push(r_node);
                            //Add two new edges last_layer -> r_layer
                            //for each name in this node
                            for(var n=0; n<seg_sub_nodes.length; n++) {
                                var seg_name = seg_sub_nodes[n];
                                if(last_node == last_nodes[seg_name]) {
                                    add_edge(edges, last_node, r_node);
                                    add_layer_edges(layers, last_layer_num, i - 1, last_node, r_node);
                                    if(!c_nodes[seg_name]) {
                                        c_nodes[seg_name] = [];
                                    }
                                    c_nodes[seg_name].push(r_node);
                                } else {
                                    seg_sub_nodes.splice(n, 1);
                                    n--;
                                }
                            }
                            update_last_nodes_group(r_layer, r_node.sub_nodes, r_node, last_nodes);
                            last_node = r_node;
                            last_layer_num = i - 1;
                        }

                        //Add one edge normally
                        add_edge(edges, last_node, node);
                        add_layer_edges(layers, last_layer_num, i, last_node, node);
                    }
                    c_nodes[name].push(node);
                    update_last_nodes(layers[i], name, node, last_nodes);
                }
            }
        }

        var char_nodes = [];
        $.each(c_nodes, function(name, nodes) {
            char_nodes.push({'character': characters[name], 'nodes': nodes});
        });

        return {'layers': layers, 'pq_segs': pq_segs, 'edges': edges, 'flat_nodes': flat_nodes, 'q_nodes': q_nodes,
                'p_nodes': p_nodes, 'r_nodes': r_nodes, 'char_nodes': char_nodes};
    }

    function copy_layer(layer) {
        var new_layer = {'duration': layer.duration,
                         'event': layer.event,
                         'segments': []};
        if(layer.nodes) {
            new_layer.nodes = layer.nodes.slice(0);
        }
        if(layer.segments) {
            for(var i=0; i<layer.segments.length; i++) {
                new_layer.segments[i] = {};
                new_layer.segments[i].segs = layer.segments[i].segs.slice(0);
            }
        }
        if(layer.deaths) {
            new_layer.deaths = layer.deaths.slice(0);
        }
        if(layer.wights) {
            new_layer.wights = layer.wights.slice(0);
        }
        var props = ['prev_edges', 'next_edges', 'seg_hash'];
        for(var i=0; i<props.length; i++) {
            var prop = props[i];
            if(layer[prop]) {
                new_layer[prop] = {};
                for(var j in layer[prop]) {
                    new_layer[prop][j] = layer[prop][j];
                }
            }
        }

        return new_layer;
    }

    function copy_L(L) {
        var new_L = [];
        for(var i=0; i<L.length; i++) {
            var item = L[i];
            if(item.sub_nodes) {
                new_L.push(item);
            }
            if(item.segs) {
                var seg = {}
                seg.segs = item.segs.slice(0);
                new_L.push(seg);
            }
        }

        return new_L;
    }

    function count_crossings(layer_edges, q, next_layer_edges, seg_begin, seg_end) {
        function edge_sort(a, b) {
            if(a.order[0] != b.order[0]) {
                return a.order[0] - b.order[0];
            } else {
                return a.order[1] - b.order[1];
            }
        }
        layer_edges.sort(edge_sort);

        var L1_positions = [];
        var L1_weights = [];
        for(var j=0; j<layer_edges.length; j++) {
            L1_positions.push(layer_edges[j].order[1]);
            L1_weights.push(layer_edges[j].weight);
        }

        // Build the accumulator tree
        var first_index = 1;
        while (first_index < q) {
            first_index *= 2;
        }
        var tree_size = 2 * first_index - 1; /* number of tree nodes */
        first_index -= 1; /* index of leftmost leaf */
        var tree = [];
        var seg_tree = [];
        for(var t=0; t<tree_size; t++) {
            tree[t] = 0;
            seg_tree[t] = 0;
        }
        
        var cross_count = 0; /* number of crossings */
        for(var k=0; k<L1_positions.length; k++) { /* insert edge k */
            var index = L1_positions[k] + first_index;
            var edge = layer_edges[k];
            tree[index] += L1_weights[k];
            var is_seg = false;
            if(edge.edge[0][seg_begin] || edge.edge[1][seg_end] || edge.edge[0].nodes || edge.edge[1].nodes) {
                seg_tree[index] += 1;
                is_seg = true;
            }
            var weight_sum = 0;
            var seg_sum = 0;
            while(index > 0) {
                if (index % 2) {
                    weight_sum += tree[index+1];
                    seg_sum += seg_tree[index+1];
                }
                index = Math.floor((index - 1) / 2);
                tree[index] += L1_weights[k];
                if(is_seg) {
                    seg_tree[index] += 1;
                }
            }
            cross_count += (L1_weights[k] * weight_sum);
            if(seg_sum > 0) {
                edge.marked = true;
                next_layer_edges[edge.edge[1].id][edge.edge[0].id].marked = true;
            } else {
                edge.marked = false;
                next_layer_edges[edge.edge[1].id][edge.edge[0].id].marked = false;
            }

            // If we're adding a segment, mark any edges it crosses
            if(is_seg) {
                var pos = L1_positions[k];
                for(var l=0; l<k; l++) {
                    if(pos < L1_positions[l]) {
                        var added_edge = layer_edges[l];
                        added_edge.marked = true;
                        next_layer_edges[added_edge.edge[1].id][added_edge.edge[0].id].marked = true;
                    }
                }
            }
        }

        return cross_count;
    }

    function minimize_crossings(graph, layer, i, compaction, seg_begin, seg_end,
                                forward_edges, backward_edges) {
        var layers = graph.layers;
        var next_layer = copy_layer(layers[i + 1]);

        // Step 1
        for(var j=0; j<layer.nodes.length; j++) {
            var node = layer.nodes[j];
            if(node[seg_begin]) {
                // Join layer.segments[j], this p_node's segment, and layer.segments[j + 1]
                var segment = layer.segments[j];
                segment.segs.push(graph.pq_segs[node.id]);
                var next_segment = layer.segments.splice(j + 1, 1)[0].segs;
                if(next_segment) {
                    segment.segs = segment.segs.concat(next_segment);
                }
                // Remove the p-node
                layer.nodes.splice(j, 1);
                j--;
            }
        }

        // Step 2
        // Assign pos to layer
        var layer_nodes = [];
        var LS = [];
        for(var j=0; j<layer.segments.length; j++) {
            var segment = copy_segment_container(layer.segments[j], next_layer);
            if(j < layer.nodes.length) {
                var node = layer.nodes[j];
                layer_nodes[node.id] = node;
            }
            if(j == 0) {
                if(segment.segs.length > 0) {
                    segment.measure = segment.pos = 0;
                    LS.push(segment);
                }
                node.pos = segment.segs.length;
            } else {
                var last_node = layer.nodes[j - 1];
                if(j < layer.nodes.length) {
                    node.pos = last_node.pos + segment.segs.length + 1;
                }
                if(segment.segs.length > 0) {
                    segment.measure = segment.pos = last_node.pos + 1;
                    LS.push(segment);
                }
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

        // Make Chrome do it right - permutes the order of same-valued array elements when sorting
        var used_measures = [];
        for(var j=0; j<LV.length; j++) {
            var node = LV[j];
            var num_parents = 0;
            var total_pos = 0;
            for(var node_id in next_layer[backward_edges][node.id]) {
                total_pos += layer_nodes[node_id].pos;
                num_parents++;
            }
            node.measure = num_parents > 0 ? total_pos / num_parents : node.measure || node.measure ? node.measure : 0;
            while($.inArray(node.measure, used_measures) != -1) {
                node.measure += .000001;
            }
            used_measures.push(node.measure);
        }

        // Step 3
        var L = [];

        function measure_sort(a, b) {
            return a.measure - b.measure;
        }
        LV.sort(measure_sort);
        LS.sort(measure_sort);

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

        // Step 4
        var pq = seg_begin == 'p' ? 1 : 0;
        var next_layer_num = parseInt(next_layer.nodes[0].id.split('-')[0]);
        for(var j=0; j<L.length; j++) {
            var S = L[j];
            if(S.segs) {
                // It's actually a segment container
                for(var k=0; k<S.segs.length; k++) {
                    var q_layer = parseInt(S.segs[k].nodes[pq].id.split('-')[0]);
                    if(q_layer == next_layer_num) {
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

        // Step 5
        // Need to find edges between L - 1 and L
        
        // get the raw edges for this layer in the form {'edge': [node1, node2], 'weight': x}
        var layer_edges = [];
        for(var j in layer[forward_edges]) {
            var e = layer[forward_edges][j];
            for(var k in e) {
                layer_edges.push(e[k]);
            }
        }

        //Make a map of prev_L for nodes with relevant edges
        var prev_L = compaction[i];
        var prev_L_node_map = {};
        var position = 0;
        for(var j=0; j<prev_L.length; j++) {
            var v = prev_L[j];
            if(v.sub_nodes) {
                if(layer[forward_edges][v.id]) {
                    prev_L_node_map[v.id] = position;
                    position++;
                }
            } else {
                for(var k in v.segs) {
                    var seg = v.segs[k];
                    prev_L_node_map[seg.id] = position;
                }
                position++;
            }
        }

        // Same for L
        var L_node_map = {};
        var position = 0;
        for(var j=0; j<L.length; j++) {
            var v = L[j];
            if(v.sub_nodes) {
                if(next_layer[backward_edges][v.id]) {
                    L_node_map[v.id] = position;
                    position++;
                }
            } else {
                for(var k in v.segs) {
                    var seg = v.segs[k];
                    L_node_map[seg.id] = position;
                }
                position++;
            }
        }

        // Assign an order to each edge between layer and next_layer:
        // [position in layer, position in next_layer]
        for(var j=0; j<layer_edges.length; j++) {
            var edge = layer_edges[j];
            edge.order = [prev_L_node_map[edge.edge[0].id],
                          L_node_map[edge.edge[1].id]];
        }

        // position just happens to be the number of nodes in L that have edges back to prev_L
        var crossings = count_crossings(layer_edges, position, next_layer[backward_edges], seg_begin, seg_end);

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
        return [crossings, compaction.concat([L]), next_layer];
    }

    function align_vertically(graph, up_down, left_right) {
        var neighbors, edges;
        if(up_down) {
            neighbors = 'next_neighbors';
            edges = 'next_edges';
        } else {
            neighbors = 'prev_neighbors';
            edges = 'prev_edges';
        }
        var pos = left_right ? 'r_pos' : 'pos';
        for(var i=0; i<graph.e_compaction.length; i++) {
            var layer = graph.layers[i];
            var L = graph.e_compaction[i];
            if(left_right) {
                L.reverse();
            }
            var r = -1;
            for(var k=0; k<L.length; k++) {
                var v = L[k];
                var u = v[neighbors];
                if(u.length) {
                    if(left_right) {
                        u.reverse();
                    }
                    var proto_median = ((u.length + 1) / 2) - 1;
                    for(var m=Math.floor(proto_median); m<=Math.ceil(proto_median); m++) {
                        if(v.align == v) {
                            var n = u[m];
                            var edge = layer[edges][v.id][n.id];
                            if((!edge || !edge.marked) && r < n[pos]) {
                                n.align = v;
                                v.root = n.root;
                                v.align = v.root;
                                n.root.size = Math.max(n.root.size, v.size);
                                r = n[pos];
                            }
                        }
                    }
                    if(left_right) {
                        u.reverse();
                    }
                }
            }
            if(left_right) {
                L.reverse();
            }
        }
    }

    function place_block(v, delta, left_right) {
        var pos, pred;
        if(left_right) {
            pos = 'r_pos';
            pred = 'succ';
        } else {
            pos = 'pos';
            pred = 'pred';
        }
        if(v.y == null) {
            v.y = 0;
            var w = v;
            do {
                if(w[pos] > 0) {
                    var u = w[pred].root;
                    place_block(u, delta, left_right);
                    if(v.sink == v) {
                        v.sink = u.sink;
                    }
                    var delta = Math.ceil((10 * u.size) + 30);
                    if(v.sink != u.sink) {
                        if(left_right) {
                            u.sink.shift = Math.min(u.sink.shift, u.y - v.y + delta);
                        } else {
                            u.sink.shift = Math.min(u.sink.shift, v.y - u.y - delta);
                        }
                    } else {
                        if(left_right) {
                            v.y = Math.min(v.y, u.y - delta);
                        } else {
                            v.y = Math.max(v.y, u.y + delta);
                        }
                    }
                }
                w = w.align;
            } while(w != v);
        }
    }

    function compact_horizontally(graph, delta, left_right) {
        for(var i=0; i<graph.e_compaction.length; i++) {
            var L = graph.e_compaction[i];
            if(left_right) {
                L.reverse();
            }
            for(var j=0; j<L.length; j++) {
                var v = L[j];
                if(v.root == v) {
                    place_block(v, delta, left_right);
                }
            }
            if(left_right) {
                L.reverse();
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
                if(v.sink.shift < Infinity) {
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
        var seg_begin = 'p';
        var seg_end = 'q';
        var forward_edges = 'next_edges';
        var backward_edges = 'prev_edges';
        var total_crossings = 0;
        var a = 0;
        var best = $.extend({'crossings': Infinity, 'compaction': []}, graph);
        var layer = copy_layer(graph.layers[0]);
        var edge_types = ['prev_edges', 'next_edges'];
        var marked_types = ['prev_marked', 'next_marked'];
        for(var i=0; i<layer.nodes.length + 1; i++) {
            layer.segments.push({'segs': []});
        }
        do {
            var old_total_crossings = total_crossings;
            total_crossings = 0;
            var compaction = [layer.nodes.slice(0)];
            for(var i=0; i<graph.layers.length - 1; i++) {
                var results = minimize_crossings(graph, layer, i, compaction, seg_begin, seg_end,
                                                 forward_edges, backward_edges);
                total_crossings += results[0];
                compaction = results[1];
                layer = results[2];
                graph.layers[i + 1] = copy_layer(layer);
            }
            var difference = Math.abs(total_crossings - old_total_crossings);
            if(total_crossings < best.crossings) {
                best.crossings = total_crossings;
                best.compaction = compaction;
                best.prev_marked = [];
                best.next_marked = [];
                for(var i=0; i<graph.layers.length; i++) {
                    var layer = graph.layers[i];
                    for(var j=0; j<edge_types.length; j++) {
                        var node1_ids = layer[edge_types[j]];
                        var hash = {};
                        for(var node1_id in node1_ids) {
                            var node2_ids = node1_ids[node1_id];
                            hash[node1_id] = {};
                            for(var node2_id in node2_ids) {
                                hash[node1_id][node2_id] = node2_ids[node2_id].marked;
                            }
                        }
                        var marked = marked_types[j];
                        best[marked].push(hash);
                    }
                }
                if(seg_begin == 'q') {
                    best.compaction.reverse();
                    best.prev_marked.reverse();
                    best.next_marked.reverse();
                }
            }

            // Go backwards
            var holder = seg_begin;
            seg_begin = seg_end;
            seg_end = holder;
            holder = forward_edges;
            forward_edges = backward_edges;
            backward_edges = holder;
            graph.layers.reverse();
            a++;
        } while(a < 20 && difference > 0);

        if(a % 2) {
            graph.layers.reverse();
        }

        for(var i=0; i<graph.layers.length; i++) {
            var layer = graph.layers[i];
            for(var j=0; j<edge_types.length; j++) {
                var node1_ids = layer[edge_types[j]];
                var marked = marked_types[j];
                for(var node1_id in node1_ids) {
                    var node2_ids = node1_ids[node1_id];
                    for(var node2_id in node2_ids) {
                        node2_ids[node2_id].marked = best[marked][i][node1_id][node2_id];
                    }
                }
            }
        }

        //Un-segmentify the compaction
        best.e_compaction = [];
        for(var i=0; i<best.compaction.length; i++) {
            var L = best.compaction[i].slice(0);
            for(var j=0; j<L.length; j++) {
                var v = L[j];
                if(v.segs) {
                    segs = v.segs.slice(0);
                    // Remove v from L and put the segs from v directly into L
                    L.splice(j, 1);
                    while(segs.length) {
                        L.splice(j, 0, segs.pop());
                    }
                }
            }
            best.e_compaction.push(L);
        }

        best.layers = graph.layers;
        neighborify(best);
        return best;
    }

    function neighborify(graph) {
        for(var i=0; i<graph.layers.length; i++) {
            var L = graph.e_compaction[i];
            var layer = graph.layers[i];
            
            for(var j=0; j<L.length; j++) {
                var v = L[j];
                for(var k in layer.prev_edges[v.id]) {
                    var prev_node = layer.prev_edges[v.id][k].edge[1];
                    if($.inArray(v, prev_node.next_neighbors) == -1 && prev_node != v) {
                        prev_node.next_neighbors.push(v);
                    }
                }
                for(var l in layer.next_edges[v.id]) {
                    var next_node = layer.next_edges[v.id][l].edge[1];
                    if($.inArray(v, next_node.prev_neighbors) == -1 && next_node != v) {
                        next_node.prev_neighbors.push(v);
                    }
                }
                if(j > 0) {
                    v.pred = L[j - 1];
                }
                if(j < L.length - 1) {
                    v.succ = L[j + 1];
                }
                // Reset the pos, because the current configuration probably won't be the same as the last time through
                // the crossing reduction
                v.pos = j;
                v.r_pos = L.length - j - 1;
            }
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
                initialize_nodes(graph);
                align_vertically(graph, i, j);
                var alignment = compact_horizontally(graph, delta, j);
                if(i) {
                    alignment.y_coords.reverse();
                }
                // if(alignment.min_coord != 20) {
                //     var shift = -alignment.min_coord + 20;
                //     for(var k=0; k<graph.e_compaction.length; k++) {
                //         var L = graph.e_compaction[k];
                //         for(var l=0; l<L.length; l++) {
                //             L[l].y += shift;
                //         }
                //     }
                // }
                // debugger;
                // draw_graph('paper', graph);
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
                max_y = Math.max(v.y + (v.size * 10), max_y);
            }
        }

        // For now, just make sure there's no negative y values
        var width = max_y - min_y;
        var center = width / 2;
        if(min_y != 20) {
            var shift = -min_y + 20;
            max_y += shift;
            for(var i=0; i<graph.layers.length; i++) {
                var layer = graph.layers[i];
                for(var j=0; j<layer.nodes.length; j++) {
                    layer.nodes[j].y += shift;
                }
            }
        }
        graph.max_x = graph.e_compaction[graph.e_compaction.length - 1][0].x
        graph.max_y = max_y;

        for(var i=0; i<graph.char_nodes.length; i++) {
            var c_nodes = graph.char_nodes[i];
            var posen = 0;
            for(var j=0; j<c_nodes.nodes.length; j++) {
                posen += c_nodes.nodes[j].pos;
            }
            c_nodes.avg_pos = posen / j;
        }
        graph.char_nodes.sort(function(a, b) {
            return a.avg_pos - b.avg_pos;
        });
    }

    function initialize_nodes(graph) {
        for(var i=0; i<graph.e_compaction.length; i++) {
            var L = graph.e_compaction[i];
            for(var j=0; j<L.length; j++) {
                var v = L[j];
                v.root = v;
                v.align = v;
                v.sink = v;
                v.shift = Infinity;
                v.size = v.sub_nodes ? v.sub_nodes.length : v.nodes[0].sub_nodes.length;
                v.y_delta = 0;
                v.y = null;
            }
        }
    }

    function draw_graph(paper_id, graph) {
        var paper_jq = $('#' + paper_id);
        paper_jq.children().remove();
        var body = $('body');
        var original_scale = Math.min(paper_jq.width() / graph.max_x, paper_jq.height() / graph.max_y);
        paper_jq.svg({
            'onLoad': function(svg) {
                var g = svg.group('graph');
                var pov = svg.group(g, 'pov', {'stroke-width': 2});
                var non_pov = svg.group(g, 'non_pov', {'stroke-width': 1});
                for(var i=0; i<graph.char_nodes.length; i++) {
                    var c_nodes = graph.char_nodes[i];
                    var edge_arr = [];
                    for(var j=0; j<c_nodes.nodes.length; j++) {
                        var node = c_nodes.nodes[j];
                        if(j) {
                            edge_arr.push('L');
                        } else {
                            edge_arr.push('M');
                        }
                        edge_arr.push(node.x + ' ' + (node.y + node.y_delta));
                        if(node.duration) {
                            edge_arr.push('l' + node.duration + ' 0');
                        }
                        node.y_delta += 10;
                    }
                    var group = c_nodes.character.pov ? pov : non_pov;
                    svg.path(group, edge_arr.join(''), {'stroke': group_colors[c_nodes.character.group],
                                                        'stroke-width': 'inherit',
                                                        'fill': 'none'});
                }
                svg.change(g, {'transform': 'scale(' + original_scale + ')'});
            },
            'settings': {'width': body.width(),
                         'height': body.height() - 15}
            }
        );

        var scale = original_scale;
        var translate = {'x': 0, 'y': 0};
        var svg = paper_jq.svg('get');
        var g = svg.getElementById('graph');
        var pov = svg.getElementById('pov');
        var non_pov = svg.getElementById('non_pov');
        var old_scale;
        function zoom_graph(e, delta) {
            old_scale = scale;
            scale = Math.min(10, Math.max(.05, scale * Math.pow(1.2, (delta / Math.abs(delta)))));
            if(scale != old_scale) {
                var k = scale / old_scale;
                translate = {'x': e.pageX + (k * (translate.x - e.pageX)),
                             'y': e.pageY + (k * (translate.y - e.pageY))};
                svg.change(g, {'transform': 'translate(' + translate.x + ',' + translate.y + '), scale(' + scale + ')'});
                if(scale > 1) {
                    svg.change(pov, {'stroke-width': 2 / scale});
                    svg.change(non_pov, {'stroke-width': 1 / scale});
                }
            }
            return false;
        }

        paper_jq.mousewheel(zoom_graph);
        paper_jq.dblclick(function(e) {
            var in_out;
            if(e.which == 1) {
                in_out = 1;
            } else if(e.which == 3) {
                in_out = -1;
            }
            if(in_out) {
                zoom_graph(e, in_out);
            }
        });

        var mouse_position;
        paper_jq.mousedown(function(e) {
            mouse_position = {'x': e.pageX, 'y': e.pageY};
            original_translate = $.extend({}, translate);
            paper_jq.mousemove(function(e) {
                translate = {'x': original_translate.x + e.pageX - mouse_position.x,
                             'y': original_translate.y + e.pageY - mouse_position.y};

                svg.change(g, {'transform': 'translate(' + translate.x + ',' + translate.y + '), scale(' + scale + ')'});
            });
        });

        paper_jq.mouseup(function(e) {
            paper_jq.unbind('mousemove');
        });

        // for(var i in graph.flat_nodes) {
        //     var node = graph.flat_nodes[i];
        //     var c = paper.circle(node.x, node.y, 6).attr({'fill': 'red'});
        //     set.push(c);

        //     (function(node) {
        //         $(c.node).click(function() {
        //             console.log(node);
        //         });
        //     })(node);
        // }

        // for(var i in graph.p_nodes) {
        //     var node = graph.p_nodes[i];
        //     var c = paper.circle(node.x, node.y, 6).attr({'fill': 'green'});

        //     (function(node) {
        //         $(c.node).click(function() {
        //             console.log(node);
        //         });
        //     })(node);
        // }

        // for(var i in graph.q_nodes) {
        //     var node = graph.q_nodes[i];
        //     var c = paper.circle(node.x, node.y, 6).attr({'fill': 'blue'});

        //     (function(node) {
        //         $(c.node).click(function() {
        //             console.log(node);
        //         });
        //     })(node);
        // }

        // for(var i in graph.r_nodes) {
        //     var node = graph.r_nodes[i];
        //     var c = paper.circle(node.x, node.y, 6).attr({'fill': 'yellow'});

        //     (function(node) {
        //         $(c.node).click(function() {
        //             console.log(node);
        //         });
        //     })(node);
        // }
    }

    var height = $(window).height();
    var mid_y = Math.floor(height / 2);
    var width = $(window).width();
    $('#paper').height(height);
    $('#paper').width(width);

    var graph = make_edges(layers, 50);
    var ordered_graph = order(graph);
    place_nodes(ordered_graph, 20);
    draw_graph('paper', ordered_graph);

});
