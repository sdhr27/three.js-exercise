import React, { useState } from 'react';
import { Radio } from 'antd';
import C1 from './C1';
import C2 from './C2';
import C3 from './C3';
import C5 from './C5';
import C6 from './C6';
import C7 from './C7';
import C8 from './C8';
import C9 from './C9';
import C10 from './C10';
import C11 from './C11';
import Test from './test';
import './index.less';


let options = [
  { label: '第一章 新手上路', component: <C1 /> },
  { label: '第二章 顶点概念', component: <C2 /> },
  { label: '第三、四章 材质与模型', component: <C3 /> },
  { label: '第五章 光源', component: <C5 /> },
  { label: '第六章 层级模型', component: <C6 /> },
  { label: '第七章 几何体', component: <C7 /> },
  { label: '第八章 材质', component: <C8 /> },
  { label: '第九章 相机', component: <C9 /> },
  { label: '第十章 精灵', component: <C10 /> },
  { label: '第十一章 动画', component: <C11 /> },
  { label: '数据地图模拟', component: <Test /> },
];
options = options.map((item, index) => {
  return {
    ...item,
    value: `C${index + 1}`,
  }
})
options.reverse();

function App() {
  const [fatarget, setFaTarget] = useState(`C${options.length}`);

  function onChangeFa(e: any) {
    setFaTarget(e.target.value);
  }

  function renderGL() {
    return options.find((item: any) => item.value === fatarget)?.component ||
    <div>渲染错误</div>;
  }

  return (
    <div className="App">
        <header>
          three.js test
        </header>
        <Radio.Group
          options={options}
          onChange={onChangeFa}
          value={fatarget}
          optionType="button"
          buttonStyle="solid"
        />
        {renderGL()}
    </div>
  );
}

export default App;
