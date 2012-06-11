var debug = {'features': ['nodes'], 'wireframe': true};
var conf = {'group_styles': {'pov': {'stroke-width': 3}},
            'debug': debug};
var chart = new NChart('paper', asoiaf.characters, asoiaf.layers, conf).calc().plot().draw();
$(function() {
});