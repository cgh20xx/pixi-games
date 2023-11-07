import { Application, Text } from 'pixi.js';
import { useEffect, useRef } from 'react';

const Game: React.FC = () => {
  const pixiAppRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const app = new Application<HTMLCanvasElement>();
    const text = new Text('Page Game', {
      fill: ['#ff0000', '#ff00ff']
    });
    app.stage.addChild(text);
    pixiAppRef.current?.appendChild(app.view);

    return () => {
      app.destroy();
    };
  }, []);
  return <div ref={pixiAppRef}></div>;
};

export default Game;
