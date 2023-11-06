import { test, expect } from 'vitest';
import { StringUtils } from '../lib/StringUtils';

test('capitalize: 將每個字的第一個英文字母變成大寫', () => {
  // 檢查一般句子
  const output1 = StringUtils.capitalize('you are a good-person.');
  expect(output1).toBe('You Are A Good-Person.');

  // 檢查英文縮寫
  const output2 = StringUtils.capitalize("i don't like rat.");
  expect(output2).toBe("I Don't Like Rat.");
});
