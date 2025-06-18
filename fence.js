class Fence extends wall {
  constructor(x, y, z, w = 400, h = 200, d = 20) {
    super(x, y, z, w, h, d); // Call the wall constructor
  }

  display() {
    texture(fenceTex); // Use a texture for the fence, must be loaded in preload()
    // Draw a fence-like appearance (e.g., thin bars)
    push();
    translate(this.x, this.y, this.z);
    // Fence color
    fill(139, 69, 19); // Brown
    noStroke();
    // Draw vertical bars
    let numBars = 6;
    for (let i = 0; i < numBars; i++) {
      let barX = -this.w/2 + (i * this.w/(numBars-1));
      texture(fenceTex);
      push();
      translate(barX, 0, 0);
      box(this.w/2, this.h, this.d/2);
      pop();
    }
    // Draw top and bottom rails
    push();
    translate(0, -this.h/2 + this.h/10, 0);
    box(this.w, this.h/10, this.d/2);
    pop();
    push();
    translate(0, this.h/2 - this.h/10, 0);
    box(this.w, this.h/10, this.d/2);
    pop();
    pop();
  }
}
