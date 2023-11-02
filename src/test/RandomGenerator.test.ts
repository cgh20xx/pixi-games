import { test, expect } from 'vitest'
import { RandomGenerator } from '../lib/RandomGenerator'
// 參考：https://cn.vitest.dev/api/#test

test('next: 輸出範圍是否介於 0 到 1', () => {
  const rng = new RandomGenerator(Date.now())
  let tries = 100 // 測試 100 次
  while (tries--) {
    let output = rng.next()
    // 期望亂數值 >= 0 且 < 1
    expect(output).greaterThanOrEqual(0).lessThan(1)
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