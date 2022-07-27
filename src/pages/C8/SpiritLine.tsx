// @ts-ignore
// const THREE = window.THREE = require('three');
import * as THREE from 'three/build/three.module.js';
const OrbitControls = require('three-orbit-controls')(THREE);
import Red from './red.png';

export default function () {
  /**
   * 创建场景对象Scene
   */
  var scene = new THREE.Scene();

  /**
   * 创建一个设置重复纹理的管道
   */
  var curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-80, -40, 0),
    new THREE.Vector3(-70, 40, 0),
    new THREE.Vector3(70, 40, 0),
    new THREE.Vector3(80, -40, 0)
  ]);
  var tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.6, 50, false);
  var textureLoader = new THREE.TextureLoader();
  var texture = textureLoader.load(Red);
  // 设置阵列模式为 RepeatWrapping
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT=THREE.RepeatWrapping
  // 设置x方向的偏移(沿着管道路径方向)，y方向默认1
  //等价texture.repeat= new THREE.Vector2(20,1)
  texture.repeat.x = 20;
  var tubeMaterial = new THREE.MeshPhongMaterial({
    map: texture,
    transparent: true,
  });

  var mesh = new THREE.Mesh(tubeGeometry, tubeMaterial); //网格模型对象Mesh
  scene.add(mesh); //网格模型添加到场景中

  /**
   * 光源设置
   */
  //* 环境光
  var ambient = new THREE.AmbientLight(0x444444);
  scene.add(ambient);
  //* 点光源
  var point = new THREE.PointLight(0xffffff, 1); // 第2个参数是强度系数
  point.position.set(400, 200, 300); //点光源位置
  scene.add(point); //点光源添加到场景中

  // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
  var axisHelper = new THREE.AxisHelper(250);
  scene.add(axisHelper);
  /**
   * 相机设置
   */
  var width = window.innerWidth; //窗口宽度
  var height = window.innerHeight; //窗口高度
  var k = width / height; //窗口宽高比
  var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
  // var s = 300; //三维场景显示范围控制系数，系数越大，显示的范围越大
  //创建相机对象
  var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
  camera.position.set(250, 300, 200); //设置相机位置
  camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

  // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
  var axisHelper = new THREE.AxisHelper(250);
  scene.add(axisHelper);

  /**
   * 创建渲染器对象
   */
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height);//设置渲染区域尺寸
  renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
  // document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
  //执行渲染操作   指定场景、相机作为参数
  // 渲染函数
  function render() {
    renderer.render(scene, camera); //执行渲染操作
    requestAnimationFrame(render);
    // 使用加减法可以设置不同的运动方向
    // 设置纹理偏移
    texture.offset.x -= 0.06
  }
  render();

  var controls = new OrbitControls(camera,renderer.domElement);//创建控件对象
  controls.addEventListener('change', render);//监听鼠标、键盘事件

  return renderer;
}
