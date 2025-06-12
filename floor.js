// Example ramp class
class floor {
  constructor(x, y, z, w, h, d, rotationY = 0, rotationX = 0) { // Default rotationX is 0
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.h = h;
    this.d = d;
    this.rotationY = rotationY;
    this.rotationX = rotationX;
  }
  display() {
    push();
    translate(this.x, this.y, this.z);
    rotateY(this.rotationY);
    rotateX(this.rotationX);
    texture(grass);
    // You can use a texture if you want, e.g. texture(concrete);
    box(this.w, this.h, this.d);
    pop();
  }
}