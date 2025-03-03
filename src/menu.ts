import { Application, Renderer } from "pixi.js";
import { Scene } from "./scene";
import { Button } from "./button";

export class Menu extends Scene {
    scenes: Scene[] = [];

    constructor(app: Application, scenes: Scene[]) {
        super(app);
        this.scenes = scenes;
        this.createButtons(app);
    }

    createButtons = (app: Application) => {
        this.scenes.forEach((scene, index) => {
            let button = new Button(200, 75);
            this.container.addChild(button);
            let spacing = 25;
            let y = app.screen.height / 2 - button.getBounds().height / 2 - button.getBounds().height * ((this.scenes.length) / 2) - spacing * ((this.scenes.length - 1) / 2);
            button.position.x = app.screen.width / 2 - button.getBounds().width / 2;
            button.position.y = y + index * (button.getBounds().height + spacing);
            button.onClick(() => {
                scene.open()
                this.close();
            });
        });
    }
}