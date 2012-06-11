(function(window) {
    //var conf = {'debug': {'direction': 1, 'features': ['nodes', 'classes', 'blocks'], 'wireframe': true}};
    var conf = {};
    var chart = new NChart('paper', starwars.characters, starwars.layers, conf).calc().plot().draw();
})(window);
