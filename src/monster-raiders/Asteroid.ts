import { PI_2, Sprite } from 'pixi.js';
import { SpaceObject, SpaceObjectType } from './SpaceObject';
import asteroidImg from 'images/asteroid.png';

/**
 *  小行星
 */
export class Asteroid extends SpaceObject {
  // 不用覆寫 constructor

  /**
   * 類型為`小行星`
   */
  get type(): SpaceObjectType {
    return 'asteroid';
  }

  private rotateSpeed = (Math.random() - 0.5) * 0.004;

  /**
   * 覆寫 SpaceObject.init()
   * @override
   */
  protected init(): void {
    // 放一張小行星的圖，並移動軸心到中心
    const sprite = Sprite.from(asteroidImg);
    sprite.anchor.set(0.5);
    this.addChild(sprite);
    // 隨機縮放與旋轉，讓每個小行星看起來不一樣
    sprite.rotation = Math.random() * PI_2;
    sprite.scale.set(Math.random() * 0.5 + 0.3);
    // 隨機指定排序值在 2 到 3 之間
    this.zIndex = Math.random() + 2;
    // 隨機選擇移動速度與方向
    this.velocity.x = Math.random() * 0.3;
    this.velocity.rotate(Math.random() * PI_2);
    // 計算碰撞半徑
    this.hitRadius = sprite.scale.x * 110;
    // 並畫出碰撞圓 (測試用)
    this.drawHitCircle();
  }

  /**
   * 更新函式
   * @param dt 經過時間
   * @override
   */
  update(dt: number) {
    this.rotation += this.rotateSpeed * dt;
    super.update(dt);
  }
}
