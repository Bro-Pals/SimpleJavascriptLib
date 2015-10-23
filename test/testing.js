"use strict";
// let's try TDD

console.log(document.URL);

var api;

var tests = [
	/*
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
		api.setCanvasInfo("joe", "2d");
		
		api.defineScreen("game", {
			
			x : 0,
			
			start : function start() {
				
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
	},
	function testKeyEvent() {
		var api = createBroPalsAPI();
		api.setCanvasInfo("joe", "2d");
		
		api.addListener("keydown", function keyDown(code) {
			if (code == api.KeyCode.W) {
				console.log("W was pressed");
			}
		});		
	},
	*/
	/*
	function testMakingColorButton() {
		api = createBroPalsAPI();
		
		api.addButton("button1", {
			color : "#FF0033"
		});
		api.addButton("button2", {
			colordown : "#0099FF"
		});
		api.addButton("button3", {
			colorup : "#FF33FF"
		});
		api.addButton("button4", {
			colorup : "#000000",
			colordown : "#FFFFFF"
		});
	},
	function testMakingButtonThatUpDown() {
		api = createBroPalsAPI();
		
		api.addButton("testClick", {
			enabled : true,
			colorhover : "#1818CC",
			colordown : "#000099",
			colorup : "#3333FF",
			ondown : function ondown() {
				console.log("Woah bro this happened");
			},
			onup : function onup() {
				console.log("released!");
			}
		});
		
		api.setCanvasInfo("joe", "2d");
		api.defineScreen("game", {start : function start() {}, 
			update : function update(_ms) {}, 
			render : function render() {} });
		api.setScreen("game");
		api.loop();
	},
	function testMakingButtonClicks() {
		api = createBroPalsAPI();
		
		api.addButton("testSimpleButton", {
			enabled : true,
			color : "#33FF33",
			x : 200,
			y : 200,
			onclick : function onclick() {
				console.log("This was acctually clicked and stuff");
			}
		});	
		
		//api.addButton("testSimpleButton", {});
		
		api.setCanvasInfo("joe", "2d");
		api.defineScreen("game", {start : function start() {}, 
			update : function update(_ms) {}, 
			render : function render() {} });
		api.setScreen("game");
		api.loop();
	},
	function testButtonWithImages() {
		// TODO: when I feel like it
	},
	function testUsingSprites() {
		api = createBroPalsAPI();
		
		api.loadImage("testSprite", "img/testSprite.png");
		
		setTimeout(function drawImages() {
			if (api.readyToDraw("testSprite")) {
				console.log("Sprite image ready!");
			}
			api.addSprite("testSpriteThing", {
				enabled : true,
				x : 100,
				y : 100,
				deltax : 1,
				deltay : 2,
				imagekey : "testSprite"
			});
			api.addSprite("anotherThing", {
				enabled : true,
				x : 10,
				y : 200,
				deltax : 1,
				deltay : -0.4,
				color : "#ff0000"
			});
			
			api.setCanvasInfo("joe", "2d");
			api.defineScreen("game", {start : function start() {}, 
				update : function update(_ms) {}, 
				render : function render() {} });
			api.setScreen("game");
			api.loop();
		}, 100);
		
	},
	*/
	function testPhysicsBlocks() {
	
		// maybe make groups of blocks?
		api = createBroPalsAPI();
		
		api.addPhysicsRectangle("player", {
			enabled : true,
			anchored : false,
			collidable : true,
			x : 20,
			y : 100,
			width : 100,
			height : 100,
			velx : -0.5,
			vely : 0.2,
			accx : 0,
			accy : 0,
			update : function update(ms) {
				console.log("player was updated");
			},
			oncollide : function oncollide(other) {
				console.log("This block has collided with another block")
			},
			color : "#cc00cc",
			borderColor : "#990099",
			borderSize : 4
		});
		api.modifyPhysicsRectangle("player", { velx : 2 });
		
		api.addPhysicsRectangle("", {
			enabled : true,
			anchored : true,
			x : 260,
			y : 10,
			width : 50,
			height : 300,
			borderColor : "#cccccc",
			borderSize : 3
		});
		/*
		api.addPhysicsRectangle("", {
			enabled : true,
			anchored : true,
			x : 160,
			y : 10,
			width : 100,
			height : 40,
			borderColor : "#cccccc",
			borderSize : 3
		});
		*/
		api.setCanvasInfo("joe", "2d");
			api.defineScreen("game", {start : function start() {}, 
				update : function update(_ms) {}, 
				render : function render() {} });
			api.setScreen("game");
			api.loop();
	}
	
];



// run all the tests
for (var i=0; i<tests.length; i++) {
	console.log(tests[i]);
	tests[i]();
}

