# nchart

Nchart was inspired by an [xkcd comic](http://xkcd.com/657/ "Movie Narrative Charts"), and is implemented in JavaScript. You feed it a representation of a story - basically what characters in the story are together at each point - and nchart constructs a graph from it. Then, using a series of graph layout techniques (mostly variations on Sugiyama-style layered graph drawing), it plots the graph in a hopefully pleasing way, by attempting to minimize the number of edge crossings and maximizing straight lines. The graph is then actually drawn in the browser using SVG, though I have made the drawing portion pluggable, and I plan on implementing a Canvas drawer soon. The project layout still betrays its roots as an exploratory exercise, and is thus kind of messy, so I'll try to explain the most important parts here. Almost all the meat of the project is in nchart.js; I think it would be fair to say that this file is the whole project, and everything else is just support files, like Google's Closure library, or examples. Also, here's an example of it in action, using [A Game of Thrones](http://bhagany.github.com/nchart/agot.html) (the book, not the show, and more examples below).

## Method overview

To understand what's going on with this code, it's necessary to understand at least a bit of graph theory.  For our purposes, it's useful to think of each grouping of characters at a particular point in the story as a node in a graph.  Likewise, characters moving from one grouping to the next form the edges in that graph.  So, for instance, at the beginning of the Star Wars chart, Vader is in a group by himself, while Leia and R2-D2 form another group.  Each of these groups are nodes, and later, when Vader and Leia form a new node, there are edges from there back to their previous nodes.  For any narrative, such a graph is _directed_, that is, the edges have a direction encoded into them because the characters go from A to B, but not from B to A along the same edge.  If the story doesn't involve time travel, it is also _acyclic_, meaning that a path never loops back on itself.  Further, such a graph is _layered_, because each vertical slice (aka, layer) of the graph represents the same moment in time for all the characters.

It turns out that the drawing of such graphs in an aesthetically pleasing way has been the subject of a decent amount of scholarly mathematical literature.  I chose what seems to be the agreed-upon best approach, which was originally published by Sugiyama, Tagawa, and Toda in an article titled "Methods for visual understanding of hierarchical system structures."  I haven't read it because I'm cheap and it's behind a paywall, but there are plenty of other papers that propose refinements to their general method, which is usually called "Sugiyama-style graph drawing" or "Sugiyama's algorithm" or some variation on that.  Anyway, due to all of the secondary literature, it's not too hard to get a complete understanding of the method without reading the original paper.  I've added several of the papers that were the most helpful and influential for this project under the papers directory.  To my knowledge none are copyrighted, and I obtained them for free, mostly using Google Scholar.  If you decide to read them, be aware that everyone in the literature orients their graphs in a top-to-bottom manner, rather than left-to-right as we do for nchart, so you have to mentally rotate what they're saying by 90°.  By the way - what a world we live in; someone with no formal mathematical training beyond Calc I not only has access to recently discovered knowledge in a relatively obscure field (to the general public), but also access to enough information to allow them to understand and use that knowledge, all for free.  The internet is freaking fantastic.

There are several things to take into account if you want to draw nice looking layered acyclic digraphs.  The most important are:

1. Minimize edge crossings
1. Maximize long, straight lines that are perpendicular to your layers

Unfortunately, figuring out the absolute minimum number of edge crossings for the whole graph is NP-complete.  But, Sugiyama's method offers a way to get a usually reasonable local minimum in a sane amount of time.  Very broadly, it goes like this:

- Given a layered graph, start at the left and create an ordering by placing each node in its layer based on the relative position of its parent node(s) in the preceding layer.
- Once this is done repeat the process starting from the right, and using the previous ordering as a starting point
- Perform this back-and-forth ordering method for as long as is reasonable.  In all the graphs I've tried, the algorithm gets stuck in a cycle and you can abort once you detect it, but it's possible that there are graphs that don't cause this behavior, or cause it after a very long time.  In those cases, you want to limit it based on how long you want it to run.  Currently, nchart has a ceiling of 30 passes over the graph.

This should take care of number 1 above.  To place the nodes for maximizing long, straight runs, nchart uses an algorithm published by Brandes and Köpf in "Fast and Simple Horizontal Coordinate Assignment".  Glossing over some of the finer details, the algorithm actually creates four separate alignments and averages them to produce the final placement of each node.  The individual alignments are produced by the following permutations:

- Push nodes as far up as possible, and align based on children
- Push nodes as far up as possible, and align based on parents
- Push nodes as far down as possible, and align based on children
- Push nodes as far down as possible, and align based on parents

Brandes and Köpf have several helpful pictures in their paper, if that's a little hard to visualize.

From there, it's just tweaking things for nchart's special case, like allowing for nodes of varying widths, drawing edges that consist of multiple lines, and adding icons to symbolize a character's death or disappearance.  And, of course, the actual drawing.

Nchart certainly is not completed yet - there are bugs, browser inconsistencies, and quite a few tweaks I'd like to make that will increase the aesthetics of the graphs.  There's also no documentation about the actual API because it is quite liable to change.  All of that will come, but I hope you enjoy it even in this rough state.

## Examples

- [A Game of Thrones](http://bhagany.github.com/nchart/examples/asoiaf/agot.html)
- [A Clash of Kings](http://bhagany.github.com/nchart/examples/asoiaf/acok.html)
- [A Storm of Swords](http://bhagany.github.com/nchart/examples/asoiaf/asos.html)
- [A Song of Ice and Fire, the first 3 books](http://bhagany.github.com/nchart/examples/asoiaf/asoiaf.html) (this is all three of the preceding graphs, put together)
- [Star Wars](http://bhagany.github.com/nchart/examples/starwars/starwars.html) (For direct comparison with the xkcd version)
