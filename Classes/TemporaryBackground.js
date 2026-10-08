import { Player } from "./Player.js";
export class TemporaryBackground {
    constructor(canvas, color, iniPosX, iniPosY) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.color = color;
        this.width = 320;
        this.height = 320;
        this.iniPos = {x: iniPosX, y: iniPosY};
        this.currentPos = {x: this.iniPos.x, y: this.iniPos.y};
    }
    draw() {
        this.ctx.fillStyle = this.color;
        if (!Player.freeCamera) {
            this.ctx.fillRect(this.currentPos.x - Player.cameraPosition.x, this.currentPos.y - Player.cameraPosition.y, this.width, this.height);
        }
        else {
            this.ctx.fillRect(this.currentPos.x - Player.freeCameraPosition.x, this.currentPos.y - Player.freeCameraPosition.y, this.width, this.height);
        }
    }
    update() {
        this.draw();
        if (!Player.freeCamera) {
            // Player.moveOppositeOfPlayer(this);
        }
        else {

        }
    }
}