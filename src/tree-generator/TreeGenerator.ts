import { Application, Point } from 'pixi.js';
import { Branch } from './Branch';
import { getStageSize } from 'lib/rwd-stage';
import { OptionsEditor } from './OptionsEditor';

export class TreeGenerator {
  /**
   * 產生樹的配置選項。
   */
  options = {
    /** 亂數種子 (同樣的種子會長出一樣的樹) */
    seed: 1,
    /** 主幹粗細 */
    trunkSize: 10,
    /** 主幹長度 */
    trunkLength: 120,
    /** 分支機率 */
    branchRate: 0.8,
    /** 樹的成長速度 */
    drawSpeed: 3,
    /** 這個粗細以下的樹技會長樹葉 */
    leafBranchSize: 4,
    /** 樹枝顏色 */
    branchColor: 0xffffff,
    /** 葉子顏色 */
    leafColor: 0x00aa00,
    /** 花的顏色 */
    flowerColor: 0xff6666
  };

  optionsEditor: OptionsEditor;

  /**
   * 畫圖時用的資料
   */
  drawingData?: {
    /** 樹的主幹 */
    mainTrunk: Branch;
    /** 畫圖的經過時間 */
    timePassed: number;
  };

  constructor(public app: Application) {
    // 建立一顆新樹
    this.newTree();
    // 預約動畫更新函式
    this.app.ticker.add(this.drawUpdate, this);
    // 建立參數面板
    this.optionsEditor = new OptionsEditor(this);
  }

  /**
   * 建立一顆新樹
   */
  newTree(): void {
    if (this.drawingData) {
      // 如果之前有舊的樹，把舊的樹砍了
      this.drawingData.mainTrunk.destroy();
    }
    const treeOps = this.options;
    const stageSize = getStageSize();
    // 計算舞台左右置中的底部位置，作為主幹的出生位置
    const treePos = new Point(stageSize.width / 2, stageSize.height);
    // 建立一個新樹
    const mainTrunk = new Branch(this, {
      position: treePos,
      angle: -90,
      size: treeOps.trunkSize,
      length: treeOps.trunkLength,
      seed: treeOps.seed,
      color: treeOps.branchColor
    });
    // 讓主幹去長樹技和花葉
    mainTrunk.createChildren();
    // 初始化繪圖動畫所需的資料
    this.drawingData = {
      mainTrunk,
      timePassed: 0
    };
  }

  /**
   * 畫圖用的更新函式
   */
  drawUpdate(deltaTime: number): void {
    // https://pixijs.download/release/docs/PIXI.Ticker.html#deltaTime
    // deltaTime 是一個表示從上一幀到當前幀之間經過時間的數值。
    // 這個時間值可以被限制，限制方式是通過設置 PIXI.Ticker 的 minFPS 屬性。
    // 同時，這個時間值會根據 PIXI.Ticker 的 speed 屬性進行調整或縮放。
    // 不過要注意的是，如果進行了縮放，那麼這個時間值可能會超過由 minFPS 設定的上限。
    const data = this.drawingData;
    if (data) {
      data.timePassed += deltaTime;
      data.mainTrunk.drawDeeply(data.timePassed);
    }
  }
}
