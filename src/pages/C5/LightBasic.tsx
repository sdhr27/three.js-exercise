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
  var geometry = new THREE.BoxGeometry(100, 100, 100);
  //* 网格模型  
  var material = new THREE.MeshLambertMaterial({
    color: 0x0000ff, //三角面颜色
  }); //材质对象
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  scene.add(mesh); //添加到场景中

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
  //* 平行光
  // 平行光如果不设置.position和.target属性，光线默认从上往下照射
  var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
  directionalLight.position.set(80, 100, 50);
  // 方向光指向对象网格模型mesh2，可以不设置，默认的位置是0,0,0
  directionalLight.target = mesh;
  scene.add(directionalLight);
  //* 聚光光源
  var spotLight = new THREE.SpotLight(0xffffff);
  // 设置聚光光源位置
  spotLight.position.set(200, 200, 200);
  // 聚光灯光源指向网格模型mesh2
  spotLight.target = mesh;
  // 设置聚光光源发散角度
  spotLight.angle = Math.PI / 6
  scene.add(spotLight);//光对象添加到scene场景中

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
