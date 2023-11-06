import { test, expect } from 'vitest';
import { RandomGenerator } from '../lib/RandomGenerator';
// 參考：https://cn.vitest.dev/api/#test

test('next: 輸出範圍是否介於 0 到 1', () => {
  const rng = new RandomGenerator(Date.now());
  let tries = 10000; // 測試 10000 次
  while (tries--) {
    const output = rng.next();
    // 期望亂數值 >= 0 且 < 1
    expect(output).greaterThanOrEqual(0).lessThan(1);
  }
});
// 補充：同樣是範圍類的 nextBetween() 及 nextIntBetween() 就不再測試

test('next: 測試相同種子產生亂數的重覆性', () => {
  // 測 10 次，每次用一個新的種子建立 2 個亂數產生器，各產生 5 個亂數去比較是否相同。
  let tries = 10;
  while (tries--) {
    const seed = Math.round(Math.random() * 999996);
    const rng1 = new RandomGenerator(seed);
    const rng2 = new RandomGenerator(seed);
    let length = 5;
    while (length--) {
      expect(rng1.next()).toBe(rng2.next());
    }
  }
});

test('nextInt: 測試數字分佈是否平均', () => {
  const rng = new RandomGenerator(Date.now());
  // 定義骰子可擲出 0 到 9 共 10 個面
  const maxFace = 9;
  const totalFaces = maxFace + 1;
  // 準備擲出骰子的次數資料庫，把 0 裝到第 0 格至第 9 格
  const result: number[] = Array(totalFaces).fill(0);
  // 準備擲 10000 次骰子 (至少 1 萬次才會比較準)
  const totalRolls = 10000;
  let rollCount = 0;
  while (rollCount++ < totalRolls) {
    // 擲出一個 0 到 9 的數字
    const face = rng.nextInt(maxFace);
    // 將擲出數字的次數加 1
    result[face] += 1;
  }
  // 每面擲出的期望次數
  const expectPerFace = totalRolls / totalFaces;
  for (let face = 0; face <= maxFace; face++) {
    // 希望擲出的次數和期望值的差要小於 10% (10% 是基於測 1 萬次)
    const diff = Math.abs(expectPerFace - result[face]);
    const diffPercent = diff / expectPerFace;
    expect(diffPercent).toBeLessThan(0.1);
  }
});

test('getRandomString: 產生一個長度為 length 的随機字串', () => {
  const rng = new RandomGenerator(Date.now());
  const length = 1000;
  // 產生長度 1000 並不含數字的英文隨機字串
  const output1 = rng.getRandomString(length);
  // 檢查字串長度是否為 1000
  expect(output1.length).toBe(length);
  // 檢查字串是否只有 1000 個英文字母
  expect(output1).toMatch(/^[a-z]{1000}$/);

  // 產生另一個含數字的隨機字串
  const output2 = rng.getRandomString(length, true);
  // 檢查字串是含有數字
  expect(output2).toMatch(/[0-9]/);
});
