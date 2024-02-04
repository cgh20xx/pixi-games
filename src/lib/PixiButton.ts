import { Container, Graphics, Text } from 'pixi.js';

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
    const {
      backgroundColor,
      label,
      labelSize,
      labelColor,
      width,
      height,
      cornerRadius
    } = this.options;
    // 畫出按鈕圓角矩形的背景
    const bg = new Graphics();
    bg.beginFill(0xffffff);
    bg.drawRoundedRect(0, 0, width, height, cornerRadius);
    bg.endFill();
    // 預設的按鈕背景底色
    bg.tint = backgroundColor.default;
    this.addChild(bg);
    // 畫出按鈕文字
    const text = new Text(label, {
      fontSize: labelSize,
      fill: labelColor.default
    });
    text.resolution = 2;
    // 置中按鈕文字
    text.position.set(
      (bg.width - text.width) / 2,
      (bg.height - text.height) / 2
    );
    this.addChild(text);

    // 設定按鈕和互動相關屬性
    this.eventMode = 'static';
    this.cursor = 'pointer';
    // 偵聽滑鼠事件：點擊後執行按鈕的回呼函式
    this.on('click', () => {
      bg.tint = backgroundColor.hover;
      text.style.fill = labelColor.hover;
      this.options.onClick();
    });
    // 手機的觸碰結束事件
    this.on('touchend', event => {
      this.emit('click', event);
    });
    // 滑鼠懸浮在按鈕上方
    this.on('pointerover', () => {
      bg.tint = backgroundColor.hover;
      text.style.fill = labelColor.hover;
    });
    // 滑鼠離開按鈕
    this.on('pointerout', () => {
      bg.tint = backgroundColor.default;
      text.style.fill = labelColor.default;
    });
    // 滑鼠按下左鍵
    this.on('pointerdown', () => {
      bg.tint = backgroundColor.active;
      text.style.fill = labelColor.active;
    });
  }
}
