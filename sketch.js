//Luca Del Priore MMP 310
//simple 3D maze game

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
let bushImg;
let moveSpeed = 10; // Speed of movement
 let sprintSpeed = 25; // Speed when sprintin
let playerVelY = 0;
let gravity = 2;
let isOnGround = false;
let camPitch = 0; // Add this near your other global variables

// Add at the top with your other variables
let bushPositions = [];

// Add near your other globals
let npcPos = { x: 0, y: 225, z: 0 }; // Adjust y to match your floor height

function preload() {
  bricks = loadImage("brick.jpg");
  grass = loadImage("thumbnail.jpg"); // the concrete texture
  concrete = loadImage("grass.jpg"); // the grass texture
  tree = loadImage("Tree.png"); // the tree texture
  skyboxImgs.right = loadImage('forest.png');
  skyboxImgs.left = loadImage('forest.png');
  skyboxImgs.top = loadImage('sky_top.jpg');
  skyboxImgs.bottom = loadImage('sky_bottom.jpg');
  skyboxImgs.front = loadImage('forest.png');
  skyboxImgs.back = loadImage('forest.png');
  gunImg = loadImage('gun.png'); // Load your gun image here
  bushImg = loadImage('bush.png');
  forest = loadImage('forest.png'); // Load your forest image here
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
  cam.setPosition(400, 0 , 850);


  //the oblock building
  //wallArray.push(new wall(0,0,0));
  // wallArray.push(new wall(400, 0, 400));
  for (let i = 0; i < 3; i++) {
    // wallArray.push(new wall(400 - 400 * i, 0, -1200, 1));
    wallArray.push(new wall(0, 0, -1355, 100, 400, 50,));
    wallArray.push(new wall(0, 0, 550, 100, 400, 50));
    wallArray.push(new wall(0, 175, 550, 1200, 400, 50));
    wallArray.push(new wall(0, 175, 600, 1200, 400, 50)); 
    wallArray.push(new wall(50, 175, -1355, 1200, 400, 50));
    wallArray.push(new wall(575, 0, -400, 50, 400, 1900));
    wallArray.push(new wall(-572, 0, -400, 50, 400, 1900));
    wallArray.push(new wall(575, 0, -400, 50, 400, 1900));
  }
  floorArray.push(new floor(0, 225, -400, 1200, 40, 2000)); // Grass floor
  floorArray.push(new floor(0, -225, -400, 1200, 40, 2000)); // Grass floor
  floorArray.push(new FloorConcrete(200, 230, 0, 7000, 40, 7000));
  
  crosshairGfx = createGraphics(windowWidth, windowHeight);
  crosshairGfx.clear();

  //  for (let i = 0; i < 3; i++) {
  //   // wallArray.push(new wall(400 - 400 * i, 0, -1200, 1));
  //   bushArray.push(new wall(0, 0, -1355, 1200, 400, 50,));
  //   bushArray.push(new wall(0, 0, 650, 1200, 400, 50));
  //   bushArray.push(new wall(575, 0, -400, 50, 400, 1900));
  // }
 
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

  //creating the gem
  push();

  pop();


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
  if (keyIsDown(87)){
    z = -currentSpeed;
  }

  if (keyIsDown(83)){
    z = currentSpeed;
  }

  if (keyIsDown(65)){
    x = -currentSpeed;
  }

  if (keyIsDown(68)){
    x = currentSpeed;
  }

  //puts player back to last place not touching a wall 
  if (anyTouching == true) {
    cam.setPosition(lastGoodX, lastGoodY, lastGoodZ);
    //console.log("touching");

    //set to last safe position

  }
  //looking side to side controls  
  if (keyIsDown(37)) {
    camAngle = 0.05;
  }
  if (keyIsDown(39)) {
    camAngle = -0.05;
  }
  //mouse would often leave the player stuck
  //cam.pan(movedX*-0.01);
  cam.pan(camAngle);
  //cam.tilt(movedY*0.01);
  cam.move(x, 0, z);
  // console.log(cam.eyeZ);

  // Draw crosshair on 2D graphics buffer
  crosshairGfx.clear();
  crosshairGfx.stroke(255);
  crosshairGfx.strokeWeight(3);
  let cx = crosshairGfx.width / 2;
  let cy = crosshairGfx.height / 2;
  crosshairGfx.line(cx - 10, cy, cx + 10, cy);
  crosshairGfx.line(cx, cy - 10, cx, cy + 10);

  // Overlay the crosshair on the WEBGL canvas
  resetMatrix();
  imageMode(CORNER);
  image(crosshairGfx, 0, 0, width, height);

  // Draw gun image in the bottom left corner
  resetMatrix(); // Reset to 2D drawing mode
  imageMode(CORNER);
  let gunW = width / 4; // Adjust size as needed
  let gunH = gunImg.height * (gunW / gunImg.width); // Keep aspect ratio
  let gunX = 20; // 20px from the left edge
  let gunY = height - gunH - 20; // 20px from the bottom edge
  image(gunImg, gunX, gunY, gunW, gunH);

  // Draw a small circle at the center of the screen
  resetMatrix();
  noStroke();
  fill(255, 0, 0); // Red color, change as you like
  ellipse(width / 2, height / 2, 12, 12); // 12px diameter, adjust as needed

  // Draw all bushes
  for (let i = 0; i < bushPositions.length; i++) {
    let pos = bushPositions[i];
    push();
    translate(pos.x, pos.y, pos.z);
    rotateY(frameCount * 0.01); // Optional: spin for effect
    texture(bushImg);
    noStroke();
    plane(100, 100);
    pop();
  }

  // Draw NPC that always looks at the player
  push();
  translate(npcPos.x, npcPos.y, npcPos.z);

  // Calculate angle to player (cam)
  let dx = cam.eyeX - npcPos.x;
  let dz = cam.eyeZ - npcPos.z;
  let npcAngle = atan2(dx, dz);

  // Rotate NPC to face player
  rotateY(npcAngle);

  // Draw the NPC (simple box or use a texture/model)
  fill(200, 50, 50);
  box(50, 100, 30); // width, height, depth
  pop();

  // Gravity and jumping logic
isOnGround = false;

// Check collision with floors
for (let i = 0; i < floorArray.length; i++) {
  let f = floorArray[i];
  // Simple AABB collision for standing on floor
  if (
    cam.eyeX > f.x - f.w / 2 && cam.eyeX < f.x + f.w / 2 &&
    cam.eyeZ > f.z - f.d / 2 && cam.eyeZ < f.z + f.d / 2 &&
    cam.eyeY + playerVelY >= f.y - f.h / 2 && cam.eyeY + playerVelY <= f.y + f.h / 2
  ) {
    cam.setPosition(cam.eyeX, f.y - f.h / 2, cam.eyeZ);
    playerVelY = 0;
    isOnGround = true;
  }
}

// 3D overlay (e.g., gun model) - draw after all world objects, before 2D overlays
push();
// Move to a spot in front of the camera (relative to camera)
resetMatrix(); // Remove all previous transforms
translate(0, 100, 300); // x, y, z: adjust as needed (y is down, z is forward from camera)
rotateX(PI / 10); // Optional: tilt the gun a bit
fill(80, 80, 80);
box(60, 20, 120); // Placeholder gun: width, height, depth
pop();
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


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  crosshairGfx = createGraphics(windowWidth, windowHeight);
}

function keyPressed() {
  // Jump with spacebar
  if (key === ' ' && isOnGround) {
    playerVelY = -30;
    isOnGround = false;
  }

  // Place bush with 'B'
  if (key === 'b' || key === 'B') {
    bushPositions.push({
      x: cam.eyeX,
      y: cam.eyeY,
      z: cam.eyeZ
    });
  }

  // Look up
  if (keyCode === UP_ARROW) {
    camPitch -= 0.05;
    camPitch = constrain(camPitch, -PI/2 + 0.1, PI/2 - 0.1);
  }
  // Look down
  if (keyCode === DOWN_ARROW) {
    camPitch += 0.05;
    camPitch = constrain(camPitch, -PI/2 + 0.1, PI/2 - 0.1);
  }
}

