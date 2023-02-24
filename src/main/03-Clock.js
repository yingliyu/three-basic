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

// 缩放
// cube.scale.set(3, 2, 1)
// cube.scale.x = 5

// 旋转
// cube.rotation.set(Math.PI / 4, 0, 0)

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
// 设置时钟clock
const clock = new THREE.Clock()
// requestAnimationFrame时间参数，控制物体动画
function animate() {
  // 获取时钟运行的总时长
  let time = clock.getElapsedTime()
  console.log('时钟运行总时长：', time)
  let t = time % 5
  cube.position.x = t * 1
  let datetime = clock.getDelta()
  console.log('两次获取时间的总间隔', datetime)

  renderer.render(scene, camera)
  // 渲染下一帧时就会调用animate函数
  requestAnimationFrame(animate)
}

animate()

// 修改物体的位置
cube.position.set(5, 0, 0)
// 添加坐标辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
