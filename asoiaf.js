// TODO:
// Hinting for where you'd like to see nodes sorted
// Show events
// Force new nodes to be at a similar measure to their next neighbors after 1st crossing iteration
// Cross count subnodes
// Better sorting of subnodes
// Deaths, etc
// More intelligent insertion of p,q,r nodes?
// Underscorize
// Optimize?
// Curves
// Something's still wrong with node placement
// Resurrection still needs to be refined WRT node durations and bounding boxes

// Sorting in Step 2

$(function() {
    var group_colors = {
        'stark': '#7c7c7c',
        'wolf': '#956b41',
        'baratheon': '#ffe557',
        'lannister': '#ff1414',
        'targaryen': '#ac1717',
        'dragon': '#ac1717',
        'night\'s watch': '#000000',
        'greyjoy': '#b15bc9',
        'other': '#ff7a32',
        'tyrell': '#31c105',
        'arryn': '#23d0f5',
        'kingsguard': '#ff7a32'
    };

    // Candidates for inclusion:
    // Edmure Tully
    // Walder Frey
    // Roose Bolton
    // Gilly
    // Ygritte
    // Oberyn Martell
    // Podrick Payne
    // Mance Rayder

    var characters = {
        'ned': {'name': 'Eddard Stark',
                'pov': true,
                'group': 'stark'},
        'cat': {'name': 'Catelyn Stark',
                'pov': true,
                'group': 'stark'},
        'robb': {'name': 'Robb Stark',
                 'pov': false,
                 'group': 'stark'},
        'sansa': {'name': 'Sansa Stark',
                  'pov': true,
                  'group': 'stark'},
        'arya': {'name': 'Arya Stark',
                 'pov': true,
                 'group': 'stark'},
        'bran': {'name': 'Bran Stark',
                 'pov': true,
                 'group': 'stark'},
        'rickon': {'name': 'Rickon Stark',
                   'pov': false,
                   'group': 'stark'},
        'jon': {'name': 'Jon Snow',
                'pov': true,
                'group': 'stark'},
        'meera': {'name': 'Meera Reed',
                  'pov': false,
                  'group': 'stark'},
        'jojen': {'name': 'Jojen Reed',
                  'pov': false,
                  'group': 'stark'},

        'grey wind': {'name': 'Grey Wind',
                      'pov': false,
                      'group': 'wolf'},
        'lady': {'name': 'Lady',
                 'pov': false,
                 'group': 'wolf'},
        'nymeria': {'name': 'Nymeria',
                    'pov': false,
                    'group': 'wolf'},
        'summer': {'name': 'Summer',
                   'pov': false,
                   'group': 'wolf'},
        'shaggydog': {'name': 'Shaggydog',
                      'pov': false,
                      'group': 'wolf'},
        'ghost': {'name': 'Ghost',
                  'pov': false,
                  'group': 'wolf'},

        'robert b': {'name': 'Robert Baratheon',
                     'pov': false,
                     'group': 'baratheon'},
        'joffrey': {'name': 'Joffrey Baratheon',
                    'pov': false,
                    'group': 'baratheon'},
        'myrcella': {'name': 'Myrcella Baratheon',
                     'pov': false,
                     'group': 'baratheon'},
        'tommen': {'name': 'Tommen Baratheon',
                   'pov': false,
                   'group': 'baratheon'},
        'stannis': {'name': 'Stannis Baratheon',
                    'pov': false,
                    'group': 'baratheon'},
        'renly': {'name': 'Renly Baratheon',
                  'pov': false,
                  'group': 'baratheon'},
        'davos': {'name': 'Davos Seaworth',
                  'pov': true,
                  'group': 'baratheon'},
        'brienne': {'name': 'Brienne of Tarth',
                    'pov': false,
                    'group': 'baratheon'},

        'tywin': {'name': 'Tywin Lannister',
                  'pov': false,
                  'group': 'lannister'},
        'cersei': {'name': 'Cersei Lannister',
                   'pov': true,
                   'group': 'lannister'},
        'jaime': {'name': 'Jaime Lannister',
                  'pov': true,
                  'group': 'lannister'},
        'tyrion': {'name': 'Tyrion Lannister',
                   'pov': true,
                   'group': 'lannister'},
        'sandor': {'name': 'Sandor Clegane',
                   'pov': false,
                   'group': 'lannister'},
        'gregor': {'name': 'Gregor Clegane',
                   'pov': false,
                   'group': 'lannister'},
        'ilyn': {'name': 'Ilyn Payne',
                 'pov': false,
                 'group': 'lannister'},

        'daenerys': {'name': 'Daenerys Targaryen',
                     'pov': true,
                     'group': 'targaryen'},
        'viserys': {'name': 'Viserys Targaryen',
                    'pov': false,
                    'group': 'targaryen'},

        'sam': {'name': 'Samwell Tarly',
                'pov': true,
                'group': 'night\'s watch'},
        'aemon': {'name': 'Maester Aemon',
                  'pov': false,
                  'group': 'night\'s watch'},
        'jeor': {'name': 'Jeor Mormont',
                 'pov': false,
                 'group': 'night\'s watch'},
        'benjen': {'name': 'Benjen Stark',
                   'pov': false,
                   'group': 'night\'s watch'},
        'will': {'name': 'Will',
                 'pov': true,
                 'group': 'night\'s watch'},
        'waymar': {'name': 'Waymar Royce',
                   'pov': false,
                   'group': 'night\'s watch'},
        'gared': {'name': 'Gared',
                  'pov': false,
                  'group': 'night\'s watch'},

        'theon': {'name': 'Theon Greyjoy',
                  'pov': true,
                  'group': 'greyjoy'},
        'asha': {'name': 'Asha Greyjoy',
                 'pov': true,
                 'group': 'greyjoy'},
        'aeron': {'name': 'Aeron Greyjoy',
                  'pov': true,
                  'group': 'greyjoy'},
        'victarion': {'name': 'Victarion Greyjoy',
                      'pov': true,
                      'group': 'greyjoy'},

        'barristan': {'name': 'Barristan Selmy',
                      'pov': false,
                      'group': 'kingsguard'},

        'petyr': {'name': 'Petyr Baelish',
                  'pov': false,
                  'group': 'other'},
        'varys': {'name': 'Varys',
                  'pov': false,
                  'group': 'other'},
        'pycelle': {'name': 'Maester Pycelle',
                    'pov': false,
                    'group': 'other'},
        'illyrio': {'name': 'Illyrio Mopatis',
                    'pov': false,
                    'group': 'other'},
        'jorah': {'name': 'Jorah Mormont',
                  'pov': false,
                  'group': 'other'},
        'drogo': {'name': 'Khal Drogo',
                  'pov': false,
                  'group': 'other'},
        'mirri': {'name': 'Mirri Maz Duur',
                  'pov': false,
                  'group': 'other'},
        'melisandre': {'name': 'Melisandre',
                       'pov': false,
                       'group': 'other'},
        'gendry': {'name': 'Gendry',
                   'pov': false,
                   'group': 'other'},
        'jaqen': {'name': 'Jaqen H\'ghar',
                  'pov': false,
                  'group': 'other'},
        'coldhands': {'name': 'Coldhands',
                      'pov': false,
                      'group': 'other'},

        'loras': {'name': 'Loras Tyrell',
                  'pov': false,
                  'group': 'tyrell'},
        'margaery': {'name': 'Margaery Tyrell',
                     'pov': false,
                     'group': 'tyrell'},
        'beric': {'name': 'Beric Dondarrion',
                  'pov': false,
                  'group': 'tyrell'},

        'brynden': {'name': 'Brynden Tully',
                    'pov': false,
                    'group': 'arryn'},
        'lysa': {'name': 'Lysa Arryn',
                 'pov': false,
                 'group': 'arryn'},
        'robert a': {'name': 'Robert Arryn',
                     'pov': false,
                     'group': 'arryn'},

        'drogon': {'name': 'Drogon',
                   'pov': false,
                   'group': 'dragon'},
        'rhaegal': {'name': 'Rhaegal',
                    'pov': false,
                    'group': 'dragon'},
        'viserion': {'name': 'Viserion',
                     'pov': false,
                     'group': 'dragon'},
    };

    var layers = [
        // A Game of Thrones
        {'duration': 10,
         'nodes': [
             // Characters Intros
             {'sub_nodes': ['will', 'waymar', 'gared']}
         ],
        },
        // 1. Prologue - Will I
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['will', 'waymar', 'gared'],
              'event': 'Encounter with Others',
              'deaths': ['will'],
              'undeaths': ['waymar']
             },
         ],
        },
        {'duration': 10,
         'nodes': [
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
             {'sub_nodes': ['robert b', 'cersei', 'jaime', 'tyrion', 'joffrey', 'myrcella', 'tommen',
                            'sandor']}
         ],
        },
        // 5. Eddard I
        {'duration': 60,
         'nodes': [
             {'sub_nodes': ['ned', 'cat', 'robb', 'sansa', 'arya', 'bran', 'rickon', 'jon',
                            'theon', 'grey wind', 'lady', 'nymeria', 'summer',
                            'shaggydog', 'ghost', 'benjen', 'robert b', 'cersei',
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
                            'shaggydog', 'ghost', 'benjen', 'robert b', 'cersei',
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
              'event': 'Assassination attempt on Bran'
             },
             // Character Intros
             {'sub_nodes': ['renly', 'barristan', 'ilyn']}
         ],
        },
        // 16-17. Sansa I, Eddard III
        {'duration': 20,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'jaime', 'joffrey', 'myrcella',
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
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'cat', 'petyr', 'varys',
                            'pycelle']}
         ]
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
             {'sub_nodes': ['gendry']}
         ]
        },
        // 28. Eddard VI
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
                            'pycelle', 'gendry'],
              'event': 'Hand\'s Tourney'
             },
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
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
                            'pycelle', 'gendry', 'gregor', 'beric', 'loras'],
              'event': 'Hand\'s Tourney'
             },
         ],
        },
        // 33. Arya III
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'jaime', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'renly', 'barristan', 'ilyn', 'petyr', 'varys',
                            'pycelle', 'gendry', 'beric', 'loras', 'illyrio']},
             // Character Intros
             {'sub_nodes': ['lysa', 'robert a']},
             {'sub_nodes': ['brynden']}
         ],
        },
        // 35. Catelyn IV
        {'duration': 30,
         'nodes': [
             {'sub_nodes': ['cat', 'lysa', 'robert a', 'brynden', 'tyrion']}
         ]
        },
        //*** 36. Eddard IX Jaime attacks Eddard?
        // 45. Sansa II
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'jaime', 'joffrey', 'myrcella',
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
             {'sub_nodes': ['ned', 'sansa', 'arya', 'robert b', 'cersei', 'joffrey', 'myrcella',
                            'tommen', 'sandor', 'barristan', 'ilyn', 'petyr', 'varys', 'pycelle',
                            'gendry', 'renly', 'loras'],
              'deaths': ['robert b'],
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

        // A Clash of Kings
        // 1. Prologue - Cressen I
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['stannis', 'davos', 'melisandre']},
             {'sub_nodes': ['jaqen']}
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
                            'barristan', 'ilyn', 'petyr', 'varys', 'pycelle', 'tyrion']},
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

        // A Storm of Swords
        // 1. Prologue - Chett
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jeor', 'sam'],
              'event': 'Wight attack at the Fist of First Men'
             },
             // Establish pre-escape togetherness
             {'sub_nodes': ['cat', 'brienne', 'jaime']},
         ],
        },
        // 2. Jaime I
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jaime', 'brienne'],
              'event': 'Cat frees Jaime from Riverrun'
             }
         ]
        },
        // 5. Tyrion I
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['sansa', 'cersei', 'joffrey', 'ilyn', 'varys', 'pycelle', 'tyrion', 'loras', 'tywin', 'tommen'],
             }
         ],
        },
        // 6. Davos I
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['davos'],
              'event': 'Davos Rescued from Blackwater Bay'}
         ],
        },
        // 7. Sansa I
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['sansa', 'cersei', 'joffrey', 'ilyn', 'varys', 'pycelle', 'tyrion',
                            'loras', 'tywin', 'tommen', 'margaery'],
             }
         ],
        },
        // 11. Davos II
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['davos', 'stannis', 'melisandre']}
         ],
        },
        // 15. Catelyn II
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['cat', 'robb', 'grey wind', 'brynden']}
         ],
        },
        // 19. Samwell I
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['sam', 'jeor'],
              'event': 'Sam the Slayer'
             }
         ],
        },
        // 22. Jaime III
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jaime', 'brienne'],
              'event': 'Jaime crippled'
             }
         ]
        },
        // 28. Daenerys III
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['daenerys', 'jorah', 'drogon', 'rhaegal', 'viserion', 'barristan'],
              'event': 'Daenerys conquers Astapor'}
         ],
        },
        // 29. Sansa III
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['sansa', 'cersei', 'joffrey', 'ilyn', 'varys', 'pycelle', 'tyrion',
                            'loras', 'tywin', 'tommen', 'margaery'],
              'event': 'Tyrion and Sansa married'
             }
         ],
        },
        // 30. Arya V
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['arya', 'gendry', 'sandor']},
         ],
        },
        // 31. Jon IV
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jon', 'ghost'],
              'event': 'Over the Wall'
             }
         ],
        },
        // 34. Samwell II
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['sam', 'jeor'],
              'event': 'Mutiny at Craster\'s Keep',
              'deaths': ['jeor']
             }
         ],
        },
        // 35. Arya VI
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['arya', 'gendry', 'sandor', 'beric']},
         ],
        },
        // 41-42. Bran III, Jon V
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jon', 'bran', 'summer', 'meera', 'jojen'],
              'event': 'Jon betrays the wildlings at Queenscrown'
             },
             {'sub_nodes': ['sandor']}
         ],
        },
        // 43. Daenerys IV
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['daenerys', 'jorah', 'drogon', 'rhaegal', 'viserion', 'barristan'],
              'event': 'Daenerys conquers Yunkai'}
         ],
        },
        // 44. Arya VIII
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['arya', 'gendry', 'sandor', 'beric']},
             {'sub_nodes': ['coldhands']}
         ],
        },
        // 47. Samwell III
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['sam', 'coldhands']}
         ],
        },
        // 49. Jon VI
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jon', 'aemon']}
         ],
        },
        // 51-53. Arya X, Catelyn VII, Arya XI
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['arya', 'sandor', 'cat', 'robb', 'grey wind', 'brynden'],
              'deaths': ['cat', 'robb', 'grey wind'],
              'event': 'Red Wedding'},
         ],
        },
        // 56. Jon VII
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jon', 'aemon'],
              'event': 'Styr the Magnar\'s attack on Castle Black'}
         ],
        },
        // 57. Bran IV
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['bran', 'summer', 'meera', 'jojen', 'sam', 'coldhands']}
         ],
        },
        // 61-62. Tyrion VIII, Sansa V
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['sansa', 'cersei', 'joffrey', 'ilyn', 'varys', 'pycelle', 'tyrion', 'loras', 'tywin',
                            'tommen', 'margaery', 'petyr'],
              'event': 'Joffrey and Margaery married, Joffrey poisoned, Sansa escapes',
              'deaths': ['joffrey']
             }
         ],
        },
        // 63. Jaime VII
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['cersei', 'ilyn', 'varys', 'pycelle', 'tyrion', 'loras', 'tywin', 'tommen',
                            'margaery', 'jaime', 'brienne'],
             }
         ],
        },
        // 65. Jon VIII
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jon', 'aemon'],
              'event': 'Wildlings attack the Wall, Jon takes command of the Watch'}
         ],
        },
        // 66. Arya XII
        {'duration': 0,
         'nodes': [
             {'sub_nodes': ['arya', 'sandor']},
             {'sub_nodes': ['nymeria', 'cat', 'beric'],
              'event': 'Nymeria drags dead Catelyn out of the Trident, Beric revives her',
              'deaths': ['beric'],
              'undeaths': ['cat']},
             // Establish togetherness
             {'sub_nodes': ['lysa', 'robert a']}
         ],
        },
        // 69. Sansa VI
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['sansa', 'petyr', 'lysa'],
              'event': 'Petyr and Lysa married',
             }
         ],
        },
        // 70. Jon IX
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jon', 'aemon'],
              'event': 'Jon declared a traitor'}
         ],
        },
        // 71. Tyrion X
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['cersei', 'ilyn', 'varys', 'pycelle', 'tyrion', 'loras', 'tywin', 'tommen',
                            'margaery', 'jaime', 'brienne', 'gregor'],
              'event': 'Gregor kills Oberyn in Tyrion\'s trial by combat',
             }
         ],
        },
        // 72. Daenerys VI
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['daenerys', 'jorah', 'drogon', 'rhaegal', 'viserion', 'barristan'],
              'event': 'Daenerys conquers Meereen, banishes Jorah'}
         ],
        },
        // 73. Jaime IX
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['cersei', 'ilyn', 'varys', 'pycelle', 'tyrion', 'loras', 'tywin', 'tommen',
                            'margaery', 'jaime', 'brienne', 'gregor'],
              'event': 'Jaime sends Brienne on her mission to find Sansa',
             },
             // Establish togetherness at Eastwatch
             {'sub_nodes': ['davos', 'stannis', 'melisandre']}
         ],
        },
        // 74. Jon X
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jon', 'aemon', 'stannis', 'melisandre'],
              'event': 'Stannis defeats the wildlings'}
         ],
        },
        // 75. Arya XII
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['arya', 'sandor'],
              'event': 'Arya leaves for Braavos'},
         ],
        },
        // 76. Samwell IV
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jon', 'aemon', 'stannis', 'melisandre', 'sam']}
         ],
        },
        // 78. Tyrion XI
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['cersei', 'ilyn', 'varys', 'pycelle', 'tyrion', 'loras', 'tywin', 'tommen',
                            'margaery', 'jaime', 'gregor'],
              'event': 'Jaime breaks Tyrion out of prison; Tyrion kills Tywin and Shae',
              'deaths': ['tywin']
             },
         ],
        },
        // 80. Jon XII
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['jon', 'ghost', 'aemon', 'stannis', 'melisandre', 'sam'],
              'event': 'Jon elected Lord Commander of the Night\'s Watch'}
         ],
        },
        // 81. Sansa VII
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['sansa', 'petyr', 'lysa', 'robert a'],
              'event': 'Petyr throws Lysa out the Moon Door',
              'deaths': ['lysa']
             }
         ],
        },
        // 82. Epilogue - Merrett Frey
        {'duration': 10,
         'nodes': [
             {'sub_nodes': ['cat']},
             // Wrap 'em all up
             {'sub_nodes': ['sansa', 'petyr', 'robert a']},
             {'sub_nodes': ['jon', 'ghost', 'aemon', 'stannis', 'melisandre', 'sam']},
             {'sub_nodes': ['cersei', 'ilyn', 'pycelle', 'loras', 'tommen', 'margaery', 'jaime', 'gregor']},
             {'sub_nodes': ['myrcella']},
             {'sub_nodes': ['tyrion']},
             {'sub_nodes': ['varys']},
             {'sub_nodes': ['brienne']},
             {'sub_nodes': ['arya']},
             {'sub_nodes': ['sandor']},
             {'sub_nodes': ['davos']},
             {'sub_nodes': ['daenerys', 'drogon', 'rhaegal', 'viserion', 'barristan']},
             {'sub_nodes': ['jorah']},
             {'sub_nodes': ['nymeria']},
             {'sub_nodes': ['illyrio']},
             {'sub_nodes': ['bran', 'summer', 'meera', 'jojen', 'coldhands']},
             {'sub_nodes': ['brynden']},
             {'sub_nodes': ['gendry']},
             {'sub_nodes': ['asha']},
             {'sub_nodes': ['theon']},
             {'sub_nodes': ['victarion']},
             {'sub_nodes': ['aeron']},
         ],
        },
    ];

    //*** Missed Robb leaving for the Westerlands, and Theon and Asha sailing for the North
    //*** Was Margaery at the Hand's Tourney?
    //*** When did Tommen return to KL after Battle of the Blackwater?
    //*** When is Petyr sent to the Vale?
    //*** Guess at all of Beric's deaths?

    function add_edge(edge_group, node1, node2) {
        if(!edge_group[node1.id]) {
            edge_group[node1.id] = {};
        }
        if(!edge_group[node1.id][node2.id]) {
            edge_group[node1.id][node2.id] = {'edge': [node1, node2], 'weight': 1};
        } else {
            edge_group[node1.id][node2.id].weight++;
        }
    }

    function copy_segment(segment) {
        return {'id': segment.id,
                'nodes': segment.nodes.slice(0),
                'prev_neighbors': segment.prev_neighbors.slice(0),
                'next_neighbors': segment.next_neighbors.slice(0)};
    }

    function add_layer_edges(layers, layer_num1, layer_num2, node1, node2, segment) {
        var v_1 = node1;
        var v_2 = !segment ? node2 : copy_segment(segment);
        pq_segs = {};

        if(node1.p) {
            if(!layers[layer_num1].seg_hash[v_2.id]) {
                layers[layer_num1].seg_hash[v_2.id] = v_2;
                pq_segs[node1.id] = v_2;
            }
        }
        if(layer_num2 - layer_num1 == 1) {
            v_2 = node2;
        }
        for(var i=layer_num1; i<layer_num2; i++) {
            var layer1 = layers[i];
            var layer2 = layers[i + 1];
            add_edge(layer1.next_edges, v_1, v_2);
            add_edge(layer2.prev_edges, v_2, v_1);

            if(v_1.nodes && !layer1.seg_hash[v_1.id]) {
                layer1.seg_hash[v_1.id] = v_1;
            }
            if(v_2.nodes && !layer2.seg_hash[v_2.id]) {
                layer2.seg_hash[v_2.id] = v_2;
            }

            v_1 = v_2;
            if(i >= layer_num2 - 2) {
                if(node2.q) {
                    var seg = v_2.nodes ? v_2 : copy_segment(segment);
                    if(!layers[layer_num2].seg_hash[seg.id]) {
                        layers[layer_num2].seg_hash[seg.id] = seg;
                        pq_segs[node2.id] = seg
                    }
                }
                v_2 = node2;
            } else {
                v_2 = copy_segment(segment);
            }
        };

        return pq_segs;
    }

    function copy_segment_container(container, layer) {
        var new_c = {'segs': []};
        for(var i=0; i<container.segs.length; i++) {
            var seg = container.segs[i];
            new_c.segs.push(layer.seg_hash[seg.id]);
        }
        return new_c;
    }

    function update_last_nodes(name, node, last_nodes) {
        last_nodes[name] = node;
    }

    function update_last_nodes_group(names, node, last_nodes) {
        for(var i=0; i<names.length; i++) {
            var name = names[i];
            update_last_nodes(name, node, last_nodes);
        }
    }

    function make_edges(layers, x_space) {
        var edges = {};
        var last_nodes = {};
        var pq_segs = {};
        var flat_nodes = {};
        var p_nodes = [];
        var q_nodes = [];
        var r_nodes = [];
        var c_nodes = {};
        var x = x_space;
        for(var i=0; i<layers.length; i++) {
            var layer = layers[i];
            x += x_space;
            layer.prev_edges = {};
            layer.next_edges = {};
            layer.seg_hash = {};
            layer.num = i;
            for(var j=0; j<layer.nodes.length; j++) {
                var node = layer.nodes[j];
                node.id = i + '-' + j;
                node.x = x;
                node.duration = layer.duration;
                node.prev_neighbors = [];
                node.next_neighbors = [];
                node.layer = layer;
                node.sub_nodes.sort();
                flat_nodes[node.id] = node;
                for(var k=0; k<node.sub_nodes.length; k++) {
                    var name = node.sub_nodes[k];
                    if(!c_nodes[name]) {
                        c_nodes[name] = [];
                    }
                    var last_node = last_nodes[name];
                    if(last_node) {
                        var last_layer_parts = last_node.id.split('-');
                        var last_layer_num = parseInt(last_layer_parts[0]);
                        var last_layer = layers[last_layer_num]
                        var span = i - last_layer_num;
                        var seg_sub_nodes = _.intersect(node.sub_nodes, last_node.sub_nodes);
                        if(span > 2) {
                            //Add two new vertices at layers last_layer_num + 1 and i - 1
                            var p_layer = layers[last_layer_num + 1];
                            var q_layer = layers[i - 1];
                            var p_node = {'id': (last_layer_num + 1) + '-' + p_layer.nodes.length,
                                          'sub_nodes': seg_sub_nodes,
                                          'x': p_layer.nodes[0].x,
                                          'duration': 0,
                                          'layer': p_layer,
                                          'p': true,
                                          'prev_neighbors': [],
                                          'next_neighbors': []};
                            var q_node = {'id': (i - 1) + '-' + q_layer.nodes.length,
                                          'sub_nodes': seg_sub_nodes.slice(0),
                                          'x': q_layer.nodes[0].x,
                                          'duration': 0,
                                          'layer': q_layer,
                                          'q': true,
                                          'prev_neighbors': [],
                                          'next_neighbors': []};
                            p_nodes.push(p_node);
                            q_nodes.push(q_node);
                            p_layer.nodes.push(p_node);
                            q_layer.nodes.push(q_node);

                            //Add the segment between p_node and q_node to each of the layers it crosses
                            var segment = {'id': p_node.id + '-' + q_node.id,
                                           'nodes': [p_node, q_node],
                                           'prev_neighbors': [],
                                           'next_neighbors': []};

                            //Add two new edges last_layer -> p_layer, p_layer -> q_layer
                            //for each name in this node
                            for(var n=0; n<seg_sub_nodes.length; n++) {
                                var seg_name = seg_sub_nodes[n];
                                if(last_node == last_nodes[seg_name]) {
                                    add_edge(edges, last_node, p_node);
                                    add_edge(edges, p_node, q_node);
                                    add_layer_edges(layers, last_layer_num, last_layer_num + 1, last_node, p_node);
                                    var new_pqs = add_layer_edges(layers, last_layer_num + 1, i - 1, p_node, q_node, segment);
                                    pq_segs = $.extend(new_pqs, pq_segs);

                                    if(!c_nodes[seg_name]) {
                                        c_nodes[seg_name] = [];
                                    }
                                    c_nodes[seg_name].push(p_node);
                                    c_nodes[seg_name].push(q_node);
                                } else {
                                    seg_sub_nodes.splice(n, 1);
                                    n--;
                                }
                            }
                            last_node = q_node;
                            update_last_nodes_group(seg_sub_nodes, q_node, last_nodes);
                            last_layer_num = i - 1;
                        } else if(span == 2) {
                            //Add one new vertex at layer i - 1
                            var r_layer = layers[i - 1];
                            var r_node = {'id': (i - 1) + '-' + r_layer.nodes.length,
                                          'sub_nodes': seg_sub_nodes,
                                          'x': r_layer.nodes[0].x,
                                          'duration': 0,
                                          'layer': r_layer,
                                          'r': true,
                                          'prev_neighbors': [],
                                          'next_neighbors': []};
                            r_nodes.push(r_node);
                            r_layer.nodes.push(r_node);
                            //Add two new edges last_layer -> r_layer
                            //for each name in this node
                            for(var n=0; n<seg_sub_nodes.length; n++) {
                                var seg_name = seg_sub_nodes[n];
                                if(last_node == last_nodes[seg_name]) {
                                    add_edge(edges, last_node, r_node);
                                    add_layer_edges(layers, last_layer_num, i - 1, last_node, r_node);
                                    if(!c_nodes[seg_name]) {
                                        c_nodes[seg_name] = [];
                                    }
                                    c_nodes[seg_name].push(r_node);
                                } else {
                                    seg_sub_nodes.splice(n, 1);
                                    n--;
                                }
                            }
                            update_last_nodes_group(r_node.sub_nodes, r_node, last_nodes);
                            last_node = r_node;
                            last_layer_num = i - 1;
                        }

                        //Add one edge normally
                        add_edge(edges, last_node, node);
                        add_layer_edges(layers, last_layer_num, i, last_node, node);
                    }
                    c_nodes[name].push(node);
                    update_last_nodes(name, node, last_nodes);
                }
            }
        }

        var char_nodes = _.map(c_nodes, function(nodes, name) {
            var character = characters[name];
            character.short_name = name;
            return {'character': character, 'nodes': nodes};
        });

        return {'layers': layers, 'pq_segs': pq_segs, 'edges': edges, 'flat_nodes': flat_nodes, 'q_nodes': q_nodes,
                'p_nodes': p_nodes, 'r_nodes': r_nodes, 'char_nodes': char_nodes};
    }

    function copy_L(L) {
        var new_L = [];
        for(var i=0; i<L.length; i++) {
            var item = L[i];
            if(item.sub_nodes) {
                new_L.push(item);
            }
            if(item.segs) {
                new_L.push({'segs': item.segs.slice(0)});
            }
        }
        return new_L;
    }

    function count_crossings(layer_edges, q, next_layer_edges, seg_begin, seg_end) {
        layer_edges.sort(function (a, b) {
            if(a.order[0] != b.order[0]) {
                return a.order[0] - b.order[0];
            } else {
                return a.order[1] - b.order[1];
            }
        });

        var L1_positions = [];
        var L1_weights = [];
        for(var i=0; i<layer_edges.length; i++) {
            var edge = layer_edges[i];
            L1_positions.push(edge.order[1]);
            L1_weights.push(edge.weight);
        };

        // Build the accumulator tree
        var first_index = 1;
        while (first_index < q) {
            first_index *= 2;
        }
        var tree_size = 2 * first_index - 1; /* number of tree nodes */
        first_index -= 1; /* index of leftmost leaf */
        var tree = [];
        var seg_tree = [];
        for(var t=0; t<tree_size; t++) {
            tree[t] = 0;
            seg_tree[t] = 0;
        }
        
        var cross_count = 0; /* number of crossings */
        for(var k=0; k<L1_positions.length; k++) { /* insert edge k */
            var index = L1_positions[k] + first_index;
            var edge = layer_edges[k];
            tree[index] += L1_weights[k];
            var is_seg = false;
            if(edge.edge[0][seg_begin] || edge.edge[1][seg_end] || edge.edge[0].nodes || edge.edge[1].nodes) {
                seg_tree[index] += 1;
                is_seg = true;
            }
            var weight_sum = 0;
            var seg_sum = 0;
            while(index > 0) {
                if (index % 2) {
                    weight_sum += tree[index+1];
                    seg_sum += seg_tree[index+1];
                }
                index = Math.floor((index - 1) / 2);
                tree[index] += L1_weights[k];
                if(is_seg) {
                    seg_tree[index] += 1;
                }
            }
            cross_count += (L1_weights[k] * weight_sum);
            if(seg_sum > 0) {
                edge.marked = true;
                next_layer_edges[edge.edge[1].id][edge.edge[0].id].marked = true;
            } else {
                edge.marked = false;
                next_layer_edges[edge.edge[1].id][edge.edge[0].id].marked = false;
            }

            // If we're adding a segment, mark any edges it crosses
            if(is_seg) {
                var pos = L1_positions[k];
                for(var l=0; l<k; l++) {
                    if(pos < L1_positions[l]) {
                        var added_edge = layer_edges[l];
                        added_edge.marked = true;
                        next_layer_edges[added_edge.edge[1].id][added_edge.edge[0].id].marked = true;
                    }
                }
            }
        }

        return cross_count;
    }

    function minimize_crossings(graph, Li, i, compaction, seg_begin, seg_end,
                                forward_edges, backward_edges) {
        var layers = graph.layers;
        var layer = layers[i];
        var next_layer = layers[i + 1];
        var prev_L = compaction[i];

        // Step 1
        for(var j=0; j<Li.length; j++) {
            var item = Li[j];
            if(item[seg_begin]) {
                // Join segment container Li[j-1], this p_node's segment, and Li[j+1]
                Li[j-1].segs = Li[j-1].segs.concat(graph.pq_segs[item.id],
                                                   Li.splice(j+1, 1)[0].segs);
                // Remove the p-node
                Li.splice(j, 1);
                j--;
            }
        }

        // Step 2
        // Assign pos to layer
        var LS = [];
        var pos = 0;
        for(var j=0; j<Li.length; j+=2) {
            var segment = copy_segment_container(Li[j], next_layer);
            pos = j ? pos + 1 : 0;
            segment.measure = segment.pos = pos
            pos += segment.segs.length;
            if(segment.segs.length > 0) {
                LS.push(segment);
            }
            if(j < Li.length - 1) {
                var node = Li[j + 1];
                node.pos = pos;
            }
        }

        // Figure out measures of non-q nodes in next_layer based on pos of parent nodes in layer
        var LV = [];
        for(var j=0; j<next_layer.nodes.length; j++) {
            var node = next_layer.nodes[j];
            if(!node[seg_end]) {
                LV.push(node);
            }
        }

        // Make Chrome do it right - permutes the order of same-valued array elements when sorting
        var used_measures = [];
        for(var j=0; j<LV.length; j++) {
            var node = LV[j];
            var num_parents = 0;
            var total_pos = 0;
            var edges = next_layer[backward_edges][node.id];
            for(var node_id in edges) {
                var parent = edges[node_id].edge[1];
                total_pos += parent.pos;
                num_parents++;
            }
            node.measure = num_parents > 0 ? total_pos / num_parents : node.measure || node.measure ? node.measure : 0;
            while($.inArray(node.measure, used_measures) != -1) {
                node.measure += .000001;
            }
            used_measures.push(node.measure);
        }

        // Step 3
        var L = [];

        function measure_sort(a, b) {
            return a.measure - b.measure;
        }
        LV.sort(measure_sort);
        LS.sort(measure_sort);

        while(LS.length && LV.length) {
            if(LV[0].measure <= LS[0].pos) {
                L.push(LV.shift());
            } else {
                var S = LS.shift();
                if(LV[0].measure >= S.pos + S.segs.length - 1) {
                    L.push(S);
                } else {
                    var v = LV.shift();
                    var k = Math.ceil(v.measure - S.pos);
                    var S1 = {'pos': S.pos, 'segs': S.segs.splice(0, k)};
                    var S2 = S;
                    if(S1.segs.length) {
                        L.push(S1);
                    }
                    L.push(v);
                    if(S2.segs.length) {
                        S2.pos += k;
                        LS.unshift(S2);
                    }
                }
            }
        }
        L = L.concat(LV, LS);

        // Step 4
        var pq = seg_begin == 'p' ? 1 : 0;
        for(var j=0; j<L.length; j++) {
            var item = L[j];
            if(item.segs) {
                // It's actually a segment container
                var S = item;
                for(var k=0; k<S.segs.length; k++) {
                    if(S.segs[k].nodes[pq].layer.num == next_layer.num) {
                        // It's a q node
                        var S_segs = S.segs.splice(0, k);
                        var S1 = {'pos': S.pos, 'segs': S_segs};
                        var S2 = S;
                        var v = S2.segs.splice(0, 1)[0].nodes[pq];

                        // S2 is already in L, need to insert v and S1 before it
                        // And remove it if it's empty
                        var remove_s2 = S2.segs.length ? 0 : 1;
                        if(S1.segs.length) {
                            L.splice(j, remove_s2, S1, v);
                            j += 2;
                        } else {
                            L.splice(j, remove_s2, v);
                            j++;
                        }
                        if(remove_s2) {
                            j--;
                        }
                        k = -1;
                    }
                }
            } else {
                // It's a node
                var node = item;
                var edges = next_layer[backward_edges][node.id];
                for(var node_id in edges) {
                    var parent = edges[node_id].edge[1];
                    if(!layer[backward_edges][parent.id]) {
                        var location = $.inArray(parent, prev_L);
                        if(location != j) {
                            prev_L.splice(location, 1);
                            prev_L.splice(j, 0, parent);
                        }
                    }
                }
            }
        }

        // Step 5
        // Need to find edges between L - 1 and L
        
        // get the raw edges for this layer in the form {'edge': [node1, node2], 'weight': x}
        var layer_edges = [];
        for(var j in layer[forward_edges]) {
            var e = layer[forward_edges][j];
            for(var k in e) {
                layer_edges.push(e[k]);
            }
        }

        //Make a map of prev_L for nodes with relevant edges
        var prev_L = compaction[i];
        var prev_L_node_map = {};
        var position = 0;
        for(var j=0; j<prev_L.length; j++) {
            var v = prev_L[j];
            if(v.sub_nodes) {
                if(layer[forward_edges][v.id]) {
                    prev_L_node_map[v.id] = position;
                    position++;
                }
            } else {
                for(var k in v.segs) {
                    var seg = v.segs[k];
                    prev_L_node_map[seg.id] = position;
                }
                position++;
            }
        }

        // Same for L
        var L_node_map = {};
        var position = 0;
        for(var j=0; j<L.length; j++) {
            var v = L[j];
            if(v.sub_nodes) {
                if(next_layer[backward_edges][v.id]) {
                    L_node_map[v.id] = position;
                    position++;
                }
            } else {
                for(var k in v.segs) {
                    var seg = v.segs[k];
                    L_node_map[seg.id] = position;
                }
                position++;
            }
        }

        // Assign an order to each edge between layer and next_layer:
        // [position in layer, position in next_layer]
        for(var j=0; j<layer_edges.length; j++) {
            var edge = layer_edges[j];
            edge.order = [prev_L_node_map[edge.edge[0].id],
                          L_node_map[edge.edge[1].id]];
        }

        // position just happens to be the number of nodes in L that have edges back to prev_L
        var crossings = count_crossings(layer_edges, position, next_layer[backward_edges], seg_begin, seg_end);

        // Step 6
        var alternating_L = copy_L(L);
        var last = 'node';
        for(var j=0; j<alternating_L.length; j++) {
            var item = alternating_L[j];
            if(last == 'node' && item.sub_nodes) {
                alternating_L.splice(j, 0, {'segs': []});
                last = 'segment';
            } else if(last == 'segment' && item.segs) {
                alternating_L[j - 1].segs = alternating_L[j - 1].segs
                    .concat(alternating_L.splice(j, 1)[0].segs);
                j--;
                last = 'segment';
            } else {
                last = last == 'node' ? 'segment' : 'node';
            }
        }
        if(last == 'node') {
            alternating_L.push({'segs': []});
        }
        next_layer.nodes = [];
        next_layer.segments = [];
        for(var j=0; j<alternating_L.length; j++) {
            if(j % 2) {
                next_layer.nodes.push(alternating_L[j]);
            } else {
                next_layer.segments.push(alternating_L[j]);
            }
        }
        return [crossings, compaction.concat([L]), alternating_L];
    }

    function align_vertically(graph, up_down, left_right) {
        var neighbors, edges;
        if(up_down) {
            neighbors = 'next_neighbors';
            edges = 'next_edges';
        } else {
            neighbors = 'prev_neighbors';
            edges = 'prev_edges';
        }
        var pos = left_right ? 'r_pos' : 'pos';
        for(var i=0; i<graph.e_compaction.length; i++) {
            var layer = graph.layers[i];
            var L = graph.e_compaction[i];
            if(left_right) {
                L.reverse();
            }
            var r = -1;
            for(var k=0; k<L.length; k++) {
                var v = L[k];
                var u = v[neighbors];
                if(u.length) {
                    if(left_right) {
                        u.reverse();
                    }
                    var proto_median = ((u.length + 1) / 2) - 1;
                    for(var m=Math.floor(proto_median); m<=Math.ceil(proto_median); m++) {
                        if(v.align == v) {
                            var n = u[m];
                            var edge = layer[edges][v.id][n.id];
                            if((!edge || !edge.marked) && r < n[pos]) {
                                n.align = v;
                                v.root = n.root;
                                v.align = v.root;
                                n.root.size = Math.max(n.root.size, v.size);
                                r = n[pos];
                            }
                        }
                    }
                    if(left_right) {
                        u.reverse();
                    }
                }
            }
            if(left_right) {
                L.reverse();
            }
        }
    }

    function place_block(v, delta, left_right) {
        var pos, pred;
        if(left_right) {
            pos = 'r_pos';
            pred = 'succ';
        } else {
            pos = 'pos';
            pred = 'pred';
        }
        if(v.y == null) {
            v.y = 0;
            var w = v;
            do {
                if(w[pos] > 0) {
                    var u = w[pred].root;
                    place_block(u, delta, left_right);
                    if(v.sink == v) {
                        v.sink = u.sink;
                    }
                    var delta = Math.ceil((10 * u.size) + 30);
                    if(v.sink != u.sink) {
                        if(left_right) {
                            u.sink.shift = Math.min(u.sink.shift, u.y - v.y + delta);
                        } else {
                            u.sink.shift = Math.min(u.sink.shift, v.y - u.y - delta);
                        }
                    } else {
                        if(left_right) {
                            v.y = Math.min(v.y, u.y - delta);
                        } else {
                            v.y = Math.max(v.y, u.y + delta);
                        }
                    }
                }
                w = w.align;
            } while(w != v);
        }
    }

    function compact_horizontally(graph, delta, left_right) {
        for(var i=0; i<graph.e_compaction.length; i++) {
            var L = graph.e_compaction[i];
            if(left_right) {
                L.reverse();
            }
            for(var j=0; j<L.length; j++) {
                var v = L[j];
                if(v.root == v) {
                    place_block(v, delta, left_right);
                }
            }
            if(left_right) {
                L.reverse();
            }
        }
        var y_coords = [];
        var min_coord = Infinity;
        var max_coord = -Infinity;
        for(var i=0; i<graph.e_compaction.length; i++) {
            var L = graph.e_compaction[i];
            if(left_right) {
                L.reverse();
            }
            var L_y = [];
            for(var j=0; j<L.length; j++) {
                var v = L[j];
                v.y = v.root.y;
                if(v.sink.shift < Infinity) {
                    v.y = v.y + v.sink.shift;
                }
                L_y.push(v.y);
                min_coord = Math.min(min_coord, v.y);
                max_coord = Math.max(max_coord, v.y);
            }
            if(left_right) {
                L.reverse();
                L_y.reverse();
            }
            y_coords.push(L_y);
        }
        var width = max_coord - min_coord;
        return {'y_coords': y_coords, 'width': width, 'max_coord': max_coord, 'min_coord': min_coord};
    }

    function order(graph) {
        var seg_begin = 'p';
        var seg_end = 'q';
        var forward_edges = 'next_edges';
        var backward_edges = 'prev_edges';
        var total_crossings = 0;
        var a = 0;
        var best = $.extend({'crossings': Infinity, 'compaction': []}, graph);
        var layer = graph.layers[0];
        var edge_types = ['prev_edges', 'next_edges'];
        var marked_types = ['prev_marked', 'next_marked'];
        var Li = [{'segs': []}];
        for(var i=0; i<layer.nodes.length; i++) {
            Li.push(layer.nodes[i]);
            Li.push({'segs': []});
        }
        do {
            var old_total_crossings = total_crossings;
            total_crossings = 0;
            var compaction = [layer.nodes.slice(0)];
            for(var i=0; i<graph.layers.length - 1; i++) {
                var results = minimize_crossings(graph, Li, i, compaction, seg_begin, seg_end,
                                                 forward_edges, backward_edges);
                total_crossings += results[0];
                compaction = results[1];
                Li = results[2];
            }
            console.log(a, total_crossings);
            var difference = Math.abs(total_crossings - old_total_crossings);
            if(total_crossings < best.crossings) {
                best.crossings = total_crossings;
                best.compaction = compaction;
                best.prev_marked = [];
                best.next_marked = [];
                for(var i=0; i<graph.layers.length; i++) {
                    var layer = graph.layers[i];
                    for(var j=0; j<edge_types.length; j++) {
                        var node1_ids = layer[edge_types[j]];
                        var hash = {};
                        for(var node1_id in node1_ids) {
                            var node2_ids = node1_ids[node1_id];
                            hash[node1_id] = {};
                            for(var node2_id in node2_ids) {
                                hash[node1_id][node2_id] = node2_ids[node2_id].marked;
                            }
                        }
                        var marked = marked_types[j];
                        best[marked].push(hash);
                    }
                }
                if(seg_begin == 'q') {
                    best.compaction.reverse();
                    best.prev_marked.reverse();
                    best.next_marked.reverse();
                }
            }

            // Go backwards
            var holder = seg_begin;
            seg_begin = seg_end;
            seg_end = holder;
            holder = forward_edges;
            forward_edges = backward_edges;
            backward_edges = holder;
            graph.layers.reverse();
            a++;
        } while(a < 20);

        if(a % 2) {
            graph.layers.reverse();
        }

        for(var i=0; i<graph.layers.length; i++) {
            var layer = graph.layers[i];
            for(var j=0; j<edge_types.length; j++) {
                var node1_ids = layer[edge_types[j]];
                var marked = marked_types[j];
                for(var node1_id in node1_ids) {
                    var node2_ids = node1_ids[node1_id];
                    for(var node2_id in node2_ids) {
                        node2_ids[node2_id].marked = best[marked][i][node1_id][node2_id];
                    }
                }
            }
        }

        //Un-segmentify the compaction
        best.e_compaction = [];
        for(var i=0; i<best.compaction.length; i++) {
            var L = best.compaction[i].slice(0);
            for(var j=0; j<L.length; j++) {
                var v = L[j];
                if(v.segs) {
                    segs = v.segs.slice(0);
                    // Remove v from L and put the segs from v directly into L
                    L.splice(j, 1);
                    while(segs.length) {
                        L.splice(j, 0, segs.pop());
                    }
                }
            }
            best.e_compaction.push(L);
        }

        best.layers = graph.layers;
        neighborify(best);
        return best;
    }

    function neighborify(graph) {
        for(var i=0; i<graph.layers.length; i++) {
            var L = graph.e_compaction[i];
            var layer = graph.layers[i];
            
            for(var j=0; j<L.length; j++) {
                var v = L[j];
                for(var k in layer.prev_edges[v.id]) {
                    var prev_node = layer.prev_edges[v.id][k].edge[1];
                    if($.inArray(v, prev_node.next_neighbors) == -1 && prev_node != v) {
                        prev_node.next_neighbors.push(v);
                    }
                }
                for(var l in layer.next_edges[v.id]) {
                    var next_node = layer.next_edges[v.id][l].edge[1];
                    if($.inArray(v, next_node.prev_neighbors) == -1 && next_node != v) {
                        next_node.prev_neighbors.push(v);
                    }
                }
                if(j > 0) {
                    v.pred = L[j - 1];
                }
                if(j < L.length - 1) {
                    v.succ = L[j + 1];
                }
                // Reset the pos, because the current configuration probably won't be the same as the last time through
                // the crossing reduction
                v.pos = j;
                v.r_pos = L.length - j - 1;
            }
        }
    }

    function place_nodes(graph, delta) {
        var l_alignments = [];
        var r_alignments = [];
        var alignments = [];
        for(var i in ['up', 'down']) {
            i = parseInt(i);
            if(i) {
                graph.compaction.reverse();
                graph.e_compaction.reverse();
                graph.layers.reverse();
            }
            for(var j in ['left', 'right']) {
                j = parseInt(j);
                initialize_nodes(graph);
                align_vertically(graph, i, j);
                var alignment = compact_horizontally(graph, delta, j);
                if(i) {
                    alignment.y_coords.reverse();
                }
                // if(alignment.min_coord != 20) {
                //     var shift = -alignment.min_coord + 20;
                //     for(var k=0; k<graph.e_compaction.length; k++) {
                //         var L = graph.e_compaction[k];
                //         for(var l=0; l<L.length; l++) {
                //             L[l].y += shift;
                //         }
                //     }
                // }
                // debugger;
                // draw_graph('paper', graph);
                alignments.push(alignment);
                if(j) {
                    r_alignments.push(alignment);
                } else {
                    l_alignments.push(alignment);                    
                }
            }
            if(i) {
                graph.compaction.reverse();
                graph.e_compaction.reverse();
                graph.layers.reverse();
            }
        }
        // Choose narrowest alignment
        var narrowest = {'width': Infinity};
        for(var i=0; i<alignments.length; i++) {
            var alignment = alignments[i];
            if(alignment.width < narrowest.width) {
                narrowest = alignment;
            }
        }

        // Align to narrowest
        var lr_alignments = [l_alignments, r_alignments];
        for(var h=0; h<lr_alignments.length; h++) {
            var min_or_max = h ? 'max_coord' : 'min_coord';
            for(var i=0; i<lr_alignments[h].length; i++) {
                var alignment = lr_alignments[h][i];
                var delta = alignment[min_or_max] - narrowest[min_or_max];
                if(delta != 0) {
                    for(var j=0; j<alignment.y_coords.length; j++) {
                        var L = alignment.y_coords[j];
                        for(var k=0; k<L.length; k++) {
                            L[k] -= delta;
                        }
                    }
                }
            }
        }

        // Set y coordinates
        var min_y = Infinity;
        var max_y = -Infinity;
        for(var i=0; i<graph.e_compaction.length; i++) {
            var L = graph.e_compaction[i];
            for(var j=0; j<L.length; j++) {
                var v = L[j];
                var v_coords = [alignments[0].y_coords[i][j],
                                alignments[1].y_coords[i][j],
                                alignments[2].y_coords[i][j],
                                alignments[3].y_coords[i][j]];

                v_coords.sort(function(a, b) { return a - b; });
                // Set the y coordinate to be the average median (rounded) of the four alignments
                v.y = Math.round((v_coords[1] + v_coords[2]) / 2);
                // v.y = alignments[0].y_coords[i][j];
                min_y = Math.min(v.y, min_y);
                max_y = Math.max(v.y + (v.size * 10), max_y);
            }
        }

        // For now, just make sure there's no negative y values
        var width = max_y - min_y;
        var center = width / 2;
        if(min_y != 20) {
            var shift = -min_y + 20;
            max_y += shift;
            for(var i=0; i<graph.layers.length; i++) {
                var layer = graph.layers[i];
                for(var j=0; j<layer.nodes.length; j++) {
                    layer.nodes[j].y += shift;
                }
            }
        }
        graph.max_x = graph.e_compaction[graph.e_compaction.length - 1][0].x
        graph.max_y = max_y;

        for(var i=0; i<graph.char_nodes.length; i++) {
            var c_nodes = graph.char_nodes[i];
            var posen = 0;
            for(var j=0; j<c_nodes.nodes.length; j++) {
                posen += c_nodes.nodes[j].pos;
            }
            c_nodes.avg_pos = posen / j;
        }
        graph.char_nodes.sort(function(a, b) {
            return a.avg_pos - b.avg_pos;
        });
    }

    function initialize_nodes(graph) {
        for(var i=0; i<graph.e_compaction.length; i++) {
            var L = graph.e_compaction[i];
            for(var j=0; j<L.length; j++) {
                var v = L[j];
                v.root = v;
                v.align = v;
                v.sink = v;
                v.shift = Infinity;
                v.size = v.sub_nodes ? v.sub_nodes.length : v.nodes[0].sub_nodes.length;
                v.y_delta = 0;
                v.y = null;
            }
        }
    }

    function draw_graph(paper_id, graph) {
        var paper_jq = $('#' + paper_id);
        paper_jq.children().remove();
        var body = $('body');
        var original_scale = Math.min(paper_jq.width() / graph.max_x, paper_jq.height() / graph.max_y);
        var scale = original_scale;
        paper_jq.svg({
            'onLoad': function(svg) {
                var g = svg.group('graph');
                var pov = svg.group(g, 'pov', {'stroke-width': 2});
                var non_pov = svg.group(g, 'non_pov', {'stroke-width': 1});
                var death_icon_settings = {'fill': 'black'};
                var undeath_icon_settings = {'stroke': 'black', 'fill': 'white'};
                for(var i=0; i<graph.char_nodes.length; i++) {
                    var c_nodes = graph.char_nodes[i];
                    var edge_arr = ['M'];
                    var box_arr = ['M'];
                    var box_arr = ['M'];
                    var dead_arr = [];
                    var back_box_arr = ['z'];
                    var short_name = c_nodes.character.short_name;
                    var deaths = [];
                    var undeaths = [];
                    var dead = false;
                    for(var j=0; j<c_nodes.nodes.length; j++) {
                        var node = c_nodes.nodes[j];
                        if(j) {
                            if(dead) {
                                edge_arr.push('M');
                                box_arr.push('M');
                                dead_arr.push('L');
                            } else {
                                edge_arr.push('L');
                                box_arr.push('L');
                            }
                        }
                        var edge_y = node.y + node.y_delta;
                        var box_y = edge_y - 4;
                        var back_box_y = edge_y + 4;
                        edge_arr.push(node.x + ' ' + edge_y);
                        box_arr.push(node.x + ' ' + box_y);
                        if(dead) {
                            dead_arr.push(node.x + ' ' + edge_y);
                        }
                        if(node.duration) {
                            if(dead) {
                                dead_arr.push('h' + node.duration);
                            } else {
                                edge_arr.push('h' + node.duration);
                            }
                            box_arr.push('h' + node.duration);
                            back_box_arr.push('h-' + node.duration);
                        }

                        var dur = node.x + node.duration;
                        if(j < c_nodes.nodes.length - 1) {
                            back_box_arr.push('L' + dur + ' ' + back_box_y);
                        }
                        if(node.deaths && _.include(node.deaths, short_name)) {
                            deaths.push([dur, edge_y, 5]);
                            if(!dead) {
                                dead_arr.push('M' + dur + ' ' + edge_y);
                                dead = true;
                            }
                        }
                        if(node.undeaths && _.include(node.undeaths, short_name)) {
                            undeaths.push([dur, edge_y, 5]);
                            dead = false;
                        }
                        node.y_delta += 15;
                    }
                    var group = c_nodes.character.pov ? pov : non_pov;
                    box_arr.push('v8');
                    back_box_arr.reverse();
                    
                    var char_group = svg.group(group,
                                               short_name + '_group',
                                               {'stroke-width': 'inherit'});
                    var box = svg.path(char_group,
                                       box_arr.concat(back_box_arr).join(''),
                                       {'id': short_name + '_box',
                                        'class': 'box',
                                        'fill': 'none'});
                    var p = svg.path(char_group,
                                     edge_arr.join(''),
                                     {'id': short_name,
                                      'stroke': group_colors[c_nodes.character.group],
                                      'stroke-width': 'inherit',
                                      'stroke-linecap': 'round',
                                      'stroke-linejoin': 'round',
                                      'fill': 'none'});
                    if(dead_arr.length > 1) {
                        svg.path(char_group,
                                 dead_arr.join(''),
                                 {'id': short_name + '_dead',
                                  'stroke': group_colors[c_nodes.character.group],
                                  'stroke-width': 'inherit',
                                  'stroke-linecap': 'round',
                                  'stroke-linejoin': 'round',
                                  'stroke-dasharray': '10',
                                  'fill': 'none'});
                    }
                    for(var j=0; j<deaths.length; j++) {
                        var death = deaths[j];
                        svg.circle(char_group, death[0], death[1], death[2], death_icon_settings);
                    }
                    for(var j=0; j<undeaths.length; j++) {
                        var undeath = undeaths[j];
                        svg.circle(char_group, undeath[0], undeath[1], undeath[2], undeath_icon_settings);
                    }
                }
                svg.change(g, {'transform': 'scale(' + original_scale + ')'});
                $(g).mouseover(function(e) {
                    if(e.target.className.baseVal == 'box') {
                        var parent_stroke = e.target.parentNode.parentNode.getAttribute('stroke-width');
                        var corrected_scale = scale > 1 ? 4 / scale : 4;
                        svg.change(e.target.nextElementSibling, {'stroke-width': parent_stroke});
                        $(e.target.nextElementSibling).animate({'svgStrokeWidth': corrected_scale}, 200);
                    }
                });
                $(g).mouseout(function(e) {
                    if(e.target.className.baseVal == 'box') {
                        var parent_stroke = e.target.parentNode.parentNode.getAttribute('stroke-width');
                        $(e.target.nextElementSibling).animate({'svgStrokeWidth': parent_stroke}, 200);
                        svg.change(e.target.nextElementSibling, {'stroke-width': 'inherit'});
                    }
                });
            },
            'settings': {'width': body.width(),
                         'height': body.height() - 15}
            }
        );

        var translate = {'x': 0, 'y': 0};
        var svg = paper_jq.svg('get');
        var g = svg.getElementById('graph');
        var pov = svg.getElementById('pov');
        var non_pov = svg.getElementById('non_pov');
        var old_scale;
        function zoom_graph(e, delta) {
            old_scale = scale;
            scale = Math.min(10, Math.max(.05, scale * Math.pow(1.2, (delta / Math.abs(delta)))));
            if(scale != old_scale) {
                var k = scale / old_scale;
                translate = {'x': e.pageX + (k * (translate.x - e.pageX)),
                             'y': e.pageY + (k * (translate.y - e.pageY))};
                svg.change(g, {'transform': 'translate(' + translate.x + ',' + translate.y + '), scale(' + scale + ')'});
                if(scale > 1) {
                    svg.change(pov, {'stroke-width': 2 / scale});
                    svg.change(non_pov, {'stroke-width': 1 / scale});
                }
            }
            return false;
        }

        paper_jq.mousewheel(zoom_graph);
        paper_jq.dblclick(function(e) {
            var in_out;
            if(e.which == 1) {
                in_out = 1;
            } else if(e.which == 3) {
                in_out = -1;
            }
            if(in_out) {
                zoom_graph(e, in_out);
            }
        });

        var mouse_position;
        paper_jq.mousedown(function(e) {
            mouse_position = {'x': e.pageX, 'y': e.pageY};
            original_translate = $.extend({}, translate);
            paper_jq.mousemove(function(e) {
                translate = {'x': original_translate.x + e.pageX - mouse_position.x,
                             'y': original_translate.y + e.pageY - mouse_position.y};

                svg.change(g, {'transform': 'translate(' + translate.x + ',' + translate.y + '), scale(' + scale + ')'});
            });
        });

        paper_jq.mouseup(function(e) {
            paper_jq.unbind('mousemove');
        });

        for(var i in graph.flat_nodes) {
            var node = graph.flat_nodes[i];
            var c = svg.circle(g, node.x, node.y, 10, {'fill': 'red'});

            (function(node) {
                $(c).click(function() {
                    console.log(node);
                });
            })(node);
        }

        // for(var i in graph.p_nodes) {
        //     var node = graph.p_nodes[i];
        //     var c = paper.circle(node.x, node.y, 6).attr({'fill': 'green'});

        //     (function(node) {
        //         $(c.node).click(function() {
        //             console.log(node);
        //         });
        //     })(node);
        // }

        // for(var i in graph.q_nodes) {
        //     var node = graph.q_nodes[i];
        //     var c = paper.circle(node.x, node.y, 6).attr({'fill': 'blue'});

        //     (function(node) {
        //         $(c.node).click(function() {
        //             console.log(node);
        //         });
        //     })(node);
        // }

        // for(var i in graph.r_nodes) {
        //     var node = graph.r_nodes[i];
        //     var c = paper.circle(node.x, node.y, 6).attr({'fill': 'yellow'});

        //     (function(node) {
        //         $(c.node).click(function() {
        //             console.log(node);
        //         });
        //     })(node);
        // }
    }

    var height = $(window).height();
    var mid_y = Math.floor(height / 2);
    var width = $(window).width();
    $('#paper').height(height);
    $('#paper').width(width);

    var graph = make_edges(layers, 100);
    var ordered_graph = order(graph);
    place_nodes(ordered_graph, 20);
    draw_graph('paper', ordered_graph);

});
