(function(window) {
    var layers = [
        // A Game of Thrones
        // 1. Prologue - Will I
        {'duration': 10,
         'nodes': [
             {'subnodes': ['will', 'waymar', 'gared']}
         ]
        },
        {'duration': 10,
         'nodes': [
             {
                 'subnodes': ['will', 'waymar', 'gared'],
                 'event': 'Encounter with Others',
                 'stateChanges': {
                     'will': ['dead'],
                     'waymar': ['undead']
                 }
             },
             // Characters Intros
             {'subnodes': ['ned', 'robb', 'bran', 'jon', 'theon']},
             {'subnodes': ['grey wind', 'lady', 'nymeria', 'summer', 'shaggydog', 'ghost']},
         ],
        },
        // 2. Bran I
        {'duration': 10,
         'nodes': [
             {
                 'subnodes': ['ned', 'robb', 'bran', 'jon', 'theon', 'gared',
                              'grey wind', 'lady', 'nymeria', 'summer', 'shaggydog', 'ghost'],
                 'stateChanges': {
                     'gared': ['dead']
                 },
                 'event': 'Execution of Gared, finding of the wolves'
             },
             // Characters Intros
             {'subnodes': ['cat', 'sansa', 'arya', 'rickon']}
         ],
        },
        // 3. Catelyn I
        {'duration': 10,
         'nodes': [
             {'subnodes': ['ned', 'cat', 'robb', 'sansa', 'arya', 'bran', 'rickon', 'jon',
                           'theon', 'grey wind', 'lady', 'nymeria', 'summer',
                           'shaggydog', 'ghost']},
             // Characters Intros
             {'subnodes': ['daenerys', 'viserys', 'illyrio']},
             {'subnodes': ['jorah']},
             {'subnodes': ['drogo']}
         ]
        },
        // 4. Daenerys I
        {'duration': 10,
         'nodes': [
             {'subnodes': ['daenerys', 'viserys', 'illyrio', 'jorah', 'drogo'],
              'event': 'Daenerys sold to Drogo'
             },
             // Characters Intros
             {'subnodes': ['benjen']},
             {'subnodes': ['robert_b', 'cersei', 'jaime', 'tyrion', 'joffrey', 'myrcella', 'tommen',
                           'sandor']}
         ],
        },
        // 5. Eddard I
        {'duration': 60,
         'nodes': [
             {'subnodes': ['ned', 'cat', 'robb', 'sansa', 'arya', 'bran', 'rickon', 'jon',
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
             {'subnodes': ['ned', 'cat', 'robb', 'sansa', 'arya', 'bran', 'rickon', 'jon',
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
             {'subnodes': ['daenerys', 'viserys', 'illyrio', 'jorah', 'drogo'],
              'event': 'Drogo and Daenerys Married'
             }
         ],
        },
        // 15. Catelyn III
        {'duration': 10,
         'nodes': [
             {'subnodes': ['cat', 'robb', 'bran', 'rickon', 'theon', 'grey wind', 'summer', 'shaggydog'],
              'event': '"The things I do for love"'
             },
             // Character Intros
             {'subnodes': ['renly', 'barristan', 'ilyn']}
         ],
        },
        // 16-17. Sansa I, Eddard III
        {'duration': 20,
         'nodes': [
             {
                 'subnodes': ['ned', 'sansa', 'arya', 'robert_b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                              'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'lady', 'nymeria'],
                 'stateChanges': {
                     'lady': ['dead']
                 },
                 'event': 'Children Fight Near the Trident'
             },
             // Character Intros
             {'subnodes': ['petyr', 'varys', 'pycelle']}
         ],
        },
        // 19. Catelyn IV
        {'duration': 10,
         'nodes': [
             {'subnodes': ['cat', 'petyr', 'varys', 'pycelle']},
             // Character Intros
             {'subnodes': ['jeor', 'aemon']}
         ]
        },
        // 20. Jon III
        {'duration': 10,
         'nodes': [
             {'subnodes': ['benjen', 'jon', 'ghost', 'tyrion', 'jeor', 'aemon']},
         ]
        },
        // 21. Eddard IV
        {'duration': 10,
         'nodes': [
             {'subnodes': ['ned', 'sansa', 'arya', 'robert_b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                           'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'cat', 'petyr', 'varys',
                           'pycelle']},
             {
                 'subnodes': ['benjen'],
                 'stateChanges': {
                     'drogo': ['disappeared']
                 }
             }
         ]
        },
        // 25. Bran IV
        {'duration': 10,
         'nodes': [
             {'subnodes': ['robb', 'bran', 'rickon', 'theon', 'grey wind', 'summer', 'shaggydog', 'tyrion']},
             // Character Intro
             {'subnodes': ['sam']}
         ],
        },
        // 27. Jon IV
        {'duration': 10,
         'nodes': [
             {'subnodes': ['jon', 'ghost', 'jeor', 'aemon', 'sam']},
             // Character Intro
             {'subnodes': ['gendry']}
         ]
        },
        // 28. Eddard VI
        {'duration': 10,
         'nodes': [
             {'subnodes': ['ned', 'sansa', 'arya', 'robert_b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                           'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
                           'pycelle', 'gendry'],
              'event': 'Hand\'s Tourney'
             },
         ],
        },
        // 29. Catelyn V
        {'duration': 10,
         'nodes': [
             {'subnodes': ['cat', 'tyrion']},
             // Character Intros
             {'subnodes': ['gregor']},
             {'subnodes': ['beric']},
             {'subnodes': ['loras']}
         ],
        },
        // 30. Sansa II
        {'duration': 10,
         'nodes': [
             {'subnodes': ['ned', 'sansa', 'arya', 'robert_b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                           'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
                           'pycelle', 'gendry', 'gregor', 'beric', 'loras'],
              'event': 'Hand\'s Tourney'
             },
         ],
        },
        // 33. Arya III
        {'duration': 10,
         'nodes': [
             {'subnodes': ['ned', 'sansa', 'arya', 'robert_b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                           'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
                           'pycelle', 'gendry', 'beric', 'loras', 'illyrio']},
             // Character Intros
             {'subnodes': ['lysa', 'robert_a']},
             {'subnodes': ['brynden']}
         ],
        },
        // 35. Catelyn IV
        {'duration': 30,
         'nodes': [
             {'subnodes': ['cat', 'lysa', 'robert_a', 'brynden', 'tyrion']}
         ]
        },
        //*** 36. Eddard IX Jaime attacks Eddard?
        // 45. Sansa II
        {'duration': 10,
         'nodes': [
             {'subnodes': ['ned', 'sansa', 'arya', 'robert_b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                           'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
                           'pycelle', 'gendry', 'beric', 'loras'],
              'event': 'Beric sent out to bring justice to Gregor'}
         ]
        },
        // 47. Daenerys V
        {'duration': 10,
         'nodes': [
             {
                 'subnodes': ['daenerys', 'viserys', 'jorah', 'drogo'],
                 'stateChanges': {
                     'viserys': ['dead']
                 },
                 'event': 'Viserys Crowned'
             }
         ],
        },
        // 48, 50-52. Eddard XIII, Eddard XIV, Arya IV, Sansa IV
        {'duration': 40,
         'nodes': [
             {
                 'subnodes': ['ned', 'sansa', 'arya', 'robert_b', 'cersei', 'joffrey', 'myrcella',
                              'tommen', 'sandor', 'barristan', 'ilyn', 'petyr', 'varys', 'pycelle',
                              'gendry', 'renly', 'loras'],
                 'stateChanges': {
                     'robert_b': ['dead']
                 },
                 'event': 'King Robert gored and killed, Starks betrayed'
             }
         ],
        },
        // 53. Jon VII
        {'duration': 10,
         'nodes': [
             {'subnodes': ['jon', 'ghost', 'jeor', 'aemon', 'sam'],
              'event': 'Wight Attack at Castle Black'
             }
         ],
        },
        // 54. Bran VI
        {'duration': 10,
         'nodes': [
             {'subnodes': ['robb', 'bran', 'rickon', 'theon', 'grey wind', 'summer', 'shaggydog'],
              'event': 'Robb calls his banners'
             }
         ],
        },
        // Ambush at Mummer's ford, related in ASOS 18 - Arya III
        {'duration': 10,
         'nodes': [
             {
                 'subnodes': ['beric', 'gregor'],
                 'stateChanges': {
                     'beric': ['undead']
                 }
             }
         ]
        },
        // 56. Catelyn VIII
        {'duration': 10,
         'nodes': [
             {'subnodes': ['robb', 'grey wind', 'theon', 'cat', 'brynden']},
             // Character Intro
             {'subnodes': ['tywin']}
         ],
        },
        // 57. Tyrion VII
        {'duration': 10,
         'nodes': [
             {'subnodes': ['tyrion', 'tywin', 'gregor']}
         ],
        },
        // 58. Sansa V
        {'duration': 40,
         'nodes': [
             {'subnodes': ['ned', 'sansa', 'arya', 'cersei', 'joffrey', 'myrcella',
                           'tommen', 'sandor', 'barristan', 'ilyn', 'petyr', 'varys', 'pycelle',
                           'gendry']
             },
             // Character Intro
             {'subnodes': ['mirri']}
         ],
        },
        // 62. Daenerys VII
        {'duration': 10,
         'nodes': [
             {'subnodes': ['daenerys', 'jorah', 'drogo', 'mirri'],
              'event': 'Sack of the Lhazareen town'
             }
         ],
        },
        // 63. Tyrion VIII
        {'duration': 10,
         'nodes': [
             {'subnodes': ['tyrion', 'tywin', 'gregor'],
              'event': 'Battle of the Green Fork'
             }
         ],
        },
        // 64. Catelyn X
        {'duration': 10,
         'nodes': [
             {'subnodes': ['robb', 'grey wind', 'theon', 'cat', 'brynden', 'jaime'],
              'event': 'Battle of the Whispering Wood'
             }
         ],
        },
        // 65. Daenerys VIII
        {'duration': 10,
         'nodes': [
             {'subnodes': ['daenerys', 'jorah', 'drogo', 'mirri'],
              'event': 'Drogo falls off his horse, Dany goes into labor'
             }
         ],
        },
        // 66. Arya V
        {'duration': 10,
         'nodes': [
             {
                 'subnodes': ['ned', 'sansa', 'arya', 'cersei', 'joffrey', 'myrcella',
                              'tommen', 'sandor', 'barristan', 'ilyn', 'petyr', 'varys', 'pycelle', 'gendry'],
                 'stateChanges': {
                     'ned': ['dead']
                 },
                 'event': 'Ned beheaded at the Great Sept of Baelor'
             }
         ],
        },
        // 69. Daenerys IX
        {'duration': 10,
         'nodes': [
             {
                 'subnodes': ['daenerys', 'jorah', 'drogo', 'mirri'],
                 'stateChanges': {
                     'drogo': ['dead']
                 },
                 'event': 'The breaking of Drogo\'s khalasar'
             }
         ],
        },
        // 70, 72. Tyrion IX, Catelyn XI
        {'duration': 10,
         'nodes': [
             {'subnodes': ['robb', 'grey wind', 'theon', 'cat', 'brynden', 'jaime'],
              'event': 'Battle of the Camps; Robb proclaimed King in the North'
             }
         ],
        },
        // 73. Daenerys X
        {'duration': 10,
         'nodes': [
             {
                 'subnodes': ['daenerys', 'jorah', 'mirri', 'drogon', 'rhaegal', 'viserion'],
                 'stateChanges': {
                     'mirri': ['dead']
                 },
                 'event': 'Mother of Dragons'
             }
         ],
        },

        // A Clash of Kings
        // 1. Prologue - Cressen I
        {'duration': 10,
         'nodes': [
             {'subnodes': ['stannis', 'davos', 'melisandre']},
             {'subnodes': ['jaqen']}
         ],
        },
        // 2. Arya I
        {'duration': 10,
         'nodes': [
             {'subnodes': ['arya', 'gendry', 'jaqen']}
         ],
        },
        // 3. Sansa I
        {'duration': 10,
         'nodes': [
             {'subnodes': ['sansa', 'cersei', 'joffrey', 'myrcella', 'tommen', 'sandor',
                           'barristan', 'ilyn', 'petyr', 'varys', 'pycelle', 'tyrion']}
         ],
        },
        // 8. Catelyn I
        {'duration': 10,
         'nodes': [
             {'subnodes': ['robb', 'grey wind', 'theon', 'cat', 'brynden', 'jaime']},
             // Character Intros
             {'subnodes': ['asha', 'aeron', 'victarion']}
         ],
        },
        // 12. Theon I
        {'duration': 10,
         'nodes': [
             {'subnodes': ['asha', 'aeron', 'victarion', 'theon']},
             // Establish togetherness before ranging
             {'subnodes': ['jon', 'ghost', 'jeor', 'sam', 'aemon']}
         ],
        },
        // 14. Jon II
        {'duration': 10,
         'nodes': [
             {'subnodes': ['jon', 'ghost', 'jeor', 'sam']}
         ],
        },
        // 15. Arya IV
        {'duration': 10,
         'nodes': [
             {'subnodes': ['arya', 'gendry', 'jaqen']},
         ],
        },
        // 20. Arya V
        {'duration': 10,
         'nodes': [
             {'subnodes': ['arya', 'gendry', 'gregor']},
             // Character Intros
             {'subnodes': ['meera', 'jojen']},
             {'subnodes': ['margaery', 'brienne']},
         ],
        },
        // 22. Bran III
        {'duration': 10,
         'nodes': [
             {'subnodes': ['bran', 'rickon', 'summer', 'shaggydog', 'meera', 'jojen']},
             //*** Should determine this one better
             {'subnodes': ['renly', 'loras', 'margaery', 'brienne']},
         ],
        },
        // 23. Catelyn II
        {'duration': 10,
         'nodes': [
             {'subnodes': ['renly', 'loras', 'margaery', 'brienne', 'cat']},
         ],
        },
        // 27. Arya VI
        {'duration': 10,
         'nodes': [
             {'subnodes': ['arya', 'gendry', 'gregor', 'tywin', 'jaqen']},
         ],
        },
        // 34. Catelyn IV
        {'duration': 10,
         'nodes': [
             {
                 'subnodes': ['cat', 'renly', 'loras', 'brienne', 'stannis', 'davos', 'melisandre'],
                 'stateChanges': {
                     'renly': ['dead']
                 }
             }
         ],
        },
        // 37. Tyrion VIII (establish Petyr still in KL)
        {'duration': 10,
         'nodes': [
             {'subnodes': ['sansa', 'cersei', 'joffrey', 'myrcella', 'tommen', 'sandor',
                           'ilyn', 'petyr', 'varys', 'pycelle', 'tyrion']},
             // Establish Loras leaving
             {'subnodes': ['loras']},
         ],
        },
        // 39. Arya VIII (establish Tywin and Gregor still in Harrenhal)
        {'duration': 10,
         'nodes': [
             {'subnodes': ['arya', 'gendry', 'gregor', 'tywin', 'jaqen']},
         ],
        },
        {'duration': 10,
         'nodes': [
             {'subnodes': ['gregor', 'tywin']},
         ],
        },
        // 40. Catelyn V
        {'duration': 10,
         'nodes': [
             {'subnodes': ['cat', 'brienne', 'jaime']},
         ],
        },
        // 42. Tyrion IX
        {'duration': 10,
         'nodes': [
             {'subnodes': ['sansa', 'cersei', 'joffrey', 'myrcella', 'tommen', 'sandor', 'ilyn',
                           'varys', 'pycelle', 'tyrion'],
              'event': 'King\'s Landing Riot'
             }
         ],
        },
        // 44. Jon V (Establish togetherness as Fist of First Men)
        {'duration': 10,
         'nodes': [
             {'subnodes': ['jon', 'ghost', 'jeor', 'sam']}
         ],
        },
        // 45. Tyrion X
        {'duration': 10,
         'nodes': [
             {'subnodes': ['tommen']}
         ]
        },
        // 47. Bran VI
        {'duration': 10,
         'nodes': [
             {'subnodes': ['bran', 'rickon', 'summer', 'shaggydog', 'meera', 'jojen', 'theon']},
         ],
        },
        // 48. Arya IX
        {'duration': 10,
         'nodes': [
             {'subnodes': ['arya', 'gendry', 'jaqen']},
         ],
        },
        // 49. Daenerys IV
        {'duration': 10,
         'nodes': [
             {'subnodes': ['daenerys', 'jorah', 'drogon', 'rhaegal', 'viserion'],
              'event': 'House of the Undying Burned'
             }
         ],
        },
        // 57. Theon V
        {'duration': 10,
         'nodes': [
             {'subnodes': ['theon', 'asha', 'bran', 'rickon', 'summer', 'shaggydog', 'meera', 'jojen']},
         ],
        },
        // 58-63.  Sansa V, Davos III, Tyrion XIII, Sansa VI, Tyrion XIV, Sansa VII
        {'duration': 10,
         'nodes': [
             {'subnodes': ['sansa', 'cersei', 'joffrey', 'sandor', 'ilyn', 'varys',
                           'pycelle', 'tyrion', 'stannis', 'davos', 'loras', 'tywin', 'petyr'],
              'event': 'Battle of the Blackwater'
             }
         ],
        },
        // 64. Daenerys V
        {'duration': 10,
         'nodes': [
             {'subnodes': ['daenerys', 'jorah', 'drogon', 'rhaegal', 'viserion', 'barristan']}
         ],
        },
        // 65. Arya X
        {'duration': 10,
         'nodes': [
             {'subnodes': ['arya', 'gendry'],
              'event': 'Escape from Harrenhal'
             },
             // I think Stannis reunites with Melisandre sometime around here
             {'subnodes': ['stannis', 'melisandre']}
         ],
        },
        // 67. Theon VI
        {'duration': 10,
         'nodes': [
             {'subnodes': ['theon', 'bran', 'rickon', 'summer', 'shaggydog', 'meera', 'jojen'],
              'event': 'Winterfell burned'
             },
         ],
        },
        // 69. Jon VIII
        {'duration': 10,
         'nodes': [
             {'subnodes': ['jon', 'ghost'],
              'event': 'Jon kills Qhorin Halfhand, goes over to the wildlings'
             }
         ],
        },

        // A Storm of Swords
        // 1. Prologue - Chett
        {'duration': 10,
         'nodes': [
             {'subnodes': ['jeor', 'sam'],
              'event': 'Wight attack at the Fist of First Men'
             },
             // Establish pre-escape togetherness
             {'subnodes': ['cat', 'brienne', 'jaime']},
         ],
        },
        // 2. Jaime I
        {'duration': 10,
         'nodes': [
             {'subnodes': ['jaime', 'brienne'],
              'event': 'Cat frees Jaime from Riverrun'
             }
         ]
        },
        // 5. Tyrion I
        {'duration': 10,
         'nodes': [
             {'subnodes': ['sansa', 'cersei', 'joffrey', 'ilyn', 'varys', 'pycelle', 'tyrion', 'loras', 'tywin', 'tommen'],
             }
         ],
        },
        // 6. Davos I
        {'duration': 10,
         'nodes': [
             {'subnodes': ['davos'],
              'event': 'Davos Rescued from Blackwater Bay'}
         ],
        },
        // 7. Sansa I
        {'duration': 10,
         'nodes': [
             {'subnodes': ['sansa', 'cersei', 'joffrey', 'ilyn', 'varys', 'pycelle', 'tyrion',
                           'loras', 'tywin', 'tommen', 'margaery'],
             }
         ],
        },
        // 11. Davos II
        {'duration': 10,
         'nodes': [
             {'subnodes': ['davos', 'stannis', 'melisandre']}
         ],
        },
        // 15. Catelyn II
        {'duration': 10,
         'nodes': [
             {'subnodes': ['cat', 'robb', 'grey wind', 'brynden']}
         ],
        },
        // 19. Samwell I
        {'duration': 10,
         'nodes': [
             {'subnodes': ['sam', 'jeor'],
              'event': 'Sam the Slayer'
             }
         ],
        },
        // 22. Jaime III
        {'duration': 10,
         'nodes': [
             {'subnodes': ['jaime', 'brienne'],
              'event': 'Jaime crippled'
             }
         ]
        },
        // 28. Daenerys III
        {'duration': 10,
         'nodes': [
             {'subnodes': ['daenerys', 'jorah', 'drogon', 'rhaegal', 'viserion', 'barristan'],
              'event': 'Daenerys conquers Astapor'}
         ],
        },
        // 29. Sansa III
        {'duration': 10,
         'nodes': [
             {'subnodes': ['sansa', 'cersei', 'joffrey', 'ilyn', 'varys', 'pycelle', 'tyrion',
                           'loras', 'tywin', 'tommen', 'margaery'],
              'event': 'Tyrion and Sansa married'
             }
         ],
        },
        // 30. Arya V
        {'duration': 10,
         'nodes': [
             {'subnodes': ['arya', 'gendry', 'sandor']},
         ],
        },
        // 31. Jon IV
        {'duration': 10,
         'nodes': [
             {'subnodes': ['jon', 'ghost'],
              'event': 'Over the Wall'
             }
         ],
        },
        // 34. Samwell II
        {'duration': 10,
         'nodes': [
             {
                 'subnodes': ['sam', 'jeor'],
                 'event': 'Mutiny at Craster\'s Keep',
                 'stateChanges': {
                     'jeor': ['dead']
                 }
             }
         ],
        },
        // 35. Arya VI
        {'duration': 10,
         'nodes': [
             {'subnodes': ['arya', 'gendry', 'sandor', 'beric']},
         ],
        },
        // 41-42. Bran III, Jon V
        {'duration': 10,
         'nodes': [
             {'subnodes': ['jon', 'bran', 'summer', 'meera', 'jojen'],
              'event': 'Jon betrays the wildlings at Queenscrown'
             },
             {'subnodes': ['sandor']}
         ],
        },
        // 43. Daenerys IV
        {'duration': 10,
         'nodes': [
             {'subnodes': ['daenerys', 'jorah', 'drogon', 'rhaegal', 'viserion', 'barristan'],
              'event': 'Daenerys conquers Yunkai'}
         ],
        },
        // 44. Arya VIII
        {'duration': 10,
         'nodes': [
             {'subnodes': ['arya', 'gendry', 'sandor', 'beric']},
             {'subnodes': ['coldhands']}
         ],
        },
        // 47. Samwell III
        {'duration': 10,
         'nodes': [
             {'subnodes': ['sam', 'coldhands']}
         ],
        },
        // 49. Jon VI
        {'duration': 10,
         'nodes': [
             {'subnodes': ['jon', 'aemon']}
         ],
        },
        // 51-53. Arya X, Catelyn VII, Arya XI
        {'duration': 10,
         'nodes': [
             {
                 'subnodes': ['arya', 'sandor', 'cat', 'robb', 'grey wind', 'brynden'],
                 'stateChanges': {
                     'cat': ['dead'],
                     'robb': ['dead'],
                     'grey wind': ['dead']
                 },
                 'event': 'Red Wedding'
             }
         ],
        },
        // 56. Jon VII
        {'duration': 10,
         'nodes': [
             {'subnodes': ['jon', 'aemon'],
              'event': 'Styr the Magnar\'s attack on Castle Black'}
         ],
        },
        // 57. Bran IV
        {'duration': 10,
         'nodes': [
             {'subnodes': ['bran', 'summer', 'meera', 'jojen', 'sam', 'coldhands']}
         ],
        },
        // 61-62. Tyrion VIII, Sansa V
        {'duration': 10,
         'nodes': [
             {
                 'subnodes': ['sansa', 'cersei', 'joffrey', 'ilyn', 'varys', 'pycelle', 'tyrion', 'loras', 'tywin',
                              'tommen', 'margaery', 'petyr'],
                 'event': 'Joffrey and Margaery married, Joffrey poisoned, Sansa escapes',
                 'stateChanges': {
                     'joffrey': ['dead']
                 }
             }
         ],
        },
        // 63. Jaime VII
        {'duration': 10,
         'nodes': [
             {'subnodes': ['cersei', 'ilyn', 'varys', 'pycelle', 'tyrion', 'loras', 'tywin', 'tommen',
                           'margaery', 'jaime', 'brienne'],
             }
         ],
        },
        // 65. Jon VIII
        {'duration': 10,
         'nodes': [
             {'subnodes': ['jon', 'aemon'],
              'event': 'Wildlings attack the Wall, Jon takes command of the Watch'}
         ],
        },
        // 66. Arya XII
        {'duration': 0,
         'nodes': [
             {'subnodes': ['arya', 'sandor']},
             {
                 'subnodes': ['nymeria', 'cat', 'beric'],
                 'event': 'Nymeria drags dead Catelyn out of the Trident, Beric revives her',
                 'stateChanges': {
                     'beric': ['dead']
                     'cat': ['undead']
                 }
             },
             // Establish togetherness
             {'subnodes': ['lysa', 'robert_a']}
         ],
        },
        // 69. Sansa VI
        {'duration': 10,
         'nodes': [
             {'subnodes': ['sansa', 'petyr', 'lysa'],
              'event': 'Petyr and Lysa married',
             }
         ],
        },
        // 70. Jon IX
        {'duration': 10,
         'nodes': [
             {'subnodes': ['jon', 'aemon'],
              'event': 'Jon declared a traitor'}
         ],
        },
        // 71. Tyrion X
        {'duration': 10,
         'nodes': [
             {'subnodes': ['cersei', 'ilyn', 'varys', 'pycelle', 'tyrion', 'loras', 'tywin', 'tommen',
                           'margaery', 'jaime', 'brienne', 'gregor'],
              'event': 'Gregor kills Oberyn in Tyrion\'s trial by combat',
             }
         ],
        },
        // 72. Daenerys VI
        {'duration': 10,
         'nodes': [
             {'subnodes': ['daenerys', 'jorah', 'drogon', 'rhaegal', 'viserion', 'barristan'],
              'event': 'Daenerys conquers Meereen, banishes Jorah'}
         ],
        },
        // 73. Jaime IX
        {'duration': 10,
         'nodes': [
             {'subnodes': ['cersei', 'ilyn', 'varys', 'pycelle', 'tyrion', 'loras', 'tywin', 'tommen',
                           'margaery', 'jaime', 'brienne', 'gregor'],
              'event': 'Jaime sends Brienne on her mission to find Sansa',
             },
             // Establish togetherness at Eastwatch
             {'subnodes': ['davos', 'stannis', 'melisandre']}
         ],
        },
        // 74. Jon X
        {'duration': 10,
         'nodes': [
             {'subnodes': ['jon', 'aemon', 'stannis', 'melisandre'],
              'event': 'Stannis defeats the wildlings'}
         ],
        },
        // 75. Arya XII
        {'duration': 10,
         'nodes': [
             {'subnodes': ['arya', 'sandor'],
              'event': 'Arya leaves for Braavos'},
         ],
        },
        // 76. Samwell IV
        {'duration': 10,
         'nodes': [
             {'subnodes': ['jon', 'aemon', 'stannis', 'melisandre', 'sam']}
         ],
        },
        // 78. Tyrion XI
        {'duration': 10,
         'nodes': [
             {
                 'subnodes': ['cersei', 'ilyn', 'varys', 'pycelle', 'tyrion', 'loras', 'tywin', 'tommen',
                              'margaery', 'jaime', 'gregor'],
                 'event': 'Jaime breaks Tyrion out of prison; Tyrion kills Tywin and Shae',
                 'stateChanges': {
                     'tywin': ['dead']
                 }
             }
         ],
        },
        // 80. Jon XII
        {'duration': 10,
         'nodes': [
             {'subnodes': ['jon', 'ghost', 'aemon', 'stannis', 'melisandre', 'sam'],
              'event': 'Jon elected Lord Commander of the Night\'s Watch'}
         ],
        },
        // 81. Sansa VII
        {'duration': 10,
         'nodes': [
             {
                 'subnodes': ['sansa', 'petyr', 'lysa', 'robert_a'],
                 'event': 'Petyr throws Lysa out the Moon Door',
                 'stateChanges': {
                     'lysa': ['dead']
                 }
             }
         ],
        },
        // 82. Epilogue - Merrett Frey
        {'duration': 10,
         'nodes': [
             {'subnodes': ['cat']},
             // Wrap 'em all up
             {'subnodes': ['sansa', 'petyr', 'robert_a']},
             {'subnodes': ['jon', 'ghost', 'aemon', 'stannis', 'melisandre', 'sam']},
             {'subnodes': ['cersei', 'ilyn', 'pycelle', 'loras', 'tommen', 'margaery', 'jaime', 'gregor']},
             {'subnodes': ['myrcella']},
             {'subnodes': ['tyrion']},
             {'subnodes': ['varys']},
             {'subnodes': ['brienne']},
             {'subnodes': ['arya']},
             {'subnodes': ['sandor']},
             {'subnodes': ['davos']},
             {'subnodes': ['daenerys', 'drogon', 'rhaegal', 'viserion', 'barristan']},
             {'subnodes': ['jorah']},
             {'subnodes': ['nymeria']},
             {'subnodes': ['illyrio']},
             {'subnodes': ['bran', 'summer', 'meera', 'jojen', 'coldhands']},
             {'subnodes': ['rickon', 'shaggydog']},
             {'subnodes': ['brynden']},
             {'subnodes': ['gendry']},
             {'subnodes': ['asha']},
             {'subnodes': ['theon']},
             {'subnodes': ['victarion']},
             {'subnodes': ['aeron']},
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
