//king von game

//tutorial on collision https://www.youtube.com/watch?v=uAfw-ko3kB8

var floorArray = [];
var grass;
var z, x, y;
var bricks;
var wallArray = [];
 var bushArray = [];
var lastGoodX = 0;
var lastGoodY = 0;
var lastGoodZ = 0;
var camAngle;
let bCam;
var dx, dz;
let graphics, graphics2;
let skyboxImgs = {};
let crosshairGfx;
let gunImg;

function preload() {
  bricks = loadImage("brick.jpg");
  grass = loadImage("thumbnail.jpg"); // the concrete texture
  concrete = loadImage("grass.jpg"); // the grass texture
  tree = loadImage("Tree.png"); // the tree texture
  skyboxImgs.right = loadImage('sky_right.jpg');
  skyboxImgs.left = loadImage('sky_left.jpg');
  skyboxImgs.top = loadImage('sky_top.jpg');
  skyboxImgs.bottom = loadImage('sky_bottom.jpg');
  skyboxImgs.front = loadImage('sky_front.jpg');
  skyboxImgs.back = loadImage('sky_back.jpg');
  gunImg = loadImage('gun.png'); // Load your gun image here
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  y = 0;
  x = 0;
  z = 0;

  //sign graphics
  graphics = createGraphics(800, 400);
  graphics2 = createGraphics(420, 400);

  //bcam is a birds eye view that helps when placing blocks  
  bCam = createCamera();
  bCam.setPosition(0, -3000, 200);
  //cam is the player camera
  cam = createCamera();
  cam.setPosition(400, 0, 800);


  //the oblock building
  //wallArray.push(new wall(0,0,0));
  // wallArray.push(new wall(400, 0, 400));
  for (let i = 0; i < 3; i++) {
    // wallArray.push(new wall(400 - 400 * i, 0, -1200, 1));
    wallArray.push(new wall(0 , 0, -1355, 1200,400,50,));
     wallArray.push(new wall(0, 0, 550, 1200, 400,50));
       wallArray.push(new wall(575, 0, -400, 50, 400,1900));
  }
  floorArray.push(new floor(0, 225, -400, 1200, 40, 2000)); // Grass floor
  floorArray.push(new floor(0, -225, -400, 1200, 40, 2000)); // Grass floor
  floorArray.push(new FloorConcrete(0, 230, 0, 7000, 40, 7000)); // Concrete floor, 5 units below, fits skybox
  crosshairGfx = createGraphics(windowWidth, windowHeight);
  crosshairGfx.clear();
}



function draw() {
  background(120);

  // Draw skybox
  push();
  noStroke();
  let size = 7000; // Make sure it's bigger than your whole scene

  // Right
  push();
  translate(size / 2, 0, 0);
  rotateY(HALF_PI);
  texture(skyboxImgs.right);
  plane(size, size);
  pop();

  // Left
  push();
  translate(-size / 2, 0, 0);
  rotateY(-HALF_PI);
  texture(skyboxImgs.left);
  plane(size, size);
  pop();

  // Top
  push();
  translate(0, -size / 2, 0);
  rotateX(-HALF_PI);
  texture(skyboxImgs.top);
  plane(size, size);
  pop();

  // Bottom
  push();
  translate(0, size / 2, 0);
  rotateX(HALF_PI);
  texture(skyboxImgs.bottom);
  plane(size, size);
  pop();

  // Front
  push();
  translate(0, 0, -size / 2);
  texture(skyboxImgs.front);
  plane(size, size);
  pop();

  // Back
  push();
  translate(0, 0, size / 2);
  rotateY(PI);
  texture(skyboxImgs.back);
  plane(size, size);
  pop();

  pop();

  


  for (let i = 0; i < floorArray.length; i++) {
    floorArray[i].display();
  }

  // Draw the opponent in 3D world space
  // if (opponent) {
  //   opponent.move();
  //   opponent.display();
  // }

  //maze building camera
  bCam.lookAt(0, 0, 0);
  //setCamera(bCam);


  // frameRate(60);
  x = 0;
  z = 0;
  camAngle = 0;
  //player "flash light"
  pointLight(200, 200, 200, cam.eyeX, -200, cam.eyeZ);
  ambientLight(12);

  

  var anyTouching = false;
  //displays all blocks in an array
  for (let i = 0; i < wallArray.length; i++) {
    wallArray[i].display();
    //tests if the wall class is touching the camera
    if (wallArray[i].touching()) {
      anyTouching = true;
    }
  }
  //saves the last "safe" player location to return the player to.
  if (anyTouching == false) {

    lastGoodX = (cam.eyeX);
    lastGoodY = cam.eyeY;
    lastGoodZ = (cam.eyeZ);
    //console.log(lastGoodX+" "+lastGoodZ);
  }
let currentSpeed = keyIsDown(SHIFT) ? sprintSpeed : moveSpeed;
x = 0;
z = 0;


  //wasd controls for strafing
  if (keyIsDown(83)) {
    z = 10;
  }

  if (keyIsDown(87)) {
    z = -10;
  }

  if (keyIsDown(65)) {
    x = -10;
  }

  if (keyIsDown(68)) {
    x = 10;
  }

  //puts player back to last place not touching a wall 
  if (anyTouching == true) {
    cam.setPosition(lastGoodX, lastGoodY, lastGoodZ);
    //console.log("touching");

    //set to last safe position

  }
  //looking side to side controls  
  if (keyIsDown(37)) {
    camAngle = 0.075;
  }
  if (keyIsDown(39)) {
    camAngle = -0.075;
  }
  //mouse would often leave the player stuck
  //cam.pan(movedX*-0.01);
  cam.pan(camAngle);
  //cam.tilt(movedY*0.01);
  cam.move(x, 0, z);
  // console.log(cam.eyeZ);

  // Draw crosshair on 2D graphics buffer
  

  

  // Overlay the crosshair on the WEBGL canvas
  imageMode(CORNER);
  image(crosshairGfx, 0, 0, width, height);

  // Draw gun image
  resetMatrix(); // Reset to 2D drawing mode
  imageMode(CENTER);
  let gunX = width / 2;
  let gunY = height - (height / 6); // Lower part of the screen
  let gunW = width / 4; // Adjust size as needed
  let gunH = gunImg.height * (gunW / gunImg.width); // Keep aspect ratio
  image(gunImg, gunX, gunY, gunW, gunH);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  crosshairGfx = createGraphics(windowWidth, windowHeight);
}


class FloorConcrete {
  constructor(x, y, z, w, h, d) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.h = h;
    this.d = d;
  }
  display() {
    push();
    translate(this.x, this.y, this.z);
    texture(concrete);
    box(this.w, this.h, this.d);
    pop();
  }
}
