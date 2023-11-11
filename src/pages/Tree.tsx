import { Application } from 'pixi.js';
import { initApp, setStageSize, refreshCanvasAndStage } from 'lib/rwd-stage';
import { useEffect, useRef } from 'react';
import { TreeGenerator } from 'tree-generator/TreeGenerator';

const Tree: React.FC = () => {
  console.log('Tree FC');
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log('useEffect');
    const app = new Application<HTMLCanvasElement>();
    // app.ticker.minFPS = 1;
    app.ticker.maxFPS = 60;
    initApp(app);
    setStageSize(640, 480); // setStageSize() 後要手動 refreshCanvasAndStage()
    refreshCanvasAndStage(app);
    const treeGenerator = new TreeGenerator(app);
    console.log({ treeGenerator });
    divRef.current?.appendChild(app.view);
    // 偵聽視窗的 resize 事件
    function resizeHandler() {
      refreshCanvasAndStage(app);
    }
    window.addEventListener('resize', resizeHandler);
    return () => {
      app.destroy();
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);
  return <div ref={divRef}></div>;
};

export default Tree;
