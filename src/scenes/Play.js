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

        this.readTime = 1500

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
        this.box = this.add.sprite(centerX, centerY, 'box')
        this.box.setScale(1.1)
        this.box.setAlpha(0)
        this.box.setDepth(100)
        this.box.setScrollFactor(0)

        this.test_text = this.add.text(centerX, centerY, '', {
            fontSize: '16px'
        }).setOrigin(0.5).setDepth(1000).setScrollFactor(0).setAlpha(0)

        this.dateText = this.add.text(centerX, centerY+64, '', {
            fontSize: '32px'
        }).setOrigin(0.5).setDepth(1000).setScrollFactor(0).setAlpha(0)

        this.spaceText = this.add.text(centerX, centerY+144, 'Press Space to Continue', {
            fontSize: '16px'
        }).setOrigin(0.5).setDepth(1000).setScrollFactor(0).setAlpha(0)

        //create collectables
        this.tokens = this.physics.add.group()

        //for displaying with text
        this.tokenDisplay = this.add.sprite(centerX, centerY, 'hand')
        this.tokenDisplay.setScale(2)
        this.tokenDisplay.setAlpha(0)
        this.tokenDisplay.setDepth(101)
        this.tokenDisplay.setScrollFactor(0)

        this.hand = this.physics.add.sprite(handSpawn.x, handSpawn.y, 'hand')
        this.hand.date = "12/3/2023"
        this.hand.text = "Playing against Silicon Valley RFC, \nI fractured my hand. While fairly minor\n(I could play through it within a month), \nthis was only 3 months into my rugby \ncareer. I suppose this was a teaser of \nwhat was to come… except I’ve always \nbeen injury prone, haven’t I?"
        this.tokens.add(this.hand)

        this.thumb = this.physics.add.sprite(thumbSpawn.x, thumbSpawn.y, 'thumb')
        this.thumb.date = "1/23/2024"
        this.thumb.text = "Barely a month after the hand, a\nblistering CRACK was heard while\npracticing lineouts. At the time,\nI couldn’t feel my thumb, but it\nlooked anything but normal. Split\nfracture. 2 months minimum recovery.\nAnd there went my freshman season.\nI could play with a hand brace\nand tape, but without an opposable\nthumb, that wasn’t gonna work."
        this.tokens.add(this.thumb)

        this.neck = this.physics.add.sprite(neckSpawn.x, neckSpawn.y, 'neck')
        this.neck.date = "11/9/2024"
        this.neck.text = "While playing Saint Mary’s, arguably \nthe best college team in the country,\nI made it onto the A-side 23. My first\nand only A-side game thus far. It was\nalso my first game playing tighthead \nprop, a position that normally requires\na lot more weight than I had, and is the \nanchor of the scrum. After playing the \nwhole second 40-minute half, against \nthe #1 team in the conference, my neck\nLITERALLY gave out: A pinched nerve,\nsome bruising, and no longer being able \nto look up manually. Luckily, not broken,\nbut another 3 months of recovery."
        this.tokens.add(this.neck)

        this.knee = this.physics.add.sprite(kneeSpawn.x, kneeSpawn.y, 'knee')
        this.knee.date = "1/20/2025"
        this.knee.text = "After a whole month of practicing\nat Cabrillo Community College, \nwith metal-studded cleats, my knee\nthe wear and tear on my knee, both\nMCL and ACL, was becoming apparent.\nI had to sit out of the Sacramento \nState game, and my minutes in the \nremaining 5 games of the season were\nhalved, and on the B-side."
        this.tokens.add(this.knee)

        this.shoulder = this.physics.add.sprite(shoulderSpawn.x, shoulderSpawn.y, 'shoulder')
        this.shoulder.date = "2/1/2026"
        this.shoulder.text = "Then, after almost a whole year\nwithout real physical injury, and \nafter performing really well in the\nfirst 3 games of the season, while\nat Sac State, right before the half\nway mark, I made a tackle that \nresulted in a shoulder subluxation\n(instant dis/re-locatation) and a \nslight tear in my labrum. Huzzah!\nThere went the rest of my junior \nseason; 4 season matches, and 2 in\nCanada over Spring Break."
        this.tokens.add(this.shoulder)

        this.heart = this.physics.add.sprite(heartSpawn.x, heartSpawn.y, 'heart')
        this.heart.date = "PAST/PRESENT/FUTURE"
        this.heart.text = "How could I not mention my heart?\nI suppose it’s not a rugby injury, \nbut I think my heart has ultimately\nsustained the most damage, depsite\noften healing quickly. Could be for \n9/25/23, 8/27/24, or 1/21/25, or \nnumerous other dates. Those are\njust the Ellie ones. Not to mention\nthe general heartbreak of being so\nfar from all of my Sonoma friends \nI’ve learned a lot about love and \nrelationships, especially what I \nvalue, need, and expect out of\nall of them."
        this.tokens.add(this.heart)


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
            this.spaceText.setAlpha(0)

            if (this.numTokens == 1) {
                this.scene.start('finalScene')
            }
            
            this.HeroFSM.transition('idle')
        }

    }

    collect(token) {

        this.reading = false
        this.sound.play('collect')

        const icon = token.texture.key
        const date = token.date
        const text = token.text

        token.destroy()

        this.tint.setAlpha(0.75)
        this.HeroFSM.transition('collect')

        this.tweens.add({
            targets: this.box,
            alpha: { from: 0, to: 1 },
            duration: 500
        })

        this.tokenDisplay.setTexture(icon)
        this.tokenDisplay.setAlpha(1)

        this.dateText.setText(date)
        this.dateText.setAlpha(1)

        this.numTokens++

        this.time.delayedCall(2500, () => {
            this.tokenDisplay.setAlpha(0)
            this.dateText.setAlpha(0)

            this.spaceText.setAlpha(1)

            this.test_text.setText(text)
            this.test_text.setAlpha(1)

            this.time.delayedCall(this.readTime, () => {
                this.reading = true
            })
        })
    }
}