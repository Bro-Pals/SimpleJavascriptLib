//Load the simple_math.js file
 
function Color(red, green, blue, alpha)
{
	this.red=red;
	this.green=green;
	this.blue=blue;
	this.alpha=alpha;
}

function SimpleGraphics(canvas) //Pass it a reference to the 2D HTML5 Canvas!
{
	this.canvas=canvas;
	if (this.canvas==undefined) { console.log("SimpleGraphics: No canvas!"); } 
	this.context=this.canvas.getContext("2d");
	if (this.context==undefined) { console.log("SimpleGraphics: No context!"); }
	this.buffer = this.context.createImageData(this.canvas.width, this.canvas.height);
	if (this.buffer==undefined) { console.log("SimpleGraphics: No buffer!"); }
	
	this.recreateBuffer=recreateBuffer;
	function recreateBuffer()
	{	
		this.buffer = this.context.createImageData(this.canvas.width, this.canvas.height);
	}
	this.drawBuffer=drawBuffer;
	function drawBuffer()
	{
		if (this.buffer==undefined)
		{
			console.log("Buffer is undefined!");
		}
		this.context.putImageData(this.buffer, 0, 0);
	}
	this.setPixelData=setPixelData;
	function setPixelData(xPixel, yPixel, colorObject)
	{
		var indexOfPixel = (xPixel+(yPixel*this.buffer.width))*4;
		if (this.buffer==undefined)
		{
			console.log("No buffer when trying to draw a pixel!");
		}
		if (this.hasData(this.buffer, indexOfPixel))
		{
			//console.log("Setting Pixel (" + xPixel + ", " + yPixel + ") as (" + colorObject.red + ", "  + colorObject.green + ", "  + colorObject.blue + ", " + colorObject.alpha + ")"); 
			this.buffer.data[indexOfPixel] = colorObject.red;
			this.buffer.data[indexOfPixel+1] = colorObject.green;
			this.buffer.data[indexOfPixel+2] = colorObject.blue;
			this.buffer.data[indexOfPixel+3] = colorObject.alpha;
		}
	}
	this.pixelInBounds=pixelInBounds;
	function pixelInBounds(imageData, xPixel, yPixel)
	{
		if (xPixel>=0 && xPixel<=imageData.width && yPixel>=0 && yPixel<=imageData.height)
		{
			return true;
		} else {
			return false;
		}
	}
	this.hasData=hasData;
	function hasData(imageData, index)
	{
		if (imageData.data[index]!=null && imageData.data[index]!=undefined)
		{
			return true;
		} else {
			return false;
		}
	}
	this.setPixelDataColor=setPixelDataColor;
	function setPixelDataColor(xPixel, yPixel, red, green, blue, alpha)
	{
		var indexOfPixel = (xPixel+(yPixel*this.buffer.width))*4;
		if (this.buffer.data[indexofPixel])
		{
			this.buffer.data[indexOfPixel] = red;
			this.buffer.data[indexOfPixel+1] = green;
			this.buffer.data[indexOfPixel+2] = blue;
			this.buffer.data[indexOfPixel+3] = alpha;
		}
	}
	this.setCanvasSize=setCanvasSize;
	function setCanvasSize(newWidth, newHeight)
	{
		this.canvas.width=newWidth;
		this.canvas.height=newHeight;
		this.context=this.canvas.getContext("2d");
		this.recreateBuffer();
	}	
	this.fillRectangle=fillRectangle;
	function fillRectangle(x, y, wid, hei, color)
	{
		var w, h;
		for (w=0; w<wid; w++)
		{
			for (h=0; h<hei; h++)
			{
				this.setPixelData(x+w, y+h, color);
			}
		}
	}
	this.fillBackground=fillBackground;
	function fillBackground(color)
	{
		this.fillRectangle(0, 0, this.buffer.width, this.buffer.height, color);
	}
}