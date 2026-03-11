class Finale extends Phaser.Scene {
    constructor() {
        super('finalScene')
    }

    create() {
        this.map = this.add.image(0, 0, 'temp_map').setOrigin(0, 0)
        this.map.setScale(0.75)

        let end = this.add.text(centerX, centerY, 'The End', {
            fontSize: '45px'
        }).setOrigin(0.5).setDepth(10)
    }

}