import { Sprite } from 'pixi.js';
import { CastleFallsGame } from './CastleFallsGame';
import { ICFSlingshot } from './CastleFallsLevelData';
import slingshotImg from 'images/slingshot.png';
import slingshotFrontImg from 'images/slingshot_front.png';
import {
  Body,
  Composite,
  Constraint,
  Events,
  Mouse,
  MouseConstraint
} from 'matter-js';

/**
 * 彈弓
 */
export class Slingshot {
  constructor(
    public game: CastleFallsGame,
    data: ICFSlingshot
  ) {
    // 建立彈弓的精靈圖
    this.createSprites(data);
    // 建立一顆石頭
    const rock = this.createRock(data);
    // 建立橡皮筋
    const elastic = this.createElastic(data, rock);
    Composite.add(this.game.engine.world, elastic);
    // 建立滑鼠約束，讓玩家可以用滑鼠拉石頭
    const mouseConstraint = this.createMouseConstraint();
    Composite.add(this.game.engine.world, mouseConstraint);
    // 偵聽 Matter 滑鼠約束被鬆開的事件(暫時版)
    // 補充："@types/matter-js": "0.19.5" 沒有 drag 相關事件的 type
    Events.on(mouseConstraint, 'enddrag', async () => {
      // 等待一個 tick 彈簧約束才會動作
      await this.game.gameApp.wait(1);
      // 移除滑鼠約束(白色彈簧)
      Composite.remove(this.game.engine.world, elastic);
    });
  }

  /**
   * 建立彈弓的精靈圖
   * @param data 建立彈弓的資料
   */
  private createSprites(data: ICFSlingshot): void {
    // 彈弓主體
    const backSprite = Sprite.from(slingshotImg);
    backSprite.zIndex = 0;
    backSprite.position.set(data.x - 35, data.y - 15);
    this.game.addChild(backSprite);
    // 能遮住石塊的木段
    const frontSprite = Sprite.from(slingshotFrontImg);
    frontSprite.zIndex = 10; // 石頭的 zIndex = 6
    frontSprite.position.copyFrom(backSprite);
    this.game.addChild(frontSprite);
  }

  /**
   * 建立發射用的石頭
   * @param data 建立彈弓的資料
   * @returns Matter.Body
   */
  private createRock(data: ICFSlingshot): Body {
    const object = this.game.createMatterObject({
      type: 'rock',
      x: data.x,
      y: data.y + 1, // 石頭位置不要和橡皮筋的其中一端重疊，避免橡皮筋約束出問題，故 +1。
      circle: {
        radius: 15
      }
    });
    return object.body;
  }

  /**
   * 建立可拉伸的橡皮筋，一端綁在彈弓上，一端綁在石頭上。
   * 注意：約束的長度若為 0 容易出現 bug
   * @param data 建立彈弓的資料
   * @param rock 石頭的剛體
   * @returns Matter.Constraint 約束
   */
  private createElastic(data: ICFSlingshot, rock: Body): Constraint {
    return Constraint.create({
      pointA: { x: data.x, y: data.y }, // 一端固定在彈弓上的一點
      bodyB: rock, // 另一端綁在石頭上
      stiffness: data.stiffness // 剛性程度
    });
  }

  /**
   * 建立滑鼠約束，讓玩家可以用滑鼠拉石頭
   * @returns Matter.MouseConstraint 返回滑鼠約束
   */
  private createMouseConstraint(): MouseConstraint {
    const canvas = this.game.gameApp.app.view as HTMLCanvasElement;
    // 建立 Matter 滑鼠，使用 Pixi 畫板接收滑鼠事件
    const mouse = Mouse.create(canvas);
    // 因 Pixi 舞台有經過平移及縮放，故要調整 Matter 滑鼠的位置與 Pixi 的滑鼠同步
    const stage = this.game.gameApp.app.stage;
    mouse.offset.x = -stage.x / stage.scale.x;
    mouse.offset.y = -stage.y / stage.scale.y;
    mouse.scale.x = 1 / stage.scale.x;
    mouse.scale.y = 1 / stage.scale.y;
    // 建立滑鼠約束
    return MouseConstraint.create(this.game.engine, {
      mouse,
      collisionFilter: {
        // 因所有物件的 category 預設為 0b01
        // 故將滑鼠的 mask 設為 0b10 使得 & 運算才不會有交集(不能碰撞)
        mask: 0b10
      }
    });
  }
}
