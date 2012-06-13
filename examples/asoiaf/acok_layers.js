(function(window) {
    var layers = [
        // A Clash of Kings
        // 1. Prologue - Cressen I
        {'duration': 10,
         'nodes': [
             {'characters': ['stannis', 'davos', 'melisandre']},
             {'characters': ['jaqen']},
             {'characters': ['daenerys', 'jorah', 'drogon', 'rhaegal', 'viserion']},
             {'characters': ['robb', 'grey wind', 'theon', 'cat', 'brynden', 'jaime']},
             {'characters': ['sansa', 'arya', 'cersei', 'joffrey', 'myrcella',
                             'tommen', 'sandor', 'barristan', 'ilyn', 'petyr', 'varys', 'pycelle', 'gendry']},
             {'characters': ['tyrion', 'tywin', 'gregor']},
             {'characters': ['jon', 'ghost', 'jeor', 'aemon', 'sam']},
             {'characters': ['loras', 'renly']},
             {'characters': ['bran', 'rickon', 'summer', 'shaggydog']},
         ],
        },
        // 2. Arya I
        {'duration': 10,
         'nodes': [
             {'characters': ['arya', 'gendry', 'jaqen']}
         ],
        },
        // 3. Sansa I
        {'duration': 10,
         'nodes': [
             {'characters': ['sansa', 'cersei', 'joffrey', 'myrcella', 'tommen', 'sandor',
                             'barristan', 'ilyn', 'petyr', 'varys', 'pycelle', 'tyrion']}
         ],
        },
        // 8. Catelyn I
        {'duration': 10,
         'nodes': [
             {'characters': ['robb', 'grey wind', 'theon', 'cat', 'brynden', 'jaime']},
             // Character Intros
             {'characters': ['asha', 'aeron', 'victarion']}
         ],
        },
        // 12. Theon I
        {'duration': 10,
         'nodes': [
             {'characters': ['asha', 'aeron', 'victarion', 'theon']},
             // Establish togetherness before ranging
             {'characters': ['jon', 'ghost', 'jeor', 'sam', 'aemon']}
         ],
        },
        // 14. Jon II
        {'duration': 10,
         'nodes': [
             {'characters': ['jon', 'ghost', 'jeor', 'sam']}
         ],
        },
        // 15. Arya IV
        {'duration': 10,
         'nodes': [
             {'characters': ['arya', 'gendry', 'jaqen']},
         ],
        },
        // 20. Arya V
        {'duration': 10,
         'nodes': [
             {'characters': ['arya', 'gendry', 'gregor']},
             // Character Intros
             {'characters': ['meera', 'jojen']},
             {'characters': ['margaery', 'brienne']},
         ],
        },
        // 22. Bran III
        {'duration': 10,
         'nodes': [
             {'characters': ['bran', 'rickon', 'summer', 'shaggydog', 'meera', 'jojen']},
             //*** Should determine this one better
             {'characters': ['renly', 'loras', 'margaery', 'brienne']},
         ],
        },
        // 23. Catelyn II
        {'duration': 10,
         'nodes': [
             {'characters': ['renly', 'loras', 'margaery', 'brienne', 'cat']},
         ],
        },
        // 27. Arya VI
        {'duration': 10,
         'nodes': [
             {'characters': ['arya', 'gendry', 'gregor', 'tywin', 'jaqen']},
         ],
        },
        // 34. Catelyn IV
        {'duration': 10,
         'nodes': [
             {'characters': ['cat', 'renly', 'loras', 'brienne', 'stannis', 'davos', 'melisandre'],
              'deaths': ['renly']
             },
         ],
        },
        // 37. Tyrion VIII (establish Petyr still in KL)
        {'duration': 10,
         'nodes': [
             {'characters': ['sansa', 'cersei', 'joffrey', 'myrcella', 'tommen', 'sandor',
                             'ilyn', 'petyr', 'varys', 'pycelle', 'tyrion']},
             // Establish Loras leaving
             {'characters': ['loras']},
         ],
        },
        // 39. Arya VIII (establish Tywin and Gregor still in Harrenhal)
        {'duration': 10,
         'nodes': [
             {'characters': ['arya', 'gendry', 'gregor', 'tywin', 'jaqen']},
         ],
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['gregor', 'tywin']},
         ],
        },
        // 40. Catelyn V
        {'duration': 10,
         'nodes': [
             {'characters': ['cat', 'brienne', 'jaime']},
         ],
        },
        // 42. Tyrion IX
        {'duration': 10,
         'nodes': [
             {'characters': ['sansa', 'cersei', 'joffrey', 'myrcella', 'tommen', 'sandor', 'ilyn',
                             'varys', 'pycelle', 'tyrion'],
              'event': 'King\'s Landing Riot'
             }
         ],
        },
        // 44. Jon V (Establish togetherness at Fist of First Men)
        {'duration': 10,
         'nodes': [
             {'characters': ['jon', 'ghost', 'jeor', 'sam']}
         ],
        },
        // 45. Tyrion X
        {'duration': 10,
         'nodes': [
             {'characters': ['tommen']}
         ]
        },
        // 47. Bran VI
        {'duration': 10,
         'nodes': [
             {'characters': ['bran', 'rickon', 'summer', 'shaggydog', 'meera', 'jojen', 'theon']},
         ],
        },
        // 48. Arya IX
        {'duration': 10,
         'nodes': [
             {'characters': ['arya', 'gendry', 'jaqen']},
         ],
        },
        // 49. Daenerys IV
        {'duration': 10,
         'nodes': [
             {'characters': ['daenerys', 'jorah', 'drogon', 'rhaegal', 'viserion'],
              'event': 'House of the Undying Burned'
             }
         ],
        },
        // 57. Theon V
        {'duration': 10,
         'nodes': [
             {'characters': ['theon', 'asha', 'bran', 'rickon', 'summer', 'shaggydog', 'meera', 'jojen']},
         ],
        },
        // 58-63.  Sansa V, Davos III, Tyrion XIII, Sansa VI, Tyrion XIV, Sansa VII
        {'duration': 10,
         'nodes': [
             {'characters': ['sansa', 'cersei', 'joffrey', 'sandor', 'ilyn', 'varys',
                             'pycelle', 'tyrion', 'stannis', 'davos', 'loras', 'tywin', 'petyr'],
              'event': 'Battle of the Blackwater'
             }
         ],
        },
        // 64. Daenerys V
        {'duration': 10,
         'nodes': [
             {'characters': ['daenerys', 'jorah', 'drogon', 'rhaegal', 'viserion', 'barristan']}
         ],
        },
        // 65. Arya X
        {'duration': 10,
         'nodes': [
             {'characters': ['arya', 'gendry'],
              'event': 'Escape from Harrenhal'
             },
             // I think Stannis reunites with Melisandre sometime around here
             {'characters': ['stannis', 'melisandre']}
         ],
        },
        // 67. Theon VI
        {'duration': 10,
         'nodes': [
             {'characters': ['theon', 'bran', 'rickon', 'summer', 'shaggydog', 'meera', 'jojen'],
              'event': 'Winterfell burned'
             },
         ],
        },
        // 69. Jon VIII
        {'duration': 10,
         'nodes': [
             {'characters': ['jon', 'ghost'],
              'event': 'Jon kills Qhorin Halfhand, goes over to the wildlings'
             }
         ],
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['jon', 'ghost']},
             {'characters': ['theon', 'bran', 'rickon', 'summer', 'shaggydog', 'meera', 'jojen']},
             {'characters': ['stannis', 'melisandre']},
             {'characters': ['arya', 'gendry']},
             {'characters': ['sansa', 'cersei', 'joffrey', 'sandor', 'ilyn', 'varys',
                             'pycelle', 'tyrion', 'loras', 'tywin', 'petyr']},
             {'characters': ['davos']},
             {'characters': ['daenerys', 'jorah', 'drogon', 'rhaegal', 'viserion', 'barristan']},
             {'characters': ['jaqen']},
             {'characters': ['margaery']},
             {'characters': ['gregor']},
             {'characters': ['robb', 'grey wind', 'brynden']},
             {'characters': ['cat']},
             {'characters': ['asha']},
             {'characters': ['victarion']},
             {'characters': ['aeron']},
             {'characters': ['brienne', 'jaime']},
             {'characters': ['jeor', 'sam']},
             {'characters': ['aemon']},
         ]
        }
    ];

    //*** Missed Robb leaving for the Westerlands, and Theon and Asha sailing for the North
    //*** Was Margaery at the Hand's Tourney?
    //*** When did Tommen return to KL after Battle of the Blackwater?
    //*** When is Petyr sent to the Vale?
    //*** Guess at all of Beric's deaths?

    if(window.asoiaf == undefined) {
        window.asoiaf = {};
    }
    window.asoiaf.layers = layers;
})(window);