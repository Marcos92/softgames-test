import { Application, Renderer } from "pixi.js";
import { Scene } from "./scene";
import { Button } from "./button";

export class Menu extends Scene {
    scenes: Scene[] = [];

    constructor(app: Application, scenes: Scene[]) {
        super(app, "Menu");
        this.scenes = scenes;
        this.createButtons(app);
        this.closeButton.visible = false;
    }

    createButtons = (app: Application) => {
        this.scenes.forEach((scene, index) => {
            const button = new Button(200, 75, scene.name);
            this.container.addChild(button);
            const spacing = 25;
            const y = app.screen.height / 2 - button.getBounds().height / 2 - button.getBounds().height * ((this.scenes.length) / 2) - spacing * ((this.scenes.length - 1) / 2);
            button.position.x = app.screen.width / 2 - button.getBounds().width / 2;
            button.position.y = y + index * (button.getBounds().height + spacing);
            button.onClick(() => {
                scene.open()
                this.close();
            });
        });
    }
}