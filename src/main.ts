import "./reset.css"
import { Application } from 'pixi.js';
import { Scene } from './scene';
import { Menu } from './menu';
import * as Level from './level';

(async () => {

    const app = new Application();
    await app.init({ background: '666666', resizeTo: window });
    document.body.appendChild(app.canvas);

    const scenes: Scene[] = [];

    scenes.push(new Level.Cards(app, "Cards"));
    scenes.push(new Level.Words(app, "Words"));
    scenes.push(new Level.Flames(app, "Flames"));

    const menu = new Menu(app, scenes);

    scenes.forEach(scene => {
        scene.parentScene = menu;
    });

    menu.open();

})();