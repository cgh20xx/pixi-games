import { Bodies, Body, Composite, Events, Pair } from 'matter-js';
import { Container, DEG_TO_RAD, Sprite, TilingSprite } from 'pixi.js';
import { CastleFallsGame } from './CastleFallsGame';
import { BodyOptionsMap, ICFObject } from './CastleFallsLevelData';
import groundImg from 'images/castle-ground.png';
import brickImg from 'images/castle-brick.png';
import woodImg from 'images/castle-wood.png';
import bossImg from 'images/castle-boss.png';
import rockImg from 'images/castle-rock.png';

/**
 * 關卡物件類別
 */
export class MatterObject extends Container {
  /**
   * 物體類別
   */
  type: string;

  /**
   * Matter.js 剛體
   */
  body: Body;

  /**
   * Pixi 精靈圖
   */
  sprite: Sprite;

  constructor(
    public game: CastleFallsGame,
    public data: ICFObject
  ) {
    super();
    // 將物體類別記錄下來
    this.type = data.type;
    // 建立剛體並加入物理世界中
    this.body = this.createBody(data);
    Composite.add(game.engine.world, this.body);
    // 建立精靈圖，加入這個繪圖容器，並放進遊戲容器
    this.sprite = this.createSprite(data);
    this.addChild(this.sprite);
    game.addChild(this);
    // 偵聽物理引擎發出的更新後事件，並隨之更新
    Events.on(game.engine, 'afterUpdate', this.update);
  }

  destroy() {
    // 銷毀繪圖器
    super.destroy();
    // 移除剛體
    Composite.remove(this.game.engine.world, this.body);
    // 取消偵聽
    Events.off(this.game.engine, 'afterUpdate', this.update);
    // 刪除遊戲中儲存物件的備份
    delete this.game.objects[this.body.id];
  }

  /**
   * 當物理引擎更新後，需要呼叫的更新函式
   */
  private update = () => {
    // 同步 pixi 的繪圖器位置與旋轉角度與 matter.js 相同
    this.position.copyFrom(this.body.position);
    this.rotation = this.body.angle;
  };

  /**
   * 依傳入的 data 資料建立剛體
   * @param data 剛體的資料
   */
  private createBody(data: ICFObject): Body {
    // 依物體類別取得定義好的物理性質
    const bodyOptions = BodyOptionsMap[data.type];
    if (!bodyOptions) {
      throw new Error('沒有定義這個類別的物理性質：' + data.type);
    }
    // 取得 data 裡的物體角度，如果沒定義則取 0
    const angleDeg = data.angleDeg || 0;
    // 將角度轉換為弧度，放進創造剛體的物理或質裡
    bodyOptions.angle = angleDeg * DEG_TO_RAD;
    if (data.circle) {
      // 如果物體有 circle 資料，則創造圓形剛體
      return Bodies.circle(data.x, data.y, data.circle.radius, bodyOptions);
    } else if (data.rect) {
      // 如果物體有 rect 資料，則創造矩形剛體
      return Bodies.rectangle(
        data.x,
        data.y,
        data.rect.width,
        data.rect.height,
        bodyOptions
      );
    } else {
      // 如果沒有 circle 或 rect，則丟出錯誤
      throw new Error('不支援的形狀');
    }
  }

  /**
   * 依傳入的 data 資料建立物體的繪圖器
   * @param data 剛體的資料
   */
  private createSprite(data: ICFObject): Sprite {
    if (data.type === 'ground') {
      // 類型為地板
      const rect = data.rect!; // ! 為 TS 語法 (non-null assertion operator)
      const sprite = TilingSprite.from(groundImg, {
        width: rect.width,
        height: rect.height
      });
      sprite.anchor.set(0.5);
      sprite.width = rect.width;
      sprite.height = rect.height;
      this.zIndex = 1;
      return sprite;
    } else if (data.type === 'brick') {
      // 類型為磚塊
      const rect = data.rect!;
      const sprite = Sprite.from(brickImg);
      sprite.anchor.set(0.5);
      sprite.width = rect.width;
      sprite.height = rect.height;
      this.zIndex = 5;
      return sprite;
    } else if (data.type === 'wood') {
      // 類型為木頭
      const rect = data.rect!;
      const sprite = Sprite.from(woodImg);
      sprite.anchor.set(0.5);
      sprite.width = rect.width;
      sprite.height = rect.height;
      this.zIndex = 4;
      return sprite;
    } else if (data.type === 'boss') {
      // 類型為魔王
      const circle = data.circle!;
      const sprite = Sprite.from(bossImg);
      sprite.anchor.set(0.5);
      sprite.scale.set(circle.radius / 40);
      this.zIndex = 3;
      return sprite;
    } else if (data.type === 'rock') {
      // 類型為石頭
      const circle = data.circle!;
      const sprite = Sprite.from(rockImg);
      sprite.anchor.set(0.5);
      sprite.scale.set(circle.radius / 36);
      this.zIndex = 6;
      return sprite;
    }
    throw new Error('不支援的物體類別');
  }

  /**
   * 受碰撞的回呼函式
   * @param other 另一個 MatterObject 物件
   * @param pair collisionActive 事件裡的 event.pairs 其中一對
   */
  onCollisionActive(other: MatterObject, pair: Pair) {
    // 處理 boss 碰撞
    if (this.type === 'boss') {
      // console.log(`${this.type} 撞到了 ${other.type}`);
      let impulse = 0; // 衝力
      for (const contact of pair.activeContacts) {
        impulse += Math.abs(contact.normalImpulse);
      }
      console.log('impulse:', impulse);
      if (impulse > 50) {
        // 魔王自我銷毀/播放動畫/遊戲結束
        this.destroy();
      }
    }
  }
}
