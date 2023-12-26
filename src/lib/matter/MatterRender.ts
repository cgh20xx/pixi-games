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
    this.initRenderView(this.render);
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

  /**
   * 改變繪圖器的 CSS，使其排版時的位置使用絕對座標
   * @param render 繪圖器
   */
  private initRenderView(render: Render) {
    // 取得 matter 畫板的樣式
    const canvasStyle = render.canvas.style;
    // 將畫板位置設定為絕對位置
    canvasStyle.position = 'absolute';
    // 將畫板縮放的參考點設在左上角
    canvasStyle.transformOrigin = '0 0';
    // 取消畫面和滑鼠的互動
    canvasStyle.pointerEvents = 'none';
  }
}
