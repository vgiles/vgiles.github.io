function setup() {
	background(200);
	createCanvas(800, 800);
	frameRate(60);
	fill(0);
	textSize(12);
	text("Click and drag; any key to clear", width/2, 20);
}

function squareFun() {
	var fillR, fillG, fillB, fillA, mousePosX, mousePosY;
	// var v1 = createVector(40, 50);
	// var v2 = createVector (30, 50);
	mousePosX = mouseX;
	mousePosY = mouseY;
	fillR = mousePosX % 200 + 50;
	fillG = mousePosY % 150 + 50;
	fillB = mousePosX % 150;
	fillA = mousePosY % 100;
	fill(fillR, fillG, fillB, fillA);
	rect(mousePosX, mousePosY, mouseY / TAU / 4, mouseX * PI / 8);
}

function draw() {
	noStroke();
	rectMode(CENTER);
}

function mouseDragged() {
	squareFun();
}

function touchMoved() {
	squareFun();	
}

function keyPressed() {
	background(255);
	fill(0);
	textSize(12);
	text("Click and drag; any key to clear", width/2, 20);
}
