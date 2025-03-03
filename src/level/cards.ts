import { Application, Assets, Point, Sprite, Ticker } from "pixi.js";
import { Scene } from "../scene";
import gsap from "gsap";

export class Cards extends Scene {
    [x: string]: any;

    leftStack: Sprite[] = [];
    rightStack: Sprite[] = [];

    leftPosition: number;
    rightPosition: number;

    spacing = 0.25;

    elapsedTime = 0;
    animationInterval = 1000;
    animationDuration = 2000;

    constructor(app: Application, name: string) {
        super(app, name);
    }

    override async load(app: Application): Promise<void> {
        const texture = await Assets.load('https://static.wikia.nocookie.net/balatrogame/images/e/ef/Joker.png');

        this.leftPosition = app.screen.width * 0.25;
        this.rightPosition = app.screen.width * 0.75;

        for (let i = 0; i < 144; i++) {
            let card = new Sprite(texture);
            this.leftStack.push(card);
            this.container.addChild(card);
            card.anchor.set(0.5);
            card.x = this.leftPosition;
            card.y = app.screen.height / 2 - i * this.spacing;
            card.zIndex = i;
        }
    }

    update = (time: Ticker) => {
        this.elapsedTime += time.deltaMS;
        if (this.elapsedTime >= this.animationInterval && this.leftStack.length > 0) {
            let card = this.leftStack.pop();
            if (card) {
                card.zIndex = this.rightStack.length;
                let destination = new Point(Math.abs(this.rightPosition), this.app.screen.height / 2 - this.rightStack.length * this.spacing);
                gsap.to(card, {
                    x: destination.x,
                    y: destination.y,
                    duration: this.animationDuration / 1000,
                    ease: 'power1.inOut',
                    onComplete: () => {
                        this.rightStack.push(card);
                        console.log(this.rightStack.length);
                    }
                });
            }
            this.elapsedTime -= this.animationInterval;
        }
    }
}