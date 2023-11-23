import { BaseTexture, Rectangle, Sprite, Texture } from 'pixi.js';
import { SpaceInvadersGame } from './SpaceInvadersGame';
import cannonImage from 'images/cannon.png';
import invadersImage from 'images/invaders.png';
import { getStageSize } from 'lib/rwd-stage';
import { keyboardManager } from 'lib/keyboard/KeyboardManager';
import { KeyCode } from 'lib/keyboard/KeyCode';
import { MathUtils } from 'lib/MathUtils';
import { CannonBall } from './CannonBall';
import cannonShootSound from 'sounds/cannonShoot.wav';
import cannonExplodeSound from 'sounds/cannonExplode.wav';
import { playSound } from 'lib/SoundUtils';

// 播放聲音也可用內建的 SoundLibrary，會 cache 音源
// import { sound } from '@pixi/sound';
// sound.add('shoot', cannonShootSound);
// sound.play('shoot', { volume: 0.2 });

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
  // 是否已被破壞
  dead = false;

  constructor(public game: SpaceInvadersGame) {
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

    // 開始進行砲台射擊
    game.app.ticker.add(this.shootUpdate, this);
  }

  /**
   * 銷毀砲台的 sprite
   */
  destroy(): void {
    this.sprite.destroy();
    this.stop();
  }

  /**
   * 停止砲台移動與射擊，並設定砲台已被破壞
   */
  private stop(): void {
    this.game.app.ticker.remove(this.moveUpdate, this);
    this.game.app.ticker.remove(this.shootUpdate, this);
    this.dead = true;
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
    const halfWidth = sprite.width / 2;
    const minX = halfWidth;
    const maxX = getStageSize().width - halfWidth;
    sprite.x = MathUtils.clamp(x, minX, maxX);
    // 處理砲台和外星人大軍的碰撞
    const hitInvader = this.hitTestInvaders();
    // 如果有找到撞到的外星人，呼叫處理玩家砲台被擊中的函式
    if (hitInvader) {
      // hitInvader.dead(); // 要呼叫下面的才會刪除陣列裡的，不然移動到死的會報錯。
      this.game.hitAndRemoveInvader(hitInvader);
      this.game.hitPlayerCannon();
    }
  }

  /**
   * 砲台射擊的更新函式
   * @param deltaTime 經過時間
   */
  private async shootUpdate(deltaTime: number): Promise<void> {
    this.shootCoolDown -= deltaTime;
    if (this.shootCoolDown <= 0 && keyboardManager.isKeyDown(KeyCode.SPACE)) {
      this.shootCoolDown = 60; // 重設冷卻時間為 60 個 ticks
      // 建立砲彈
      new CannonBall(this.game, this.sprite.x, this.sprite.y);
      // 播放射擊音效
      // Sound.from(cannonShootSound).play();
      // 改為使用自訂的音效函式庫
      await this.playShootSound();
    }
  }

  /**
   * 播放射擊音效
   */
  async playShootSound() {
    await playSound(cannonShootSound, { volume: 0.2 });
  }

  /**
   * 砲台爆炸時的動畫與程序
   */
  async hitAndDead(): Promise<void> {
    // 停止砲台移動與射擊，並設定砲台已被破壞
    this.stop();
    // 播放爆炸音效
    playSound(cannonExplodeSound, { volume: 0.2 });
    // 改變材質為外星人的材質基底最右側的 frame
    const baseTexture = BaseTexture.from(invadersImage);
    const frame = new Rectangle(200, 0, 50, 34);
    const texture = new Texture(baseTexture, frame);
    // 借用外星人被擊落的特效
    this.sprite.texture = texture;
    this.sprite.pivot.set(frame.width / 2, frame.height);
    // 改變精靈圖的色調
    this.sprite.tint = 0x00ff00;
    // 等待 30 個 ticks
    await this.game.wait(30);
    // 自我清除
    this.destroy();
  }

  /**
   * 處理砲台和外星人大軍的碰撞
   * 回傳被撞到的外星人
   * @returns Invader | undefined
   */
  private hitTestInvaders() {
    const bounds = this.sprite.getBounds();
    return this.game.invaders.find(invader => {
      return invader.sprite.getBounds().intersects(bounds);
    });
  }
}
