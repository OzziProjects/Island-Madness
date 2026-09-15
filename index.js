'use strict';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
import { Game } from './Classes/Game.js';

let domHasLoaded = false;

// What size are your grid boxes?
export const gridBoxAspectRatio = {'width': 16, 'height': 16};
const aspectRatio = {'width': 16, 'height': 9};
const sizeMultiplier = 20;

canvas.width = aspectRatio.width * sizeMultiplier;
canvas.height = aspectRatio.height * sizeMultiplier;

function scaleCanvas(scaleMultiplier) {
  // Assigning 'top left' to the canvas transform origin allows it to stay in place
  canvas.style.transformOrigin = 'top left';
  canvas.style.left = '50%';
  canvas.style.top = '50%';
  canvas.style.transform = `scale(${ scaleMultiplier }) translateX(-50%) translateY(-50%)`;
}
scaleCanvas(3);

// Initialize the game instance and set up key tracking
const game = new Game();
game.keyTrackerUpdate();

function resetCanvas() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function animate(timestamp) {
    // Skip animation until the DOM has fully loaded
  if (!domHasLoaded) { requestAnimationFrame(animate); return; }

  // Do stuff inside of a fps function
  // Example => fpsFunction(timestamp);
  // For now, put reset function below
  resetCanvas();
  game.updateEntities();
  requestAnimationFrame(animate);
}

// Method to check if the DOM has fully loaded
function loadedDOMCheck() {
  window.addEventListener('DOMContentLoaded', () => {
    domHasLoaded = true;
  });
}

loadedDOMCheck();

animate();