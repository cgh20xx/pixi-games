import { GetNumberKeys } from "../types"

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


  /**
   * 排序數字陣列 (預設小到大)
   * @param array 目標陣列
   * @param descending [可選] 是否由大到小排序
   */
  static sortNumeric(array: number[], descending?: boolean): void {
    if (descending) {
      array.sort((a, b) => b - a)
    } else {
      array.sort((a, b) => a - b)
    }
  }

  /**
   * 排序物件陣列 (預設小到大)
   * @param array 目標陣列
   * @param key 依物件指定的屬性排序
   * @param descending [可選] 是否由大到小排序
   */
  static sortNumericOn<T extends Object>(array: T[], key: GetNumberKeys<T>, descending?: boolean) {
    // 若 key 存在於 object 中
    if (typeof array[0][key] === 'number') {
      if (descending) {
        array.sort((a, b) => (b[key] as number) - (a[key] as number))
      } else {
        array.sort((a, b) => (a[key] as number) - (b[key] as number))
      }
    } else {
      throw new Error(`object['${key}'] 不是 number 類型`);
    }
  }

  /**
   * 交換兩個陣列元素的位置
   * @param array 目標陣列
   * @param index1 第一個元素位置
   * @param index2 第二個元素位置
   */
  static swapAt(array: unknown[], index1: number, index2: number): void {
    let len = array.length
    if (index1 < 0 || index1 >= len || index2 < 0 || index2 >= len) {
      throw new Error('index 超出陣列長度');
    }
    let temp = array[index1]
    array[index1] = array[index2]
    array[index2] = temp
  }
}