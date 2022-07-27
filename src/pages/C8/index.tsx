import React, { useEffect, useState } from 'react';
import { Radio } from 'antd';
import TextureBasic from './TextureBasic';
import UVSys from './UVSys';
import ArrayTexture from './ArrayTexture';
import TextrueTran from './TextrueTran';
import SpiritLine from './SpiritLine';
import LightTexture from './LightTexture';

let options = [
  { label: '基础贴图', threeCore: TextureBasic },
  { label: 'UV映射', threeCore: UVSys },
  { label: '数组材质', threeCore: ArrayTexture },
  { label: '材质变换', threeCore: TextrueTran },
  { label: '精灵线', threeCore: SpiritLine },
  { label: '光照贴图', threeCore: LightTexture },
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
