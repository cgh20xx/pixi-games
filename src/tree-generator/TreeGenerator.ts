import { Application, Point } from 'pixi.js';
import { Branch } from './Branch';
import { getStageSize } from 'basic/rwd-stage';

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
}
