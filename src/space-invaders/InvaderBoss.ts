import { SpaceInvadersGame } from './SpaceInvadersGame';
import { Invader } from './Invader';
import { Point } from 'pixi.js';

/**
 * 外星魔王
 * @class
 */
export class InvaderBoss extends Invader {
  /**
   * 目前的行為模式，只能指定 idle 或 attack
   * @default idle 跟隨大軍移動
   */
  mode: 'idle' | 'attack' | 'back' = 'idle';

  /**
   * 記錄魔王在大軍群體中的位置
   */
  posInFlock = new Point();

  /**
   *
   * @param game SpaceInvadersGame instance
   * @param x 初始位罝 x
   * @param y 初始位罝 y
   */
  constructor(
    public game: SpaceInvadersGame,
    x: number,
    y: number
  ) {
    // 魔王造形固定為 3
    super(game, x, y, 3);
    this.posInFlock.set(x, y);
    this.goIdle();
  }

  private attackUpdate() {}

  private backUpdate() {}

  private removeUpdateFunctions() {
    this.game.app.ticker.remove(this.attackUpdate, this);
    this.game.app.ticker.remove(this.backUpdate, this);
  }

  /**
   * 跟著大軍移動
   */
  private async goIdle() {
    this.mode = 'idle';
    await this.game.wait(300);
    if (!this.destroyed) {
      this.goAttack();
    }
  }

  /**
   * 離開大軍發動攻擊
   */
  private goAttack() {
    // 進入下個模式前先把更新函式從 Ticker 中移除
    this.removeUpdateFunctions();
    this.mode = 'attack';
    this.game.app.ticker.add(this.attackUpdate, this);
  }

  /**
   * 返回大軍隊伍
   */
  private goBack() {
    // 進入下個模式前先把更新函式從 Ticker 中移除
    this.removeUpdateFunctions();
    this.mode = 'back';
    this.game.app.ticker.add(this.backUpdate, this);
  }

  /**
   * 銷滅魔王
   * @override
   */
  destroy(): void {
    super.destroy();
    this.removeUpdateFunctions();
  }

  /**
   * 移動魔王位置 (改寫 Invader.move())
   * @param moveX 水平移動 x 距離
   * @param moveY 垂直移動 y 距離
   * @override
   */
  move(moveX: number, moveY: number): void {
    // 非 idle 模式，紀錄原應在大軍的位置
    this.posInFlock.x += moveX;
    this.posInFlock.y += moveY;
    if (this.mode === 'idle') {
      // idle 模式中，隨著大軍移動
      this.x = this.posInFlock.x;
      this.y = this.posInFlock.y;
    }
  }
}
