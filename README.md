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
  setCanvasInfo("joe", canvasWidth, canvasHeight, "2d");
```

Additional functions, found in setup.js, can then be called as shorthands for drawing boxes, text, images, and backgrounds.

There is also a ```Block``` object that can be created with simple physics. However the physics are kind of messed up right now.

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

Additionally, click events can be added relatively easily (not that it was already simple). Unfortunately, it only works with one canvas at a time. :(

```js
  // Set the canvas that is being clicked
  setClickCanvas("joe"); // joe is the id of the canvas
  
  addCanvasMouseDown(function(event) {
      // stuff
    });
```

While the code is probably extremely amatuer it's something for myself and others to use in gamejams or personal projects.
