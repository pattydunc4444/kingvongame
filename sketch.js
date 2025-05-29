//Luca Del Priore MMP 310
//simple 3D maze game

//tutorial on collision https://www.youtube.com/watch?v=uAfw-ko3kB8


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
  bricks=loadImage("wallpaper.jpg");
}


function setup() {
  createCanvas(windowWidth, windowHeight,WEBGL);
  y=0;
  x=0;
  z=0;
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
    wallArray.push(new wall(400-400*i,0,-1200));
  
  }
  //floorArray
  // floorArray.push(new floor())
}

function draw() {
 background(120);
  
  //start sign creating a sign for the game start
  push();
  noStroke();
  translate(-400,0,550);
  texture(graphics);
  graphics.background(84, 80, 72);
  graphics.fill(5);
  graphics.textAlign(CENTER);
  graphics.textSize(50); 
  graphics.text('Use "wasd" to',400,150);
  graphics.text('walk and',420,200);
  graphics.text('left and right arrow to look',420,250);
  graphics.text('Find the Gem',420,380);
  plane(200,100);
  pop();
  
  //creating a sign for the game end
  push();
  noStroke();
  translate(0,0,-1600);
  rotateY(-PI/2);
  texture(graphics2);
  graphics2.background(84, 80, 72);
  graphics2.textAlign(CENTER);
  graphics2.textSize(50); 
  graphics2.text('You found the gem',200,50);
  plane(220,200);
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
  noStroke();
  translate(0,0,-1600);
  specularMaterial(0, 255, 187);
  shininess(1000);
  rotateY(millis()/500);
  rotateX(millis()/523);
  sphere(50,16 ,3);
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
