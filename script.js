let renderer;
let camera;
let mixer;
let action;



var canvas_div=document.getElementById("canvas_column");

/* Scene Creation */
let scene = new THREE.Scene();
var clock = new THREE.Clock();
camera = new THREE.PerspectiveCamera(45,canvas_div.clientWidth / (window.innerHeight),0.1,1000),
camera.position.set(0,2.5,3.75),
scene.rotation.set(0, -1.9, 0)
camera.lookAt( scene.position );


/* Rendering parameters */
renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById("canvas"),
    powerPreference: "high-performance",
    alpha:true
});

renderer.setSize(canvas_div.clientWidth, window.innerHeight);
renderer.setClearColor( 0x000000, 0);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById("canvas_column").appendChild(renderer.domElement);


const loader = new THREE.GLTFLoader();
const cube=new THREE.Object3D();

/* Load cube model */
loader.load( 'models/cube2.glb',function getFragments( gltf ) {
    cube.add(gltf.scene)
    cube.scale.set(0.32,0.32,0.32);
    cube.rotation.set(0,0,0);
    cube.position.set(0.425,-0.34,0.2);
    cube.castShadow = true;
    cube.receiveShadow = true;
    mixer = new THREE.AnimationMixer(cube);
    action=mixer.clipAction(gltf.animations[0]);
    action.setLoop( THREE.LoopOnce )
    action.clampWhenFinished = true
    action.play();

}, undefined, function ( error ) {
    console.error( error );
} );


/* Load desktop model */
const desktop=new THREE.Object3D();
loader.load("models/desktop.glb", function(gltf){
    desktop.add(gltf.scene)
    desktop.position.set(0.175,0,0)
    desktop.scale.set(0,0,0)
    desktop.rotation.set(0,-3,0)
    desktop.castShadow = true; //default is false
    desktop.receiveShadow = true
    }, undefined, function ( error ) {
        console.error( error );
} );


/* Load token models */ 
var tokensList=[]

for(let i=0;i<8;i++){
    tokensList[i]=new THREE.Object3D();
    loader.load("models/dark_token.glb", function(gltf){
        tokensList[i].add(gltf.scene);
    }, undefined, function ( error ) {
        console.error( error );
    } );
}
 
/* Pivot for token rotation */
pivot = new THREE.Group();
pivot.position.set( 0.0, 0.0, 0 );
scene.add( pivot );
pivot.add( cube );
pivot.add( desktop );


var tokenPivot=[];
var rotationPivot=[];

tokenPivot[0]=new THREE.Group();
scene.add( tokenPivot[0] );

/* Assigning tokens to new THREE object and rotation pivot */
var tokenArray = [];
 for(let i = 0; i < 8; i++){ 
        tokenArray[i]=tokensList[i];
        tokenArray[i].rotation.set(-5,0,4.6)
        tokenArray[i].position.set(0,0,0);
        tokenArray[i].scale.set(0,0,0);
        tokenArray[i].castShadow = true;
        tokenArray[i].receiveShadow = true
        tokenPivot[i]=new THREE.Group();
        tokenPivot[i].position.set( 0.0, 0.0, 0.0 );
        tokenPivot[i].rotation.set( 0.0, 0.0, 0.0 );
        scene.add( tokenPivot[i] );
        tokenPivot[i].add(tokenArray[i]);
}  

/* Light properties */
const color = 0xFFFFFF;
const intensity = 1;
const dirlight = new THREE.DirectionalLight(color, intensity);
dirlight.position.set(0.7, 1.1, -0.4);
scene.add(dirlight);


spotlight = new THREE.SpotLight(color,0.75);
spotlight.position.set(-4.8,-4,-6.8);
spotlight.castShadow = true;
scene.add( spotlight );



 function makeXYZGUI(gui, vector3, name, onChangeFn) {
    const folder = gui.addFolder(name);
    folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
    folder.add(vector3, 'y', -10, 10).onChange(onChangeFn);
    folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
    folder.open();
  }

    function updateLight() {
      camera.updateProjectionMatrix();
      //helper.update();
    }
    updateLight();


//const gui = new dat.GUI();
//gui.add(spotlight, 'intensity', 0, 2).onChange(updateLight);
//makeXYZGUI(gui, spotlight.position, 'position', updateLight);
//makeXYZGUI(gui, spotlight.rotation, 'rotation', updateLight);



function onWindowResize() {
    camera.aspect = canvas_div.clientWidth*0.90 / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas_div.clientWidth*0.90, container.clientHeight);
}
    
   
window.addEventListener("resize", onWindowResize);
 
function seekCubeAnimation(animMixer, timeInSeconds){
    animMixer.time=0;
    animMixer.setTime(timeInSeconds)
  }    

function render() {
renderer.render(scene, camera);
renderer.shadowMapEnabled = true;
}

/* main */
let animate = function() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera); 
};

animate();

       
gsap.registerPlugin(ScrollTrigger);
       
var mixerScroll={amount:0} ;
           
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
    scrub: 1}          
});
    

 /* Animation timeline  */ 
tl.to(mixerScroll,{amount:5,onUpdate: function () {
        seekCubeAnimation(mixer, mixerScroll.amount);
      },duration:5},"0")
.to(pivot.rotation, { y:3 ,duration:1.5},"5")
.to(desktop.rotation,{x:-1,y:-1.2,z:-1.1,duration:1.5},"5")
.to(desktop.position,{x:-1.35,y:0.3,z:0.155,duration:1.5},"5")
.to(desktop.scale,{x:0.1125,y:0.1125,z:0.1125,duration:1.5},"5")
.to(cube.position,{x:cube.position.x+0.05},"7")
.to(desktop.position,{x:-1.1},"7")
.to(cube.position,{x:0.425},"7.5")
.to(desktop.position,{x:-1.35},"7.5")
.to(desktop.position,{y:-0.2,duration:1.5},"8")
.to(desktop.rotation,{x:-0.8,z:-0.9,duration:1.5},"8")
.to(pivot.rotation,{y:0,z:pivot.rotation.z+0.001,duration:1.5},"8")
.to(pivot.rotation,{y:-3.5,duration:2},"11.5")
.to([cube.position,desktop.position],{x:0,y:0,z:0,duration:1.5},"11.5")
.to([cube.scale,desktop.scale],{x:0,y:0,z:0,duration:1.35},"11.6")
.to([tokenArray[0].scale,tokenArray[1].scale,tokenArray[2].scale,
    tokenArray[3].scale,tokenArray[4].scale,
    tokenArray[5].scale,tokenArray[6].scale,
    tokenArray[7].scale],{x:0.62,y:0.62,z:0.62,duration:1.4},"12.75")
.to([tokenArray[0].position,tokenArray[1].position,tokenArray[2].position,
    tokenArray[3].position,tokenArray[4].position,
    tokenArray[5].position,tokenArray[6].position,
    tokenArray[7].position],{z:-0.75,y:-1.1,duration:1.4},"12.75")
.to(tokenPivot[0].rotation,{x:-6.5,duration:8},"12.75")
.to(tokenPivot[1].rotation,{x:-5.7,duration:8},"12.75")
.to(tokenPivot[2].rotation,{x:-4.9,duration:8},"12.75")
.to(tokenPivot[3].rotation,{x:-4.2,duration:8},"12.75")
.to(tokenPivot[4].rotation,{x:-3.3,duration:8},"12.75")
.to(tokenPivot[5].rotation,{x:-2.5,duration:8},"12.75")
.to(tokenPivot[6].rotation,{x:-1.7,duration:8},"12.75")
.to(tokenPivot[7].rotation,{x:-1,duration:8},"12.75")
.to(spotlight.position,{x:10,z:5,duration:2},"14.25")
.to(spotlight,{intensity:0.75,duration:2},"13.25")
.to(tokenPivot[0].rotation,{x:-6.6-3,duration:8},"20.75")
.to(tokenPivot[1].rotation,{x:-5.8-3,duration:8},"20.75")
.to(tokenPivot[2].rotation,{x:-5-3,duration:8},"20.75")
.to(tokenPivot[3].rotation,{x:-4.2-3,duration:8},"20.75")
.to(tokenPivot[4].rotation,{x:-3.4-3,duration:8},"20.75")
.to(tokenPivot[5].rotation,{x:-2.6-3,duration:8},"20.75")
.to(tokenPivot[6].rotation,{x:-1.8-3,duration:8},"20.75")
.to(tokenPivot[7].rotation,{x:-1-3,duration:8},"20.75")
.to([tokenArray[0].position,tokenArray[1].position,tokenArray[2].position,
    tokenArray[3].position,tokenArray[4].position,
    tokenArray[5].position,tokenArray[6].position,
    tokenArray[7].position],{x:0,y:0,z:0,duration:0.6},"27")
.to([tokenArray[0].scale,tokenArray[1].scale,tokenArray[2].scale,
    tokenArray[3].scale,tokenArray[4].scale,
    tokenArray[5].scale,tokenArray[6].scale,
    tokenArray[7].scale],{x:0,y:0,z:0,duration:1},"27")
.to(spotlight.position,{x:0,z:5,duration:1},"27.5")


/* media queries */
if(window.matchMedia("(max-width: 991.98px)").matches){
     document.getElementById("canvas").style.top="13vh"; // push canvas down
}
if(window.matchMedia("(max-width: 575.98px)").matches){
    camera.fov = 55; // zoom out for small screens
    camera.updateProjectionMatrix();
    document.getElementById("canvas").style.top="15vh";
}




/* scroll to top on page refresh */
history.scrollRestoration = "manual"
          
$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});


          
