const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// Background - Anime Cyberpunk City
const spaceTexture = new THREE.TextureLoader().load('https://i.imgur.com/5K5zX8S.jpg'); // Anime cityscape
scene.background = spaceTexture;

// Torus (Energy Ring)
const torusGeometry = new THREE.TorusGeometry(10, 1, 16, 100);
const torusMaterial = new THREE.MeshBasicMaterial({ color: 0xff007f, wireframe: true });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
scene.add(torus);

// Shuriken (Ninja Star)
const shurikenGeometry = new THREE.TetrahedronGeometry(5, 0);
const shurikenMaterial = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true });
const shuriken = new THREE.Mesh(shurikenGeometry, shurikenMaterial);
shuriken.position.set(0, 0, -10);
scene.add(shuriken);

// Lighting
const pointLight = new THREE.PointLight(0xff007f, 1, 100);
pointLight.position.set(10, 10, 10);
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(pointLight, ambientLight);

// Anime Energy Orbs (Particles)
function addOrb() {
    const geometry = new THREE.SphereGeometry(0.3, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: Math.random() > 0.5 ? 0xff007f : 0x00d4ff });
    const orb = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(80));
    orb.position.set(x, y, z);
    scene.add(orb);
}

Array(150).fill().forEach(addOrb);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;

    shuriken.rotation.x += 0.02;
    shuriken.rotation.y += 0.02;
    shuriken.rotation.z += 0.02;

    renderer.render(scene, camera);
}

animate();

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
