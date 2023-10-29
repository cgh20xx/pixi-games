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
  static addUniqueItem(array: unknown[], item: unknown):boolean {
    if (array.includes(item)) {
      return false
    }
    array.push(item)
    return true
  }
}