(function(window) {
    var layers = [
        // A Feast for Crows
        // 1. Prologue - Pate I
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['alleras', 'pate']},
             // Character Intros
             {'sub_nodes': ['jaqen']},
             {'sub_nodes': ['aeron']},
             {'sub_nodes': ['asha']},
             {'sub_nodes': ['victarion']},
             {'sub_nodes': ['myrcella']},
             {'sub_nodes': ['cersei', 'ilyn', 'pycelle', 'loras', 'tommen', 'margaery', 'jaime', 'gregor']},
             {'sub_nodes': ['brienne']},
             {'sub_nodes': ['jon', 'ghost', 'aemon', 'stannis', 'melisandre', 'sam']},
             {'sub_nodes': ['arya']},
             {'sub_nodes': ['sansa', 'petyr', 'robert_a']},
             {'sub_nodes': ['sandor']},
             {'sub_nodes': ['brynden']},
             {'sub_nodes': ['gendry']},
             {'sub_nodes': ['cat']},

         ],
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['pate', 'jaqen'],
              'deaths': ['pate']
             },
             // Character intros
             {'sub_nodes': ['areo', 'doran', 'arianne', 'arys']}
         ],
        },
        // 3. The Captain of the Guards I (Areo)
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['areo', 'doran', 'arianne', 'myrcella', 'arys']}
         ],
        },
        // 16. Samwell II
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jon', 'ghost', 'stannis', 'melisandre']},
             {'sub_nodes': ['aemon', 'sam']},
             // Character intro
             {'sub_nodes': ['euron']}
         ],
        },
        // 19. The Iron Captain I (Victarion)
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['aeron', 'asha', 'victarion', 'euron']}
         ],
        },
        // 22. The Queenmaker (Arianne)
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['arys', 'arianne', 'myrcella']},
             {'sub_nodes': ['doran', 'areo']}
         ],
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['arys', 'arianne', 'myrcella', 'areo'],
              'deaths': ['arys']}
         ],
        },
        // 27. Samwell III
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['aemon', 'sam', 'arya']}
         ],
        },
        // 28. Jaime III
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['cersei', 'ilyn', 'pycelle', 'loras', 'tommen', 'margaery', 'jaime', 'gregor']}
         ],
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jaime', 'ilyn']},
             {'sub_nodes': ['cersei', 'pycelle', 'loras', 'tommen', 'margaery', 'gregor']}
         ],
        },
        // 30. The Reaver (Victarion)
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['aeron', 'asha', 'victarion', 'euron']}
         ],
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['aeron', 'asha']},
             {'sub_nodes': ['victarion', 'euron']}
         ],
        },
        // 32. Brienne VI
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['brienne', 'sandor']}
         ],
        },
        // 34. Jaime V
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jaime', 'ilyn', 'brynden']}
         ],
        },
        // 36. Samwell IV
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['aemon', 'sam'],
              'deaths': ['aemon']},
             // Establish togetherness
             {'sub_nodes': ['cersei', 'pycelle', 'loras', 'tommen', 'margaery', 'gregor']}
         ],
        },
        // 37. Cersei VIII
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['cersei', 'pycelle', 'tommen', 'margaery', 'gregor']},
             {'sub_nodes': ['loras']}
         ],
        },
        // 38. Brienne VII
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['brienne', 'gendry']}
         ],
        },
        // 41. The Princess in the Tower (Arianne)
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['arianne', 'myrcella', 'areo', 'doran']},
             // establish togetherness
             {'sub_nodes': ['sansa', 'petyr', 'robert_a']}
         ],
        },
        // 42. Alayne II (Sansa)
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['sansa', 'robert_a']},
             {'sub_nodes': ['petyr']}
         ],
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['sansa', 'petyr', 'robert_a']}
         ],
        },
        // 43. Brienne VIII
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['brienne', 'cat', 'gendry']},
             // establish togetherness before split
             {'sub_nodes': ['jaime', 'ilyn', 'brynden']}
         ],
        },
        // 46. Samwell V
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['alleras', 'jaqen', 'sam']},
             // Wrapping up
             {'sub_nodes': ['jaime', 'ilyn']},
             {'sub_nodes': ['brynden']},
             {'sub_nodes': ['brienne', 'cat', 'gendry']},
             {'sub_nodes': ['sansa', 'petyr', 'robert_a']},
             {'sub_nodes': ['arianne', 'myrcella', 'areo', 'doran']},
             {'sub_nodes': ['cersei', 'pycelle', 'tommen', 'margaery', 'gregor']},
             {'sub_nodes': ['loras']},
             {'sub_nodes': ['sandor']},
             {'sub_nodes': ['aeron']},
             {'sub_nodes': ['asha']},
             {'sub_nodes': ['victarion']},
             {'sub_nodes': ['euron']},
             {'sub_nodes': ['arya']},
             {'sub_nodes': ['jon', 'ghost', 'stannis', 'melisandre']},
         ],
        },
    ];

    if(window.asoiaf == undefined) {
        window.asoiaf = {};
    }
    window.asoiaf.layers = layers;
})(window);