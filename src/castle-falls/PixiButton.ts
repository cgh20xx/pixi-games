import { Container, Graphics } from 'pixi.js';

interface PixiButtonOptions {
  /**
   * 按鈕寬度
   */
  width: number;
  /**
   * 按鈕高度
   */
  height: number;
  /**
   * 按鈕圓角
   */
  cornerRadius: number;
  /**
   * 按鈕文字
   */
  label: string;
  /**
   * 按鈕大小
   */
  labelSize: number;
  /**
   * 按鈕文字在三種狀態下的顏色
   */
  labelColor: {
    default: number;
    hover: number;
    active: number;
  };
  /**
   * 按鈕背景在三種狀態下的顏色
   */
  backgroundColor: {
    default: number;
    hover: number;
    active: number;
  };
  /**
   * 按鈕觸發的回呼函式
   */
  onClick: () => void;
}

export class PixiButton extends Container {
  constructor(public options: PixiButtonOptions) {
    super();
    this.buildUI();
  }

  /**
   * 建立按鈕介面
   */
  buildUI() {
    const { backgroundColor, labelColor, width, height, cornerRadius } =
      this.options;
    // 畫出按鈕圓角矩形的背景
    const bg = new Graphics();
    bg.beginFill(0xffffff);
    bg.drawRoundedRect(0, 0, width, height, cornerRadius);
    bg.endFill();
    // 預設的按鈕背景底色
    bg.tint = backgroundColor.default;
    this.addChild(bg);
  }
}
