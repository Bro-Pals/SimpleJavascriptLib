
/* The basic block used in physics for this library
 * x and y are for position of the block
 * width and height are the block's size
 */
var Block=Block;
function Block(_x, _y, _width, _height) {
	// the cubes's basic values
	this.x = _x;
	this.y = _y;
	this.width = _width;
	this.height = _height;
	
	// [x, y] velocity and acceleration
	this.velocity = [0, 0];
	this.acceleration = [0, 0];
	
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
		// update the velocity with acceleration
		this.velocity = [this.velocity[0]+this.acceleration[0],
						 this.velocity[1]+this.acceleration[1]];
		
		// update the position with acceleration
		this.x = this.x+this.velocity[0];
		this.y = this.y+this.velocity[1];
	}
}
