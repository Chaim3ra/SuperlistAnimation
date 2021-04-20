const loader = new THREE.GLTFLoader();
let desktop;
loader.load( 'https://raw.githubusercontent.com/Chaim3ra/SuperlistAnimation/main/models/desktop.gltf?token=AEM4KDPOD2WWNWTJAH55F53AQ6NT2', function ( gltf ) {
    desktop=gltf.scene
    desktop.scale.set(0.003,0.003,0.003);
    desktop.rotation.set(-4.85,0,0);
    desktop.position.set(0,0,0);
    //scene.add( desktop );

}, undefined, function ( error ) {

    console.error( error );

} );


let renderer;
let camera;
//let controls;

/* Scene Creating*/
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
renderer.setClearColor("grey");
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

/* Initial Cube setup and creation */
const cubeGeo = new THREE.BoxGeometry( 1, 1, 1 );
const cubeMat = new THREE.MeshPhongMaterial({color: '#8AC'});
const cube = new THREE.Mesh( cubeGeo, cubeMat );
cube.position.set(0.5,0,0);
scene.add( cube );

/* Initial Sphere setup and creation */
var sphereGeometry = new THREE.SphereGeometry(.1, 30, 30);
var matProps = {

    specular: '#a9fcff',
    color: '#00abb1',
    emissive: '#006063',
    shininess: 1
}
var sphereMaterial = new THREE.MeshPhongMaterial(matProps);
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;
sphere.name = 'sphere';
sphere.position.set(-0.5,0,0);
scene.add(sphere);

/* Initial Cylinder setup and creation */
const geometry = new THREE.CylinderGeometry( .225, .225, .05, 32 );
const material = new THREE.MeshPhongMaterial( {color: 0xffff00} );
const cylinder = new THREE.Mesh( geometry, material );
cylinder.position.set(0,0,0);
cylinder.rotation.set(0,0,0);
cylinder.scale.set(0,0,0);
scene.add( cylinder );

/* Light properties */
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.PointLight(color, intensity);
light.position.set(0, 3, -10);
//light.target.position.set(0, 0, 0);
scene.add(light);
//scene.add(light.target);

// ambient
// scene.add( new THREE.AmbientLight( 0xffffff, 0.2 ) ); // optional



//scene.add(helper);

//scene.add( new THREE.AxesHelper() );

pivot = new THREE.Group();
pivot.position.set( 0.0, 0.0, 0 );
scene.add( pivot );
pivot.add( cube );
pivot.add( sphere );

tokenPivot=new THREE.Group();
tokenPivot.position.set( 0.0, 0.0, 0 );
scene.add( tokenPivot );
tokenPivot.add( cylinder );


function render() {
renderer.render(scene, camera);
}

/* main */
let animate = function() {
    requestAnimationFrame(animate);
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
    

tl.to(pivot.rotation, { y:3 ,duration:1.5},">1")
.to(sphere.scale,{x:4.75,y:4.75,z:4.75,duration:1.5},"1")
.to(cube.position,{x:cube.position.x-0.05},"3")
.to(sphere.position,{x:sphere.position.x+0.05},"3")
.to(cube.position,{x:cube.position.x+0.05},"3.5")
.to(sphere.position,{x:sphere.position.x-0.05},"3.5")
.to(pivot.rotation,{y:0,z:pivot.rotation.z+0.001,duration:1.5},"4")
.to(pivot.rotation,{y:-3.5,duration:2},"7.5")
.to([cube.position,sphere.position],{x:0,duration:1.5},"7.5")
.to([cube.scale,sphere.scale],{x:0,y:0,z:0,duration:1.35},"7.6")
.to(cylinder.scale,{x:1,y:1,z:1,duration:1.25},"8.75")
.to(cylinder.rotation,{x:5,z:5.5,duration:1.25},"8.75")
.to(cylinder.position,{z:-1.3,y:-1.3,duration:1.25},"8.75")
.to(cylinder.position,{z:0,duration:1.25},"10")
.to(tokenPivot.rotation,{x:-6.2,duration:8},"8.75");

          





          