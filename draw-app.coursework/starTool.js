function StarTool() {
    this.name = "starTool";
    this.icon = "assets/star.png";
 
    var starSizeSlider = createSlider(5, 50, 20);
    var nStarSlider = createSlider(1, 20, 5);
    var nPointsSlider = createSlider(5, 20, 1);

    var isFillActive = true;
 
    this.draw = function (layer) {
        if (mousePressOnCanvas() && mouseIsPressed) {
            for (let i = 0; i < nStarSlider.value(); i++) {
                var starSize = starSizeSlider.value();
                var pointNumber = nPointsSlider.value();
                var starX = random((mouseX - starSize / 2) - 20, (mouseX - starSize / 2) + 20);
                var starY = random((mouseY - starSize / 2) - 20, (mouseY - starSize / 2) + 20);
                
                // Apply fill and stroke colors
                if (isFillActive) {
                    layer.fill(myColor);
                } else {
                    layer.noFill();
                }
                layer.stroke(myColor);
                
                drawStar(layer, starX, starY, starSize, starSize, pointNumber);
            }
            layer.loadPixels(); // Save the drawing on the layer
        }
    };

    this.unselectTool = function () {
        updatePixels();
        select("#sizeOfStarControl").html(""); 
        select("#numberOfStarsControl").html("");
        select("#numbersOfPointsControl").html("");
        select("#4thOption").html("");
    };

    this.populateOptions = function () {
        select("#sizeOfStarControl").html("Size of Star: ");
        starSizeSlider.parent("sizeOfStarControl");
 
        select("#numberOfStarsControl").html("Number of Stars: ");
        nStarSlider.parent("numberOfStarsControl");

        select("#numbersOfPointsControl").html("Number of Points: ");
        nPointsSlider.parent("numbersOfPointsControl");

        let fillButton = createButton("Unfill");
        fillButton.parent("#4thOption");
        fillButton.position(600, 665);
        fillButton.mouseClicked(function () {
            isFillActive = !isFillActive;
            fillButton.html(isFillActive ? "Unfill (filling)" : "Fill (not filling)");
        });
    };
 
    function drawStar(layer, x, y, starWidth, starHeight, npoints) {
        let angle = TWO_PI / npoints;
        let halfAngle = angle / 2.0;

        layer.beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
            let sx = x + cos(a) * (starWidth / 2);
            let sy = y + sin(a) * (starHeight / 2);
            layer.vertex(sx, sy);
            sx = x + cos(a + halfAngle) * (starWidth / 4);
            sy = y + sin(a + halfAngle) * (starHeight / 4);
            layer.vertex(sx, sy);
        }
        layer.endShape(CLOSE);
    }
}
