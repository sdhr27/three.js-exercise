// @ts-ignore
// const THREE = window.THREE = require('three');
import * as THREE from 'three/build/three.module.js';
const OrbitControls = require('three-orbit-controls')(THREE);

export default function () {
  /**
   * 创建场景对象Scene
   */
  var scene = new THREE.Scene();

  //* line1 ArcCurve圆弧
  const geometry1 = new THREE.Geometry(); //声明一个几何体对象Geometry
  //参数：0, 0圆弧坐标原点x，y  100：圆弧半径    0, 2 * Math.PI：圆弧起始角度
  var arc = new THREE.ArcCurve(0, 0, 100, 0, 2 * Math.PI);
  //getPoints是基类Curve的方法，返回一个vector2对象作为元素组成的数组
  var points = arc.getPoints(50);//分段数50，返回51个顶点
  // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
  // console.log(geometry, 'geometry')
  geometry1.setFromPoints(points);
  //材质对象
  var material = new THREE.LineBasicMaterial({
    color: 0x000000
  });
  //线条模型对象
  var line = new THREE.Line(geometry1, material);
  scene.add(line); //线条对象添加到场景中

  //* line2普通圆弧
  const geometry2 = new THREE.Geometry(); //声明一个几何体对象Geometry
  var R = 100; //圆弧半径
  var N = 50; //分段数量
  // 批量生成圆弧上的顶点数据
  for (var i = 0; i < N; i++) {
    var angle = 2 * Math.PI / N * i;
    var x = R * Math.sin(angle);
    var y = R * Math.cos(angle);
    geometry2.vertices.push(new THREE.Vector3(x, y, 0));
  }
  // 插入最后一个点，line渲染模式下，产生闭合效果
  // geometry.vertices.push(geometry.vertices[0])
  //材质对象
  var material = new THREE.LineBasicMaterial({
    color: 0x000000
  });
  //线条模型对象
  var line2 = new THREE.Line(geometry2, material);
  line2.translateX(200);
  scene.add(line2); //线条对象添加到场景中

  //* line3 普通直线
  const geometry3 = new THREE.Geometry(); //声明一个几何体对象Geometry
  var p1 = new THREE.Vector3(50, 0, 0); //顶点1坐标
  var p2 = new THREE.Vector3(0, 70, 0); //顶点2坐标
  //顶点坐标添加到geometry对象
  geometry3.vertices.push(p1, p2);
  var material = new THREE.LineBasicMaterial({
    color: 0xffff00,
  });//材质对象
  //线条模型对象
  var line3 = new THREE.Line(geometry3, material);
  scene.add(line3); //线条对象添加到场景中

  //* line4 LineCurve3三维直线
  const geometry4 = new THREE.Geometry(); //声明一个几何体对象Geometry
  var p1 = new THREE.Vector3(150, 0, 0); //顶点1坐标
  var p2 = new THREE.Vector3(0, 170, 0); //顶点2坐标
  // 三维直线LineCurve3
  var LineCurve = new THREE.LineCurve3(p1, p2);
  var pointArr = LineCurve.getPoints(10);
  geometry4.setFromPoints(pointArr);
  var line4 = new THREE.Line(geometry4, material);
  scene.add(line4); //线条对象添加到场景中
  
  //* line5 LineCurve二维直线
  var geometry5 = new THREE.Geometry(); //声明一个几何体对象Geometry
  var p1 = new THREE.Vector2(70, 0); //顶点1坐标
  var p2 = new THREE.Vector2(0, 50); //顶点2坐标
  // 二维直线LineCurve
  var LineCurve = new THREE.LineCurve(p1, p2);
  var pointArr = LineCurve.getPoints(10);
  geometry5.setFromPoints(pointArr);
  var line5 = new THREE.Line(geometry5, material);
  scene.add(line5); //线条对象添加到场景中

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
