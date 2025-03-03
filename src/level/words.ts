import { Application, Container, Sprite, Text, TextStyle, Texture } from "pixi.js";
import { Scene } from "../scene";
import { Button } from "../button";

export class Words extends Scene {
    currentDialogue: number = 0;
    dialogue: any[] = [];
    avatars: Map<string, Sprite> = new Map();
    positions: Map<string, string> = new Map();
    emojis: Map<string, Sprite> = new Map();
    dialogueContainer: Container = new Container();

    skipButton: Button;
    loadingText: Text;

    constructor(app: Application, name: string) {
        super(app, name);

        this.container.addChild(this.dialogueContainer);

        const style = new TextStyle({
            fontFamily: "Arial",
            fontSize: 50,
            fill: "FFFFFF",
        });
        this.loadingText = new Text({ text: "Loading...", style });
        this.loadingText.x = this.app.screen.width / 2 - this.loadingText.width / 2;
        this.loadingText.y = this.app.screen.height / 2 - this.loadingText.height / 2;
        this.container.addChild(this.loadingText);
    }

    override async load(app: Application): Promise<void> {
        this.fetchData();
    }

    async fetchData(): Promise<void> {
        const url = 'https://private-624120-softgamesassignment.apiary-mock.com/v2/magicwords';
        try {
            const response = await fetch(url);
            const data = await response.json();

            this.dialogue = data.dialogue;

            console.log("Starting to load avatars and emojis...");

            await Promise.all([
                this.parseAvatars(data.avatars),
                this.parseEmojis(data.emojies)
            ]);

            console.log("Avatars and emojis loaded successfully!");

            this.initDialogue();

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async parseAvatars(data: any[]): Promise<void> {
        const avatarPromises = data.map(async element => {
            try {
                const avatarUrl = element.url;
                const texture = await new Promise<Texture>((resolve, reject) => {
                    const img = new Image();
                    img.crossOrigin = "anonymous";
                    img.onload = () => resolve(Texture.from(img));
                    img.onerror = (err) => reject(`Failed to load image for avatar ${element.name}: ${err}`);
                    img.src = avatarUrl;
                });
                const avatarSprite = new Sprite(texture);
                this.avatars.set(element.name, avatarSprite);
                this.positions.set(element.name, element.position);
            } catch (error) {
                console.error(`Error loading texture for avatar ${element.name}:`, error);
            }
        });
        await Promise.all(avatarPromises);
        console.log("All avatars loaded.");
    }

    async parseEmojis(data: any[]): Promise<void> {
        const emojiPromises = data.map(async element => {
            try {
                const emojiUrl = element.url;
                const texture = await new Promise<Texture>((resolve, reject) => {
                    const img = new Image();
                    img.crossOrigin = "anonymous";
                    img.onload = () => resolve(Texture.from(img));
                    img.onerror = (err) => reject(`Failed to load image for emoji ${element.name}: ${err}`);
                    img.src = emojiUrl;
                });
                const emojiSprite = new Sprite(texture);
                this.emojis.set(element.name, emojiSprite);
            } catch (error) {
                console.error(`Error loading texture for emoji ${element.name}:`, error);
            }
        });
        await Promise.all(emojiPromises);
        console.log("All emojis loaded.");
    }

    initDialogue() {
        this.loadingText.visible = false;
        this.skipButton = new Button(200, 75, "Next");
        this.container.addChild(this.skipButton);
        this.skipButton.x = this.app.screen.width / 2 - this.skipButton.width / 2;
        this.skipButton.y = this.app.screen.height / 2 - this.skipButton.height / 2;
        this.skipButton.onClick(() => this.skipDialogue());
        this.showDialogue();
    }

    skipDialogue() {
        this.currentDialogue++;

        if (this.currentDialogue >= this.dialogue.length) {
            return;
        }

        this.showDialogue();

        this.skipButton.visible = this.currentDialogue < this.dialogue.length - 1;
    }

    showDialogue() {

        const line = this.dialogue[this.currentDialogue];
        const name = line.name;
        const text = line.text;

        const position = this.positions.get(name) as string;

        this.parseTextWithEmojis(text, position);

        const margin = 50;
        const avatarSprite = this.avatars.get(name) as Sprite;
        if (avatarSprite) {
            avatarSprite.x = position === "left" ? margin : this.app.screen.width - margin - avatarSprite.width;
            avatarSprite.y = this.app.screen.height - margin - avatarSprite.height;
            this.dialogueContainer.addChild(avatarSprite);
        }
    }

    parseTextWithEmojis(text: string, side: string): void {

        const textContainer = new Container();
        this.dialogueContainer.removeChildren();

        const regex = /\{(.*?)\}/g;

        let textIndex = 0;
        let offset = 0;

        let match;
        while ((match = regex.exec(text)) !== null) {

            const textBeforeEmoji = text.substring(textIndex, match.index);
            if (textBeforeEmoji) {
                const style = new TextStyle({
                    fontFamily: "Arial",
                    fontSize: 24,
                    fill: "FFFFFF",
                });
                const textElement = new Text({ text: textBeforeEmoji, style });
                textElement.x = 0;
                textElement.y = this.app.screen.height - 100;
                offset += textElement.width;
                textContainer.addChild(textElement);
            }

            const emojiName = match[1];
            const emojiSprite = this.emojis.get(emojiName);
            emojiSprite?.scale.set(0.2);
            if (emojiSprite) {
                emojiSprite.x = offset;
                emojiSprite.y = this.app.screen.height - 100;
                offset += emojiSprite.width;
                textContainer.addChild(emojiSprite);
            }

            textIndex = regex.lastIndex;
        }

        const remainingText = text.substring(textIndex);
        if (remainingText) {
            const style = new TextStyle({
                fontFamily: "Arial",
                fontSize: 24,
                fill: "FFFFFF",
            });
            const textElement = new Text({ text: remainingText, style });
            textElement.x = offset;;
            textElement.y = this.app.screen.height - 100;
            textContainer.addChild(textElement);
        }

        textContainer.x = side === 'left' ? 200 : this.app.screen.width - 200 - textContainer.width;
        this.dialogueContainer.addChild(textContainer);
    }
}