function StampsTool(){
    this.name = "stampsTool";
    this.icon = "assets/stamps.png";

    this.draw = function (layer) {
        let x = mouseX; 
        let y = mouseY;

        console.log('drawing stamp tool');

        if(drawFill) {
            console.log("fill");
            layer.fill(fillColor);
        } else {
            console.log("not filling");
            layer.noFill();
        }

      
      
      //console.log("Current drawStroke Value:", drawStroke);
      if(drawStrok) {
            console.log("stroke");
            layer.stroke(strokeColor);
            layer.strokeWeight(strokeWidth);
        } else {
            console.log("nostroke");
            layer.noStroke();
        }

      if(mousePressOnCanvas() && mouseIsPressed)
        {
          
        
        switch(shape) {
            case 'circle':
                layer.ellipse(x, y, 50, 50); // Added size
                break;
            case 'square':
                layer.rectMode(CENTER);
                layer.rect(x, y, 50, 50); // Added size
                break;
            case 'triangle':
                ngon(3, x, y, 50, layer); // Fixed function call
                break;
            case 'pentagon':
                ngon(5, x, y, 50, layer); // Fixed function call
                break;
            case 'star':
                star(6, x, y, 50, 25, layer); // Fixed function call
                break;
        }
          }
    };

    function ngon(n, x, y, d, layer) {
        layer.beginShape();
        for(let i = 0; i < n; i++) {
            let angle = TWO_PI / n * i;
            let px = x + sin(angle) * d / 2;
            let py = y - cos(angle) * d / 2;
            layer.vertex(px, py);
        }
        layer.endShape(CLOSE);
    }

    function star(n, x, y, d1, d2, layer) {
        layer.beginShape();
        for(let i = 0; i < 2 * n; i++) {
            let d = (i % 2 === 1) ? d1 : d2;
            let angle = PI / n * i;
            let px = x + sin(angle) * d / 2;
            let py = y - cos(angle) * d / 2;
            layer.vertex(px, py);
        }
        layer.endShape(CLOSE);
    }
}
