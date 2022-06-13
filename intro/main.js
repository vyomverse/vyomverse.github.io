
import * as THREE from "https://unpkg.com/three@0.138.0/build/three.module.js";
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector("#bg"),
});
const controls = new OrbitControls(camera,renderer.domElement)
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);


const geometry = new THREE.TorusGeometry(10,3,16,100);
const Material = new THREE.MeshStandardMaterial({color:0xFF6347});
const torus = new THREE.Mesh(geometry,Material);
const ponitLight = new THREE.PointLight(0xffffff);
ponitLight.position.set(25,25,25);
const ambientLight = new THREE.AmbientLight(0xffffff);
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
const KTexture = new THREE.TextureLoader().load('logo-2.jpg');
const IIST = new THREE.Mesh(
  new THREE.BoxGeometry(5,5,5),
  new THREE.MeshBasicMaterial({map : KTexture})
);
const mTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
const Moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({map : mTexture
  ,normalMap:normalTexture})
);
Moon.position.z = 15;
Moon.position.setX(6);

IIST.position.z = -5;
IIST.position.x = 2;

scene.background= spaceTexture;
scene.add(Moon);
scene.add(IIST);
scene.add(ambientLight);
scene.add(ponitLight);
scene.add(torus);
renderer.render(scene,camera);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({color:0xFFFFFF});
  const star = new THREE.Mesh(geometry,Material);
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  Moon.rotation.x += 0.05;
  Moon.rotation.y += 0.005;
  Moon.rotation.z += 0.05;

  IIST.rotation.y += 0.02;
  IIST.rotation.z += 0.02;
 

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate(){
requestAnimationFrame(animate);
torus.rotation.x += 0.01;
torus.rotation.y += 0.005;
torus.rotation.z += 0.01;
controls.update();
renderer.render(scene,camera);

}
animate()