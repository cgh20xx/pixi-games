import { Rectangle } from 'pixi.js';

// 侵入 pixi.js 模組，在模組裡為 Rectangle 增加新的方法。
declare module 'pixi.js' {
  class Rectangle {
    /**
     * 檢查另一個矩形是否在這個矩形內
     * @param other 另一個矩形
     * @returns boolean
     */
    public containsRect(other: Rectangle): boolean
  }
}

Rectangle.prototype.containsRect = function(other) {
  return (
    other.x >= this.x &&
    other.y >= this.y &&
    other.right <= this.right &&
    other.bottom <= this.bottom
  )
}