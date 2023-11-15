import { Application } from 'pixi.js';
import { PlayerCannon } from './PlayerCannon';
import { Invader } from './Invader';
import { WaitManager } from 'lib/WaitManager';

export class SpaceInvadersGame {
  // 玩家砲台
  cannon: PlayerCannon;
  // 侵略者大軍
  invaders: Invader[] = [];
  // 等待管理圓
  waitManager: WaitManager;

  constructor(public app: Application) {
    this.cannon = new PlayerCannon(this);
    this.createInvadersRow({
      type: 0,
      x: 120,
      y: 240,
      amount: 6
    });
    this.waitManager = new WaitManager(app.ticker);
  }

  destroy(): void {
    this.cannon.destroy();
    this.invaders.forEach(invader => invader.destroy());
  }

  /**
   * 創建一行外星人。
   * @param options 選項如下
   * @param options.type 外星人類型，可以是 0, 1, 2, 或 3。
   * @param options.x 這一排最左邊的 x 座標。
   * @param options.y 這一排的 y 座標。
   * @param options.amount 這一排外星人的總數。
   */
  private createInvadersRow(options: {
    type: 0 | 1 | 2 | 3; // 外星人類型
    x: number; // 最左邊的 x
    y: number; // 這一排的 y
    amount: number; // 總共要幾隻
  }) {
    const xInterval = 60; // x 間隔
    for (let i = 0; i < options.amount; i++) {
      const invader = new Invader(
        this,
        options.x + xInterval * i,
        options.y,
        options.type
      );
      this.invaders.push(invader);
    }
  }

  /**
   * 暫停多少時間 ticks (frames)
   * @param ticks — 等待的時間 ticks (frames)
   */
  delay(ticks: number): Promise<void> {
    return this.waitManager.add(ticks);
  }
}
