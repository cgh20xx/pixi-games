import { Application, Container, Graphics, PI_2, Point } from 'pixi.js';
import { SpaceObject } from './SpaceObject';
import { getStageSize } from 'lib/rwd-stage';
import { Asteroid } from './Asteroid';
import { Camera2D } from 'lib/camera/Camera2D';
import { keyboardManager } from 'lib/keyboard/KeyboardManager';
import { KeyCode } from 'lib/keyboard/KeyCode';
import { Fighter } from './Fighter';

/**
 * 怪戰掃蕩隊遊遊戲
 */
export class MonsterRaidersGame extends Container {
  /**
   * 裝所有太空物件的容器
   */
  spaceRoot = new Container();

  /**
   * 太空物件陣列
   */
  objects: SpaceObject[] = [];

  constructor(public app: Application) {
    super();
    app.stage.addChild(this);
    this.addChild(this.spaceRoot);
    // 讓 container 的 children 陣列在實際繪圖前，
    // 自動按照物件的 zIndex 重新排序。
    this.spaceRoot.sortableChildren = true;
    this.createInitAsteroids(4);
    // this.testCamera(); // 測試攝影機
    // 建立戰機
    const fighter = new Fighter(this, 320, 240);
    this.objects.push(fighter);
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
    // 取得畫面正中央的位置
    const center = new Point(
      getStageSize().width / 2,
      getStageSize().height / 2
    );
    // 跑迴圈直到造出來的小行星數量等於 amount
    let created = 0;
    while (created++ < amount) {
      // 随機取得小行星距離畫面中央的向量
      const vector = new Point(250 + Math.random() * 250);
      vector.rotate(Math.random() * PI_2);
      // 建立小行星
      const astroid = new Asteroid(
        this,
        center.x + vector.x,
        center.y + vector.y
      );
      // 放進小行星陣列
      this.objects.push(astroid);
    }
  }

  /**
   * 測試攝影機
   */
  testCamera() {
    // 製作攝影機的焦點，一個紅色的小圓
    const focus = new Graphics();
    focus.beginFill(0xff0000);
    focus.drawCircle(0, 0, 10);
    focus.endFill();
    this.addChild(focus);
    // 將焦點物件放在畫面中央
    const stageSize = getStageSize();
    focus.x = stageSize.width / 2;
    focus.y = stageSize.height / 2;
    // 建立攝影機
    const camera = new Camera2D(this.app.ticker);
    camera.width = stageSize.width;
    camera.height = stageSize.height;
    camera.focus = focus;
    camera.gameRoot = this;
    // 用鍵盤控制焦點物件
    this.app.ticker.add(() => {
      if (keyboardManager.isKeyDown(KeyCode.LEFT)) {
        focus.x -= 1;
      }
      if (keyboardManager.isKeyDown(KeyCode.RIGHT)) {
        focus.x += 1;
      }
      if (keyboardManager.isKeyDown(KeyCode.UP)) {
        focus.y -= 1;
      }
      if (keyboardManager.isKeyDown(KeyCode.DOWN)) {
        focus.y += 1;
      }
    });
  }
}
