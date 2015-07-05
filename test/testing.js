"use strict";
// let's try TDD

var tests = [
	function testMakeApi() {
		var api = null;
		api = createBroPalsAPI();
		
		if (api == null) {
			console.log("Error in: could not make api");
		}
	},
	function testSetUpApi() {
		var api = createBroPalsAPI();
		api.setCanvasInfo("joe", "2d");
	},
	function testFillBackground() {
		var api = createBroPalsAPI();
		api.setCanvasInfo("joe", "2d");
		api.fillBackgroundSolidColor("#ff00ff");
	},
	function testDrawRect() {
		var api = createBroPalsAPI();
		api.setCanvasInfo("joe", "2d");
		api.drawRect(50, 50, 100, 100, "#000000");
	},
	function testLoadImageAsset() {
		var api = createBroPalsAPI();
		api.loadImage("testImage", "img/testImage.png");
	},
	function testDrawingImage() {
		var api = createBroPalsAPI();
		api.setCanvasInfo("joe", "2d");
		
		api.loadImage("testImage", "img/testImage.png");
		api.drawImage("testImage", 100, 30);
		api.drawImageScaled("testImage", 100, 200, 40, 30);
	}
];




for (var i=0; i<tests.length; i++) {
	console.log(tests[i]);
	tests[i]();
}

