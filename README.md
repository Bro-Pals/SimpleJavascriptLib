A small library I use for making javascript games.

I mostly use it for game jams, but feel free to use it for anything you want.


The library is being refactored currently to be more organized.

Add this line above your other scripts you have on your webpage:

```
  <script src="SimpleLibrary/BroPalsJSLib.js"></script>
```

Now to get a copy of the API call the following line

```
  var api = createBroPalsAPI();
```

This returns an obejct that contains all the functions to do things like drawing rectanbles, load and draw images, and ... that's it so far, but it's very easy to do those things.

```
  var api = createBroPalsAPI();
	api.setCanvasInfo("canvasID", "2d");
	
	// load an image with a key, and use that key 
	// to reference the image for drawing
	api.loadImage("testImage", "img/testImage.png");
	api.drawImage("testImage", 0, 0);
	api.drawImageScaled("testImage", 100, 100, 40, 30);
	
	// draw rectangles or fill the background
	api.drawRect(50, 50, 100, 100, "#000000");
	api.fillBackgroundSolidColor("#ff00ff");
```

As time passes I will add in the rest of the basic objects and features that are in the older files.
