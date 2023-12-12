import { PI_2, Sprite } from 'pixi.js';
import { SpaceObject, SpaceObjectType } from './SpaceObject';
import monsterImg from 'images/space-monster.png';

export class Monster extends SpaceObject {
  // 不用覆寫 constructor

  /**
   * 類型為`戰機`
   */
  get type(): SpaceObjectType {
    return 'monster';
  }

  /**
   * 覆寫 SpaceObject.init()
   * @override
   */
  protected init(): void {
    // 放一張怪獸的圖，並移動軸心到中心
    const sprite = Sprite.from(monsterImg);
    sprite.anchor.set(0.5);
    this.addChild(sprite);
    // 縮小一點
    sprite.scale.set(0.6);
    // 隨機旋轉一個角度，作為怪獸初始的飛行方向
    this.rotation = Math.random() * PI_2;
    // 隨機指定排序值在 2 到 3 之間，讓怪獸穿梭在小行星之間
    this.zIndex = Math.random() + 2;
    // 初始飛行速度與方向
    this.velocity.x = 2;
    this.velocity.rotate(this.rotation);
    // 設定碰撞半徑
    this.hitRadius = 20;
    // 並畫出碰撞圓 (測試用)
    this.drawHitCircle();
  }
}
