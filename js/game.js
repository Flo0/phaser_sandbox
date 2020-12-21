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
  this.load.image("player", "assets/player.png")
}

// Called once after preload ends
gameScene.create = function () {
//  let bg = this.add.sprite(0, 0, "background")
//  bg.setOrigin(0, 0)

  let entities = this.physics.add.group()
  this.player = entities.create(config.width / 2, config.height / 2, "player").setScale(2).refreshBody()
  this.player.setCollideWorldBounds(true)
  this.player.setScale(2.0, 2.0)
  this.player.depth = 1
  this.player.dir = 1
  console.log(this.player)

  this.player.score = 0
  this.player.scoreText = this.add.text(16, 16, "Score: 0", {fontSize: "24px", fill: "#000"})

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

}


// Create a new Game and pass config
let game = new Phaser.Game(config)
game.scale.pageAlignHorizontally = true
game.scale.pageAlignVertically = true
game.scale.refresh()
