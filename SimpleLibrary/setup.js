
/* This uses different "sceens" to organize the differents screens in a game.

	each scene is set up as the following
	
	var MY_SCREEN = new Array();
	MY_SCREEN[0] = function update() { //.. update code }
	MY_SCREEN[1] = function render() { //.. render code }
	MY_SCREEN[2] = function onEnter() { //.. code that runs when this scene is first made the active screen }
	MY_SCREEN[3] = function onExit() { //.. code that runs when this scene is being replaced and exited }

	you can then use setScreen(MY_SCREEN); to make it the "active" scene that will be iterated through
	
*/

// the active screen that is being ran
var activeScreen = null;

// change the current scene
function setScreen(_screen) {
	if (activeScreen != null) {
		activeScreen[3](); // exit function on the previous screen
	}
	activeScreen = _screen;
	activeScreen[2](); // enter function for new screen
}

// game looping stuff
var start, diff;
var fps = 30;
var waitBetweenFrames = 1000/fps;

// this function repeats at a constant fps when called
function mainLoop() {
	start = (new Date()).getTime();
	activeScreen[0](); // update
	
	activeScreen[1](); // render
	
	diff = (new Date()).getTime() - start;
	if (waitBetweenFrames - diff > 0) {
		setTimeout(mainLoop, waitBetweenFrames - diff);
	} else {
		mainLoop();
	}
}

// canvas variables
var canvasContext;
var canvasReference;
var canvasSizeX, canvasSizeY;

//Import a javascript (Taken from http://stackoverflow.com/questions/21294/dynamically-load-a-javascript-file-think-of-include-in-c)
function include(url)
{
	var s = document.createElement("script");
	s.setAttribute("type", "text/javascript");
	s.setAttribute("src", url);
	var nodes = document.getElementsByTagName("*");
	var node = nodes[nodes.length -1].parentNode;
	node.appendChild(s);
}

// set all the information for the canvas. Do this first!
function setCanvasInfo(id, sizeX, sizeY, canvasContextType) {
	canvasSizeX = sizeX;
	canvasSizeY = sizeY;
	canvasReference = document.getElementById(id);
	canvasContext = canvasReference.getContext(canvasContextType);
}

// draw a simple box onto the canvas
function drawBox(x, y, sizeX, sizeY, color) {
	canvasContext.fillStyle=color;
	canvasContext.fillRect(x, y, sizeX, sizeY);
}

// draw a Block object (from physics.js)
function drawBlock(blockObject, color) {
	drawBox(blockObject.x, blockObject.y, 
			blockObject.width, blockObject.height,
			color);
}

// fill the background of the canvas with a color
function fillBackground(color) {
	drawBox(0, 0, canvasSizeX, canvasSizeY, color);
}

function playAudio(audioId) {
	var sound = document.getElementById(audioId);
	sound.currentTime = 0;
	sound.play();
}

function playAudioVolume(audioId, _volume) {
	var sound = document.getElementById(audioId);
	sound.currentTime = 0;
	sound.volume = _volume;
	sound.play();
}

function playAudioVolumStartTime(audioId, _volume, startTime) {
	var sound = document.getElementById(audioId);
	sound.currentTime = startTime;
	sound.volume = _volume;
	sound.play();
}

function drawImage(id, x, y) {
	var img=document.getElementById(id);
	canvasContext.drawImage(img,x,y);
}

/* This creates a <img> element on the html page.
   One way you can avoid calling this function is by
   putting in all the <img> tags right into the page itself
*/
function loadImage(imageID, imageSource) {
	var newImg = document.createElement("img");
	newImg.id = imageID;
	newImg.src = imageSource;
	newImg.style.visibility = "hidden";
	document.getElementById("ImageAppender").appendChild(newImg);
}

// taken from the internet! http://stackoverflow.com/questions/10754661/javascript-getting-imagedata-without-canvas
function getImageDataArray(imageID, imgWidth, imgHeight) {
	var tempCanvas = document.createElement("canvas");
	var context = tempCanvas.getContext("2d");
	var img = document.getElementById(imageID);
	context.drawImage(img, 0, 0);
	try {
	var imgData = context.getImageData(0, 0, imgWidth, imgHeight);
	} catch(err) { alert(err); }
	return imgData;
}

function drawText(txt,font,color, x,y) {
	canvasContext.font=font;
	canvasContext.fillStyle=color;
	canvasContext.fillText(txt,x,y);
}

 