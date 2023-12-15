import { Sprite } from 'pixi.js';
import { SpaceObject, SpaceObjectType } from './SpaceObject';
import missileImg from 'images/missile.png';
import { Explosion } from './Explosion';

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

  /**
   * 檢查小行星或怪獸碰撞是否與飛彈碰撞
   * @returns 回傳被碰撞的太空物件
   */
  hitTestSpaceObject(): SpaceObject | undefined {
    return this.game.objects.find(obj => {
      const isCollidable = obj.type === 'asteroid' || obj.type === 'monster';
      return isCollidable && obj.hitTest(this);
    });
  }

  /**
   * 更新函式
   * @param dt 經過時間
   * @override
   */
  update(dt: number) {
    const hitObject = this.hitTestSpaceObject();
    if (hitObject) {
      // 撞到東西，準備自爆
      if (hitObject.type === 'monster') {
        // 撞到怪獸，爆炸放在怪獸的位置，消滅怪獸和飛彈
        new Explosion().playAndDestroy(hitObject);
        hitObject.destroy();
        this.game.addScore(1);
      } else {
        // 撞到小行星，爆炸飛彈的位置，消滅飛彈，小行星不會被消滅
        new Explosion().playAndDestroy(this);
      }
      this.destroy();
    }
    super.update(dt);
  }
}
