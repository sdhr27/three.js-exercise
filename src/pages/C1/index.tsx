import React, { useEffect, useState } from 'react';
import { Radio } from 'antd';
import First from './First';
import Rotate from './Rotate';
import MouseControl from './MouseControl';
import InsertObj from './InsertObj';
import Texture from './Texture';

let options = [
  { label: 'First', threeCore: First },
  { label: '旋转动画', threeCore: Rotate },
  { label: '鼠标控制', threeCore: MouseControl },
  { label: '插入几何体', threeCore: InsertObj },
  { label: '材质', threeCore: Texture },
];
options = options.map((item, index) => {
  return {
    ...item,
    value: String(index + 1),
  }
})
options.reverse();

function C1() {
  const [target, setTarget] = useState(String(options.length));
  useEffect(() => {
    const container = document.getElementsByClassName('threeContainer')[0];
    if(container) {
      const canvas = document.getElementsByTagName('canvas')[0];
      if(canvas) {
        container.removeChild(canvas);
      }
      const threeCore = options.find((item: any) => item.value === target)?.threeCore;
      const renderer = threeCore?.() || {};
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

export default C1;
