
function createBroPalsAPI() {
	
	var context;
	var canvasWidth;
	var canvasHeight;
	var assets = {
		images : {}
	};
	
	function setCanvasInfo(_id, _contextType) {
		var canvas = document.getElementById(_id);
		context = canvas.getContext(_contextType);
		canvasWidth = canvas.width;
		canvasHeight = canvas.height;
	}
	
	function drawRect(_x, _y, _w, _h, _color) {
		context.fillStyle = _color;
		context.fillRect(_x, _y, _w, _h);
	}
	
	function fillBackgroundSolidColor(_color) {
		drawRect(0, 0, canvasWidth, canvasHeight, _color);
	}
	
	function loadImage(_key, _path) {
		if (_key in (assets.images)) {
			console.log("BroPalsJSLib: An asset with the key " + _key + " already exists");
			return;
		}
		 var img = document.createElement("img");
		 img.src = _path;
		 Object.defineProperty((assets.images), _key, {
			 value : img,
			 enumerable : true,
		 });
	}
	
	function drawImage(_key, _x, _y) {
		context.drawImage(assets.images[_key], _x, _y);
	}
	
	function drawImageScaled(_key, _x, _y, _w, _h) {
		context.drawImage(assets.images[_key], _x, _y, _w, _h);
	}
	
	return {
		setCanvasInfo,
		drawRect,
		fillBackgroundSolidColor,
		loadImage,
		drawImage,
		drawImageScaled
	};
}
