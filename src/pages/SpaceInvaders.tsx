import { Application } from 'pixi.js';
import { initApp, setStageSize, refreshCanvasAndStage } from 'lib/rwd-stage';
import { useEffect, useRef } from 'react';
import { SpaceInvadersGame } from 'space-invaders/SpaceInvadersGame';

const Tree: React.FC = () => {
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const app = new Application<HTMLCanvasElement>();
    app.ticker.maxFPS = 60;
    initApp(app);
    setStageSize(640, 480); // setStageSize() 後要手動 refreshCanvasAndStage()
    refreshCanvasAndStage(app);
    const spaceInvadersGame = new SpaceInvadersGame(app);
    console.log({ spaceInvadersGame });
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
