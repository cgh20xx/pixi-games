import { Application, Text } from 'pixi.js';
import { useEffect, useRef } from 'react';

const Game: React.FC = () => {
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const app = new Application<HTMLCanvasElement>();
    const text = new Text('Page Game', {
      fill: ['#ff0000', '#ff00ff']
    });
    const divRefCurrent = divRef.current;
    app.stage.addChild(text);
    divRefCurrent?.appendChild(app.view);

    return () => {
      divRefCurrent?.removeChild(app.view);
      app.destroy();
    };
  }, []);
  return <div ref={divRef}></div>;
};

export default Game;
