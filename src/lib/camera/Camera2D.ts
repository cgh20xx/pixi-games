import { Container, Point, Ticker } from 'pixi.js';

/**
 * 因 Pixi 的 DisplayObject 都有 x y 兩個屬性，
 * 所以所有的繪圖器都能當成是 ICamera2DObject 去給攝影機去追焦。
 */
export interface ICamera2DObject {
  x: number;
  y: number;
}

/**
 * 2D 攝影機
 */
export class Camera2D {
  /**
   * 攝影機位置
   */
  position = new Point();
  /**
   * 攝影機的寬
   */
  width = 0;
  /**
   * 攝影機的高
   */
  height = 0;
  /**
   * 攝影機聚焦的物件
   */
  focus?: ICamera2DObject;
  /**
   * 實際會被攝影機移動的 Pixi Container
   */
  gameRoot?: Container;
  /**
   * 攝影機跟瓷聚焦物件的速率。 0: 不跟隨，1: 完全緊貼
   */
  followFocusRate = 0.2;

  /**
   * @param ticker Pixi.Ticker
   */
  constructor(private ticker: Ticker) {
    ticker.add(this.update, this);
  }

  /**
   * 銷毀
   */
  destroy() {
    this.ticker.remove(this.update, this);
  }

  /**
   * 更新函式
   */
  private update() {
    const focus = this.focus;
    const position = this.position;
    // 讓攝影機跟隨聚焦物件
    if (focus) {
      const focusRate = this.followFocusRate;
      const invertRate = 1 - focusRate;
      this.position.set(
        focus.x * focusRate + position.x * invertRate,
        focus.y * focusRate + position.y * invertRate
      );
    }
    // 移動 gameRoot，保持 focus 在畫面中央
    if (this.gameRoot) {
      this.gameRoot.x = this.width / 2 - position.x;
      this.gameRoot.y = this.height / 2 - position.y;
    }
  }
}
