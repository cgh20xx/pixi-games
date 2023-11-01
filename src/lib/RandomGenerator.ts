const m = 2147483647 // m = 2**31 − 1
const DEFAULT_SEED = 123456789 // 預設亂數種子(最好8位以上)

/**
 * 假亂數產生器：相同的 seed 可以產出相同的亂數
 */
export class RandomGenerator {
  public seed: number

  /**
   * 要給一個亂數種子 default seed = 1
   * @param seed 亂數種子
   */
  constructor(seed = DEFAULT_SEED) {
    this.seed = seed
    // 丟棄第一個種子，因第一個亂數很容易有很高的規則性。
    this.next()
  }

  /**
   * 產生下一個介於 0 ~ 1 的亂數
   * @returns 亂數
   */
  public next(): number {
    // seed 不可為 0，不然後面算出來會是 0 的循環數列
    if (this.seed === 0) {
      // 如果 seed = 0，就用一個自訂的種子
      this.seed = DEFAULT_SEED
    }
    // 實作 Lehmer RNG 演算法
    this.seed = (this.seed * 16807) % m
    return this.seed / m
  }
}