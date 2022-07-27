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
  var geometry = new THREE.BoxGeometry(40, 100, 40);
  //* 网格模型  
  var material = new THREE.MeshLambertMaterial({
    color: 0x0000ff, //三角面颜色
  }); //材质对象
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  // 设置产生投影的网格模型
  mesh.castShadow = true;
  scene.add(mesh); //添加到场景中

  //创建一个平面几何体作为投影面
  var planeGeometry = new THREE.PlaneGeometry(300, 200);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0x999999
  });
  // 平面网格模型作为投影面
  var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  planeMesh.rotateX(-Math.PI / 2); //旋转网格模型
  planeMesh.position.y = -50; //设置网格模型y坐标
  // 设置接收阴影的投影面
  planeMesh.receiveShadow = true;
  scene.add(planeMesh); //网格模型添加到场景中
  /**
   * 光源设置
   */
  //* 方向光
  // var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  // // 设置光源位置
  // directionalLight.position.set(60, 100, 40);
  // // 设置用于计算阴影的光源对象
  // directionalLight.castShadow = true;
  // // 设置计算阴影的区域，最好刚好紧密包围在对象周围
  // // 计算阴影的区域过大：模糊  过小：看不到或显示不完整
  // directionalLight.shadow.camera.near = 0.5;
  // directionalLight.shadow.camera.far = 300;
  // directionalLight.shadow.camera.left = -50;
  // directionalLight.shadow.camera.right = 50;
  // directionalLight.shadow.camera.top = 200;
  // directionalLight.shadow.camera.bottom = -100;
  // scene.add(directionalLight);
  //* 聚光光源
  var spotLight = new THREE.SpotLight(0xffffff);
  // 设置聚光光源位置
  spotLight.position.set(50, 90, 50);
  // 设置聚光光源发散角度
  spotLight.angle = Math.PI /6
  scene.add(spotLight); //光对象添加到scene场景中
  // 设置用于计算阴影的光源对象
  spotLight.castShadow = true;
  // 设置计算阴影的区域，注意包裹对象的周围
  spotLight.shadow.camera.near = 1;
  spotLight.shadow.camera.far = 300;
  spotLight.shadow.camera.fov = 20;

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
  var controls = new THREE.OrbitControls(camera,renderer.domElement);//创建控件对象
  controls.addEventListener('change', render);//监听鼠标、键盘事件

  return renderer;
}

export default Geometry;
