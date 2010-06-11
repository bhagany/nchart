(function(window) {
    var layers = [
        // A Game of Thrones
        // 1. Prologue - Will I
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['will', 'waymar', 'gared']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['will', 'waymar', 'gared'],
              'event': 'Encounter with Others',
              'deaths': ['will'],
              'undeaths': ['waymar']
             },
             // Characters Intros
             {'sub_nodes': ['ned', 'robb', 'bran', 'jon', 'theon']},
             {'sub_nodes': ['grey wind', 'lady', 'nymeria', 'summer', 'shaggydog', 'ghost']},
         ],
        },
        // 2. Bran I
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'robb', 'bran', 'jon', 'theon', 'gared',
                            'grey wind', 'lady', 'nymeria', 'summer', 'shaggydog', 'ghost'],
              'deaths': ['gared'],
              'event': 'Execution of Gared, finding of the wolves'
             },
             // Characters Intros
             {'sub_nodes': ['cat', 'sansa', 'arya', 'rickon']}
         ],
        },
        // 3. Catelyn I
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'cat', 'robb', 'sansa', 'arya', 'bran', 'rickon', 'jon',
                            'theon', 'grey wind', 'lady', 'nymeria', 'summer',
                            'shaggydog', 'ghost']},
             // Characters Intros
             {'sub_nodes': ['daenerys', 'viserys', 'illyrio']},
             {'sub_nodes': ['jorah']},
             {'sub_nodes': ['drogo']}
         ]
        },
        // 4. Daenerys I
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['daenerys', 'viserys', 'illyrio', 'jorah', 'drogo'],
              'event': 'Daenerys sold to Drogo'
             },
             // Characters Intros
             {'sub_nodes': ['benjen']},
             {'sub_nodes': ['robert_b', 'cersei', 'jaime', 'tyrion', 'joffrey', 'myrcella', 'tommen',
                            'sandor']}
         ],
        },
        // 5. Eddard I
        {'duration': 60,
         'nodes': [
             {'sub_nodes': ['ned', 'cat', 'robb', 'sansa', 'arya', 'bran', 'rickon', 'jon',
                            'theon', 'grey wind', 'lady', 'nymeria', 'summer',
                            'shaggydog', 'ghost', 'benjen', 'robert_b', 'cersei',
                            'jaime', 'tyrion', 'joffrey', 'myrcella', 'tommen', 'sandor'],
              'event': 'Robert visits Winterfell'
             },
         ],
        },
        // 9. Bran II
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'cat', 'robb', 'sansa', 'arya', 'bran', 'rickon', 'jon',
                            'theon', 'grey wind', 'lady', 'nymeria', 'summer',
                            'shaggydog', 'ghost', 'benjen', 'robert_b', 'cersei',
                            'jaime', 'tyrion', 'joffrey', 'myrcella', 'tommen', 'sandor'],
              'event': 'Bran falls'
             },
         ],
        },
        // 12. Daenerys II
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['daenerys', 'viserys', 'illyrio', 'jorah', 'drogo'],
              'event': 'Drogo and Daenerys Married'
             }
         ],
        },
        // 15. Catelyn III
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['cat', 'robb', 'bran', 'rickon', 'theon', 'grey wind', 'summer', 'shaggydog'],
              'event': '"The things I do for love"'
             },
             // Character Intros
             {'sub_nodes': ['renly', 'barristan', 'ilyn']}
         ],
        },
        // 16-17. Sansa I, Eddard III
        {'duration': 20,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert_b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'lady', 'nymeria'],
              'deaths': ['lady'],
              'event': 'Children Fight Near the Trident'
             },
             // Character Intros
             {'sub_nodes': ['petyr', 'varys', 'pycelle']}
         ],
        },
        // 19. Catelyn IV
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['cat', 'petyr', 'varys', 'pycelle']},
             // Character Intros
             {'sub_nodes': ['jeor', 'aemon']}
         ]
        },
        // 20. Jon III
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['benjen', 'jon', 'ghost', 'tyrion', 'jeor', 'aemon']},
         ]
        },
        // 21. Eddard IV
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert_b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'cat', 'petyr', 'varys',
                            'pycelle']},
             {'sub_nodes': ['benjen'],
              'disappearances': ['benjen']}
         ],
        },
        // 25. Bran IV
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['robb', 'bran', 'rickon', 'theon', 'grey wind', 'summer', 'shaggydog', 'tyrion']},
             // Character Intro
             {'sub_nodes': ['sam']}
         ],
        },
        // 27. Jon IV
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jon', 'ghost', 'jeor', 'aemon', 'sam']},
             // Character Intro
             {'sub_nodes': ['benjen'],
              'reappearances': ['benjen']},
             {'sub_nodes': ['gendry']}
         ],
        },
        // 28. Eddard VI
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert_b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
                            'pycelle', 'gendry'],
              'event': 'Hand\'s Tourney'
             },
             {'sub_nodes': ['benjen']},
         ],
        },
        // 29. Catelyn V
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['cat', 'tyrion']},
             // Character Intros
             {'sub_nodes': ['gregor']},
             {'sub_nodes': ['beric']},
             {'sub_nodes': ['loras']}
         ],
        },
        // 30. Sansa II
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert_b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
                            'pycelle', 'gendry', 'gregor', 'beric', 'loras'],
              'event': 'Hand\'s Tourney'
             },
         ],
        },
        // 33. Arya III
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert_b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
                            'pycelle', 'gendry', 'beric', 'loras', 'illyrio']},
             // Character Intros
             {'sub_nodes': ['lysa', 'robert_a']},
             {'sub_nodes': ['brynden']}
         ],
        },
        // 35. Catelyn IV
        {'duration': 30,
         'nodes': [
             {'sub_nodes': ['cat', 'lysa', 'robert_a', 'brynden', 'tyrion']}
         ]
        },
        //*** 36. Eddard IX Jaime attacks Eddard?
        // 45. Sansa II
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert_b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
                            'pycelle', 'gendry', 'beric', 'loras'],
              'event': 'Beric sent out to bring justice to Gregor'}
         ]
        },
        // 47. Daenerys V
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['daenerys', 'viserys', 'jorah', 'drogo'],
              'deaths': ['viserys'],
              'event': 'Viserys Crowned'
             }
         ],
        },
        // 48, 50-52. Eddard XIII, Eddard XIV, Arya IV, Sansa IV
        {'duration': 40,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert_b', 'cersei', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'barristan', 'ilyn', 'petyr', 'varys', 'pycelle',
                            'gendry', 'renly', 'loras'],
              'deaths': ['robert_b'],
              'event': 'King Robert gored and killed, Starks betrayed'
             }
         ],
        },
        // 53. Jon VII
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jon', 'ghost', 'jeor', 'aemon', 'sam'],
              'event': 'Wight Attack at Castle Black'
             }
         ],
        },
        // 54. Bran VI
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['robb', 'bran', 'rickon', 'theon', 'grey wind', 'summer', 'shaggydog'],
              'event': 'Robb calls his banners'
             }
         ],
        },
        // Ambush at Mummer's ford, related in ASOS 18 - Arya III
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['beric', 'gregor'],
              'undeaths': ['beric']}
         ]
        },
        // 56. Catelyn VIII
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['robb', 'grey wind', 'theon', 'cat', 'brynden']},
             // Character Intro
             {'sub_nodes': ['tywin']}
         ],
        },
        // 57. Tyrion VII
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['tyrion', 'tywin', 'gregor']}
         ],
        },
        // 58. Sansa V
        {'duration': 40,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'cersei', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'barristan', 'ilyn', 'petyr', 'varys', 'pycelle',
                            'gendry']
             },
             // Character Intro
             {'sub_nodes': ['mirri']}
         ],
        },
        // 62. Daenerys VII
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['daenerys', 'jorah', 'drogo', 'mirri'],
              'event': 'Sack of the Lhazareen town'
             }
         ],
        },
        // 63. Tyrion VIII
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['tyrion', 'tywin', 'gregor'],
              'event': 'Battle of the Green Fork'
             }
         ],
        },
        // 64. Catelyn X
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['robb', 'grey wind', 'theon', 'cat', 'brynden', 'jaime'],
              'event': 'Battle of the Whispering Wood'
             }
         ],
        },
        // 65. Daenerys VIII
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['daenerys', 'jorah', 'drogo', 'mirri'],
              'event': 'Drogo falls off his horse, Dany goes into labor'
             }
         ],
        },
        // 66. Arya V
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'cersei', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'barristan', 'ilyn', 'petyr', 'varys', 'pycelle', 'gendry'],
              'deaths': ['ned'],
              'event': 'Ned beheaded at the Great Sept of Baelor'
             }
         ],
        },
        // 69. Daenerys IX
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['daenerys', 'jorah', 'drogo', 'mirri'],
              'deaths': ['drogo'],
              'event': 'The breaking of Drogo\'s khalasar'
             }
         ],
        },
        // 70, 72. Tyrion IX, Catelyn XI
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['robb', 'grey wind', 'theon', 'cat', 'brynden', 'jaime'],
              'event': 'Battle of the Camps; Robb proclaimed King in the North'
             }
         ],
        },
        // 73. Daenerys X
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['daenerys', 'jorah', 'mirri', 'drogon', 'rhaegal', 'viserion'],
              'deaths': ['mirri'],
              'event': 'Mother of Dragons'
             }
         ],
        },
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['daenerys', 'jorah', 'drogon', 'rhaegal', 'viserion']},
             {'sub_nodes': ['robb', 'grey wind', 'theon', 'cat', 'brynden', 'jaime']},
             {'sub_nodes': ['sansa', 'arya', 'cersei', 'joffrey', 'myrcella', 'tommen', 'sandor',
                            'barristan', 'ilyn', 'petyr', 'varys', 'pycelle', 'gendry']},
             {'sub_nodes': ['tyrion', 'tywin', 'gregor']},
             {'sub_nodes': ['jon', 'ghost', 'jeor', 'aemon', 'sam']},
             {'sub_nodes': ['illyrio']},
             {'sub_nodes': ['beric']},
             {'sub_nodes': ['nymeria']},
             {'sub_nodes': ['loras', 'renly']},
             {'sub_nodes': ['bran', 'rickon', 'summer', 'shaggydog']},
             {'sub_nodes': ['lysa', 'robert_a']},
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