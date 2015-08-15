/*
var connectedKeyEvents = new Array();

// key event code reference
function KeyCodeReference() {
	this.ZERO = 48; // probably not the same codes for the numpad
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
	this.ESCAPE = 27
	this.SHIFT = 16;
	this.ARROW_LEFT = 37;
	this.ARROW_UP = 38;
	this.ARROW_RIGHT = 39;
	this.ARRAY_DOWN = 40;
	this.SPACEBAR = 32;
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

var eventCanvas;
var canvasRect;

var mouseDownEvents = new Array();
var mouseUpEvents = new Array();

function addCanvasMouseDown(func) {
	mouseDownEvents[(mouseDownEvents.length)] = func;
}

// add a function to be called when onmouseup is fired on the canvas
function addCanvasMouseUp(func) {
	mouseUpEvents[(mouseUpEvents.length)] = func;
}

// Calls all the onmouseup events for the canvas
function canvasMouseUp(event) {
	for (var i=0; i<mouseUpEvents.length; i++) {
		var x = event.clientX - canvasRect.left;
		var y = event.clientY - canvasRect.top;
		mouseUpEvents[i](event, x, y);
	}
}

// Calls all the onmousedown events for the canvas
function canvasMouseDown(event) {
	for (var i=0; i<mouseDownEvents.length; i++) {
		var x = event.clientX - canvasRect.left;
		var y = event.clientY - canvasRect.top;
		mouseDownEvents[i](event, x, y);
	}
}

function setClickCanvas(idOfCanvas) {
	eventCanvas = document.getElementById(idOfCanvas);
	eventCanvas.onmouseup = canvasMouseUp;
	eventCanvas.onmousedown = canvasMouseDown;
	canvasRect = eventCanvas.getBoundingClientRect();
}

// event listener for pressing keys
document.addEventListener('keydown',pressKey,false);
 */
 
 