class Instructions extends Phaser.Scene {
    constructor() {
        super ({ key: "Instructions"});
    }

    preload() {
        this.load.image("controls", "instr/controls.png");
        this.load.image("text", "instr/text.png");
        this.load.image("menu", "instr/menu.png");
        this.load.image("next", "instr/next.png");
    }

    create() {
        this.controls = this.add.image(500, 70, "controls");
        this.text = this.add.image(500, 250, "text");

        var menu = this.add.sprite(500, 500, "menu").setInteractive( { useHandCursor: true });
        menu.on("pointerdown", function () {
            this.scene.start("Menu");
        }, this);

        var next = this.add.sprite(850, 500, "next").setInteractive( { useHandCursor: true });
        next.on("pointerdown", function () {
            this.scene.start("Instructions2");
        }, this);
    }
}