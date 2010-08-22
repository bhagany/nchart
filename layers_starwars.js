(function(window) {
    var layers = [
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['vader']},
             {'sub_nodes': ['leia', 'r2-d2', 'c-3po']},
             {'sub_nodes': ['obi-wan']},
             {'sub_nodes': ['luke']},
             {'sub_nodes': ['han', 'chewie']},
             {'sub_nodes': ['jabba']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['vader', 'leia']},
             {'sub_nodes': ['r2-d2', 'c-3po', 'luke']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['r2-d2', 'c-3po', 'luke', 'obi-wan']},
             {'sub_nodes': ['greedo']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['r2-d2', 'c-3po', 'luke', 'obi-wan', 'han', 'chewie', 'greedo'],
              'deaths': ['greedo']
             },
         ],
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['luke', 'han', 'chewie', 'leia']},
             {'sub_nodes': ['r2-d2', 'c-3po']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['obi-wan', 'vader'],
              'deaths': ['obi-wan']
             },
             {'sub_nodes': ['r2-d2', 'c-3po', 'luke', 'han', 'chewie', 'leia']},
         ],
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['luke', 'vader', 'r2-d2']},
             {'sub_nodes': ['han', 'chewie']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['luke', 'vader', 'r2-d2', 'han', 'chewie']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['luke', 'r2-d2', 'han', 'chewie', 'leia', 'c-3po']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['luke']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['luke', 'han']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['luke', 'han', 'r2-d2', 'chewie', 'leia', 'c-3po']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['luke', 'han', 'r2-d2', 'chewie', 'leia', 'c-3po', 'vader']},
             {'sub_nodes': ['lando']}

         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['luke', 'r2-d2']},
             {'sub_nodes': ['vader', 'lando']},
             {'sub_nodes': ['boba']},
             {'sub_nodes': ['yoda']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['luke', 'r2-d2', 'yoda']},
             {'sub_nodes': ['vader', 'boba']},
             {'sub_nodes': ['han', 'chewie', 'leia', 'c-3po', 'lando']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['luke', 'r2-d2', 'yoda']},
             {'sub_nodes': ['vader', 'boba', 'han', 'chewie', 'leia', 'c-3po', 'lando']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['boba', 'han', 'jabba']},
             {'sub_nodes': ['r2-d2', 'chewie', 'leia', 'c-3po', 'lando']},
             {'sub_nodes': ['luke', 'vader']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['r2-d2', 'chewie', 'leia', 'c-3po', 'lando', 'luke']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['boba', 'han', 'jabba', 'lando']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['boba', 'han', 'jabba', 'lando', 'r2-d2', 'c-3po']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['boba', 'han', 'jabba', 'lando', 'r2-d2', 'c-3po', 'chewie', 'leia']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['boba', 'han', 'jabba', 'lando', 'r2-d2', 'c-3po', 'chewie', 'leia', 'luke'],
              'deaths': ['boba', 'jabba']
             },
         ],
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['luke', 'yoda'],
              'deaths': ['yoda']
             }
         ],
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['han', 'lando', 'r2-d2', 'c-3po', 'chewie', 'leia', 'luke']},
             {'sub_nodes': ['emperor']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['han', 'r2-d2', 'c-3po', 'chewie', 'leia', 'luke']},
             {'sub_nodes': ['emperor', 'vader']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['luke', 'vader']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['luke', 'vader', 'emperor']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['luke', 'vader', 'emperor', 'lando'],
              'deaths': ['emperor', 'vader']
             }
         ],
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['luke', 'lando', 'chewie', 'leia', 'r2-d2', 'c-3po', 'han']}
         ],
        },
    ];

    window.starwars.layers = layers;
})(window);