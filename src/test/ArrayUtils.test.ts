import { ArrayUtils } from "../lib/ArrayUtils";
import { test, expect } from 'vitest'
// 參考：https://cn.vitest.dev/api/#test

test('addUniqueItem: 在陣列裡加入一個不重覆的元素', () => {
  let array = ['a', 'b', 'c']
  expect(ArrayUtils.addUniqueItem(array, 'a')).toBe(false)
  expect(array.length).toBe(3)
  
  expect(ArrayUtils.addUniqueItem(array, 'd')).toBe(true)
  expect(array.length).toBe(4)
})

test('removeItem: 把一個元素從陣列中移除', () => {
  let array = ['a', 'b', 'c']
  expect(ArrayUtils.removeItem(array, 'd')).toBe(false)
  expect(array.length).toBe(3)

  expect(ArrayUtils.removeItem(array, 'a')).toBe(true)
  expect(array.length).toBe(2)
})

test('getRandomItem: 從陣列中隨機取得一個元素', () => {
  let array1 = ['a', 'b', 'c']
  
  // 從陣列中隨機取得一個元素
  const randomItem1 = ArrayUtils.getRandomItem(array1)
  expect(array1).toContain(randomItem1)
  expect(array1.length).toBe(3)

  // 從陣列中隨機取得一個元素並刪除該元素
  const randomItem2 = ArrayUtils.getRandomItem(array1, true)
  expect(array1).not.toContain(randomItem2)
  expect(array1.length).toBe(2)

  // 從空陣列中隨機取得一個元素會拋出錯誤
  let array2: any[] = []
  expect(() => ArrayUtils.getRandomItem(array2)).toThrowError('無法從空陣列取得元素')
})