import {
  AnimatedSprite,
  BaseTexture,
  Container,
  Rectangle,
  Texture
} from 'pixi.js';
import { SpaceObject } from './SpaceObject';
import explosionImg from 'images/explosion-spritesheet.png';

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
    this.animation = new AnimatedSprite(getTextures());
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

/**
 * 爆炸動畫中每一幀的長寬尺寸
 */
const frameSize = {
  width: 128,
  height: 124
};

/**
 * 爆炸動畫材質陣列的快取
 */
const texturesCache: Texture[] = [];

/**
 * 取得爆炸動畫所有材質
 */
function getTextures(): Texture[] {
  // 若快取是空的，就要建立材質陣列的快取
  if (texturesCache.length === 0) {
    // 載入基底材質
    const baseTexture = BaseTexture.from(explosionImg);
    // 組建 48 張不同部位的材質
    for (let i = 0; i < 48; i++) {
      const col = i % 8;
      const rol = Math.floor(i / 8);
      const frame = new Rectangle(
        col * frameSize.width,
        rol * frameSize.height,
        frameSize.width,
        frameSize.height
      );
      const texture = new Texture(baseTexture, frame);
      texturesCache.push(texture);
    }
  }
  // 回傳材質陣列的快取
  return texturesCache;
}
