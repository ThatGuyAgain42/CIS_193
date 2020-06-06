// useful to have them as global variables
var canvas, ctx, w, h; 
var mousePos;

// an empty array!
var balls = []; 
var initialNumberOfBalls;
var globalSpeedMutiplier = 1;
var colorToEat = 'red';
var wrongBallsEaten = goodBallsEaten = 0;
var numberOfGoodBalls;

var player = {
	x: 10,
	y: 10,
	width: 20,
	height: 20,
	color: 'red'
}


window.onload = function init() {
    // called AFTER the page has been loaded
    canvas = document.querySelector("#myCanvas");
  
    // often useful
    w = canvas.width; 
    h = canvas.height;  
  
    // important, we will draw with this object
    ctx = canvas.getContext('2d');
  
    // start game with 10 balls, balls to eat = red balls
    startGame(10);
  
    // add a mousemove event listener to the canvas
    canvas.addEventListener('mousemove', mouseMoved);

    // ready to go !
    mainLoop();
};


function startGame(nb) {
	do {
		balls = createBalls(nb);
		initialNumberOfBalls = nb;
		numberOfGoodBalls = countNumberOfGoodBalls(balls, colorToEat);
	} while(numberOfGoodBalls === 0);

	wrongBallsEaten = goodBallsEaten = 0;
}


function countNumberOfGoodBalls(balls, colorToEat) {
	var nb = 0;
  
	balls.forEach(function(b) {
		if(b.color === colorToEat)
			nb++;
	});
  
	return nb;
}


function changeNbBalls(nb) {
	startGame(nb);
}


function changeColorToEat(color) {
	colorToEat = color;
}


function changePlayerColor(color) {
	player.color = color;
}


function changeBallSpeed(coef) {
    globalSpeedMutiplier = coef;
}


function mouseMoved(evt) {
    mousePos = getMousePos(canvas, evt);
}


function getMousePos(canvas, evt) {
    // necessary work in the canvas coordinate system
    var rect = canvas.getBoundingClientRect();
	
    return {
		x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}


function movePlayerWithMouse() {
	if(mousePos !== undefined) {
		player.x = mousePos.x;
		player.y = mousePos.y;
	}
}


function mainLoop() {
	// 1 - clear the canvas
	ctx.clearRect(0, 0, w, h);
  
	// draw the ball and the player
	drawFilledRectangle(player);
	drawAllBalls(balls);
	drawBallNumbers(balls);

	// animate the balls and player
	moveAllBalls(balls);
	movePlayerWithMouse();
  
	// ask the browser to call mainloop in 1/60 of  for a new animation frame
	requestAnimationFrame(mainLoop);
}


// Collisions between rectangle and circle
function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
	var testX = cx;
	var testY = cy;
	if (testX < x0) testX = x0;
	if (testX > (x0+w0)) testX = (x0+w0);
	if (testY < y0) testY = y0;
	if (testY > (y0+h0)) testY = (y0+h0);
	return (((cx-testX) * (cx-testX) + (cy-testY) * (cy-testY)) < r * r);
}


function createBalls(n) {
	var ballArray = [];// empty array
	
	for(var i = 0; i < n; i++) {// create n balls
		var b = new Ball();// uses Ball constructor class
		ballArray.push(b);// add ball b to the array
    }
	// returns the array full of randomly created balls
	return ballArray;
}


function getARandomColor() {
	var colors = ['red', 'blue', 'cyan', 'purple', 'pink', 'green', 'yellow'];
	var colorIndex = Math.round((colors.length-1) * Math.random()); 
	var c = colors[colorIndex];
 
	return c;// return the random color
}


function drawBallNumbers(balls) { 
	ctx.save();
	ctx.font = "20px Arial";
  
	if(balls.length === 0) {
		ctx.fillText("Game Over!", 20, 30);
		
	} else if(goodBallsEaten === numberOfGoodBalls) {
		ctx.fillText("You Win! Final score : " + (initialNumberOfBalls - wrongBallsEaten), 20, 30);
		
	} else {
		ctx.fillText("Balls still alive: " + balls.length, 210, 30);
		ctx.fillText("Good Balls eaten: " + goodBallsEaten, 210, 50);
		ctx.fillText("Wrong Balls eaten: " + wrongBallsEaten, 210, 70);
	
	}
	
	ctx.restore();
}


function drawAllBalls(ballArray) {
    ballArray.forEach(function(b) {
		b.draw(ctx);
	});
}


function moveAllBalls(ballArray) {
	balls.forEach(function(b) {
		b.move();
	});
}


function testCollisionWithPlayer(b, index) {
	if(circRectsOverlap(player.x, player.y, 
	player.width, player.height, b.x, b.y, b.radius)) {
		
		// removes ball from array if touching player
		if(b.color === colorToEat) {
			goodBallsEaten += 1;
			
		} else {
			wrongBallsEaten += 1;
			
		}

    balls.splice(index, 1);// removes 1 item at current index
	}
}


function testCollisionBallWithWalls(b) {
// COLLISION WITH VERTICAL WALLS ?
	if((b.x + b.radius) > w) {// the ball hit the right wall
		b.speedX = -b.speedX;// change horizontal direction
		b.x = w - b.radius;// put the ball at the collision point
		
	} else if((b.x - b.radius) < 0) {// the ball hit the left wall
		b.speedX = - b.speedX;// change horizontal direction
		b.x = b.radius;// put the ball at the collision point
		
	}
  
// COLLISIONS WTH HORIZONTAL WALLS ?
	if((b.y + b.radius) > h) {// the ball hit the right wall
		b.speedY = - b.speedY;// change horizontal direction
		b.y = h - b.radius;// put the ball at the collision point
		
	} else if((b.y - b.radius) < 0) {// the ball hit the left wall
		b.speedY = - b.speedY;// change horizontal direction
		b.y = b.radius;// put the ball at the collision point
		
	}  
}


function drawFilledRectangle(r) {
    ctx.save();// GOOD practice: save the context, use 2D trasnformations
    
    ctx.translate(r.x, r.y);// translate the coordinate system, draw relative to it
  
    ctx.fillStyle = r.color;
    ctx.fillRect(0, 0, r.width, r.height);
  
    ctx.restore();// GOOD practice: restore the context
}


class Ball {
    // creating a brand new ball instance with its essential properties
    constructor() {
		this.x = w / 2, // sets object x location to center of canvas
        this.y = h / 2, // sets object y location to center of canvas
        this.radius =  5 + 30 * Math.random(), // between 5 and 35
        this.speedX =  -5 + 10 * Math.random(), // between -5 and + 5
        this.speedY =  -5 + 10 * Math.random(), // between -5 and + 5
        this.color = getARandomColor()
    }
    
    // drawing the ball instance on canvas
    draw(ctx) {
		ctx.save();// GOOD practice: save the context, use 2D trasnformations
	  
		ctx.translate(this.x, this.y);// translate the coordinate system, draw relative to it
	  
		ctx.fillStyle = this.color;
		
		ctx.beginPath();
		ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
		ctx.fill();
		
		ctx.restore();// GOOD practice: restore the context
    }
    
    // translate the ball instance's movement coordindate 
    move() {// changes x and y of ball in the array
		this.x += (this.speedX * globalSpeedMutiplier);
		this.y += (this.speedY * globalSpeedMutiplier);
		
		testCollisionBallWithWalls(this);
		testCollisionWithPlayer(this, balls.indexOf(this));
    }
}