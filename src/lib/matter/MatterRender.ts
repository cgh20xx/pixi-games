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
    this.align();
    Render.run(this.render);
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
        wireframeBackground: 'transparent',
        wireframes: false,
        background: 'transparent'
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

  /**
   * 讓 matter 畫布對齊 pixi 舞台位置與縮放比例
   * @param stageSize [optional] 舞台大小
   */
  align(stageSize?: { width: number; height: number }) {
    // 取得 matter 畫板的樣式
    const canvasStyle = this.render.canvas.style;
    const stage = this.stage;
    // 依 pixi 舞台調整 matter 畫板的位置與縮放比例
    canvasStyle.left = stage.x + 'px';
    canvasStyle.top = stage.y + 'px';
    canvasStyle.transform = `scale(${stage.scale.x})`;
    // 如果有給舞台大小，則同步畫布尺寸
    if (stageSize) {
      const canvas = this.render.canvas;
      canvas.width = stageSize.width;
      canvas.height = stage.height;
    }
  }
}
