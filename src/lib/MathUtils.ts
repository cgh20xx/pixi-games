/**
 * 常用數學函式庫 TS 版
 */
export class MathUtils {
  /**
   * 比較 a 和 b 回傳小的值，比原生 Math.min() 更快
   * @param a 數值
   * @param b 數值
   * @returns 回傳較小的數值
   */
  static min(a: number, b: number): number {
    return a < b ? a : b;
  }

  /**
   * 比較 a 和 b 回傳大的值，比原生 Math.max() 更快
   * @param a 數值
   * @param b 數值
   * @returns 回傳較大的數值
   */
  static max(a: number, b: number): number {
    return a > b ? a : b;
  }

  /**
   * 將目標值對應到 min 到 max 範圍，轉換成比例值
   * @param value 需要正規化的目標值
   * @param min 範圍的最小值
   * @param max 範圍的最大值
   * @returns 比例值
   */
  static normalize(value: number, min: number, max: number): number {
    return (value - min) / (max - min);
  }
  /**
   * 將兩個範圍內 min 到 max 之間按比例生成中間值 (Linear Interpolation)
   * @param normalize 比例值
   * @param min 範圍的最小值
   * @param max 範圍的最大值
   * @returns 按比例生成的中間值
   */
  static lerp(normalize: number, min: number, max: number): number {
    return (max - min) * normalize + min;
  }

  /**
   * 將 value 的原始比例，再將比例對應到新的區段。
   * @param value 介於 sourceMin ~ sourceMax 的原始值
   * @param sourceMin 原始範圍最小值
   * @param sourceMax 原始範圍最大值
   * @param destMin 目標範圍最小值
   * @param destMax 目標範圍最大值
   * @returns 按目標範圍比例生成的新的中間值
   */
  static mapping(
    value: number,
    sourceMin: number,
    sourceMax: number,
    destMin: number,
    destMax: number
  ): number {
    return MathUtils.lerp(
      MathUtils.normalize(value, sourceMin, sourceMax),
      destMin,
      destMax
    );
  }

  /**
   * 限制 value 在 min ~ max 範圍內
   * @param value 目標值
   * @param min 最小值
   * @param max 最大值
   * @returns 在範圍內的新 value
   */
  static clamp(value: number, min: number, max: number) {
    // 正常判斷版 (高效)
    return MathUtils.min(MathUtils.max(value, min), max);

    // 強化判斷版 (效能太差暫不用)
    // 因 min 或 max 有可能為負數或寫反，這個做法讓 min 和 max 一定為最低和最高
    // return MathUtils.min(
    //   MathUtils.max(value, MathUtils.min(min, max)),
    //   MathUtils.max(min, max)
    // );
  }
}
