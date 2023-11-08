import { RandomGenerator } from 'lib/RandomGenerator';
import { DEG_TO_RAD, Graphics, Point } from 'pixi.js';
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
      position: Point; // 出生位置
      angle: number; // 生長角度 (degree)
      size: number; // 粗細
      length: number; // 長度
      seed: number; // 亂數種子
      color: number; // 顏色
    }
  ) {
    this.rng = new RandomGenerator(options.seed);
    console.log('options:', options);
    // 將 graphics 加到 Pixi 的舞台中
    tree.app.stage.addChild(this.graphics);
  }

  /**
   * 消滅所有 graphics 和 children
   */
  destroy(): void {
    this.graphics.destroy();
    this.children.forEach(child => child.destroy());
  }

  /**
   * 取得樹枝尾端的位置
   */
  getEndPosition(): Point {
    const options = this.options;
    // 轉換生角度為弧度
    const radians = options.angle * DEG_TO_RAD;
    // 計算樹枝尾端的向量 (水平向量再旋轉)
    const vector = new Point(options.length).rotate(radians);
    // 尾端 = 起點 + 生長向量
    return options.position.add(vector);
  }

  /**
   * 產生接在這根樹技尾端的子枝
   */
  createChildren(): void {
    const options = this.options;
    const treeOps = this.tree.options;
    const rng = this.rng;
    // 粗細比 1 大才會生出子枝
    if (options.size > 1) {
      // 亂數決定下一段是單枝還是要分兩枝
    } else {
      // 最細的樹枝尾端要長花
    }

    // 如果這個樹枝夠細，就讓它長葉子
    if (options.size <= treeOps.leafBranchSize) {
    }
  }
}
