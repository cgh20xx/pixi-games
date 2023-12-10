import { AnimatedSprite, Container } from 'pixi.js';

/**
 * 爆炸特效
 */
export class Explosion extends Container {
  /**
   * Pixi.AnimatedSprite
   * @see https://pixijs.download/release/docs/PIXI.AnimatedSprite.html
   */
  animation: AnimatedSprite;

  constructor() {
    super();
    // zIndex 要大於其它太空物件
    this.zIndex = 10;
    // 建立爆炸動畫
    this.animation = new AnimatedSprite([]);
    // 調整動畫的軸心至圖片中央
    this.animation.anchor.set(0.5);
    // 不重覆播放動畫
    this.animation.loop = false;
    // 加進爆炸的繪圖容器
    this.addChild(this.animation);
  }
}
