(function(window) {
    var layers = [
        // A Feast for Crows
        // 1. Prologue - Pate I
        {'duration': 10,
         'nodes': [
             {'characters': ['alleras', 'pate']},
             // Character Intros
             {'characters': ['jaqen']},
             {'characters': ['aeron']},
             {'characters': ['asha']},
             {'characters': ['victarion']},
             {'characters': ['myrcella']},
             {'characters': ['cersei', 'ilyn', 'pycelle', 'loras', 'tommen', 'margaery', 'jaime', 'gregor']},
             {'characters': ['brienne']},
             {'characters': ['jon', 'ghost', 'aemon', 'stannis', 'melisandre', 'sam']},
             {'characters': ['arya']},
             {'characters': ['sansa', 'petyr', 'robert_a']},
             {'characters': ['sandor']},
             {'characters': ['brynden']},
             {'characters': ['gendry']},
             {'characters': ['cat']},

         ],
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['pate', 'jaqen'],
              'deaths': ['pate']
             },
             // Character intros
             {'characters': ['areo', 'doran', 'arianne', 'arys']}
         ],
        },
        // 3. The Captain of the Guards I (Areo)
        {'duration': 10,
         'nodes': [
             {'characters': ['areo', 'doran', 'arianne', 'myrcella', 'arys']}
         ],
        },
        // 16. Samwell II
        {'duration': 10,
         'nodes': [
             {'characters': ['jon', 'ghost', 'stannis', 'melisandre']},
             {'characters': ['aemon', 'sam']},
             // Character intro
             {'characters': ['euron']}
         ],
        },
        // 19. The Iron Captain I (Victarion)
        {'duration': 10,
         'nodes': [
             {'characters': ['aeron', 'asha', 'victarion', 'euron']}
         ],
        },
        // 22. The Queenmaker (Arianne)
        {'duration': 10,
         'nodes': [
             {'characters': ['arys', 'arianne', 'myrcella']},
             {'characters': ['doran', 'areo']}
         ],
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['arys', 'arianne', 'myrcella', 'areo'],
              'deaths': ['arys']}
         ],
        },
        // 27. Samwell III
        {'duration': 10,
         'nodes': [
             {'characters': ['aemon', 'sam', 'arya']}
         ],
        },
        // 28. Jaime III
        {'duration': 10,
         'nodes': [
             {'characters': ['cersei', 'ilyn', 'pycelle', 'loras', 'tommen', 'margaery', 'jaime', 'gregor']}
         ],
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['jaime', 'ilyn']},
             {'characters': ['cersei', 'pycelle', 'loras', 'tommen', 'margaery', 'gregor']}
         ],
        },
        // 30. The Reaver (Victarion)
        {'duration': 10,
         'nodes': [
             {'characters': ['aeron', 'asha', 'victarion', 'euron']}
         ],
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['aeron', 'asha']},
             {'characters': ['victarion', 'euron']}
         ],
        },
        // 32. Brienne VI
        {'duration': 10,
         'nodes': [
             {'characters': ['brienne', 'sandor']}
         ],
        },
        // 34. Jaime V
        {'duration': 10,
         'nodes': [
             {'characters': ['jaime', 'ilyn', 'brynden']}
         ],
        },
        // 36. Samwell IV
        {'duration': 10,
         'nodes': [
             {'characters': ['aemon', 'sam'],
              'deaths': ['aemon']},
             // Establish togetherness
             {'characters': ['cersei', 'pycelle', 'loras', 'tommen', 'margaery', 'gregor']}
         ],
        },
        // 37. Cersei VIII
        {'duration': 10,
         'nodes': [
             {'characters': ['cersei', 'pycelle', 'tommen', 'margaery', 'gregor']},
             {'characters': ['loras']}
         ],
        },
        // 38. Brienne VII
        {'duration': 10,
         'nodes': [
             {'characters': ['brienne', 'gendry']}
         ],
        },
        // 41. The Princess in the Tower (Arianne)
        {'duration': 10,
         'nodes': [
             {'characters': ['arianne', 'myrcella', 'areo', 'doran']},
             // establish togetherness
             {'characters': ['sansa', 'petyr', 'robert_a']}
         ],
        },
        // 42. Alayne II (Sansa)
        {'duration': 10,
         'nodes': [
             {'characters': ['sansa', 'robert_a']},
             {'characters': ['petyr']}
         ],
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['sansa', 'petyr', 'robert_a']}
         ],
        },
        // 43. Brienne VIII
        {'duration': 10,
         'nodes': [
             {'characters': ['brienne', 'cat', 'gendry']},
             // establish togetherness before split
             {'characters': ['jaime', 'ilyn', 'brynden']}
         ],
        },
        // 46. Samwell V
        {'duration': 10,
         'nodes': [
             {'characters': ['alleras', 'jaqen', 'sam']},
             // Wrapping up
             {'characters': ['jaime', 'ilyn']},
             {'characters': ['brynden']},
             {'characters': ['brienne', 'cat', 'gendry']},
             {'characters': ['sansa', 'petyr', 'robert_a']},
             {'characters': ['arianne', 'myrcella', 'areo', 'doran']},
             {'characters': ['cersei', 'pycelle', 'tommen', 'margaery', 'gregor']},
             {'characters': ['loras']},
             {'characters': ['sandor']},
             {'characters': ['aeron']},
             {'characters': ['asha']},
             {'characters': ['victarion']},
             {'characters': ['euron']},
             {'characters': ['arya']},
             {'characters': ['jon', 'ghost', 'stannis', 'melisandre']},
         ],
        },
    ];

    if(window.asoiaf == undefined) {
        window.asoiaf = {};
    }
    window.asoiaf.layers = layers;
})(window);