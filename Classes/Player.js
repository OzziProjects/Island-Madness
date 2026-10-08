import { Game } from "./Game.js";
import { game } from "../index.js";

export class Player {
    // A camera position is necessary to adjust the view based on the player's movement
    // If freeCamera is enabled, the camera will not follow the player, but can be controlled independently
    static cameraPosition = {x: 0, y: 0};
    // When freeCamera is enabled, the freeCameraPosition will start off at {x: 0, y: 0}
    // If freeCamera becomes disabled, the camera will go back to following the player
    static freeCamera = false;
    static freeCameraPosition = {x: 0, y: 0};
    static freeCameraPress = false;
    static cameraDirection = "none";
    static cameraSpeed = 2;

    static speed = 1;
    static direction = "none";
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = 32;
        this.height = 32;
        this.iniPos = {x: 0, y: 0};
        this.currentPos = {x: this.iniPos.x, y: this.iniPos.y};
        this.color = "blue";
    }
    draw() {
        this.ctx.fillStyle = this.color;
        if (!Player.freeCamera) {
            this.ctx.fillRect(this.currentPos.x - Player.cameraPosition.x, this.currentPos.y - Player.cameraPosition.y, this.width, this.height);
        }
        else {
            this.ctx.fillRect(this.currentPos.x - Player.freeCameraPosition.x , this.currentPos.y - Player.freeCameraPosition.y, this.width, this.height);
        }
    }
    update() {
        this.draw();

        if (Game.movementKeyPressed().pressed) {
            this.move(Game.movementKeyPressed().direction);
        }
        else {
            Player.direction = "none";
        }

        if (Player.freeCamera) {
            if (Game.cameraMovementKeyPressed().pressed) {
                Player.moveCamera(Game.cameraMovementKeyPressed().direction);
            }
            else {
                Player.cameraDirection = "none";
            }
        }

        this.cameraFollow();
    }
    static getPlayerPosition() {
        return Player.currentPos;
    }
    move(direction) {
        Player.direction = direction;
        switch(direction) {
            case "up":
                this.currentPos.y -= Player.speed;
                break;
            case "down":
                this.currentPos.y += Player.speed;
                break;
            case "left":
                this.currentPos.x -= Player.speed;
                break;
            case "right":
                this.currentPos.x += Player.speed;
                break;
        }
    }
    static moveCamera(direction) {
        Player.cameraDirection = direction;
        switch(direction) {
            case "cameraUp":
                Player.freeCameraPosition.y -= Player.cameraSpeed;
                break;
            case "cameraDown":
                Player.freeCameraPosition.y += Player.cameraSpeed;
                break;
            case "cameraLeft":
                Player.freeCameraPosition.x -= Player.cameraSpeed;
                break;
            case "cameraRight":
                Player.freeCameraPosition.x += Player.cameraSpeed;
                break;
        }
    }
    static moveOppositeOfPlayer(entity) {
        const playerDirection = Player.getPlayerDirection();
        switch(playerDirection) {
            case "none":
                break;
            case "up":
                if (!Player.freeCamera) {
                    entity.currentPos.y += Player.speed;
                }
                break;
            case "down":
                if (!Player.freeCamera) {
                    entity.currentPos.y -= Player.speed;
                }
                break;
            case "left":
                if (!Player.freeCamera) {
                    entity.currentPos.x += Player.speed;
                }
                break;
            case "right":
                if (!Player.freeCamera) {
                    entity.currentPos.x -= Player.speed;
                }
                break;
        }
    }
    static resetCameraBackToPlayer() {
        const playerInstance = game.player;
        const canvasInstance = game.canvas;
        if (Player.freeCamera) {
            Player.cameraPosition.x = playerInstance.currentPos.x - (canvasInstance.width / 2) + (playerInstance.width / 2);
            Player.cameraPosition.y = playerInstance.currentPos.y - (canvasInstance.height / 2) + (playerInstance.height / 2);
            Player.freeCameraPosition.x = Player.cameraPosition.x;
            Player.freeCameraPosition.y = Player.cameraPosition.y;
        }
    }
    cameraFollow() {
        if (!Player.freeCamera) {
            // console.log("Cam", Player.cameraPosition.x, Player.cameraPosition.y, ":", "FreeCam", Player.freeCameraPosition.x, Player.freeCameraPosition.y, ":", "Pl", this.currentPos.x, this.currentPos.y);
            Player.cameraPosition.x = this.currentPos.x - (this.canvas.width / 2) + (this.width / 2);
            Player.cameraPosition.y = this.currentPos.y - (this.canvas.height / 2) + (this.height / 2);
        }
        else {
            // console.log("Cam", Player.cameraPosition.x, Player.cameraPosition.y, ":", "FreeCam", Player.freeCameraPosition.x, Player.freeCameraPosition.y, ":", "Pl", this.currentPos.x, this.currentPos.y);
        }
    }
    static setFreeCamera(state) {
        Player.resetCameraBackToPlayer();
        console.log("Free Camera State:", state);
        if (state === true) {
            Player.freeCameraPosition.x = Player.cameraPosition.x;
            Player.freeCameraPosition.y = Player.cameraPosition.y;
        }
        Player.freeCamera = state;
    }
    static getPlayerDirection() {
        return Player.direction;
    }
    static getCameraDirection() {
        return Player.cameraDirection;
    }
}