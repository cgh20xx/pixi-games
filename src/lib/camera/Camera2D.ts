/**
 * 因 Pixi 的 DisplayObject 都有 x y 兩個屬性，
 * 所以所有的繪圖器都能當成是 ICamera2DObject 去給攝影機去追焦。
 */
export interface ICamera2DObject {
  x: number;
  y: number;
}
