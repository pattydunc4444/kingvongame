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
let oppTexture; // Declare globally
let movingWalls = []; // <-- Declare globally


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
  oppWallTexture = loadImage("king vons opp.png");
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
    wallArray.push(new wall(0 , 0, -1355, 1200,1000,50,));
     wallArray.push(new wall(0, 0, 550, 1200, 1000,50));
     wallArray.push(new wall(-1100, 0, -880, 1000, 1000,50));
      wallArray.push(new wall(-1200, 0, 75, 1200, 1000,50));
       wallArray.push(new wall(575, 0, -400, 50, 1000,1900));
       wallArray.push(new wall(-575, 0, -1000, 50, 1000,650));
          wallArray.push(new wall(-575, 0, 300, 50, 1000,500));
       wallArray.push(new wall(-1785, 0, -400, 25, 1000,1000));
  }
  floorArray.push(new floor(0, 225, -400, 1200, 40, 2000)); // Grass floor
  floorArray.push(new floor(0, -525, -400, 1200, 40, 2000));
  floorArray.push(new floor(-1200, 225, -400, 1200, 40, 1000));
   floorArray.push(new floor(-1200, -525, -400, 1200, 40, 1000)); // Grass floor
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
  graphics.text("Defeat the Skibidi Henchmen\nto reach the boss, lil t", graphics.width / 2, graphics.height / 2);
  
  trees.push(new Tree(0, 0, 0)); // Example position
  trees.push(new Tree(0, 0, 0));
  // Add more as needed

  // Add initial moving wall
 
}



function draw() {
  if (!gameStarted) {
    // Start screen
    background(30, 30, 40);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(64);
    text("KING VON GAME", width / 2, height / 2 - 60);
    textSize(32);
    text("Press SPACE to Start", width / 2, height / 2 + 20);
    return; // Pause the game until started
  }

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

  // Draw floors
  for (let i = 0; i < floorArray.length; i++) {
    floorArray[i].display();
  }

  // Draw walls
  for (let i = 0; i < wallArray.length; i++) {
    wallArray[i].display();
  }

  // Draw skibidi walls
  for (let wall of skibidiWalls) {
    wall.display();
  }

  // Draw trees
  for (let t of trees) {
    t.display();
  }

  // Draw moving walls
  for (let mw of movingWalls) {
    mw.move();
    mw.display();
  }

  // Draw the 3D guy
  guy.move();
  guy.display();

  // maze building camera
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
  
  // --- 2D Overlay ---
  resetMatrix();
  hint(DISABLE_DEPTH_TEST);

  // Draw a simple crosshair
  fill(255, 0, 0);
  noStroke();
  ellipse(width/2, height/2, 20, 20);

  // Draw a health bar
  fill(0, 0, 0, 180);
  rect(width/2 - 100, height - 60, 200, 30, 10);
  fill(0, 255, 0);
  rect(width/2 - 100, height - 60, 150, 30, 10); // Example: 150 health

  // Draw a test square on the overlay
  fill(0, 0, 255, 180); // Semi-transparent blue
  rect(width/2 - 50, height/2 - 50, 100, 100);

  hint(ENABLE_DEPTH_TEST);
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

function keyPressed() {
  // Start the game on SPACE
  if (!gameStarted && key === ' ') {
    gameStarted = true;
    return;
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
