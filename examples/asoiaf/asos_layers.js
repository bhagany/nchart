(function(window) {
    var layers = [
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
             {'sub_nodes': ['tommen']},
             {'sub_nodes': ['margaery']},
             {'sub_nodes': ['gregor']},
             {'sub_nodes': ['robb', 'grey wind', 'brynden']},
             {'sub_nodes': ['cat']},
             {'sub_nodes': ['brienne', 'jaime']},
             {'sub_nodes': ['jeor', 'sam']},
             {'sub_nodes': ['aemon']},
             {'sub_nodes': ['beric']},
             {'sub_nodes': ['lysa', 'robert_a']},
         ]
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
             {'sub_nodes': ['lysa', 'robert_a']}
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
             {'sub_nodes': ['sansa', 'petyr', 'lysa', 'robert_a'],
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
             {'sub_nodes': ['sansa', 'petyr', 'robert_a']},
             {'sub_nodes': ['jon', 'ghost', 'aemon', 'stannis', 'melisandre', 'sam']},
             {'sub_nodes': ['cersei', 'ilyn', 'pycelle', 'loras', 'tommen', 'margaery', 'jaime', 'gregor']},
             {'sub_nodes': ['tyrion']},
             {'sub_nodes': ['varys']},
             {'sub_nodes': ['brienne']},
             {'sub_nodes': ['arya']},
             {'sub_nodes': ['sandor']},
             {'sub_nodes': ['davos']},
             {'sub_nodes': ['daenerys', 'drogon', 'rhaegal', 'viserion', 'barristan']},
             {'sub_nodes': ['jorah']},
             {'sub_nodes': ['bran', 'summer', 'meera', 'jojen', 'coldhands']},
             {'sub_nodes': ['rickon', 'shaggydog']},
             {'sub_nodes': ['brynden']},
             {'sub_nodes': ['gendry']},
             {'sub_nodes': ['theon']},
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