
// canvas variables
var canvasContext;
var canvasReference;
var canvasSizeX, canvasSizeY;

// set all the information for the canvas. Do this first!
function setCanvasInfo(id, sizeX, sizeY, canvasContextType)
{
	canvasID = id;
	canvasSizeX = sizeX;
	canvasSizeY = sizeY;
	canvasReference = document.getElementById(canvasID);
	canvasContext = canvasReference.getContext();
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


