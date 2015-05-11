var game = new Phaser.Game(800, 600, Phaser.AUTO, 'playarea', { preload: preload, create: create, update: update });

var tank;

var keyboard;
var keyW;
var keyD;

function preload() {
    game.load.image('bg', '/img/bg.png');
    game.load.spritesheet('tank-body', '/img/tank/tank-body.png', 49, 37, 2, 0, 1);
    game.load.image('bullet', '/img/bullet.png');
}

function create() {
    keyboard = game.input.keyboard;
    keyW = keyboard.addKey(Phaser.Keyboard.W);
    keyS = keyboard.addKey(Phaser.Keyboard.S);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.tileSprite(0, 0, 800, 600, 'bg');

    tank = game.add.sprite(400, 300, 'tank-body');
    tank.anchor.setTo(0.5, 0.5);
    tank.animations.add('move');
    game.physics.arcade.enable(tank); // Apply arcade physics to the tank
    tank.body.collideWorldBounds = true; //Sets the tank to collide when it reaches the edge of the world

    game.input.onDown.add(shoot, this); //Add a mouse click listener
}

function update() {
    tank.body.velocity.setTo(0, 0);

    //TODO Add wheels animation
    
    //Check if tank is not at mouse position to avoid visual glitch
    if (!Phaser.Rectangle.contains(tank.body, game.input.x, game.input.y)) {
        if (keyW.isDown) {
            //  Move up
            game.physics.arcade.moveToPointer(tank, 100, game.input.activePointer);
            tank.animations.play('move', 20, true);
        }
        else if (keyS.isDown) {
            //  Move down
            game.physics.arcade.moveToPointer(tank, -100, game.input.activePointer);
            tank.animations.play('move', 20, true);
        }
        else {
            tank.animations.stop('move');
        }
    }
    else {
        tank.animations.stop('move')
    }

    //Point tank at mouse
    tank.rotation = game.physics.arcade.angleToPointer(tank);
}

function shoot() {
    var bullet = game.add.sprite(tank.x, tank.y, 'bullet');
    game.physics.arcade.enable(bullet);
    bullet.anchor.setTo(0.5, 0.5);
    bullet.body.collideWorldBounds = true;
    bullet.body.bounce.x = 1;
    bullet.body.bounce.y = 1;
    game.world.bringToTop(tank); 

    game.physics.arcade.moveToPointer(bullet, 300, game.input.activePointer);

    game.time.events.add(Phaser.Timer.SECOND * 5, killBullet, this, bullet);
}

function killBullet(bullet) {
    bullet.kill();
}