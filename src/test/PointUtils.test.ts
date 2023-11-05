import '../lib/PointUtils'
import { test, expect, describe } from 'vitest'
import { ObservablePoint, Point } from 'pixi.js'

describe('Point', () => {
  describe('length', () => {
    test('Point 類別的向量長度', () => {
        let point = new Point(3, 4)
        expect(point.length()).toBe(5)
    })

    test('Observable 類別的向量長度', () => {
      let obPoint = new ObservablePoint(
        () => {},
        null,
        13500,
        12709
      )
      expect(obPoint.length()).toBe(18541)
    })
  })

  describe('add', () => {
    test('向量加法', () => {
      let point = new Point(3, 4)
      point = point.add(new Point(10, 10))
      expect(point).toEqual(new Point(13, 14))
    })
  })

  describe('sub', () => {
    test('向量減法', () => {
      let point = new Point(3, 4)
      point = point.sub(new Point(1, 1))
      expect(point).toEqual(new Point(2, 3))
    })
  })

  describe('scale', () => {
    test('向量縮放', () => {
      let point = new Point(3, 4).scale(2)
      expect(point).toEqual(new Point(6, 8))
    })
  })

  describe('scale', () => {
    test('向量縮放', () => {
      let point = new Point(3, 4).scale(2)
      expect(point).toEqual(new Point(6, 8))
    })
  })

  describe('normalize', () => {
    test('向量正規化', () => {
      let point = new Point(3, 4)
      expect(point.normalize(100)).toBe(5)
      expect(point.length()).toBe(100)
    })
  })
})