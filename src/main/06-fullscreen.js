import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 目标：js控制画面全屏和退出全屏

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

// 将webgl渲染的canvas渲染到body
document.body.appendChild(renderer.domElement)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼，让控制器更真实
controls.enableDamping = true

// 双击屏幕进入/退出全屏
window.addEventListener('dblclick', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen() // 退出全屏
  } else {
    renderer.domElement.requestFullscreen()
  }
})

// requestAnimationFrame时间参数，控制物体动画
function render() {
  controls.update()
  renderer.render(scene, camera)
  // 渲染下一帧时就会调用animate函数
  requestAnimationFrame(render)
}

render()

// 修改物体的位置
// cube.position.set(5, 0, 0)
// 添加坐标辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// 监听画面变化，更新画布渲染
window.addEventListener('resize', () => {
  console.log('画布变化了')
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix()
  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio)
})
