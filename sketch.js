//Luca Del Priore MMP 310
//simple 3D maze game

//tutorial on collision https://www.youtube.com/watch?v=uAfw-ko3kB8

var floorArray = [];// array for floor
var z,x,y;
var bricks;
var wallArray=[];
var lastGoodX = 0;
var lastGoodY = 0;
var lastGoodZ = 0;
var camAngle;
let bCam;
var dx,dz;
let graphics, graphics2;

function preload(){
  bricks=loadImage("brick.jpg");
  grass = loadImage("tileable-img_0062-verydark.png"); // 
}


function setup() {
  createCanvas(windowWidth, windowHeight,WEBGL);
  y=0;
  x=0;
  z=0;
   floorArray.push(new floor(0, 40, 0, 2000, 40, 2000)); 
  //sign graphics
graphics = createGraphics(800,400);
  graphics2 = createGraphics(420,400);
 
//bcam is a birds eye view that helps when placing blocks  
  bCam = createCamera();
    bCam.setPosition(0,-3000,200);
//cam is the player camera
   cam = createCamera();
  cam.setPosition(400,0,800);
  
  
  //maze creation
  //wallArray.push(new wall(0,0,0));
  wallArray.push(new wall(400,0,400));
  for(let i=0;i<3;i++){
    wallArray.push(new wall(400-400*i,0,-1200,1));
    wallArray.push(new wall(400-4*i,0,-800));
  }
 // ...existing code...
var floorArray = []; // add this near wallArray

function setup() {
  // ...existing code...
  // Add a floor under your maze
  floorArray.push(new floor(0, 40, 0, 2000, 40, 2000)); // adjust size/position as needed
  // ...existing code...
}

function draw() {
  // ...existing code...
  // Display all floors
  for (let i = 0; i < floorArray.length; i++) {
    floorArray[i].display();
  }
  // ...existing code...
}
}

function draw() {
 background(120);
  
 for (let i = 0; i < floorArray.length; i++) {
    floorArray[i].display();
  }
  //start sign creating a sign for the game start
  push();

  pop();
  
  //creating a sign for the game end
  push();
 
  pop();

 //maze building camera
   bCam.lookAt(0,0,0);
   //setCamera(bCam);
  
 
frameRate(60);
    x =0;
    z =0;
  camAngle=0;
  //player "flash light"
  pointLight(200, 200, 200, cam.eyeX, -200, cam.eyeZ);
  ambientLight(5);
  
  //creating the gem
  push();
  
  pop();
 

  var anyTouching = false;
  //displays all blocks in an array
 for (let i=0; i<wallArray.length; i++){
   wallArray[i].display();
   //tests if the wall class is touching the camera
   if(wallArray[i].touching()){
         anyTouching=true;
   }
 }
  //saves the last "safe" player location to return the player to.
  if(anyTouching==false){

    lastGoodX=(cam.eyeX);
    lastGoodY = cam.eyeY;
    lastGoodZ=(cam.eyeZ);
      //console.log(lastGoodX+" "+lastGoodZ);
  }
  

//wasd controls for strafing
    if(keyIsDown(83)){
     z=10;      
     }
  
   if(keyIsDown(87)){
     z=-10;              
    }
  
   if(keyIsDown(65)){
     x=-10;                           
   }
  
   if(keyIsDown(68)){
     x=10;                             
    }

 //puts player back to last place not touching a wall 
if(anyTouching==true){
      cam.setPosition(lastGoodX,lastGoodY,lastGoodZ);
      //console.log("touching");
      
      //set to last safe position

    }
//looking side to side controls  
    if(keyIsDown(37)){
     camAngle=0.05;                             
    }
     if(keyIsDown(39)){
     camAngle=-0.05;                             
    }
  //mouse would often leave the player stuck
    //cam.pan(movedX*-0.01);
    cam.pan(camAngle);
  //cam.tilt(movedY*0.01);
    cam.move(x,0,z);
 // console.log(cam.eyeZ);
}
