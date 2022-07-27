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
  var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry

  var p1 = new THREE.Vector3(0, 0, 0); //顶点1坐标
  var p2 = new THREE.Vector3(0, 100, 0); //顶点2坐标
  var p3 = new THREE.Vector3(50, 0, 0); //顶点3坐标
  var p4 = new THREE.Vector3(0, 0, 100); //顶点4坐标
  //顶点坐标添加到geometry对象
  geometry.vertices.push(p1, p2, p3,p4);

  // Face3构造函数创建一个三角面
  var face1 = new THREE.Face3(0, 1, 2);
  //三角面每个顶点的法向量
  var n1 = new THREE.Vector3(0, 0, -1); //三角面Face1顶点1的法向量
  var n2 = new THREE.Vector3(0, 0, -1); //三角面2Face2顶点2的法向量
  var n3 = new THREE.Vector3(0, 0, -1); //三角面3Face3顶点3的法向量
  // 设置三角面Face3三个顶点的法向量
  face1.vertexNormals.push(n1,n2,n3);

  // 三角面2
  var face2 = new THREE.Face3(0, 2, 3);
  // 设置三角面法向量
  face2.normal=new THREE.Vector3(0, -1, 0);

  //三角面face1、face2添加到几何体中
  geometry.faces.push(face1,face2);

  face1.vertexColors = [
    new THREE.Color(0xffff00),
    new THREE.Color(0xff00ff),
    new THREE.Color(0x00ffff),
  ]
  face2.color = new THREE.Color(0xffff00);

  // 材质对象
  // 线条渲染模式
  var material=new THREE.MeshLambertMaterial({
    vertexColors: THREE.VertexColors, //以顶点颜色为准
    side: THREE.DoubleSide //两面可见
  });//材质对象
  var mesh=new THREE.Mesh(geometry,material);//线条模型对象
  scene.add(mesh);//线条对象添加到场景中


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
