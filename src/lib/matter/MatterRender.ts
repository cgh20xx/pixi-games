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
}
