import { ArrayUtils } from '../lib/ArrayUtils';
import { test, expect } from 'vitest';
// 參考：https://cn.vitest.dev/api/#test

test('addUniqueItem: 在陣列裡加入一個不重覆的元素', () => {
  const array = ['a', 'b', 'c'];
  expect(ArrayUtils.addUniqueItem(array, 'a')).toBe(false);
  expect(array.length).toBe(3);

  expect(ArrayUtils.addUniqueItem(array, 'd')).toBe(true);
  expect(array.length).toBe(4);
});

test('removeItem: 把一個元素從陣列中移除', () => {
  const array = ['a', 'b', 'c'];
  expect(ArrayUtils.removeItem(array, 'd')).toBe(false);
  expect(array.length).toBe(3);

  expect(ArrayUtils.removeItem(array, 'a')).toBe(true);
  expect(array.length).toBe(2);
});

test('getRandomItem: 從陣列中隨機取得一個元素', () => {
  const array1 = ['a', 'b', 'c'];

  // 從陣列中隨機取得一個元素
  const randomItem1 = ArrayUtils.getRandomItem(array1);
  expect(array1).toContain(randomItem1);
  expect(array1.length).toBe(3);

  // 從陣列中隨機取得一個元素並刪除該元素
  const randomItem2 = ArrayUtils.getRandomItem(array1, true);
  expect(array1).not.toContain(randomItem2);
  expect(array1.length).toBe(2);

  // 從空陣列中隨機取得一個元素會拋出錯誤
  const array2: unknown[] = [];
  expect(() => ArrayUtils.getRandomItem(array2)).toThrowError(
    '無法從空陣列取得元素'
  );
});

test('sortNumeric: 排序數字陣列 (預設小到大)', () => {
  const array = [2, 1, 3, 5, 4];

  // 預設排序由小到大
  ArrayUtils.sortNumeric(array);
  expect(array).toEqual([1, 2, 3, 4, 5]);

  // 設定排序由大到小
  ArrayUtils.sortNumeric(array, true);
  expect(array).toEqual([5, 4, 3, 2, 1]);
});

test('sortNumericOn: 排序物件陣列 (預設小到大)', () => {
  const array = [
    {
      id: 'p1',
      name: 'alpha',
      power: 1
    },
    {
      id: 'p2',
      name: 'beta',
      power: 99
    },
    {
      id: 'p3',
      name: 'gamma',
      power: 5
    }
  ];

  // 預設排序由小到大
  ArrayUtils.sortNumericOn(array, 'power');
  expect(array).toEqual([
    {
      id: 'p1',
      name: 'alpha',
      power: 1
    },
    {
      id: 'p3',
      name: 'gamma',
      power: 5
    },
    {
      id: 'p2',
      name: 'beta',
      power: 99
    }
  ]);

  // 測試排序由大到小
  ArrayUtils.sortNumericOn(array, 'power', true);
  expect(array).toEqual([
    {
      id: 'p2',
      name: 'beta',
      power: 99
    },
    {
      id: 'p3',
      name: 'gamma',
      power: 5
    },
    {
      id: 'p1',
      name: 'alpha',
      power: 1
    }
  ]);

  // 測試輸入 key 的值代入物件不是 number 類型
  // 因新增 type GetNumberKeys 可以限制 sortNumericOn 第二個參數 key 必需為值為 number，故不需進行測試。
  // expect(() => ArrayUtils.sortNumericOn(array, 'id')).toThrowError(/不是 number 類型$/)
});

test('swapAt: 交換兩個陣列元素的位置', () => {
  const array = ['a', 'b', 'c'];

  // 交換前兩個位置
  ArrayUtils.swapAt(array, 0, 1);
  expect(array).toEqual(['b', 'a', 'c']);

  // 交換的陣列位置超出陣列長度
  expect(() => ArrayUtils.swapAt(array, -1, 99)).toThrowError(
    'index 超出陣列長度'
  );
});
