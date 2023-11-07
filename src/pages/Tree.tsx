import { Application } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { TreeGenerator } from 'tree-generator/TreeGenerator';

const Tree: React.FC = () => {
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const app = new Application<HTMLCanvasElement>();
    const treeGenerator = new TreeGenerator(app);
    const divRefCurrent = divRef.current;
    console.log({ treeGenerator });
    divRefCurrent?.appendChild(app.view);

    return () => {
      divRefCurrent?.removeChild(app.view);
      app.destroy();
    };
  }, []);
  return <div ref={divRef}></div>;
};

export default Tree;
