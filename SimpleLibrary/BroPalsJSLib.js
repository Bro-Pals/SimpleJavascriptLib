
function createBroPalsAPI() {
	
	var setCanvas;
	var context;
	var canvasWidth;
	var canvasHeight;
	var assets = {
		images : {},
		sounds : {}
	};
	var listeners = {
		mousedown : []
	};
	
	function setCanvasInfo(_id, _contextType) {
		var canvas = document.getElementById(_id);
		context = canvas.getContext(_contextType);
		canvasWidth = canvas.width;
		canvasHeight = canvas.height;
		
		if (setCanvas) {
			// clear listeners on a new canvas
			listeners["mousedown"] = [];
			
			// remove all events
			canvas.removeEventListener('mousedown',handleMouseDown,false);
		}
		
		setCanvas = true;
		canvas.addEventListener('mousedown',handleMouseDown,false);
	}
	
	function drawRect(_x, _y, _w, _h, _color) {
		if (!setCanvas) {
			console.error("BroPalsJSLib: No canvas has been set yet");
			return;
		}
		context.fillStyle = _color;
		context.fillRect(_x, _y, _w, _h);
	}
	
	function fillBackgroundSolidColor(_color) {
		if (!setCanvas) {
			console.error("BroPalsJSLib: No canvas has been set yet");
			return;
		}
		drawRect(0, 0, canvasWidth, canvasHeight, _color);
	}
	
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
	
	function readyToDraw(_key) {
		return assets.images[_key].complete;
	}
	
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
	
	function setFont(_font, _color) {
		context.font=_font;
		context.fillStyle=_color;
	}
	
	function drawText(_text, _x, _y) {
		if (!setCanvas) {
			console.error("BroPalsJSLib: No canvas has been set yet");
			return;
		}
		context.fillText(_text, _x, _y);
	}
	
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
	
	function readyToPlay(_key) {
		return assets.sounds[_key].readyState == HTMLMediaElement.HAVE_ENOUGH_DATA;
	}
	
	function playAudio(_key) {
		if (!readyToPlay(_key)) {
			console.error("BropalsJSLib: The audio with the " + _key + " has not " +
				"finished loading yet; make a delay after loading before playing");
			return;
		}
		assets.sounds[_key].currentTime = 0;
		assets.sounds[_key].play();
	}
	
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
	
	function addListener(_type, _f) {
		if (!(_type in listeners)) {
			console.error("BroPalsJSLib: The listener type '" + _type + "' is "
				+ "not a valid type");
				return;
		}
		listeners[_type].push(_f);
	}
	
	function handleMouseDown(_e) {
		for (var i in (listeners["mousedown"])) {
			listeners["mousedown"][i](_e.clientX, _e.clientY);
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
	};
}
