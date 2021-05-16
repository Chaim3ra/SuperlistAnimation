const loader = new THREE.GLTFLoader();
let desktop;
loader.load( 'models/recolored.glb', function ( gltf ) {
    desktop=gltf.scene
    desktop.scale.set(0.005,0.005,0.005);
    desktop.rotation.set(0,0,0);
    desktop.position.set(0,0,0);
    scene.add( desktop );
    mixer = new THREE.AnimationMixer( desktop );

    console.log(gltf.animations);
    var action = mixer.clipAction( gltf.animations[ 0 ] ); 
    // access first animation clip
    action.play();

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
renderer.setClearColor("white");
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
//scene.add( cylinder );

pivot = new THREE.Group();
pivot.position.set( 0.0, 0.0, 0 );
scene.add( pivot );
pivot.add( cube );
pivot.add( sphere );



tokenPivot=[];
tokenRotate=[];
tokenPivot[0],tokenRotate[0]=new THREE.Group();
tokenPivot[0].position.set( 0.0, 0.0, 0 );
scene.add( tokenPivot[0] );
tokenPivot[0].add( cylinder );

tokenArray = [];
tokenArray[0]=cylinder;
 for(var i = 1; i < 8; i++){ 
        tokenArray[i] = cylinder.clone();
            tokenArray[i].position.set(0,0,0);
            tokenArray[i].scale.set(0,0,0);
            scene.add(tokenArray[i]); 
            tokenPivot[i]=new THREE.Group();
            tokenPivot[i].position.set( 0.0, 0.0, 0 );
            scene.add( tokenPivot[i] );
            tokenPivot[i].add(tokenArray[i]);
}  

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
    scrub: 1, 
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
.to([tokenArray[0].scale,tokenArray[1].scale,tokenArray[2].scale,
    tokenArray[3].scale,tokenArray[4].scale,
    tokenArray[5].scale,tokenArray[6].scale,
    tokenArray[7].scale],{x:1,y:1,z:1,duration:1.4},"8.75")
//.to(tokenArray[0].rotation,{x:5,z:5.5,duration:1.4},"8.75")
.to(tokenArray[0].position,{z:-0.75,y:-1.1,duration:1.4},"8.75")
.to(tokenArray[1].position,{z:-0.75,y:-1.1,duration:1.4},"8.75")
.to(tokenArray[2].position,{z:-0.75,y:-1.1,duration:1.4},"8.75")
.to(tokenArray[3].position,{z:-0.75,y:-1.1,duration:1.4},"8.75")
.to(tokenArray[4].position,{z:-0.75,y:-1.1,duration:1.4},"8.75")
.to(tokenArray[5].position,{z:-0.75,y:-1.1,duration:1.4},"8.75")
.to(tokenArray[6].position,{z:-0.75,y:-1.1,duration:1.4},"8.75")
.to(tokenArray[7].position,{z:-0.75,y:-1.1,duration:1.4},"8.75")
.to(tokenPivot[0].rotation,{x:-6.6,duration:8},"8.75")
.to(tokenPivot[1].rotation,{x:-5.8,duration:8},"8.75")
.to(tokenPivot[2].rotation,{x:-5,duration:8},"8.75")
.to(tokenPivot[3].rotation,{x:-4.2,duration:8},"8.75")
.to(tokenPivot[4].rotation,{x:-3.4,duration:8},"8.75")
.to(tokenPivot[5].rotation,{x:-2.6,duration:8},"8.75")
.to(tokenPivot[6].rotation,{x:-1.8,duration:8},"8.75")
.to(tokenPivot[7].rotation,{x:-1,duration:8},"8.75")
.to(tokenPivot[0].rotation,{x:-6.6-3,duration:8},"16.75")
.to(tokenPivot[1].rotation,{x:-5.8-3,duration:8},"16.75")
.to(tokenPivot[2].rotation,{x:-5-3,duration:8},"16.75")
.to(tokenPivot[3].rotation,{x:-4.2-3,duration:8},"16.75")
.to(tokenPivot[4].rotation,{x:-3.4-3,duration:8},"16.75")
.to(tokenPivot[5].rotation,{x:-2.6-3,duration:8},"16.75")
.to(tokenPivot[6].rotation,{x:-1.8-3,duration:8},"16.75")
.to(tokenPivot[7].rotation,{x:-1-3,duration:8},"16.75")
.to([tokenArray[0].position,tokenArray[1].position,tokenArray[2].position,
    tokenArray[3].position,tokenArray[4].position,
    tokenArray[5].position,tokenArray[6].position,
    tokenArray[7].position],{x:0,y:0,z:0,duration:1.4},"23")
.to([tokenArray[0].scale,tokenArray[1].scale,tokenArray[2].scale,
    tokenArray[3].scale,tokenArray[4].scale,
    tokenArray[5].scale,tokenArray[6].scale,
    tokenArray[7].scale],{x:0,y:0,z:0,duration:2},"23")

//.to(tokenArray[0].position,{z:0,duration:1.4},"10.3");


          





          
