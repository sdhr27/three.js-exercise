// @ts-ignore
// import * as THREE from 'three';

const THREE = window.THREE = require('three');
require('three/examples/js/controls/OrbitControls');
// THREE.DRACOLoader.setDecoderPath('lib/draco');

function Mouse() {
  /**
   * 创建场景对象Scene
   */
  var scene = new THREE.Scene();
  /**
   * 创建网格模型
   */
	const geometry1 = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
	const geometry2 = new THREE.SphereGeometry(60, 40, 40);
  var material = new THREE.MeshLambertMaterial({
    color: 0x0000ff
  }); //材质对象Material
  var mesh1 = new THREE.Mesh(geometry1, material); //网格模型对象Mesh
  var mesh2 = new THREE.Mesh(geometry2, material); //网格模型对象Mesh
  scene.add(mesh1); //网格模型添加到场景中
  mesh2.translateY(120); //球体网格模型沿Y轴正方向平移120
  scene.add(mesh2); //网格模型添加到场景中

  // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
  var axisHelper = new THREE.AxisHelper(250);
  scene.add(axisHelper);
  /**
   * 光源设置
   */
  //点光源
  var point = new THREE.PointLight(0xffffff);
  point.position.set(400, 200, 300); //点光源位置
  scene.add(point); //点光源添加到场景中
  //环境光
  var ambient = new THREE.AmbientLight(0x444444);
  scene.add(ambient);
  // console.log(scene)
  // console.log(scene.children)
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

export default Mouse;
