function TextTool() {
    this.icon = 'assets/text.png'; 
    this.name = 'textTool';

    let texts = [];
    let typing = false;
    let currentText = ">";
    let textX, textY;

    this.draw = function(layer) {
        layer.textSize(20);
        layer.fill(0);

        // Draw all previous texts
        for (let t of texts) {
            layer.text(t.text, t.x, t.y);
        }

        // Draw the current text (without cursor)
        layer.text(currentText, textX, textY);

        // Handle mouse click for starting new text
        if (mousePressOnCanvas() && mouseIsPressed) {
            console.log("Mouse clicked at:", mouseX, mouseY);

            if (typing && currentText !== "") {
                // Add only the current text (not the cursor) to the texts array
                texts.push({ text: currentText, x: textX, y: textY });
            }

            textX = mouseX;
            textY = mouseY;
            currentText = ">";  // Reset the text being typed
            typing = true;
        }
    };

    // Ensure this function exists
    this.keyTyped = function() {
        if (typing) {
            currentText += key;  // Append the typed character (without the cursor)
            console.log("Key typed:", key, "New text:", currentText);
        }
    };

    // Ensure this function exists
    this.keyPressed = function() {
        if (keyCode === BACKSPACE && typing) {
            currentText = currentText.slice(0, -1);  // Remove the last character if backspace is pressed
            console.log("Backspace pressed, new text:", currentText);
        }
    };

    // Clear the texts array when the clear button is clicked
    this.clearText = function() {
      currentText = "";
        texts = [];  // Clears the text history
        console.log("All texts cleared");
    };
}
