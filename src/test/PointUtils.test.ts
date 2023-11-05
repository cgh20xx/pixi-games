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
})