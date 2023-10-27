/**
 * 骰子
 */
export class Dice {
  // 定義骰子的面數
  constructor(public faces: number = 6) {
    // 在 constructor 的參數加上 public，可讓參數變成類別的屬性
  }

  /**
   * 擲骰子
   */
  roll() {
    return Math.floor(Math.random() * this.faces + 1)
  }
}