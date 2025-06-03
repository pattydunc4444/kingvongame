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