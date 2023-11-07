import { RandomGenerator } from 'lib/RandomGenerator';
import { Graphics, Point } from 'pixi.js';
import { TreeGenerator } from './TreeGenerator';

/**
 * 樹枝 - 處理樹枝的生長邏輯
 * @class Branch
 */
export class Branch {
  // 亂數產生器
  rng: RandomGenerator;
  // 子枝陣列
  children: Branch[] = [];
  // 繪圖器
  graphics = new Graphics();

  constructor(
    public tree: TreeGenerator,
    public options: {
      position: Point;
      angle: number;
      size: number;
      length: number;
      seed: number;
      color: number;
    }
  ) {
    this.rng = new RandomGenerator(options.seed);
    console.log('options:', options);
    // 將 graphics 加到 Pixi 的舞台中
    tree.app.stage.addChild(this.graphics);
  }
}
