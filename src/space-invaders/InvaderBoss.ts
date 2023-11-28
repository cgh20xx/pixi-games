import { SpaceInvadersGame } from './SpaceInvadersGame';
import { Invader } from './Invader';
import { Point } from 'pixi.js';
import { getStageSize } from 'lib/rwd-stage';

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
   * 移動速度
   */
  velocity = new Point();

  /**
   * 旋轉時間
   */
  rotateTime = 0;

  /**
   * 旋轉角速度
   */
  rotateSpeed = 0;

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

  private attackUpdate(dt: number) {
    // 取得目前速率
    const currentSpeed = this.velocity.length();
    // 以 0.02 的速速度加快速率，最大值為 4
    const speed = Math.min(4, currentSpeed + 0.02 * dt);
    // 將速度的長度調整為新的速率
    this.velocity.normalize(speed);

    // 如果還有旋轉時間
    if (this.rotateTime > 0) {
      this.rotateTime -= dt;
      // 將速度方向以 rotateSpeed 角速度旋轉
      this.velocity.rotate(this.rotateSpeed * dt);
    }

    // 以速度的向量改變目前位置
    this.x += this.velocity.x * dt;
    this.y += this.velocity.y * dt;

    if (this.y > getStageSize().height + this.height) {
      // 如果 y 往下超出畫面下方，則進入 'back' mode
      this.goBack();
    }
  }

  private backUpdate() {}

  private removeUpdateFunctions() {
    this.game.app.ticker.remove(this.attackUpdate, this);
    this.game.app.ticker.remove(this.backUpdate, this);
  }

  /**
   * 跟著大軍移動
   */
  private async goIdle() {
    // 進入下個模式前先把更新函式從 Ticker 中移除
    this.removeUpdateFunctions();
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
    // 初始速度往上
    this.velocity.set(0, -0.2);
    // 旋轉時間: 210 ticks
    this.rotateTime = 210;
    // 旋轉角度速 (預設正值為順時針)
    this.rotateSpeed = 0.02;
    const cannon = this.game.cannon;
    if (cannon && !cannon.dead) {
      // 如果砲台在魔王右方
      if (cannon.sprite.x > this.x) {
        // 改為逆時針
        this.rotateSpeed *= -1;
      }
    } else if (Math.random() < 0.5) {
      // 如果砲台已不在，亂數決定要不要逆時針
      this.rotateSpeed *= -1;
    }
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
