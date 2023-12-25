import { Bodies, Composite, Engine, Runner } from 'matter-js';
import { Application } from 'pixi.js';

/**
 * 魔王城的隕落遊戲選擇頁
 */
export class CastleFalls {
  constructor(public app: Application) {
    const engine = this.createMatterWorld();
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
}
