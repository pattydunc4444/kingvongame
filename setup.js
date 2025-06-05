let skyboxSize = 7000; // Use the same size as your skybox

// Right wall
wallArray.push(new wall(skyboxSize/2, 230, 0, 40, 1000, skyboxSize)); // x, y, z, w, h, d

// Left wall
wallArray.push(new wall(-skyboxSize/2, 230, 0, 40, 1000, skyboxSize));

// Top wall (ceiling)
wallArray.push(new wall(0, 230 - skyboxSize/2, 0, skyboxSize, 40, skyboxSize));

// Bottom wall (floor) -- you may already have a floor, but this is for completeness
wallArray.push(new wall(0, 230 + skyboxSize/2, 0, skyboxSize, 40, skyboxSize));

// Front wall
wallArray.push(new wall(0, 230, -skyboxSize/2, skyboxSize, 1000, 40));

// Back wall
wallArray.push(new wall(0, 230, skyboxSize/2, skyboxSize, 1000, 40));

display() {
  if (!this.alive) return;
  push();
  translate(this.x, this.y, this.z);

  // Toilet base (bowl)
  fill(220);
  push();
  translate(0, this.size * 0.5, 0);
  ellipsoid(this.size * 0.5, this.size * 0.3, this.size * 0.5, 24, 16);
  pop();

  // Toilet tank
  fill(200);
  push();
  translate(0, -this.size * 0.2, -this.size * 0.3);
  box(this.size * 0.6, this.size * 0.4, this.size * 0.2);
  pop();

  // Toilet seat (thin ring)
  fill(255);
  push();
  translate(0, this.size * 0.45, 0);
  torus(this.size * 0.35, this.size * 0.05, 24, 8);
  pop();

  pop();
}