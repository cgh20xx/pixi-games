import { test, expect, describe } from 'vitest';
import { Dice } from '../lib/Dice';

describe('Dice', () => {
  describe('roll', () => {
    test('擲骰子100次是否在範圍內', () => {
      const dice = new Dice(6);
      for (let i = 0; i < 100; i++) {
        const result = dice.roll();
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(6);
      }
    });
  });
});
