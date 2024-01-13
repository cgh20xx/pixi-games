import { Sprite } from 'pixi.js';
import { CastleFallsGame } from './CastleFallsGame';
import { ICFSlingshot } from './CastleFallsLevelData';
import slingshotImg from 'images/slingshot.png';
import slingshotFrontImg from 'images/slingshot_front.png';
import { Body } from 'matter-js';

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
    this.createRock(data);
    // 建立橡皮筋
    // 建立滑鼠約束，讓玩家可以用滑鼠拉石頭
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
}
