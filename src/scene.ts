import { Application, Container, Ticker } from "pixi.js";

export class Scene {

    app: Application;
    container: Container;

    constructor(app: Application) {
        this.app = app;
        this.container = new Container();
        app.stage.addChild(this.container);
        this.container.visible = false;
    }

    async load(app: Application): Promise<void> { }

    update = (time: Ticker) => { }

    public open() {
        this.load(this.app).then(() => {
            this.container.visible = true;
            this.app.ticker.add(this.update);
        });
    }

    public close() {
        this.container.visible = false;
        this.app.ticker.remove(this.update);
    }
}