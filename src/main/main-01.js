import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// console.log('====', THREE)
// 目标：了解three.js最基本的内容
// 1.创建场景
const scene = new THREE.Scene()

// 2.创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
)

// 3.设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)

// 4. 添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
// 将几何体添加到场景中
scene.add(cube)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)

// console.log(renderer)

// 将webgl渲染的canvas渲染到body
document.body.appendChild(renderer.domElement)

// 使用渲染器通过相机将场景渲染进来
// renderer.render(scene, camera)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

// controls.update()

function animate() {
  cube.position.x += 0.01
  if (cube.position.x > 5) {
    cube.position.x = 0
  }

  // required if controls.enableDamping or controls.autoRotate are set to true
  // controls.update()

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()

// 修改物体的位置
cube.position.set(5, 0, 0)
// 添加坐标辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
