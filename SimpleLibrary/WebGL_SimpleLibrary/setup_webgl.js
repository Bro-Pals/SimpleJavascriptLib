
var gl;

function SimpleRenderTemplate(displayFunction, initFunction)
{
	this.displayFunction=displayFunction;
	this.initFunction=initFunction;
	
	function display()
	{
		this.displayFunction();
	}
	
	function init()
	{
		this.initFunction();
	}
}

function init3DCanvas(canvasId)
{
	var canvas = document.getElementById(canvasId);
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