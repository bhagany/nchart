(function(window) {
    var characters = {
        'luke': {'name': 'Luke',
                 'color': '#9d9d9d'},
        'leia': {'name': 'Leia',
                 'color': '#9d9d9d'},
        'obi-wan': {'name': 'Obi-Wan',
                    'color': '#9d9d9d'},
        'han': {'name': 'Han',
                'color': '#9d9d9d'},
        'lando': {'name': 'Lando',
                  'color': '#9d9d9d'},
        'vader': {'name': 'Vader',
                  'color': '#000000'},
        'emperor': {'name': 'Emperor',
                    'color': '#000000'},
        'chewie': {'name': 'Chewie',
                   'color': '#956b41'},
        'r2-d2': {'name': 'R2-D2',
                  'color': '#0073ec'},
        'c-3po': {'name': 'C-3PO',
                  'color': '#d2c800'},
        'yoda': {'name': 'Yoda',
                 'color': '#74c477'},
        'boba': {'name': 'Boba Fett',
                 'color': '#74c477'},
        'jabba': {'name': 'Jabba',
                  'color': '#74c477'},
        'greedo': {'name': 'Greedo',
                   'color': '#74c477'},
    };

    if(window.starwars == undefined) {
        window.starwars = {};
    }
    window.starwars.characters = characters;
})(window);