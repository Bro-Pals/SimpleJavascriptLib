
function createBroPalsAPI() {
	
	var setCanvas;
	var context;
	var canvasWidth;
	var canvasHeight;
	var looping = false;
	var start;
	var diff;
	var waitBetweenFrames = 1000/40; // 40 fps default
	
	/*
	 * The types of assets that can be stored
	 */
	var assets = {
		images : {},
		sounds : {}
	};
	
	/*
	 * An object to store references to screens
	 */
	var screens = {};
	/*
	 * The active screen. Initially undefined
	 */
	var activeScreen;
	
	/*
	 * Buttons on the screen. They must be enabled
	 */
	var buttons = {
		simple : {}
	};
	
	/*
	 * The sprites in the current screen.
	 */
	var sprites = {};
	
	/*
	 * The physics rectangles.
	 */
	var rectangles = {};
	rectangles["default"] = {}; // default rectangle group
	var nextDefaultRectKey = 0;
	var physicsRectangleProperties = ["x", "y", "velx", "vely", "accx", "accy",
			"width", "height", "enabled", "anchored", "collidable", "update", 
			"oncollide", "color", "borderColor", "borderSize"];
	
	/*
	 * Information about the mouse related to the active canvas
	 */
	var localMouseInfo = {
		lastClicked : [0, 0],
		position : [0, 0]
	};
	
	/*
	 * All of the events that there can be listeners for
	 */
	var listeners = {
		/*
		 * mousedown occurs when the mouse is pressed.
		 * The listener function will have two arguments, x and y, for 
		 * the position where the mouse is in the canvas.
		 */
		mousedown : [],
		/*
		 * mouseup occurs when the mouse is released.
		 * The listener function will have two arguments, x and y, for 
		 * the position where the mouse is in the canvas.
		 */
		mouseup : [],
		/*
		 * The keyevent occurs when a key is pressed or released. 
		 * The active canvas has to be focused for it to
		 * to fire.
		 */
		keyevent: [],
	};
	
	/*
	 * Functions that are called at an interval.
	 * Each element has three things:
	 * currTime - How much time is being counted right now.
	 * maxTime - How long each interval is. Can be a function.
	 * func - The function to call
	 */
	var intervalFunctions = [];
	
	/**
	 * Set the canvas to be used by the API.
	 * _id - the ID of the canvas in the document
	 * _contextType - The type of context to draw with (such as '2d')
	 */
	function setCanvasInfo(_id, _contextType) {
		var contextType;
		if (!_contextType) {
			contextType = "2d"; // default context
		} else {
			contextType = _contextType;
		}
		var canvas = document.getElementById(_id);
		context = canvas.getContext(contextType);
		canvasWidth = canvas.width;
		canvasHeight = canvas.height;
		
		if (setCanvas) {
			// clear listeners on a new canvas
			listeners["mousedown"] = [];
			listeners["mouseup"] = [];
			listeners["keydown"] = [];
			
			// remove all events from the old canvas
			canvas.removeEventListener('mousedown',handleMouseDown, false);
			canvas.removeEventListener('mouseup',handleMouseUp, false);
			canvas.removeEventListener('keydown',handleKeyDown, false);
			canvas.removeEventListener('keyup',handleKeyUp, false);
			canvas.removeEventListener('mousemove',handleMouseMove, false);
		}
		
		canvas.addEventListener('mousedown',handleMouseDown, false);
		canvas.addEventListener('mouseup',handleMouseUp, false);
		canvas.addEventListener('keydown',handleKeyDown, false);
		canvas.addEventListener('keyup',handleKeyUp, false);
		canvas.addEventListener('mousemove',handleMouseMove, false);
		
		/* canvas focus http://www.dbp-consulting.com/tutorials/canvas/CanvasKeyEvents.html */
		canvas.setAttribute('tabindex','0');
		canvas.focus();
		setCanvas = true;
	}
	
	/**
	 * Draw a rectangle to the canvas.
	 * _x, _y, _w, _h - The x and y position, the width and the height of the rectangle
	 * _color - The color of the rectangle (such as '#FF0000' for red)
	 */
	function drawRect(_x, _y, _w, _h, _color) {
		if (!setCanvas) {
			console.error("BroPalsJSLib: No canvas has been set yet");
			return;
		}
		context.fillStyle = _color;
		context.fillRect(_x, _y, _w, _h);
	}
	
	/**
	 * Fill in the entire background of the canvas with one color
	 * _color - The color of the background
	 */
	function fillBackgroundSolidColor(_color) {
		if (!setCanvas) {
			console.error("BroPalsJSLib: No canvas has been set yet");
			return;
		}
		drawRect(0, 0, canvasWidth, canvasHeight, _color);
	}
	
	/**
	 * Load an image to the API.
	 * _key - The key to reference the image for drawing it.
	 * _path - The path (preferably relative path) of the image
	 */
	function loadImage(_key, _path) {
		if (_key in (assets.images)) {
			console.error("BroPalsJSLib: An image with the key " + _key + " already exists");
			return;
		}
		var img = document.createElement("img");
		img.src = _path;
		img.id = _key;
		img.style.display="none";
		Object.defineProperty((assets.images), _key, {
			value : img,
			enumerable : true,
		});
	}
	
	/**
	 * Check whether or not an image has fully loaded and is read to draw.
	 * _key - The key used to reference the image.
	 */
	function readyToDraw(_key) {
		return context && assets.images[_key] && assets.images[_key].complete;
	}
	
	/**
	 * Draw an image to the canvas.
	 * _key - The key used to reference the image.
	 * _x, _y - The x and y position to draw the image at.
	 */
	function drawImage(_key, _x, _y) {
		if (!setCanvas) {
			console.error("BroPalsJSLib: No canvas has been set yet");
			return;
		}
		if (!readyToDraw(_key)) {
			console.error("BropalsJSLib: The image with the " + _key + " has not " +
				"finished loading yet; make a delay after loading before drawing");
			return;
		}
		context.drawImage(assets.images[_key]/*document.getElementById(_key)*/, _x, _y);
	}
	
	/**
	 * Draw an image to the canvas, scaling it.
	 * _key - The key used to reference the image.
	 * _x, _y - The x and y position to draw the image at.
	 * _w, _h - The width and height the image will be scaled fit.
	 */
	function drawImageScaled(_key, _x, _y, _w, _h) {
		if (!setCanvas) {
			console.error("BroPalsJSLib: No canvas has been set yet");
			return;
		}
		if (!readyToDraw(_key)) {
			console.error("BropalsJSLib: The image with the " + _key + " has not " +
				"finished loading yet; make a delay after loading before drawing");
			return;
		}
		context.drawImage(assets.images[_key], _x, _y, _w, _h);
	}
	
	/**
	 * Draw an image to the canvas, scaling it.
	 * _key - The key used to reference the image.
	 * _x, _y - The x and y position to draw the image at.
	 * _r - the angle in radians to rotate the image
	 */
	function drawImageRotated(_key, _x, _y, _r) {
		if (!setCanvas) {
			console.error("BroPalsJSLib: No canvas has been set yet");
			return;
		}
		if (!readyToDraw(_key)) {
			console.error("BropalsJSLib: The image with the " + _key + " has not " +
				"finished loading yet; make a delay after loading before drawing");
			return;
		}
		var imgR = assets.images[_key]
		context.translate(_x+(imgR.width/2), _y+(imgR.height/2));
		context.rotate(_r);
		context.drawImage(imgR, -(imgR.width/2), -(imgR.height/2));
		context.rotate(-_r);
		context.translate(-_x-(imgR.width/2), -_y-(imgR.height/2));
	}
	
	/**
	 * Set the font for drawing text
	 * _font - The font to draw with (such as '12 Arial' for 12pt Arial font)
	 * _color - The color of the font (such as '#FF0000' for red)
	 */
	function setFont(_font, _color) {
		context.font=_font;
		context.fillStyle=_color;
	}
	
	/**
	 * Draw text using the currently set font
	 * _text - The string to draw.
	 * _x, _y - The position the text will be drawn at
	 */
	function drawText(_text, _x, _y) {
		if (!setCanvas) {
			console.error("BroPalsJSLib: No canvas has been set yet");
			return;
		}
		context.fillText(_text, _x, _y);
	}
	
	/**
	 * Load an audio file to the API.
	 * _key - The key to reference the audio file for playing it.
	 * _path - The path (preferably relative path) of the audio file
	 */
	function loadAudio(_key, _path) {
		if (_key in (assets.sounds)) {
			console.error("BroPalsJSLib: A sound with the key " + _key + " already exists");
			return;
		}
		var sound = document.createElement("audio");
		sound.src = _path;
		sound.id = _key;
		Object.defineProperty((assets.sounds), _key, {
			value : sound,
			enumerable : true,
		});
	}
	
	/**
	 * Check whether or not an audio file is fully loaded and is read to play.
	 * _key - The key used to reference the audio file.
	 */
	function readyToPlay(_key) {
		return assets.sounds[_key].readyState == HTMLMediaElement.HAVE_ENOUGH_DATA;
	}
	
	/**
	 * Play an audio file from the start
	 * _key - The key used to reference the audio file.
	 */
	function playAudio(_key) {
		/*
		if (!readyToPlay(_key)) {
			console.error("BropalsJSLib: The audio with the " + _key + " has not " +
				"finished loading yet; make a delay after loading before playing");
			return;
		}
		*/
		assets.sounds[_key].currentTime = 0;
		assets.sounds[_key].play();
	}
	
	/**
	 * Play an audio file from the start and with a specific volume.
	 * _key - The key used to reference the audio file.
	 * _volume - A number for how loud to play the audio. A number between 0 and 1
	 *		     where 0 is quiet and 1 is the loudest.
	 */
	function playAudioVolume(_key, _volume) {
		if (!readyToPlay(_key)) {
			console.error("BropalsJSLib: The audio with the " + _key + " has not " +
				"finished loading yet; make a delay after loading before playing");
			return;
		}
		var oldVolume = assets.sounds[_key].volume;
		assets.sounds[_key].volume = _volume;
		playAudio(_key);
		assets.sounds[_key].volume = _volume; // restore old volume
	}
	
	/**
	 * Play an audio file from the start and with a specific volume and starting at
	 * a specific time
	 * _key - The key used to reference the audio file.
	 * _volume - A number for how loud to play the audio. A number between 0 and 1
	 *		     where 0 is quiet and 1 is the loudest.
	 * _startTime - Where the audio file should start in seconds.
	 */
	function playAudioVolumeStartTime(_key, _volume, _startTime) {
		if (!readyToPlay(_key)) {
			console.error("BropalsJSLib: The audio with the " + _key + " has not " +
				"finished loading yet; make a delay after loading before playing");
			return;
		}
		var sound = assets.sounds[_key];
		var oldVolume = sound.volume;
		sound.volume = _volume;
		sound.currentTime = _startTime;
		sound.play();
		sound.volume = _volume; // restore old volume
	}
	
	/**
	 * Add a listener function to be called when the specified event occurs.
	 * _type - The type of event to listen for, such as 'mousedown'
	 * _f - The function that is called when the event occurs. The arguments 
	 *		it takes will depend on the event type.
	 */
	function addListener(_type, _f) {
		if (!(_type in listeners)) {
			console.error("BroPalsJSLib: The listener type '" + _type + "' is "
				+ "not a valid type");
				return;
		}
		listeners[_type].push(_f);
	}
	
	/* Functions that call the listener functions for events */
	function handleMouseDown(_e) {
		for (var key1 in buttons) {
			for (var key2 in (buttons[key1])) {
				var button = buttons[key1][key2];
				if (!button.enabled) {
					continue;
				}
				if (isPointInside(_e.clientX, _e.clientY, button)) {
					button.ondown();
					button.__displaydown__ = true;
				}
			}
		}
		
		localMouseInfo.lastClicked = [_e.clientX, _e.clientY];
		
		for (var i in (listeners["mousedown"])) {
			listeners["mousedown"][i](_e.clientX, _e.clientY);
		}
	}
	
	function handleMouseUp(_e) {
		for (var key1 in buttons) {
			for (var key2 in (buttons[key1])) {
				var button = buttons[key1][key2];
				if (!button.enabled) {
					continue;
				}
				if (isPointInside(_e.clientX, _e.clientY, button)) {
					button.onup();
					if (isPointInside(localMouseInfo.lastClicked[0], 
								localMouseInfo.lastClicked[1], button)) {
						button.onclick();
					}
				}
				button.__displaydown__ = false;
			}
		}
		
		for (var i in (listeners["mouseup"])) {
			listeners["mouseup"][i](_e.clientX, _e.clientY);
		}
	}
	
	function handleMouseMove(_e) {
		localMouseInfo.position = [_e.clientX, _e.clientY];
	}
	
	var KeyCode = {
		ZERO : 48, // probably not the same codes for the numpad
		ONE : 49,
		TWO : 50,
		THREE : 51,
		FOUR : 52,
		FIVE : 53,
		SIX : 54,
		SEVEN : 55,
		EIGHT : 56,
		NINE : 57,
		A : 65,
		B : 66,
		C : 67,
		D : 68,
		E : 69,
		F : 70,
		G : 71,
		H : 72,
		I : 73,
		J : 74,
		K : 75,
		L : 76,
		M : 77,
		N : 78,
		O : 79,
		P : 80,
		Q : 81,
		R : 82,
		S : 83,
		T : 84,
		U : 85,
		V : 86,
		W : 87,
		X : 88,
		Y : 89,
		Z : 90,
		ESCAPE : 27,
		SHIFT : 16,
		ARROW_LEFT : 37,
		ARROW_UP : 38,
		ARROW_RIGHT: 39,
		ARRAY_DOWN : 40,
		SPACEBAR : 32
	};
	
	function handleKeyDown(_e) {
		var e = _e ? _e : window.event;
		handleKeyEvent(e.keyCode, false);
	}
	
	function handleKeyUp(_e) {
		var e = _e ? _e : window.event;
		handleKeyEvent(e.keyCode, true);
	}
	
	function handleKeyEvent(code, _released) {
		for (var i in (listeners["keyevent"])) {
			listeners["keyevent"][i](code, _released);
		}
	}
	
	/**/
	
	/**
	 * Define a screen to use in the API. Screens are not cleared when you switch the canvas.
	 * _key - The key to reference the screen with.
	 * _screen - An object containing functions for the screen. It should have at least 3
	 * 			 functions: start, update, and render. update takes one argument for how
	 *			 many milliseconds has passed that frame.
	 */
	function defineScreen(_key, _screen) {
		if (_key in screens) {
			console.error("BropalsJSLib: A screen with the key '" + _key + "'" +
				" is already defined");
			return;
		}
		Object.defineProperty(screens, _key, {
			value : _screen,
			enumerable : false,
		});
	}
	
	/**
	 * Set the screen with the given key as the active screen. Automatically calls 
     * the screen's 'start' function.
	 * _key - The key of the screen.
	 */
	function setScreen(_key) {
		activeScreen = screens[_key];
		activeScreen.start();
	}

	/**
	 * Set the loop's frames (cycles) per second.
	 */
	function setFps(_fps) {
		waitBetweenFrames = 1000/_fps;
	}
	
	/**
	 * Starts the game loop.
	 */
	function loop() {
		if (looping) {
			console.error("BropalsJSLib: Called 'loop' when already looping");
			return;
		}
		if (!activeScreen) {
			console.error("BropalsJSLib: The activeScreen has not been defined yet");
			return;
		}
		if (!setCanvas) {
			console.error("BroPalsJSLib: No canvas has been set yet");
			return;
		}
		loopActiveScreen();
	}
	
	function updateAll(_ms, _activeScreen) {
		
		// update and call interval functions
		for (var i=0; i<intervalFunctions.length; i++) {
			var intFunc = intervalFunctions[i];
			var timeUp = false;
			// check if maxTime is a function
			if ((typeof intFunc.maxTime) == "function") {
				// don't end time if the intFunction returns a 0.
				if (intFunc.maxTime() < 0) {
					timeUp = false;
				} else {
					timeUp = intFunc.maxTime() < intFunc.currTime;
					intFunc.currTime = intFunc.currTime + _ms;
				}
			} else {
				timeUp = intFunc.maxTime < intFunc.currTime;
				intFunc.currTime = intFunc.currTime + _ms;
			}
			if (timeUp) {
				intFunc.func();
				intFunc.currTime = 0;
			}
		}
		
		// update all the enabled gui buttons
		for (var key in (buttons.simple)) {
			var button = buttons.simple[key];
			//console.log("there is a button: " + button + " and " + (button.enabled));
			if (button.enabled) {
				button.__displayhover__ = isPointInside(localMouseInfo.position[0], 
								localMouseInfo.position[1], button)
			}
		}
			
		// update all the enabled sprites
		for (var key in sprites) {
			//console.log("this sprite is getting updated");
			var sprite = sprites[key];
			if (sprite.enabled) {
				//console.log("...and its enabled!");
				sprite.x += sprite.deltax;
				sprite.y += sprite.deltay;
			}
		}
		
		// update all of the rectangles
		for (var groupKey in rectangles) {
			var rectGroup = rectangles[groupKey]
			for (var key in rectGroup) {
				var rect = rectGroup[key];
				
				// update the velocity with acceleration
				rect.velx += rect.accx; 
				rect.vely += rect.accy;
				
				rect.x += rect.velx;
				rect.y += rect.vely;
				
				// check for collisions with other blocks
				if (!rect.anchored) {
					for (var groupKey2 in rectangles) {
						var rectGroup2 = rectangles[groupKey2];
						for (var key2 in rectGroup2) {
							var other = rectGroup2[key2];
							if (!rect.anchored && other != rect /* block is in animated */) {
								
								var smallestMaxX = rect.x + rect.width > other.x + other.width ? 
									other.x + other.width : rect.x + rect.width;
								var largestMinX = rect.x < other.x ? other.x : rect.x;
								
								var smallestMaxY = rect.y + rect.height > other.y + other.height ? 
									other.y + other.height : rect.y + rect.height;
								var largestMinY = rect.y < other.y ? other.y : rect.y;
								
								var xPen = largestMinX - smallestMaxX;
								var yPen = largestMinY - smallestMaxY;
								
								//if (!this.grounded) this.blockOn = null;
								
								if (xPen < 0 && yPen < 0) {
									if (Math.abs(yPen) < Math.abs(xPen)) {
										if (rect.y > other.y) {
											rect.y = other.y + other.height;
										} else {
											rect.y = other.y - rect.height;
											//this.grounded = true; // lands on the ground
											//this.blockOn = blockArray[i];
										}
										rect.vely = 0;
									} else {
										if (rect.x > other.x) {
											rect.x = other.x + other.width;
										} else {
											rect.x = other.x - rect.width;
										}
										rect.velx = 0;
									}
									
									if ((rect.collidable || other.collidable) && rect.oncollide) {
										rect.oncollide(other);
									}
								}
								
							}
						}
					}
				}
		
				// update the specific update function
				if (rect.update) {
					rect.update(_ms);
				}
			}
		}
		// end update rectangles
		
		_activeScreen.update(_ms);
	}
	
	function renderAll(_activeScreen) {
		
		renderBackground();
		// render the buttons
		for (var key in (buttons.simple)) {
			var button = buttons.simple[key];
			//console.log("there is a button: " + button + " and " + (button.enabled));
			if (button.enabled) {
				// if the  button has color, use color
				if (button.color || button.colorup || button.colordown || button.colorhover) {
					if (button.color) {
						drawRect(button.x, button.y, button.width, button.height, 
						button.color);
					} else {
						if (button.__displaydown__) {
							drawRect(button.x, button.y, button.width, button.height, 
							button.colordown);
						} else if (button.__displayhover__) {
							drawRect(button.x, button.y, button.width, button.height, 
							button.colorhover);
						} else {
							drawRect(button.x, button.y, button.width, button.height, 
							button.colorup);
						}
					}
				} else if (button.image || button.imageup || button.imagedown || button.imagehover) {
					if (button.image) {
						drawImage(button.x, button.y, button.width, button.height, 
						button.image);
					} else {
						if (button.__displaydown__) {
							drawImage(button.x, button.y, button.imagedown);
						} else if (button.__displayhover__) {
							drawImage(button.x, button.y, button.imagehover);
						} else {
							drawImage(button.x, button.y, button.imageup);
						}
					}
				}
				// if the button has an image and no color, use the image 
			}
		}
		
		// render the sprites
		for (var key in sprites) {
			var sprite = sprites[key];
			if (sprite.enabled) {
				if (sprite.imagekey) {
					//console.log("OMG AN IMAGE!!!");
					drawImage(sprite.imagekey, sprite.x, sprite.y);
				} else if (sprite.color) {
					drawRect(sprite.x, sprite.y, 
					sprite.width ? sprite.width : 10, 
					sprite.height ? sprite.height : 10,
					sprite.color);
				}
			}
		}
		
		// render the rectangles
		for (var groupKey in rectangles) {
			var rectGroup = rectangles[groupKey];
			for (var key in rectGroup) {
				var rect = rectGroup[key];
				if (rect.enabled) {
					if (rect.image) {  // TODO: Add image
						//console.log("OMG AN IMAGE!!!");
						//drawImage(sprite.imagekey, sprite.x, sprite.y);
					} else {
						var xRender = rect.x;
						var yRender = rect.y;
						var widthRender = rect.width;
						var heightRender = rect.height
						if ("borderColor" in rect) {
							// draw the border
							drawRect(xRender, yRender, 
								widthRender, heightRender, 
								rect.borderColor);
							// adjust values for drawing inside
							xRender += rect.borderSize;
							yRender += rect.borderSize;
							widthRender -= (rect.borderSize * 2);
							heightRender -= (rect.borderSize * 2);
						}
						drawRect(xRender, yRender, 
							widthRender, heightRender, 
							rect.color);
					}
				}
			}
		}
		
		_activeScreen.render();
	}
	
	// maybe make this modifiable soemhow
	function renderBackground() {
		drawRect(0, 0, canvasWidth, canvasHeight, "#FFFFFF");
	}
	
	/* Loops through the active screen. Not accessible from API object. */
	function loopActiveScreen() {
		var frameActiveScreen = activeScreen; // in case it changes mid-frame
		start = (new Date()).getTime();
		updateAll(waitBetweenFrames, frameActiveScreen);
		
		renderAll(frameActiveScreen);
		
		diff = (new Date()).getTime() - start;
		if (waitBetweenFrames - diff > 0) {
			setTimeout(loopActiveScreen, waitBetweenFrames - diff);
		} else {
			loopActiveScreen();
		}
	}
	
	/**
	 * Creates a BroPalsAPI simple button object based on properties passed  
	 * into this function. The button can be refered to using its key, but
	 * its update and render cycle is handled internally
	 * No properties are required. Giving this method an empty object will 
	 * set any required properties to their defaults.
	 * Properties include:
	 * enabled : Boolean - Whether or not the button will draw and update
	 * x : Number - the x position (default 0)
	 * y : Number - The y position (default 0)
	 * width : Number - The width (default 150)
	 * height : Number - The height (default 75)
	 * onclick : Function - Called when the button is clicked
	 * ondown : Function - Called when the button is pressed
	 * onup : Function - Called when the button is released
	 * color : String (optional) - The color of the button
	 * colorhover : String (option) - The color of the button when
	 *								  the mouse is over the button
	 * colordown : String (optional) - The color of the button when 
	 *								   it's held down.
	 * colorup : String (optional) - The color of the button when
	 *								 it's not being pressed
	 * image : String (optional) - The key of the image for the button.
	 * imagehover : String (option) - The image on the button when
	 *								  the mouse is over the button
	 * imagedown : String (optional) - The image of the button when
	 * imageup : String (optional) - The color of the button when
	 *								 it's not being pressed
	 * 
	 */
	function addButton(_key, _props) {
		if (_key in (buttons.simple)) {
			console.error("BroPalsJSLib: A simple button with the key " + _key + " already exists");
			return;
		}
		// a button with default values
		var button = {
			__displaydown__ : false, // variable for rendering it holding it down
			__displayhover__ : false, // variable for rendering it while hovering over
			enabled : false,
			x : 0,
			y : 0,
			width : 150,
			height : 75,
			onclick : function defaultOnclick() { },
			ondown : function defaultOndown() { },
			onup : function defaultOnrelease() { }
		};
		
		if ("imagehover" in _props) {
			Object.defineProperty(button, "imagehover", {
				value : _props.imagehover,
				enumerable : false,
			});
		}
		if ("colorhover" in _props) {
			Object.defineProperty(button, "colorhover", {
				value : _props.colorhover,
				enumerable : false,
			});
		} 
		
		// buttons either have a color or an image. Defaults to color
		if ("color" in _props) {
			Object.defineProperty(button, "color", {
				value : _props.color,
				enumerable : false,
			});
		} else if ("colordown" in _props || "colorup" in _props) {
			if ("colordown" in _props && "colorup" in _props) {
				Object.defineProperty(button, "colordown", {
					value : _props.colordown,
					enumerable : false,
				});
				Object.defineProperty(button, "colorup", {
					value : _props.colorup,
					enumerable : false,
				});
			} else {
				// whichever one of the two that is defined is the color
				Object.defineProperty(button, "color", {
					value : "colordown" in _props ? _props.colordown : _props.colorup,
					enumerable : false,
				});
			}
		// if there is no color properties, then image is the property
		} else if ("image" in _props) {
			Object.defineProperty(button, "image", {
				value : _props.image,
				enumerable : false,
			});
		} else if ("imagedown" in _props || "imageup" in _props) {
			if ("imagedown" in _props && "imageup" in _props) {
				Object.defineProperty(button, "imagedown", {
					value : _props.imagedown,
					enumerable : false,
				});
				Object.defineProperty(button, "imageup", {
					value : _props.imageup,
					enumerable : false,
				});
			} else {
				// whichever one of the two that is defined is the color
				Object.defineProperty(button, "image", {
					value : "imagedown" in _props ? _props.imagedown : _props.imageup,
					enumerable : false,
				});
			}
		} else {
			// if there are no color or image properties, make it default to a gray color.
			Object.defineProperty(button, "color", {
				value : "#999999",
				enumerable : false,
			});
		}

		
		// a list of properties that will be copied from properties
		var properties = ["enabled", "ondown", "onup", "onclick", 
				"x", "y", "width", "height"];
		
		for (var i=0; i<properties.length; i++) {
			if (properties[i] in _props) {
				Object.defineProperty(button, properties[i], {
					value : _props[ "" + (properties[i])],
					enumerable : false,
				});
			}
		}
		
		// add the button
		Object.defineProperty((buttons.simple), _key, {
			value : button,
			enumerable : true,
		});
		
		return button;
	}
	
	/**
	 * Create a BroPalsAPI sprite object, adding it to a list internally.
	 * The sprite object won't collide with anything. It only exists 
	 * to have an effect.
	 * None of the properties are required. If a property is not provided
	 * in the properties array, it will be set to its default value.
	 * The possible properties include:
	 * x : Number - The initial x position of the sprite (default 0)
	 * y : Number - The initial y position of the sprite (default 0)
	 * deltax : Number (optional) - How much the sprite moves per frame
	 * deltay : Number (optional) - How much the sprite moves per frame
	 * imagekey : String (optional) - The image the sprite will render as.
	 * color : String (optional) - The color this sprite will render as
	 * 							 if no image is provided. (default #999999)
	 */
	function addSprite(_key, _props) {
		if (_key in sprites) {
			console.error("BroPalsJSLib: A sprite with the key " + _key + " already exists");
			return;
		}
		
		// default sprite values
		var sprite = {
			x : 0,
			y : 0
		}
		
		// a list of properties that will be copied from properties
		var properties = ["x", "y", "deltax", "deltay", "imagekey", "color",
						"width", "height", "enabled"];
		
		for (var i=0; i<properties.length; i++) {
			if (properties[i] in _props) {
				Object.defineProperty(sprite, properties[i], {
					value : _props[ "" + (properties[i])],
					enumerable : false,
				});
			}
		}
		
		// if no color or image is given, set a default color
		if (!(sprite.imagekey || sprite.color)) {
			Object.defineProperty(sprite, "color", {
				value : "#999999",
				enumerable : false,
			});
		}
		
		// add the sprite
		Object.defineProperty(sprites, _key, {
			value : sprite,
			enumerable : true,
		});
		
		return sprite;
	}
	
	
	/**
	 * Create a BroPalsAPI block and adds it to the block list internally.
	 * By default, the block is anchored and can collide. It will have no
	 * velocity, acceleration, or functions attached to it.
	 * These are the different properties that can go into the 
	 * properties object.
	 * enabled : Boolean - Whether or not the button will draw and update
	 * x : Number - the x position (default 0)
	 * y : Number - The y position (default 0)
	 * width : Number - The width (default 100)
	 * height : Number - The height (default 100)
	 * anchored : Boolean - Whether or not this object will move (default true)
	 * collidable : Boolean - Whether or not this object will collide with 
	 *						other blocks (default true)
	 * velx : Number - The x component for the velocity vector (default 0)
	 * vely : Number - The y component for the velocity vector (default 0)
	 * velx : Number - The x component for the acceleration vector (default 0)
	 * vely : Number - The y component for the acceleration vector (default 0)
	 * color : String - The color of the rectangle (default gray)
	 * borderColor : String - The color of the border of the rectangle (default none)
	 * borderSize : Number - The width of the border. (default 1)
	 */
	function addPhysicsRectangle(_key, _props, _groupKey) {
		var grp;
		if (!_groupKey || _groupKey == "") {
			grp = "default";
		} else {
			grp = _groupKey;
		}
		if (!(grp in rectangles)) {
				console.log("Created a new physics rectangle group with the group key "
				+ grp);
				rectangles[grp] = {};
		}
		if (_key != "" && _key in rectangles[grp]) { // multiple empty string rectangles can be added
			console.error("BroPalsJSLib: A physics rectangle with the key " + _key + " already exists");
			return;
		}
		
		// default rectangle
		var rect = {
			x : 0,
			y : 0,
			width : 100,
			height : 100,
			anchored : true,
			collidable : true,
			velx : 0,
			vely : 0,
			accx : 0,
			accy : 0,
			color : "#999999"
		}

		for (var i=0; i<physicsRectangleProperties.length; i++) {
			if (physicsRectangleProperties[i] in _props) {
				Object.defineProperty(rect, physicsRectangleProperties[i], {
					value : _props[ "" + (physicsRectangleProperties[i])],
					enumerable : false,
				});
				
				if (physicsRectangleProperties[i] == "borderColor" && !("borderSize" in _props)) {
					Object.defineProperty(rect, "borderSize", {
						value : 1,
						enumerable : false,
					});
				}
			}
		}
		
		var rectKey = _key;
		
		// make the key be the next index instead if the key doesn't matter
		if (_key == "") {
			rectKey = nextDefaultRectKey++;
		}
		
		// add the rect
		Object.defineProperty(rectangles[grp], rectKey, {
			value : rect,
			enumerable : true,
		});
		return rect;
	}
	
	
	/**
	 * Modify a physics rectangle with the given key. The properties 
	 * that will be modified are the properties in the given object.
	 */
	function modifyPhysicsRectangle(_key, _modprops, _groupKey) {
		var grp;
		if (!_groupKey || _groupKey == "") {
			grp = "default";
		} else {
			grp = _groupKey;
		}
		if (!(grp in rectangles)) {
				console.error("Could not find physics rectangle group with the key \""
				+ grp + "\"");
		}
		if (!(_key in rectangles[grp])) {
			console.error("BroPalsJSLib: Can't modify any rectangles with the key " + _key + 
				": no rectangle found with the given key");
			return;
		}
		
		var rect = rectangles[grp][_key];
		 
		for (var i=0; i<physicsRectangleProperties.length; i++) {
			if (physicsRectangleProperties[i] in _modprops) {
				if (physicsRectangleProperties[i] in rect) {
					rect[(physicsRectangleProperties[i])] = _modprops[(physicsRectangleProperties[i])];
				} else {
					Object.defineProperty(rect, physicsRectangleProperties[i], {
						value : _props[ "" + (physicsRectangleProperties[i])],
						enumerable : false,
					});
				}
			}
		}
	}
	
	/**
	 * Removes all of the physics rectangle using the given key
	 */
	function removePhysicsRectangles(_key, _groupKey) {
		
	}
	
	/**
	 * Modify a group of physics rectangles using the given group key.
	 * The properties that will be modified are the properties in the
	 * given object.
	 */
	function modifyPhysicsRectangleGroup(_groupKey, _modProps) {
		
	}
	
	/**
	 * Removes all of the physics rectangle in the group of the given key
	 */
	function removePhysicsRectangleGroup(_groupKey) {
		
	}
	
	/**
	 * Returns if a point is inside of a given rectangle.
	 */
	function isPointInside(_x, _y, _rect) {
		return (_x > _rect.x && _x < _rect.x + _rect.width) &&
			   (_y > _rect.y && _y < _rect.y + _rect.height)
	}
	
	
	/**
	 * Have a function be called every defined amount of time.
	 * _ms - milliseconds between each call. This can be a function.
	 * _f - The function to be called
	 */
	function defineIntervalFunction(_ms, _f) {
		// an array of inteval functions.
			// each element has 1. max time, 2. current time, 3. function
			// update each one every frame (using the _ms parameter)
			// if the time is greater than max time, call the function
		var intervalObj = {
			currTime : 0,
			maxTime : _ms,
			func : _f
		}		
		intervalFunctions.push(intervalObj);
	}
	
	
	return {
		setCanvasInfo : setCanvasInfo,
		drawRect : drawRect,
		fillBackgroundSolidColor : fillBackgroundSolidColor,
		loadImage : loadImage,
		drawImage : drawImage,
		drawImageScaled : drawImageScaled,
		drawImageRotated : drawImageRotated,
		setFont : setFont,
		drawText : drawText,
		loadAudio : loadAudio,
		playAudio : playAudio,
		playAudioVolume : playAudioVolume,
		playAudioVolumeStartTime : playAudioVolumeStartTime,
		readyToPlay : readyToPlay,
		readyToDraw : readyToDraw,
		addListener : addListener,
		defineScreen : defineScreen,
		setScreen : setScreen,
		setFps : setFps,
		loop : loop,
		KeyCode : KeyCode,
		addButton : addButton,
		addSprite : addSprite,
		addPhysicsRectangle : addPhysicsRectangle,
		modifyPhysicsRectangle : modifyPhysicsRectangle,
		defineIntervalFunction : defineIntervalFunction
	};
}
