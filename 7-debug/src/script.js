import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import GUI from "lil-gui";

// Debug
// You can only modify properties of objects
//lil-gui.georgealways.com
const gui = new GUI({
  width: 300,
  title: "Debug",
  closeFolders: true,
});
// gui.close();
gui.hide();
window.addEventListener("keydown", (event) => {
  if (event.key === "h") gui.show(gui._hidden);
});
const debugObject = {};

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
debugObject.color = "#34cb7d";

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  color: debugObject.color,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// folders
const cubeTweaks = gui.addFolder("Cube");

// Tweak the y position
cubeTweaks.add(mesh.position, "y").min(-3).max(3).step(0.01).name("Elevation");
// Mesh visible
cubeTweaks.add(mesh, "visible").name("Visible");
cubeTweaks.add(material, "wireframe").name("Wireframe");

// Add a color
// This colour in the debug is not what threeJS uses internally
// If you need that colour you can use the .getHexString
// Alternatively, you can use non-modified colors only (by using a custom object)
cubeTweaks
  .addColor(debugObject, "color")
  .name("Color")
  .onChange(() => {
    // console.log("value.getHexString()", value.getHexString());
    material.color.set(debugObject.color);
  });

// Button (functions)
debugObject.spin = () => {
  gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
};
cubeTweaks.add(debugObject, "spin").name("Spin");

// Segments
// Can't use widthSegments (Only used to create it once)
// Need to create subdivision
// To update, you could recreate the object onChange (but this is a very intensive task) - better to use onFinishChange
debugObject.subdivision = 2;
cubeTweaks
  .add(debugObject, "subdivision")
  .min(1)
  .max(20)
  .step(1)
  .name("Sub-division")
  .onFinishChange((val) => {
    // Clean up old geometries otherwise they'll stay on the CPU
    mesh.geometry.dispose;
    mesh.geometry = new THREE.BoxGeometry(1, 1, 1, val, val, val);
  });

// Example of a random value
// const myObject = {
//   myVariable: 1337,
// };
// gui.add(myObject, "myVariable");

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
