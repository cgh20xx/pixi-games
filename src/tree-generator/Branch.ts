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
  /** 用一個屬性來記錄畫到的進度 (0~1) */
  drawnPercent = 0;

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
    const length = ((size + 3) / (treeOps.trunkSize + 3)) * 80;
    // 迴圈建立新枝
    for (const angle of angles) {
      const branch = new Branch(this.tree, {
        position: this.getEndPosition(),
        angle,
        size,
        length: length * rng.nextBetween(0.5, 1), // 再把長度乘上一點亂數
        seed: rng.nextInt(999999),
        color: options.color // 主幹與樹枝同色
      });
      branches.push(branch);
    }

    return branches;
  }

  /**
   * 從尾端長花瓣
   */
  createPetals(): Branch[] {
    const options = this.options;
    const treeOps = this.tree.options;
    const rng = this.rng;
    // 建立雙枝的方法和單枝一樣，只是要加上兩個分枝之間要分開的角度
    const petals: Branch[] = [];
    // 花瓣構成的圓的總角度
    const anglesTotal = 240;
    // 花瓣數量
    const count = 8;
    // 花瓣之間的夾角
    const angleInterval = anglesTotal / (count - 1);
    // 第一片花瓣的角度
    const startAngle = options.angle - anglesTotal / 2;
    // 迴圈 count 次，生出所有花瓣
    for (let i = 0; i < count; i++) {
      const petal = new Branch(this.tree, {
        position: this.getEndPosition(),
        angle: startAngle + angleInterval * i,
        size: 4, // 花瓣的粗度
        length: 10, // 花瓣的長度
        seed: rng.nextInt(999999),
        color: treeOps.flowerColor // 花瓣顏色
      });
      petals.push(petal);
    }
    return petals;
  }

  /**
   * 沿著樹枝右左兩側，以一個間距長葉子，葉子與樹枝要保持一個夾角。
   */
  createLeaves(): Branch[] {
    const options = this.options;
    const treeOps = this.tree.options;
    const rng = this.rng;
    // 建立雙枝的方法和單枝一樣，只是要加上兩個分枝之間要分開的角度
    const leaves: Branch[] = [];
    // 沿樹枝，每 6 個單位長度長一片葉子
    const leavesInterval = 6;
    // 轉換樹枝方向的單位為弧度，等一下計算向量時需要用
    const radians = options.angle * DEG_TO_RAD;
    // 葉子與樹枝之間的夾角
    const angleToLeaf = 60;
    // 從起點 0 距離開始，每次迴圈加點距離，直到超出樹枝長度時離開
    for (let dist = 0; dist < options.length; dist += leavesInterval) {
      // 計算葉子起點的向量
      const vector = new Point(dist).rotate(radians);
      // 葉子的出生位置 = 樹枝的起點 + 距離向量
      const leafPos = options.position.add(vector);
      // 隨機選擇葉子在樹枝的左邊或右邊
      const rightSide = rng.next() > 0.5;
      // 計算葉子的生長角度
      const leafAngle =
        options.angle + (rightSide ? angleToLeaf : -angleToLeaf);
      // 產生一片葉子
      const leaf = new Branch(this.tree, {
        position: leafPos,
        angle: leafAngle,
        size: 3, // 葉子的粗度
        length: 5 + options.size, // 葉子的長度
        seed: rng.nextInt(999999),
        color: treeOps.leafColor // 葉子顏色
      });
      leaves.push(leaf);
    }
    return leaves;
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

  /**
   * 畫圖函式
   * @param percent 畫圖完成度的百分比 (0~1)
   */
  draw(percent: number): void {
    if (this.drawnPercent === percent) {
      // 如果剛剛就量畫到這個百分比，那就不用重畫了
      return;
    }
    const options = this.options;
    const start = options.position;
    // 樹枝生長方向的向量 = 生長終點 - 起點
    const vector = this.getEndPosition().sub(start);
    // 在生長到 percent 時的終點
    const end = new Point(
      start.x + vector.x * percent,
      start.y + vector.y * percent
    );
    // 準備畫線，先清除之前的東西並重置 fill 和 lineStyle 設定
    this.graphics.clear();
    // 設定畫線筆刷
    this.graphics.lineStyle({
      width: options.size,
      color: options.color
    });
    // 移動筆刷到起點
    this.graphics.moveTo(start.x, start.y);
    // 畫線到終點
    this.graphics.lineTo(end.x, end.y);
    // 記錄現在畫到哪了
    this.drawnPercent = percent;
  }

  /**
   * 遞迴式畫圖函式
   *
   * 若 timePassed <= 0，就代表還沒有到動筆的時間，隨著 timePassed 越來越大，
   * 期式內就要畫出越完整的枝幹全貌。
   *
   * 當時間多到畫完枝幹全貌還有剩的時候，就把剩餘時間傳給子枝們去畫圖，
   * 這樣就能抽繪出整顆樹的成長動畫。
   *
   * @param timePassed 畫圖的經過時間 (感知時間流動的參數)
   */
  drawDeeply(timePassed: number): void {
    const options = this.options;
    const treeOps = this.tree.options;
    // 畫完本枝的時間 = 本枝長度 / 畫圖速度
    const timeToComplete = options.length / treeOps.drawSpeed;
    // 需要畫出來的進度，限制進度最大到 1 (即 100%)
    const percent = Math.min(1, timePassed / timeToComplete);
    // 畫出本枝
    this.draw(percent);
    // 把經過時間減掉畫完本枝需要的時間
    timePassed -= timeToComplete;
    // 若時間還有剩，就把這時間期給子枝們去畫
    if (timePassed > 0) {
      this.children.forEach(child => child.drawDeeply(timePassed));
    }
  }
}
