import { IPoint, ObservablePoint, Point } from 'pixi.js'
/**
 * 擴充 PIXI.Point 的函式庫
 */

// 侵入 pixi.js 模組，在模組裡為 IPoint 介面增加新的方法。
declare module 'pixi.js' {
  // 這裡擴充 IPoint 介面而不是 Point 類別，原因是 Point.d.ts 裡面有兩個同名的 Point 宣告被一起
  // 滙出到專案，讓專案產生重覆宣告的錯誤，但因 Point 類別是作了 IPoint 判面，所以我們改寫 IPoint
  // 也可以達到定義新函式的目的。而 TS 中同名的 interface 會被合併所以是沒關係的。
  interface IPoint {
    /**
     * 計算向量的長度
     * @returns 向量的長度
     */
    length(): number

    /**
     * 加另一個向量，回傳新的向量
     * @param other 另一個向量
     * @returns 新的向量
     */
    add(other: IPoint): Point

    /**
     * 減另一個向量，回傳新的向量
     * @param other 另一個向量
     * @returns 新的向量
     */
    sub(other: IPoint): Point

    /**
     * 縮放向量
     * @param value 縮放的數值
     */
    scale(value: number): void

    /**
     * 將向量正規化，並回傳原本的向量長度
     * @param length [可選] 要正規化的長度 default: 1
     * @returns 原本的向量長度
     */
    normalize(length?: number): number

    /**
     * 計算距離另一個座標(Point)的距離
     * @param other 另一個座標(Point)
     * @returns 與另一個座標(Point)的距離
     */
    distanceTo(other: IPoint): number

    /**
     * 將向量旋轉一個弧度 (radian)
     * @param rotation 弧度 (radian)
     * @returns this
     */
    rotate(rotation: number): this
  }
}

Point.prototype.length = function() {
  return Math.sqrt(this.x * this.x + this.y + this.y)
}
// 因 ObservablePoint 也有實作 IPoint 介面，所以也要增加對應的方法。
ObservablePoint.prototype.length = Point.prototype.length

Point.prototype.add = function(other: IPoint) {
  return new Point(this.x + other.x, this.y + other.y)
}
ObservablePoint.prototype.add = Point.prototype.add

Point.prototype.sub = function(other: IPoint) {
  return new Point(this.x - other.x, this.y - other.y)
}
ObservablePoint.prototype.sub = Point.prototype.sub

Point.prototype.scale = function(value: number) {
  this.x *= value
  this.y *= value
}
ObservablePoint.prototype.scale = Point.prototype.scale

Point.prototype.normalize = function(length: number = 1) {
  const originLength = this.length()
  // 如果向量原長不是 0 才有辦法調整長度
  if (length !== 0) {
    this.scale(length / originLength)
  }
  return originLength
}
ObservablePoint.prototype.normalize = Point.prototype.normalize

Point.prototype.distanceTo = function(other: IPoint) {
  const dx = this.x - other.x
  const dy = this.x - other.y
  return Math.sqrt(dx * dx + dy * dy)
}
ObservablePoint.prototype.distanceTo = Point.prototype.distanceTo

// 用泛型定義一個通用的旋轉函式
function vectorRotate<T extends IPoint>(vector: T, rotation: number): T {
  const cos = Math.cos(rotation)
  const sin = Math.sin(rotation)
  vector.set(
    vector.x * cos - vector.y * sin,
    vector.y * cos + vector.x * sin
  )
  return vector
}

Point.prototype.rotate = function(rotation: number) {
  return vectorRotate(this, rotation)
}
ObservablePoint.prototype.rotate = function(rotation: number) {
  return vectorRotate(this, rotation)
}

/**
 * 註：其實 pixi 官方有為 Rectangle 和 Point 提供一些實用的數學方法
 * 像上面寫的 containsRect()，官方的 @pixi/math-extras 已經有提供了
 * 需安裝 npm install @pixi/math-extras
 * 再 import '@pixi/math-extras'
 * 並 import { Rectangle, Point } from '@pixi/core'
 * 注意上面不是 import from 'pixi.js' 因為這是已經整包打包後的 pixi
 */