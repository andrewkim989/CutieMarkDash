class Results extends Phaser.Scene {
    constructor() {
        super ({ key: "Results"});
    }

    init(data) {
        this.score = data.score;
        this.level = data.level;
    }

    preload() {
        this.load.image("results", "results/results.png");
        this.load.image("level", "results/level.png");
        this.load.image("score", "results/score.png");
        this.load.image("highscore", "results/highscore.png");
        this.load.image("menu", "results/menu.png");
        this.load.image("again", "results/playagain.png");
    }

    create() {
        this.add.image(500, 70, "results");
        this.add.image(390, 150, "level");
        this.add.image(400, 230, "score");
        this.add.image(360, 320, "highscore");

        this.add.text(500, 130, this.level, { fontSize: "45px Comic Sans MS", fill: "#262728" });
        this.add.text(500, 210, this.score, { fontSize: "45px Comic Sans MS", fill: "#262728" });

        if (localStorage.highscore == null) {
            localStorage.highscore = this.score;
        }
        else if (this.score > localStorage.highscore) {
            localStorage.highscore = this.score;
        }

        this.add.text(500, 300, localStorage.highscore, { fontSize: "45px Comic Sans MS", fill: "#262728" });

        var again = this.add.sprite(500, 440, "again").setInteractive( { useHandCursor: true });
        var menu = this.add.sprite(500, 510, "menu").setInteractive( { useHandCursor: true });

        again.on("pointerdown", function () {
            this.scene.start("Level1");
        }, this);

        menu.on("pointerdown", function () {
            this.scene.start("Menu");
        }, this);
    }
}