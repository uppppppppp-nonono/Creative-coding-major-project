# Creative-coding-major-project
# Time-Based Mosaic Animation  
### Functional Prototype (Individual Submission)
Student: Xin Liu
This project is an individual extension of our group’s Week 7 mosaic-reconstruction code.  
My individual version implements **time-based animation** requirements using p5.js, timers, and event-driven interactions.

---

## How to Run & Interact With the Work

1. Open `index.html` in a browser (Chrome recommended).  
2. The mosaic image will begin animating **automatically**.  
3. Every few milliseconds, a **random segment** of the image becomes visible.  
4. Press **“S”** on the keyboard at any time to instantly reveal the full image.  

This creates a dynamic visual effect where the image gradually appears in a randomized, lively pattern.

---

## My Individual Animation Approach

For my individual extension, I chose to animate the image using **time-based animation**.  
My version focuses on:

- **Random reveal timing**  
- **Segment visibility controlled by real-world time (millis())**
- **An event-triggered full reveal via keyboard input**

This emphasizes *temporal rhythm* rather than color transformation or positional distortion.

---

## Animation Driver: Time (millis)

Out of the four possible drivers:

- Audio  
- Interaction  
- Perlin Noise  
- **Time (Chosen)** 

I chose **time** because it gave me the most direct way to control the pacing and rhythm of the mosaic’s appearance, and it allowed me to create a unique reveal behavior compared to other group members.

---

## What Properties of the Image Are Animated?

### **Animated Property: Visibility of Segments**  
Each segment of the 64×64 mosaic grid begins as invisible.  
Using a timer, the code reveals **one random segment** every few milliseconds.  

This creates a “pixel explosion / pixel reveal” effect.

### **How It Differs From Group Members’ Versions**  
To maintain distinctiveness:

- I did **not** animate color changes.  
- I did **not** animate position or size.  
- My focus is uniquely on **randomized time-driven revealing**.  

Another member might animate color transitions or size pulsations, while my version works strictly with reveal-timing and randomness.

---

## Visual Inspiration

My inspiration came from:

- **Pixelated reveal animations** used in retro games  
- **Abstract Mondrian-style dynamic compositions**
- GIFs showing randomly appearing tiles or glitch-style image construction  

These inspired the idea of “revealing an image piece by piece,” which pairs well with the Mondrian mosaic aesthetic.

---

## Technical Explanation

This project uses both **Time-Based Animation** and **Event-Based Animation** in p5.js.

### Time-Based Animation  
Using `millis()`, the program measures real elapsed time:

```js
let now = millis();
if (now - lastChangeTime > interval) {
    let idx = floor(random(segments.length));
    segments[idx].visible = true;
    lastChangeTime = now;
}
