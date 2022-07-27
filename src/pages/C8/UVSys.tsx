// @ts-ignore
// const THREE = window.THREE = require('three');
import * as THREE from 'three/build/three.module.js';
const OrbitControls = require('three-orbit-controls')(THREE);
import Seal from './texture.jpg';

export default function () {
  /**
   * 创建场景对象Scene
   */
  var scene = new THREE.Scene();

  // 纹理贴图映射到一个矩形平面上
  var geometry = new THREE.PlaneGeometry(204, 102); //矩形平面
  geometry.faceVertexUvs[0].forEach((elem) => {
    elem.forEach((Vector2) => {
      // 所有的UV坐标全部设置为一个值
      // 网格模型不会显示完整的地图，而是显示采样点纹理坐标(0.4,0.4)对应的RGB值
      Vector2.set(0.4,0.4);
    });
  });
  // var geometry = new THREE.SphereGeometry(60, 25, 25); //球体
  // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
  var textureLoader = new THREE.TextureLoader();
  // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
  textureLoader.load(Seal, function(texture) {
    var material = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide, //两面可见
      // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
      map: texture,//设置颜色贴图属性值
    }); //材质对象Material
    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    mesh.translateY(100);
    scene.add(mesh); //网格模型添加到场景中
    render();
  });

  // 矩形平面 设置细分数4,4
  var geometry1 = new THREE.PlaneGeometry(204, 102, 4, 4);
  geometry1.faceVertexUvs[0].forEach((elem) => {
    elem.forEach((Vector2) => {
      // 所有的UV坐标全部设置为一个值
      // 网格模型不会显示完整的地图，而是显示采样点纹理坐标(0.4,0.4)对应的RGB值
      Vector2.set(0.1,0.4);
    });
  });
  /**
   * 局部三角面显示完整纹理贴图
   */
  var t0 = new THREE.Vector2(0, 1); //图片左下角
  var t1 = new THREE.Vector2(0, 0); //图片右下角
  var t2 = new THREE.Vector2(1, 0); //图片右上角
  var t3 = new THREE.Vector2(1, 1); //图片左上角
  var uv1 = [t0, t1, t3]; //选中图片一个三角区域像素——用于映射到一个三角面
  var uv2 = [t1, t2, t3]; //选中图片一个三角区域像素——用于映射到一个三角面
  // 设置第五、第六个三角形面对应的纹理坐标
  geometry1.faceVertexUvs[0][3] = uv1
  geometry1.faceVertexUvs[0][15] = uv2

  var textureLoader = new THREE.TextureLoader();
  // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
  
  textureLoader.load(Seal, function(texture) {
    var material = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide, //两面可见
      // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
      map: texture,//设置颜色贴图属性值
    }); //材质对象Material
    var mesh = new THREE.Mesh(geometry1, material); //网格模型对象Mesh
    mesh.translateY(-100);
    scene.add(mesh); //网格模型添加到场景中
    render();
  });

  var geometry3 = new THREE.BufferGeometry(); //声明一个空几何体对象
  //类型数组创建顶点位置position数据
  var vertices = new Float32Array([
    0, 0, 0, //顶点1坐标
    80, 0, 0, //顶点2坐标
    80, 80, 0, //顶点3坐标
    0, 60, 0, //顶点4坐标
  ]);
  // 创建属性缓冲区对象
  var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组
  // 设置几何体attributes属性的位置position属性
  geometry3.attributes.position = attribue
  var normals = new Float32Array([
    0, 0, 1, //顶点1法向量
    0, 0, 1, //顶点2法向量
    0, 0, 1, //顶点3法向量
    0, 0, 1, //顶点4法向量
  ]);
  // 设置几何体attributes属性的位置normal属性
  geometry3.attributes.normal = new THREE.BufferAttribute(normals, 3); //3个为一组,表示一个顶点的xyz坐标
  // Uint16Array类型数组创建顶点索引数据
  var indexes = new Uint16Array([
    0, 1, 2, 0, 2, 3,
  ])
  // 索引数据赋值给几何体的index属性
  geometry3.index = new THREE.BufferAttribute(indexes, 1); //1个为一组
  /**纹理坐标*/
  var uvs = new Float32Array([
    0,0, //图片左下角
    1,0, //图片右下角
    1,1, //图片右上角
    0,1, //图片左上角
  ]);
  //* 设置几何体attributes属性的位置normal属性
  geometry3.attributes.uv = new THREE.BufferAttribute(uvs, 2); //2个为一组,表示一个顶点的纹理坐标
  var textureLoader = new THREE.TextureLoader();
  // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
  
  textureLoader.load(Seal, function(texture) {
    var material = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide, //两面可见
      // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
      map: texture,//设置颜色贴图属性值
    }); //材质对象Material
    var mesh = new THREE.Mesh(geometry3, material); //网格模型对象Mesh
    // mesh.translateY(-100);
    mesh.translateX(150);
    scene.add(mesh); //网格模型添加到场景中
    render();
  });


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
