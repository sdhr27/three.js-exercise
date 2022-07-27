// @ts-ignore
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
  var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
  console.log(geometry);
  console.log('几何体顶点位置数据',geometry.vertices);
  console.log('三角行面数据',geometry.faces);
  // 遍历几何体的face属性
  geometry.faces.forEach((face: any) => {
    // 设置三角面face三个顶点的颜色
    face.vertexColors = [
      new THREE.Color(0xffff00),
      new THREE.Color(0xff00ff),
      new THREE.Color(0x00ffff),
    ]
  });
  geometry.faces.pop();
  geometry.faces.pop();
  geometry.faces.shift();
  geometry.faces.shift();
  // 几何体xyz三个方向都放大2倍
  geometry.scale(2, 2, 2);
  // 几何体沿着x轴平移50
  geometry.translate(150, 0, 0);
  // 几何体绕着x轴旋转45度
  geometry.rotateX(Math.PI / 4);
  // 居中：偏移的几何体居中
  geometry.center();

  var material = new THREE.MeshBasicMaterial({
    // color: 0x0000ff,
    vertexColors: THREE.FaceColors,
    side: THREE.DoubleSide //两面可见
    // wireframe:true,//线框模式渲染
  }); //材质对象Material
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  scene.add(mesh); //网格模型添加到场景中
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

export default Mouse;
