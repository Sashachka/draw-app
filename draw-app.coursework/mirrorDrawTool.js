function mirrorDrawTool() {
	this.name = "mirrorDraw";
	this.icon = "assets/mirrorDraw.jpg";

	//which axis is being mirrored (x or y) x is default
	this.axis = "x";
	//line of symmetry is halfway across the screen
	this.lineOfSymmetry = width / 2;

	//this changes in the p5.dom click handler. So storing it as
	//a variable self now means we can still access this in the handler
	var self = this;

	//where was the mouse on the last time draw was called.
	//set it to -1 to begin with
	var previousMouseX = -1; 
	var previousMouseY = -1;
 
	//mouse coordinates for the other side of the Line of symmetry.
	var previousOppositeMouseX = -1;
	var previousOppositeMouseY = -1;

	
	
	this.draw = function(layer) {
    // Display the last saved state of pixels
    layer.updatePixels();

    // Do the drawing if the mouse is pressed
    if (mouseIsPressed) {
        if (previousMouseX == -1) {
            previousMouseX = mouseX;
            previousMouseY = mouseY;
            previousOppositeMouseX = this.calculateOpposite(mouseX, "x");
            previousOppositeMouseY = this.calculateOpposite(mouseY, "y");
        } else {
            layer.line(previousMouseX, previousMouseY, mouseX, mouseY);
            previousMouseX = mouseX;
            previousMouseY = mouseY;

            var oX = this.calculateOpposite(mouseX, "x");
            var oY = this.calculateOpposite(mouseY, "y");
            layer.line(previousOppositeMouseX, previousOppositeMouseY, oX, oY);
            previousOppositeMouseX = oX;
            previousOppositeMouseY = oY;
        }
    } else {
        previousMouseX = -1;
        previousMouseY = -1;
        previousOppositeMouseX = -1;
        previousOppositeMouseY = -1;
    }

    // Save the pixel state (but without the symmetry line)
    layer.loadPixels();
};

	/*calculate an opposite coordinate the other side of the
	 *symmetry line.
	 *@param n number: location for either x or y coordinate
	 *@param a [x,y]: the axis of the coordinate (y or y)
	 *@return number: the opposite coordinate
	 */
	this.calculateOpposite = function(n, a) {
		//if the axis isn't the one being mirrored return the same
		//value
		if (a != this.axis) {
			return n;
		}

		//if n is less than the line of symmetry return a coorindate
		//that is far greater than the line of symmetry by the distance from
		//n to that line.
		if (n < this.lineOfSymmetry) {
			return this.lineOfSymmetry + (this.lineOfSymmetry - n);
		}

		//otherwise a coordinate that is smaller than the line of symmetry
		//by the distance between it and n.
		else {
			return this.lineOfSymmetry - (n - this.lineOfSymmetry);
		}
	};


	//when the tool is deselected update the pixels to just show the drawing and
	//hide the line of symmetry. Also clear options
	this.unselectTool = function() {
		updatePixels(); 
		//clear options
		select(".options").html("");
	};

	//adds a button and click handler to the options area. When clicked
	//toggle the line of symmetry between horizonatl to vertical
	this.populateOptions = function() {
		select(".options").html(
			"<button id='directionButton'>Make Horizontal</button>");
		// 	//click handler
		select("#directionButton").mouseClicked(function() {
			var button = select("#" + this.elt.id);
			if (self.axis == "x") {
				self.axis = "y";
				self.lineOfSymmetry = height / 2;
				button.html('Make Vertical');
			} else {
				self.axis = "x";
				self.lineOfSymmetry = width / 2;
				button.html('Make Horizontal');
			}
		});
	};
}