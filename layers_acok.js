(function(window) {
    var layers = [
        // A Clash of Kings
        // 1. Prologue - Cressen I
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['stannis', 'davos', 'melisandre']},
             {'sub_nodes': ['jaqen']},
             {'sub_nodes': ['daenerys', 'jorah', 'drogon', 'rhaegal', 'viserion']},
             {'sub_nodes': ['robb', 'grey wind', 'theon', 'cat', 'brynden', 'jaime']},
             {'sub_nodes': ['sansa', 'arya', 'cersei', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'barristan', 'ilyn', 'petyr', 'varys', 'pycelle', 'gendry']},
             {'sub_nodes': ['tyrion', 'tywin', 'gregor']},
             {'sub_nodes': ['jon', 'ghost', 'jeor', 'aemon', 'sam']},
             {'sub_nodes': ['beric']},
             {'sub_nodes': ['loras', 'renly']},
             {'sub_nodes': ['bran', 'rickon', 'summer', 'shaggydog']},
         ],
        },
        // 2. Arya I
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['arya', 'gendry', 'jaqen']}
         ],
        },
        // 3. Sansa I
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['sansa', 'cersei', 'joffrey', 'myrcella', 'tommen', 'sandor',
                            'barristan', 'ilyn', 'petyr', 'varys', 'pycelle', 'tyrion']}
         ],
        },
        // 8. Catelyn I
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['robb', 'grey wind', 'theon', 'cat', 'brynden', 'jaime']},
             // Character Intros
             {'sub_nodes': ['asha', 'aeron', 'victarion']}
         ],
        },
        // 12. Theon I
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['asha', 'aeron', 'victarion', 'theon']},
             // Establish togetherness before ranging
             {'sub_nodes': ['jon', 'ghost', 'jeor', 'sam', 'aemon']}
         ],
        },
        // 14. Jon II
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jon', 'ghost', 'jeor', 'sam']}
         ],
        },
        // 15. Arya IV
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['arya', 'gendry', 'jaqen']},
         ],
        },
        // 20. Arya V
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['arya', 'gendry', 'gregor']},
             // Character Intros
             {'sub_nodes': ['meera', 'jojen']},
             {'sub_nodes': ['margaery', 'brienne']},
         ],
        },
        // 22. Bran III
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['bran', 'rickon', 'summer', 'shaggydog', 'meera', 'jojen']},
             //*** Should determine this one better
             {'sub_nodes': ['renly', 'loras', 'margaery', 'brienne']},
         ],
        },
        // 23. Catelyn II
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['renly', 'loras', 'margaery', 'brienne', 'cat']},
         ],
        },
        // 27. Arya VI
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['arya', 'gendry', 'gregor', 'tywin', 'jaqen']},
         ],
        },
        // 34. Catelyn IV
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['cat', 'renly', 'loras', 'brienne', 'stannis', 'davos', 'melisandre'],
              'deaths': ['renly']
             },
         ],
        },
        // 37. Tyrion VIII (establish Petyr still in KL)
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['sansa', 'cersei', 'joffrey', 'myrcella', 'tommen', 'sandor',
                            'ilyn', 'petyr', 'varys', 'pycelle', 'tyrion']},
             // Establish Loras leaving
             {'sub_nodes': ['loras']},
         ],
        },
        // 39. Arya VIII (establish Tywin and Gregor still in Harrenhal)
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['arya', 'gendry', 'gregor', 'tywin', 'jaqen']},
         ],
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['gregor', 'tywin']},
         ],
        },
        // 40. Catelyn V
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['cat', 'brienne', 'jaime']},
         ],
        },
        // 42. Tyrion IX
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['sansa', 'cersei', 'joffrey', 'myrcella', 'tommen', 'sandor', 'ilyn',
                            'varys', 'pycelle', 'tyrion'],
              'event': 'King\'s Landing Riot'
             }
         ],
        },
        // 44. Jon V (Establish togetherness as Fist of First Men)
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jon', 'ghost', 'jeor', 'sam']}
         ],
        },
        // 45. Tyrion X
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['tommen']}
         ]
        },
        // 47. Bran VI
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['bran', 'rickon', 'summer', 'shaggydog', 'meera', 'jojen', 'theon']},
         ],
        },
        // 48. Arya IX
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['arya', 'gendry', 'jaqen']},
         ],
        },
        // 49. Daenerys IV
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['daenerys', 'jorah', 'drogon', 'rhaegal', 'viserion'],
              'event': 'House of the Undying Burned'
             }
         ],
        },
        // 57. Theon V
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['theon', 'asha', 'bran', 'rickon', 'summer', 'shaggydog', 'meera', 'jojen']},
         ],
        },
        // 58-63.  Sansa V, Davos III, Tyrion XIII, Sansa VI, Tyrion XIV, Sansa VII
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['sansa', 'cersei', 'joffrey', 'sandor', 'ilyn', 'varys',
                            'pycelle', 'tyrion', 'stannis', 'davos', 'loras', 'tywin', 'petyr'],
              'event': 'Battle of the Blackwater'
             }
         ],
        },
        // 64. Daenerys V
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['daenerys', 'jorah', 'drogon', 'rhaegal', 'viserion', 'barristan']}
         ],
        },
        // 65. Arya X
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['arya', 'gendry'],
              'event': 'Escape from Harrenhal'
             },
             // I think Stannis reunites with Melisandre sometime around here
             {'sub_nodes': ['stannis', 'melisandre']}
         ],
        },
        // 67. Theon VI
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['theon', 'bran', 'rickon', 'summer', 'shaggydog', 'meera', 'jojen'],
              'event': 'Winterfell burned'
             },
         ],
        },
        // 69. Jon VIII
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jon', 'ghost'],
              'event': 'Jon kills Qhorin Halfhand, goes over to the wildlings'
             }
         ],
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jon', 'ghost']},
             {'sub_nodes': ['theon', 'bran', 'rickon', 'summer', 'shaggydog', 'meera', 'jojen']},
             {'sub_nodes': ['stannis', 'melisandre']},
             {'sub_nodes': ['arya', 'gendry']},
             {'sub_nodes': ['sansa', 'cersei', 'joffrey', 'sandor', 'ilyn', 'varys',
                            'pycelle', 'tyrion', 'loras', 'tywin', 'petyr']},
             {'sub_nodes': ['davos']},
             {'sub_nodes': ['daenerys', 'jorah', 'drogon', 'rhaegal', 'viserion', 'barristan']},
             {'sub_nodes': ['jaqen']},
             {'sub_nodes': ['margaery']},
             {'sub_nodes': ['gregor']},
             {'sub_nodes': ['robb', 'grey wind', 'brynden']},
             {'sub_nodes': ['cat']},
             {'sub_nodes': ['asha']},
             {'sub_nodes': ['victarion']},
             {'sub_nodes': ['aeron']},
             {'sub_nodes': ['brienne', 'jaime']},
             {'sub_nodes': ['jeor', 'sam']},
             {'sub_nodes': ['aemon']},
         ]
        }
    ];

    //*** Missed Robb leaving for the Westerlands, and Theon and Asha sailing for the North
    //*** Was Margaery at the Hand's Tourney?
    //*** When did Tommen return to KL after Battle of the Blackwater?
    //*** When is Petyr sent to the Vale?
    //*** Guess at all of Beric's deaths?

    window.asoiaf.layers = layers;
})(window);