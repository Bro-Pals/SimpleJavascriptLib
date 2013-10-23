
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

function drawText(txt,font,color, x,y) {
	canvasContext.font=font;
	canvasContext.strokeStyle=color;
	canvasContext.fillText(txt,x,y);
}

var connectedKeyEvents = new Array();

// key event code reference
function KeyCodeReference() {
	this.ZERO = 48;
	this.ONE = 49;
	this.TWO = 50;
	this.THREE = 51;
	this.FOUR = 52;
	this.FIVE = 53;
	this.SIX = 54;
	this.SEVEN = 55;
	this.EIGHT = 56;
	this.NINE = 57;
	this.A = 65;
	this.B = 66;
	this.C = 67;
	this.D = 68;
	this.E = 69;
	this.F = 70;
	this.G = 71;
	this.H = 72;
	this.I = 73;
	this.J = 74;
	this.K = 75;
	this.L = 76;
	this.M = 77;
	this.N = 78;
	this.O = 79;
	this.P = 80;
	this.Q = 81;
	this.R = 82;
	this.S = 83;
	this.T = 84;
	this.U = 85;
	this.V = 86;
	this.W = 87;
	this.X = 88;
	this.Y = 89;
	this.Z = 90;
}
var keyCodeRef = new KeyCodeReference();

function pressKey(et) {
	var e = et ? et : window.event;
	for (var i=0; i<connectedKeyEvents.length; i++) {
		if (connectedKeyEvents[i][0] == e.keyCode) {
			connectedKeyEvents[i][1]();
		}
	}
}

function connectKeyEvent(theKeyCode, functionAssigned) {
	var lastIndex = connectedKeyEvents.length
	connectedKeyEvents[lastIndex] = [theKeyCode, functionAssigned];
}

/*
 * Add the following line to the end of the main script
 * document.addEventListener('keydown',pressKey,false);
 */
 