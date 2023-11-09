import { Application, Text } from 'pixi.js';
import { Branch } from './Branch';

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
    const text = new Text('Tree', {
      fill: ['#ff0000', '#ff00ff']
    });
    this.options.seed;
    app.stage.addChild(text);
  }
}
