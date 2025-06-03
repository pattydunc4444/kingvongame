class wall {
  constructor(x, y, z, w = 400, h = 400, d = 40) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w; // width
    this.h = h; // height
    this.d = d; // thickness (depth)
  }

  display() {
    texture(bricks);
    push();
    strokeWeight(5);
    translate(this.x, this.y, this.z);
    box(this.w, this.h, this.d); // Use custom size
    pop();
    var d = dist(this.x, this.y, this.z, cam.eyeX, cam.eyeY, cam.eyeZ);
    if (d >= 350) {
      var lastGoodX = cam.eyeX;
      var lastGoodY = cam.eyeY;
      var lastGoodZ = cam.eyeZ;
      return lastGoodX;
    }
  }

  touching() {
    // Get camera position
    let px = cam.eyeX;
    let py = cam.eyeY;
    let pz = cam.eyeZ;

    // Check if camera is inside the wall's box
    return (
      px > this.x - this.w / 2 && px < this.x + this.w / 2 &&
      py > this.y - this.h / 2 && py < this.y + this.h / 2 &&
      pz > this.z - this.d / 2 && pz < this.z + this.d / 2
    );
  }
}
