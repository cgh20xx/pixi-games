import { Body, Composite, Events } from 'matter-js';
import { Container, Sprite } from 'pixi.js';
import { CastleFallsGame } from './CastleFallsGame';
import { ICFObject } from './CastleFallsLevelData';

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
   * 建立剛體
   * @param data 剛體的資料
   */
  private createBody(data: ICFObject): Body {}
}
