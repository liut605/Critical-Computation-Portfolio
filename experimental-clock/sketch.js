let angle = 0;
let timeCheck;
let R = 87;
let G = 247;
// let circles = 1;
// let addCircles = false;
let clockwise = true;
let test;
let x1 = 150;
let x2 = 220;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  //frameRate(200);
  cursor(HAND);
}

function draw() {
  //console.log(x1, x2, test);
  test = second();
  if (test == 59 || test == 30) {
    x1 = random(100, 150);
    x2 = random(150, 220);
  }

  //console.log(R,G)
  R = constrain(R, 87, 247);
  G = constrain(G, 87, 247);

  if (clockwise == true) {
    push();
    R += 1;
    translate(window.innerWidth / 2, window.innerHeight / 2);
    rotate(-angle / 50);
    noFill();
    stroke(R, G, 87);

    if (R <= 247) {
      G -= 0.5;
    }
    line(0, 0, x1, 200);
    angle += 0.5;
    pop();
  } else {
    push();
    R -= 1;
    translate(window.innerWidth / 2, window.innerHeight / 2);
    rotate(angle / 50);
    noFill();
    stroke(R, G, 87);

    if (R <= 87) {
      G += 0.5;
    }
    line(0, 0, x2, 200);
    angle += 0.5;
    pop();
  }
}

//restart
function keyPressed() {
  clear();
  R = 87;
  G = 247;
}

//manually change rotation
function mouseDragged() {
  //scenarios 1,2
  if (movedX < 0 && movedY < 0) {
    if (mouseX >= 300 && mouseY <= 300) {
      //top right corner
      clockwise = true;
    } else if (mouseX <= 300 && mouseY >= 300) {
      //bottom left corcer
      clockwise = false;
    }
  }

  //scenarios 3,4 worked but not sure how????
  if (movedX > 0 && movedY > 0) {
    if ((mouseX <= 300) & (mouseY >= 300)) {
      //bottom left corner
      clockwise = true;
    } else if ((mouseX >= 300) & (mouseY <= 300)) {
      //top right corner
      clockwise = false;
    }
  }

  //scenarios 5,6
  if (movedX < 0 && movedY > 0) {
    if ((mouseX <= 300) & (mouseY <= 300)) {
      //top left corner
      clockwise = true;
    } else if ((mouseX >= 300) & (mouseY >= 300)) {
      clockwise = false;
    }
  }

  //scenarios 7,8
  if (movedX > 0 && movedY < 0) {
    if ((mouseX >= 300) & (mouseY >= 300)) {
      //bottom right corner
      clockwise = true;
    } else if ((mouseX <= 300) & (mouseY <= 300)) {
      //top right corner
      clockwise = false;
    }
  }
}
