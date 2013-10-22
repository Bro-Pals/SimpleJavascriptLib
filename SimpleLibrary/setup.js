
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

function pressKey(et) {
	var e = et ? et : window.event;
	for (var i=0; i<connectedKeyEvents.length; i++) {
		if (connectedKeyEvents[i][0] == e.keyCode) {
			connectedKeyEvents[i][1]();
		}
	}
}

function assignKeyEvent(theKeyCode, functionAssigned) {
	var lastIndex = connectedKeyEvents.length
	connectedKeyEvents[lastIndex] = [theKeyCode, functionAssigned];
}

/*
 * Add the following line to the end of the main script
 * document.addEventListener('keydown',pressKey,false);
 */
 