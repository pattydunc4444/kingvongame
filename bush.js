

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
    texture(bushImg)
    // You can use a texture if you want, e.g. texture(concrete);
    box(this.w, this.h, this.d);
    pop();
  }
}

// Tree class
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
    texture(treeImg);
    noStroke();
    // First plane
    plane(this.w, this.h);
    // Second plane, rotated 90 degrees
    rotateY(HALF_PI);
    plane(this.w, this.h);
    pop();
  }
}

for (let t of trees) {
  t.display();
}