class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {

        //create map
        const map = this.make.tilemap({ key: 'mapJSON' })
        const propset = map.addTilesetImage('props', 'assets')
        const environment = map.addTilesetImage('environment', 'environment')
        const fence = map.addTilesetImage('fence', 'fence')
        const interior = map.addTilesetImage('interior', 'interior')
        const kodani = map.addTilesetImage('kodani', 'kodani')
        const terrain = map.addTilesetImage('terrain', 'terrain')
        const townpack = map.addTilesetImage('town', 'townpack')

        const tilesets = [
            propset,
            environment,
            fence,
            interior,
            kodani,
            terrain,
            townpack
        ];

        const background = map.createLayer('Base', tilesets, 0,0)
        const layers = map.createLayer('Layers', tilesets, 0,0)
        const walls = map.createLayer('Walls', tilesets, 0,0)
        const props = map.createLayer('Props', tilesets, 0,0)

        //create tint overlay
        this.tint = this.add.rectangle(0, 0, game.config.width, game.config.height, 0x000000)
        this.tint.setOrigin(0, 0)
        this.tint.setAlpha(0)
        this.tint.setDepth(50)
        this.tint.setScrollFactor(0)

        this.readTime = 3000

        this.reading = false

        this.numTokens = 0

        //create hero
        const heroSpawn = map.findObject('Spawns', obj => obj.name === 'player_spawn')

        const handSpawn = map.findObject('Spawns', obj => obj.name === 'hand')
        const thumbSpawn = map.findObject('Spawns', obj => obj.name === 'thumb')
        const neckSpawn = map.findObject('Spawns', obj => obj.name === 'neck')
        const kneeSpawn = map.findObject('Spawns', obj => obj.name === 'knee')
        const shoulderSpawn = map.findObject('Spawns', obj => obj.name === 'shoulder')
        const heartSpawn = map.findObject('Spawns', obj => obj.name === 'heart')

        this.hero = new Hero(this, heroSpawn.x, heroSpawn.y, 'hero', 0, 'down')
        this.hero.setCollideWorldBounds(true)

        //goes behind trees
        const overhang = map.createLayer('Overhang', tilesets, 0,0)

        //dialog box       
        this.box = this.add.sprite(centerX, h - 48, 'box')
        this.box.setAlpha(0)
        this.box.setDepth(100)
        this.box.setScrollFactor(0)

        this.test_text = this.add.text(centerX, centerY + 96, 'Press Space to Remove Box', {
            fontSize: '16px'
        }).setOrigin(0.5).setDepth(1000).setScrollFactor(0).setAlpha(0)

        //create collectables
        this.tokens = this.physics.add.group()

        this.test = this.physics.add.sprite(handSpawn.x, handSpawn.y, 'hand')
        this.test.text = "Press Space after 3 sec\ndoes this work?"
        this.tokens.add(this.test)

        this.test2 = this.physics.add.sprite(thumbSpawn.x, thumbSpawn.y, 'thumb')
        this.test2.text = "This one says something else"
        this.tokens.add(this.test2)

        this.test3 = this.physics.add.sprite(neckSpawn.x, neckSpawn.y, 'neck')
        this.test3.text = "What could this one say?"
        this.tokens.add(this.test3)

        this.test4 = this.physics.add.sprite(kneeSpawn.x, kneeSpawn.y, 'knee')
        this.test4.text = "Wow another one!"
        this.tokens.add(this.test4)

        this.test5 = this.physics.add.sprite(shoulderSpawn.x, shoulderSpawn.y, 'shoulder')
        this.test5.text = "you're good at this"
        this.tokens.add(this.test5)

        this.test6 = this.physics.add.sprite(heartSpawn.x, heartSpawn.y, 'heart')
        this.test6.text = "nice."
        this.tokens.add(this.test6)


        //camera set up
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.hero, false, 0.5, 0.5)
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        //map collision

        const collision = map.getObjectLayer('Collision')
        this.collisionGroup = this.physics.add.staticGroup()

        collision.objects.forEach(obj => {
            const rect = this.add.rectangle(
                obj.x + obj.width / 2,
                obj.y + obj.height / 2,
                obj.width,
                obj.height,
                0xff0000,
                0.2
            );

            this.physics.add.existing(rect, true)
            this.collisionGroup.add(rect)
        });

        this.physics.add.collider(this.hero, this.collisionGroup)

        //keys
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