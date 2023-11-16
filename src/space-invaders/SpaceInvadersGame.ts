import { Application } from 'pixi.js';
import { PlayerCannon } from './PlayerCannon';
import { Invader } from './Invader';
import { WaitManager } from 'lib/WaitManager';
import { getStageSize } from 'lib/rwd-stage';

export class SpaceInvadersGame {
  /**
   * 玩家砲台
   */
  cannon: PlayerCannon;

  /**
   * 侵略者大軍
   */
  invaders: Invader[] = [];

  /**
   *  侵略者大軍的移動週期，每多少個 ticks (frames) 移動一次。
   */
  invaderMoveInterval = 20;

  /**
   * 等待管理員
   */
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
    // 大軍齊步走，每隔幾個 ticks 移動 10 個像素
    this.moveInvadersLoop(10);
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
   * @param ticks 等待的時間 ticks (frames)
   */
  wait(ticks: number): Promise<void> {
    return this.waitManager.add(ticks);
  }

  /**
   * 移動所有外星人位置
   * @param moveX 水平移動 x 距離
   * @param moveY 垂直移動 y 距離
   */
  moveInvaders(moveX: number, moveY: number): void {
    for (const invader of this.invaders) {
      invader.move(moveX, moveY);
    }
  }

  /**
   * 遞迴呼叫移動所有外星人位置，每次呼叫會等待一段時間 ticks。
   * @param moveX 水平移動 x 距離
   */
  async moveInvadersLoop(moveX: number) {
    // 等待移動週期的時間
    const delay = this.invaderMoveInterval;
    await this.wait(delay);
    // 如果還有外星人才要群體移動
    if (this.invaders.length) {
      this.moveInvaders(moveX, 0);
      if (this.invadersNeedToTurn(moveX)) {
        moveX = -moveX; // 轉向
      }
    }
    // 遞迴呼叫
    this.moveInvadersLoop(moveX);
  }

  /**
   * 是否所有外星人需要轉向？
   * @param moveX 水平移動 x 距離
   */
  private invadersNeedToTurn(moveX: number): boolean {
    // 如果大軍向右走
    if (moveX > 0) {
      // 找出最右側的外星人 (x 值最大的)
      const maxXInvader = this.invaders.reduce((maxInvader, nextInvader) => {
        if (maxInvader.x > nextInvader.x) {
          return maxInvader;
        } else {
          return nextInvader;
        }
      });
      // 回傳右側外星人的 x 是不是超出右邊界
      const edgeMax = getStageSize().width - maxXInvader.width;
      return maxXInvader.x > edgeMax;
    } else {
      // 找出最左側的外星人 (x 值最小的)
      const minXInvader = this.invaders.reduce((minInvader, nextInvader) => {
        if (minInvader.x < nextInvader.x) {
          return minInvader;
        } else {
          return nextInvader;
        }
      });
      // 回傳右側外星人的 x 是不是超出右邊界
      const edgeMin = minXInvader.width;
      return minXInvader.x < edgeMin;
    }
  }
}
