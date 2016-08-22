
/*
  Game things will contain all the functions and definitions that
  are made to make creating the game easier.

  List of functions:
  * createState(_key, _init, _update, _render, [_eventFuncObj]) - create state with given functions.
  * setState(_key) - set the active state. State must have been created already.
  * loop() - begin game loop.
  * setCanvas(_id, [_contextType]) - Set the canvas for event handling
  *       the setCanvas() method should be called during initialization.

  List of event functions to possibly have in the _eventFuncObj argument
  * key(_pressed, _code) - a key event
  * mouse(_pressed, _x, _y) - mouse event with mouse position
  * mouseMove(_x, _y) - mouse event when the mouse movess
*/

// WebGL context.
var gl;

/**
 lthough there is canvas width and height, it is reccomended to use
   gl.drawingBufferWidth and  gl.drawingBufferHeight.
   https://www.khronos.org/registry/webgl/specs/latest/1.0/ Section 5.14.1
*/

var GameManager = (function() {
  // frames per second of the loop
  var fps = 30;
  // difference between frames.
  var diff = 1000 / fps;

  // reference to a state that is running
  var running = null;
  // mapping of all the states created "string"=>{state}
  var states = [];
  // the reference to a canvas
  var canvas;
  // whether or not the canvas is set.
  var isCanvasSet = false;

  // Event function called when a key is pressed
  function handleKeyDown(_e) {
    if (running.s_eventFuncObj.key) {
      var e = _e ? _e : window.event;
      running.s_eventFuncObj.key(true, e.keyCode);
    }
  }

  // Event function called when a key is released
  function handleKeyUp(_e) {
    if (running.s_eventFuncObj.key) {
      var e = _e ? _e : window.event;
      running.s_eventFuncObj.key(false, e.keyCode);
    }
  }

  // Event function called when the mouse is pressed
  function handleMouseDown(_e) {
    if (running.s_eventFuncObj.mouse) {
      running.s_eventFuncObj.mouse(true, _e.clientX, _e.clientY);
    }
  }

  // Event function called when the mouse is released
  function handleMouseUp(_e) {
    if (running.s_eventFuncObj.mouse) {
      running.s_eventFuncObj.mouse(false, _e.clientX, _e.clientY);
    }
  }

  // Event function called when the mouse is moved
  function handleMouseMove(_e) {
    if (running.s_eventFuncObj.mouseMove) {
      running.s_eventFuncObj.mouseMove(_e.clientX, _e.clientY);
    }
  }

  /**
   *  Set the canvas for the WebGL object and events handling.
   */
  function setCanvas(_id, _contextType) {
    var contextType;
		if (!_contextType) {
			contextType = "2d"; // default context
		} else {
			contextType = _contextType;
		}
		var canvas = document.getElementById(_id);
		context = canvas.getContext(contextType);

    // setup WebGL if the context type is webgl.
    if (contextType == "webgl") {
      // WebGL setup with canvas
      // https://www.khronos.org/webgl/wiki/FAQ
      if (!window.WebGLRenderingContext) {
        document.write("Error: Browser does not have WebGL; get WebGL " +
          "<a href=\"http://get.webgl.org\">here</a>.");
      } else {
        if (!context) {
          // browser supports WebGL but initialization failed.
          document.write("browser supports WebGL but initialization failed. " +
            "<a href=\"http://get.webgl.org/troubleshooting\">troublshooting</a>.");
        } else {
          gl = context; // set the global gl variable.
        }
      }
    }

		if (isCanvasSet) {
			// remove all events from the old canvas
			canvas.removeEventListener('mousedown',handleMouseDown, false);
			canvas.removeEventListener('mouseup',handleMouseUp, false);
			canvas.removeEventListener('keydown',handleKeyDown, false);
			canvas.removeEventListener('keyup',handleKeyUp, false);
			canvas.removeEventListener('mousemove',handleMouseMove, false);
		}

		canvas.addEventListener('mousedown',handleMouseDown, false);
		canvas.addEventListener('mouseup',handleMouseUp, false);
		canvas.addEventListener('keydown',handleKeyDown, false);
		canvas.addEventListener('keyup',handleKeyUp, false);
		canvas.addEventListener('mousemove',handleMouseMove, false);

		/* canvas focus http://www.dbp-consulting.com/tutorials/canvas/CanvasKeyEvents.html */
		canvas.setAttribute('tabindex','0');
		canvas.focus();
		isCanvasSet = true;
  }

  /** the function to create a state in the GameState object
   *  _key is the key that the state will be refered to
   *  _init is the initialization function
   *  _update is the update function. Takes one argument, a number that is the
   *          number of milliseconds that the frame took
   *  _render is the render function. Takes one argument, a number that is the
   *          number of milliseconds that the frame took
   *  _eventFuncObj is an optional object containing any event listeners
   *          the user may want to have.
   */
  function createState(_key, _init, _update, _render, _eventFuncObj) {
    if (states[_key]) {
      console.error("Error: A state with the key " + _key + " already exists.");
      return;
    }
    if (!_eventFuncObj) {
      _eventFuncObj = {}; // empty object
    }
    // create a state with the proper key.
    states[_key] = { s_init : _init,  s_update : _update,
      s_render : _render, s_eventFuncObj : _eventFuncObj};
  }
  /** Set the running state.
   *  _key is the key of the state to switch to.
   */
  function setState(_key) {
    running = states[_key];
    running.s_init();
  }

  // helper function to loop.
  function loop_aux() {
    //console.log("Running state: " + (running));
    if (running == undefined || running == null) {
      console.error("Error: Could not begin loop(); there is no active state.");
      return;
    }
    var frameActiveScreen = running; // in case it changes mid-frame
    var waitBetweenFrames = 1000 / fps;
    start = (new Date()).getTime();
    frameActiveScreen.s_update(diff);
    frameActiveScreen.s_render(diff);
    // https://www.khronos.org/webgl/wiki/FAQ
    window.requestAnimationFrame(loop_aux);

    diff = (new Date()).getTime() - start;
    /*
    if (waitBetweenFrames - diff > 0) {
      setTimeout(loop, waitBetweenFrames - diff);
    } else {
      loop();
    }
    */

  }

  

  /**
   * Begin the game loop.
   */
  function loop() {
     // begin loop after a brief delay
     setTimeout(function() { window.requestAnimationFrame(loop_aux); }, 200);

  }

  function getCanvasWidth() {
    return canvas.width;
  }

  function getCanvasHeight() {
    return canvas.height;
  }

  return {
    setCanvas : setCanvas,
    setState : setState,
    createState : createState,
    loop : loop,
    getCanvasWidth : getCanvasWidth,
    getCanvasHeight : getCanvasHeight
  };
})();

/*
	Global functions to help work with WebGL
*/

/**
	Checks to see if global variable "gl" is set, and 
	if it isn't logs an error message and returns false.
	If the globabl variable is set, this function returns 
	true.
	_funcName is the name of the function that is
		trying to be called
*/
function webGLContextExists(_funcName) {
	if (!gl) {
		console.log("No WebGL context, cannot call " + _funcName);
		return false;
	} else {
		return true;
	}
}

/**
	Loads a WebGL shader using the text inside the
	element specified by _id as the shader source.
	If there is an error, then it is logged, and this
	function returns null. If it compiles correctly, then
	this function returns the shader.
	_id is the id of the element with the shader source.
	_type is the type of the shader. This should be
		either gl.VERTEX_SHADER or gl.FRAGMENT_SHADER.
*/
function loadShader(_id, _type) {
	if (!webGLContextExists("loadShader"))
		return null;
	//Check to see if the element actually exists first
	var elem = document.getElementById(_id);
	if (!elem) {
		console.log("No element with id \"" + _id + "\" for shader source.");
		return null;
	}
	var shader = gl.createShader(_type);
	gl.shaderSource(shader, elem.text); //Give it the element's text as source
	gl.compileShader(shader);
	//Check to see if it compiled correctly
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		//Log error and return 0 
		console.log(elem.text);
		console.log(gl.getShaderInfoLog(shader));
		return null;
	}
	//Compiled correctly, return the shader
	return shader;
}

/**
	Creates a program, links the two given
	shaders to it, and then returns it. If
	the link fails, then the error is logged
	and this function returns null.
	_vertex is the name of the vertex shader to use.
	_fragment is the name of the fragment shader to use.
*/
function makeProgram(_vertex, _fragment) {
	if (!webGLContextExists("makeProgram"))
		return 0;
	if (!_vertex) {
		console.log("The vertex shader for the program is null");
		return null;
	}
	if (!_fragment) {
		console.log("The fragment shader for the program is null");
		return null;
	}
	var program = gl.createProgram();
	//Attach shaders before linking
	gl.attachShader(program, _vertex);
	gl.attachShader(program, _fragment);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.log(gl.getProgramInfoLog(program));
		return null;
	}
	//Detach shaders after linking
	gl.detachShader(program, _vertex);
	gl.detachShader(program, _fragment);
	return program;
}

/**
	Loads the image with the specified id into a WebGL 
	texture, and then returns the texture. If an error
	occurs, then it is logged and this function returns
	null. The image must be square, and have a width and
	height that is a power of 2.
	_id is the id of the image to load as a texture.
*/
function loadTexture(_id) {
	
}
