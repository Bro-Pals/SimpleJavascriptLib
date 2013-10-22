
// canvas variables
var canvasContext;
var canvasReference;
var canvasSizeX, canvasSizeY;

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

function drawImage(id, x, y) {
	var img=document.getElementById(id);
	canvasContext.drawImage(img,x,y);
}

function loadImage(imageID, imageSource) {
	var newImg = document.createElement("img");
	newImg.id = imageID;
	newImg.src = imageSource;
	newImg.style.visibility="hidden";
	document.getElementById("imageAppender").appendChild(newImg);
}

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

// variable to call the reference object from
var keyCodeRef = new KeyCodeReference();

// an array to keep track of all the key events
var connectedKeyEvents = new Array();

function connectKeyEvent(keyCode, functionCalled) {
	keyEvents[keyEvents.length] = {keyCode, functionCalled};
}

function pressKey(et) {
	var e = et ? et : window.event;
	alert("Key pressed with code "+e.keyCode);
	for (var i=0; i<connectedKeyEvents.length; i++) {
		if (e.keyCode==connectedKeyEvents[i][0]) {
			connectedKeyEvents[i][1]();
			break;
		}
	}
}

document.addEventListener('keydown',pressKey,false);

