import '../lib/RectUtils';
import { describe, expect, test } from 'vitest';
import { Rectangle } from 'pixi.js';

describe('Rectangle', () => {
  describe('containsRect', () => {
    test('檢查另一個矩形是否在這個矩形內', () => {
      const BigRect = new Rectangle(0, 0, 100, 100);
      const smallRect = new Rectangle(10, 10, 20, 20);
      expect(BigRect.containsRect(smallRect)).toBe(true);
    });
  });
});
