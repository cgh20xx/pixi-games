import { Application } from 'pixi.js';
import { LevelsUI } from './LevelsUI';
import { CastleFallsGame } from './CastleFallsGame';
import { WaitManager } from 'lib/WaitManager';
import { Tween } from '@tweenjs/tween.js';
import { CastleFallsRecord } from './CastleFallsRecord';

/**
 * 魔王城的隕落遊戲選擇頁
 */
export class CastleFalls {
  /**
   * 遊戲本體
   */
  game?: CastleFallsGame;

  /**
   * 等待管理員
   */
  waitManager: WaitManager;

  /**
   * 遊戲進度的記錄物件
   */
  record = new CastleFallsRecord();

  constructor(public app: Application) {
    this.waitManager = new WaitManager(app.ticker);
    // 一開始要先打開選關畫面
    this.openLevelsUI();
  }

  /**
   * 打開選關畫面
   */
  openLevelsUI() {
    const ui = new LevelsUI(this);
    this.app.stage.addChild(ui);
  }

  /**
   * 開始遊戲關卡
   * @param level 關卡
   */
  startGame(level: number) {
    this.game = new CastleFallsGame(this, level);
    this.app.stage.addChild(this.game);
  }

  /**
   * 暫停多少時間 ticks (frames)
   * @param ticks 等待的時間 ticks (frames)
   */
  wait(ticks: number): Promise<void> {
    return this.waitManager.add(ticks);
  }

  /**
   * 等待 Tween 播放完畢
   * @param tween Tween 實例
   * @returns Promise
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  waitForTween(tween: Tween<any>) {
    return new Promise(resolve => {
      tween.onComplete(resolve);
    });
  }
}
