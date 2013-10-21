
function derp() {
	loadImage("blah", "bird.jpg");
	setCanvasInfo("joe", 600, 400, "2d");
	drawImage("blah", 0,0);
	
	connectKeyEvent(keyCodeRef.G, eep);
}

function eep() {
	alert("Eepers");
}
