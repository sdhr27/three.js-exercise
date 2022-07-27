// @ts-ignore
// const THREE = window.THREE = require('three');
import * as THREE from 'three/build/three.module.js';
const OrbitControls = require('three-orbit-controls')(THREE);
import Seal from './texture.jpg';

export default function () {
  /**
   * 创建场景对象Scene
   */
  var scene = new THREE.Scene();

  //创建一个平面几何体作为投影面
  var planeGeometry = new THREE.PlaneGeometry(300, 200);

  // Geometry.faceVertexUvs[0]包含的纹理坐标用于颜色贴图map、法线贴图normalMap等
  // Geometry.faceVertexUvs[1]包含的第二套纹理贴图用于光照阴影贴图
  planeGeometry.faceVertexUvs[1] = planeGeometry.faceVertexUvs[0];
  // 对于BufferGeometry而言两套纹理坐标分别通过.uv和.uv2属性表示。
  // geometry.attributes.uv2 = geometry.attributes.uv;
  var textureLoader = new THREE.TextureLoader();
  // 加载光照贴图
  var textureLight = textureLoader.load(Seal, () => render());
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0x999999,
    lightMap:textureLight,// 设置光照贴图
    // lightMapIntensity:0.5,//烘培光照的强度. 默认 1.
  });
  var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial); //网格模型对象Mesh
  scene.add(planeMesh); //网格模型添加到场景中


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
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);//设置渲染区域尺寸
  renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
  renderer.shadowMapEnabled = true; //! 开启阴影渲染
  // document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
  //执行渲染操作   指定场景、相机作为参数
  function render() {
    renderer.render(scene,camera);//执行渲染操作
  }
  render();

  var controls = new OrbitControls(camera,renderer.domElement);//创建控件对象
  controls.addEventListener('change', render);//监听鼠标、键盘事件

  return renderer;
}
