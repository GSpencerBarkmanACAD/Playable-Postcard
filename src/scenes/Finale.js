class Finale extends Phaser.Scene {
    constructor() {
        super('finalScene')
    }

    create() {

        const cam = this.cameras.main
        cam.zoomY = 0

        this.map = this.add.image(0, 0, 'postcard').setOrigin(0, 0)

        let end = this.add.text(centerX+120, centerY-128, 'POSTCARD', {
            fontSize: '40px'
        }).setOrigin(0.5).setDepth(10)

        this.tweens.add({
            targets: cam,
            zoomY: 1,
            duration: 700,
            ease: 'Cubic.easeOut'
        })

        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            this.scene.start('creditScene')
        }
    }

}