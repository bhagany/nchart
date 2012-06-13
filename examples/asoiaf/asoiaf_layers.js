(function(window) {
    var layers = [
        // A Game of Thrones
        // 1. Prologue - Will I
        {'duration': 10,
         'nodes': [
             {'characters': ['will', 'waymar', 'gared']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {'characters': ['will', 'waymar', 'gared'],
              'event': 'Encounter with Others',
              'deaths': ['will'],
              'undeaths': ['waymar']
             },
             // Characters Intros
             {'characters': ['ned', 'robb', 'bran', 'jon', 'theon']},
             {'characters': ['grey wind', 'lady', 'nymeria', 'summer', 'shaggydog', 'ghost']},
         ],
        },
        // 2. Bran I
        {'duration': 10,
         'nodes': [
             {'characters': ['ned', 'robb', 'bran', 'jon', 'theon', 'gared',
                             'grey wind', 'lady', 'nymeria', 'summer', 'shaggydog', 'ghost'],
              'deaths': ['gared'],
              'event': 'Execution of Gared, finding of the wolves'
             },
             // Characters Intros
             {'characters': ['cat', 'sansa', 'arya', 'rickon']}
         ],
        },
        // 3. Catelyn I
        {'duration': 10,
         'nodes': [
             {'characters': ['ned', 'cat', 'robb', 'sansa', 'arya', 'bran', 'rickon', 'jon',
                             'theon', 'grey wind', 'lady', 'nymeria', 'summer',
                             'shaggydog', 'ghost']},
             // Characters Intros
             {'characters': ['daenerys', 'viserys', 'illyrio']},
             {'characters': ['jorah']},
             {'characters': ['drogo']}
         ]
        },
        // 4. Daenerys I
        {'duration': 10,
         'nodes': [
             {'characters': ['daenerys', 'viserys', 'illyrio', 'jorah', 'drogo'],
              'event': 'Daenerys sold to Drogo'
             },
             // Characters Intros
             {'characters': ['benjen']},
             {'characters': ['robert_b', 'cersei', 'jaime', 'tyrion', 'joffrey', 'myrcella', 'tommen',
                             'sandor']}
         ],
        },
        // 5. Eddard I
        {'duration': 60,
         'nodes': [
             {'characters': ['ned', 'cat', 'robb', 'sansa', 'arya', 'bran', 'rickon', 'jon',
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
             {'characters': ['ned', 'cat', 'robb', 'sansa', 'arya', 'bran', 'rickon', 'jon',
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
             {'characters': ['daenerys', 'viserys', 'illyrio', 'jorah', 'drogo'],
              'event': 'Drogo and Daenerys Married'
             }
         ],
        },
        // 15. Catelyn III
        {'duration': 10,
         'nodes': [
             {'characters': ['cat', 'robb', 'bran', 'rickon', 'theon', 'grey wind', 'summer', 'shaggydog'],
              'event': '"The things I do for love"'
             },
             // Character Intros
             {'characters': ['renly', 'barristan', 'ilyn']}
         ],
        },
        // 16-17. Sansa I, Eddard III
        {'duration': 20,
         'nodes': [
             {'characters': ['ned', 'sansa', 'arya', 'robert_b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                             'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'lady', 'nymeria'],
              'deaths': ['lady'],
              'event': 'Children Fight Near the Trident'
             },
             // Character Intros
             {'characters': ['petyr', 'varys', 'pycelle']}
         ],
        },
        // 19. Catelyn IV
        {'duration': 10,
         'nodes': [
             {'characters': ['cat', 'petyr', 'varys', 'pycelle']},
             // Character Intros
             {'characters': ['jeor', 'aemon']}
         ]
        },
        // 20. Jon III
        {'duration': 10,
         'nodes': [
             {'characters': ['benjen', 'jon', 'ghost', 'tyrion', 'jeor', 'aemon']},
         ]
        },
        // 21. Eddard IV
        {'duration': 10,
         'nodes': [
             {'characters': ['ned', 'sansa', 'arya', 'robert_b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                             'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'cat', 'petyr', 'varys',
                             'pycelle']}
         ]
        },
        // 25. Bran IV
        {'duration': 10,
         'nodes': [
             {'characters': ['robb', 'bran', 'rickon', 'theon', 'grey wind', 'summer', 'shaggydog', 'tyrion']},
             // Character Intro
             {'characters': ['sam']}
         ],
        },
        // 27. Jon IV
        {'duration': 10,
         'nodes': [
             {'characters': ['jon', 'ghost', 'jeor', 'aemon', 'sam']},
             // Character Intro
             {'characters': ['gendry']}
         ]
        },
        // 28. Eddard VI
        {'duration': 10,
         'nodes': [
             {'characters': ['ned', 'sansa', 'arya', 'robert_b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                             'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
                             'pycelle', 'gendry'],
              'event': 'Hand\'s Tourney'
             },
         ],
        },
        // 29. Catelyn V
        {'duration': 10,
         'nodes': [
             {'characters': ['cat', 'tyrion']},
             // Character Intros
             {'characters': ['gregor']},
             {'characters': ['beric']},
             {'characters': ['loras']}
         ],
        },
        // 30. Sansa II
        {'duration': 10,
         'nodes': [
             {'characters': ['ned', 'sansa', 'arya', 'robert_b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                             'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
                             'pycelle', 'gendry', 'gregor', 'beric', 'loras'],
              'event': 'Hand\'s Tourney'
             },
         ],
        },
        // 33. Arya III
        {'duration': 10,
         'nodes': [
             {'characters': ['ned', 'sansa', 'arya', 'robert_b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                             'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
                             'pycelle', 'gendry', 'beric', 'loras', 'illyrio']},
             // Character Intros
             {'characters': ['lysa', 'robert_a']},
             {'characters': ['brynden']}
         ],
        },
        // 35. Catelyn IV
        {'duration': 30,
         'nodes': [
             {'characters': ['cat', 'lysa', 'robert_a', 'brynden', 'tyrion']}
         ]
        },
        //*** 36. Eddard IX Jaime attacks Eddard?
        // 45. Sansa II
        {'duration': 10,
         'nodes': [
             {'characters': ['ned', 'sansa', 'arya', 'robert_b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                             'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
                             'pycelle', 'gendry', 'beric', 'loras'],
              'event': 'Beric sent out to bring justice to Gregor'}
         ]
        },
        // 47. Daenerys V
        {'duration': 10,
         'nodes': [
             {'characters': ['daenerys', 'viserys', 'jorah', 'drogo'],
              'deaths': ['viserys'],
              'event': 'Viserys Crowned'
             }
         ],
        },
        // 48, 50-52. Eddard XIII, Eddard XIV, Arya IV, Sansa IV
        {'duration': 40,
         'nodes': [
             {'characters': ['ned', 'sansa', 'arya', 'robert_b', 'cersei', 'joffrey', 'myrcella',
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
             {'characters': ['jon', 'ghost', 'jeor', 'aemon', 'sam'],
              'event': 'Wight Attack at Castle Black'
             }
         ],
        },
        // 54. Bran VI
        {'duration': 10,
         'nodes': [
             {'characters': ['robb', 'bran', 'rickon', 'theon', 'grey wind', 'summer', 'shaggydog'],
              'event': 'Robb calls his banners'
             }
         ],
        },
        // Ambush at Mummer's ford, related in ASOS 18 - Arya III
        {'duration': 10,
         'nodes': [
             {'characters': ['beric', 'gregor'],
              'undeaths': ['beric']}
         ]
        },
        // 56. Catelyn VIII
        {'duration': 10,
         'nodes': [
             {'characters': ['robb', 'grey wind', 'theon', 'cat', 'brynden']},
             // Character Intro
             {'characters': ['tywin']}
         ],
        },
        // 57. Tyrion VII
        {'duration': 10,
         'nodes': [
             {'characters': ['tyrion', 'tywin', 'gregor']}
         ],
        },
        // 58. Sansa V
        {'duration': 40,
         'nodes': [
             {'characters': ['ned', 'sansa', 'arya', 'cersei', 'joffrey', 'myrcella',
                             'tommen', 'sandor', 'barristan', 'ilyn', 'petyr', 'varys', 'pycelle',
                             'gendry']
             },
             // Character Intro
             {'characters': ['mirri']}
         ],
        },
        // 62. Daenerys VII
        {'duration': 10,
         'nodes': [
             {'characters': ['daenerys', 'jorah', 'drogo', 'mirri'],
              'event': 'Sack of the Lhazareen town'
             }
         ],
        },
        // 63. Tyrion VIII
        {'duration': 10,
         'nodes': [
             {'characters': ['tyrion', 'tywin', 'gregor'],
              'event': 'Battle of the Green Fork'
             }
         ],
        },
        // 64. Catelyn X
        {'duration': 10,
         'nodes': [
             {'characters': ['robb', 'grey wind', 'theon', 'cat', 'brynden', 'jaime'],
              'event': 'Battle of the Whispering Wood'
             }
         ],
        },
        // 65. Daenerys VIII
        {'duration': 10,
         'nodes': [
             {'characters': ['daenerys', 'jorah', 'drogo', 'mirri'],
              'event': 'Drogo falls off his horse, Dany goes into labor'
             }
         ],
        },
        // 66. Arya V
        {'duration': 10,
         'nodes': [
             {'characters': ['ned', 'sansa', 'arya', 'cersei', 'joffrey', 'myrcella',
                             'tommen', 'sandor', 'barristan', 'ilyn', 'petyr', 'varys', 'pycelle', 'gendry'],
              'deaths': ['ned'],
              'event': 'Ned beheaded at the Great Sept of Baelor'
             }
         ],
        },
        // 69. Daenerys IX
        {'duration': 10,
         'nodes': [
             {'characters': ['daenerys', 'jorah', 'drogo', 'mirri'],
              'deaths': ['drogo'],
              'event': 'The breaking of Drogo\'s khalasar'
             }
         ],
        },
        // 70, 72. Tyrion IX, Catelyn XI
        {'duration': 10,
         'nodes': [
             {'characters': ['robb', 'grey wind', 'theon', 'cat', 'brynden', 'jaime'],
              'event': 'Battle of the Camps; Robb proclaimed King in the North'
             }
         ],
        },
        // 73. Daenerys X
        {'duration': 10,
         'nodes': [
             {'characters': ['daenerys', 'jorah', 'mirri', 'drogon', 'rhaegal', 'viserion'],
              'deaths': ['mirri'],
              'event': 'Mother of Dragons'
             }
         ],
        },

        // A Clash of Kings
        // 1. Prologue - Cressen I
        {'duration': 10,
         'nodes': [
             {'characters': ['stannis', 'davos', 'melisandre']},
             {'characters': ['jaqen']}
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
        // 44. Jon V (Establish togetherness as Fist of First Men)
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

        // A Storm of Swords
        // 1. Prologue - Chett
        {'duration': 10,
         'nodes': [
             {'characters': ['jeor', 'sam'],
              'event': 'Wight attack at the Fist of First Men'
             },
             // Establish pre-escape togetherness
             {'characters': ['cat', 'brienne', 'jaime']},
         ],
        },
        // 2. Jaime I
        {'duration': 10,
         'nodes': [
             {'characters': ['jaime', 'brienne'],
              'event': 'Cat frees Jaime from Riverrun'
             }
         ]
        },
        // 5. Tyrion I
        {'duration': 10,
         'nodes': [
             {'characters': ['sansa', 'cersei', 'joffrey', 'ilyn', 'varys', 'pycelle', 'tyrion', 'loras', 'tywin', 'tommen'],
             }
         ],
        },
        // 6. Davos I
        {'duration': 10,
         'nodes': [
             {'characters': ['davos'],
              'event': 'Davos Rescued from Blackwater Bay'}
         ],
        },
        // 7. Sansa I
        {'duration': 10,
         'nodes': [
             {'characters': ['sansa', 'cersei', 'joffrey', 'ilyn', 'varys', 'pycelle', 'tyrion',
                             'loras', 'tywin', 'tommen', 'margaery'],
             }
         ],
        },
        // 11. Davos II
        {'duration': 10,
         'nodes': [
             {'characters': ['davos', 'stannis', 'melisandre']}
         ],
        },
        // 15. Catelyn II
        {'duration': 10,
         'nodes': [
             {'characters': ['cat', 'robb', 'grey wind', 'brynden']}
         ],
        },
        // 19. Samwell I
        {'duration': 10,
         'nodes': [
             {'characters': ['sam', 'jeor'],
              'event': 'Sam the Slayer'
             }
         ],
        },
        // 22. Jaime III
        {'duration': 10,
         'nodes': [
             {'characters': ['jaime', 'brienne'],
              'event': 'Jaime crippled'
             }
         ]
        },
        // 28. Daenerys III
        {'duration': 10,
         'nodes': [
             {'characters': ['daenerys', 'jorah', 'drogon', 'rhaegal', 'viserion', 'barristan'],
              'event': 'Daenerys conquers Astapor'}
         ],
        },
        // 29. Sansa III
        {'duration': 10,
         'nodes': [
             {'characters': ['sansa', 'cersei', 'joffrey', 'ilyn', 'varys', 'pycelle', 'tyrion',
                             'loras', 'tywin', 'tommen', 'margaery'],
              'event': 'Tyrion and Sansa married'
             }
         ],
        },
        // 30. Arya V
        {'duration': 10,
         'nodes': [
             {'characters': ['arya', 'gendry', 'sandor']},
         ],
        },
        // 31. Jon IV
        {'duration': 10,
         'nodes': [
             {'characters': ['jon', 'ghost'],
              'event': 'Over the Wall'
             }
         ],
        },
        // 34. Samwell II
        {'duration': 10,
         'nodes': [
             {'characters': ['sam', 'jeor'],
              'event': 'Mutiny at Craster\'s Keep',
              'deaths': ['jeor']
             }
         ],
        },
        // 35. Arya VI
        {'duration': 10,
         'nodes': [
             {'characters': ['arya', 'gendry', 'sandor', 'beric']},
         ],
        },
        // 41-42. Bran III, Jon V
        {'duration': 10,
         'nodes': [
             {'characters': ['jon', 'bran', 'summer', 'meera', 'jojen'],
              'event': 'Jon betrays the wildlings at Queenscrown'
             },
             {'characters': ['sandor']}
         ],
        },
        // 43. Daenerys IV
        {'duration': 10,
         'nodes': [
             {'characters': ['daenerys', 'jorah', 'drogon', 'rhaegal', 'viserion', 'barristan'],
              'event': 'Daenerys conquers Yunkai'}
         ],
        },
        // 44. Arya VIII
        {'duration': 10,
         'nodes': [
             {'characters': ['arya', 'gendry', 'sandor', 'beric']},
             {'characters': ['coldhands']}
         ],
        },
        // 47. Samwell III
        {'duration': 10,
         'nodes': [
             {'characters': ['sam', 'coldhands']}
         ],
        },
        // 49. Jon VI
        {'duration': 10,
         'nodes': [
             {'characters': ['jon', 'aemon']}
         ],
        },
        // 51-53. Arya X, Catelyn VII, Arya XI
        {'duration': 10,
         'nodes': [
             {'characters': ['arya', 'sandor', 'cat', 'robb', 'grey wind', 'brynden'],
              'deaths': ['cat', 'robb', 'grey wind'],
              'event': 'Red Wedding'},
         ],
        },
        // 56. Jon VII
        {'duration': 10,
         'nodes': [
             {'characters': ['jon', 'aemon'],
              'event': 'Styr the Magnar\'s attack on Castle Black'}
         ],
        },
        // 57. Bran IV
        {'duration': 10,
         'nodes': [
             {'characters': ['bran', 'summer', 'meera', 'jojen', 'sam', 'coldhands']}
         ],
        },
        // 61-62. Tyrion VIII, Sansa V
        {'duration': 10,
         'nodes': [
             {'characters': ['sansa', 'cersei', 'joffrey', 'ilyn', 'varys', 'pycelle', 'tyrion', 'loras', 'tywin',
                             'tommen', 'margaery', 'petyr'],
              'event': 'Joffrey and Margaery married, Joffrey poisoned, Sansa escapes',
              'deaths': ['joffrey']
             }
         ],
        },
        // 63. Jaime VII
        {'duration': 10,
         'nodes': [
             {'characters': ['cersei', 'ilyn', 'varys', 'pycelle', 'tyrion', 'loras', 'tywin', 'tommen',
                             'margaery', 'jaime', 'brienne'],
             }
         ],
        },
        // 65. Jon VIII
        {'duration': 10,
         'nodes': [
             {'characters': ['jon', 'aemon'],
              'event': 'Wildlings attack the Wall, Jon takes command of the Watch'}
         ],
        },
        // 66. Arya XII
        {'duration': 0,
         'nodes': [
             {'characters': ['arya', 'sandor']},
             {'characters': ['nymeria', 'cat', 'beric'],
              'event': 'Nymeria drags dead Catelyn out of the Trident, Beric revives her',
              'deaths': ['beric'],
              'undeaths': ['cat']},
             // Establish togetherness
             {'characters': ['lysa', 'robert_a']}
         ],
        },
        // 69. Sansa VI
        {'duration': 10,
         'nodes': [
             {'characters': ['sansa', 'petyr', 'lysa'],
              'event': 'Petyr and Lysa married',
             }
         ],
        },
        // 70. Jon IX
        {'duration': 10,
         'nodes': [
             {'characters': ['jon', 'aemon'],
              'event': 'Jon declared a traitor'}
         ],
        },
        // 71. Tyrion X
        {'duration': 10,
         'nodes': [
             {'characters': ['cersei', 'ilyn', 'varys', 'pycelle', 'tyrion', 'loras', 'tywin', 'tommen',
                             'margaery', 'jaime', 'brienne', 'gregor'],
              'event': 'Gregor kills Oberyn in Tyrion\'s trial by combat',
             }
         ],
        },
        // 72. Daenerys VI
        {'duration': 10,
         'nodes': [
             {'characters': ['daenerys', 'jorah', 'drogon', 'rhaegal', 'viserion', 'barristan'],
              'event': 'Daenerys conquers Meereen, banishes Jorah'}
         ],
        },
        // 73. Jaime IX
        {'duration': 10,
         'nodes': [
             {'characters': ['cersei', 'ilyn', 'varys', 'pycelle', 'tyrion', 'loras', 'tywin', 'tommen',
                             'margaery', 'jaime', 'brienne', 'gregor'],
              'event': 'Jaime sends Brienne on her mission to find Sansa',
             },
             // Establish togetherness at Eastwatch
             {'characters': ['davos', 'stannis', 'melisandre']}
         ],
        },
        // 74. Jon X
        {'duration': 10,
         'nodes': [
             {'characters': ['jon', 'aemon', 'stannis', 'melisandre'],
              'event': 'Stannis defeats the wildlings'}
         ],
        },
        // 75. Arya XII
        {'duration': 10,
         'nodes': [
             {'characters': ['arya', 'sandor'],
              'event': 'Arya leaves for Braavos'},
         ],
        },
        // 76. Samwell IV
        {'duration': 10,
         'nodes': [
             {'characters': ['jon', 'aemon', 'stannis', 'melisandre', 'sam']}
         ],
        },
        // 78. Tyrion XI
        {'duration': 10,
         'nodes': [
             {'characters': ['cersei', 'ilyn', 'varys', 'pycelle', 'tyrion', 'loras', 'tywin', 'tommen',
                             'margaery', 'jaime', 'gregor'],
              'event': 'Jaime breaks Tyrion out of prison; Tyrion kills Tywin and Shae',
              'deaths': ['tywin']
             },
         ],
        },
        // 80. Jon XII
        {'duration': 10,
         'nodes': [
             {'characters': ['jon', 'ghost', 'aemon', 'stannis', 'melisandre', 'sam'],
              'event': 'Jon elected Lord Commander of the Night\'s Watch'}
         ],
        },
        // 81. Sansa VII
        {'duration': 10,
         'nodes': [
             {'characters': ['sansa', 'petyr', 'lysa', 'robert_a'],
              'event': 'Petyr throws Lysa out the Moon Door',
              'deaths': ['lysa']
             }
         ],
        },
        // 82. Epilogue - Merrett Frey
        {'duration': 10,
         'nodes': [
             {'characters': ['cat']},
             // Wrap 'em all up
             {'characters': ['sansa', 'petyr', 'robert_a']},
             {'characters': ['jon', 'ghost', 'aemon', 'stannis', 'melisandre', 'sam']},
             {'characters': ['cersei', 'ilyn', 'pycelle', 'loras', 'tommen', 'margaery', 'jaime', 'gregor']},
             {'characters': ['myrcella']},
             {'characters': ['tyrion']},
             {'characters': ['varys']},
             {'characters': ['brienne']},
             {'characters': ['arya']},
             {'characters': ['sandor']},
             {'characters': ['davos']},
             {'characters': ['daenerys', 'drogon', 'rhaegal', 'viserion', 'barristan']},
             {'characters': ['jorah']},
             {'characters': ['nymeria']},
             {'characters': ['illyrio']},
             {'characters': ['bran', 'summer', 'meera', 'jojen', 'coldhands']},
             {'characters': ['rickon', 'shaggydog']},
             {'characters': ['brynden']},
             {'characters': ['gendry']},
             {'characters': ['asha']},
             {'characters': ['theon']},
             {'characters': ['victarion']},
             {'characters': ['aeron']},
         ],
        },
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