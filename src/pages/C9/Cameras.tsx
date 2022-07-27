// @ts-ignore
// const THREE = window.THREE = require('three');
import * as THREE from 'three/build/three.module.js';
const OrbitControls = require('three-orbit-controls')(THREE);

export default function () {
  /**
   * 创建场景对象Scene
   */
  var scene = new THREE.Scene();

  var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
	// var geometry = new THREE.SphereGeometry(60, 40, 40);
  var material = new THREE.MeshLambertMaterial({
    color: 0x0000ff
  }); //材质对象Material
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  scene.add(mesh); //网格模型添加到场景中

  /**
   * 光源设置
   */
  //* 环境光
  var ambient = new THREE.AmbientLight(0x444444);
  scene.add(ambient);
  //* 点光源
  var point = new THREE.PointLight(0xffffff, 1); // 第2个参数是强度系数
  point.position.set(400, 200, 300); //点光源位置
  scene.add(point); //点光源添加到场景中

  // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
  var axisHelper = new THREE.AxisHelper(250);
  scene.add(axisHelper);
  /**
   * 正投影相机设置
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
   * 透视投影相机设置
   */
  // var width = window.innerWidth; //窗口宽度
  // var height = window.innerHeight; //窗口高度
  // /**透视投影相机对象*/
  // var camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
  // camera.position.set(200, 50, 200); //设置相机位置
  // camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

  // // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
  // var axisHelper = new THREE.AxisHelper(250);
  // scene.add(axisHelper);

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

  
  // onresize 事件会在窗口被调整大小时发生
  window.onresize=function(){
    // 重置渲染器输出画布canvas尺寸
    renderer.setSize(window.innerWidth,window.innerHeight);
    // 重置相机投影的相关参数
    k = window.innerWidth/window.innerHeight;//窗口宽高比
    camera.left = -s*k;
    camera.right = s*k;
    camera.top = s;
    camera.bottom = -s;
    // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix ();
    render();
  };
  // window.onresize=function(){
  //   // 重置渲染器输出画布canvas尺寸
  //   renderer.setSize(window.innerWidth,window.innerHeight);
  //   // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
  //   camera.aspect = window.innerWidth/window.innerHeight;
  //   // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
  //   // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
  //   // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
  //   camera.updateProjectionMatrix ();
  //   render();
  // };

  return renderer;
}
