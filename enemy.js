let oppWallTexture; // Make sure to load this in preload()

class OppWall {
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

    // Draw the main wall (without texture)
    fill(150, 0, 0);
    box(this.w, this.h, this.d);

    // Draw the textured front face only
    push();
    translate(0, 0, this.d / 2 + 0.1); // Slightly in front to avoid z-fighting
    texture(oppWallTexture);
    plane(this.w, this.h);
    pop();

    pop();
  }
}