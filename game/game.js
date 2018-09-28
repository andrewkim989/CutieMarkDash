var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    backgroundColor: "#7fa5e2",
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 250},
            debug: false
        }
    },
    scene: [Menu, Credits, Instructions, Instructions2, Level1, Results]
};

var game = new Phaser.Game(config);