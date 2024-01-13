import { CastleFallsGame } from './CastleFallsGame';
import { ICFSlingshot } from './CastleFallsLevelData';

/**
 * 彈弓
 */
export class Slingshot {
  constructor(
    public game: CastleFallsGame,
    data: ICFSlingshot
  ) {
    // 建立彈弓的精靈圖
    // 建立一顆石頭
    // 建立橡皮筋
    // 建立滑鼠約束，讓玩家可以用滑鼠拉石頭
  }
}
