class Credits extends Phaser.Scene {
    constructor() {
        super('creditScene')
    }

    create() {
        
        this.add.image(0, 0, 'creditBCKGRND').setOrigin(0, 0)

        this.add.text(centerX, centerY - 120, 'Credits', {
            fontSize: '48px'
        }).setOrigin(0.5).setDepth(10)

        this.add.text(centerX, centerY+20, 'Mostly by G. Spencer Barkman\n\
With Tilesets from:\nKodani\nSchwarnhild\nGraduation Cat\n& Guilherme Vieira\n\
Music by Kevin MacLeod\nLogo Font from Manfred Klein', {
            fontSize: '24px'
        }).setOrigin(0.5).setDepth(10)

        this.add.text(centerX, centerY+156, 'Press Space to Continue', {
            fontSize: '16px'
        }).setOrigin(0.5).setDepth(1000).setScrollFactor(0)

        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            this.scene.start('titleScene')
        }
    }

}