import { MatterRender } from 'lib/matter/MatterRender';
import { getStageSize, stageSizeEvent } from 'lib/rwd-stage';
import {
  Bodies,
  Body,
  Composite,
  Constraint,
  Engine,
  Render,
  Runner
} from 'matter-js';
import { Application, Container } from 'pixi.js';

/**
 * 魔王城的隕落遊戲選擇頁
 */
export class CastleFalls {
  constructor(public app: Application) {
    const engine = this.createMatterWorld();
    const matterRender = new MatterRender(engine, app.stage, getStageSize());
    stageSizeEvent.on('resize', matterRender.align, matterRender);
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
    // 對 box B 施一個向上的力
    Body.applyForce(boxB, boxB.position, { x: 0, y: -0.05 });
    // 新增一個約束以維持 boxA 和 boxB 的相對位置
    const constraint = Constraint.create({
      bodyA: boxA,
      bodyB: boxB,
      stiffness: 0.01, // 剛性
      damping: 0.1 // 阻尼(剛性很低才看的出阻尼的效果)
    });

    // 新增一個長方形的靜態地板
    const ground = Bodies.rectangle(400, 400, 810, 60, { isStatic: true });
    // 將以上三個剛體都放進物理引擎的世界
    Composite.add(engine.world, [boxA, boxB, ground, constraint]);
    // 啟動物理引擎
    Runner.run(engine);
    // 回傳物理引擎
    return engine;
  }
}
