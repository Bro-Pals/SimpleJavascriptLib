
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
		mouseup : []
	};
	
	/**
	 * Set the canvas to be used by the API.
	 * _id - the ID of the canvas in the document
	 * _contextType - The type of context to draw with (such as '2d')
	 */
	function setCanvasInfo(_id, _contextType) {
		var canvas = document.getElementById(_id);
		context = canvas.getContext(_contextType);
		canvasWidth = canvas.width;
		canvasHeight = canvas.height;
		
		if (setCanvas) {
			// clear listeners on a new canvas
			listeners["mousedown"] = [];
			listeners["mouseup"] = [];
			
			// remove all events from the old canvas
			canvas.removeEventListener('mousedown',handleMouseDown,false);
			canvas.removeEventListener('mouseup',handleMouseUp,false);
		}
		
		setCanvas = true;
		canvas.addEventListener('mousedown',handleMouseDown,false);
		canvas.addEventListener('mouseup',handleMouseUp,false);
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
		return assets.images[_key].complete;
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
		if (!readyToPlay(_key)) {
			console.error("BropalsJSLib: The audio with the " + _key + " has not " +
				"finished loading yet; make a delay after loading before playing");
			return;
		}
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
		for (var i in (listeners["mousedown"])) {
			listeners["mousedown"][i](_e.clientX, _e.clientY);
		}
	}
	
	function handleMouseUp(_e) {
		for (var i in (listeners["mouseup"])) {
			listeners["mouseup"][i](_e.clientX, _e.clientY);
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
		loopActiveScreen();
	}
	
	/* Loops through the active screen */
	function loopActiveScreen() {
		var frameActiveScreen = activeScreen; // in case it changes mid-frame
		start = (new Date()).getTime();
		frameActiveScreen.update(waitBetweenFrames);
		
		frameActiveScreen.render();
		
		diff = (new Date()).getTime() - start;
		if (waitBetweenFrames - diff > 0) {
			setTimeout(loopActiveScreen, waitBetweenFrames - diff);
		} else {
			loopActiveScreen();
		}
	}
	
	return {
		setCanvasInfo : setCanvasInfo,
		drawRect : drawRect,
		fillBackgroundSolidColor : fillBackgroundSolidColor,
		loadImage : loadImage,
		drawImage : drawImage,
		drawImageScaled : drawImageScaled,
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
		loop : loop
	};
}
