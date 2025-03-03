import { Application, Container, Ticker } from "pixi.js";
import { Button } from "./button";

export class Scene {

    app: Application;
    container: Container;

    public name: string;

    closeButton: Button;

    parentScene: Scene;

    constructor(app: Application, name: string) {
        this.app = app;
        this.container = new Container();
        app.stage.addChild(this.container);
        this.container.visible = false;
        this.name = name;

        this.closeButton = new Button(50, 50, "X");
        this.container.addChild(this.closeButton);
        this.closeButton.x = app.screen.width - this.closeButton.width - 10;
        this.closeButton.y = 10;

        this.closeButton.onClick(() => {
            this.parentScene.open();
            this.close();
        });
    }

    async load(app: Application): Promise<void> { }

    update = (time: Ticker) => { }

    open() {
        this.load(this.app).then(() => {
            this.container.visible = true;
            this.app.ticker.add(this.update);
        });
    }

    close() {
        this.container.visible = false;
        this.app.ticker.remove(this.update);
    }
}