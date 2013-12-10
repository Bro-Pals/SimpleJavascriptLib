
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

 