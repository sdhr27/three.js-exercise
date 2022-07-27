// @ts-ignore
// const THREE = window.THREE = require('three');
import * as THREE from 'three/build/three.module.js';
const OrbitControls = require('three-orbit-controls')(THREE);

export default function () {
  /**
   * 创建场景对象Scene
   */
  var scene = new THREE.Scene();

  var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
  //* 绘制一个U型轮廓
  var R = 80;//圆弧半径
  var arc = new THREE.ArcCurve(0, 0, R, 0, Math.PI, true);
  // 半圆弧的一个端点作为直线的一个端点
  var line1 = new THREE.LineCurve(new THREE.Vector2(R, 200, 0), new THREE.Vector2(R, 0, 0));
  var line2 = new THREE.LineCurve(new THREE.Vector2(-R, 0, 0), new THREE.Vector2(-R, 200, 0));
  // 创建组合曲线对象CurvePath
  var CurvePath = new THREE.CurvePath();
  // 把多个线条插入到CurvePath中
  CurvePath.curves.push(line1, arc, line2);
  //分段数200
  var points = CurvePath.getPoints(200);
  // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
  geometry.setFromPoints(points);
  //材质对象
  var material = new THREE.LineBasicMaterial({
    color: 0x000000
  });
  //线条模型对象
  var line = new THREE.Line(geometry, material);
  scene.add(line); //线条对象添加到场景中

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
