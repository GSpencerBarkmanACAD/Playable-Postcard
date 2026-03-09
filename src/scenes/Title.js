class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    create() {
        this.map = this.add.image(centerX, centerY, 'temp_map').setOrigin(0.5)
        this.map.setScale(0.75)

        let title = this.add.text(centerX, centerY, 'Title Screen', {
            fontSize: '45px'
        }).setOrigin(0.5).setDepth(10)

        let instruction = this.add.text(centerX, centerY + 40, 'Press UP', {
            fontSize: '32px'
        }).setOrigin(0.5).setDepth(10)

        cursors = this.input.keyboard.createCursorKeys()

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.sound.play('start')
            this.scene.start('playScene')
        }
    }

}