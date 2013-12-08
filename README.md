SimpleJavascriptLib
===================

Learning more about Javascript while making a small
library for ourselves so we can make HTML5 games easier.

Right now I mostly use it to make drawing to a canvas very fast and easy. I would later
like to make it so I can do stuff like read image data, get sprites froms spritesheets, and
other stuff that I might typically do when making games (mostly for gamejams)

#Using

There is a quick function to call for setting up the canvas you're drawing to.

```js
  // (CanvasID, the canvas width, height, and the context type)
  setCanvasInfo("CanvasID", canvasWidth, canvasHeight, "2d");
```

Additional functions, found in setup.js, can then be called as shorthands for drawing boxes, text, images, and backgrounds.

There is also a ```Block``` object that can be created with simple physics. However the physics are kind of messed up right now.

While the code is probably extremely amatuer it's something for myself and others to use in gamejams or personal projects.
