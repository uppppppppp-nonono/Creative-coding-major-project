/* 
  Week 9 – Time-Based Animation (Employing Timers and Events)

  This sketch builds upon the Week 7 “Color Block Redrawing (Center Pixel Sampling)” structure,
  but modifies it to implement Week 9's time-based animation concepts.

  ─ Time-Based Animation (using millis()):
      A timer measures elapsed real-world time using millis().
      At fixed intervals, a random image segment becomes visible,
      creating an animated, gradually appearing mosaic.

  ─ Event-Based Animation (keyPressed()):
      Pressing the 'S' key triggers an event that immediately reveals
      all segments at once.

  The image is divided into a 64×64 grid. Each block’s color is sampled
  from the center pixel of its corresponding region. The visual appearance
  is animated entirely through timers and event-driven visibility.
*/


// A variable to store the original image
let img;

// Number of segments along each dimension (64×64 grid = 4096 blocks)
let numSegments = 64;

// Array to store all segment objects
let segments = [];

// ====== Time-based animation variables (timer + event trigger) ======
let lastChangeTime = 0;     // Records the last time an animation event occurred
let interval = 3;           // Interval in milliseconds between revealing random blocks
// ===================================================================


// Load the image before setup() executes
function preload() {
  img = loadImage('Piet_Mondrian Broadway_Boogie_Woogie.jpeg');
}

function setup() {
  // Create a canvas matching the dimensions of the loaded image
  createCanvas(img.width, img.height);

  // Calculate the dimensions of each grid segment
  let segmentWidth = img.width / numSegments;
  let segmentHeight = img.height / numSegments;

  /*
    Divide the image into segments using nested loops:
    – Outer loop steps down the image (Y-axis)
    – Inner loop steps across the image (X-axis)

    For each segment:
      1. Compute integer pixel boundaries using rounding
      2. Ensure each block covers a full pixel area with no gaps
      3. Sample the color at the center of the block
      4. Store the block data inside an ImageSegment object
  */
  for (let segYPos = 0; segYPos < img.height; segYPos += segmentHeight) {

    for (let segXPos = 0; segXPos < img.width; segXPos += segmentWidth) {

      // Convert floating boundaries into integer pixel coordinates
      const segXPos0 = Math.round(segXPos);
      const segYPos0 = Math.round(segYPos);
      const segXPos1 = Math.round(segXPos + segmentWidth);
      const segYPos1 = Math.round(segYPos + segmentHeight);

      // Actual integer pixel size of this block
      const segWidth  = segXPos1 - segXPos0;
      const segHeight = segYPos1 - segYPos0;

      // Skip blocks that end up with zero or negative size (rare rounding edge case)
      if (segWidth <= 0 || segHeight <= 0) continue;

      // Compute the center pixel inside the block to sample a representative color
      const colorX = Math.min(segXPos0 + Math.floor(segWidth / 2), img.width - 1);
      const colorY = Math.min(segYPos0 + Math.floor(segHeight / 2), img.height - 1);

      // Sample the pixel color at the computed center
      const color = img.get(colorX, colorY);

      // Create the segment object
      let segment = new ImageSegment(segXPos0, segYPos0, segWidth, segHeight, color);

      // Save it for later rendering
      segments.push(segment);
    }
  }

  // Initialize the timer to the current time
  lastChangeTime = millis();
}

function draw() {
  // Clear the canvas with a white background
  background(255);

  // ====== Time-Based Animation: reveal a random segment at intervals ======
  let now = millis(); // Current time in milliseconds since program started

  /*
    If enough time has passed (interval exceeded),
    reveal one random hidden segment.
  */
  if (now - lastChangeTime > interval) {

    // Select a random segment
    let idx = floor(random(segments.length));

    // Mark it as visible (appears on the next draw cycle)
    segments[idx].visible = true;

    // Reset the timer
    lastChangeTime = now;
  }
  // ========================================================================

  // Draw all segments that are currently marked as visible
  for (const segment of segments) {
    segment.draw();
  }
}


// ----------------------------------------------------------- //
// Class representing one mosaic block of the image
// ----------------------------------------------------------- //
class ImageSegment {

  constructor(x, y, w, h, fillColorArray) {
    // Pixel position and size of this block
    this.srcImgSegXPos = x;
    this.srcImgSegYPos = y;
    this.srcImgSegWidth = w;
    this.srcImgSegHeight = h;

    // Convert sampled [r, g, b, a] into a p5.js color object
    this.fillColor = color(
      fillColorArray[0],
      fillColorArray[1],
      fillColorArray[2],
      fillColorArray[3]
    );

    // Visibility flag controlled by timer-based events or key events
    this.visible = false;
  }

  draw() {
    // Only draw this block when it becomes visible
    if (!this.visible) return;

    noStroke();               // No outline (prevents visible seams)
    fill(this.fillColor);     // Apply stored block color

    // Draw the rectangle representing this image block
    rect(
      this.srcImgSegXPos,
      this.srcImgSegYPos,
      this.srcImgSegWidth,
      this.srcImgSegHeight
    );
  }
}


// ----------------------------------------------------------- //
// Event-Based Interaction: Press 'S' to reveal all blocks instantly
// ----------------------------------------------------------- //
function keyPressed() {
  if (key === 's' || key === 'S') {

    // Loop through all segments and reveal them immediately
    for (let seg of segments) {
      seg.visible = true;
    }
  }
}
