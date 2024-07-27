import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/**
 * Cursor
 */
const cursor = { x: 0, y: 0 };
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Camera

// Perspective Camera
/**
 * Params:
 * 1) Vertical vision angle in degrees (fov)
 * 2) Aspect ratio
 * 3) Near (How close the camera can see)
 * 4) Far (How far the camera can see)
 *
 * *Do not use extreme values for near and far due to z-fighting
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

// Orthographic Camera
/**
 * Params:
 * 1,2,3,4) left, right, top, bottom
 * 5) near
 * 6) far
 */
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -aspectRatio,
//   aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );

// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// Controls
// Lots of controls, but will only focus on orbit control (Comment out the position controls to use this)
const controls = new OrbitControls(camera, canvas);
// controls.target.y = 1;
// controls.update();

//Damping
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update camera
  //   camera.position.y = cursor.y * 10;
  //   camera.position.x = cursor.x * 10;

  // Revolutions on the z plane
  //   camera.position.z = Math.sin(cursor.x * Math.PI * 2) * 3;
  //   camera.position.x = Math.cos(cursor.x * Math.PI * 2) * 3;
  // Revolutions on the y plane
  //   camera.position.y = cursor.y * 5;

  camera.lookAt(mesh.position);

  // Update objects
  //   mesh.rotation.y = elapsedTime;

  // Update Controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
