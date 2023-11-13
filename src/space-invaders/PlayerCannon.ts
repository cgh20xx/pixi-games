import { BaseTexture, Sprite, Texture } from 'pixi.js';
import { SpaceInvadersGame } from './SpaceInvadersGame';
import cannonImage from 'images/cannon.png';
import { getStageSize } from 'lib/rwd-stage';
import { keyboardManager } from 'lib/keyboard/KeyboardManager';
import { KeyCode } from 'lib/keyboard/KeyCode';

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

    // 依流程調整圖片軸心 (先檢查 baseTexture.valid 是否已經載入圖片完畢，若未載入完成圖片寬高會是 1)
    if (baseTexture.valid) {
      this.adjustPivot();
    } else {
      baseTexture.once('loaded', () => this.adjustPivot());
    }

    // 把 Sprite 放到舞台上
    game.app.stage.addChild(this.sprite);
    // 調整砲台到畫面底部的中央
    const stageSize = getStageSize();
    this.sprite.position.set(stageSize.width / 2, stageSize.height);

    // 開始進行砲台移動
    game.app.ticker.add(this.moveUpdate, this);
  }

  /**
   * 消毀砲台的 sprite
   */
  destroy(): void {
    this.sprite.destroy();
  }

  /**
   * 調整圖片的軸心位置 (底部 & 左右置中)
   */
  private adjustPivot(): void {
    this.sprite.pivot.set(this.sprite.width / 2, this.sprite.height);
  }

  /**
   * 砲台移動的更新函式
   * @param deltaTime 經過時間
   */
  private moveUpdate(deltaTime: number): void {
    const sprite = this.sprite;
    let x = sprite.x;
    const distance = this.moveSpeed * deltaTime;
    if (keyboardManager.isKeyDown(KeyCode.LEFT)) {
      x -= distance;
    }
    if (keyboardManager.isKeyDown(KeyCode.RIGHT)) {
      x += distance;
    }
    sprite.x = x;
  }
}
