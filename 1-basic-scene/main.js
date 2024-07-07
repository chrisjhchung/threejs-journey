import * as THREE from "three";
/**
4 elements for a scene:
- Scene
- Objects
- Camera
- Renderer
**/

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
// Mesh is a combination of a geometry (shape) and material
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);

// add mesh to scene
scene.add(mesh);

// Camera
// Perspective camera needs (1) field of view (expressed in degress) and (2) aspect ratio (width divided by the height)
const sizes = {
  width: 800,
  height: 600,
};

// FOV is usually around something like 35, but 75 will allow us to see the mesh/object easily
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
