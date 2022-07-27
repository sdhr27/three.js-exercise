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
  //* 点模型
  // var material = new THREE.PointsMaterial({
  //   color: 0xff0000,
  //   size: 5.0 //点对象像素尺寸
  // }); //材质对象
  // var points = new THREE.Points(geometry, material); //点模型对象
  // scene.add(points); //添加到场景中
  //* 线模型
  // var material=new THREE.LineBasicMaterial({
  //   color:0xff0000 //线条颜色
  // });//材质对象
  // 创建线模型对象   构造函数：Line、LineLoop、LineSegments
  // var line=new THREE.Line(geometry,material);//线条模型对象
  // scene.add(line); //添加到场景中
  //* 网格模型  
  var material = new THREE.MeshLambertMaterial({
    color: 0x0000ff, //三角面颜色
    // wireframe:true,//网格模型以线条的模式渲染
  }); //材质对象
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  mesh.scale.set(0.5, 1.5, 2);
  mesh.scale.x = 2.0;
  mesh.position.y = 80;
  mesh.position.set(80,2,10);
  mesh.translateX(100);//沿着x轴正方向平移距离100
  mesh.translateZ(-50);
  // 沿向量平移
  var axis = new THREE.Vector3(1, 1, 1);
  axis.normalize(); //向量归一化
  mesh.translateOnAxis(axis, 100);
  // 立方体网格模型绕立方体的x轴旋转π/4
  mesh.rotateX(Math.PI/4);//绕x轴旋转π/4
  var axis = new THREE.Vector3(0,1,0);
  mesh.rotateOnAxis(axis,Math.PI/8);//绕axis轴旋转π/8
  //控制台查看：旋转方法，改变了rotation属性
  console.log(mesh.rotation); // .rotation属性值是欧拉对象Euler
  console.log(mesh.quaternion); // .quaternion属性值是是四元数对象Quaternion

  scene.add(mesh); //添加到场景中

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
