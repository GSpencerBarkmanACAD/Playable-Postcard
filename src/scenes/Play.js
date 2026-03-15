class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        this.map = this.add.image(0, 0, 'temp_map').setOrigin(0, 0)
        this.map.setScale(0.75)

        this.tint = this.add.rectangle(0, 0, game.config.width, game.config.height, 0x000000)
        this.tint.setOrigin(0, 0)
        this.tint.setAlpha(0)
        this.tint.setDepth(50)
        this.tint.setScrollFactor(0)

        this.readTime = 3000

        this.reading = false

        this.numTokens = 0

        this.hero = new Hero(this, 200, 150, 'hero', 0, 'down')
        this.hero.setCollideWorldBounds(true)
        
        this.box = this.add.sprite(centerX, h - 48, 'box')
        this.box.setAlpha(0)
        this.box.setDepth(100)
        this.box.setScrollFactor(0)

        this.test_text = this.add.text(centerX, centerY + 96, 'Press Space to Remove Box', {
            fontSize: '16px'
        }).setOrigin(0.5).setDepth(1000).setScrollFactor(0).setAlpha(0)

        this.tokens = this.physics.add.group()

        this.test = this.physics.add.sprite(250, 200, 'hand')
        this.test.text = "Press Space after 3 sec"
        this.tokens.add(this.test)

        this.test2 = this.physics.add.sprite(100, 100, 'thumb')
        this.test2.text = "This one says something else"
        this.tokens.add(this.test2)

        this.test3 = this.physics.add.sprite(300, 300, 'neck')
        this.test3.text = "What could this one say?"
        this.tokens.add(this.test3)

        this.test4 = this.physics.add.sprite(50, 200, 'knee')
        this.test4.text = "Wow another one!"
        this.tokens.add(this.test4)

        this.test5 = this.physics.add.sprite(350, 200, 'shoulder')
        this.test5.text = "you're good at this"
        this.tokens.add(this.test5)

        this.test6 = this.physics.add.sprite(300, 50, 'heart')
        this.test6.text = "nice."
        this.tokens.add(this.test6)

        this.cameras.main.setBounds(0, 0, this.map.displayWidth, this.map.displayHeight)
        this.cameras.main.startFollow(this.hero, false, 0.5, 0.5)
        this.physics.world.setBounds(0, 0, this.map.displayWidth, this.map.displayHeight)

        this.keys = this.input.keyboard.createCursorKeys()
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.physics.add.overlap(this.hero, this.tokens, (hero, token) => {
            this.collect(token)
        })

    }

    update() {

        this.HeroFSM.step()

        if (this.reading && Phaser.Input.Keyboard.JustDown(this.space)) {
            this.tint.setAlpha(0)

            this.reading = false

            this.tweens.add({
                targets: this.box,
                alpha: { from: 1, to: 0},
                duration: 500
            })

            this.test_text.setAlpha(0)

            if (this.numTokens == 6) {
                this.scene.start('finalScene')
            }
            
            this.HeroFSM.transition('idle')
        }

    }

    collect(token) {

        this.reading = false

        this.sound.play('collect')
        token.destroy()
        this.tint.setAlpha(0.75)
        this.HeroFSM.transition('collect')
        
        this.tweens.add({
            targets: this.box,
            alpha: { from: 0, to: 1},
            duration: 500
        })

        this.test_text.setText(token.text)

        this.test_text.setAlpha(1)

        this.numTokens++

        this.time.delayedCall(this.readTime, () => {
            this.reading = true  
        })
    }
}