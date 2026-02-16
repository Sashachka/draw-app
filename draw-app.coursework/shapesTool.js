function ShapesTool() {
    this.name = 'shapesTool';
    this.icon = 'assets/line.jpg';

    let editMode = false;
    let currentShape = [];
    let previewShape = [];
    let previewLayer = null;
  

    // Clear Button handler
    select("#clearButton").mouseClicked(() => {
        currentShape = []; // Clear shape data
        previewShape = [];
        if (previewLayer) previewLayer.clear();
    });

    this.draw = function (layer) {
        if (!layer) return; // Prevent crashes if layer isn't ready
        currentLayer = layer; // Store the main drawing layer
        layer.noFill();
        layer.stroke(myColor);
        if (!previewLayer) {
            previewLayer = createGraphics(width, height); // Create an off-screen layer
        }

        previewLayer.clear(); // Reset preview layer

        if (mousePressOnCanvas() && mouseIsPressed) {
            if (!editMode) {
                previewShape.push({ x: mouseX, y: mouseY });
            } else {
                // Move existing vertex temporarily
                for (let i = 0; i < previewShape.length; i++) {
                    if (dist(previewShape[i].x, previewShape[i].y, mouseX, mouseY) < 15) {
                        previewShape[i].x = mouseX;
                        previewShape[i].y = mouseY;
                    }
                }
            }
        }

        // Draw preview shape
        previewLayer.beginShape();
        for (let i = 0; i < previewShape.length; i++) {
            previewLayer.vertex(previewShape[i].x, previewShape[i].y);
            if (editMode) {
                previewLayer.fill('red');
                previewLayer.ellipse(previewShape[i].x, previewShape[i].y, 5);
                previewLayer.noFill();
            }
        }
        previewLayer.endShape();

        // Show the preview layer on top of the main canvas
        image(previewLayer, 0, 0);
    };

    this.unselectTool = function () {
        updatePixels();
        select("#sizeOfStarControl").html("");
        select("#numberOfStarsControl").html("");
    };

    this.populateOptions = function () {
        select("#sizeOfStarControl").html("<button id='editButton'>Edit Shape</button>");
        select("#editButton").mouseClicked(function () {
            let button = select("#" + this.elt.id);
            editMode = !editMode;
            button.html(editMode ? "Add Vertices" : "Edit Shape");
        });

        select("#numberOfStarsControl").html("<button id='finishButton'>Finish Shape</button>");
        
        select("#finishButton").mouseClicked(() => {
            let button = select("#finishButton");
            editMode = false;

            if (previewShape.length > 0) {
                currentShape = [...previewShape]; // Store finalized shape

                // Draw shape on the main drawing layer
                drawingLayer.beginShape();
                for (let i = 0; i < currentShape.length; i++) {
                    drawingLayer.vertex(currentShape[i].x, currentShape[i].y);
                }
                drawingLayer.endShape(CLOSE);
            }

            // Clear preview and reset shape storage
            previewShape = [];
            currentShape = [];
            previewLayer.clear(); // Remove preview

            button.html("Finish Shape");
        });
    };
}

