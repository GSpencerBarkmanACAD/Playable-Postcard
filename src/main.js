// G. Spencer Barkman
// Playable Postcard

//Tile packs - Kodani, Schwarnhild, Graduation Cat, Guilherme Vieira

'use strict'

let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    width: 500,
    height: 375,
    pixelArt: true,
    zoom: 2,
    render: {
        pixelArt: true,
        roundPixels: true
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [ Load, Title, Play, Finale, Credits ]
}

let game = new Phaser.Game(config)

let centerX = game.config.width/2
let centerY = game.config.height/2
let w = game.config.width
let h = game.config.height

let cursors