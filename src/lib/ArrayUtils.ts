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
   * @param array 目標陣列
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

  /**
   * 從陣列中隨機取得一個元素
   * @param array 目標陣列
   * @param remove [可選] 要不要移除選到的元素
   * @returns 隨機選擇的元素
   */
  static getRandomItem<T>(array: T[], remove?: boolean): T {
    // 如果陣列長度為 0 丟出錯誤訊息
    if (array.length === 0) throw new Error('無法從空陣列取得元素')
  
    let index = Math.floor(Math.random() * array.length)
    let item = array[index]

    // 如果需要則移除位於 index 的元素 
    if (remove) {
      array.splice(index, 1)
    }
    return item
  }
}