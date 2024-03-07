
//Scene
const scene = new THREE.Scene();

//Create Earth
const geometry = new THREE.SphereGeometry(3, 64, 64);
const texture = new THREE.TextureLoader().load('textures/RealisticDayEarth.jpg');
const bumpMap = new THREE.TextureLoader().load('textures/earthbump10k.jpg');
const specularMap = new THREE.TextureLoader().load('textures/water_4k.png');
const lightMap = new THREE.TextureLoader().load('textures/BlackMarble_2016_3km_gray.jpg');
const material = new THREE.MeshPhongMaterial({ 
map: texture,
bumpMap: bumpMap,
bumpScale: 10,
specularMap: specularMap,
specular: new THREE.Color('grey'),
emissiveMap: lightMap,
emissive: 0xf5e9b9,
emissiveIntensity: 0.2,
});
//Create clouds
const cloudGeometry = new THREE.SphereGeometry(3.05, 64, 64);
const cloudTexture = new THREE.TextureLoader().load('textures/2k_earth_clouds.png');
const cloudMaterial = new THREE.MeshPhongMaterial({
map: cloudTexture,
transparent: true,
});
// Create Moon
const moonGeometry = new THREE.SphereGeometry(0.75, 32 , 32);
const moonTexture = new THREE.TextureLoader().load('textures/2k_moon.jpg');
const moonBumpMap = new THREE.TextureLoader().load('textures/moonbump2k.jpg');
const moonMaterial = new THREE.MeshPhongMaterial({
map: moonTexture,
bumpMap: moonBumpMap,
bumpScale: -1.5,
});
// Create Sun 
const sunGeometry = new THREE.SphereGeometry(327, 64, 64);
const sunTexture = new THREE.TextureLoader().load('textures/8k_sun.jpg');
const sunMaterial = new THREE.MeshPhongMaterial({
map: sunTexture,
emissiveMap: sunTexture,
emissive: 0xffffff,
});

// Dan Square
const square = new THREE.BoxGeometry(5,5,5);
const boxMaterial = new THREE.MeshNormalMaterial({
});

// Create background
const starGeometry = new THREE.SphereGeometry(1000, 64, 64);
const starTexture = new THREE.TextureLoader().load('textures/galaxy_starfield.png');
const starMaterial = new THREE.MeshPhongMaterial({
map: starTexture,
emissiveMap: starTexture,
emissive: 0xffffff,
emissiveIntensity: 0.2,
side: THREE.BackSide,
})

const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
sunMesh.position.set(1200, 0, 0);
const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
moonMesh.position.set(-20, 0, 0);
moonMesh.castShadow = true;
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
const mesh = new THREE.Mesh(geometry, material);
mesh.receiveShadow = true;
const cloudmesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
cloudmesh.receiveShadow = true;
const boxMesh = new THREE.Mesh(square, boxMaterial);
boxMesh.position.set(0, 800,0);
scene.add(mesh, cloudmesh, starMesh, moonMesh, sunMesh, boxMesh);

//Sizes 
const sizes = {
width: window.innerWidth,
height: window.innerHeight,
}

//Light 
const light = new THREE.DirectionalLight( 0xffffff, 0.5);
light.position.set( 100, 0, 0 );
light.castShadow = true;
scene.add( light );


//Set up shadow properties for the light
light.shadow.mapSize.width = 2048; // default
light.shadow.mapSize.height = 2048; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default

const DirectionalLightHelper = new THREE.DirectionalLightHelper( light );
scene.add(DirectionalLightHelper);
const light2 = new THREE.AmbientLight( 0xffffff, 0.0075);
scene.add( light2 );

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 3500);
camera.position.z = 20;
scene.add(camera);

//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ 
canvas,
alpha: true,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio( window.devicePixelRatio );
renderer.render(scene, camera);

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = true;
controls.enableZoom = true;
controls.autoRotate = false;

// Resize
window.addEventListener('resize', () => {
//Update Sizes
sizes.width = window.innerWidth; 
sizes.height = window.innerHeight;
//Update Camera
camera.updateProjectionMatrix();
camera.aspect = sizes.width / sizes.height;
renderer.setSize(sizes.width, sizes.height);
}) 

const loop = () => {
controls.update();
renderer.render(scene, camera);
cloudmesh.rotation.y += 0.00040;
mesh.rotation.y += 0.00030;
moonMesh.rotation.y += 0.0005;
window.requestAnimationFrame(loop);
}

loop();