import { SpaceInvadersGame } from './SpaceInvadersGame';
import { Invader } from './Invader';

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
    this.mode = 'attack';
  }

  /**
   * 返回大軍隊伍
   */
  private goBack() {
    this.mode = 'back';
  }
}
