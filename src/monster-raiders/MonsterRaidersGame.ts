import {
  Application,
  Container,
  Graphics,
  PI_2,
  Point,
  Rectangle
} from 'pixi.js';
import { SpaceObject } from './SpaceObject';
import { getStageSize } from 'lib/rwd-stage';
import { Asteroid } from './Asteroid';
import { Camera2D } from 'lib/camera/Camera2D';
import { keyboardManager } from 'lib/keyboard/KeyboardManager';
import { KeyCode } from 'lib/keyboard/KeyCode';
import { Fighter } from './Fighter';
import { WaitManager } from 'lib/WaitManager';

/**
 * 怪戰掃蕩隊遊遊戲
 */
export class MonsterRaidersGame extends Container {
  /**
   * 等待管理員
   */
  waitManager: WaitManager;

  /**
   * 裝所有太空物件的容器
   */
  spaceRoot = new Container();

  /**
   * 太空物件陣列
   */
  objects: SpaceObject[] = [];

  /**
   * 攝影機
   */
  camera: Camera2D;

  constructor(public app: Application) {
    super();
    this.waitManager = new WaitManager(app.ticker);
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
    // 建立攝影機
    this.camera = new Camera2D(app.ticker);
    this.camera.width = getStageSize().width;
    this.camera.height = getStageSize().height;
    this.camera.gameRoot = this.spaceRoot;
    this.camera.focus = fighter;
    // 開始定期產生小行星
    this.createAsteroidLoop();
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

  /**
   * 從畫面外圍矩形的邊上隨機取點
   * @param padding 距離畫面外圍多少範圍
   */
  randomPositionOnScreenEdge(padding: number): Point {
    // 計算全畫面的矩形
    const stage = this.app.stage;
    // 在計算畫面的矩形時，由於 stage 置中，所以在寬度比舞台寬的畫面上
    // stage.x 就是舞台離畫面左側的距離，那麼全畫面的寬就是舞台寬 + 左右寬
    const screenWidth = getStageSize().width + stage.x * 2;
    const screenHeight = getStageSize().height + stage.y * 2;
    const rect = new Rectangle(
      this.camera.position.x - screenWidth / 2,
      this.camera.position.y - screenHeight / 2,
      screenWidth,
      screenHeight
    );
    // 將矩形向四個方向擴展 padding
    rect.pad(padding);
    // 開始決定小行星的出生點，先定在隨機的四個頂點之一
    const pos = new Point(
      Math.random() < 0.5 ? rect.x : rect.right,
      Math.random() < 0.5 ? rect.y : rect.bottom
    );
    if (Math.random() < 0.5) {
      // 有一半的機率在橫邊上隨機移動
      pos.x = rect.x + Math.random() * rect.width;
    } else {
      // 有一半的機率在豎邊上隨機移動
      pos.y = rect.y + Math.random() * rect.height;
    }
    return pos;
  }

  /**
   * 暫停多少時間 ticks (frames)
   * @param ticks 等待的時間 ticks (frames)
   */
  wait(ticks: number): Promise<void> {
    return this.waitManager.add(ticks);
  }

  /**
   * 定期新增小行星
   */
  async createAsteroidLoop() {
    if (this.destroyed) {
      // 如果遊戲已被銷毀則不繼續
      return;
    }
    // 隨機選擇畫面外 120 個像素的一個位置
    const pos = this.randomPositionOnScreenEdge(120);
    console.log(pos);
    // 建立小行星
    const asteroid = new Asteroid(this, pos.x, pos.y);
    // 延長小行星最短壽命
    asteroid.minLifespan = 120;
    // 放進小行星陣列
    this.objects.push(asteroid);
    // 等待
    await this.wait(12);
    // 遞迴呼叫自已，準備產生下一個小行星
    this.createAsteroidLoop();
  }

  /**
   * 遊戲結束
   */
  gameOver() {
    // 戰機在被銷毀後，攝影機取得戰機的座標會出錯，所以要移除攝影機的 focus
    this.camera.focus = undefined;
  }
}
