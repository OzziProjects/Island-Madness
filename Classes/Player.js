import { gridBoxAspectRatio } from "../index.js";
import { Game } from "./Game.js";

export class Player {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = gridBoxAspectRatio.width * 2;
        this.height = gridBoxAspectRatio.height * 2;
        this.iniPos = {x: 0, y: 0};
        this.currentPos = {x: this.iniPos.x, y: this.iniPos.y};
        this.speed = 1;
        this.color = "blue";
    }
    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.currentPos.x, this.currentPos.y, this.width, this.height);
    }
    update() {
        this.draw();
        if (Game.movementKeyPressed().pressed) {
            this.move(Game.movementKeyPressed().direction);
        }
    }
    move(direction) {
        switch(direction) {
            case "none":
                break;
            case "up":
                this.currentPos.y -= this.speed;
                break;
            case "down":
                this.currentPos.y += this.speed;
                break;
            case "left":
                this.currentPos.x -= this.speed;
                break;
            case "right":
                this.currentPos.x += this.speed;
                break;
        }
    }
}