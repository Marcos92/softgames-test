import { Container, Graphics, TextStyle, Text } from "pixi.js";

export class Button extends Container {

    button: Graphics;

    baseColor = '333333';
    overColor = '999999';
    downColor = 'FFFFFF';

    buttonWidth = 100;
    buttonHeight = 100;

    constructor(width: number, height: number, text: string) {
        super();
        this.buttonWidth = width;
        this.buttonHeight = height;
        this.button = new Graphics();
        this.drawButton(this.baseColor);

        const style = new TextStyle({
            fontFamily: "Arial",
            fontSize: 48,
            fill: "FFFFFF",
        });

        const label = new Text({ text, style });
        label.anchor.set(0.5);
        label.x = this.buttonWidth / 2;
        label.y = this.buttonHeight / 2;

        this.button.interactive = true;
        this.button.on("pointerdown", this.onPointerDown);
        this.button.on("pointerup", this.onPointerUp);
        this.button.on("pointerover", this.onPointerOver);
        this.button.on("pointerout", this.onPointerOut);

        this.addChild(this.button);
        this.addChild(label);
    }

    onClick(action: () => void) {
        this.button.on("pointerdown", action);
    }

    drawButton = (color: string) => {
        this.button.clear();
        this.button.fill(color);
        this.button.roundRect(0, 0, this.buttonWidth, this.buttonHeight, 10);
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