let renderer;
let camera;
let mixer;
let action;
//let controls;

/* Scene Creation */
let scene = new THREE.Scene();
var clock = new THREE.Clock();
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


var planeGeometry = new THREE.PlaneGeometry( 200, 200, 32 );
  var planeMaterial = new THREE.MeshPhongMaterial({
    color: "white", side: THREE.DoubleSide})
  var plane = new THREE.Mesh( planeGeometry, planeMaterial );
  plane.position.set(0,-1.2,0)
  plane.receiveShadow = true;
  plane.rotation.x = -Math.PI / 2;
  //scene.add( plane );

var global=this;

const cube_fragments=[];
//cube_fragments=[];
const loader = new THREE.GLTFLoader();
let soma_cube;
const cube=new THREE.Object3D();
loader.load( 'models/soma-cube.glb',function ( gltf ) {
    soma_cube=gltf.scene
    cube.add(gltf.scene)
    //scene.add(cube)
    cube.scale.set(0.32,0.32,0.32);
    cube.rotation.set(0,0,0);
    cube.position.set(0.425,-0.34,0.2);
    cube.castShadow = true; //default is false
    cube.receiveShadow = true
    mixer = new THREE.AnimationMixer(cube);
    action=mixer.clipAction(gltf.animations[0]);
    action.setLoop( THREE.LoopOnce )
    action.clampWhenFinished = true
    //console.log(cube_fragments)
    //getFragments(gltf.scene);
    for(let i=0;i<7;i++){
        cube_fragments[i]=new THREE.Object3D();
        cube_fragments[i]=cube.getObjectById(39+i,true)
        cube_fragments[i].position.set(0,0,0);

       // cube_fragments[i].scale.set(0.32,0.32,0.32);
        //scene.add(cube_fragments[i])
    }
    console.log(global.cube_fragments)
    //scene.add(cube_fragments)
    action.play();
   

}, undefined, function ( error ) {
 
    console.error( error );
 
} );




const desktop=new THREE.Object3D();
loader.load("models/desktop.glb", function(gltf){
    desktop.add(gltf.scene)
    //scene.add(desktop)
    desktop.position.set(0.175,0,0)
    desktop.scale.set(0,0,0)
    desktop.rotation.set(0,-3,0)
    cube.castShadow = true; //default is false
    cube.receiveShadow = true
    }, undefined, function ( error ) {
     
        console.error( error );
     
} );


/*console.log(soma_cube)
for(let i=0;i<7;i++){
    cube_fragments[i]=cube.getObjectByName("pCube2",true)
    //cube_fragments[i].position.set(0,0,0);
    console.log(cube.getObjectById(17,true))

    cube_fragments[i].scale.set(0.32,0.32,0.32);
    scene.add(cube_fragments[i])
}*/

console.log(global.cube_fragments)
 
var tokensList=[]

for(let i=0;i<8;i++){
    tokensList[i]=new THREE.Object3D();
     //var token=new THREE.Object3D();
    loader.load("models/token.glb", function(gltf){
        tokensList[i].add(gltf.scene);

    }, undefined, function ( error ) {
     
        console.error( error );
     
    } );
}
 


pivot = new THREE.Group();
pivot.position.set( 0.0, 0.0, 0 );
scene.add( pivot );
pivot.add( cube );
pivot.add( desktop );


var tokenPivot=[];
var rotationPivot=[];

tokenPivot[0]=new THREE.Group();
//token.position.set( 0.0, 0.0, 0 );
scene.add( tokenPivot[0] );
//tokenPivot[0].add(token);

var tokenArray = [];
 for(let i = 0; i < 8; i++){ 
        tokenArray[i]=tokensList[i];
        tokenArray[i].rotation.set(-5,0,4.6)
        tokenArray[i].position.set(0,0,0);
        tokenArray[i].scale.set(0,0,0);
        tokenArray[i].castShadow = true; //default is false
        tokenArray[i].receiveShadow = true
        scene.add(tokenArray[i]); 
        tokenPivot[i]=new THREE.Group();
        tokenPivot[i].position.set( 0.0, 0.0, 0.0 );
        tokenPivot[i].rotation.set( 0.0, 0.0, 0.0 );
        scene.add( tokenPivot[i] );
        tokenPivot[i].add(tokenArray[i]);
        //rotationPivot[i].add(tokenArray[i]);
}  

/* Light properties */
const color = 0xFFFFFF;
const intensity = 1;
const light2 = new THREE.DirectionalLight(color, intensity);
light2.position.set(0.7, 1.1, -0.4);
light2.shadowDarkness = 0.5;
scene.add(light2);


light = new THREE.SpotLight(0xFFFFFF,1);
light.position.set(-4.8,-4,-6.8);
light.castShadow = true;
scene.add( light );



 function makeXYZGUI(gui, vector3, name, onChangeFn) {
    const folder = gui.addFolder(name);
    folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
    folder.add(vector3, 'y', -10, 10).onChange(onChangeFn);
    folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
    folder.open();
  }

    function updateLight() {
      light.target.updateMatrixWorld();
      //helper.update();
    }
    updateLight();


/*const gui = new dat.GUI();
makeXYZGUI(gui, desktop.position, 'position', updateLight);
makeXYZGUI(gui, desktop.rotation, 'rotation', updateLight);*/




function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}
    
window.addEventListener("resize", onWindowResize);
    

function render() {
renderer.render(scene, camera);
renderer.shadowMapEnabled = true;
}

/* main */
let animate = function() {
    if ( mixer ) mixer.update(0.0166 );
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    
};

animate();
    
       
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
    scrub: 3, 
          }          
  });
    

 /* Animation timeline  */ 

//.to(cube_fragments[0].position,{x:0,y:0,z:0,duration:2},0)
tl.to(pivot.rotation, { y:3 ,duration:1.5},">1")
.to(desktop.rotation,{x:-1,y:-1.2,z:-1,duration:1.5},"1")
.to(desktop.position,{x:-1.35,y:0,z:0.3,duration:1.5},"1")
.to(desktop.scale,{x:0.1,y:0.1,z:0.1,duration:1.5},"1")
.to(cube.position,{x:cube.position.x+0.05},"3")
.to(desktop.position,{x:-1.1},"3")
.to(cube.position,{x:0.425},"3.5")
.to(desktop.position,{x:-1.35},"3.5")
.to(desktop.position,{x:-1,y:-0.5,duration:1.5},"4")
.to(desktop.rotation,{x:-0.8,duration:1.5},"4")
.to(pivot.rotation,{y:0,z:pivot.rotation.z+0.001,duration:1.5},"4")
.to(pivot.rotation,{y:-3.5,duration:2},"7.5")
.to([cube.position,desktop.position],{x:0,y:0,z:0,duration:1.5},"7.5")
.to([cube.scale,desktop.scale],{x:0,y:0,z:0,duration:1.35},"7.6")
.to([tokenArray[0].scale,tokenArray[1].scale,tokenArray[2].scale,
    tokenArray[3].scale,tokenArray[4].scale,
    tokenArray[5].scale,tokenArray[6].scale,
    tokenArray[7].scale],{x:0.62,y:0.62,z:0.62,duration:1.4},"8.75")
//.to(tokenArray[0].rotation,{x:5,z:5.5,duration:1.4},"8.75")
.to([tokenArray[0].position,tokenArray[1].position,tokenArray[2].position,
    tokenArray[3].position,tokenArray[4].position,
    tokenArray[5].position,tokenArray[6].position,
    tokenArray[7].position],{z:-0.75,y:-1.1,duration:1.4},"8.75")
.to(tokenPivot[0].rotation,{x:-6.5,duration:8},"8.75")
.to(tokenPivot[1].rotation,{x:-5.7,duration:8},"8.75")
.to(tokenPivot[2].rotation,{x:-4.9,duration:8},"8.75")
.to(tokenPivot[3].rotation,{x:-4.2,duration:8},"8.75")
.to(tokenPivot[4].rotation,{x:-3.3,duration:8},"8.75")
.to(tokenPivot[5].rotation,{x:-2.5,duration:8},"8.75")
.to(tokenPivot[6].rotation,{x:-1.7,duration:8},"8.75")
.to(tokenPivot[7].rotation,{x:-1,duration:8},"8.75")
.to(tokenPivot[0].rotation,{x:-6.6-3,duration:8},"16.75")
.to(tokenPivot[1].rotation,{x:-5.8-3,duration:8},"16.75")
.to(tokenPivot[2].rotation,{x:-5-3,duration:8},"16.75")
.to(tokenPivot[3].rotation,{x:-4.2-3,duration:8},"16.75")
.to(tokenPivot[4].rotation,{x:-3.4-3,duration:8},"16.75")
.to(tokenPivot[5].rotation,{x:-2.6-3,duration:8},"16.75")
.to(tokenPivot[6].rotation,{x:-1.8-3,duration:8},"16.75")
.to(tokenPivot[7].rotation,{x:-1-3,duration:8},"16.75")
.to(light.position,{x:10,z:5,duration:2},"9.5")
.to(light,{intensity:1.75,duration:2},"9.5")
.to([tokenArray[0].position,tokenArray[1].position,tokenArray[2].position,
    tokenArray[3].position,tokenArray[4].position,
    tokenArray[5].position,tokenArray[6].position,
    tokenArray[7].position],{x:0,y:0,z:0,duration:0.6},"23")
.to([tokenArray[0].scale,tokenArray[1].scale,tokenArray[2].scale,
    tokenArray[3].scale,tokenArray[4].scale,
    tokenArray[5].scale,tokenArray[6].scale,
    tokenArray[7].scale],{x:0,y:0,z:0,duration:1},"23")
.to(light.position,{x:0,z:5,duration:1},"23.5")

//.to(tokenArray[0].position,{z:0,duration:1.4},"10.3");


          





          
