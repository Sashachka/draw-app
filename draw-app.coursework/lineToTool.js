function LineToTool(){
    this.icon = "assets/lineTo.jpg";
    this.name = "LineTo";

    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;

    this.draw = function(layer) {
        layer.strokeWeight(1);
        layer.stroke(myColor);
        if (mousePressOnCanvas() && mouseIsPressed) {
            // Start drawing on first click
            if (startMouseX == -1) {
                startMouseX = mouseX;
                startMouseY = mouseY;
                drawing = true;
                layer.loadPixels(); // Save the current canvas
            } else {
                // Continuously preview the line without making it permanent
                layer.updatePixels(); // Reset to original before drawing new preview
                layer.line(startMouseX, startMouseY, mouseX, mouseY);
            }
        } 
        else if (drawing) {
            // Finalize the line when mouse is released
            drawing = false;
            //layer.line(startMouseX, startMouseY, mouseX, mouseY);
            startMouseX = -1;
            startMouseY = -1;
        }
    };
}
