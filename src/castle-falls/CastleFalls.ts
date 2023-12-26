import { stageSizeEvent } from 'lib/rwd-stage';
import { Bodies, Composite, Engine, Render, Runner } from 'matter-js';
import { Application, Container } from 'pixi.js';

/**
 * 魔王城的隕落遊戲選擇頁
 */
export class CastleFalls {
  constructor(public app: Application) {
    const engine = this.createMatterWorld();
    const render = this.createMatterRender(engine);
    this.setupRenderView(render, app.stage);
  }

  /**
   * 創建物理引擎的世界
   */
  createMatterWorld() {
    // 建立物理引擎
    const engine = Engine.create();
    // 新增兩個方形的剛體
    const boxA = Bodies.rectangle(400, 200, 80, 80);
    const boxB = Bodies.rectangle(450, 50, 80, 80);
    // 新增一個長方形的靜態地板
    const ground = Bodies.rectangle(400, 400, 810, 60, { isStatic: true });
    // 將以上三個剛體都放進物理引擎的世界
    Composite.add(engine.world, [boxA, boxB, ground]);
    // 啟動物理引擎
    Runner.run(engine);
    // 回傳物理引擎
    return engine;
  }

  /**
   * 建立物理世界的繪圖器
   * @param engine Matter.Engine instance
   */
  createMatterRender(engine: Engine) {
    // 建立 matter 的繪圖器
    const render = Render.create({
      engine: engine,
      element: document.body,
      options: {
        width: 640,
        height: 480,
        wireframeBackground: 'transparent'
      }
    });
    // 讓這個繪圖器(渲染器)跟著時間更新
    Render.run(render);
    // 回傳繪圖器
    return render;
  }

  /**
   * 設置 matter 的畫板與 pixi 畫板重疊
   */
  setupRenderView(render: Render, stage: Container) {
    // 取得 matter 畫板的樣式
    const canvasStyle = render.canvas.style;
    // 將畫板位置設定為絕對位置
    canvasStyle.position = 'absolute';
    // 將畫板縮放的參考點設在左上角
    canvasStyle.transformOrigin = '0 0';
    // 依 pixi 舞台調整 matter 畫板的位置與縮放比例
    canvasStyle.left = stage.x + 'px';
    canvasStyle.top = stage.y + 'px';
    canvasStyle.transform = `scale(${stage.scale.x})`;
    // 在舞台改變時，也要重新調整畫板的位置與縮放比例
    stageSizeEvent.on('resize', () => {
      canvasStyle.left = stage.x + 'px';
      canvasStyle.top = stage.y + 'px';
      canvasStyle.transform = `scale(${stage.scale.x})`;
    });
  }
}
