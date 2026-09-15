// In this file, we have the Game class, which will manage the game's logic and state.
// Here, we will have methods to load game assets and initialize the game state.
// We will also handle the main game loop and interactions with the canvas.

import { Player } from './Player.js';

export class Game {
    static keyTracker = {
        "up": false, "down": false, "left": false, "right": false
    }
    constructor() {
        this.canvas = document.getElementById('game');
        this.ctx = this.canvas.getContext('2d');
        this.player = new Player(this.canvas);
        this.entities = {
            "player": this.player
        };
    }
    keyTrackerUpdate() {
        window.addEventListener("keydown", (e) => {
            switch(e.key.toUpperCase()) {
                case "W":
                    Game.keyTracker["up"] = true;
                    break;
                case "S":
                    Game.keyTracker["down"] = true;
                    break;
                case "A":
                    Game.keyTracker["left"] = true;
                    break;
                case "D":
                    Game.keyTracker["right"] = true;
                    break;
            }
        });
        window.addEventListener("keyup", (e) => {
            switch(e.key.toUpperCase()) {
                case "W":
                    Game.keyTracker["up"] = false;
                    break;
                case "S":
                    Game.keyTracker["down"] = false;
                    break;
                case "A":
                    Game.keyTracker["left"] = false;
                    break;
                case "D":
                    Game.keyTracker["right"] = false;
                    break;
            }
        });
    }
    // Method to see if any of the movement keys are currently pressed
    static movementKeyPressed() {
        if (Game.keyTracker["up"] || Game.keyTracker["down"] || Game.keyTracker["left"] || Game.keyTracker["right"]) {
            return {pressed: true, direction: Game.keyTracker["up"] ? "up" : Game.keyTracker["down"] ? "down" : Game.keyTracker["left"] ? "left" : "right"};
        }
        return {pressed: false, direction: "none"};
    }
    updateEntities() {
        this.entities.player.update();
    }
}