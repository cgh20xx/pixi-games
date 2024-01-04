import { Application } from 'pixi.js';
import { LevelsUI } from './LevelsUI';

/**
 * 魔王城的隕落遊戲選擇頁
 */
export class CastleFalls {
  constructor(public app: Application) {
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
}
