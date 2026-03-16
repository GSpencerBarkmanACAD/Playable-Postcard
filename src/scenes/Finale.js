class Finale extends Phaser.Scene {
    constructor() {
        super('finalScene')
    }

    create() {
        this.map = this.add.image(0, 0, 'creditBCKGRND').setOrigin(0, 0)

        let end = this.add.text(centerX, centerY-128, 'The End', {
            fontSize: '45px'
        }).setOrigin(0.5).setDepth(10)

        let spaceText = this.add.text(centerX, centerY+156, 'Press Space to Continue', {
            fontSize: '16px'
        }).setOrigin(0.5).setDepth(1000).setScrollFactor(0)

        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            this.scene.start('creditScene')
        }
    }

}