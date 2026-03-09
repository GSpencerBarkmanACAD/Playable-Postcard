class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        this.map = this.add.image(centerX, centerY, 'temp_map').setOrigin(0.5)
        this.map.setScale(0.75)

        this.tint = this.add.rectangle(0, 0, game.config.width, game.config.height, 0x000000)
        this.tint.setOrigin(0, 0)
        this.tint.setAlpha(0)
        this.tint.setDepth(50)
        this.tint.setScrollFactor(0)

        this.readTime = 3000

        this.reading = false

        this.hero = new Hero(this, 200, 150, 'hero', 0, 'down')
        
        this.box = this.add.sprite(centerX, h - 48, 'box')
        this.box.setAlpha(0)
        this.box.setDepth(100)
        this.box.setScrollFactor(0)

        this.test_text = this.add.text(centerX, centerY + 96, 'Press Space to Remove Box', {
            fontSize: '16px'
        }).setOrigin(0.5).setDepth(1000).setScrollFactor(0).setAlpha(0)

        this.test = this.physics.add.sprite(250, 200, 'test')

        this.cameras.main.setBounds(0, 0, this.map.displayWidth, this.map.displayHeight)
        this.cameras.main.startFollow(this.hero, false, 0.5, 0.5)
        this.physics.world.setBounds(0, 0, this.map.displayWidth, this.map.displayHeight)

        this.keys = this.input.keyboard.createCursorKeys()
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.physics.add.overlap(this.hero, this.test, () => {
            this.sound.play('collect')
            this.test.destroy()
            this.tint.setAlpha(0.75)
            this.HeroFSM.transition('collect')
            
            this.tweens.add({
                targets: this.box,
                alpha: { from: 0, to: 1},
                duration: 500
            })

            this.test_text.setAlpha(1)

            this.time.delayedCall(this.readTime, () => {
                this.reading = true  
            })
            
        })

    }

    update() {

        this.HeroFSM.step()

        if (this.reading && Phaser.Input.Keyboard.JustDown(this.space)) {
            this.tint.setAlpha(0)

            this.tweens.add({
                targets: this.box,
                alpha: { from: 1, to: 0},
                duration: 500
            })

            this.test_text.setAlpha(0)
            
            
            this.HeroFSM.transition('idle')
        }

    }
}