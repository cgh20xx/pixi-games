import { Container, Sprite } from 'pixi.js';
import { CastleFalls } from './CastleFalls';
import castleBgImg from 'images/castle-bg.jpg';

export class LevelsUI extends Container {
  constructor(public gameApp: CastleFalls) {
    super();
    // 加入介面背景圖
    const bg = Sprite.from(castleBgImg);
    bg.scale.set(0.5);
    this.addChild(bg);
    // 建立選關按鈕
    const maxLevel = 3;
    for (let lv = 0; lv < maxLevel; lv++) {
      this.createLevelButton(lv);
    }
  }

  /**
   * 建立關卡按鈕
   * @param level 關卡
   */
  private createLevelButton(level: number) {
    // 按鈕標籤
    const label = `第${level}關`;
    // 建立按鈕
  }
}
