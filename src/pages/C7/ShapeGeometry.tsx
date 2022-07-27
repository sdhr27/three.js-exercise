// @ts-ignore
// const THREE = window.THREE = require('three');
import * as THREE from 'three/build/three.module.js';
const OrbitControls = require('three-orbit-controls')(THREE);

export default function () {
  /**
   * 创建场景对象Scene
   */
  var scene = new THREE.Scene();

  // 通过shpae基类path的方法绘制轮廓（本质也是生成顶点）
  var shape = new THREE.Shape();
  shape.absarc(0,0,100,0,2*Math.PI);//圆弧轮廓
  console.log(shape.getPoints(15));//查看shape顶点数据
  var geometry = new THREE.ShapeGeometry(shape, 5);
  var material=new THREE.MeshPhongMaterial({
    color:0x0000ff,//三角面颜色
    side:THREE.DoubleSide, //两面可见
    wireframe: true,
  });//材质对象
  var mesh=new THREE.Mesh(geometry,material);//旋转网格模型对象
  mesh.translateX(200)
  scene.add(mesh);//旋转网格模型添加到场景中

  var points = [
    new THREE.Vector2(-50, -50),
    new THREE.Vector2(-60, 0),
    new THREE.Vector2(0, 50),
    new THREE.Vector2(60, 0),
    new THREE.Vector2(50, -50),
    new THREE.Vector2(-50, -50),
  ]
  // 通过顶点定义轮廓
  var shape = new THREE.Shape(points);
  // shape可以理解为一个需要填充轮廓
  // 所谓填充：ShapeGeometry算法利用顶点计算出三角面face3数据填充轮廓
  var geometry = new THREE.ShapeGeometry(shape, 25);
  var material=new THREE.MeshPhongMaterial({
    color:0x0000ff,//三角面颜色
    side:THREE.DoubleSide//两面可见
  });//材质对象

  var mesh=new THREE.Mesh(geometry,material);//旋转网格模型对象
  scene.add(mesh);//旋转网格模型添加到场景中

  // 通过shpae基类path的方法绘制轮廓（本质也是生成顶点）
  var shape = new THREE.Shape();
  // 四条直线绘制一个矩形轮廓
  shape.moveTo(0,0);//起点
  shape.lineTo(0,100);//第2点
  shape.lineTo(100,100);//第3点
  shape.lineTo(100,0);//第4点
  shape.lineTo(0,0);//第5点
  var geometry = new THREE.ShapeGeometry(shape, 25);
  var mesh=new THREE.Mesh(geometry,material);//旋转网格模型对象
  mesh.translateY(50)
  scene.add(mesh);//旋转网格模型添加到场景中

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
