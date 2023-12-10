import { AnimatedSprite, Container } from 'pixi.js';
import { SpaceObject } from './SpaceObject';

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

  /**
   * 播放爆炸動畫，並在結束時自我銷毀
   * @param target 太空物件
   */
  playAndDestroy(target: SpaceObject) {
    // 加入遊戲容器
    target.game.spaceRoot.addChild(this);
    // 將位置移到發生爆炸的太空物件
    this.position.copyFrom(target.position);
    // 依爆炸物件的碰撞半徑調整特效大小
    this.animation.scale.set(target.hitRadius / 32);
    // 播放動畫
    this.animation.play();
    // 播完動畫時銷毀
    this.animation.onComplete = () => this.destroy();
  }
}
