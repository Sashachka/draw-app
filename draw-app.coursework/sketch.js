//everything works god damn:)
var toolbox = null;
var helpers = null;

var myColor = '#000000';

 // Ensure it's defined before GUI is created
var drawStrok = true; 
var drawFill = true;
var strokeWidth = 1;
var strokeColor = '#000000';
var fillColor = '#000000';
var shape;

var gui;

let lastSelectedTool = null; // Track the last selected tool

let backgroundLayer;
let drawingLayer;
let currentLayer;

function setup() {
    let canvasContainer = select('#content');
    let canvas = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
    canvas.parent("content");

    backgroundLayer = createGraphics(canvasContainer.size().width, canvasContainer.size().height);
    backgroundLayer.background(255);

    drawingLayer = createGraphics(canvasContainer.size().width, canvasContainer.size().height);
    drawingLayer.clear();

    currentLayer = drawingLayer;

    helpers = new HelperFunctions();
    toolbox = new Toolbox();

    toolbox.addTool(new FreehandTool()); 
    toolbox.addTool(new LineToTool());
    toolbox.addTool(new SprayCanTool());
    toolbox.addTool(new mirrorDrawTool());
    toolbox.addTool(new StarTool());
    toolbox.addTool(new FlowerTool());
    toolbox.addTool(new Treev1Tool());
    toolbox.addTool(new TreeTool());
    toolbox.addTool(new BeeTool());
    toolbox.addTool(new ShapesTool());
    toolbox.addTool(new ChooseShapeTool());
    toolbox.addTool(new CutTool(canvas));
    toolbox.addTool(new StampsTool());
    toolbox.addTool(new TextTool());

    gui = createGui('Colour');
    gui.addGlobals('myColor');
    gui.setPosition(outerWidth / 50, outerHeight / 1.2);

    select("#layer").mouseClicked(() => {
        currentLayer = backgroundLayer;
        console.log("Switched to background layer");
    });

    select("#layer2").mouseClicked(() => {
        currentLayer = drawingLayer;
        console.log("Switched to drawing layer");
    });
    
   
}

function draw() {
    image(backgroundLayer, 0, 0);
    image(drawingLayer, 0, 0);

    push();
    strokeWeight(3);
    stroke("red");
    if (toolbox.selectedTool instanceof mirrorDrawTool) {
        if (toolbox.selectedTool.axis == "x") {
            line(width / 2, 0, width / 2, height);
        } else {
            line(0, height / 2, width, height / 2);
        }
    }
    pop();

    // Check if the selected tool has changed
    if (toolbox.selectedTool !== lastSelectedTool) {
        gui.hide(); // Hide previous GUI settings

        if (toolbox.selectedTool instanceof StampsTool) {
             drawStrok = true; 
            drawFill = true;
            strokeWidth = 1;
            console.log('stamps tool change');
            shape = ['circle', 'triangle', 'square', 'pentagon', 'star'];
            gui = createGui('Stamps Tool');
            gui.addGlobals('shape', 'drawFill','drawStrok', 'fillColor', 'strokeColor', 'strokeWidth');
            
            //gui.setGlobal('shape', ['circle', 'triangle', 'square', 'pentagon', 'star']);
            gui.setPosition(outerWidth / 50, outerHeight / 1.5);
        } else {
            drawStrok = true; 
            drawFill = true;
            strokeWidth = 1;
            console.log('changed to colour');
            gui = createGui('Colour');
            gui.addGlobals('myColor');
            gui.setPosition(outerWidth / 50, outerHeight / 1.2);
        }

        lastSelectedTool = toolbox.selectedTool; // Update tracking variable
    }

    // Ensure the current tool's draw function is called
    if (toolbox.selectedTool && toolbox.selectedTool.hasOwnProperty("draw")) {
        toolbox.selectedTool.draw(currentLayer);
    }
}


// Mouse released to stop drawing
function mouseReleased() {
    isDrawing = false; 
}

function mousePressOnCanvas() {
    return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
}


function keyTyped() {
    if (toolbox.selectedTool instanceof TextTool) {
        toolbox.selectedTool.keyTyped();
    }
}

function keyPressed() {
    if (toolbox.selectedTool instanceof TextTool) {
        toolbox.selectedTool.keyPressed();
    }
}
