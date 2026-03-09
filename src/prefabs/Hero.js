class Hero extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.body.setSize(this.width/2, this.height/2)
        this.body.setCollideWorldBounds(true)

        this.direction = direction
        this.heroVelocity = 100

        //this.readTime = 3000 
        
        scene.HeroFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            collect: new CollectState(),
        }, [scene, this])
    }
}

class IdleState extends State {
    enter(scene, hero) {
        hero.setVelocity(0)
        hero.anims.play(`walk-${hero.direction}`)
        hero.anims.stop()
    }

    execute(scene, hero) {
        
        const { left, right, up, down} = scene.keys
        
        if(left.isDown || right.isDown || up.isDown || down.isDown) {
            this.stateMachine.transition('move')
            return
        }
    }
}

class MoveState extends State {
    execute(scene, hero) {
        const { left, right, up, down } = scene.keys

        if(!(left.isDown || right.isDown || up.isDown || down.isDown)) {
            this.stateMachine.transition('idle')
            return
        }

        let moveDirection = new Phaser.Math.Vector2(0, 0)
        if(up.isDown) {
            moveDirection.y = -1
            hero.direction = 'up'
        } else if (down.isDown) {
            moveDirection.y = +1
            hero.direction = 'down'
        }

        if (left.isDown) {
            moveDirection.x = -1
            hero.direction = 'left'
        } else if (right.isDown) {
            moveDirection.x = +1
            hero.direction = 'right'
        }

        moveDirection.normalize()
        hero.setVelocity(hero.heroVelocity * moveDirection.x, hero.heroVelocity * moveDirection.y)
        hero.anims.play(`walk-${hero.direction}`, true)

    }
}

class CollectState extends State {
    execute(scene, hero) {
        hero.setVelocity(0)
        hero.anims.play(`walk-${hero.direction}`)
        hero.anims.stop()
    }
}