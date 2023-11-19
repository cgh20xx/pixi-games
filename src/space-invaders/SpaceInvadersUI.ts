import { Container, Text } from 'pixi.js';

/**
 * 建立遊戲 UI 文字
 */
export class SpaceInvadersUI extends Container {
  constructor() {
    super();
    this.loadUI();
  }

  private async loadUI() {
    // 等待字型載入完畢 (load 第 1 個參數格式為 css font 格式)
    await document.fonts.load('10px SpaceInvadersFont');
    this.createText('SCORE', '#ffffff', 30, 10);
    this.createText('LIVES', '#ffffff', 430, 10);
  }

  /**
   * 建立文字到舞台中
   * @param label 文字
   * @param color 填充顏色
   * @param x 水平座標
   * @param y 垂直座標
   * @returns Text
   */
  private createText(label: string, color: string, x: number, y: number) {
    // 新增 Pixi 提供的 Text 物件
    const text = new Text(label, {
      fontFamily: 'SpaceInvadersFont',
      fontSize: 24,
      fill: color
    });
    // 提高文字解析度
    text.resolution = 2;
    text.position.set(x, y);
    this.addChild(text);
    return text;
  }
}
