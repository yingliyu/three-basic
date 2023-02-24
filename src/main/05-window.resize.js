import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
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
// 设置控制器阻尼，让控制器更真实
controls.enableDamping = true
// controls.update()
// 设置时钟clock
const clock = new THREE.Clock()
// 设置动画gsap
var animate = gsap.to(cube.position, {
  x: 5,
  duration: 5,
  ease: 'power1.inOut',
  repeat: 2, // 设置重复次数，无限次循环-1
  yoyo: true, //往返运动
  delay: 2, // 延迟2s
  onComplete: () => {
    console.log('动画完成')
  },
  onStart: () => {
    console.log('动画开始')
  },
})
gsap.to(cube.rotation, { x: Math.PI * 2, duration: 5, ease: 'bounce.out' })
window.addEventListener('dblclick', () => {
  console.log(animate)
  if (animate.isActive()) {
    animate.pause()
  } else {
    animate.resume()
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
