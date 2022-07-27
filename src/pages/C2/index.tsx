import React, { useEffect, useState } from 'react';
import { Radio } from 'antd';
import Vertices from './Vertices';
import Colors from './Colors';
import Normal from './Normal';
import VertIndex from './VertIndex';
import Geometry from './Geometry';
import Face3 from './Face3';
import Modify from './Modify';

let options = [
  { label: '顶点解析', threeCore: Vertices },
  { label: '颜色插值', threeCore: Colors },
  { label: '法向量光照', threeCore: Normal },
  { label: '索引', threeCore: VertIndex },
  { label: 'Geometry', threeCore: Geometry },
  { label: 'Face3 on Geometry', threeCore: Face3 },
  { label: '修改数据', threeCore: Modify },
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
