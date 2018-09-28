class Level1 extends Phaser.Scene {
    constructor() {
        super ({ key: "Level1"});
        this.score = 0;
        this.level = 1;
        this.end = (Date.now() + 61000) / 1000;
    }

    preload() {
        this.load.spritesheet("rdstandleft", "rainbow/rdstandleft.png", { frameWidth: 98, frameHeight: 86 });
        this.load.spritesheet("rdstandright", "rainbow/rdstandright.png", { frameWidth: 98, frameHeight: 86 });
        this.load.spritesheet("rdtrotleft", "rainbow/rdwalkleft.png", { frameWidth: 98, frameHeight: 88 });
        this.load.spritesheet("rdtrotright", "rainbow/rdwalkright.png", { frameWidth: 98, frameHeight: 88 });
        this.load.spritesheet("rdjumpleft", "rainbow/rdflyleft.png", { frameWidth: 100, frameHeight: 90 });
        this.load.spritesheet("rdjumpright", "rainbow/rdflyright.png", { frameWidth: 100, frameHeight: 90 });
        this.load.image("mark", "rainbow/rdcutie.png");
        this.load.image("level1ground", "level1/ground1.png");
        this.load.image("platform", "level1/smallplatform.png");
        this.load.audio("coin", "rainbow/coin.wav");
        this.load.audio("level1music", "level1/level1music.mp3");
    }

    create() {
        this.ground = this.physics.add.staticGroup();
        this.ground.create(500, 580, "level1ground").setScale(1.6).refreshBody();
        this.platform = this.physics.add.staticGroup();
        this.platform.create(500, 420, "platform").setScale(1.55);
        this.platform.create(100, 300, "platform").setScale(1.55);
        this.platform.create(900, 300, "platform").setScale(1.55);
        this.platform.create(500, 150, "platform").setScale(1.55);
        
        this.rd = this.physics.add.sprite(70, 475, "rdstandright");
    
        this.rd.setBounce(0);
        this.rd.setCollideWorldBounds(true);
    
        this.physics.add.collider(this.rd, this.ground);
        this.physics.add.collider(this.rd, this.platform);
    
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("rdtrotleft", { start: 0, end: 15 }),
            frameRate: 25,
            repeat: -1
        });
    
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("rdtrotright", { start: 0, end: 15 }),
            frameRate: 25,
            repeat: -1
        });
    
        this.anims.create({
            key: "standleft",
            frames: this.anims.generateFrameNumbers("rdstandleft", { start: 0, end: 20 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: "standright",
            frames: this.anims.generateFrameNumbers("rdstandright", { start: 0, end: 20 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: "jumpleft",
            frames: this.anims.generateFrameNumbers("rdjumpleft", { start: 0, end: 15 }),
            frameRate: 20,
            repeat: -1
        });
    
        this.anims.create({
            key: "jumpright",
            frames: this.anims.generateFrameNumbers("rdjumpright", { start: 0, end: 15 }),
            frameRate: 20,
            repeat: -1
        });
    
        this.cursors = this.input.keyboard.createCursorKeys();
    
        this.scoreText = this.add.text(16, 16, "Score: 0", 
        { fontSize: "32px Comic Sans MS", fill: "#262728" });
    
        this.levelNum = this.add.text(16, 50, "Level " + this.level, 
        { fontSize: "32px Comic Sans MS", fill: "#262728" });
    
        this.cm = this.physics.add.staticGroup();

        for (var i = 0; i < 10; i++) {
            var x = Phaser.Math.RND.between(50, 980);
            var y = Phaser.Math.RND.between(20, 490);
            this.cm.create(x, y, "mark");
        }
    
        this.physics.add.overlap(this.rd, this.cm, this.collectMark, null, this);

        this.s = this.sound.add("coin");
        this.m = this.sound.add("level1music");

        this.m.play();

        this.end = (Date.now() + 61000) / 1000;
        this.currentTime = this.add.text(850, 10, "Time: 60", 
        { fontSize: "30px Comic Sans MS", fill: "#2f3133"});
    }

    update() {
        if (this.cursors.left.isDown) {
            if (this.rd.body.onFloor()) {
                this.rd.setVelocityX(-260);
                this.rd.anims.play("left", true);
            }
            else {
                this.rd.setVelocityX(-380);
                this.rd.anims.play("jumpleft", true);
            }
        }
        else if (this.cursors.right.isDown) {
            if (this.rd.body.onFloor()) {
                this.rd.setVelocityX(260);
                this.rd.anims.play("right", true);
            }
            else {
                this.rd.setVelocityX(380);
                this.rd.anims.play("jumpright", true);
            }
        }
        else {
            this.rd.setVelocityX(0);

            this.input.keyboard.on("keyup_LEFT", function (event) {
                if (this.rd.body.onFloor()) {
                    this.rd.anims.play("standleft", true);
                }
                else {
                    this.rd.anims.play("jumpleft", true);
                }
            }, this);
            this.input.keyboard.on("keyup_RIGHT", function (event) {
                if (this.rd.body.onFloor()) {
                    this.rd.anims.play("standright", true);
                }
                else {
                    this.rd.anims.play("jumpright", true);
                }
            }, this);
        }

        if (this.cursors.up.isDown && this.rd.body.onFloor()) {
            this.rd.setVelocityY(-320);
        }
        if (this.cursors.down.isDown && !this.rd.body.onFloor()) {
            this.rd.setVelocityY(320);
        }

        this.current(this.end);
    }

    collectMark (rd, cm) {
        cm.disableBody(true, true);
        this.s.play();
    
        this.score = this.score + 10;
        this.scoreText.setText("Score: " + this.score);

        if (this.cm.countActive(true) === 0) {
            for (var i = 0; i < 10; i++) {
                var x = Phaser.Math.RND.between(50, 980);
                var y = Phaser.Math.RND.between(20, 490);
                this.cm.create(x, y, "mark");
            }
            this.level = this.level + 1;
            this.levelNum.setText("Level " + this.level);
        }
    }

    current(time) {
        var seconds = Math.floor(time - (Date.now() / 1000) ) % 61;
        this.currentTime.setText("Time: " + seconds);

        if (seconds == 0) {
            this.m.stop();
            this.scene.start("Results", {score: this.score, level: this.level});
            this.end = (Date.now() + 61000) / 1000;
            this.score = 0;
            this.level = 1;
        }
    }
}