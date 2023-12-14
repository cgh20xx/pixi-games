import { Container, Graphics, Point } from 'pixi.js';
import { MonsterRaidersGame } from './MonsterRaidersGame';
import { ArrayUtils } from 'lib/ArrayUtils';

export type SpaceObjectType = 'asteroid' | 'fighter' | 'monster' | 'missile';

export abstract class SpaceObject extends Container {
  /**
   * 物件的類型有 小行星、戰機、怪獸、飛彈
   */
  abstract get type(): SpaceObjectType;

  /**
   * 移動速度 (向量)
   */
  velocity = new Point();

  /**
   * 最低壽命 (ticks)
   */
  minLifespan = 60;

  /**
   * 碰撞半徑
   */
  hitRadius = 0;

  constructor(
    public game: MonsterRaidersGame,
    x: number,
    y: number
  ) {
    super();
    this.position.set(x, y);
    game.spaceRoot.addChild(this);
    game.app.ticker.add(this.update, this);
    this.init();
  }

  /**
   * 留給繼承的物件去做其它初始化的工作
   */
  protected init() {}

  /**
   * 銷毀太空物件
   * @override
   */
  destroy() {
    this.destroyed || super.destroy();
    this.game.app.ticker.remove(this.update, this);
    // 在物件被銷毀的同時，把它從遊戲容器的 objects 陣列移除
    ArrayUtils.removeItem(this.game.objects, this);
  }

  /**
   * 更新函式
   * @param dt 經過時間
   */
  update(dt: number) {
    // 若物件 destroyed 後還存取會發生錯誤，所以需先檢查
    if (this.destroyed) return;
    // 依速度移動
    this.x += this.velocity.x * dt;
    this.y += this.velocity.y * dt;
    // 降低最低壽命
    this.minLifespan -= dt;
    // 如果最低壽命用完了且不在畫面上，則自我銷毀。
    if (this.minLifespan < 0 && !this.isInScreen()) {
      this.destroy();
    }
  }

  /**
   * 物件是否位置畫面中
   * @returns boolean
   */
  isInScreen(): boolean {
    // screen 為實際 canvas 大小
    const screen = this.game.app.screen;
    return this.getBounds().intersects(screen);
  }

  /**
   * 碰撞檢查
   * @param other SpaceObject
   * @returns 是否碰撞
   */
  hitTest(other: SpaceObject): boolean {
    const distance = this.position.distanceTo(other.position);
    return distance < this.hitRadius + other.hitRadius;
  }

  /**
   * 畫出碰撞半徑
   * @param color 顏色 default is 0xff0000
   */
  drawHitCircle(color = 0xff0000) {
    const graphics = new Graphics();
    graphics.beginFill(color, 0.2);
    graphics.drawCircle(0, 0, this.hitRadius);
    graphics.endFill();
    this.addChild(graphics);
  }
}
