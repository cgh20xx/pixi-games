import { Container, Graphics, Point } from 'pixi.js';
import { MonsterRaidersGame } from './MonsterRaidersGame';

/**
 * SpaceObject 是一個基礎類別，讓能在太空移動的各種物件都繼承它。
 */
export abstract class SpaceObject extends Container {
  /**
   * 物件的類型有 小行星、戰機、怪獸、飛彈
   */
  abstract get type(): 'asteroid' | 'fighter' | 'monster' | 'missile';

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
   * @override
   */
  destroy() {
    this.destroyed || super.destroy();
    this.game.app.ticker.remove(this.update, this);
  }

  /**
   * 更新函式
   * @param dt 經過時間
   */
  update(dt: number) {
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
    // 等一下寫
    return true;
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
    graphics.drawCircle(this.position.x, this.position.y, this.hitRadius);
    graphics.endFill();
    this.addChild(graphics);
  }
}
