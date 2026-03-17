// G. Spencer Barkman
// Playable Postcard - "Physical Tokens"
// Time Spent: 26 hours
// Phaser Components Used: Arcade Physics, Cameras, Text Objects, 
// Animation mananger, Tween Manager, Timers, Tilemaps, Statemachines
// Tile packs - Kodani, Schwarnhild, Graduation Cat, Guilherme Vieira
// Music - Kevin Macleod
// Font - Manfred Klein
// Load screen code https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
// No creative tilt I'm particularly proud of. Glad I finally got the footsteps working,
// but I was mostly using this assignment to get familiar with Tiled, and work on my 
// environment building. So I made an abridged version of the Cowell/Stevenson dining 
// Hall area and the east field, featuring a rugby pitch, and used the postcard
// prompt to try and really reach out and connect with my best friend.

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