// @ts-ignore
const THREE = window.THREE = require('three');
require('three/examples/js/controls/OrbitControls');

function Geometry() {
  /**
   * 创建场景对象Scene
   */
  var scene = new THREE.Scene();
  /**
   * 创建网格模型
   */
  //创建两个网格模型mesh1、mesh2
  var geometry = new THREE.BoxGeometry(20, 20, 20);
  var material = new THREE.MeshLambertMaterial({color: 0x0000ff});
  var group = new THREE.Group();
  var mesh1 = new THREE.Mesh(geometry, material);
  var mesh2 = new THREE.Mesh(geometry, material);
  mesh2.translateX(25);
  //把mesh1型插入到组group中，mesh1作为group的子对象
  group.add(mesh1);
  //把mesh2型插入到组group中，mesh2作为group的子对象
  group.add(mesh2);
  //把group插入到场景中作为场景子对象
  scene.add(group);
  //沿着Y轴平移mesh1和mesh2的父对象，mesh1和mesh2跟着平移
  group.translateY(100);
  //父对象缩放，子对象跟着缩放
  group.scale.set(4,4,4);
  //父对象旋转，子对象跟着旋转
  group.rotateY(Math.PI/6)
  console.log('查看group的子对象',group.children);
  console.log('查看Scene的子对象',scene.children);

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
  var controls = new THREE.OrbitControls(camera,renderer.domElement);//创建控件对象
  controls.addEventListener('change', render);//监听鼠标、键盘事件

  return renderer;
}

export default Geometry;
