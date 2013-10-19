(function(window) {
    var layers = [
        // A Feast for Crows
        // 1. Prologue - Pate I
        {'duration': 10,
         'nodes': [
             {'subnodes': ['alleras', 'pate']},
             // Character Intros
             {'subnodes': ['jaqen']},
             {'subnodes': ['aeron']},
             {'subnodes': ['asha']},
             {'subnodes': ['victarion']},
             {'subnodes': ['myrcella']},
             {'subnodes': ['cersei', 'ilyn', 'pycelle', 'loras', 'tommen', 'margaery', 'jaime', 'gregor']},
             {'subnodes': ['brienne']},
             {'subnodes': ['jon', 'ghost', 'aemon', 'stannis', 'melisandre', 'sam']},
             {'subnodes': ['arya']},
             {'subnodes': ['sansa', 'petyr', 'robert_a']},
             {'subnodes': ['sandor']},
             {'subnodes': ['brynden']},
             {'subnodes': ['gendry']},
             {'subnodes': ['cat']},

         ],
        },
        {'duration': 10,
         'nodes': [
             {
                 'subnodes': ['pate', 'jaqen'],
                 'stateChanges': {
                     'pate': ['dead']
                 }
             },
             // Character intros
             {'subnodes': ['areo', 'doran', 'arianne', 'arys']}
         ],
        },
        // 3. The Captain of the Guards I (Areo)
        {'duration': 10,
         'nodes': [
             {'subnodes': ['areo', 'doran', 'arianne', 'myrcella', 'arys']}
         ],
        },
        // 16. Samwell II
        {'duration': 10,
         'nodes': [
             {'subnodes': ['jon', 'ghost', 'stannis', 'melisandre']},
             {'subnodes': ['aemon', 'sam']},
             // Character intro
             {'subnodes': ['euron']}
         ],
        },
        // 19. The Iron Captain I (Victarion)
        {'duration': 10,
         'nodes': [
             {'subnodes': ['aeron', 'asha', 'victarion', 'euron']}
         ],
        },
        // 22. The Queenmaker (Arianne)
        {'duration': 10,
         'nodes': [
             {'subnodes': ['arys', 'arianne', 'myrcella']},
             {'subnodes': ['doran', 'areo']}
         ],
        },
        {'duration': 10,
         'nodes': [
             {
                 'subnodes': ['arys', 'arianne', 'myrcella', 'areo'],
                 'stateChanges': {
                     'arys': ['dead']
                 }
             }
         ],
        },
        // 27. Samwell III
        {'duration': 10,
         'nodes': [
             {'subnodes': ['aemon', 'sam', 'arya']}
         ],
        },
        // 28. Jaime III
        {'duration': 10,
         'nodes': [
             {'subnodes': ['cersei', 'ilyn', 'pycelle', 'loras', 'tommen', 'margaery', 'jaime', 'gregor']}
         ],
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['jaime', 'ilyn']},
             {'subnodes': ['cersei', 'pycelle', 'loras', 'tommen', 'margaery', 'gregor']}
         ],
        },
        // 30. The Reaver (Victarion)
        {'duration': 10,
         'nodes': [
             {'subnodes': ['aeron', 'asha', 'victarion', 'euron']}
         ],
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['aeron', 'asha']},
             {'subnodes': ['victarion', 'euron']}
         ],
        },
        // 32. Brienne VI
        {'duration': 10,
         'nodes': [
             {'subnodes': ['brienne', 'sandor']}
         ],
        },
        // 34. Jaime V
        {'duration': 10,
         'nodes': [
             {'subnodes': ['jaime', 'ilyn', 'brynden']}
         ],
        },
        // 36. Samwell IV
        {'duration': 10,
         'nodes': [
             {
                 'subnodes': ['aemon', 'sam'],
                 'stateChanges': {
                     'aemon': ['dead']
                 }
             },
             // Establish togetherness
             {'subnodes': ['cersei', 'pycelle', 'loras', 'tommen', 'margaery', 'gregor']}
         ],
        },
        // 37. Cersei VIII
        {'duration': 10,
         'nodes': [
             {'subnodes': ['cersei', 'pycelle', 'tommen', 'margaery', 'gregor']},
             {'subnodes': ['loras']}
         ],
        },
        // 38. Brienne VII
        {'duration': 10,
         'nodes': [
             {'subnodes': ['brienne', 'gendry']}
         ],
        },
        // 41. The Princess in the Tower (Arianne)
        {'duration': 10,
         'nodes': [
             {'subnodes': ['arianne', 'myrcella', 'areo', 'doran']},
             // establish togetherness
             {'subnodes': ['sansa', 'petyr', 'robert_a']}
         ],
        },
        // 42. Alayne II (Sansa)
        {'duration': 10,
         'nodes': [
             {'subnodes': ['sansa', 'robert_a']},
             {'subnodes': ['petyr']}
         ],
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['sansa', 'petyr', 'robert_a']}
         ],
        },
        // 43. Brienne VIII
        {'duration': 10,
         'nodes': [
             {'subnodes': ['brienne', 'cat', 'gendry']},
             // establish togetherness before split
             {'subnodes': ['jaime', 'ilyn', 'brynden']}
         ],
        },
        // 46. Samwell V
        {'duration': 10,
         'nodes': [
             {'subnodes': ['alleras', 'jaqen', 'sam']},
             // Wrapping up
             {'subnodes': ['jaime', 'ilyn']},
             {'subnodes': ['brynden']},
             {'subnodes': ['brienne', 'cat', 'gendry']},
             {'subnodes': ['sansa', 'petyr', 'robert_a']},
             {'subnodes': ['arianne', 'myrcella', 'areo', 'doran']},
             {'subnodes': ['cersei', 'pycelle', 'tommen', 'margaery', 'gregor']},
             {'subnodes': ['loras']},
             {'subnodes': ['sandor']},
             {'subnodes': ['aeron']},
             {'subnodes': ['asha']},
             {'subnodes': ['victarion']},
             {'subnodes': ['euron']},
             {'subnodes': ['arya']},
             {'subnodes': ['jon', 'ghost', 'stannis', 'melisandre']},
         ],
        },
    ];

    if(window.asoiaf == undefined) {
        window.asoiaf = {};
    }
    window.asoiaf.layers = layers;
})(window);
