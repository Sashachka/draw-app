function FlowerTool(){
    this.name = "flowerTool";
    this.icon = "assets/flower.png";
    
    var flower = loadImage('assets/flower.png');
    
	var flowerSizeSlider=createSlider(5, 50, 20);
	var nflowerSlider = createSlider(1, 20 ,5);
    var nFlowerPetalsSlider = createSlider(1, 10, 1);
    
    this.draw = function(layer) {
	if (mousePressOnCanvas()&&mouseIsPressed) {
		for(let i =0; i < nflowerSlider.value(); i++){
		var flowerSize = flowerSizeSlider.value(); 
        var nPetals = nFlowerPetalsSlider.value();
		var flowerX = random((mouseX - flowerSize / 2) -20,(mouseX - flowerSize / 2)+20);
		var flowerY = random((mouseY - flowerSize / 2)-20, (mouseY - flowerSize / 2)+20) ;
        drawFlower(layer,flowerX, flowerY, flowerSize, nPetals);
		}
        layer.loadPixels();//???tf for what but ok
	}
};
     
     this.unselectTool = function() {
        updatePixels();
        select("#sizeOfStarControl").html("");  
        select("#numberOfStarsControl").html("");
        select("#numbersOfPointsControl").html("");
    }; 
    
    
    this.populateOptions = function() {
        select("#sizeOfStarControl").html("Size of flower: ");
	    flowerSizeSlider.parent("sizeOfStarControl");
 
        select("#numberOfStarsControl").html("Number of flower: ");
        nflowerSlider.parent("numberOfStarsControl");
        
        select("#numbersOfPointsControl").html("Number of Petals: ");
        nFlowerPetalsSlider.parent("numbersOfPointsControl");
     };
    
    function drawFlower(layer,x, y, size, petals) {
  layer.noStroke();
  //draw stalk
  layer.fill('green');
  layer.rect(x-(size/6),y, size/4, size*2);
  layer.noFill();
  
//color of petals
  layer.fill(myColor); 
  
  // Draw circular petals
  for (let i = 0; i < petals; i++) {
    let angle = TWO_PI / petals * i;
    let petalX = x + cos(angle) * (size * 0.6);
    let petalY = y + sin(angle) * (size * 0.6);
    layer.ellipse(petalX, petalY, size/1.2, size / 1.2);
  }
  
  // Draw center
  layer.fill(255, 204, 0); 
  layer.ellipse(x, y, size * 0.6, size * 0.6);
}
}