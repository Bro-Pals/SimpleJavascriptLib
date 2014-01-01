SimpleJavascriptLib
===================

Learning more about Javascript while making a small
library for ourselves so we can make HTML5 games easier.

Right now I mostly use it to make drawing to a canvas very fast and easy. I would later
like to make it so I can do stuff like read image data, get sprites froms spritesheets, and
other stuff that I might typically do when making games (mostly for gamejams)

The ```physics.js``` is horribly broken right now, and I've reproduced the less-broken form of it in ```simplephysics.js```, so if I were you I would use the latter because I still suck at physics code. :P

#Using the Canvas Drawing

These are things found in ```setup.js```

There is a quick function to call for setting up the canvas you're drawing to, then several other functions for shorthand versions of things I find myself drawing a lot.

```js
  // (CanvasID, the canvas width, height, and the context type)
  setCanvasInfo("joe", canvasWidth, canvasHeight, "2d");
  
  // things can now be drawn with variuous draw functions
  drawImage("ImageID", 40, 50); // (ImageId, x, y)
  drawText("Hello World!", "Arial 14px", "#FF0000", 100, 150) // (Messages, Font, Color, x, y)
  drawBox(30, 50, 100, 100, "#00FF00") // (x, y, width, height, Color)
  fillBackground("#FFFFFF") // filles the entire canvas with a Color
```

#Key Events

All the events are found in ```events.js```

You can also connect functions to events fairly easily. For connecting a function to a key press is fairly simple.

```js
  // (Keycode, function connected)
  connectKeyEvent(65, moveLeft);
  
  function moveLeft() {
    // move left
  }
```

If you don't want to keep looking up all the keycodes, there is also a table of the keycodes for all the common keys I normally use in projects.

```js
  // instead of looking up the keycode for the a key it's already in a table!
  connectKeyEvent(keyCodeRef.A, moveLeft);
```

#Canvas-Clicked events

Additionally, click events can be added relatively easily (not that it was already simple). Unfortunately, it only works with one canvas at a time. :(

```js
  // Set the canvas that is being clicked
  setClickCanvas("joe"); // joe is the id of the canvas
  
  // event: The event
  // x: The x position of the mouse on the canvas
  // y: the y position of the mouse on the canvas
  addCanvasMouseDown(function(event, x, y) {
      // stuff
    });
```

While the code is probably extremely amatuer it's something for myself and others to use in gamejams or personal projects.

#Copy-Paste for inclusion in a .html
```js
<script src="SimpleLibrary\setup.js"></script>
<script src="SimpleLibrary\simplephysics.js"></script>
<script src="SimpleLibrary\events.js"></script>
<script src="SimpleLibrary\gui.js"></script>
<script src="SimpleLibrary\sprites.js"></script>
```
