function CutTool(canvas) {
    this.name = "cutTool";
    this.icon = "assets/cut.png";

    let ctx = canvas.canvas.getContext('2d', { willReadFrequently: true });
    console.log("Canvas Context Initialized:", ctx);

    let selectMode = 0;
    let selectedArea = { x: 0, y: 0, w: 100, h: 100 };
    let selectButton;
    let selectedPixels = null;
    let previousMouseX = -1, previousMouseY = -1;

    this.populateOptions = function () {
        selectButton = createButton('Select area');
        selectButton.parent("#sizeOfStarControl");

        console.log("populate function works");

        selectButton.mouseClicked(function () {
            console.log("mousePressed work?");
            if (selectMode === 0) {
                selectMode = 1;
                selectButton.html("Cut");
                loadPixels(); // Store current frame
                console.log("cutcut");
            } 
            else if (selectMode === 1) {
                selectMode = 2;
                selectButton.html("End Paste");
                updatePixels();
                selectedPixels = get(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
                console.log(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
                console.log("paste?");
            } 
            else if (selectMode === 2) {
                selectMode = 0;
                loadPixels();
                selectedArea = { x: 0, y: 0, w: 100, h: 100 };
                selectButton.html('Select area');
                console.log("no rect");
            }
        });
    };

    this.draw = function (layer) {
        if (!layer) return; // Prevents errors if layer is undefined

        if (mouseIsPressed) {
            if (mousePressOnCanvas() && selectMode === 0) {
                // Normal drawing mode
                if (previousMouseX === -1) {
                    previousMouseX = mouseX;
                    previousMouseY = mouseY;
                } else {
                    layer.stroke(0); // Ensure stroke color is set
                    layer.line(previousMouseX, previousMouseY, mouseX, mouseY);
                    previousMouseX = mouseX;
                    previousMouseY = mouseY;
                }
            } 
            else if (mousePressOnCanvas() && selectMode === 1) {
                // Selection mode (show red rectangle as preview)
                selectedArea.x = mouseX;
                selectedArea.y = mouseY;

                push();  // Save drawing state
                noFill(); // Remove fill, so it doesn't get permanently drawn
                stroke(255, 0, 0, 150); // Red stroke with some transparency
                rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
                pop(); // Restore drawing state
            }
        } 
        else {
            // Reset previous mouse coordinates when mouse is released
            previousMouseX = -1;
            previousMouseY = -1;
        }

        if (selectMode === 2 && selectedPixels && mouseIsPressed) {
            // Paste the selected area where the mouse is clicked
            layer.image(selectedPixels, mouseX, mouseY);
        }
    };

    this.unselectTool = function () {
        updatePixels();
        select("#sizeOfStarControl").html(""); 
    };
}


