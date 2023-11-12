import { BaseTexture, Sprite, Texture } from 'pixi.js';
import { SpaceInvadersGame } from './SpaceInvadersGame';
import cannonImage from 'images/cannon.png';

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

  constructor(game: SpaceInvadersGame) {
    /**
     * BaseTexture 材質基底：是實際掌握圖片每個像素的資料擁有者。
     *
     * Texture 材質：由一個 BaseTexture 及一個矩形範圍組成的物件，代表材質基底上的某一塊區域。
     *
     * Sprite 精靈圖：內含一個 Texture，用來將材質畫到畫布上的繪圖器。
     */

    // 載入圖片
    const baseTexture = BaseTexture.from(cannonImage);
    // 建立材質
    const texture = Texture.from(baseTexture);
    // 新增砲台 Sprite
    this.sprite.texture = texture;
    // 以上三行可簡化為 Sprite.from(cannonImage) 是一樣的。

    // 把 Sprite 放到舞台上
    game.app.stage.addChild(this.sprite);
  }

  /**
   * 消毀砲台的 sprite
   */
  destroy(): void {
    this.sprite.destroy();
  }
}
