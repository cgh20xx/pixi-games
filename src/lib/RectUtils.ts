import { Rectangle } from 'pixi.js';
/**
 * 擴充 PIXI.Rectangle 的函式庫
 */

// 侵入 pixi.js 模組，在模組裡為 Rectangle 增加新的方法。
declare module 'pixi.js' {
  class Rectangle {
    /**
     * 檢查另一個矩形是否在這個矩形內
     * @param other 另一個矩形
     * @returns boolean
     */
    public containsRect(other: Rectangle): boolean;
  }
}

Rectangle.prototype.containsRect = function (other) {
  return (
    other.x >= this.x &&
    other.y >= this.y &&
    other.right <= this.right &&
    other.bottom <= this.bottom
  );
};

/**
 * 註：其實 pixi 官方有為 Rectangle 和 Point 提供一些實用的數學方法
 * 像上面寫的 containsRect()，官方的 @pixi/math-extras 已經有提供了
 * 需安裝 npm install @pixi/math-extras
 * 再 import '@pixi/math-extras'
 * 並 import { Rectangle, Point } from '@pixi/core'
 * 注意上面不是 import from 'pixi.js' 因為這是已經整包打包後的 pixi
 */
