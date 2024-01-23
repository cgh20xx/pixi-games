import { Container, Sprite } from 'pixi.js';
import { CastleFalls } from './CastleFalls';
import { Engine, Events, Runner } from 'matter-js';
import { MatterRender } from 'lib/matter/MatterRender';
import { getStageSize, stageSizeEvent } from 'lib/rwd-stage';
import bgImg from 'images/castle-gamebg.png';
import { ICFObject, ICastleFallsLevelData } from './CastleFallsLevelData';
import { MatterObject } from './MatterObject';
import { Slingshot } from './Slingshot';

export class CastleFallsGame extends Container {
  engine = Engine.create({
    // 把支援物體睡眠的開關打開
    enableSleeping: true
  });
  runner = Runner.create();
  matterRender: MatterRender;
  objects: { [key: string]: MatterObject } = {};

  constructor(
    public gameApp: CastleFalls,
    public level: number
  ) {
    super();
    // 用 zIndex 來安排 pixi 繪圖物件的層級
    this.sortableChildren = true;
    // 加入背景圖
    this.addBackground();
    // 建立 matter.js 除錯用的繪圖器
    this.matterRender = new MatterRender(
      this.engine,
      this.gameApp.app.stage,
      getStageSize()
    );

    stageSizeEvent.on('resize', this.matterRender.align, this.matterRender);
    // 啟動遊戲前先讀取關卡資料
    this.loadAndStartLevel(level);
    // 監聽碰撞事件
    this.setupCollisionListener();
  }

  destroy() {
    super.destroy();
    stageSizeEvent.off('resize', this.matterRender.align, this.matterRender);
    this.matterRender.destroy();
    Runner.stop(this.runner);
  }

  /**
   * 方便遊戲關卡中取用 Pixi 的 app
   */
  get app() {
    return this.gameApp.app;
  }

  /**
   * 加入背景圖
   */
  addBackground() {
    const bg = Sprite.from(bgImg);
    bg.zIndex = 0;
    this.addChild(bg);
  }

  /**
   * 載入關卡資料 -> 建立關卡世界 -> 遊戲開始
   */
  async loadAndStartLevel(level: number) {
    // 載入關卡資料 data
    const data = await this.loadLevel(level);
    // 建立關卡世界
    this.buildLevel(data);
    // 遊戲開始
    this.start();
  }

  /**
   * 載入關卡資料
   * @param level 關卡
   */
  async loadLevel(level: number) {
    const url = `./castle-falls/level_${level}.json`;
    const res = await fetch(url);
    const data = (await res.json()) as ICastleFallsLevelData;
    return data;
  }

  /**
   * 依關卡資料建立這一關的世界
   * @param data 關卡資料
   */
  buildLevel(data: ICastleFallsLevelData) {
    for (const objData of data.objects) {
      this.createMatterObject(objData);
    }
    // 建立彈弓
    new Slingshot(this, data.slingshot);
  }

  /**
   * 遊戲開始
   */
  start() {
    // 讓引擎開始跑
    Runner.run(this.runner, this.engine);
  }

  /**
   * 建立 MatterObject 並儲存起來
   * @param objData 剛體的資料
   * @returns MatterObject
   */
  createMatterObject(objData: ICFObject): MatterObject {
    const obj = new MatterObject(this, objData);
    this.objects[obj.body.id] = obj;
    return obj;
  }

  /**
   * 等待世界所有物體都睡著
   */
  async waitWorldPeace() {
    // 尋找一個沒睡著的物體
    const awaked = this.engine.world.bodies.find(body => {
      return !body.isSleeping;
    });
    if (awaked) {
      // 如果找到就先等一個 tick 再呼叫自己繼續等待
      await this.gameApp.wait(1);
      await this.waitWorldPeace();
    }
  }

  /**
   * 偵聽`碰撞活動`事件，這個事件帶有衝撞力量的資料
   */
  private setupCollisionListener(): void {
    Events.on(
      this.engine,
      'collisionActive',
      (event: Matter.IEventCollision<Engine>) => {
        // 取得碰撞事件中一對一對的物體
        for (const pair of event.pairs) {
          //console.log(`--撞碰事件--`);
          // console.log('depth:', pair.collision.depth);
          // 使用 collisionStart 事件，然後衝力使用 depth 判斷是否可行？
          const objA = pair.bodyA;
          const objB = pair.bodyB;
          const maObjA = this.objects[objA.id];
          const maObjB = this.objects[objB.id];
          // 呼叫各自的受撞函式，並以對方作為參數 (等一下寫)
          maObjA.onCollisionActive(maObjB, pair);
          maObjB.onCollisionActive(maObjA, pair);
        }
      }
    );
  }
}
