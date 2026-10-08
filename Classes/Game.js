// In this file, we have the Game class, which will manage the game's logic and state.
// Here, we will have methods to load game assets and initialize the game state.
// We will also handle the main game loop and interactions with the canvas.

import { Player } from './Player.js';
import { TemporaryBackground } from './TemporaryBackground.js';

export class Game {
    static paused = false;
    // Object to keep track of the current state of the keys being pressed
    static keyTracker = {
        "up": false, "down": false, "left": false, "right": false,
        "cameraUp": false, "cameraDown": false, "cameraLeft": false, "cameraRight": false,
        "c": false
    }
    static freeCameraStatusText = document.getElementById('freeCameraStatus-Text');

    constructor() {
        this.canvas = document.getElementById('game');
        this.ctx = this.canvas.getContext('2d');
        this.player = new Player(this.canvas);
        this.entities = {
            "player": this.player,
            "backgrounds": [
                new TemporaryBackground(this.canvas, "green", -160, -160),
                new TemporaryBackground(this.canvas, "red", -160, 160),
                new TemporaryBackground(this.canvas, "yellow", 160, -160),
                new TemporaryBackground(this.canvas, "purple", 160, 160)
            ]
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
                case "ARROWUP":
                    Game.keyTracker["cameraUp"] = true;
                    break;
                case "ARROWDOWN":
                    Game.keyTracker["cameraDown"] = true;
                    break;
                case "ARROWLEFT":
                    Game.keyTracker["cameraLeft"] = true;
                    break;
                case "ARROWRIGHT":
                    Game.keyTracker["cameraRight"] = true;
                    break;
                case "C":
                    Game.keyTracker["c"] = true;
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
                case "ARROWUP":
                    Game.keyTracker["cameraUp"] = false;
                    break;
                case "ARROWDOWN":
                    Game.keyTracker["cameraDown"] = false;
                    break;
                case "ARROWLEFT":
                    Game.keyTracker["cameraLeft"] = false;
                    break;
                case "ARROWRIGHT":
                    Game.keyTracker["cameraRight"] = false;
                    break;
                case "C":
                    Game.keyTracker["c"] = false;
                    Player.freeCameraPress = false;
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
    static cameraMovementKeyPressed() {
        if (Game.keyTracker["cameraUp"] || Game.keyTracker["cameraDown"] || Game.keyTracker["cameraLeft"] || Game.keyTracker["cameraRight"]) {
            return {pressed: true, direction: Game.keyTracker["cameraUp"] ? "cameraUp" : Game.keyTracker["cameraDown"] ? "cameraDown" : Game.keyTracker["cameraLeft"] ? "cameraLeft" : "cameraRight"};
        }
        return {pressed: false, direction: "none"};
    }
    static getFreeCameraStatusText() {
        return Game.freeCameraStatusText;
    }
    static freeCameraPressed() {
        if (!Game.paused) {
            if (Game.keyTracker["c"] && !Player.freeCamera) {
                if (Player.freeCameraPress) {
                    return;
                }
                Player.freeCameraPress = true;
                const freeCameraStatusText = Game.getFreeCameraStatusText();
                freeCameraStatusText.textContent = "Free Camera: ON";
                Player.setFreeCamera(true);
                return;

            }
            else if (Game.keyTracker["c"] && Player.freeCamera) {
                if (Player.freeCameraPress) {
                    return;
                }
                Player.freeCameraPress = true;
                const freeCameraStatusText = Game.getFreeCameraStatusText();
                freeCameraStatusText.textContent = "Free Camera: OFF";
                Player.setFreeCamera(false);
                return;
            }
        }
    }
    updateEntities() {
        this.entities.backgrounds.forEach((background, index) => {
            background.update();
        });
        this.entities.player.update();
    }
}