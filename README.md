# inView
A function returning current elements in the browser viewport.

##Usage
```
var elements = inView('.selector', selection, offset);
```

###Optional Arguments

####selection
Type: `String` Default value: `all`

Define the boundaries of the viewport.

* `all`: If any part of an element is in the viewport
* `inner`: Whole element must be inside the viewport
* `top`: Any elements that are at the top of the viewport
* `bottom`: Any elements that are at the bottom of the viewport

####offset
Type: `Integer` Default value: `0`

Offset the viewport by a pixel amount. Handy for lazy-loading images before they enter the screen.

##Release History

v1.0.1 - Added readme