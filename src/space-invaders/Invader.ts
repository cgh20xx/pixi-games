import { BaseTexture, Rectangle, Sprite, Texture } from 'pixi.js';
import { SpaceInvadersGame } from './SpaceInvadersGame';
import invadersImage from 'images/invaders.png';
import { playSound } from 'lib/SoundUtils';
import invaderKilledSound from 'sounds/invaderKilled.wav';

/**
 * 外星侵略者
 * @class
 */
export class Invader {
  // 外星人的圖
  sprite = new Sprite();
  /**
   *
   * @param game SpaceInvadersGame instance
   * @param x 初始位罝 x
   * @param y 初始位罝 y
   * @param type 外星人類型
   */
  constructor(
    public game: SpaceInvadersGame,
    x: number,
    y: number,
    type: 0 | 1 | 2 | 3
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
   * 銷毀 sprite
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

  get x(): number {
    return this.sprite.x;
  }

  set x(value: number) {
    this.sprite.x = value;
  }

  get y(): number {
    return this.sprite.y;
  }

  set y(value: number) {
    this.sprite.y = value;
  }

  get width(): number {
    return this.sprite.width;
  }

  set width(value: number) {
    this.sprite.width = value;
  }

  get height(): number {
    return this.sprite.height;
  }

  set height(value: number) {
    this.sprite.height = value;
  }

  /**
   * Readonly flag for destroyed display objects.
   */
  get destroyed(): boolean {
    return this.sprite.destroyed;
  }

  /**
   * 移動外星人位置
   * @param moveX 水平移動 x 距離
   * @param moveY 垂直移動 y 距離
   */
  move(moveX: number, moveY: number) {
    this.x += moveX;
    this.y += moveY;
  }

  /**
   * 外星人死亡時的動畫與程序
   */
  async dead() {
    playSound(invaderKilledSound, { volume: 0.5 });
    // 改變材質在基底上的矩形 (換成最右側的 50x34)
    this.sprite.texture.frame = new Rectangle(200, 0, 50, 34);
    // pixi 說修改 frame 要手動呼叫 updateUvs()
    this.sprite.texture.updateUvs();
    await this.game.wait(5);
    this.destroy();
  }
}
