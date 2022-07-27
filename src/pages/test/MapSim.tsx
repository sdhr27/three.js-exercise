// @ts-ignore
// const THREE = window.THREE = require('three');
import * as THREE from 'three/build/three.module.js';
const OrbitControls = require('three-orbit-controls')(THREE);
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
import Red from './red.png';
import Blue from './blue.png';
import Arrow from './arrow.png';
import build1 from './agg.png';
import build2 from './data_process.png';
import bottom_board from './board.png';
// import bottom_board from './bottom_board.png';
import data from './data';

const { buildData } = data;

export default function () {
  /**
   * 创建场景对象Scene
   */
  var scene = new THREE.Scene();

  //* 创建一个平面几何体作为投影面
  const plane_width = 300;
  const plane_height = 500;
  var planeGeometry = new THREE.PlaneGeometry(plane_width, plane_height);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: '#01314F',
    side: THREE.DoubleSide,
    // depthTest: false,
  });
  // 平面网格模型作为投影面
  var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  planeMesh.rotateX(-Math.PI / 2); //旋转网格模型
  // planeMesh.position.y = -50; //设置网格模型y坐标
  scene.add(planeMesh); //网格模型添加到场景中

  //* 添加建筑
  buildData.forEach((build, index: number) => {
    var planeGeometry = new THREE.PlaneGeometry(plane_width - 50, 100);
    var textureLoader = new THREE.TextureLoader(); 
    const texture = textureLoader.load(bottom_board, () => render())
    var planeMaterial = new THREE.MeshLambertMaterial({
      color: '#fff',
      map: texture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
      
      // depthTest: false,
    });
    // 平面网格模型作为投影面
    const zPosition = -(-plane_height / 2 + index * 110 + 60);
    var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.rotateX(-Math.PI / 2); //旋转网格模型
    planeMesh.position.z = zPosition; //设置网格模型y坐标
    planeMesh.position.y = 1; //设置网格模型y坐标
    scene.add(planeMesh); //网格模型添加到场景中
    setTimeout(() => {
      build.children.forEach((child, childIndex) => {
        const xPosition = -plane_width/2 + 50 + childIndex * 70 + 5;
        var texture = new THREE.TextureLoader().load(getBuild(child.type), () => render());
        // 创建精灵材质对象SpriteMaterial
        var spriteMaterial = new THREE.SpriteMaterial({
          // color: '#fff',//设置精灵矩形区域颜色
          // rotation:Math.PI/4,//旋转精灵对象45度，弧度值
          // transparent: true,
          // blending: THREE.AdditiveBlending,
          map: texture,//设置精灵纹理贴图
          depthTest: false,
        });
        // 创建精灵模型对象，不需要几何体geometry参数
        var sprite = new THREE.Sprite(spriteMaterial);
        scene.add(sprite);
        // 控制精灵大小，比如可视化中精灵大小表征数据大小
        sprite.scale.set(50, 60, 1); // 只需要设置x、y两个分量就可以
        // 根据数据源渲染或自动生成坐标
        sprite.position.set(child.position?.[0] || xPosition, 20, child.position?.[1] || zPosition);
      })
    }, 0)
  })


  //* 创建运动几何体
  var texture = new THREE.TextureLoader().load(Arrow, () => render());
  // 创建精灵材质对象SpriteMaterial
  var spriteMaterial = new THREE.SpriteMaterial({
    color: '#fff',//设置精灵矩形区域颜色
    // rotation:Math.PI/4,//旋转精灵对象45度，弧度值
    transparent: true,
    // blending: THREE.AdditiveBlending,
    map: texture,//设置精灵纹理贴图
  });
  // 创建精灵模型对象，不需要几何体geometry参数
  var sprite = new THREE.Sprite(spriteMaterial);
  scene.add(sprite);
  sprite.rotateY(Math.PI / 2)
  sprite.scale.set(10, 5, 1); // 只需要设置x、y两个分量就可以
  // sprite.position.set(-10, -50, -50)
  // var box = new THREE.PlaneGeometry(3, 9);
  // var material = new THREE.MeshLambertMaterial({
  //   color: '#fff',
  //   side: THREE.DoubleSide,
  // }); //材质对象
  // var mesh = new THREE.Mesh(box, material);
  // scene.add(mesh);
  // mesh.rotateX(Math.PI / 2)
  // mesh.position.set(-10, -50, -50)
  //* 创建轨迹
  const pointList2 = [
    [0,5,-100],
    // [30,5,-15],
    [50,5,50],
    [50,5,200]
  ]
  // var textureLoader = new THREE.TextureLoader(); 
  // const texture2 = textureLoader.load(Blue, () => render())

  // texture2.wrapS = texture2.wrapT = THREE.RepeatWrapping; //每个都重复
  // texture2.repeat.set(1, 1)
  // texture2.repeat.x = 20;

  const  material2 = new THREE.MeshBasicMaterial({
    // map:texture2,
    color: '#01314F',
    // side:THREE.BackSide,
    // transparent:true
  })

  const l: any = [];
  const ls = getL(pointList2);
  pointList2.forEach((e: any) => l.push(new THREE.Vector3(e[0], e[1], e[2])))
  // curve = new THREE.CatmullRomCurve3(l) // 曲线路径
  var CurvePath = new THREE.CurvePath();// 创建CurvePath对象
  ls.forEach((line: any[][]) => {
    CurvePath.curves.push(new THREE.LineCurve3(...line));// 插入多段线条
  })
  const curve = CurvePath // 直线路径
  const geo = new THREE.Geometry()
  // geo.vertices = curve.getPoints(option.number || 50)
  var points = curve.getPoints(100)
  geo.setFromPoints(points);
  var line = new THREE.Line(geo, material2);
  scene.add(line);//旋转网格模型添加到场景中

  //* 通过Threejs的帧动画相关API播放网格模型沿着曲线做动画运动
  // 声明一个数组用于存储时间序列
  let arr = []
  for (let i = 0; i < points.length; i++) {
    arr.push(i)
  }
  // 生成一个时间序列
  var times = new Float32Array(arr);

  var posArr: any[] = []
  points.forEach((elem: any) => {
    posArr.push(elem.x, elem.y, elem.z)
  });
  
  // 创建一个和时间序列相对应的位置坐标系列
  var values = new Float32Array(posArr);

  // 创建一个帧动画的关键帧数据，曲线上的位置序列对应一个时间序列
  var posTrack = new THREE.KeyframeTrack('.position', times, values);
  let duration = points.length;
  let clip = new THREE.AnimationClip("default", duration, [posTrack]);
  var mixer = new THREE.AnimationMixer(sprite);

  let AnimationAction = mixer.clipAction(clip);
  AnimationAction.timeScale = 200;
  AnimationAction.play();


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
  // var axisHelper = new THREE.AxisHelper(250);
  // scene.add(axisHelper);
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
   * 创建渲染器对象
   */
  
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

  renderer.setSize(width, height);//设置渲染区域尺寸
  renderer.setClearColor('#100A20', 1); //设置背景颜色
  // document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
  //执行渲染操作   指定场景、相机作为参数
  var controls = initControls(scene,camera,renderer)
  // 创建一个时钟对象Clock
  const clock = new THREE.Clock()
  function render() {
    renderer.render( scene,camera)
    requestAnimationFrame(render)
    controls.update(clock.getDelta())
    // 更新帧动画的时间
    mixer.update(clock.getDelta());
  }

  render();

  // var controls = new OrbitControls(camera,renderer.domElement);//创建控件对象
  // controls.addEventListener('change', render);//监听鼠标、键盘事件

  
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
  return renderer;
}

// @ts-ignore
function getSphereHeightPoints (v0, v3, n1, n2, p0) {
  // 夹角
  const angle = (v0.angleTo(v3) * 180) / Math.PI / 10 // 0 ~ Math.PI
  const aLen = angle * (n1 || 10)
  const hLen = angle * angle * (n2 || 120)
  p0 = p0 || new THREE.Vector3(0, 0, 0) // 默认以 坐标原点为参考对象
  // 法线向量
  const rayLine = new THREE.Ray(p0, v0.clone().add(v3.clone()).divideScalar(2))
  // 顶点坐标
  const vtop = rayLine.at(hLen / rayLine.at(1).distanceTo(p0))
  // 计算制高点
  // @ts-ignore
  const getLenVector = (v1, v2, len) => v1.lerp(v2, len / v1.distanceTo(v2))
  // 控制点坐标
  return [getLenVector(v0.clone(), vtop, aLen), getLenVector(v3.clone(), vtop, aLen)]

}

// @ts-ignore
function createAnimateLine(option) {
  let curve
  if (option.kind === 'sphere') { // 由两点之间连线成贝塞尔曲线
      const sphereHeightPointsArgs = option.sphereHeightPointsArgs
      // @ts-ignore
      const pointList = getSphereHeightPoints(...sphereHeightPointsArgs) // v0,v3,n1,n2,p0
      curve = new THREE.CubicBezierCurve3(sphereHeightPointsArgs[0], pointList[0], pointList[1], sphereHeightPointsArgs[1])
  } else { // 由多个点数组构成的曲线 通常用于道路
      const l: any = [];
      const ls = getL(option.pointList);
      option.pointList.forEach((e: any) => l.push(new THREE.Vector3(e[0], e[1], e[2])))
      // curve = new THREE.CatmullRomCurve3(l) // 曲线路径
      var CurvePath = new THREE.CurvePath();// 创建CurvePath对象
      ls.forEach((line: any[][]) => {
        CurvePath.curves.push(new THREE.LineCurve3(...line));// 插入多段线条
      })
      curve = CurvePath // 直线路径
      // curve = new THREE.LineCurve3(...l)
  }
  if (option.type === 'pipe') { // 使用管道线
      // 管道体
      const tubeGeometry = new THREE.TubeGeometry(curve, option.number || 50, option.radius || 0.5, option.radialSegments)
      return new THREE.Mesh(tubeGeometry, option.material)
  } else { // 使用 meshLine
      if (!MeshLine || !MeshLineMaterial) console.error('you need import MeshLine & MeshLineMaterial!')
      else {
          const geo = new THREE.Geometry()
          // geo.vertices = curve.getPoints(option.number || 50)
          var points = curve.getPoints(option.number || 50)
          geo.setFromPoints(points);

          //* 通过Threejs的帧动画相关API播放网格模型沿着曲线做动画运动
          // 声明一个数组用于存储时间序列
          let arr = []
          for (let i = 0; i < 101; i++) {
            arr.push(i)
          }
          // 生成一个时间序列
          var times = new Float32Array(arr);

          var posArr: any[] = []
          points.forEach((elem: any) => {
            posArr.push(elem.x, elem.y, elem.z)
          });
          // 创建一个和时间序列相对应的位置坐标系列
          var values = new Float32Array(posArr);
          // 创建一个帧动画的关键帧数据，曲线上的位置序列对应一个时间序列
          var posTrack = new THREE.KeyframeTrack('.position', times, values);
          let duration = 101;
          let clip = new THREE.AnimationClip("default", duration, [posTrack]);
          var mixer = new THREE.AnimationMixer(option.mesh);
          let AnimationAction = mixer.clipAction(clip);
          AnimationAction.timeScale = 20;
          AnimationAction.play();

          // var material = new THREE.LineBasicMaterial({
          //   color: '#100A20',
          //   map: option.material,
          //   transparent: true,
          // });
          //线条模型对象
          var line = new THREE.Line(geo, option.material);
          return line;
          // const meshLine = new MeshLine()
          // meshLine.setGeometry(geo)
          // return new THREE.Mesh(meshLine.geometry, option.material)
      }
  }
}

function initControls(scene: any, camera: any, renderer: any) {
  const controls = new OrbitControls( camera, renderer.domElement );
  // 如果使用animate方法时，将此函数删除
  controls.addEventListener( 'change', ()=>{
      renderer.render( scene, camera );
  });
  return controls
}

function getBuild(type: string) {
  switch (type) {
    case 'build1':
      return build1;
    case 'build2':
      return build2;
    default:
      return build1;
  }
}

function getL(data: any[][]) {
  const arr: any[][][] = []
  data.forEach((itm, index) => {
    if(data[index + 1] instanceof Array && (itm instanceof Array)) {
      const next = data[index + 1];
      const v1: any[] = new THREE.Vector3(itm[0], itm[1], itm[2]);
      const v2: any[] = new THREE.Vector3(next[0], next[1], next[2]);
      arr.push([v1, v2])
    }

  });
  return arr;
}
