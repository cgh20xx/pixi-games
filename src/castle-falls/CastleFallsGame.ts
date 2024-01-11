import { Container, Sprite } from 'pixi.js';
import { CastleFalls } from './CastleFalls';
import { Engine, Runner } from 'matter-js';
import { MatterRender } from 'lib/matter/MatterRender';
import { getStageSize, stageSizeEvent } from 'lib/rwd-stage';
import bgImg from 'images/castle-gamebg.png';
import { ICFObject, ICastleFallsLevelData } from './CastleFallsLevelData';
import { MatterObject } from './MatterObject';

export class CastleFallsGame extends Container {
  engine = Engine.create();
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
    console.log(data);
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
}
