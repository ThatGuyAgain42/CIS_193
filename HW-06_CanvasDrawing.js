// =====================================================

// YOUR GLOBAL VARIABLES HERE

	var mousePosX = 0;
	var mousePosY = 0;
	var drawing = 0;


// FUNCTION DEFINITIONS HERE: 

	function handleMouseMove(event){//		Constantly Updates X and Y of Mouse

		//console.log("X and Y updated");
		mousePosX = event.x;
		mousePosY = event.y;

		if(drawing != 0){//		Draws a Line to Current X and Y While True
			let x = mousePosX - 12;
			let y = mousePosY - 53;
			ctx.lineTo(x,y);
			ctx.stroke();
		}
	}
	
	function handleMousePressed(){//		Changes Drawing Variable

		//console.log("Pressed at: X:",mousePosX,"Y:",mousePosY);
		drawing = 1;

		ctx.beginPath();//		Begins Path at Current Mouse Position
		ctx.moveTo(mousePosX - 12 ,mousePosY - 53);
	}
	
	function handleMouseReleased(){//		Resets Drawing Variable

		//console.log("Released at: X:",mousePosX,"Y:",mousePosY);
		drawing = 0;

		ctx.closePath();
	}
		
	function clearSignature(){//		Clears Canvas

		//console.log("Clear");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}


// =====================================================
window.onload = function () {
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	canvas.addEventListener("mousemove", handleMouseMove, false);
	canvas.addEventListener("mousedown", handleMousePressed);
	canvas.addEventListener("mouseup", handleMouseReleased);
	document.getElementById("clearButton").addEventListener("click", clearSignature);
};

