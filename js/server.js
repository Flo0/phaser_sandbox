
const path = require('path')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

const config = {
  type: Phaser.HEADLESS,
  parent: 'phaser-example',
  width: 720,
  height: 480,
  autoFocus: false,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

function preload() {

}

function create() {

}

function update() {

}

const game = new Phaser.Game(config)

function setupAuthoritativePhaser() {
  JSDOM.fromFile(path.join(__dirname, 'authoritative_server/index.html'), {
    // To run the scripts in the html file
    runScripts: "dangerously",
    // Also load supported external resources
    resources: "usable",
    // So requestAnimatingFrame events fire
    pretendToBeVisual: true
  }).then((dom) => {
    dom.window.gameLoaded = () => {
      server.listen(8081, function () {
        console.log(`Listening on ${server.address().port}`)
      })
    }
  }).catch((error) => {
    console.log(error.message)
  })
}

setupAuthoritativePhaser()
window.gameLoaded()
