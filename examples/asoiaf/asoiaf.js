(function(window) {
    var debug = {'features': ['nodes'], 'wireframe': false};
    var conf = {'group_styles': {'pov': {'stroke-width': 3}},
                'debug': null};
    var chart = new NChart('paper', asoiaf.characters, asoiaf.layers, conf).calc().plot().draw();
})(window);
