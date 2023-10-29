/**
 * 常用陣列函式庫
 */
export class ArrayUtils {

  /**
   * 在陣列裡加入一個不重覆的元素
   * @param array 目標陣列
   * @param item 要加入的元素
   * @returns 若元素是唯一的且被加入則回傳 true
   */
  static addUniqueItem(array: unknown[], item: unknown): boolean {
    if (array.includes(item)) {
      return false
    }
    array.push(item)
    return true
  }

  /**
   * 把一個元素從陣列中移除
   * @param array 目票陣列
   * @param item 要移除的元素
   * @returns 若成功移除則回傳 true
   */
  static removeItem(array: unknown[], item: unknown): boolean {
    let index = array.indexOf(item)
    if (index === -1) return false

    // 使用 splice 在 index 的位置刪除 1 個元素
    array.splice(index, 1)
    return true
  }
}