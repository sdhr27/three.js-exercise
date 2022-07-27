// @ts-ignore
// const THREE = window.THREE = require('three');
import * as THREE from 'three/build/three.module.js';
const OrbitControls = require('three-orbit-controls')(THREE);

export default function () {
  /**
   * 创建场景对象Scene
   */
  var scene = new THREE.Scene();

  //* 样条线
  var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
  // 三维样条曲线  Catmull-Rom算法
  var curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-50, 20, 90),
    new THREE.Vector3(-10, 40, 40),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(60, -60, 0),
    new THREE.Vector3(70, 0, 80)
  ]);
  //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
  var points = curve.getPoints(100); //分段数100，返回101个顶点
  // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
  geometry.setFromPoints(points);
  //材质对象
  var material = new THREE.LineBasicMaterial({
    color: 0x000000
  });
  //线条模型对象
  var line = new THREE.Line(geometry, material);
  scene.add(line); //线条对象添加到场景中

  //* 贝塞尔曲线
  var geometry2 = new THREE.Geometry(); //声明一个几何体对象Geometry
  // 三维样条曲线  Catmull-Rom算法
  var p1 = new THREE.Vector3(-80, 0, 0);
  var p2 = new THREE.Vector3(-40, 100, 0); // 控制点，不在曲线上
  var p3 = new THREE.Vector3(40, 100, 0); // 控制点，不在曲线上
  var p4 = new THREE.Vector3(80, 0, 0);
  // 三维三次贝赛尔曲线
  var curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);
  //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
  var points = curve.getPoints(100); //分段数100，返回101个顶点
  // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
  geometry2.setFromPoints(points);
  //材质对象
  var material = new THREE.LineBasicMaterial({
    color: 0x000000
  });
  //线条模型对象
  var line2 = new THREE.Line(geometry2, material);
  scene.add(line2); //线条对象添加到场景中

  /**
   * 光源设置
   */
  //* 环境光
  var ambient = new THREE.AmbientLight(0x444444);
  scene.add(ambient);
  //* 点光源
  var point = new THREE.PointLight(0xffffff, 0.5); // 第2个参数是强度系数
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
