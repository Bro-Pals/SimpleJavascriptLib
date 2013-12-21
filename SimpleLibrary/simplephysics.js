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
	blockArray[(blockArray.length)] = this;
	// the cubes's basic values
	this.x = _x;
	this.y = _y;
	this.width = _width;
	this.height = _height;
	this.falling = _falling;
	
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
		if (!this.falling) {
			return;
		}
		this.acceleration[1] = 2; // gravity
		
		// update the velocity with acceleration
		this.velocity = [this.velocity[0]+this.acceleration[0],
						 this.velocity[1]+this.acceleration[1]];
		
		// check for collisions with other blocks
		for (var i=0; i<blockArray.length; i++) {
			if (blockArray[i]!=this) {
				// check the X axis
				collisions = 0;
				if (this.willIntersectsX(blockArray[i])) {
					if (//this.velocity[0] > 0 &&
						(this.x+this.width+this.velocity[0] > blockArray[i].x)) {
						this.x = blockArray[i].x-this.width;
					} else if (//this.velocity[0] < 0 &&
						(this.x+this.velocity[0] < blockArray[i].x+blockArray[i].width)) {
						this.x = blockArray[i].x+blockArray[i].width;
					}
					this.acceleration[0] = 0;
					this.velocity[0] = 0;
				}
				// check the Y axis 
				if (this.willIntersectsY(blockArray[i])) {
					if (//this.velocity[1] > 0 && 
						(this.y+this.height+this.velocity[1] > blockArray[i].y)) {
						this.y = blockArray[i].y-this.height;
					} else if (//this.velocity[1] < 0 && 
						(this.y+this.velocity[1] < blockArray[i].y+blockArray[i].height)) {
						this.y = blockArray[i].y+blockArray[i].height;
					}
					this.acceleration[1] = 0;
					this.velocity[1] = 0;
				}
				if (this.isIntersecting(blockArray[i], 0, 0)) {
					this.y = this.y - 1;
				}
			}
		}
		
		if (this.velocity[1] == 0) {
			if (this.velocity[0] > 1) {
				this.velocity[0] = this.velocity[0] - 1;
			} else if (this.velocity[0] < -1) {
				this.velocity[0] = this.velocity[0] + 1;
			} else {
				this.velocity[0] = 0;
			}
		}
		
		// update the position with acceleration
		this.x = this.x+this.velocity[0];
		this.y = this.y+this.velocity[1];
		
	}
	
	/* see if the block will collide with the other block if
	 * you add it's x velocity to the x position */
	this.willIntersectsX=willIntersectsX;
	function willIntersectsX(otherBlock) {
		return ((otherBlock.x+otherBlock.width > this.x+this.velocity[0]) &&
			(otherBlock.x < this.x+this.width+this.velocity[0]) &&
			(otherBlock.y+otherBlock.height > this.y) && 
			(otherBlock.y < this.y+this.height));
	}
	
	/* see if the block will collide with the other block if
	 * you add it's y velocity to the y position */
	this.willIntersectsY=willIntersectsY;
	function willIntersectsY(otherBlock) {
		return ((otherBlock.x+otherBlock.width > this.x) &&
			(otherBlock.x < this.x+this.width) && 
			(otherBlock.y+otherBlock.height > this.y+this.velocity[1]) && 
			(otherBlock.y < this.y+this.height+this.velocity[1]));
	}
	
	/* Just check if this block is intersecting another block
	 * After translating this block by a certain number*/
	this.isIntersecting=isIntersecting;
	function isIntersecting(otherBlock, _xMod, _yMod) {
		return ((otherBlock.x+otherBlock.width > _xMod+this.x) &&
			(otherBlock.x < _xMod+this.x+this.width) &&
			(otherBlock.y+otherBlock.height > _yMod+this.y) && 
			(otherBlock.y < _yMod+this.y+this.height));
	}
}

/* Shorthand for checking collision between two rectangles, without
 * creating any Block objects
 */
function isColliding(_x1, _y1, _width1, _height1, _x2, _y2, _width2, _height2) {
	return ((_x2 + _width2 > _x1) &&
			(_x2 < _width1 + _x1) &&
			(_y2 + _height2 > _y1) &&
			(_y2 < _height1 + _y1));
}

