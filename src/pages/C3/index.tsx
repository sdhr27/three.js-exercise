import React, { useEffect, useState } from 'react';
import { Radio } from 'antd';
import Intro from './TextureIntro';
import Models from './PtLnMsModels';
import Clone from './Clone';

let options = [
  { label: '常见材质', threeCore: Intro },
  { label: '点线面模型', threeCore: Models },
  { label: '复制', threeCore: Clone },
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

export default C1;
