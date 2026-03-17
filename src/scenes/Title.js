class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    create() {

        this.textures.get('view').setFilter(Phaser.Textures.FilterMode.LINEAR)
        this.map = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - 40, 'view').setOrigin(0.5).setScale(0.3)

        let title = this.add.text(centerX, centerY - 100, 'Physical Tokens', {
            fontFamily: 'Aquiline2',
            fontSize: '56px'
        }).setOrigin(0.5).setDepth(10)

        let space = this.add.text(centerX, centerY, '- Press Space -', {
            fontSize: '32px'
        }).setOrigin(0.5).setDepth(10)

        let instruct = this.add.text(centerX, centerY+24, 'Collect Injuries for a Surprise', {
            fontSize: '16px',
            color: '#000000'
        }).setOrigin(0.5).setDepth(10)

        let copy = this.add.text(centerX, centerY+180, 'Copyright G. Spencer Barkman, 2026', {
            fontSize: '16px'
        }).setOrigin(0.5).setDepth(1000).setScrollFactor(0)

        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            this.sound.play('start')
            this.scene.start('playScene')
        }
    }

}