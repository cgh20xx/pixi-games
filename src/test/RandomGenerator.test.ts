import { test, expect } from 'vitest'
import { RandomGenerator } from '../lib/RandomGenerator'
// 參考：https://cn.vitest.dev/api/#test

test('next: 輸出範圍是否介於 0 到 1', () => {
  let rng = new RandomGenerator(Date.now())
  let tries = 100 // 測試 100 次
  while (tries--) {
    let output = rng.next()
    // 期望亂數值 >= 0 且 < 1
    expect(output).greaterThanOrEqual(0).lessThan(1)
  }
})