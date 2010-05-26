window.asoiaf = {};

$(function() {
    var chart = new NChart('paper', asoiaf.characters, asoiaf.layers).draw();
});
