
/*
Main will contain all the game loop information

*/


// COPIED from https://github.com/KhronosGroup/WebGL/blob/master/sdk/demos/webkit/resources/J3DI.js
// makeBox
//
// Create a box with vertices, normals and texCoords. Create VBOs for each as well as the index array.
// Return an object with the following properties:
//
//  normalObject        WebGLBuffer object for normals
//  texCoordObject      WebGLBuffer object for texCoords
//  vertexObject        WebGLBuffer object for vertices
//  indexObject         WebGLBuffer object for indices
//  numIndices          The number of indices in the indexObject
//
function makeBox(ctx)
{
    // box
    //    v6----- v5
    //   /|      /|
    //  v1------v0|
    //  | |     | |
    //  | |v7---|-|v4
    //  |/      |/
    //  v2------v3
    //
    // vertex coords array
    var vertices = new Float32Array(
        [  1, 1, 1,  -1, 1, 1,  -1,-1, 1,   1,-1, 1,    // v0-v1-v2-v3 front
           1, 1, 1,   1,-1, 1,   1,-1,-1,   1, 1,-1,    // v0-v3-v4-v5 right
           1, 1, 1,   1, 1,-1,  -1, 1,-1,  -1, 1, 1,    // v0-v5-v6-v1 top
          -1, 1, 1,  -1, 1,-1,  -1,-1,-1,  -1,-1, 1,    // v1-v6-v7-v2 left
          -1,-1,-1,   1,-1,-1,   1,-1, 1,  -1,-1, 1,    // v7-v4-v3-v2 bottom
           1,-1,-1,  -1,-1,-1,  -1, 1,-1,   1, 1,-1 ]   // v4-v7-v6-v5 back
    );

    // normal array
    var normals = new Float32Array(
        [  0, 0, 1,   0, 0, 1,   0, 0, 1,   0, 0, 1,     // v0-v1-v2-v3 front
           1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,     // v0-v3-v4-v5 right
           0, 1, 0,   0, 1, 0,   0, 1, 0,   0, 1, 0,     // v0-v5-v6-v1 top
          -1, 0, 0,  -1, 0, 0,  -1, 0, 0,  -1, 0, 0,     // v1-v6-v7-v2 left
           0,-1, 0,   0,-1, 0,   0,-1, 0,   0,-1, 0,     // v7-v4-v3-v2 bottom
           0, 0,-1,   0, 0,-1,   0, 0,-1,   0, 0,-1 ]    // v4-v7-v6-v5 back
       );


    // texCoord array
    var texCoords = new Float32Array(
        [  1, 1,   0, 1,   0, 0,   1, 0,    // v0-v1-v2-v3 front
           0, 1,   0, 0,   1, 0,   1, 1,    // v0-v3-v4-v5 right
           1, 0,   1, 1,   0, 1,   0, 0,    // v0-v5-v6-v1 top
           1, 1,   0, 1,   0, 0,   1, 0,    // v1-v6-v7-v2 left
           0, 0,   1, 0,   1, 1,   0, 1,    // v7-v4-v3-v2 bottom
           0, 0,   1, 0,   1, 1,   0, 1 ]   // v4-v7-v6-v5 back
       );

    // index array
    var indices = new Uint8Array(
        [  0, 1, 2,   0, 2, 3,    // front
           4, 5, 6,   4, 6, 7,    // right
           8, 9,10,   8,10,11,    // top
          12,13,14,  12,14,15,    // left
          16,17,18,  16,18,19,    // bottom
          20,21,22,  20,22,23 ]   // back
      );

    var retval = { };

    retval.normalObject = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, retval.normalObject);
    ctx.bufferData(ctx.ARRAY_BUFFER, normals, ctx.STATIC_DRAW);

    retval.texCoordObject = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, retval.texCoordObject);
    ctx.bufferData(ctx.ARRAY_BUFFER, texCoords, ctx.STATIC_DRAW);

    retval.vertexObject = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, retval.vertexObject);
    ctx.bufferData(ctx.ARRAY_BUFFER, vertices, ctx.STATIC_DRAW);

    ctx.bindBuffer(ctx.ARRAY_BUFFER, null);

    retval.indexObject = ctx.createBuffer();
    ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, retval.indexObject);
    ctx.bufferData(ctx.ELEMENT_ARRAY_BUFFER, indices, ctx.STATIC_DRAW);
    ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, null);

    retval.numIndices = indices.length;

    return retval;
}

// COPIED from same file as above
//
// loadImageTexture
//
// Load the image at the passed url, place it in a new WebGLTexture object and return the WebGLTexture.
//
function loadImageTexture(ctx, url)
{
    var texture = ctx.createTexture();
    ctx.bindTexture(ctx.TEXTURE_2D, texture);
    ctx.texImage2D(ctx.TEXTURE_2D, 0, ctx.RGBA, 1, 1, 0, ctx.RGBA, ctx.UNSIGNED_BYTE, null);
    var image = new Image();
    //g_loadingImages.push(image);
    image.onload = function() { doLoadImageTexture(ctx, image, texture) }
    image.src = url;
    return texture;
}

function doLoadImageTexture(ctx, image, texture)
{
    //g_loadingImages.splice(g_loadingImages.indexOf(image), 1);
    ctx.bindTexture(ctx.TEXTURE_2D, texture);
    ctx.texImage2D(
        ctx.TEXTURE_2D, 0, ctx.RGBA, ctx.RGBA, ctx.UNSIGNED_BYTE, image);
    ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MAG_FILTER, ctx.LINEAR);
    ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.LINEAR);
    ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_S, ctx.CLAMP_TO_EDGE);
    ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_T, ctx.CLAMP_TO_EDGE);
    //ctx.generateMipmap(ctx.TEXTURE_2D)
    ctx.bindTexture(ctx.TEXTURE_2D, null);
}




var red = 1.0;
var green = 0.0;
var blue = 0.0;

// vertices for a 1x1 square
var vertices = [
   0.5,  0.5,
  -0.5,  0.5,
  -0.5, -0.5,
   0.5, -0.,5
]

// WebGL program variable
var program;
// box tutorial object
var tutorialBox;
var textureThing;
var u_normalMatrixLoc;
var u_modelViewProjMatrixLoc;

// define the states
GameManager.createState("main_state",
  function mainInit() {
    // WebGL setup and initilization stuffers...
    // it all feels similar to OpenCL but the pipeline is massively more complex.

    // vertex shader
    var vshader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vshader, document.getElementById("vshader").text);
    gl.compileShader(vshader);
    var vshaderCompiled = gl.getShaderParameter(vshader, gl.COMPILE_STATUS);
    if (!vshaderCompiled &&  !gl.isContextLost()) {
      console.log("Error compiling the vertex shader");
      var err = gl.getShaderInfoLog(vshader);
      console.log("Shader log: " + err);
      gl.deleteShader(vshader);
    }
    // fragment shader
    var fshader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fshader, document.getElementById("fshader").text);
    gl.compileShader(fshader);
    var fshaderCompiled = gl.getShaderParameter(fshader, gl.COMPILE_STATUS);
    if (!fshaderCompiled &&  !gl.isContextLost()) {
      console.log("Error compiling the vertex shader");
      var err = gl.getShaderInfoLog(fshader);
      console.log("Shader log: " + err);
      gl.deleteShader(fshader);
    }

    // create the program and attach the shaders
    program = gl.createProgram();
    gl.attachShader(program, vshader);
    gl.attachShader(program, fshader);
    // bind attirbutes (whatever those are)
    gl.bindAttribLocation(program, 0, "vNormal");
    gl.bindAttribLocation(program, 1, "vColor");
    gl.bindAttribLocation(program, 2, "vPosition");
    // idk what this does
    gl.linkProgram(program);
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked && !gl.isContextLost()) {
      console.error("Error linking the program!");
    }
    // have WebGL use that program
    gl.useProgram(program);
    // set more values
    gl.clearColor(1.0, 1.0, 0.0, 1.0);
    gl.clearDepth(10000);
    // enable stuff
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SOURCE_ALPHA);

    // set uniform values in shaders
    // see .pdf page 47 https://www.khronos.org/registry/gles/specs/2.0/es_full_spec_2.0.25.pdf
    // this makes the value of the lightDir vec3 in the vshader equal to <0,0,1>
    gl.uniform3f(gl.getUniformLocation(program, "lightDir"), 0, 0, 1);
    // this makes the sampler2d value in the fshader equal to 0
    gl.uniform1i(gl.getUniformLocation(program, "sampler2d"), 0);

    tutorialBox = makeBox(gl);
    // not going to worry about textures for right now...
    // see line 534 in https://github.com/KhronosGroup/WebGL/blob/master/sdk/demos/webkit/resources/J3DI.js
    textureThing = loadImageTexture(gl, "test.png");

    // enable vertex attribute arrays.. (IDK what this does at all)
    gl.enableVertexAttribArray(0);
    gl.enableVertexAttribArray(1);
    gl.enableVertexAttribArray(2);
    // bind the vertex buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, tutorialBox.vertexObject);
    gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 0, 0);
    // bind the normals bindBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, tutorialBox.normalObject);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    // bind the texture coordinates (because completeness)
    gl.bindBuffer(gl.ARRAY_BUFFER, tutorialBox.texCoordObject);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);
    // bind the index array (??)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tutorialBox.indexObject);

    u_normalMatrixLoc = gl.getUniformLocation(program, "u_normalMatrix");
    u_modelViewProjMatrixLoc = gl.getUniformLocation(program, "u_modelViewProjMatrix");
    // initialization completed!!!!!********

    // set viewport
    gl.viewport(0.0, 0.0, 1.0, 1.0);

  },
  function mainUpdate(_dt) {
    //console.log("I've updated!");
  },
  function mainRender(_dt) {
    //  console.log("I've rendered!");
    gl.clearColor(red, green, blue, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // normal matrix
    var normalM = new Float32Array(16);
    normalM[0]  = 1; normalM[1]  = 0; normalM[2]  = 0; normalM[3]  = 0;
    normalM[4]  = 0; normalM[5]  = 1; normalM[6]  = 0; normalM[7]  = 0;
    normalM[8]  = 0; normalM[9]  = 0; normalM[10] = 1; normalM[11] = 0;
    normalM[12] = 0; normalM[13] = 0; normalM[14] = 0; normalM[15] = 1;
    gl.uniformMatrix4fv(u_normalMatrixLoc, false, normalM);

    // model view projection matrix
    var modVwPjM = new Float32Array(16);
    modVwPjM[0]  = 1; modVwPjM[1]  = 0; modVwPjM[2]  = 0; modVwPjM[3]  = 0;
    modVwPjM[4]  = 0; modVwPjM[5]  = 1; modVwPjM[6]  = 0; modVwPjM[7]  = 0;
    modVwPjM[8]  = 0; modVwPjM[9]  = 0; modVwPjM[10] = 1; modVwPjM[11] = 0;
    modVwPjM[12] = 0; modVwPjM[13] = 0; modVwPjM[14] = 0; modVwPjM[15] = 1;
    gl.uniformMatrix4fv(u_modelViewProjMatrixLoc, false, modVwPjM);

    // bind texture (whatever that does)
    gl.bindTexture(gl.TEXTURE_2D, textureThing);

    // draw the box????
    gl.drawElements(gl.TRIANGLES, tutorialBox.numIndices, gl.UNSIGNED_BYTE, 0);
  },
  {
    key : function(_pressed, _code) {
      console.log("Key code: " + _code)
      if (!_pressed) {
        red = Math.random();
        green = Math.random();
        blue = Math.random();
      }
    }
  }
);

// set the canvas
GameManager.setCanvas("joe", "webgl");
// set initial state
GameManager.setState("main_state");
//console.log(GameManager.running);
// run game loop
GameManager.loop();
