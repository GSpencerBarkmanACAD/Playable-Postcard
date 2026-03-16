class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics()
        this.load.on('progress', (value) => {
            loadingBar.clear()                              // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1)               // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5)   // (x, y, w, h)
        })
        this.load.on('complete', () => {
            loadingBar.destroy()
        })

        this.load.path = './assets/'
        this.load.spritesheet('hero', 'Images/hero-sheet.png', {
            frameWidth: 32,
            frameHeight: 32,
        })

        this.load.image('assets', 'Map/assets.png')
        this.load.image('environment', 'Map/environment.png')
        this.load.image('fence', 'Map/fence.png')
        this.load.image('interior', 'Map/interior.png')
        this.load.image('kodani', 'Map/kodani.png')
        this.load.image('terrain', 'Map/terrain.png')
        this.load.image('townpack', 'Map/townpack.png')

        this.load.tilemapTiledJSON('mapJSON', 'Map/map.json')

        this.load.image('temp_map', 'Images/background.png')
        this.load.image('test', 'Images/test.png')
        this.load.image('hand', 'Images/hand.png')
        this.load.image('thumb', 'Images/thumb.png')
        this.load.image('neck', 'Images/neck.png')
        this.load.image('knee', 'Images/knee.png')
        this.load.image('shoulder', 'Images/shoulder.png')
        this.load.image('heart', 'Images/heart.png')
        this.load.image('box', 'Images/dialogueBox.png')
        this.load.image('postcard', 'Images/postcard.png')
        this.load.image('creditBCKGRND', 'Images/credits.png')

        this.load.audio('collect', ['Sounds/collect.wav'])
        this.load.audio('start', ['Sounds/start.wav'])

    }

    create() {

        this.anims.create({
            key: 'walk-down',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
        })
        this.anims.create({
            key: 'walk-right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', { start: 4, end: 7 }),
        })
        this.anims.create({
            key: 'walk-up',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', { start: 8, end: 11 }),
        })
        this.anims.create({
            key: 'walk-left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', { start: 12, end: 15 }),
        })

        this.scene.start('titleScene')
    }
}