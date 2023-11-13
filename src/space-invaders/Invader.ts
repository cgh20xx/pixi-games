import { Sprite } from 'pixi.js';
import { SpaceInvadersGame } from './SpaceInvadersGame';

/**
 * 外星侵略者
 * @class
 */
export class Invader {
  // 外星人的圖
  sprit = new Sprite();
  constructor(
    public game: SpaceInvadersGame,
    x: number, // x 初始位罝
    y: number, // y 初始位罝
    type: number // 外星人造型 (0, 1, 2, 3)
  ) {}

  /**
   * 消毀 sprite
   */
  destroy() {}
}
