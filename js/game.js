// Create a new scene
let gameScene = new Phaser.Scene("Game")

// Create new configuration
let config = {
  type: Phaser.AUTO,
  width: 720,
  height: 480,
  scene: gameScene,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 0},
      debug: false
    }
  }
}

// Load assets
gameScene.preload = function () {
  this.moveCam = false;
  this.load.image("player", "assets/player_base.png")
  for (i = 1; i < 9; i++) {
    this.load.image("grass_" + i, "assets/grass_" + i + ".png")
  }
}

// Called once after preload ends
gameScene.create = function () {
//  let bg = this.add.sprite(0, 0, "background")
//  bg.setOrigin(0, 0)
  this.cameras.main.setBounds(-1280, -1280, 1280, 1280);
  this.physics.world.setBounds(-1280, -1280, 1280, 1280);

  let entities = this.physics.add.group()
  this.player = entities.create(640, 640, "player")
  this.player.setCollideWorldBounds(true)
  this.player.setScale(2.0, 2.0)
  this.player.depth = 1
  this.player.dir = 1

  this.cameras.main.startFollow(this.player, true)

  if (this.cameras.main.deadzone)
  {
    const graphics = this.add.graphics().setScrollFactor(0)
    graphics.lineStyle(2, 0x00ff00, 1)
    graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height)
  }

  console.log(this.player)

  this.player.score = 0
  this.player.scoreText = this.add.text(16, 16, "Score: 0", {fontSize: "24px", fill: "#000"})

  for (x = -10; x < 10; x++) {
    for (y = -10; y < 10; y++) {
      grass = this.add.image(x * 32, y * 32, "grass_" + Phaser.Math.Between(1, 8))
      grass.setScale(2.0, 2.0)
      grass.setOrigin(16, 16)
    }
  }

  /*
  let platforms = this.physics.add.staticGroup();

  platforms.create(100, 100, 'ground').setScale(2).refreshBody()

  platforms.create(200, 180, 'ground')
  platforms.create(300, 100, 'ground')

  platforms.create(this.sys.game.config.width / 2, this.sys.game.config.height - 10, 'ground').setScale(20, 0.3).refreshBody()

  this.physics.add.collider(platforms, this.player)
  */
  this.cursors = this.input.keyboard.createCursorKeys()
  this.wasd = {
    up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
    down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
    left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
    right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
  }
  /*
  let stars = this.physics.add.group({
    key: 'star',
    repeat: 10,
    setXY: {x: 10, y: 0, stepX: 50}
  });

  stars.children.iterate(function (child) {

    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

  });

  this.physics.add.collider(stars, platforms)

  let collectStar = function (player, star) {
    star.disableBody(true, true)
    player.score += 10
    player.scoreText.setText("Score: " + player.score)
  }

  this.physics.add.overlap(this.player, stars, collectStar, null, this)
   */
}

let kk = 0
// Update
gameScene.update = function () {
  if (this.wasd.left.isDown) {
    if (this.player.body.velocity.x > -200) {
      this.player.body.velocity.x -= 18
    } else {
      this.player.body.velocity.x = -200
    }
  } else if (this.wasd.right.isDown) {
    if (this.player.body.velocity.x < 200) {
      this.player.body.velocity.x += 18
    } else {
      this.player.body.velocity.x = 200
    }
  } else {
    if (Math.abs(this.player.body.velocity.x) > 33) {
      this.player.body.velocity.x /= 1.2
    } else {
      this.player.body.velocity.x = 0
    }
  }

  if (this.wasd.up.isDown) {
    if (this.player.body.velocity.y > -200) {
      this.player.body.velocity.y -= 18
    } else {
      this.player.body.velocity.y = -200
    }
  } else if (this.wasd.down.isDown) {
    if (this.player.body.velocity.y < 200) {
      this.player.body.velocity.y += 18
    } else {
      this.player.body.velocity.y = 200
    }
  } else {
    if (Math.abs(this.player.body.velocity.y) > 33) {
      this.player.body.velocity.y /= 1.2
    } else {
      this.player.body.velocity.y = 0
    }
  }

  dx = game.input.mousePointer.x - this.player.body.position.x
  dy = game.input.mousePointer.y - this.player.body.position.y
  deg = Math.atan2(dy, dx)
  this.player.angle = deg * (180 / Math.PI)
}


// Create a new Game and pass config
let game = new Phaser.Game(config)
