// class SkibidiWall {
//   constructor(x, y, z, w = 200, h = 200) {
//     this.x = x;
//     this.y = y;
//     this.z = z;
//     this.w = w;
//     this.h = h;
//   }

//   display() {
//     push();
//     translate(this.x, this.y, this.z);
//     // Billboard: always face the camera horizontally
//     let v = createVector(cam.eyeX - this.x, 0, cam.eyeZ - this.z);
//     let angleY = atan2(v.x, v.z);
//     rotateY(angleY);
//     texture(skibidiImg);
//     // Draw a single-sided plane (no fill, just texture)
//     plane(this.w, this.h);
//     pop();
//   }
// }



// for (let wall of skibidiWalls) {
//   wall.display();
// }
