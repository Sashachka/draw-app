
function BeeTool(){
    this.name = "beeTool";
    this.icon = "assets/bee.png";
    
    var bee = loadImage('assets/bee.png');
    
	var beeSizeSlider=createSlider(5, 50, 20);
	var nbeeSlider = createSlider(1, 20 ,5);

    this.draw = function(layer) {
	
	if (mousePressOnCanvas()&&mouseIsPressed) {
		for(let i =0; i < nbeeSlider.value(); i++){
		var beeSize = beeSizeSlider.value(); 
		var beeX = random((mouseX - beeSize / 2) -20,(mouseX - beeSize / 2)+20);
		var beeY = random((mouseY - beeSize / 2)-20, (mouseY - beeSize / 2)+20) ;
		layer.image(bee, beeX, beeY, beeSize, beeSize);
		}
        layer.loadPixels();
	}
};
    
     this.unselectTool = function() {
        updatePixels();
        select("#sizeOfStarControl").html(""); 
        select("#numberOfStarsControl").html("");
    };
    
    this.populateOptions = function() {
        select("#sizeOfStarControl").html("Size of bee: ");
	    beeSizeSlider.parent("sizeOfStarControl");
 
        select("#numberOfStarsControl").html("Number of bee: ");
        nbeeSlider.parent("numberOfStarsControl");
        
     };
}