import { Container, Texture, TilingSprite } from 'pixi.js';
import { MonsterRaidersGame } from './MonsterRaidersGame';
import starrySpaceImg from 'images/starry-space.png';
import { getStageSize } from 'lib/rwd-stage';

/**
 * 星空循環背景
 */
export class Background extends Container {
  /**
   * 星空 TilingSprite
   * @see https://pixijs.com/examples/sprite/tiling-sprite
   */
  starrySprite: TilingSprite;

  constructor(public game: MonsterRaidersGame) {
    super();
    // 黑底星空
    const texture = Texture.from(starrySpaceImg);
    this.starrySprite = new TilingSprite(
      texture,
      getStageSize().width,
      getStageSize().height
    );
    this.addChild(this.starrySprite);
    this.starrySprite.tileScale.set(0.2);
    // 將 Background 加入遊戲容器的最底層
    game.addChildAt(this, 0);
  }
}
