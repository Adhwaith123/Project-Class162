AFRAME.registerComponent("balls", {
  init: function () {
    this.throwball();
  },
  throwball: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "t") {
        var ball = document.createElement("a-entity");

        ball.setAttribute("geometry", {
          primitive: "sphere",
          radius: 1,
        });


        ball.setAttribute("material", "color", "black");
 
        var cam = document.querySelector("#camera");

        pos = cam.getAttribute("position");

        ball.setAttribute("position", {
          x: pos.x,
          y: pos.y,
          z: pos.z,
        });

        var camera = document.querySelector("#camera").object3D;
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
        ball.setAttribute("velocity", direction.multiplyScalar(-10));
        ball.setAttribute("dynamic-body",{
          shape:"sphere",
          mass:"0"
        })

        var scene = document.querySelector("#scene");
        ball.addEventListener("collide",this.removeball)
        var impulse=new CANNON.Vec3(-2,2,1)
        var worldPoint=new CANNON.Vec3().copy(elementhit.getAttribute(position))
        elementhit.body.applyImpulse(impulse,worldPoint)
        

        scene.appendChild(ball);
      }
    });
  },
  removeball:function(e){
    console.log(e.detail.target.el);
    var element=e.detail.target.el
    var elementhit=e.detail.body.el
    if(elementhit.id.includes("box")){
      elementhit.setAttribute("material",{
        opacity:0.6,transparent:true
      })
      element.removeEventListener("collide",this.throw)
      var scene=document.querySelector("#scene")
      scene.removeChild(element)
    }
  }
});


