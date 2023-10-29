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