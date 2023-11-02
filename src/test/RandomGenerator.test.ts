import { test, expect } from 'vitest'
import { RandomGenerator } from '../lib/RandomGenerator'
// 參考：https://cn.vitest.dev/api/#test


test('next: 輸出範圍是否介於 0 到 1', () => {
  const rng = new RandomGenerator(Date.now())
  let tries = 10000 // 測試 10000 次
  while (tries--) {
    let output = rng.next()
    // 期望亂數值 >= 0 且 < 1
    expect(output).greaterThanOrEqual(0).lessThan(1)
  }
})
// 補充：同樣是範圍類的 nextBetween() 及 nextIntBetween() 就不再測試

test('next: 測試相同種子產生亂數的重覆性', () => {
  // 測 10 次，每次用一個新的種子建立 2 個亂數產生器，各產生 5 個亂數去比較是否相同。
  let tries = 10
  while (tries--) {
    const seed = Math.round(Math.random() * 999996)
    const rng1 = new RandomGenerator(seed)
    const rng2 = new RandomGenerator(seed)
    let length = 5
    while (length--) {
      expect(rng1.next()).toBe(rng2.next())
    }
  }
})

test('nextInt: 測試數字分佈是否平均', () => {
  const rng = new RandomGenerator(Date.now())
  // 定義骰子可擲出 0 到 9 共 10 個面
  const maxFace = 9
  let totalFaces = maxFace + 1
  // 準備擲出骰子的次數資料庫，把 0 裝到第 0 格至第 9 格
  const result: number[] = Array(totalFaces).fill(0)
  // 準備擲 10000 次骰子 (至少 1 萬次才會比較準)
  const totalRolls = 10000
  let rollCount = 0
  while (rollCount++ < totalRolls) {
    // 擲出一個 0 到 9 的數字
    let face = rng.nextInt(maxFace)
    // 將擲出數字的次數加 1
    result[face] += 1
  }
  // 每面擲出的期望次數
  const expectPerFace = totalRolls / totalFaces
  for (let face = 0; face <= maxFace; face++) {
    // 希望擲出的次數和期望值的差要小於 10% (10% 是基於測 1 萬次)
    const diff = Math.abs(expectPerFace - result[face])
    const diffPercent = diff / expectPerFace
    expect(diffPercent).toBeLessThan(.1)
  }
})