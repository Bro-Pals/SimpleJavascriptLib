
var particleArray = new Array();

var Particle=Particle;
function Particle(_x, _y, _imageID, _timeAlive) {
	//console.log("Created a particle");
	var dateThing = new Date();
	this.startTime = dateThing.getTime();
	this.x=_x;
	this.y=_y;
	this.imageID=_imageID;
	this.timeOutTime = dateThing.getTime() + _timeAlive;
	
	particleArray.push(this);
	
	this.timedOut=timedOut;
	function timedOut() {
		var dateThing = new Date();
		return (dateThing.getTime() > this.timeOutTime);
	}
}

function updateParticles() {
	//console.log("updated the particles");
	for (var i=0; i<particleArray.length; i++) {
		if (particleArray[i].timedOut()) {
			//console.log("A particle timed out");
			particleArray.splice(i, 1);
		}
	}
}
