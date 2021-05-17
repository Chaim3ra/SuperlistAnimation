let renderer;
let camera;
let mixer;
let action;
//let controls;

/* Scene Creating*/
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


var cube_fragments=[];
//cube_fragments[0]=new THREE.Object3D();

const loader = new THREE.GLTFLoader();
var soma_cube;
const cube=new THREE.Object3D();
loader.load( 'models/soma-cube.glb', function ( gltf ) {
    soma_cube=gltf.scene
    cube.add(soma_cube);
    cube.scale.set(0.32,0.32,0.32);
    cube.rotation.set(0,0,0);
    cube.position.set(0.35,-0.34,0.2);
    mixer = new THREE.AnimationMixer(cube);
    action=mixer.clipAction(gltf.animations[0]);
    action.setLoop( THREE.LoopOnce )
    action.clampWhenFinished = true
    for(let i=0;i<7;i++){
        cube_fragments[i]=cube.getObjectById(39+i,true)
        //cube_fragments[i].position.set(0,0,0);
        cube_fragments[i].scale.set(0.32,0.32,0.32);
        scene.add(cube_fragments[i])
    }

    //scene.add(cube_fragments)
    //action.play();


}, undefined, function ( error ) {
 
    console.error( error );
 
} );

console.log(cube_fragments)
//var segment1=cube.getObjectByName( "objectName", true );
//segment1.position.set(0,0,0)
//segment1.scale.set(0.5,0.5,0.5)
//scene.add(segment1)

 
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
 


/* Initial Cube setup and creation */
const cubeGeo = new THREE.BoxGeometry( 1, 1, 1 );
const cubeMat = new THREE.MeshPhongMaterial({color: '#8AC'});
//const cube = new THREE.Mesh( cubeGeo, cubeMat );
//cube.position.set(0.5,0,0);
//scene.add( cube );

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
sphere.scale.set(0,0,0);
//scene.add(sphere);

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
//pivot.add( cube );
pivot.add( sphere );


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
const light = new THREE.PointLight(color, intensity);
light.position.set(0, 3, -10);
//light.target.position.set(0, 0, 0);
scene.add(light);
//scene.add(light.target);

// ambient
 scene.add( new THREE.AmbientLight( 0xffffff, 0.1 ) ); // optional



//scene.add(helper);

//scene.add( new THREE.AxesHelper() );



function render() {
renderer.render(scene, camera);
}

/* main */
let animate = function() {
    if ( mixer ) mixer.update(0.0166 );
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
    

tl.to(cube_fragments[0].position,{x:0,y:0,z:0,duration:2},0)
.to(pivot.rotation, { y:3 ,duration:1.5},">1")
.to(sphere.scale,{x:4.75,y:4.75,z:4.75,duration:1.5},"1")
.to(cube.position,{x:cube.position.x+0.05},"3")
.to(sphere.position,{x:sphere.position.x+0.06},"3")
.to(cube.position,{x:cube.position.x+0.3},"3.5")
.to(sphere.position,{x:sphere.position.x-0.06},"3.5")
.to(pivot.rotation,{y:0,z:pivot.rotation.z+0.001,duration:1.5},"4")
.to(pivot.rotation,{y:-3.5,duration:2},"7.5")
.to([cube.position,sphere.position],{x:0,y:0,z:0,duration:1.5},"7.5")
.to([cube.scale,sphere.scale],{x:0,y:0,z:0,duration:1.35},"7.6")
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
    tokenArray[7].position],{x:0,y:0,z:0,duration:1.6},"23")
.to([tokenArray[0].scale,tokenArray[1].scale,tokenArray[2].scale,
    tokenArray[3].scale,tokenArray[4].scale,
    tokenArray[5].scale,tokenArray[6].scale,
    tokenArray[7].scale],{x:0,y:0,z:0,duration:2},"23")
.to(light.position,{x:0,z:5,duration:2},"23")

//.to(tokenArray[0].position,{z:0,duration:1.4},"10.3");


          





          
