class Finale extends Phaser.Scene {
    constructor() {
        super('finalScene')
    }

    create() {

        const cam = this.cameras.main
        cam.zoomY = 0

        this.count = 1

        this.finished = false

        this.map = this.add.image(0, 0, 'postcard').setOrigin(0, 0)

        let end = this.add.text(centerX+120, centerY-128, 'POSTCARD', {
            fontSize: '40px',
            color: '#000000'
        }).setOrigin(0.5).setDepth(10)

        let address = this.add.text(centerX+120, centerY+30, "To: Rishan Baweja\n\nFrom: Spencer Barkman", {
            fontSize: '16px',
            color: '#000000'
        }).setOrigin(0.5)

        this.continue = this.add.text(centerX+120, centerY+156, 'Press Space to Continue', {
            fontSize: '16px',
            color: '#000000'
        }).setOrigin(0.5).setDepth(1000).setScrollFactor(0).setAlpha(0)

        this.instruction = this.add.text(centerX+120, centerY+138, 'Prev: Left < | Next: Right >', {
            fontSize: '12px',
            color: '#000000'
        }).setOrigin(0.5).setDepth(1000).setScrollFactor(0)

        this.message = this.add.text(
            28,
            45,
            '',
            {
                fontSize: '14px',
                color: '#000000',
            }
        ).setOrigin(0,0)

        this.part1 = "In all honesty, the\n\
shoulder was probably\n\
a blessing in disguise.\n\
As much as I love rugby,\n\
I am a student first,\n\
and CMPM 120, CSE 101,\n\
and ECON 113 was a\n\
rough load. And while\n\
I love my B-side team,\n\
ever since the neck,\n\
the pain of committing\n\
so hard to a rigorous\n\
sport, finally making\n\
A-side, and then\n\
getting injured… hurt\n\
more than the injury.\n\
Then I played through\n\
the knee injury,\n\
probably making it\n\
worse, but trying to\n\
prove myself nonetheless."        

        this.message.setText(this.part1)

        this.part2 = "The fractured thumb\n\
might be the ultimate\n\
double-edged sword.\n\
I lost my freshman\n\
season, probably the most\n\
important one, and as a\n\
result, I spent a lot more\n\
time in the dorms.That \n\
allowed me to make some \n\
such strong connections\n\
with my floormates…\n\
which resulted in me\n\
becoming addicted to\n\
marijuana. lol.\n\
I won't doddle on\n\
the heart too much,\n\
but in all truth,\n\
Rishan, I do not\n\
know how my brain\n\
works - I think I’m\n\
a demi-sexual." 


        this.part3 = "I haven’t had a successful\n\
I haven’t had a successful\n\
relationship here, and the\n\
one that lasted the\n\
longest (like a month and\n\
a half) only made that\n\
stance worse. Toxic as\n\
Ellie and I getting back\n\
together - over and over\n\
again - is, I can actually\n\
talk to her for hours.\n\
You can ask as many \n\
questions as you'd like\n\
come Saturday. I love you,\n\
brother. Hope you liked my\n\
little game."
        

        this.tweens.add({
            targets: cam,
            zoomY: 1,
            duration: 1000,
            ease: 'Cubic.easeOut'
        })

        this.keys = this.input.keyboard.createCursorKeys()

        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    }

    update() {
        if (this.finished && Phaser.Input.Keyboard.JustDown(this.space)) {
            this.scene.start('creditScene')
        }

        if (Phaser.Input.Keyboard.JustDown(this.keys.right)) {
            this.next()
        }

        if (Phaser.Input.Keyboard.JustDown(this.keys.left)) {
            this.prev()
        }
    }

    next() {
        this.count++
        if (this.count == 2) {
            this.message.setText(this.part2)
        }
        
        if (this.count == 3) {
            this.message.setText(this.part3)
            this.continue.setAlpha(1)
            this.finished = true
        }
    }

    prev() {
        this.count--
        if (this.count == 1) {
            this.message.setText(this.part1)
            this.finished = false
        }
        
        if (this.count == 2) {
            this.message.setText(this.part2)
            this.continue.setAlpha(0)
            this.finished = false
        }

        this.finished = false

    }

}