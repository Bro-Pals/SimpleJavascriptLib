

// the first method ran
function derp() {
	setCanvasInfo("joe", 640, 480, "2d");
	
	blockArray.push(new Block(100, 400, 300, 30, false));
	
	setInterval(function() {
		updateBlocks();
		fillBackground("#FFFFFF");
		var borderSize = 2;
		for (var i=0; i<blockArray.length; i++) {
			drawBlock(blockArray[i], "#000000");
			drawBox(blockArray[i].x+borderSize, blockArray[i].y+borderSize,
					blockArray[i].width-(2*borderSize), blockArray[i].height-(2*borderSize),
					"#CCCCCC");
		}
	}, 40);
}

var fallThis = true;

function clickedCanvas(event) {
	var width = 30 + Math.round(Math.random()*50);
	var height = 30 + Math.round(Math.random()*50);
	var x = event.clientX - (width/2);
	var y = event.clientY - (height/2);
	
	blockArray.push(new Block(x, y, width, height, fallThis)); 
	
	//if (fallThis) { fallThis = false; } else { fallThis = true; }
}

derp();

// event listeners
document.addEventListener('keydown',pressKey,false);
