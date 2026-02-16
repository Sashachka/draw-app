
function Treev1Tool(){
    this.name = "treev1Tool";
    this.icon = "assets/treev1.png";
        
	var treeSizeSlider=createSlider(5, 50, 20);

	var ntreeSlider = createSlider(1, 20 ,5);

    
    this.draw = function(layer) {
	
	if (mousePressOnCanvas()&&mouseIsPressed) {
		for(let i =0; i < ntreeSlider.value(); i++){
		var treeSize = treeSizeSlider.value(); 
		var treeX = random((mouseX - treeSize / 2) -20,(mouseX - treeSize / 2)+20);
		var treeY = random((mouseY - treeSize / 2)-20, (mouseY - treeSize / 2)+20) ;
        drawSpruce(layer,treeX, treeY, treeSize);
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
        select("#sizeOfStarControl").html("Size of tree: ");
	    treeSizeSlider.parent("sizeOfStarControl");
 
        select("#numberOfStarsControl").html("Number of tree: ");
        ntreeSlider.parent("numberOfStarsControl");
        
     };
    
    function drawSpruce(layer,x, y, size) {
  // Draw tree trunk
  layer.fill(139, 69, 19); 
  layer.noStroke();
  layer.rect(x - size / 8, y, size / 4, size / 3); 
  
  // Draw leaves as layered triangles
  layer.fill(myColor); 
  //left corner, right corner & top
  layer.triangle(x - size / 2, y - size / 3, x + size / 2, y - size / 3, x, y - size); // Bottom triangle
  layer.triangle(x - size / 2, y - size/8, x + size / 2, y - size / 8, x, y - size); // Middle triangle
  layer.triangle(x - size / 2, y + size / 10, x + size / 2, y + size / 10, x, y - size); // Top triangle
  

}

   
    
}