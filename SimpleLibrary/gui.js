
var buttonsArray = new Array();

var SimpleButton=SimpleButton;
function SimpleButton(_x, _y, _width, _height, _imageID, _whatHappens) {
	this.x=_x;
	this.y=_y;
	this.width=_width;
	this.height=_height;
	this.whatHappens = _whatHappens; // a function called when this button is clicked
	this.imageID = _imageID;
	
	buttonsArray.push(this); // add itself to the array
	
	this.runConnected=runConnected;
	function runConnected(event) {
		this.whatHappens(event);
	}
}

var ToggleButton=ToggleButton;
function ToggleButton(_x, _y, _width, _height, _imageIDup, _imageIDdown, _whatHappens) {
	this.x=_x;
	this.y=_y;
	this.width=_width;
	this.height=_height;
	this.whatHappens = _whatHappens; // a function called when this button is clicked
	this.imageIDup = _imageIDup;
	this.imageIDdown = _imageIDdown;
	this.imageID = _imageIDdown;
	this.toggled = false;
	
	buttonsArray.push(this); // add itself to the array
	
	this.setToggle=setToggle;
	function setToggle(val) {
		if (val) {
			this.imageID = this.imageIDup;
			toggle = true
		} else {
			this.imageID = this.imageIDdown;
			toggle = false;
		}
	}
	
	this.runConnected=runConnected;
	function runConnected(event) {
		this.whatHappens(event, this);
	}
}

function checkButtonClicks(event) {
	var x = event.clientX;
	var y = event.clientY;
	
	for (var i=0; i<buttonsArray.length; i++) {
		if (x > buttonsArray[i].x && x < buttonsArray[i].x + buttonsArray[i].width &&
			y > buttonsArray[i].y && y < buttonsArray[i].y + buttonsArray[i].height) {
			buttonsArray[i].runConnected(event);
		}
	}
}

addCanvasMouseDown(checkButtonClicks);

// when we want new sets of buttons!
function clearButtons() {
	buttonsArray = new Array();
}
