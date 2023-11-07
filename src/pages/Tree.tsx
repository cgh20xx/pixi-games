import { Application } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { TreeGenerator } from 'tree-generator/TreeGenerator';

const Tree: React.FC = () => {
  const pixiAppRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('tree useEffect');
    const app = new Application<HTMLCanvasElement>();
    new TreeGenerator(app);
    pixiAppRef.current?.appendChild(app.view);

    return () => {
      console.log('tree destroy');
      app.destroy();
    };
  }, []);
  return <div ref={pixiAppRef}></div>;
};

export default Tree;
