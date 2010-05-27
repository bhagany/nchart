window.asoiaf = {};

$(function() {
    var conf = {'group_styles': {'pov': {'stroke-width': 3}}};
    var chart = new NChart('paper', asoiaf.characters, asoiaf.layers, conf).draw();
});
