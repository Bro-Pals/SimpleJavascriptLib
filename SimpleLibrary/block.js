
var blockArray = new Array(); // an array to hold all the blocks

// update all the blocks in the blockArray
function updateBlocks() {
	for (var i=0; i<blockArray.length; i++) {
		blockArray[i].update();
	}
}

/* The basic block used in physics for this library
 * x and y are for position of the block
 * width and height are the block's size
 */
var Block=Block;
function Block(_x, _y, _width, _height, _falling) {
	// add the block to the blockArray
	blockArray.push(this);
	//console.log("Block array length: "+blockArray.length);
	// the cubes's basic values
	this.x = _x;
	this.y = _y;
	this.width = _width;
	this.height = _height;
	this.falling = _falling;
	this.grounded = false;
	this.inAnimated = false;
	
	this.blockOn = null;
	this.canBurrowIn = true;
	
	// [x, y] velocity and acceleration
	this.velocity = [0, 0];
	this.acceleration = [0, 0];
	
	// set the block's x and y values
	this.setLocation=setLocation;
	function setLocation(_x, _y) {
		this.x = _x;
		this.y = _y;
	}
	
	// set the velocity values
	this.setVelocity=setVelocity;
	function setVelocity(_x, _y) {
		this.velocity[0]=_x;
		this.velocity[1]=_y;
	}
	
	// set the acceleration values
	this.setAcceleration=setAcceleration;
	function setAcceleration(_x, _y) {
		this.acceleration[0]=_x;
		this.acceleration[1]=_y;
	}
	
	// update the velocity and position of the cube
	// Later: Make it check for collisions
	this.update=update;
	function update() {
		if (this.falling) {
			this.acceleration[1] = 2; // gravity
		}
		
		// update the velocity with acceleration
		this.velocity = [this.velocity[0]+this.acceleration[0],
						 this.velocity[1]+this.acceleration[1]];
		
		this.x += this.velocity[0];
		this.y += this.velocity[1];
		
		// check for collisions with other blocks
		for (var i=0; i<blockArray.length; i++) {
			if (this.falling && blockArray[i]!=this && !blockArray[i].inAnimated) {
				var smallestMaxX = this.x + this.width > blockArray[i].x + blockArray[i].width ? 
					blockArray[i].x + blockArray[i].width : this.x + this.width;
				var largestMinX = this.x < blockArray[i].x ? blockArray[i].x : this.x;
				
				var smallestMaxY = this.y + this.height > blockArray[i].y + blockArray[i].height ? 
					blockArray[i].y + blockArray[i].height : this.y + this.height;
				var largestMinY = this.y < blockArray[i].y ? blockArray[i].y : this.y;
				
				var xPen = largestMinX - smallestMaxX;
				var yPen = largestMinY - smallestMaxY;
				
				if (!this.grounded) this.blockOn = null;
				
				if (xPen < 0 && yPen < 0) {
					if (Math.abs(yPen) < Math.abs(xPen)) {
						if (this.y > blockArray[i].y) {
							this.y = blockArray[i].y + blockArray[i].height;
						} else {
							this.y = blockArray[i].y - this.height;
							this.grounded = true; // lands on the ground
							this.blockOn = blockArray[i];
						}
						this.velocity[1] = 0;
					} else {
						if (this.x > blockArray[i].x) {
							this.x = blockArray[i].x + blockArray[i].width;
						} else {
							this.x = blockArray[i].x - this.width;
						}
						this.velocity[0] = 0;
					}
				}
			}
		}
		
	}
	
	this.remove=remove;
	function remove() {
		for (var i=0; i<blockArray.length; i++) {
			if (blockArray[i]==this) {
				blockArray.splice(i, 1);
			}
		}
	}
}
