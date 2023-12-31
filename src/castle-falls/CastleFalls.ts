import { MatterRender } from 'lib/matter/MatterRender';
import { getStageSize, stageSizeEvent } from 'lib/rwd-stage';
import {
  Bodies,
  Body,
  Composite,
  Composites,
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

    // 新增一個 5x3 的堆疊
    const stack = Composites.stack(0, 0, 5, 3, 2, 2, (x: number, y: number) => {
      return Bodies.circle(x, y, 15, { density: 0.1 });
    });

    // 將堆疊串連在一起
    Composites.chain(stack, 0, 0, 0, 0.2, {
      stiffness: 1
    });

    // 新增一個底 5 個方塊，最高 5 層的堆疊金字塔
    const boxStack = Composites.pyramid(
      200,
      0,
      5,
      5,
      2,
      2,
      (x: number, y: number) => {
        return Bodies.rectangle(x, y, 25, 25, { density: 0.1 });
      }
    );

    // 新增一個長方形的靜態地板
    const ground = Bodies.rectangle(400, 400, 810, 60, { isStatic: true });
    // 將以上三個剛體都放進物理引擎的世界
    Composite.add(engine.world, [
      boxA,
      boxB,
      ground,
      constraint,
      stack,
      boxStack
    ]);
    // 啟動物理引擎
    Runner.run(engine);
    // 回傳物理引擎
    return engine;
  }
}
