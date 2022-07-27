import React, { useEffect, useState } from 'react';
import { Radio } from 'antd';
import Curve from './Curve';
import SPCurve from './SPCurve';
import CurvePath from './CurvePath';
import TubeGeometry from './TubeGeometry';
import LatheGeometry from './LatheGeometry';
import ShapeGeometry from './ShapeGeometry';
import ExtrudeGeometry from './ExtrudeGeometry';

let options = [
  { label: '圆弧线', threeCore: Curve },
  { label: '不规则弧线', threeCore: SPCurve },
  { label: '组合曲线', threeCore: CurvePath },
  { label: '曲径管道', threeCore: TubeGeometry },
  { label: '旋转造型', threeCore: LatheGeometry },
  { label: '轮廓填充', threeCore: ShapeGeometry },
  { label: '拉伸扫描', threeCore: ExtrudeGeometry },
];
options = options.map((item, index) => {
  return {
    ...item,
    value: String(index + 1),
  }
})
options.reverse();

function C5() {
  const [target, setTarget] = useState(String(options.length));
  useEffect(() => {
    const container = document.getElementsByClassName('threeContainer')[0];
    if(container) {
      const canvas = document.getElementsByTagName('canvas')[0];
      if(canvas) {
        container.removeChild(canvas);
      }
      const threeCore = options.find((item: any) => item.value === target)?.threeCore;
      const renderer = threeCore?.();
      if(renderer) {
        container.appendChild(renderer.domElement); //body元素中插入canvas对象
      }
    }

  }, [target]);
  

  function onChange(e: any) {
    setTarget(e.target.value);
  }

  return (
    <div>
      <Radio.Group
        options={options}
        onChange={onChange}
        value={target}
        optionType="button"
      />
      <div className="threeContainer" />
    </div>
  );
}

export default C5;
