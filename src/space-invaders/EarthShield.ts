import { Graphics } from 'pixi.js';
import { SpaceInvadersGame } from './SpaceInvadersGame';
import { ArrayUtils } from 'lib/ArrayUtils';

/**
 * 地球護盾
 * @class
 */
export class EarthShield extends Graphics {
  constructor(
    public game: SpaceInvadersGame,
    x: number,
    y: number
  ) {
    super();
    this.beginFill(0xcccc00);
    this.drawRect(-10, -10, 20, 20);
    this.endFill();
    this.position.set(x, y);
  }

  /**
   * 被子彈打中時要呼叫的函式
   */
  onHit() {
    this.alpha -= 0.25;
    if (this.alpha <= 0) {
      this.destroy();
      ArrayUtils.removeItem(this.game.shields, this);
    }
  }
}
