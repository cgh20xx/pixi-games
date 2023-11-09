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
      /** 樹枝出生位置 */
      position: Point;
      /** 樹枝生長角度 (度) */
      angle: number;
      /** 樹枝粗細 */
      size: number;
      /** 樹枝長度 */
      length: number;
      /** 亂數種子 */
      seed: number;
      /** 樹枝顏色 */
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
   * 從尾端長單枝
   */
  createOneBranch(): Branch[] {
    const options = this.options;
    const treeOps = this.tree.options;
    const rng = this.rng;
    // 計算新枝的生長方向
    const angle = options.angle + rng.nextBetween(-20, 20);
    // 新枝要細一點
    const size = options.size - 1;
    // 長度是用 size 計算的 (size 越小長度越短)
    let length = ((size + 3) / (treeOps.trunkSize + 3)) * 80;
    // 再把長度乘上一點亂數
    length *= rng.nextBetween(0.5, 1);
    // 建立新枝
    const branch = new Branch(this.tree, {
      position: this.getEndPosition(),
      angle,
      size,
      length,
      seed: rng.nextInt(999999),
      color: options.color // 主幹與樹枝同色
    });
    // 以陣列的方試回傳這一根新枝
    return [branch];
  }

  /**
   * 從尾端長雙枝
   */
  createTwoBranches(): Branch[] {
    const options = this.options;
    const treeOps = this.tree.options;
    const rng = this.rng;
    // 建立雙枝的方法和單枝一樣，只是要加上兩個分枝之間要分開的角度
    const branches: Branch[] = [];
    // 計算新枝的生長大概方向
    const angleAvg = options.angle + rng.nextBetween(-20, 20);
    // 兩根樹枝的夾角在 30 ~ 90 度之間
    const angleInBetween = rng.nextBetween(30, 90);
    // 計算兩根樹枝的生長方向
    const angles = [
      angleAvg - angleInBetween / 2,
      angleAvg + angleInBetween / 2
    ];
    // 新枝要細一點
    const size = options.size - 1;
    // 長度是用 size 計算的 (size 越小長度越短)
    let length = ((size + 3) / (treeOps.trunkSize + 3)) * 80;
    // 再把長度乘上一點亂數
    length *= rng.nextBetween(0.5, 1);
    // 迴圈建立新枝
    for (const angle of angles) {
      const branch = new Branch(this.tree, {
        position: this.getEndPosition(),
        angle,
        size,
        length,
        seed: rng.nextInt(999999),
        color: options.color // 主幹與樹枝同色
      });
      branches.push(branch);
    }

    return branches;
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
