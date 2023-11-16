import { BaseTexture, Rectangle, Sprite, Texture } from 'pixi.js';
import { SpaceInvadersGame } from './SpaceInvadersGame';
import cannonballsImage from 'images/cannonballs.png';

/**
 * 砲彈
 * @class
 */
export class CannonBall {
  // 砲彈的圖
  sprite = new Sprite();

  constructor(
    public game: SpaceInvadersGame,
    x: number,
    y: number
  ) {
    // 載入圖片、建立材質、設定精靈圖
    const baseTexture = new BaseTexture(cannonballsImage);
    const textureFrame = this.getSpriteTextureFrame();
    const texture = new Texture(baseTexture, textureFrame);
    this.sprite.texture = texture;
    // 把精靈圖放到舞台上的初始位置
    this.game.app.stage.addChildAt(this.sprite, 0);
    this.sprite.position.set(x, y);
  }

  destroy() {
    this.sprite.destroy();
  }

  get getDestroyed(): boolean {
    return this.sprite.destroyed;
  }

  protected getSpriteTextureFrame(): Rectangle {
    // 玩家砲彈的圖範圍為 4x14
    return new Rectangle(1, 0, 4, 14);
  }
}
