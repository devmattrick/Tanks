var game = new Phaser.Game(800, 600, Phaser.AUTO, 'playarea', { preload: preload, create: create, update: update });

var keyboard;
var mouse;
var keyW;
var keyA;
var keyS;
var keyD;

var dx;
var dy;

function preload() {
	game.load.image('bg', '/img/bg.png');
    game.load.image('tank-body', '/img/tank/tank-body.png');
    game.load.image('bullet', '/img/bullet.png');
}

function create() {
	keyboard = game.input.keyboard;
	mouse = game.input.mousePointer;
	keyW = keyboard.addKey(Phaser.Keyboard.W);
	keyA = keyboard.addKey(Phaser.Keyboard.A);
	keyS = keyboard.addKey(Phaser.Keyboard.S);
	keyD = keyboard.addKey(Phaser.Keyboard.D);

	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.add.tileSprite(0, 0, 800, 600, 'bg');
	tank = game.add.sprite(400, 300, 'tank-body');
	tank.anchor.setTo(0.5, 0.5)

    game.physics.arcade.enable(tank); // Apply arcade physics to the tank

    tank.body.collideWorldBounds = true; //Sets the tank to collide when it reaches the edge of the world

    game.input.onDown.add(shoot, this); //Add a mouse click listener
}

function update() {
	//Yes I know this is redundant, tank.body.velocity = 0 prevents it from moving
	tank.body.velocity.x = 0;
	tank.body.velocity.y = 0;

	//TODO Add wheels animation
	if (keyW.isDown) {
        //  Move up
        game.physics.arcade.moveToPointer(tank, 100, game.input.activePointer);
    }
    if (keyS.isDown) {
        //  Move down
        game.physics.arcade.moveToPointer(tank, -100, game.input.activePointer);
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
}