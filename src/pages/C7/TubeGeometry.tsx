// @ts-ignore
// const THREE = window.THREE = require('three');
import * as THREE from 'three/build/three.module.js';
const OrbitControls = require('three-orbit-controls')(THREE);

export default function () {
  /**
   * 创建场景对象Scene
   */
  var scene = new THREE.Scene();

  // var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
    //创建管道成型的路径(3D样条曲线)
  var path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-10, -50, -50),
    new THREE.Vector3(10, 0, 0),
    new THREE.Vector3(8, 50, 50),
    new THREE.Vector3(-5, 0, 100)
  ]);
  // path:路径   40：沿着轨迹细分数  2：管道半径   25：管道截面圆细分数
  var geometry1 = new THREE.TubeGeometry(path, 400, 2, 25);
  //材质对象
  var material = new THREE.LineBasicMaterial({
    color: 0x000000
  });
  //线条模型对象
  var line = new THREE.Line(geometry1, material);
  scene.add(line); //线条对象添加到场景中

  // 创建多段线条的顶点数据
  var p1 = new THREE.Vector3(-85.35, -35.36)
  var p2 = new THREE.Vector3(-50, 0, 0);
  var p3 = new THREE.Vector3(0, 50, 0);
  var p4 = new THREE.Vector3(50, 0, 0);
  var p5 = new THREE.Vector3(85.35, -35.36);
  // 创建线条一：直线
  let line1 = new THREE.LineCurve3(p1,p2);
  // 重建线条2：三维样条曲线
  var curve = new THREE.CatmullRomCurve3([p2, p3, p4]);
  // 创建线条3：直线
  let line2 = new THREE.LineCurve3(p4,p5);
  var CurvePath = new THREE.CurvePath();// 创建CurvePath对象
  CurvePath.curves.push(line1, curve, line2);// 插入多段线条
  //通过多段曲线路径创建生成管道
  //通过多段曲线路径创建生成管道，CCurvePath：管道路径
  var geometry2 = new THREE.TubeGeometry(CurvePath, 100, 5, 25, false);
  //材质对象
  var material = new THREE.LineBasicMaterial({
    color: 0x000000
  });
  //线条模型对象
  var line = new THREE.Line(geometry2, material);
  scene.add(line); //线条对象添加到场景中
  
  //* 绘制一个U型轮廓
  var R = 80;//圆弧半径
  // var arc = new THREE.ArcCurve(0, 0, R, 0, Math.PI, true); //! ArcCurve无法用于生成Tube
  var p1 = new THREE.Vector3(R, 200, 0);
  var p2 = new THREE.Vector3(R, 0, 0);
  var p3 = new THREE.Vector3(-R, 0, 0);
  var p4 = new THREE.Vector3(-R, 200, 0);
  var p5 = new THREE.Vector3(0, -R, 0);
  var arc = new THREE.CatmullRomCurve3([p2, p5, p3]);
  // 半圆弧的一个端点作为直线的一个端点
  var line11 = new THREE.LineCurve3(p1, p2);
  var line21 = new THREE.LineCurve3(p3, p4);
  // 创建组合曲线对象CurvePath
  var CurvePath2 = new THREE.CurvePath();
  // 把多个线条插入到CurvePath中
  CurvePath2.curves.push(line11, arc, line21);
  var geometry3 = new THREE.TubeGeometry(CurvePath2, 100, 5, 25, false);
  //材质对象
  var material = new THREE.LineBasicMaterial({
    color: 0x000000
  });
  //线条模型对象
  var line = new THREE.Line(geometry3, material);
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
