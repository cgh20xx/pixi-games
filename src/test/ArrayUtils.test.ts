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

test('sortNumeric: 排序數字陣列 (預設小到大)', () => {
  let array = [2, 1, 3, 5, 4]

  // 預設排序由小到大
  ArrayUtils.sortNumeric(array)
  expect(array).toEqual([1, 2, 3, 4, 5])

  // 設定排序由大到小
  ArrayUtils.sortNumeric(array, true)
  expect(array).toEqual([5, 4, 3, 2, 1])
})

test('sortNumericOn: 排序物件陣列 (預設小到大)', () => {
  let array = [
    {
      id: 'p1', name: 'alpha', power: 1
    },
    {
      id: 'p2', name: 'beta', power: 99
    },
    {
      id: 'p3', name: 'gamma', power: 5
    }
  ]

  // 預設排序由小到大
  ArrayUtils.sortNumericOn(array, 'power')
  expect(array).toEqual([
    {
      id: 'p1', name: 'alpha', power: 1
    },
    {
      id: 'p3', name: 'gamma', power: 5
    },
    {
      id: 'p2', name: 'beta', power: 99
    },
  ])

  // 測試排序由大到小
  ArrayUtils.sortNumericOn(array, 'power', true)
  expect(array).toEqual([
    {
      id: 'p2', name: 'beta', power: 99
    },
    {
      id: 'p3', name: 'gamma', power: 5
    },
    {
      id: 'p1', name: 'alpha', power: 1
    }
  ])
})