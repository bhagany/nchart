window.asoiaf = {};

$(function() {
    var chart = new NChart('paper', asoiaf.character_info, asoiaf.layers).draw();
});
