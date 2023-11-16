import { BaseTexture, Rectangle, Sprite, Texture } from 'pixi.js';
import { SpaceInvadersGame } from './SpaceInvadersGame';
import cannonballsImage from 'images/cannonballs.png';
import { Invader } from './Invader';

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
    // 把砲彈移動函式加到 Ticker 裡
    game.app.ticker.add(this.moveUpdate, this);
  }

  destroy() {
    this.sprite.destroy();
    this.game.app.ticker.remove(this.moveUpdate, this);
  }

  get getDestroyed(): boolean {
    return this.sprite.destroyed;
  }

  protected getSpriteTextureFrame(): Rectangle {
    // 玩家砲彈的圖範圍為 4x14
    return new Rectangle(1, 0, 4, 14);
  }
  /**
   * 砲彈移動的更新函式
   * @param dt 經過時間
   */
  moveUpdate(dt: number) {
    const speed = 4;
    this.sprite.y -= speed * dt;
    // 往上超出舞台範圍時，刪除自己
    if (this.sprite.y < -this.sprite.height) {
      this.sprite.destroyed || this.destroy();
    } else {
      // 取得被撞到的外星人
      const hitInvader = this.hitTestInvaders();
      // 如果有找到被撞到的外星人
      if (hitInvader) {
        // 呼叫 game 裡處理毀滅外星人的函式
        this.game.hitAndRemoveInvader(hitInvader);
        // 再把砲彈自己也銷毀
        this.destroy();
      }
    }
  }

  /**
   * 砲彈的碰撞檢測函式
   * 回傳被打到的外星人
   */
  hitTestInvaders(): Invader | undefined {
    const bounds = this.sprite.getBounds();
    return this.game.invaders.find(invader => {
      return invader.sprite.getBounds().intersects(bounds);
    });
  }
}
