"use strict";
// let's try TDD

console.log(document.URL);

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
	function testDrawingImage() {
		var api = createBroPalsAPI();
		api.setCanvasInfo("joe", "2d");
		
		api.loadImage("testImage", "img/testImage.png");
		setTimeout(function drawImages() {
			if (api.readyToDraw("testImage")) {
				console.log("image ready!");
			}
			api.drawImage("testImage", 100, 30);
			api.drawImageScaled("testImage", 100, 200, 40, 30);
		}, 100);
	},
	function testDrawingText() {
		var api = createBroPalsAPI();
		api.setCanvasInfo("joe", "2d");
		
		api.setFont("12 Arial", "#000000");
		api.drawText("I have drawn text!", 200, 200);
	},
	function testPlayingAudio() {
		var api = createBroPalsAPI();
		
		api.loadAudio("testAudio", "audio/test.mp3");
		setTimeout(function playAudio() {
			if (api.readyToPlay("testAudio")) {
				console.log("audio ready!");
			}
			//api.playAudio("testAudio");
			//api.playAudioVolume("testAudio", 0.3);
			//api.playAudioVolumeStartTime("testAudio", 0.8, 60);
		}, 300);
	},
	function testMouseClickEvent() {
		var api = createBroPalsAPI();
		api.setCanvasInfo("joe", "2d");
		
		// should cause an error
		//api.addListener("invalid type", function meh(){});
		
		api.addListener("mousedown", function downMouse(x, y) {
			console.log("Mouse down " + x + ", " + y);
		});
		
		api.addListener("mouseup", function upMouse(x, y) {
			console.log("Mouse up " + x + ", " + y);
		});

	},
	function testScreensAndUpdating() {
		var api = createBroPalsAPI();
		
		api.setFps(40);
		
		api.defineScreen("game", {
			
			x : 0,
			
			start : function start() {
				api.setCanvasInfo("joe", "2d");
				this.x = 0;
			},
			update : function update(_ms) {
				this.x = this.x + 1;
				//console.log("update: " + _ms);
			},
			render : function render() {
				api.fillBackgroundSolidColor("#999999");
				api.drawRect(this.x, 100, 50, 50, "#ff0000");
				//console.log("render");
			}
		});
		
		api.setScreen("game");
		api.loop();
	}
];




for (var i=0; i<tests.length; i++) {
	console.log(tests[i]);
	tests[i]();
}

