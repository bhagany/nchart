(function(window) {
    var layers = [
        {'duration': 10,
         'nodes': [
             {'subnodes': ['vader']},
             {'subnodes': ['leia', 'r2-d2', 'c-3po']},
             {'subnodes': ['obi-wan']},
             {'subnodes': ['luke']},
             {'subnodes': ['han', 'chewie']},
             {'subnodes': ['jabba']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['vader', 'leia']},
             {'subnodes': ['r2-d2', 'c-3po', 'luke']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['r2-d2', 'c-3po', 'luke', 'obi-wan']},
             {'subnodes': ['greedo']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['r2-d2', 'c-3po', 'luke', 'obi-wan', 'han', 'chewie', 'greedo'],
              'deaths': ['greedo']
             },
         ],
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['luke', 'han', 'chewie', 'leia']},
             {'subnodes': ['r2-d2', 'c-3po']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['obi-wan', 'vader'],
              'deaths': ['obi-wan']
             },
             {'subnodes': ['r2-d2', 'c-3po', 'luke', 'han', 'chewie', 'leia']},
         ],
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['luke', 'vader', 'r2-d2']},
             {'subnodes': ['han', 'chewie']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['luke', 'vader', 'r2-d2', 'han', 'chewie']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['luke', 'r2-d2', 'han', 'chewie', 'leia', 'c-3po']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['luke']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['luke', 'han']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['luke', 'han', 'r2-d2', 'chewie', 'leia', 'c-3po']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['luke', 'han', 'r2-d2', 'chewie', 'leia', 'c-3po', 'vader']},
             {'subnodes': ['lando']}

         ]
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['luke', 'r2-d2']},
             {'subnodes': ['vader', 'lando']},
             {'subnodes': ['boba']},
             {'subnodes': ['yoda']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['luke', 'r2-d2', 'yoda']},
             {'subnodes': ['vader', 'boba']},
             {'subnodes': ['han', 'chewie', 'leia', 'c-3po', 'lando']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['luke', 'r2-d2', 'yoda']},
             {'subnodes': ['vader', 'boba', 'han', 'chewie', 'leia', 'c-3po', 'lando']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['boba', 'han', 'jabba']},
             {'subnodes': ['r2-d2', 'chewie', 'leia', 'c-3po', 'lando']},
             {'subnodes': ['luke', 'vader']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['r2-d2', 'chewie', 'leia', 'c-3po', 'lando', 'luke']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['boba', 'han', 'jabba', 'lando']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['boba', 'han', 'jabba', 'lando', 'r2-d2', 'c-3po']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['boba', 'han', 'jabba', 'lando', 'r2-d2', 'c-3po', 'chewie', 'leia']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['boba', 'han', 'jabba', 'lando', 'r2-d2', 'c-3po', 'chewie', 'leia', 'luke'],
              'deaths': ['boba', 'jabba']
             },
         ],
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['luke', 'yoda'],
              'deaths': ['yoda']
             }
         ],
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['han', 'lando', 'r2-d2', 'c-3po', 'chewie', 'leia', 'luke']},
             {'subnodes': ['emperor']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['han', 'r2-d2', 'c-3po', 'chewie', 'leia', 'luke']},
             {'subnodes': ['emperor', 'vader']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['luke', 'vader']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['luke', 'vader', 'emperor']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['luke', 'vader', 'emperor', 'lando'],
              'deaths': ['emperor', 'vader']
             }
         ],
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['luke', 'lando', 'chewie', 'leia', 'r2-d2', 'c-3po', 'han']}
         ],
        },
    ];

    if(window.starwars == undefined) {
        window.starwars = {};
    }
    window.starwars.layers = layers;
})(window);