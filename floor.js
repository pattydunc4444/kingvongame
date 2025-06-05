// filepath: c:\Users\du732321\OneDrive - Wellington Catholic District School Board\Desktop\kingvongame\floor.js
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