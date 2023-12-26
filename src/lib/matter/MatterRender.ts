import { Engine, Render } from 'matter-js';
import { Container } from 'pixi.js';

export class MatterRender {
  /**
   * matter 的繪圖器
   */
  render: Render;

  constructor(
    public engine: Engine,
    public stage: Container,
    stageSize: { width: number; height: number }
  ) {
    this.render = this.createRender(stageSize);
  }

  /**
   * 銷滅繪圖器
   */
  destroy() {
    Render.stop(this.render);
    this.render.canvas.remove();
  }

  /**
   * 建立 matter 的繪圖器
   * @param size 繪圖器的尺寸，內有 width 和 height 屬性。
   */
  createRender(size: { width: number; height: number }) {
    return Render.create({
      engine: this.engine,
      element: document.body,
      options: {
        width: size.width,
        height: size.height,
        wireframeBackground: 'transparent'
      }
    });
  }
}
