class Level1 extends Phaser.Scene {
    
    static clicked;

    constructor() {
        super({key: "Level1"});
    }

    preload() {
        this.load.image("Background", "assets/background-2.jpg");
        this.load.image("Player", "assets/player.png");
        this.load.image("Ground", "assets/ground.png");
        this.load.image("Finish", "assets/finish.png");
    }

    create() {
        // Configuring my Scene
        this.add.image(400, 300, "Background").setScale(1.5);

        this.player = this.physics.add.image(100, 450, "Player");
        this.player.setInteractive();
        //this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.25);
        this.player.body.setMaxSpeed(1000);
        this.player.scaleX = this.player.scaleX / 5;
        this.player.scaleY = this.player.scaleY / 5;

        this.line = this.add.line(0, 0, 0, 0, 0, 0, 0xff0000).setOrigin(0, 0);

        this.ground = this.physics.add.staticGroup();
        this.ground.create(400, 550, "Ground").setScale(2).refreshBody();

        this.finish = this.physics.add.staticGroup();
        this.finish.create(600, 500-80, "Finish").setScale(0.5).refreshBody();

        // Adding events
        this.input.on("pointerup", (e) => {
            if (!Level1.clicked) {
                this.player.body.velocity.x += (((e.x) - (this.player.x)) * 2);
                this.player.body.velocity.y += (((e.y) - (this.player.y)) * 2);
                Level1.clicked = true;
            }
        });

        // Physics events
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.overlap(this.player, this.finish, this.levelFinish, null, this);
    }

    static lastLine;

    update(delta) {
        var pointer = this.input.activePointer;
        if (pointer.isDown) {
            this.line.destroy();
            this.line = this.add.line(
                0,
                0,
                this.player.x,
                this.player.y,
                pointer.x,
                pointer.y,
                0xff0000
            ).setOrigin(0, 0);
        } else {
            this.line.destroy();
        }
    }

    levelFinish(player, finish) {
        console.log("You Win!");
        this.physics.pause();
    }
}