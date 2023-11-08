import { RandomGenerator } from 'lib/RandomGenerator';
import { DEG_TO_RAD, Graphics, Point } from 'pixi.js';
import { TreeGenerator } from './TreeGenerator';

/**
 * 樹枝 - 處理樹枝的生長邏輯
 * @class Branch
 */
export class Branch {
  /** 亂數產生器 */
  rng: RandomGenerator;
  /** 子枝陣列 */
  children: Branch[] = [];
  /** 繪圖器 */
  graphics = new Graphics();

  constructor(
    /** TreeGenerator 的實體 */
    public tree: TreeGenerator,
    /**
     * 分枝的配置選項
     */
    public options: {
      /** 出生位置 */
      position: Point;
      /** 生長角度 (度) */
      angle: number;
      /** 粗細 */
      size: number;
      /** 長度 */
      length: number;
      /** 亂數種子 */
      seed: number;
      /** 顏色 */
      color: number;
    }
  ) {
    this.rng = new RandomGenerator(options.seed);
    console.log('options:', options);
    // 將 graphics 加到 Pixi 的舞台中
    tree.app.stage.addChild(this.graphics);
    this.tree;
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
      if (rng.next() < treeOps.branchRate) {
        // 分兩枝
        this.children = this.createTwoBranches();
      } else {
        // 分單枝
        this.children = this.createOneBranch();
      }
      // 讓子枝再去生子枝
      this.children.forEach(child => child.createChildren());
    } else {
      // 最細的樹枝尾端要長花
      const petals = this.createPetals();
      // petal 也是一段 Branch，只是參數不同
      this.children = this.children.concat(petals);
    }

    // 如果這個樹枝夠細，就讓它長葉子
    if (options.size <= treeOps.leafBranchSize) {
      const leaves = this.createLeaves();
      // leaf 也是一段 Branch，只是參數不同
      this.children = this.children.concat(leaves);
    }
  }
}
