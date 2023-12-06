import { Application } from 'pixi.js';
import { initApp, setStageSize, refreshCanvasAndStage } from 'lib/rwd-stage';
import { useEffect, useRef } from 'react';
import { MonsterRaidersGame } from 'monster-raiders/MonsterRaidersGame';
import { startMouseTracker } from 'lib/PixiMouseUtils';

const MonsterRaiders: React.FC = () => {
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const app = new Application<HTMLCanvasElement>();
    app.ticker.maxFPS = 60;
    initApp(app);
    setStageSize(640, 480); // setStageSize() 後要手動 refreshCanvasAndStage()
    refreshCanvasAndStage(app);
    startMouseTracker(app); // 啟動滑鼠跟蹤器
    new MonsterRaidersGame(app);
    const divRefCurrent = divRef.current;
    divRefCurrent?.appendChild(app.view);
    // 偵聽視窗的 resize 事件
    function resizeHandler() {
      refreshCanvasAndStage(app);
    }
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
      divRefCurrent?.removeChild(app.view);
      app.destroy();
    };
  }, []);
  return <div ref={divRef}></div>;
};

export default MonsterRaiders;
