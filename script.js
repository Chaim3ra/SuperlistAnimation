let renderer;
let camera;
//let controls;


let scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000),
camera.position.set(0,2.5,3.75),
scene.rotation.set(0, -1.9, 0)
camera.lookAt( scene.position );

renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById("canvas")
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("white");
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);


const cubeGeo = new THREE.BoxGeometry( 1, 1, 1 );
const cubeMat = new THREE.MeshPhongMaterial({color: '#8AC'});
const cube = new THREE.Mesh( cubeGeo, cubeMat );
cube.position.set(0.5,0,0);
scene.add( cube );


var sphereGeometry = new THREE.SphereGeometry(.1, 20, 20);
        var matProps = {

            specular: '#a9fcff',
            color: '#00abb1',
            emissive: '#006063',
            shininess: 1
        }

        var sphereMaterial = new THREE.MeshPhongMaterial(matProps);
        var sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphereMesh.castShadow = true;
        sphereMesh.name = 'sphere';
        sphereMesh.position.set(-0.5,0,0);
        scene.add(sphereMesh);

const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 1, 0);
    light.target.position.set(0, 0, 0);
    scene.add(light);
    scene.add(light.target);


function render() {
renderer.render(scene, camera);
}

let animate = function() {
    requestAnimationFrame(animate);

    //controls.update();
    renderer.render(scene, camera);
};

animate();



function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
    }
    
    window.addEventListener("resize", onWindowResize);
    
    
    
    
    gsap.registerPlugin(ScrollTrigger);
        
    
        
    ScrollTrigger.defaults({
      immediateRender: false,
      ease: "power1.easeinOut",
    });
    
    
    let tl = gsap.timeline({
    
            scrollTrigger: {
              trigger: ".section-one",
              start: "top top", 
              endTrigger: ".section-five",
              end: "bottom bottom", 
              scrub: 2, 
           }
          
        });
    

          tl.to(scene.rotation, { y: 1.2 ,duration:1.5},">1")
          .to(sphereMesh.scale,{x:4.75,y:4.75,z:4.75,duration:1.5},"1")
          .to(cube.position,{x:cube.position.x-0.05},"3")
          .to(sphereMesh.position,{x:sphereMesh.position.x+0.05},"3")
          .to(cube.position,{x:cube.position.x+0.05},"3.5")
          .to(sphereMesh.position,{x:sphereMesh.position.x-0.05},"3.5")
          .to(scene.rotation,{y:-3,duration:4},"4")
          .to(cube.position,{x:0,duration:3},"4.6")
          .to(sphereMesh.position,{x:0,duration:3},"4.6")
          .to(cube.scale,{x:0,y:0,z:0,duration:3},"4.5")
          .to(sphereMesh.scale,{x:0,y:0,z:0,duration:3},"4.5");





          