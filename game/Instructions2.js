class Instructions2 extends Phaser.Scene {
    constructor() {
        super ({ key: "Instructions2"});
    }

    preload() {
        this.load.image("instr", "instr/instructions.png");
        this.load.image("text2", "instr/text2.png");
        this.load.image("back", "instr/back.png");
        this.load.image("menu", "instr/menu.png");
        this.load.image("next", "instr/next.png");
        this.load.image("good", "instr/good.png");
    }

    create() {
        this.instr = this.add.image(500, 70, "instr");
        this.text = this.add.image(500, 230, "text2");
        this.good = this.add.image(500, 400, "good");

        var back = this.add.sprite(150, 500, "back").setInteractive( { useHandCursor: true });
        back.on("pointerdown", function () {
            this.scene.start("Instructions");
        }, this);

        var menu = this.add.sprite(500, 500, "menu").setInteractive( { useHandCursor: true });
        menu.on("pointerdown", function () {
            this.scene.start("Menu");
        }, this);
    }
}