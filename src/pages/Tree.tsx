import { app, setStageSize, refreshCanvasAndStage } from 'basic/rwd-stage';
import { useEffect, useRef } from 'react';
import { TreeGenerator } from 'tree-generator/TreeGenerator';

const Tree: React.FC = () => {
  console.log('Tree FC');
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log('useEffect');
    setStageSize(640, 480);
    const treeGenerator = new TreeGenerator(app);
    console.log({ treeGenerator });
    const divRefCurrent = divRef.current;
    divRefCurrent?.appendChild(app.view);
    // 偵聽視窗的 resize 事件
    window.addEventListener('resize', refreshCanvasAndStage);
    return () => {
      // window.removeEventListener('resize', refreshCanvasAndStage);
    };
  }, []);
  return <div ref={divRef}></div>;
};

export default Tree;
