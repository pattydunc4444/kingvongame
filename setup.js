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

class Opponent {
  constructor(x, y, z) {
    this.x = x;
    this.y = 230 + this.size / 2; // should be 230 for your floor
    this.z = z;
    this.size = 100;
    this.alive = true;
    this.dirX = random([-1, 1]);
    this.dirZ = random([-1, 1]);
    this.speed = 2;
  }

  move() {
    if (!this.alive) return;

    // Always stay on the floor
    this.y = 230 + this.size / 2;

    // Try to move
    let nextX = this.x + this.dirX * this.speed;
    let nextZ = this.z + this.dirZ * this.speed;

    // Check for wall collision
    let willCollide = false;
    for (let i = 0; i < wallArray.length; i++) {
      let wall = wallArray[i];
      // Simple AABB collision
      if (
        nextX + this.size/2 > wall.x - wall.w/2 &&
        nextX - this.size/2 < wall.x + wall.w/2 &&
        this.y + this.size > wall.y - wall.h/2 &&
        this.y < wall.y + wall.h/2 &&
        nextZ + this.size/2 > wall.z - wall.d/2 &&
        nextZ - this.size/2 < wall.z + wall.d/2
      ) {
        willCollide = true;
        break;
      }
    }

    // If collision, bounce (reverse direction)
    if (willCollide) {
      this.dirX *= -1;
      this.dirZ *= -1;
    } else {
      // Move if no collision
      this.x = nextX;
      this.z = nextZ;
    }
  }

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

  isTargeted(cam) {
    let dx = this.x - cam.eyeX;
    let dy = this.y - cam.eyeY;
    let dz = this.z - cam.eyeZ;
    let distToOpponent = Math.sqrt(dx*dx + dy*dy + dz*dz);

    let cx = cam.centerX - cam.eyeX;
    let cy = cam.centerY - cam.eyeY;
    let cz = cam.centerZ - cam.eyeZ;
    let camMag = Math.sqrt(cx*cx + cy*cy + cz*cz);

    cx /= camMag; cy /= camMag; cz /= camMag;
    dx /= distToOpponent; dy /= distToOpponent; dz /= distToOpponent;

    let dot = cx*dx + cy*dy + cz*dz;
    return dot > 0.995 && distToOpponent < 2000;
  }
}

resetMatrix();
imageMode(CORNER);
fill(255, 0, 0, 150);
rect(0, 0, width, height);