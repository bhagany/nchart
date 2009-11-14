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
        'arryn': '#23d0f5'
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
                'group': 'night\'s Watch'},
        'aemon': {'name': 'Maester Aemon',
                  'pov': false,
                  'group': 'night\'s Watch'},
        'jeor': {'name': 'Jeor Mormont',
                 'pov': false,
                 'group': 'night\'s Watch'},
        'benjen': {'name': 'Benjen Stark',
                   'pov': false,
                   'group': 'night\'s Watch'},
        'will': {'name': 'Will',
                 'pov': true,
                 'group': 'night\'s Watch'},
        'waymar': {'name': 'Waymar Royce',
                   'pov': false,
                   'group': 'night\'s Watch'},
        'gared': {'name': 'Gared',
                  'pov': false,
                  'group': 'night\'s Watch'},

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

    var node_groups = [
        {'duration': 0,
         'nodes': [
             ['will', 'waymar', 'gared']
         ],
         'deaths': ['will'],
         'wights': ['waymar'],
         'event': 'Encounter with Others'
        },
        {'duration': 0,
         'nodes': [
             ['ned', 'robb', 'bran', 'jon', 'theon', 'gared'],
         ],
         'deaths': ['gared'],
         'event': 'Execution of Gared'
        },
        {'duration': 0,
         'nodes': [
             ['ned', 'robb', 'bran', 'jon', 'theon', 'grey wind',
              'lady', 'nymeria', 'summer', 'shaggydog', 'ghost'],
         ],
         'event': 'Finding the Wolves'
        },
        {'duration': 0,
         'nodes': [
             ['ned', 'robb', 'sansa', 'arya', 'bran', 'rickon', 'jon',
              'theon', 'grey wind', 'lady', 'nymeria', 'summer',
              'shaggydog', 'ghost'],
         ]
        },
        {'duration': 0,
         'nodes': [
             ['daenerys', 'viserys', 'illyrio'],
             ['jorah'],
             ['drogo']
         ]
        },
        {'duration': 0,
         'nodes': [
             ['daenerys', 'viserys', 'illyrio', 'jorah', 'drogo']
         ],
         'event': 'Daenerys sold to Drogo'
        },
        {'duration': 0,
         'nodes': [
             ['ned', 'robb', 'sansa', 'arya', 'bran', 'rickon', 'jon',
              'theon', 'grey wind', 'lady', 'nymeria', 'summer',
              'shaggydog', 'ghost', 'benjen', 'robert b', 'cersei',
              'jaime', 'tyrion', 'joffrey', 'myrcella', 'tommen', 'sandor'],
         ],
         'event': 'Robert Visits Winterfell'
        },
        {'duration': 0,
         'nodes': [
             ['benjen', 'jon', 'ghost', 'tyrion'],
             ['robb', 'bran', 'rickon', 'theon', 'grey wind', 'summer', 'shaggydog', 'cat'],
             ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'jaime', 'joffrey', 'myrcella',
              'tommen', 'sandor', 'lady', 'nymeria']
         ]
        },
        {'duration': 0,
         'nodes': [
             ['daenerys', 'viserys', 'illyrio', 'jorah', 'drogo']
         ],
         'event': 'Drogo and Daenerys Married'
        },
        {'duration': 0,
         'nodes': [
             ['robb', 'bran', 'rickon', 'theon', 'grey wind', 'summer', 'shaggydog', 'cat']
         ],
         'event': 'Assassination attempt on Bran'
        },
        {'duration': 0,
         'nodes': [
             ['robb', 'bran', 'rickon', 'theon', 'grey wind', 'summer', 'shaggydog'],
             ['cat']
         ],
         'event': 'Assassination attempt on Bran'
        },
        {'duration': 0,
         'nodes': [
             ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'jaime', 'joffrey', 'myrcella',
              'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'lady', 'nymeria']
         ],
         'deaths': ['lady'],
         'event': 'Children Fight Near the Trident'
        },
        {'duration': 0,
         'nodes': [
             ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'jaime', 'joffrey', 'myrcella',
              'tommen', 'sandor', 'renly', 'barristan', 'ilyn'],
             ['nymeria']
         ],
        },
        {'duration': 0,
         'nodes': [
             ['benjen', 'jon', 'ghost', 'tyrion', 'jeor', 'aemon']
         ]
        },
        {'duration': 0,
         'nodes': [
             ['jon', 'ghost', 'tyrion', 'jeor', 'aemon'],
             ['benjen']
         ]
        },
        {'duration': 0,
         'nodes': [
             ['jon', 'ghost', 'jeor', 'aemon'],
             ['tyrion']
         ]
        },
        {'duration': 0,
         'nodes': [
             ['cat', 'petyr', 'varys', 'pycelle']
         ]
        },
        {'duration': 0,
         'nodes': [
             ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'jaime', 'joffrey', 'myrcella',
              'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'cat', 'petyr', 'varys',
              'pycelle']
         ]
        },
        {'duration': 0,
         'nodes': [
             ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'jaime', 'joffrey', 'myrcella',
              'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
              'pycelle'],
             ['cat']
         ]
        },
        {'duration': 0,
         'nodes': [
             ['robb', 'bran', 'rickon', 'theon', 'grey wind', 'summer', 'shaggydog', 'tyrion'],
         ],
        },
        {'duration': 0,
         'nodes': [
             ['robb', 'bran', 'rickon', 'theon', 'grey wind', 'summer', 'shaggydog'],
             ['tyrion']
         ],
        },
        {'duration': 0,
         'nodes': [
             ['jon', 'ghost', 'tyrion', 'jeor', 'aemon', 'sam']
         ]
        },
        {'duration': 0,
         'nodes': [
             ['cat', 'tyrion']
         ],
        },
        {'duration': 0,
         'nodes': [
             ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'jaime', 'joffrey', 'myrcella',
              'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
              'pycelle', 'gregor', 'beric', 'loras'],
         ],
         'event': 'Hand\'s Tourney'
        },
        {'duration': 0,
         'nodes': [
             ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'jaime', 'joffrey', 'myrcella',
              'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
              'pycelle', 'beric', 'loras'],
             ['gregor']
         ],
        },
        {'duration': 0,
         'nodes': [
             ['arya'],
             ['varys', 'illyrio']
         ]
        },
        {'duration': 0,
         'nodes': [
             ['arya', 'varys', 'illyrio']
         ]
        },
        {'duration': 0,
         'nodes': [
             ['arya'],
             ['varys', 'illyrio']
         ]
        },
        {'duration': 0,
         'nodes': [
             ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'jaime', 'joffrey', 'myrcella',
              'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
              'pycelle', 'beric', 'loras'],
             ['illyrio']
         ],
        },
        {'duration': 0,
         'nodes': [
             ['arya'],
             ['illyrio']
         ]
        },
        {'duration': 0,
         'nodes': [
             ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'jaime', 'joffrey', 'myrcella',
              'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
              'pycelle', 'beric', 'loras'],
         ],
        },
        {'duration': 0,
         'nodes': [
             ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'joffrey', 'myrcella',
              'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
              'pycelle', 'beric', 'loras'],
             ['jaime']
         ],
        },
        {'duration': 0,
         'nodes': [
             ['cat', 'tyrion'],
             ['brynden']
         ]
        },
        {'duration': 0,
         'nodes': [
             ['cat', 'tyrion', 'brynden']
         ]
        },
        {'duration': 0,
         'nodes': [
             ['cat'],
             ['tyrion', 'brynden']
         ]
        },
        {'duration': 0,
         'nodes': [
             ['cat'],
             ['lysa', 'robert a']
         ]
        },
        {'duration': 0,
         'nodes': [
             ['cat', 'lysa', 'robert a']
         ]
        },
        {'duration': 0,
         'nodes': [
             ['cat', 'lysa', 'robert a', 'brynden', 'tyrion']
         ]
        },
        {'duration': 0,
         'nodes': [
             ['cat', 'brynden'],
             ['tyrion']
         ]
        },
        {'duration': 0,
         'nodes': [
             ['beric']
         ]
        },
        {'duration': 0,
         'nodes': [
             ['daenerys', 'viserys', 'jorah', 'drogo']
         ],
         'deaths': ['viserys'],
         'event': 'Viserys Crowned'
        },
        {'duration': 0,
         'nodes': [
             ['renly', 'loras']
         ],
        },
        {'duration': 0,
         'nodes': [
             ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'joffrey', 'myrcella',
              'tommen', 'sandor', 'barristan', 'ilyn', 'petyr', 'varys', 'pycelle'],
             ['renly', 'loras']
         ],
        },
        {'duration': 0,
         'nodes': [
             ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'joffrey', 'myrcella',
              'tommen', 'sandor', 'barristan', 'ilyn', 'petyr', 'varys', 'pycelle']
         ],
         'deaths': ['robert b'],
         'event': 'King Robert Gored and Killed'
        },
        {'duration': 0,
         'nodes': [
             ['jon', 'ghost', 'tyrion', 'jeor', 'aemon', 'sam']
         ],
         'event': 'Wight Attack at Castle Black'
        },
        {'duration': 0,
         'nodes': [
             ['robb', 'bran', 'rickon', 'theon', 'grey wind', 'summer', 'shaggydog'],
             ['tyrion']
         ],
         'event': 'Robb calls his banners'
        },
        {'duration': 0,
         'nodes': [
             ['bran', 'rickon', 'summer', 'shaggydog'],
             ['robb', 'grey wind', 'theon']
         ],
        },
        {'duration': 0,
         'nodes': [
             ['robb', 'grey wind', 'theon', 'cat', 'brynden']
         ],
        },
        {'duration': 0,
         'nodes': [
             ['tyrion', 'tywin', 'gregor']
         ],
        },
        {'duration': 0,
         'nodes': [
             ['daenerys', 'jorah', 'drogo'],
             ['mirri']
         ],
        },
        {'duration': 0,
         'nodes': [
             ['daenerys', 'jorah', 'drogo', 'mirri']
         ],
         'event': 'Sack of the Lhazareen town'
        },
        {'duration': 0,
         'nodes': [
             ['tyrion', 'tywin', 'gregor']
         ],
         'event': 'Battle of the Green Fork'
        },
        {'duration': 0,
         'nodes': [
             ['robb', 'grey wind', 'theon', 'cat', 'brynden', 'jaime']
         ],
         'event': 'Battle of the Whispering Wood'
        },
        {'duration': 0,
         'nodes': [
             ['daenerys', 'jorah', 'drogo', 'mirri']
         ],
         'event': 'Drogo falls off his horse, Dany goes into labor'
        },
        {'duration': 0,
         'nodes': [
             ['ned', 'sansa', 'arya', 'cersei', 'joffrey', 'myrcella',
              'tommen', 'sandor', 'barristan', 'ilyn', 'petyr', 'varys', 'pycelle']
         ],
         'deaths': ['ned'],
         'event': 'Ned beheaded at the Great Sept of Baelor'
        },
        {'duration': 0,
         'nodes': [
             ['daenerys', 'jorah', 'drogo', 'mirri']
         ],
         'deaths': ['drogo'],
         'event': 'The breaking of Drogo\'s khalasar'
        },
        {'duration': 0,
         'nodes': [
             ['robb', 'grey wind', 'theon', 'cat', 'brynden', 'jaime']
         ],
         'event': 'Seige of Riverrun broken, Robb proclaimed King in the North'
        },
        {'duration': 0,
         'nodes': [
             ['tyrion', 'tywin', 'gregor']
         ],
        },
        {'duration': 0,
         'nodes': [
             ['tyrion'],
             ['tywin'],
             ['gregor']
         ],
        },
        {'duration': 0,
         'nodes': [
             ['daenerys', 'jorah', 'mirri']
         ],
         'deaths': ['mirri'],
         'event': 'Mother of Dragons'
        },
    ];

    var height = $(window).height();
    var mid_y = Math.floor(height / 2);
    var width = 1000;
    var x_space = Math.floor(width / node_groups.length - 1);

    var C = 2;
    var K = x_space * Math.pow(C, 3);
    var p = 2;

    function repulse(node1, node2) {
        var delta = [node2.position[0] - node1.position[0],
                     node2.position[1] - node1.position[1]];

        return -C
            * Math.pow(K, 1 + p)
            / Math.pow(delta[1], p)
            / delta[1]
            * Math.sqrt(Math.pow(delta[0], 2) + Math.pow(delta[1], 2));
    }

    // function repulse(node1, node2) {
    //     var delta = [node2.position[0] - node1.position[0],
    //                  node2.position[1] - node1.position[1]];

    //     return -C
    //         * Math.pow(K, 2)
    //         / -delta[1]
    //         / delta[1]
    //         * Math.sqrt(Math.pow(delta[0], 2) + Math.pow(delta[1], 2));
    // }

    function edge_repulse(node, edge) {
        var edge1 = edge[0];
        var edge2 = edge[1];
        var u = ((node.position[0] - edge1.position[0]) * (edge2.position[0] - edge1.position[0])
                 + (node.position[1] - edge1.position[1]) * (edge2.position[1] - edge1.position[1]))
            / (Math.pow(edge1.position[0] - edge2.position[0], 2)
               + Math.pow(edge1.position[1] - edge2.position[1], 2));

        var intersection = [edge1.position[0] + u * (edge2.position[0] - edge1.position[0]),
                            edge1.position[1] + u * (edge2.position[1] - edge1.position[1])];
        var delta = [node.position[0] - intersection[0],
                     node.position[1] - intersection[1]];
        if(delta[1] == 0) {
            return 0;
        }
        return -C
            * Math.pow(K, 1 + p)
            / Math.pow(delta[1], p)
            / delta[1]
            * Math.sqrt(Math.pow(delta[0], 2) + Math.pow(delta[1], 2));
    }

    function attract(node, edge_node, weight) {
        // Only gets called for things in different columns
        var delta = [edge_node.position[0] - node.position[0],
                     edge_node.position[1] - node.position[1]];
        return Math.pow(-delta[1], 2)
            / K
            / delta[1]
            * Math.sqrt(Math.pow(delta[0], 2) + Math.pow(delta[1], 2))
            * weight;
    }

    function add_edge(edge_group, node1_id, node2_id) {
        if(!edge_group[node1_id]) {
            edge_group[node1_id] = {};
        }
        if(!edge_group[node1_id][node2_id]) {
            edge_group[node1_id][node2_id] = 1;
        } else {
            edge_group[node1_id][node2_id]++;
        }
    }

    var edges = {};
    var reflexive_edges = {}
    var last_nodes = {};
    var flat_nodes = [];
    var flat_edges = [];
    var node_len = node_groups.length;
    var i, j, k, x, nodes, start_y, node, node_id, name;
    for(i=0; i<node_len; i++) {
        x = x_space * (i + 1);
        nodes = node_groups[i].nodes;
        start_y = Math.ceil(nodes.length / 2) - nodes.length + mid_y;
        var n_len = nodes.length;
        for(j=0; j<n_len; j++) {
            node = {'vertex': nodes[j]};
            node_id = flat_nodes.length;
            flat_nodes.push(node);
            node.position = [x, start_y + j];
            node.velocity = 0;
            node.net_force = 0;
            for(k in node.vertex) {
                name = node.vertex[k];
                if(last_nodes[name] || last_nodes[name] === 0) {
                    add_edge(edges, last_nodes[name], node_id);
                    add_edge(reflexive_edges, last_nodes[name], node_id);
                    add_edge(reflexive_edges, node_id, last_nodes[name]);
                    flat_edges.push([flat_nodes[last_nodes[name]], flat_nodes[node_id]]);
                }
                if(!node_groups[i].deaths || $.inArray(name, node_groups[i].deaths) == -1) {
                    last_nodes[name] = node_id;
                }
            }
        }
    }

    var cross_edges = {};
    for(var node_id in edges) {
        var node2_ids = edges[node_id]
        for(var node2_id in edges[node_id]) {
            var i = parseInt(node_id);
            var j = parseInt(node2_id);
            var node1 = flat_nodes[node_id];
            var node2 = flat_nodes[node2_id];
            for(var k=i + 1; k<j; k++) {
                k_node = flat_nodes[k];
                if(!cross_edges[k]) {
                    cross_edges[k] = [];
                }
                if(node1.position[0] < k_node.position[0] && k_node.position[0] < node2.position[0]) {
                    cross_edges[k].push([flat_nodes[node_id], flat_nodes[node2_id]]);
                }
            }
        }
    }

    // var count = 0;
    // for(var i in edges) {
    //     count++;
    // }

    // console.log(count);
    // console.log(flat_nodes.length);

    var progress = 0;
    var t = .9;
    function update_steplength(step, energy, energy_0) {
        if(energy < energy_0) {
            progress = progress + 1;
            if(progress >= 5) {
                progress = 0;
                step = step / t;
            }
        } else {
            progress = 0;
            step = t * step;
        }

        return step;
    }
            

    var converged = false;
    var step = 1;
    var energy = Math.Infinity;
    var tolerance = .01;
    var flat_len = flat_nodes.length;
    var total_movement, energy_0, i, node, f, node_id, edge_node, weight, j, other_node, k, movement;
    while(converged == false) {
        total_movement = 0;
        energy_0 = energy;
        energy = 0;
        for(i=0; i<flat_len; i++) {
            node = flat_nodes[i];
            f = 0;
            for(node_id in reflexive_edges[i]) {
                edge_node = flat_nodes[node_id];
                if(edge_node.position[1] - node.position[1] != 0) {
                    weight = reflexive_edges[i][node_id];
                    f += attract(node, edge_node, weight);
                }
            }
            for(j=0; j<flat_len; j++) {
                other_node = flat_nodes[j];
                if(i != j
                   && node.position[0] == other_node.position[0]
                   && other_node.position[1] - node.position[1] != 0) {
                    f += repulse(node, other_node);
                }
            }
            if(cross_edges[i]) {
                var cross_len = cross_edges[i].length;
                for(k=0; k<cross_len; k++) {
                    edge = cross_edges[i][k];
                    f += edge_repulse(node, edge);
                }
            }
            if(f != 0) {
                movement = step * (f / Math.abs(f));
                node.position[1] = node.position[1] + movement;
                total_movement += Math.abs(movement);
                energy = energy + Math.pow(f, 2);
            }
        }
        step = update_steplength(step, energy, energy_0);
        if(total_movement < K * tolerance) {
            converged = true;
        }
    }

    var paper = new Raphael('paper', '100%', '100%');
    $('#paper').height(height);
    $('#paper').width(width);
    for(var node1_id in edges) {
        var node1 = flat_nodes[node1_id];
        var node2_ids = edges[node1_id];
        for(var node2_id in node2_ids) {
            var node2 = flat_nodes[node2_id];
            paper.path('M ' + node1.position.join(' ') + ' L ' + node2.position.join(' ')).attr({'stroke': 'black'});
        }
    }
    for(var i in flat_nodes) {
        var node = flat_nodes[i];
        paper.circle(node.position[0], node.position[1], 2).attr({'fill': 'red'});
    }

});
