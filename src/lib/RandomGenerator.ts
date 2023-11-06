import { ArrayUtils } from './ArrayUtils';

const m = 2147483647; // m = 2**31 − 1
const DEFAULT_SEED = 123456789; // 預設亂數種子(最好8位以上)

/**
 * 假亂數產生器：相同的 seed 可以產出相同的亂數
 */
export class RandomGenerator {
  public seed: number;

  /**
   * 要給一個亂數種子 default seed = 1
   * @param seed 亂數種子
   */
  constructor(seed = DEFAULT_SEED) {
    this.seed = seed;
    // 丟棄第一個種子，因第一個亂數很容易有很高的規則性。
    this.next();
  }

  /**
   * 產生下一個介於 0 ~ 1 的亂數
   * @returns 亂數
   */
  public next(): number {
    // seed 不可為 0，不然後面算出來會是 0 的循環數列
    if (this.seed === 0) {
      // 如果 seed = 0，就用一個自訂的種子
      this.seed = DEFAULT_SEED;
    }
    // 實作 Lehmer RNG 演算法
    this.seed = (this.seed * 16807) % m;
    return this.seed / m;
  }

  /**
   * 產生介於 min 首 max 的亂數
   * @param min 最小值
   * @param max 最大值
   * @returns 介於 min 和 max 的亂數
   */
  public nextBetween(min: number, max: number): number {
    return this.next() * (max - min) + min;
  }

  /**
   * 產生介於 0 到 max 的亂整數，0 和 max 都是可能的回傳值。
   * @param max 最大可能值
   * @returns 介於 0 到 max 的亂整數
   */
  public nextInt(max: number): number {
    return Math.floor(this.next() * (max + 1));
  }

  /**
   * 產生介於 min 到 max 的亂整數，min 和 max 都是可能的回傳值。
   * @param min 最小可能值
   * @param max 最大可能值
   * @returns 介於 min 到 max 的亂整數
   */
  public nextIntBetween(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1) + min);
  }

  /**
   * 產生一個長度為 length 的随機字串
   * @param length 回傳的字串長度
   * @param includeNumber 回傳字串是否包含數字
   * @returns 隨機字串
   */
  public getRandomString(length: number, includeNumber?: boolean): string {
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumber) {
      chars += '0123456789';
    }
    const charLength = chars.length;
    let output = '';
    while (output.length < length) {
      const index = Math.floor(this.next() * charLength);
      output += chars[index];
    }
    return output;
  }

  /**
   * 隨機排列陣列中的元素
   * @param array 目標陣列
   */
  public randomizeArray(array: unknown[]): void {
    const length = array.length;
    let swapTo;
    for (let i = 0; i < length; i++) {
      swapTo = Math.floor(this.next() * length);
      ArrayUtils.swapAt(array, i, swapTo);
    }
  }

  /**
   * 從陣列中隨機取得一個元素
   * @param array 目標陣列
   * @param remove [可選] 要不要移除選到的元素
   * @returns 隨機選擇的元素
   */
  public getArrayRandomItem<T>(array: T[], remove?: boolean): T {
    // 如果陣列長度為 0 丟出錯誤訊息
    if (array.length === 0) throw new Error('無法從空陣列取得元素');

    const index = Math.floor(this.next() * array.length);
    const item = array[index];

    // 如果需要則移除位於 index 的元素
    if (remove) {
      array.splice(index, 1);
    }
    return item;
  }
}
