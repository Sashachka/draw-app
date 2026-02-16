//in process still can't reach layer 1 and undo redo things there.
function FreehandTool() {
    this.icon = "assets/freehand.jpg";
    this.name = "freehand";

    // Undo/Redo stacks for freehand strokes
    let freehandUndoStack = [];
    let freehandRedoStack = [];

    let currentStroke = null;
    let isDrawing = false;
    let previousMouseX = -1;
    let previousMouseY = -1;

    this.draw = function (layer) {
        layer.strokeWeight(1);
        layer.stroke(myColor);
        if (mouseIsPressed && mousePressOnCanvas()) {
            if (!isDrawing) {
                // Start a new stroke when mouse is first pressed
                currentStroke = {
                    tool: "freehand",
                    color: myColor,
                    points: []
                };
                freehandUndoStack.push(currentStroke);
                freehandRedoStack = []; // Clear redo stack
                isDrawing = true;
            }

            // Draw a continuous line
            if (previousMouseX !== -1) {
                layer.stroke(myColor);
                layer.line(previousMouseX, previousMouseY, mouseX, mouseY);
            }

            // Store points for undo
            currentStroke.points.push({ x: mouseX, y: mouseY });

            previousMouseX = mouseX;
            previousMouseY = mouseY;
        } else {
            previousMouseX = -1;
            previousMouseY = -1;
            isDrawing = false;
        }
    };

    this.populateOptions = function (layer) {
    console.log("Buttons created");

    let undoButton = createButton("Undo");
    undoButton.id("undoButton");  // Assign an ID
    undoButton.parent("#4thOption");
    undoButton.mouseClicked(() => {
        if (freehandUndoStack.length > 0) {
            let lastStroke = freehandUndoStack.pop();
            freehandRedoStack.push(lastStroke);
            redrawFreehandCanvas(layer);
        }
    });

    let redoButton = createButton("Redo");
    redoButton.id("redoButton");  // Assign an ID
    redoButton.parent("#4thOption");
    redoButton.mouseClicked(() => {
        if (freehandRedoStack.length > 0) {
            let lastRedoStroke = freehandRedoStack.pop();
            freehandUndoStack.push(lastRedoStroke);
            redrawFreehandCanvas(layer);
        }
    });
};

    
    this.unselectTool = function () {
    console.log("Freehand tool unselected, removing buttons...");
    
    // Remove the undo and redo buttons
    select("#undoButton")?.remove();
    select("#redoButton")?.remove();
};


    function redrawFreehandCanvas(layer) {
    currentLayer.clear(); // Clear only the selected layer
    for (let stroke of freehandUndoStack) {
        drawStroke(stroke, layer);
    }
}
}

// Function to redraw a single freehand stroke
function drawStroke(strokeData, layer) {
    currentLayer.stroke(strokeData.color);
    currentLayer.noFill();

    if (strokeData.points.length > 1) {
        currentLayer.beginShape();
        for (let pt of strokeData.points) {
            currentLayer.vertex(pt.x, pt.y);
        }
        currentLayer.endShape();
    } else if (strokeData.points.length === 1) {
        currentLayer.point(strokeData.points[0].x, strokeData.points[0].y);
    }
}
