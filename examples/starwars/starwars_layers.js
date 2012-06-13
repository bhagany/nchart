(function(window) {
    var layers = [
        {'duration': 10,
         'nodes': [
             {'characters': ['vader']},
             {'characters': ['leia', 'r2-d2', 'c-3po']},
             {'characters': ['obi-wan']},
             {'characters': ['luke']},
             {'characters': ['han', 'chewie']},
             {'characters': ['jabba']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['vader', 'leia']},
             {'characters': ['r2-d2', 'c-3po', 'luke']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['r2-d2', 'c-3po', 'luke', 'obi-wan']},
             {'characters': ['greedo']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['r2-d2', 'c-3po', 'luke', 'obi-wan', 'han', 'chewie', 'greedo'],
              'deaths': ['greedo']
             },
         ],
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['luke', 'han', 'chewie', 'leia']},
             {'characters': ['r2-d2', 'c-3po']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['obi-wan', 'vader'],
              'deaths': ['obi-wan']
             },
             {'characters': ['r2-d2', 'c-3po', 'luke', 'han', 'chewie', 'leia']},
         ],
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['luke', 'vader', 'r2-d2']},
             {'characters': ['han', 'chewie']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['luke', 'vader', 'r2-d2', 'han', 'chewie']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['luke', 'r2-d2', 'han', 'chewie', 'leia', 'c-3po']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['luke']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['luke', 'han']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['luke', 'han', 'r2-d2', 'chewie', 'leia', 'c-3po']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['luke', 'han', 'r2-d2', 'chewie', 'leia', 'c-3po', 'vader']},
             {'characters': ['lando']}

         ]
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['luke', 'r2-d2']},
             {'characters': ['vader', 'lando']},
             {'characters': ['boba']},
             {'characters': ['yoda']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['luke', 'r2-d2', 'yoda']},
             {'characters': ['vader', 'boba']},
             {'characters': ['han', 'chewie', 'leia', 'c-3po', 'lando']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['luke', 'r2-d2', 'yoda']},
             {'characters': ['vader', 'boba', 'han', 'chewie', 'leia', 'c-3po', 'lando']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['boba', 'han', 'jabba']},
             {'characters': ['r2-d2', 'chewie', 'leia', 'c-3po', 'lando']},
             {'characters': ['luke', 'vader']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['r2-d2', 'chewie', 'leia', 'c-3po', 'lando', 'luke']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['boba', 'han', 'jabba', 'lando']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['boba', 'han', 'jabba', 'lando', 'r2-d2', 'c-3po']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['boba', 'han', 'jabba', 'lando', 'r2-d2', 'c-3po', 'chewie', 'leia']},
         ]
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['boba', 'han', 'jabba', 'lando', 'r2-d2', 'c-3po', 'chewie', 'leia', 'luke'],
              'deaths': ['boba', 'jabba']
             },
         ],
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['luke', 'yoda'],
              'deaths': ['yoda']
             }
         ],
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['han', 'lando', 'r2-d2', 'c-3po', 'chewie', 'leia', 'luke']},
             {'characters': ['emperor']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['han', 'r2-d2', 'c-3po', 'chewie', 'leia', 'luke']},
             {'characters': ['emperor', 'vader']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['luke', 'vader']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['luke', 'vader', 'emperor']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['luke', 'vader', 'emperor', 'lando'],
              'deaths': ['emperor', 'vader']
             }
         ],
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['luke', 'lando', 'chewie', 'leia', 'r2-d2', 'c-3po', 'han']}
         ],
        },
    ];

    if(window.starwars == undefined) {
        window.starwars = {};
    }
    window.starwars.layers = layers;
})(window);