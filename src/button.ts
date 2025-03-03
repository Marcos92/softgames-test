import { Application, Container, FederatedPointerEvent, Graphics } from "pixi.js";

export class Button extends Container {

    button: Graphics;

    baseColor = '333333';
    overColor = '999999';
    downColor = 'FFFFFF';

    buttonWidth = 100;
    buttonHeight = 100;

    constructor(width: number, height: number) {
        super();
        this.buttonWidth = width;
        this.buttonHeight = height;
        this.button = new Graphics();
        this.drawButton(this.baseColor);
        this.button.interactive = true;
        this.button.on("pointerdown", this.onPointerDown);
        this.button.on("pointerup", this.onPointerUp);
        this.button.on("pointerover", this.onPointerOver);
        this.button.on("pointerout", this.onPointerOut);
        this.addChild(this.button);
    }

    public onClick(action: () => void) {
        this.button.on("pointerdown", action);
    }

    drawButton = (color: string) => {
        this.button.clear();
        this.button.fill(color);
        this.button.roundRect(0, 0, this.buttonWidth, this.buttonHeight, 25);
        this.button.fill();
    }

    onPointerDown = () => {
        this.drawButton(this.downColor);
    }

    onPointerUp = () => {
        this.drawButton(this.overColor);
    }

    onPointerOver = () => {
        this.drawButton(this.overColor);
    }

    onPointerOut = () => {
        this.drawButton(this.baseColor);
    }
}