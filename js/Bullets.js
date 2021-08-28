AFRAME.registerComponent("bullets", {
    init: function() {
        this.shootBullet();
        console.log("here")
    },
    shootBullet: function() {
        window.addEventListener("keydown",
            (event)=>{
                if(event.key == "a") {
                    var bullet = document.createElement("a-entity")
                    bullet.setAttribute("geometry", {
                        primitive: "sphere",
                        radius: 0.1
                    })
                    bullet.setAttribute("material","color","black")
                    
                    var camera = document.querySelector("#camera")
                    var pos = camera.getAttribute("position")
                    bullet.setAttribute("position", {
                        x:pos.x,
                        y:pos.y,
                        z:pos.z
                    })
                    
                    var camera3d = document.querySelector("#camera").object3D
                    var direction = new THREE.Vector3();
                    camera3d.getWorldDirection(direction)

                    
                    bullet.setAttribute("velocity", direction.multiplyScalar(-10));

                    var scene = document.querySelector("#scene")

                    bullet.setAttribute("dynamic-body", {
                        shape: "sphere",
                        mass: "0"
                    })

                    bullet.addEventListener("collide", this.removeBullet)
                    
                    scene.appendChild(bullet)
                }
                
            }
        )
    },

    removeBullet: function(event) {
        var element = event.detail.target.el;
        var elementHit = event.detail.body.el;

        if(elementHit.id.includes("box")) {
            elementHit.setAttribute("material", {
                opacity: 1,
                transparent: true
            })

            var impulse = new CANNON.Vec3(-2, 2, 1)
            var worldPoint = new CANNON.Vec3().copy(
                elementHit.getAttribute("position")
            )
            elementHit.body.applyImpulse(impulse, worldPoint)

            element.removeEventListener("collide", this.shoot)
            var scene = document.querySelector("#scene");
            scene.removeChild(element)
        }
    }
})