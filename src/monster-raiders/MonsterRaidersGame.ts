import { Application, Container } from 'pixi.js';

/**
 * 怪戰掃蕩隊遊遊戲
 */
export class MonsterRaidersGame extends Container {
  /**
   * 裝所有太空物件的容器
   */
  spaceRoot = new Container();

  constructor(public app: Application) {
    super();
    app.stage.addChild(this);
    this.addChild(this.spaceRoot);
    // 讓 container 的 children 陣列在實際繪圖前，
    // 自動按照物件的 zIndex 重新排序。
    this.spaceRoot.sortableChildren = true;
    this.createInitAsteroids(4);
  }

  /**
   * 銷滅
   * @override
   */
  destroy() {
    super.destroy();
  }

  /**
   * 新增初始小行星群
   * @param amount 數量
   */
  private createInitAsteroids(amount: number) {
    console.log('create');
  }
}
