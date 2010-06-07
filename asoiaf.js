window.asoiaf = {};

$(function() {
    var debug = {'direction': 3, 'features': ['nodes', 'classes', 'blocks'], 'wireframe': false};
    var conf = {'group_styles': {'pov': {'stroke-width': 3}},
                'debug': debug};
    var chart = new NChart('paper', asoiaf.characters, asoiaf.layers, conf).calc().plot().draw();
});
