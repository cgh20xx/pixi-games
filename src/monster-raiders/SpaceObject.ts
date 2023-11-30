import { Container, Point } from 'pixi.js';
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
    // 等一下寫
  }

  /**
   * 物件是否位置畫面中
   * @returns boolean
   */
  isInScreen(): boolean {
    // 等一下寫
    return true;
  }
}
