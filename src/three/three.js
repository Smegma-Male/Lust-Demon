import { lerp } from "three/src/math/MathUtils"
import "./three.css"
import peepoImage from "../../assets/images/peepo.jpg"

import * as THREE from "three"

let aspectRatio = window.innerWidth / window.innerHeight

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000)
camera.position.setZ(30)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas"),
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

// renderer.render(scene, camera) // draw
// renderer.setSize(window.innerWidth/2, window.innerHeight/2, false) // Half resolution

const geometry = new THREE.BoxGeometry(10, 10, 1)

// MeshBasicMaterial: doesn't care about light source.
// const material = new THREE.MeshBasicMaterial({
//   color: "white",
//   wireframe: true,
// })

// MeshStandardMaterial: uses light source
const material = new THREE.MeshStandardMaterial({
  color: "white",
  // wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const pointLight = new THREE.PointLight("red")
pointLight.position.set(5, 5, 5)
pointLight.intensity = 10
scene.add(pointLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(lightHelper)

// AmbientLight: across the scene
const ambientLight = new THREE.AmbientLight("white")
scene.add(ambientLight)

// Images
const texture = new THREE.TextureLoader().load(peepoImage)
const peepoCube = new THREE.Mesh(
  new THREE.BoxGeometry(3, 15, 3),
  new THREE.MeshBasicMaterial({
    map: texture,
  })
)
scene.add(peepoCube)

let targetColor = {
  r: Math.random(),
  g: Math.random(),
  b: Math.random(),
}

renderLoop()

function renderLoop() {
  requestAnimationFrame(renderLoop) // will call this function again when browser is ready to re-draw.

  rotateCube(cube)
  rotateCube(peepoCube)
  changeCubeColor()

  renderer.render(scene, camera) // draw
}

window.onresize = () => {
  aspectRatio = window.innerWidth / window.innerHeight
  camera.aspect = aspectRatio
  renderer.setSize(window.innerWidth, window.innerHeight)
}

document.querySelector("#app").innerHTML = `
  <div>
    <h1>ThreeJS!</h1>
    <div class="card">
      <a href="../../index.html">Back</a>
    </div>
  </div>
`

function approximatelyEqual(v1, v2, epsilon = 0.01) {
  if (!(Math.abs(v1 - v2) < epsilon)) {
    return false
  }
  return true
}

function rotateCube(cube) {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.001
  cube.rotation.z += 0.0001
}

function changeCubeColor() {
  Object.keys(targetColor).forEach((key) => {
    if (approximatelyEqual(targetColor[key] === cube.material.color[key])) {
      targetColor[key] = Math.random()
    }
  })

  cube.material.color.setRGB(
    lerp(cube.material.color.r, targetColor.r, 0.01),
    lerp(cube.material.color.g, targetColor.g, 0.01),
    lerp(cube.material.color.b, targetColor.b, 0.01)
  )
}
