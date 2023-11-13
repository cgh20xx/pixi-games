import { BaseTexture, Rectangle, Sprite, Texture } from 'pixi.js';
import { SpaceInvadersGame } from './SpaceInvadersGame';
import invadersImage from 'images/invaders.png';

/**
 * 外星侵略者
 * @class
 */
export class Invader {
  // 外星人的圖
  sprite = new Sprite();
  constructor(
    public game: SpaceInvadersGame,
    x: number, // x 初始位罝
    y: number, // y 初始位罝
    type: number // 外星人造型 (0, 1, 2, 3)
  ) {
    // 載入圖片 (250x34)
    const baseTexture = BaseTexture.from(invadersImage);
    // 建立對應外星人的材質切片 (50x34)
    const imageRect = new Rectangle(50 * type, 0, 50, 34);
    const texture = new Texture(baseTexture, imageRect);
    // 指定精靈圖的材質
    this.sprite.texture = texture;
    // 把精靈圖放到舞台上
    game.app.stage.addChild(this.sprite);
    // 移到初始位置
    this.sprite.position.set(x, y);
    // 依流程調整圖片軸心
    if (baseTexture.valid) {
      this.adjustPivot();
    } else {
      baseTexture.on('loaded', () => this.adjustPivot());
    }
  }

  /**
   * 消毀 sprite
   */
  destroy() {
    this.sprite.destroy();
  }

  /**
   * 調整圖片的軸心位置 (置中)
   */
  private adjustPivot(): void {
    this.sprite.pivot.set(this.sprite.width / 2, this.sprite.height / 2);
  }
}
