(function(window) {
    var layers = [
        // A Dance With Dragons
        // 1. Prologue - Varamyr I
        {'duration': 10,
         'nodes': [
             {
                 'characters': ['varamyr'],
                 'stateChanges': {
                     'varamyr': ['undead']
                 }
             },
             // Character Intros
             {'characters': ['illyrio']},
             {'characters': ['tyrion']},
             {'characters': ['daenerys', 'drogon', 'rhaegal', 'viserion', 'barristan']},
             {'characters': ['jon', 'ghost', 'aemon', 'stannis', 'melisandre', 'sam']},
             {'characters': ['bran', 'summer', 'meera', 'jojen', 'coldhands']},
             {'characters': ['theon']},
         ],
        },
        // 2. Tyrion I
        {'duration': 10,
         'nodes': [
             {'characters': ['tyrion', 'illyrio']},
         ],
        },
        // 5. Bran I
        {'duration': 10,
         'nodes': [
             {'characters': ['bran', 'summer', 'meera', 'jojen', 'coldhands', 'varamyr']},
         ],
        },
        // 7. The Merchant's Man (Quentyn)
        {'duration': 10,
         'nodes': [
             {'characters': ['quentyn']}
         ],
        },
        // 8. Jon II
        {'duration': 10,
         'nodes': [
             {'characters': ['jon', 'ghost', 'aemon', 'stannis', 'melisandre', 'sam']},
             // Establish togetherness up to this point
             {'characters': ['tyrion', 'illyrio']},
             // Character intros
             {'characters': ['griff', 'aegon']}
         ],
        },
        // 9. Tyrion III
        {'duration': 10,
         'nodes': [
             {'characters': ['tyrion', 'griff', 'aegon']},
             {'characters': ['illyrio']},
             {'characters': ['aemon', 'sam']}
         ],
        },
        // 10. Davos I
        {'duration': 10,
         'nodes': [
             {'characters': ['davos']},
             // Drogon leaves somewhere around here
             {'characters': ['drogon']},
             // Establish togetherness up to this point
             {'characters': ['bran', 'summer', 'meera', 'jojen', 'coldhands', 'varamyr']},
             // Character intros
             {'characters': ['bloodraven']}
         ],
        },
        // 14. Bran II
        {'duration': 10,
         'nodes': [
             {'characters': ['bran', 'summer', 'meera', 'jojen', 'bloodraven', 'varamyr']},
             {'characters': ['coldhands']}
             // Establish togetherness up to this point
             {'characters': ['jon', 'ghost', 'stannis', 'melisandre']},
         ],
        },
        // 22. Jon V
        {'duration': 10,
         'nodes': [
             {'characters': ['jon', 'ghost', 'melisandre']},
             {'characters': ['stannis']}
             // Character intros
             {'characters': ['jorah']}
         ],
        },
        // 23. Tyrion VI
        {'duration': 10,
         'nodes': [
             {'characters': ['jorah', 'tyrion', 'griff']}
             // Character intros
             {'characters': ['asha']}
         ],
        },
        // 27. Asha I (The Wayward Bride)
        {'duration': 10,
         'nodes': [
             {'characters': ['asha', 'stannis']}
         ],
        },
        // 44. Daenerys VII
        {'duration': 10,
         'nodes': [
             {'characters': ['daenerys', 'quentyn', 'barristan', 'rhaegal', 'viserion']},
             // Character intros
             {'characters': ['jaime']},
             {'characters': ['brienne']}
         ],
        },
        // 49. Jaime I
        {'duration': 10,
         'nodes': [
             {'characters': ['jaime', 'brienne']}
         ],
        },
        // 53. Daenerys IX
        {'duration': 10,
         'nodes': [
             {'characters': ['daenerys', 'drogon']}
         ],
        },
        // 63. The Sacrifice (Asha III)
        {'duration': 10,
         'nodes': [
             {'characters': ['asha', 'theon', 'stannis']}
         ],
        },
        // 63. The Dragontamer (Quentyn IV)
        {'duration': 10,
         'nodes': [
             {
                 'characters': ['quentyn', 'barristan', 'rhaegal', 'viserion'],
                 'event': 'Rhaegal and Viserion released'
             }
         ],
        },
        // 70. Jon XIII
        {'duration': 10,
         'nodes': [
             {
                 'characters': ['jon', 'ghost', 'melisandre'],
                 'stateChanges': {
                     'jon': ['dead']
                 }
             },
         ],
        },
        // 71. The Queen's Hand (Barristan IV)
        {'duration': 10,
         'nodes': [
             {
                 'characters': ['quentyn', 'barristan', 'rhaegal', 'viserion'],
                 'stateChanges': {
                     'quentyn': ['dead']
                 }
             }
         ],
        }
    ];

    if(window.asoiaf == undefined) {
        window.asoiaf = {};
    }
    window.asoiaf.layers = layers;
})(window);
