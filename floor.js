// Example ramp class
class Ramp {
  constructor(x, y, z, w, h, d, rotationY = 0, rotationX = -PI / 6) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.h = h;
    this.d = d;
    this.rotationY = rotationY;
    this.rotationX = rotationX; // tilt for ramp
  }
  display() {
    push();
    translate(this.x, this.y, this.z);
    rotateY(this.rotationY);
    rotateX(this.rotationX);
    // You can use a texture if you want, e.g. texture(concrete);
    box(this.w, this.h, this.d);
    pop();
  }
}

class floor {
  constructor(x, y, z, w = 2000, h = 40, d = 2000) {
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
    texture(grass); // grass must be loaded in preload()
    box(this.w, this.h, this.d);
    pop();
  }
}