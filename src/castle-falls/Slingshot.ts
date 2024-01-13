import { Sprite } from 'pixi.js';
import { CastleFallsGame } from './CastleFallsGame';
import { ICFSlingshot } from './CastleFallsLevelData';
import slingshotImg from 'images/slingshot.png';
import slingshotFrontImg from 'images/slingshot_front.png';

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
}
