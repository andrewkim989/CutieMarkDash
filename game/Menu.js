class Menu extends Phaser.Scene {
    constructor() {
        super ({ key: "Menu"});
    }

    preload() {
        this.load.image("title", "menu/title.png");
        this.load.image("play", "menu/play.png");
        this.load.image("instr", "menu/instructions.png");
        this.load.image("credits", "menu/credits.png");
        this.load.image("dashie", "menu/dashie.png");
        this.load.image("rdcutie", "menu/rdcutie.png");
        this.load.image("bestpony", "menu/bestpony.png");
        this.load.audio("mlp", "menu/mlp.mp3");
        this.load.audio("10seconds", "menu/10seconds.mp3");
        this.load.audio("equestria", "menu/equestria.mp3");
    }

    create() {
        var title = this.add.sprite(500, 70, "title").setInteractive();
        this.mlp = this.sound.add("mlp");

        title.on("pointerdown", function () {
            this.mlp.play();
        }, this);

        var play = this.add.sprite(500, 170, "play").setInteractive( { useHandCursor: true });
        play.on("pointerdown", function () {
            this.scene.start("Level1");
        }, this);

        var instr = this.add.image(500, 270, "instr").setInteractive( { useHandCursor: true });
        instr.on("pointerdown", function () {
            this.scene.start("Instructions");
        }, this);

        var credits = this.add.image(500, 370, "credits").setInteractive( { useHandCursor: true });
        credits.on("pointerdown", function () {
            this.scene.start("Credits");
        }, this);

        var dashie = this.add.sprite(200, 320, "dashie").setInteractive();
        this.seconds = this.sound.add("10seconds");
        dashie.on("pointerdown", function () {
            this.seconds.play();
        }, this);

        dashie.on("pointerover", function () {
            this.bestpony = this.add.image(500, 500, "bestpony");
        }, this);

        dashie.on("pointerout", function () {
            this.bestpony.destroy();
        }, this);
        
        var cutie = this.add.image(800, 300, "rdcutie").setInteractive();
        this.eq = this.sound.add("equestria");
        cutie.on("pointerdown", function () {
            this.eq.play();
        }, this);
    }
}