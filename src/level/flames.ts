import { Application, Assets, Sprite } from "pixi.js";
import { Scene } from "../scene";
import gsap from "gsap";
import { CSSPlugin } from "gsap";
gsap.registerPlugin(CSSPlugin);

export class Flames extends Scene {
    particles: Sprite[] = [];
    maxParticles = 10;

    constructor(app: Application, name: string) {
        super(app, name);
    }

    override async load(app: Application): Promise<void> {

        const texture = await Assets.load('https://static.vecteezy.com/system/resources/thumbnails/022/841/620/small_2x/fire-burning-realistic-red-flame-transparent-png.png');

        for (let i = 0; i < this.maxParticles; i++) {
            const sprite = new Sprite(texture);
            sprite.anchor.set(0.5);
            sprite.alpha = 0;
            this.container.addChild(sprite);
            this.particles.push(sprite);
        }

        this.particles.forEach((particle, i) => {
            this.animateParticle(particle, i * 200);
        });
    }

    animateParticle(particle: Sprite, delay: number) {
        const startX = this.app.screen.width / 2 + (Math.random() - 0.5) * 250;
        const startY = this.app.screen.height - 250;
        const endX = this.app.screen.width / 2;
        const endY = startY - 250 - Math.random() * 150;

        particle.x = startX;
        particle.y = startY;
        particle.rotation = Math.random() * 360;
        particle.scale.set(0.75);

        gsap.to(particle, {
            x: endX,
            y: endY,
            alpha: 0,
            duration: 0.5,
            delay: delay / 1000,
            ease: "power1.out",
            onStart: () => {
                particle.alpha = 1;
            },
            onComplete: () => {
                particle.alpha = 1;
                this.animateParticle(particle, 0);
            },
        });
    }
}