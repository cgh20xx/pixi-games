import { Application } from 'pixi.js';
import { PlayerCannon } from './PlayerCannon';
import { Invader } from './Invader';
import { WaitManager } from 'lib/WaitManager';
import { getStageSize } from 'lib/rwd-stage';
import { ArrayUtils } from 'lib/ArrayUtils';
import invadersMoveSound from 'sounds/invadersMove.wav';
import { playSound } from 'lib/SoundUtils';
import { InvaderBullet } from './InvaderBullet';
import { SpaceInvadersUI } from './SpaceInvadersUI';
import { SpaceInvadersGameOver } from './SpaceInvadersGameOver';

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
   * 侵略者大軍的移動週期，每多少個 ticks (frames) 移動一次。
   */
  invaderMoveInterval = 20;

  /**
   * 侵略者大軍的攻擊週期，每多少個 ticks (frames) 攻擊一次。
   */
  invaderShootInterval = 90; // 一般 60 ticks 約 1 秒

  /**
   * 等待管理員
   */
  waitManager: WaitManager;

  /**
   * 遊戲是否被銷毀
   */
  destroyed = false;

  /**
   * 遊戲介面
   */
  ui = new SpaceInvadersUI(this);

  /**
   * 關卡
   */
  level = 1;

  constructor(public app: Application) {
    this.cannon = new PlayerCannon(this);
    this.waitManager = new WaitManager(app.ticker);
    // 開始關卡一
    this.startLevel(1);
    // 大軍齊步走，每隔幾個 ticks 移動 10 個像素
    this.moveInvadersLoop(10);
    // 大軍攻擊循環
    this.invadersAttackLoop();
    // 將 UI 加到舞台上
    app.stage.addChild(this.ui);
  }

  destroy(): void {
    this.cannon.destroy();
    this.invaders.forEach(invader => invader.destroy());
    this.ui.destroy(); // ui container 被 destroy 也會 destroy 所有的 children
    this.destroyed = true;
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
   * 依關卡建立所有外星人，關卡越高數量越多。
   * @param level 關卡
   */
  createInvadersByLevel(level: number) {
    this.createInvadersRow({
      type: 0, // 外形 1
      x: 40,
      y: 240,
      amount: Math.min(10, 5 + level)
    });
    this.createInvadersRow({
      type: 1, // 外形 2
      x: 70,
      y: 200,
      amount: Math.min(10, 4 + level)
    });
    this.createInvadersRow({
      type: 2, // 外形 3
      x: 100,
      y: 160,
      amount: Math.min(10, 3 + level)
    });
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
    playSound(invadersMoveSound, { volume: 0.2 });
    for (const invader of this.invaders) {
      invader.move(moveX, moveY);
    }
  }

  /**
   * 遞迴呼叫移動所有外星人位置，每次呼叫會等待一段時間 ticks。
   * @param moveX 水平移動 x 距離
   */
  async moveInvadersLoop(moveX: number) {
    if (this.destroyed) {
      // 離開函式，不再進入下個循環
      return;
    }
    // 等待移動週期的時間
    const delay = this.invaderMoveInterval;
    await this.wait(delay);
    // 如果還有外星人才要群體移動
    if (this.invaders.length) {
      this.moveInvaders(moveX, 0);
      if (this.invadersNeedToTurn(moveX)) {
        if (this.invadersNeedToGoDown()) {
          await this.wait(delay);
          this.moveInvaders(0, 20); // 向下移動
        }
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
      // 回傳左側外星人的 x 是不是超出左邊界
      const edgeMin = minXInvader.width;
      return minXInvader.x < edgeMin;
    }
  }

  /**
   * 是否所有外星人要向下移動？
   */
  private invadersNeedToGoDown(): boolean {
    // 找出最下方的外星人 (y 值最大的)
    const maxYInvader = this.invaders.reduce((maxInvader, nextInvader) => {
      if (maxInvader.y > nextInvader.y) {
        return maxInvader;
      } else {
        return nextInvader;
      }
    });
    // 回傳最下方外星人的 y 是不是要向下移動
    const edgeMax = getStageSize().height - maxYInvader.height;
    return maxYInvader.y < edgeMax;
  }

  /**
   * 移除並毀滅外星人
   * @param invader 外星人
   */
  async hitAndRemoveInvader(invader: Invader) {
    // 擊中一隻外星人得 10 分
    this.ui.addScore(10);
    // 把外星人從陣列中移除
    ArrayUtils.removeItem(this.invaders, invader);
    // 讓外星人顯示毀滅動畫並自我清除
    await invader.dead();
    // 如果外星人全滅，則進入下一關
    if (!this.invaders.length) {
      this.startLevel(this.level + 1);
    }
  }

  /**
   * 遞迴呼叫所有外星人選一隻來發動攻擊，每次呼叫會等待一段時間 ticks。
   */
  async invadersAttackLoop() {
    if (this.destroyed) {
      // 如果遊戲已滅，離開函式，不再進入下個循環
      return;
    }
    // 等待攻擊的間隔
    const delay = this.invaderShootInterval;
    await this.wait(delay);
    // 如果還有外星人才要發動攻擊
    if (this.invaders.length) {
      // 從大軍中隨機挑一位外星人發動攻擊
      const invader = ArrayUtils.getRandomItem(this.invaders);
      // 從外星人的位置發射
      new InvaderBullet(this, invader.x, invader.y);
    }
    // 遞迴呼叫
    this.invadersAttackLoop();
  }

  /**
   * 處理玩家砲台被擊中的函式
   */
  async hitPlayerCannon(): Promise<void> {
    await this.cannon.hitAndDead();
    // 多等 60 個 ticks (約 1 秒)
    await this.wait(60);
    // 檢查目前剩餘生命是否大於 0
    const currentLives = this.ui.getLives();
    if (currentLives > 0) {
      // 重建一座新砲台
      this.cannon = new PlayerCannon(this);
      // 更新剩餘生命數
      this.ui.setLives(currentLives - 1);
    } else {
      // GameOver
      console.log('GameOver');
      const gameOver = new SpaceInvadersGameOver(this);
      this.app.stage.addChild(gameOver);
    }
  }

  /**
   * 關卡開始
   * @param level 關卡
   */
  async startLevel(level: number): Promise<void> {
    this.level = level;
    // 關卡開始動畫
    await this.ui.showLevel(level);
    // 依關卡建立所有外星人
    this.createInvadersByLevel(level);
    // 依關卡設定關卡難度
    this.invaderMoveInterval = Math.max(
      10,
      this.invaderMoveInterval + 1 - level
    ); // 最低 10
    this.invaderShootInterval = Math.max(
      30,
      this.invaderShootInterval + 1 - level
    ); // 最低 30
  }
}
