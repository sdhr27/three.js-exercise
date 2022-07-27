import React, { useEffect, useState } from 'react';
import { Radio } from 'antd';
import Basic from './LightBasic';
import Shadow from './Shadow';

let options = [
  { label: '光源基础', threeCore: Basic },
  { label: '投影', threeCore: Shadow },
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
