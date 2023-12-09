import '../lib/PointUtils';
import { test, expect, describe } from 'vitest';
import { ObservablePoint, Point } from 'pixi.js';

describe('Point', () => {
  describe('length', () => {
    test('Point 類別的向量長度', () => {
      const point = new Point(3, 4);
      expect(point.length()).toBe(5);
    });

    test('Observable 類別的向量長度', () => {
      const obPoint = new ObservablePoint(() => {}, null, 13500, 12709);
      expect(obPoint.length()).toBe(18541);
    });
  });

  describe('add', () => {
    test('向量加法', () => {
      let point = new Point(3, 4);
      point = point.add(new Point(10, 10));
      expect(point).toEqual(new Point(13, 14));
    });
  });

  describe('sub', () => {
    test('向量減法', () => {
      let point = new Point(3, 4);
      point = point.sub(new Point(1, 1));
      expect(point).toEqual(new Point(2, 3));
    });
  });

  describe('scale', () => {
    test('向量縮放', () => {
      const point = new Point(3, 4).scale(2);
      expect(point).toEqual(new Point(6, 8));
    });
  });

  describe('scale', () => {
    test('向量縮放', () => {
      const point = new Point(3, 4).scale(2);
      expect(point).toEqual(new Point(6, 8));
    });
  });

  describe('normalize', () => {
    test('向量正規化', () => {
      const point = new Point(3, 4);
      expect(point.normalize(100)).toBe(5);
      expect(point.length()).toBe(100);
    });
  });

  describe('distanceTo', () => {
    test('計算距離另一個座標(Point)的距離', () => {
      const point = new Point(1, 0);
      const distance = point.distanceTo(new Point(4, 4));
      expect(distance).toBe(5);
    });
  });

  describe('rotate', () => {
    test('向量旋轉', () => {
      const point = new Point(3, 4);
      point.rotate(Math.PI / 2);
      expect(point.x).toBeCloseTo(-4);
      expect(point.y).toBeCloseTo(3);
    });
  });

  describe('dot', () => {
    test('向量內積', () => {
      const point = new Point(3, 4);
      expect(point.dot(new Point(1, 2))).toBe(11);
    });
  });

  describe('det', () => {
    test('向量行列式', () => {
      const point = new Point(3, 4);
      expect(point.det(new Point(1, 2))).toBe(2);
    });
  });
});
