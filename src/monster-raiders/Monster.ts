import { PI_2, Sprite } from 'pixi.js';
import { SpaceObject, SpaceObjectType } from './SpaceObject';
import monsterImg from 'images/space-monster.png';
import { MathUtils } from 'lib/MathUtils';

export class Monster extends SpaceObject {
  // 不用覆寫 constructor

  /**
   * 類型為`戰機`
   */
  get type(): SpaceObjectType {
    return 'monster';
  }

  /**
   * 還要追著玩家跑多久 (單位：偵)
   */
  followDuration = 200;

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

  /**
   * 更新函式
   * @param dt 經過時間
   * @override
   */
  update(dt: number) {
    // 先找到玩家戰機
    const fighter = this.game.objects.find(obj => {
      return obj.type === 'fighter';
    });
    if (fighter && this.followDuration > 0) {
      // 縮短追蹤玩家的時間
      this.followDuration -= dt;
      // // 計算兩物之間的向量
      const vector = fighter.position.sub(this.position);
      // // 計算戰機對於我的方向 (弧度)
      const radians = Math.atan2(vector.y, vector.x);
      // // 計算和我目前的方向差
      let radDiff = radians - this.rotation;
      radDiff = MathUtils.normalizeRadians(radDiff);
      // // 依弧度差來轉向
      const rotateSpeed = 0.025;
      if (radDiff > 0) {
        // 逆時針轉
        const rad = Math.min(radDiff, rotateSpeed * dt);
        this.rotation += rad;
      } else {
        // 順時針轉
        const rad = Math.max(radDiff, -rotateSpeed * dt);
        this.rotation += rad;
      }
      // // 依新的方向調整飛行速度的向量
      this.velocity.set(2, 0);
      this.velocity.rotate(this.rotation);
    }
    super.update(dt);
  }
}
