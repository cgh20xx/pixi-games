import { Sprite } from 'pixi.js';
import { SpaceInvadersGame } from './SpaceInvadersGame';

/**
 * 玩家砲台
 * @class
 */
export class PlayerCannon {
  // 砲台的圖
  sprite = new Sprite();
  // 砲台的移動速度 (pixel / tick)
  moveSpeed = 1;
  // 射擊冷卻時間 (tick)
  shootCoolDown = 0;

  constructor(game: SpaceInvadersGame) {}

  /**
   * 消毀砲台的 sprite
   */
  destroy(): void {
    this.sprite.destroy();
  }
}
