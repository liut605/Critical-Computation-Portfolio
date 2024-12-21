//CLICK while looking at the cursor to launch sketch and begin training! 

let cols;
let rows;
let posX;
let posY;
let grid = [];

let myX; 
let myY; 

webgazer.setRegression('ridge').setTracker('clmtrackr').showPredictionPoints(true).setGazeListener(function(data, elapsedTime) {
  if (data == null) {
      return;
  }
  myX = data.x; //these x coordinates are relative to the viewport
  myY = data.y; //these y coordinates are relative to the viewport
}).begin();

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = (windowWidth - 100)/20 + 1;
  rows = (windowHeight- 340)/20 + 1;
  
  for (let x = 0; x <= cols; x++) {
    for (let y = 0; y <= rows; y++) {
      posX = map(x, 0, cols, 50, windowWidth - 50);
      posY = map(y, 0, rows, 290, windowHeight - 50);
      grid.push(createVector(posX, posY));
    }
  }
}

function draw() { 
  background(0); 
  ellipse(myX, myY, 20, 20); 
  stroke(255);
  if (myX >= 50 && myX <= windowWidth -100 && myY >= 290 && myY <= windowHeight - 340) {
    let centerX = windowWidth / 2;
    let centerY = (windowHeight-240) / 2 + 240;
    let pupilRadius = (windowHeight-50) / 6;
    let irisRadius = (windowHeight-50) / 3;
  
    for (let i = 0; i < grid.length; i++) {
      let pos = grid[i];
    
      // Calculate the distance from the center (for both iris and pupil)
      let d = dist(pos.x, pos.y, centerX, centerY);
    
    //pupil, dense and dark
    if (d < pupilRadius) {
      let weight = lerp(15, 5, d / pupilRadius);
      strokeWeight(weight);
      stroke(255);
      point(pos.x, pos.y);
    }
    
    //iris, smooth
    else if (d < irisRadius) {
      let weight = lerp(10, 1, (d - pupilRadius) / (irisRadius - pupilRadius));
      strokeWeight(weight);
      stroke(255);
      point(pos.x, pos.y);
    }
    
    //sclera, light
    else {
      let weight = lerp(3, 0.5, (d - irisRadius) / (dist(50, 50, centerX, centerY) - irisRadius));
      strokeWeight(weight);
      stroke(255);
      point(pos.x, pos.y);
    }
  }
  }
  else {
    drawBlinkingGrid()
    }
  // console.log(mouseX, mouseY);
}

function drawBlinkingGrid() {
  for (let x = 50; x <= windowWidth - 50; x += 20) {
      for (let y = 290; y <= windowHeight - 50; y += 20) {
        stroke(random(255));
        point(x, y);
      }
    }
  }