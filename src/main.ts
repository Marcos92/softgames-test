import "./reset.css"
import { Application } from 'pixi.js';
import { Scene } from './scene';
import { Menu } from './menu';
import * as Level from './level';

(async () => {

    const app = new Application();
    await app.init({ background: '6495ED', resizeTo: window });
    document.body.appendChild(app.canvas);

    let menu = new Menu(app, createScenes(app));
    menu.open();

})();

function createScenes(app: Application) {

    let scenes: Scene[] = [];
    scenes.push(new Level.Cards(app));
    scenes.push(new Level.Words(app));
    scenes.push(new Level.Flames(app));
    return scenes;
}