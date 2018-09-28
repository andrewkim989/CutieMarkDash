class Credits extends Phaser.Scene {
    constructor() {
        super ({ key: "Credits"});
    }

    preload() {
        this.load.image("credits", "credits/credits.png");
        this.load.image("cred", "credits/cred.png");
        this.load.image("cred2", "credits/cred2.png");
        this.load.image("cred3", "credits/cred3.png");
        this.load.image("menu", "credits/menu.png");
    }

    create() {
        this.add.image(500, 50, "credits");
        this.add.image(500, 220, "cred");
        this.add.image(450, 340, "cred2");
        this.add.image(500, 430, "cred3");

        var menu = this.add.sprite(500, 520, "menu").setInteractive( { useHandCursor: true });
        menu.on("pointerdown", function () {
            this.scene.start("Menu");
        }, this);
    }
}