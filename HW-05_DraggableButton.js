/*
	window.onmousemove: for tracking when the mouse starts to move.
	window.onmouseup: for tracking when the mouse button is released.
	window.onload: for detecting when the mouse button is 
		pressed for the very first time AND hooking that mouse movement to the moveable button selector.

	// What Is The Objective?
	// mouse button is pressed for the very first time
	// hooking that mouse movement to the button
	// unhooking once button is released
*/	
	`
	onload start detecting when the mouse is down 
		then start detecting the mouse location
			then move the button to the mouse location
			until the mouse is up
			
	===================================================
	
	Send the element to a function
		create variables for positions
		element.onmousedown = dragmousedown
		
		dragmousedown(event)
			event.preventdefault
			
			get the cursor x and y
			and set the position variables to the x and y
			
			onmouseup = closedragelement
			onmousemove = elementDrag
			
		elementdrag(event)
			event.preventdefualt
			
			set var 1 to oldX - newX
			set var 2 to oldY - newY
			get new X
			get new Y
			
			set element style top to the current top minus var 1
			set element style top to the current left minus var 2
			
		closedragelement()
			document.onmouseup = null;
			document.onmousemove = null;
	`
	
window.onload = dragFunction(document.querySelector("#moveMe"));
	
function dragFunction(element) {
	element.onmousedown = moveable
	var cursorX = 0, cursorY = 0, x = 0, y = 0;
		
	function moveable(event) {
		console.log("mousedown");
		cursorX = event.pageX;
		cursorY = event.pageY;
			
		window.onmouseup = stopRunning
		window.onmousemove = changePosition
	}
	
	function changePosition(event) {
		x = cursorX - event.pageX;
		y = cursorY - event.pageY;
		cursorX = event.pageX;
		cursorY = event.pageY;
			
		const button = document.querySelector("#moveMe");
		button.style.left = (button.offsetLeft - x) + "px";
		button.style.top = (button.offsetTop - y) + "px";
			
		console.log(x,y);
		//console.log(cursorX,cursorY);
	}
		
	function stopRunning() {
		console.log("mouseup");
		window.onmouseup = null;
		window.onmousemove = null;
		}
	}
	
	
	
/*
	var drag = function() {
		window.onmousemove = function move(event) {
			if (true) {
				var x = event.pageX - 100;
				var y = event.pageY - 100;
				document.querySelector("#moveMe").style.left = x + "px";
				document.querySelector("#moveMe").style.top = y + "px";
				window.onmouseup = document.querySelector("#moveMe").removeEventListener("mousedown", drag);
			}
		}
		console.log("Clicked")
	}
	
	window.onload = document.querySelector("#moveMe").addEventListener("mousedown", drag);
	
	window.onmouseup = document.querySelector("#moveMe").removeEventListener("mousedown", drag);
	*/
  
	/*
	window.onmousemove = function(event) {
		tracking(event)
	}
		
	function tracking(event) {
		
		var x = event.pageX - 100;
		var y = event.pageY - 100;
		
		//var mouse = mouseCheck(event);
		//console.log(mouse);
		
		if (mouseCheck(event) == "down") {
			var clicked = true;
			console.log(clicked);
		} if (clicked) {
				var x = event.pageX - 100;
				var y = event.pageY - 100;
				document.querySelector("#moveMe").style.left = x + "px";
				document.querySelector("#moveMe").style.top = y + "px";
				var mouse = mouseCheck(event);
		} if (mouseCheck(event) == "up") {
			var clicked = false;
			var mouse = mouseCheck(event);
		}
	}
	
	function mouseCheck(event) {
		//console.log(event.type);
		return "move"
		document.querySelector("#moveMe").onmousedown = function(event) {
			console.log(event.type);
			return "down"
		}
		
		document.querySelector("#moveMe").onmouseup = function(event){
			console.log(event.type);
			return "up"
		}
	}
	
	window.onmouseup = document.querySelector("#moveMe").addEventListener("mouseup", function(event){
		var mouse = false;
		//console.log(event)
	})
	
	window.onload = document.querySelector("#moveMe").addEventListener("mousedown", function(event) {
		var mouse = true;
		//console.log(event)
	})
*/