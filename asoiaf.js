window.asoiaf = {};

$(function() {
    var story_graph = new StoryGraph('paper', asoiaf.character_info, asoiaf.layers).draw();
});
