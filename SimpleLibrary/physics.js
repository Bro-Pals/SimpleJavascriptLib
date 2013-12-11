
// This physics prevents clipping of blocks, but the collision behaves very strangely
// use simplephysics.js will have less strange physics

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
	
	var buffer = 0.6; // buffer for collisions
	
	// update the velocity and position of the cube
	// Later: Make it check for collisions
	this.update=update;
	function update() {
		if (!this.falling) {
			return;
		}
		this.acceleration[1] = 2; // gravity
		// check for collisions with other blocks
		for (var i=0; i<blockArray.length; i++) {
			if (blockArray[i]!=this) {
				// check the X axis
				if (this.willIntersectsX(blockArray[i])) {
					if ((this.velocity[0] > 0) && // if it was moving right
					    (this.x+this.width+this.velocity[0] > blockArray[i].x)) {
							this.x = blockArray[i].x-this.width-buffer;
						} else if ((this.velocity[0] < 0) && // if it was moving left
					    (this.x+this.velocity[0] < blockArray[i].x+blockArray[i].width)) {
							this.x = blockArray[i].x+blockArray[i].width+buffer;
						}
					this.acceleration[0] = 0;
					this.velocity[0] = 0;
				}
				// check the Y axis 
				if (this.willIntersectsY(blockArray[i])) {
					if ((this.velocity[1] > 0) && // if it was moving down
					    (this.y+this.height+this.velocity[1] > blockArray[i].y)) {
							this.y = blockArray[i].y-this.height-buffer;
						} else if ((this.velocity[1] < 0) && // if it was moving up
					    (this.y+this.velocity[1] < blockArray[i].y+blockArray[i].height)) {
							this.y = blockArray[i].y+blockArray[i].height+buffer;
						}
					this.acceleration[1] = 0;
					this.velocity[1] = 0;
				}
			}
		}
		
		// check and move intersecting blocks
		var clippingBlocks = 0;
		do {
			clippingBlocks = 0;
			for (var i=0; i<blockArray.length; i++) {
				if (blockArray[i]!=this) {
					// check the Y axis 
					if (this.isIntersecting(blockArray[i], 0, 0)) {
						clippingBlocks++;
						var ytran=0;
						var finalTrans = 0;
						var newSpotFound = false;
						while (!newSpotFound) {
							ytran++;
							if (!this.isIntersecting(blockArray[i], 0, ytran)) {
								finalTrans = ytran + buffer;
								break;
							} else if (!this.isIntersecting(blockArray[i], 0, -ytran)) {
								finalTrans = -ytran - buffer;
								break;
							}
						}
						this.y = this.y + finalTrans;

						var xtran=0;
						var finalTrans = 0;
						var newSpotFound = false;
						while (!newSpotFound) {
							xtran++;
							if (!this.isIntersecting(blockArray[i], xtran, 0)) {
								finalTrans = xtran + buffer;
								break;
							} else if (!this.isIntersecting(blockArray[i], -xtran, 0)) {
								finalTrans = -xtran - buffer;
								break;
							}
						}
						this.x = this.x + finalTrans;
					}
				}
			}
		} while(clippingBlocks > 0); 
		
		// update the velocity with acceleration
		this.velocity = [this.velocity[0]+this.acceleration[0],
						 this.velocity[1]+this.acceleration[1]];
		
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
		var buffer = 1;
		return ((otherBlock.x+otherBlock.width > _xMod+this.x) &&
			(otherBlock.x < _xMod+this.x+this.width) &&
			(otherBlock.y+otherBlock.height > _yMod+this.y) && 
			(otherBlock.y < _yMod+this.y+this.height));
	}
}
