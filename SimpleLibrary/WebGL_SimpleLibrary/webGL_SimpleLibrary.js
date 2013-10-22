var looping;
var canvas; //Just to keep a reference to it
var gl; //Don't need to start every function with "gl" when calling them
		//When using constants (all caps) say "gl.CONSTANT_NAME"

		//The general idea:
		//1. Draw everything you want to draw to an image
		//2. Draw that image using a buffer swapper

function startLoop(simpleTemplate, framesPerSecond)
{
	resizeCanvas(canvas.width, canvas.height);
	simpleTemplate.init();
	loopCycle(simpleTemplate);
}

//Use startLoop to call this
function loopCycle(simpleTemplate)
{
	simpleTemplate.update();
	simpleTemplate.display();
	requestAnimationFrame(function() { loopCycle(simpleTemplate); }); //
}
		
function SimpleLoopTemplate(displayFunction, updateFunction, initFunction)
{
	this.displayFunction=displayFunction;
	this.initFunction=initFunction;
	this.updateFunction=updateFunction;
	
	this.display=display;
	function display()
	{
		gl.clear(gl.COLOR_BUFFER_BIT);
		this.displayFunction();
	}
	
	this.init=init;
	function init()
	{
		this.initFunction();
	}
	
	this.update=update;
	function update()
	{
		this.updateFunction();
	}
}

function init3DCanvas(canvasId)
{
	canvas = document.getElementById(canvasId);
	if (canvas==undefined || canvas==null) {
		alert("no canvas!");
	}
	initWebGL(canvas);

	if (gl!=null) {
			
	} else {
		alert("No WebGL!");
	}
}

function initWebGL(canvas)
{
	gl = null;

	try {
		gl = canvas.getContext("webgl");
	} catch(e) { alert("Error!"); }
	
	if(!gl) { //If WebGL context is not there
		alert("Unable to initialize WebGL!");
	}
}

function resizeCanvas(newWidth, newHeight)
{
	canvas.width = newWidth;
	canvas.height = newHeight;
	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight); //Makes sure the viewport is the same size as the canvas
}

//	Rendering:
//
//	When rendering, WebGL takes vertex data from arrays stored in buffered objects
//	So buffered objects is where you store the vertex data in
//	The vertex data that is stored in the buffered objects are in the form of arrays
//	Arrays hold the vertex data
//	Buffered objects hold the arrays
//	Vertex data is taken for rendering
//	If you don't have a buffer for the arrays, then you can't work with it
//	You need data buffers to work with vertex data
//
//	WebGL wants to know the format of the data in the arrays so that buffers can fit them properly

//For most actions onto WebGL objects
//
// 1. Bind it to a context
// 2. Act on the context (which has the binded object)
// 3. Unbind the object from the context
//

//Making an array buffer:
//	And array buffer holds all the data for things (like colors, vertex posititons, etc)
//When making an array buffer, you need to think about
//	1. How many elements am I making?
//	2. What data goes into each element?
//	3. How much memory does each element take up?
//
//	Then, when knowing that, allocate memory equal to
//	(element count) * (memory required in each element)
//
//	The memory that each type of data takes up can be obtained with constants provided by WebGL
//
//	Example: Make an ArrayBuffer that holds 10 elements, each of which is made up of 
//	2 bytes of data
//
//	var elementCount = 10;
//	var elementSize = 2 * Uint8Array.BYTES_PER_ELEMENT;
//
//	var arrayBuffer = new ArrayBuffer(elementCount * elementSize);
//
//	To access the data, you need to map the ArrayBuffer to an array of that type.
//	So to access the Uint8Array data:
//
//	var elementArray = new Uint8Array(arrayBuffer);

//	Shaders:
//	Rendering requires shaders
//
//	To use a shader, the following must be done
//
//	1. Load the shader (shaderSource function)
//	2. Compile the shader (compileShader function)
//	3. Attach to a program (attachShader function)
//	4. Link the program that you attached it to (linkProgram function)
//	5. Use the program that you just linked (useProgram function)
//
