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
  var box=new THREE.BoxGeometry(10,10,10);//创建一个立方体几何对象
  var material=new THREE.MeshLambertMaterial({color:0x0000ff});//材质对象
  
  
  var mesh=new THREE.Mesh(box,material);//网格模型对象
  var mesh2 = mesh.clone();//克隆网格模型
  mesh.translateX(20);//网格模型mesh平移
  box.scale(1.5,1.5,1.5);//!几何体同时缩放
  //! Geometry.vertices的属性值是一个数组对象，但是复制或克隆的时候，不是获得对象的索引值，而是深拷贝属性的值
  
  scene.add(mesh,mesh2);//网格模型添加到场景中

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
