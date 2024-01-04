import { Container, Sprite } from 'pixi.js';
import { CastleFalls } from './CastleFalls';
import castleBgImg from 'images/castle-bg.jpg';
import { PixiButton } from './PixiButton';

export class LevelsUI extends Container {
  constructor(public gameApp: CastleFalls) {
    super();
    // 加入介面背景圖
    const bg = Sprite.from(castleBgImg);
    bg.scale.set(0.5);
    this.addChild(bg);
    // 建立選關按鈕
    const maxLevel = 3;
    for (let lv = 1; lv <= maxLevel; lv++) {
      this.createLevelButton(lv);
    }
  }

  /**
   * 建立關卡按鈕
   * @param level 關卡
   */
  private createLevelButton(level: number): PixiButton {
    // 按鈕標籤
    const label = `第${level}關`;
    // 建立按鈕
    const button = new PixiButton({
      width: 240,
      height: 36,
      cornerRadius: 8,
      label: label,
      labelSize: 24,
      labelColor: {
        default: 0xffffff,
        hover: 0x333333,
        active: 0xffffff
      },
      backgroundColor: {
        default: 0x333333,
        hover: 0xffffff,
        active: 0xaa0000
      },
      onClick: () => {
        // Todo: 先把介面毀滅，再開始遊戲
      }
    });
    this.addChild(button);
    button.x = 50;
    button.y = 40 + (level - 1) * 50;
    return button;
  }
}
