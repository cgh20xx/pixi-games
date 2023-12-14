import { Sprite } from 'pixi.js';
import { SpaceObject, SpaceObjectType } from './SpaceObject';
import missileImg from 'images/missile.png';

export class Missile extends SpaceObject {
  // 不用覆寫 constructor

  /**
   * 類型為`飛彈`
   */
  get type(): SpaceObjectType {
    return 'missile';
  }

  /**
   * 覆寫 SpaceObject.init()
   * @override
   */
  protected init(): void {
    // 飛彈的圖
    const sprite = Sprite.from(missileImg);
    sprite.anchor.set(0.5);
    this.scale.set(0.5);
    this.zIndex = 3; // 高於怪獸 2~3, 低於戰機 4
    this.hitRadius = 2;
    this.addChild(sprite);
  }

  /**
   * 設定飛彈的方向
   * @param rotation 弧度
   */
  setDirection(rotation: number) {
    this.rotation = rotation;
    this.velocity.x = 8; // 飛彈的速度
    this.velocity.rotate(rotation);
  }
}
