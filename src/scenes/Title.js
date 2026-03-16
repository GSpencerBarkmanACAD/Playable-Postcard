class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    create() {
        this.map = this.add.image(0, 0, 'temp_map').setOrigin(0, 0)

        let title = this.add.text(centerX, centerY, 'Title Screen', {
            fontSize: '45px'
        }).setOrigin(0.5).setDepth(10)

        let instruction = this.add.text(centerX, centerY + 40, 'Press UP', {
            fontSize: '32px'
        }).setOrigin(0.5).setDepth(10)

        let spaceText = this.add.text(centerX, centerY+156, 'Press Space to Continue', {
            fontSize: '16px'
        }).setOrigin(0.5).setDepth(1000).setScrollFactor(0)

        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            this.sound.play('start')
            this.scene.start('finalScene')
        }
    }

}