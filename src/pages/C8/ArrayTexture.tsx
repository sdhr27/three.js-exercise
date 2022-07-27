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

  var geometry = new THREE.BoxGeometry(100, 100, 100); //立方体
  // var geometry = new THREE.PlaneGeometry(204, 102, 4, 4); //矩形平面
  // var geometry = new THREE.SphereGeometry(60, 25, 25); //球体
  // var geometry = new THREE.CylinderGeometry(60, 60, 25,25); //圆柱
  //
  // 材质对象1
  var material_1 = new THREE.MeshPhongMaterial({
    color: 0xffff3f
  })
  var textureLoader = new THREE.TextureLoader(); // 纹理加载器
  var texture = textureLoader.load(Seal, () => render()); // 加载图片，返回Texture对象
  // 材质对象2
  var material_2 = new THREE.MeshLambertMaterial({
    map: texture, // 设置纹理贴图
    // wireframe:true,
  });
  // 设置材质数组
  var materialArr = [material_2, material_1, material_1, material_2, material_1, material_1];

  // 设置数组材质对象作为网格模型材质参数
  var mesh = new THREE.Mesh(geometry, materialArr); //网格模型对象Mesh
  scene.add(mesh); //网格模型添加到场景中

  var geometry = new THREE.PlaneGeometry(204, 102, 4, 4); //矩形平面
  // 材质对象1
  var material1 = new THREE.MeshPhongMaterial({
    color: 0xffff3f,
    // wireframe:true,
  })
  // 材质对象2
  var material2 = new THREE.MeshPhongMaterial({
    color: 0x0000ff,
    side: THREE.DoubleSide,
    // wireframe:true,
  }); //材质对象Material
  // 数组材质
  var materialArr = [material1, material2];
  // 设置几何体的材质索引(对于PlaneGeometry而言所有Face3的材质索引默认0)
  geometry.faces[4].materialIndex = 1;
  geometry.faces[5].materialIndex = 1;
  var mesh = new THREE.Mesh(geometry, materialArr); //网格模型对象Mesh
  mesh.translateY(100)
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
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);//设置渲染区域尺寸
  renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
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
