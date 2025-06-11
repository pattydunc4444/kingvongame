//king von game

//tutorial on collision https://www.youtube.com/watch?v=uAfw-ko3kB8

var floorArray = [];
var grass;
var z, x, y;
var bricks;
var wallArray = [];
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
let opponent;
let fenceTex;
let bgSong;
let skibidiImg;
let treeImg;
let gameStarted = false; // Add this at the top with your globals
let skibidiWalls = [];
let trees = [];

function preload() {
  bricks = loadImage("brick.jpg");
  grass = loadImage("thumbnail.jpg"); // the concrete texture
  concrete = loadImage("grass.jpg")
  skyboxImgs.right = loadImage('oblockRight.jpg');
  skyboxImgs.left = loadImage('oblockLeft.jpg');
  skyboxImgs.top = loadImage('sky_top.jpg');
  skyboxImgs.bottom = loadImage('sky_bottom.jpg');
  skyboxImgs.front = loadImage('oblockFront.jpg');
  skyboxImgs.back = loadImage('oblockrear.jpg');
  gunImg = loadImage('gun.png'); // Load your gun image here
  fenceTex = loadImage("fence.png");
  bgSong = loadSound("tooker to the o.mp3");
  skibidiImg = loadImage("skibidiopp.png");
  treeImg = loadImage("usetree.png");
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
  cam.setPosition(-1000, -10, 1100);


  //the oblock building
  //wallArray.push(new wall(0,0,0));
  // wallArray.push(new wall(400, 0, 400));
  for (let i = 0; i < 3; i++) {
    // wallArray.push(new wall(400 - 400 * i, 0, -1200, 1));
    wallArray.push(new wall(0 , 0, -1355, 1200,400,50,));
     wallArray.push(new wall(0, 0, 550, 1200, 400,50));
     wallArray.push(new wall(-1100, 0, -880, 1000, 400,50));
      wallArray.push(new wall(-1200, 0, 75, 1200, 400,50));
       wallArray.push(new wall(575, 0, -400, 50, 400,1900));
       wallArray.push(new wall(-575, 0, -1000, 50, 400,650));
          wallArray.push(new wall(-575, 0, 300, 50, 400,500));
       wallArray.push(new wall(-1785, 0, -400, 25, 400,1000));
  }
  floorArray.push(new floor(0, 225, -400, 1200, 40, 2000)); // Grass floor
  floorArray.push(new floor(0, -225, -400, 1200, 40, 2000));
  floorArray.push(new floor(-1200, 225, -400, 1200, 40, 1000));
   floorArray.push(new floor(-1200, -225, -400, 1200, 40, 1000)); // Grass floor
  floorArray.push(new FloorConcrete(0, 230, 0, 7000, 40, 7000)); // Concrete floor, 5 units below, fits skybox
  crosshairGfx = createGraphics(windowWidth, windowHeight);
  crosshairGfx.clear();
  opponent = new Opponent(0, 230, -1000); // Y=230 matches your concrete floor

  // Add a fence at position (x, y, z)
  wallArray.push(new Fence(0, 10, 3500, 8000, 400, 20));
  wallArray.push(new Fence(0, 10, -3500, 8000, 400, 20));
    wallArray.push(new Fence(-3950, 10, 10, 1000, 400, 8000));
     wallArray.push(new Fence(3950, 10, 10, 1000, 400, 8000));
   wallArray.push(new Fence(-2650, 10, 0, 1750, 400, 10));
  skibidiWalls.push(new SkibidiWall(0, 0 + 0, 0, 0, 0));
  if (bgSong && !bgSong.isPlaying()) {
    bgSong.setLoop(true);
    bgSong.play();
  }

  graphics.background(0, 0, 0, 200); // semi-transparent black
  graphics.textAlign(CENTER, CENTER);
  graphics.textSize(32);
  graphics.fill(255, 255, 0);
  fill(100)
  graphics.text("Defeat the Skibidi Henchmen\nto reach the boss, Mr Beast", graphics.width / 2, graphics.height / 2);
  
  trees.push(new Tree(0, 0, 0)); // Example position
  trees.push(new Tree(0, 0, 0));
  // Add more as needed
}



function draw() {
  background(120); // <-- Move this to the top!

  // Place the sign in front of the spawn point
  push();
  translate(-1000, 100, 800 - 400); // In front of player spawn, adjust as needed
  rotateY(PI); // Face the player
  scale(-1, 1, 1); // Flip the sign horizontally so text is not mirrored
  texture(graphics);
  plane(400, 200);
  pop();
 
 
 
 
 
 
 
  // Place a block directly in the middle of the camera's view, following where it looks
push();
let blockDistance = 100; // Distance in front of the camera
let camDir = createVector(cam.centerX - cam.eyeX, cam.centerY - cam.eyeY, cam.centerZ - cam.eyeZ).normalize();
let blockPos = createVector(cam.eyeX, cam.eyeY, cam.eyeZ).add(camDir.mult(blockDistance));
translate(blockPos.x, blockPos.y, blockPos.z);
fill(0, 255, 0);
box(1, 1, 1); // Size of the block
pop();

 // Place a block directly in the middle of the camera's view, following where it looks
push();
let blockDistance2 = 200; // Distance in front of the camera
let camDir2 = createVector(cam.centerX - cam.eyeX, cam.centerY - cam.eyeY, cam.centerZ - cam.eyeZ).normalize();
let blockPos2 = createVector(cam.eyeX, cam.eyeY, cam.eyeZ).add(camDir.mult(blockDistance));
translate(blockPos2.x, blockPos2.y, blockPos2.z);
fill(0, 255, 0);
box(200, 2, 2); // Size of the block
pop();


  // Draw skybox
  push();
  noStroke();
  let size = 7000; // Make sure it's bigger than your whole scene

  // Right
  push();
  translate(size/2, 0, 0);
  rotateY(HALF_PI);
  texture(skyboxImgs.right);
  plane(size, size);
  pop();

  // Left
  push();
  translate(-size/2, 0, 0);
  rotateY(-HALF_PI);
  texture(skyboxImgs.left);
  plane(size, size);
  pop();

  // Top
  push();
  translate(0, -size/2, 0);
  rotateX(-HALF_PI);
  texture(skyboxImgs.top);
  plane(size, size);
  pop();

  // Bottom
  push();
  translate(0, size/2, 0);
  rotateX(HALF_PI);
  texture(skyboxImgs.bottom);
  plane(size, size);
  pop();

  // Front
  push();
  translate(0, 0, -size/2);
  texture(skyboxImgs.front);
  plane(size, size);
  pop();

  // Back
  push();
  translate(0, 0, size/2);
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


  //wasd controls for strafing
  if (keyIsDown(83)) {
    z = 15;
  }

  if (keyIsDown(87)) {
    z = -15;
  }

  if (keyIsDown(65)) {
    x = -15;
  }

  if (keyIsDown(68)) {
    x = 15;
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

class Opponent {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = 100;
    this.alive = true;
    this.dirX = random([-1, 1]);
    this.dirZ = random([-1, 1]);
    this.speed = 2;
  }

  move() {
    if (!this.alive) return;

    // Try to move
    let nextX = this.x + this.dirX * this.speed;
    let nextZ = this.z + this.dirZ * this.speed;

    // Check for wall collision
    let willCollide = false;
    for (let i = 0; i < wallArray.length; i++) {
      let wall = wallArray[i];
      // Simple AABB collision
      if (
        nextX + this.size/2 > wall.x - wall.w/2 &&
        nextX - this.size/2 < wall.x + wall.w/2 &&
        this.y + this.size > wall.y - wall.h/2 &&
        this.y < wall.y + wall.h/2 &&
        nextZ + this.size/2 > wall.z - wall.d/2 &&
        nextZ - this.size/2 < wall.z + wall.d/2
      ) {
        willCollide = true;
        break;
      }
    }

    // If collision, pick a new random direction
    if (willCollide) {
      this.dirX = random([-1, 0, 1]);
      this.dirZ = random([-1, 0, 1]);
      // Don't let both be zero
      if (this.dirX === 0 && this.dirZ === 0) this.dirX = 1;
    } else {
      // Move if no collision
      this.x = nextX;
      this.z = nextZ;
    }
  }

  display() {
    if (!this.alive) return;
    push();
    translate(this.x, this.y, this.z);
    fill(255, 0, 0);
    box(this.size, this.size * 2, this.size);
    pop();
  }

  isTargeted(cam) {
    let dx = this.x - cam.eyeX;
    let dy = this.y - cam.eyeY;
    let dz = this.z - cam.eyeZ;
    let distToOpponent = Math.sqrt(dx*dx + dy*dy + dz*dz);

    let cx = cam.centerX - cam.eyeX;
    let cy = cam.centerY - cam.eyeY;
    let cz = cam.centerZ - cam.eyeZ;
    let camMag = Math.sqrt(cx*cx + cy*cy + cz*cz);

    cx /= camMag; cy /= camMag; cz /= camMag;
    dx /= distToOpponent; dy /= distToOpponent; dz /= distToOpponent;

    let dot = cx*dx + cy*dy + cz*dz;
    return dot > 0.995 && distToOpponent < 2000;
  }
}

function keyPressed() {
  // Start the game on SPACE
  if (!gameStarted && key === ' ') {
    gameStarted = true;
    return;
  }

}
class Enemy {
constructor(x,z) {
this.x = x;
this.y = z;
this.r = 50;





}






}

function mousePressed() {
  if (bgSong && !bgSong.isPlaying()) {
    bgSong.setLoop(true);
    bgSong.play();
  }
}

class Fence extends wall {
  constructor(x, y, z, w = 400, h = 200, d = 20) {
    super(x, y, z, w, h, d);
  }

  display() {
    push();
    translate(this.x, this.y, this.z);

    // Draw the main box (plain color)
    noStroke();
    fill(180, 120, 60); // Brownish color for wood
    box(this.w, this.h, this.d);

    // Draw the textured right face
    push();
    translate(this.w / 2 + 1, 0, 0); // Move to right face
    rotateY(HALF_PI);
    texture(fenceTex);
    plane(this.d, this.h);
    pop();

    // Draw the textured left face
    push();
    translate(-this.w / 2 - 1, 0, 0); // Move to left face
    rotateY(-HALF_PI);
    texture(fenceTex);
    plane(this.d, this.h);
    pop();

    // Draw the textured front face
    push();
    translate(0, 0, -this.d / 2 - 1); // Move to front face
    texture(fenceTex);
    plane(this.w, this.h);
    pop();

    // Draw the textured back face
    push();
    translate(0, 0, this.d / 2 + 1); // Move to back face
    rotateY(PI);
    texture(fenceTex);
    plane(this.w, this.h);
    pop();

    pop();
  }
}


class SkibidiWall {
  constructor(x, y, z, w = 200, h = 200) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.h = h;
  }

  display() {
    push();
    translate(this.x, this.y, this.z);
    // Billboard: always face the camera horizontally
    let v = createVector(cam.eyeX - this.x, 0, cam.eyeZ - this.z);
    let angleY = atan2(v.x, v.z);
    rotateY(angleY);
    texture(skibidiImg);
    // Draw a single-sided plane (no fill, just texture)
    plane(this.w, this.h);
    pop();
  }
}

class Tree {
  constructor(x, y, z, w = 120, h = 180) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.h = h;
  }

  display() {
    push();
    translate(this.x, this.y, this.z);
    // Billboard: always face the camera horizontally
    let v = createVector(cam.eyeX - this.x, 0, cam.eyeZ - this.z);
    let angleY = atan2(v.x, v.z);
    rotateY(angleY);
    texture(treeImg);
    noStroke();
    plane(this.w, this.h);
    pop();
  }
}



for (let wall of skibidiWalls) {
  wall.display();
}

for (let t of trees) {
  t.display();
}

// Draw a bar slightly in front of the camera, taking up half the screen width
push();
// Calculate direction the camera is facing
let camDir = createVector(cam.centerX - cam.eyeX, cam.centerY - cam.eyeY, cam.centerZ - cam.eyeZ).normalize();
// Position the bar a bit in front of the camera
let barDistance = 30; // Distance in front of camera
let barPos = createVector(cam.eyeX, cam.eyeY, cam.eyeZ).add(camDir.mult(barDistance));
translate(barPos.x, barPos.y, barPos.z);

// Make the bar always face the camera
let up = createVector(0, -1, 0);
let right = camDir.cross(up).normalize();
let angleY = atan2(camDir.x, camDir.z);
rotateY(angleY);

// Set bar size (relative to camera FOV)
let barWidth = width / 2 / 10; // Adjust divisor for scale
let barHeight = 20; // Adjust as needed

noStroke();
fill(0, 0, 0, 180); // Semi-transparent black
rectMode(CENTER);
rect(0, 0, barWidth, barHeight);
pop();
