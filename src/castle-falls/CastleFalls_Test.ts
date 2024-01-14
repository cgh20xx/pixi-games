import { MatterRender } from 'lib/matter/MatterRender';
import { getStageSize, stageSizeEvent } from 'lib/rwd-stage';
import {
  Bodies,
  Body,
  Composite,
  Composites,
  Constraint,
  Engine,
  Events,
  IEventCollision,
  Runner
} from 'matter-js';
import { Application } from 'pixi.js';

/**
 * 魔王城的隕落遊戲選擇頁(測試用)
 */
export class CastleFallsTest {
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
    // 第 5 個參數 yOffsetB 設定為 0.2，代表將 Constraint 串連到下一個方塊時，
    // 會鎖在下個方塊中心點往下 `0.2 * 方塊高度` 的位置
    // Composites.chain(stack, 0, 0, 0, 0.2, {
    //   stiffness: 1
    // });

    // 將推疊的方塊連成網格(mesh)
    // 第 3 個參數 crossBrace 設為 true，網格內會多加斜向的約束，讓整體更不易變形。
    Composites.mesh(stack, 5, 3, true, { stiffness: 1 });

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

    // 監聽 engine 裡碰撞剛發生的事件
    Events.on(engine, 'collisionStart', (e: IEventCollision<Engine>) => {
      // 這次更新時發現的所有碰撞配對
      const pairs = e.pairs;
      for (const pair of pairs) {
        // 取得其中一個碰撞的一對物體
        const { bodyA, bodyB, collision } = pair;
        // 碰撞資料 depth: 沿碰撞法線向量，值越高表碰撞力量越大。(碰撞的力量)
        console.log(collision.depth);
        // 碰撞資料 normal: 碰撞法線向量 (碰撞的方向)
        console.log(collision.normal);
      }
    });

    // 啟動物理引擎
    Runner.run(engine);
    // 回傳物理引擎
    return engine;
  }
}
