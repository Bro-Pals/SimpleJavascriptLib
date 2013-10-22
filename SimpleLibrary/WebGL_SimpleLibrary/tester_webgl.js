var template;
var loops;

function go()
{
	loops = 0;
	template = new SimpleLoopTemplate(displayGL, gameUpdate, initGL); //Make a new loop template with display() update() and init() functions
	startLoop(template, 30); // Run the loop specified by template
}

var positionBufferObject;
var vertexes;

function displayGL()
{
	gl.clearColor(0, 0, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferObject); //Bind the positionBufferObject to the Array Buffer context
	gl.enableVertexAttribArray(0); //Enable the vertex attribute at index "0" as an array (Where vertexAttribPointer is going to)
	gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);
	//The first parameter is asking where the data for the vertexes starts at in the Array Buffer
	//The second parameter is asking how many values represent each vertex
	//The third parameter is telling WebGL that these vertexes are of type FLOAT
	//
	//The fifth parameter is telling WebGL that there is no space between each set of values in our data array
	//The sixth parameter is telling WebGL that there is no byte offset between each set of values
	//
	//"vertexAttribPointer" always refers to the currently bound buffer (in our case, positionBufferObject, which is an Array Buffer)
	//"vertexAttribPointer" is saying where to find the data for the vertex data, essentially
	//
	//NEED TO TELL IT WHERE TO FIND THE VERTEX DATA BEFORE IT USES IT FOR RENDERING
	//
	//Now to render the data that we pointed it to:
	gl.drawArrays(gl.TRIANGLES, 0, 3);
	//The 2nd parameter is saying where to start reading vertexes (0th index of the array buffer)
	//The 3rd parameter is saying how many vertexes to read
	//gl.TRIANGLES tells WebGL to take each 3 vertexes it finds as a triangle
	//
	//Clean up code.. Tell it to stop enabling the vertexAttribArray at index 0
	gl.disableVertexAttribArray(0);
	
	//	loopCycle in webGL_SimpleLibrary should finish up and repaint the canvas
}

function initGL()
{
	//Give it the color to clear the screen it
	gl.clearColor(0, 0, 0, 0);
	//Init the vertexes
	var vertexCount = 3; //We are making 3 vertexes
	var vertexSize = 4*Float32Array.BYTES_PER_ELEMENT; //Each vertex includes 4 Float elements. The "Float32Array" is the type of array that will hold our vertexes
	var arrayBuffer = new ArrayBuffer(vertexCount*vertexSize); //Allocate space for vertexes (ArrayBuffer is general purpose)
	
	var vertexArray = new Float32Array(arrayBuffer); //Make a FloatArray from the data that will be in the ArrayBuffer
	
	//Big array initializer; 3 vertexes, each with 4 floats associated with them
	vertexArray[0]=1.0;
	vertexArray[1]=-1.0;
	vertexArray[2]=0.0;
	vertexArray[3]=1.0;
	
	vertexArray[4]=-1.0;
	vertexArray[5]=2.0;
	vertexArray[6]=2.0;
	vertexArray[7]=1.0;
	
	vertexArray[8]=-1.0;
	vertexArray[9]=-2.0;
	vertexArray[10]=-1.0;
	vertexArray[11]=1.0;
	
	//Make a method to make doing this easier...
	
	//Make the positionBufferObject
	positionBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferObject); //Bind the positionBufferObject to the ARRAY_BUFFER context to do stuff with it
	//Set the size of the currently bound buffer
	gl.bufferData(gl.ARRAY_BUFFER, vertexArray, gl.STATIC_DRAW); //"Buffer data for the ArrayBuffer so that the vertex data is buffered.
	//The 2nd parameter is asking what we are buffering
	//The 3rd parameter is telling WebGL how we are going to use the data
	gl.bindBuffer(gl.ARRAY_BUFFER, null); //Set the binded context to nothing (by setting it to null)
}

function gameUpdate()
{
		loops++;
		document.getElementById("pp").innerHTML="Frames passed: " + loops + "";
}