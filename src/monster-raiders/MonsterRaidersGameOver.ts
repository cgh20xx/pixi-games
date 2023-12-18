import { Container, Graphics } from 'pixi.js';
import { MonsterRaidersGame } from './MonsterRaidersGame';
import { getStageSize } from 'lib/rwd-stage';

/**
 * 遊戲結束畫面
 * @description 當遊戲結束，建立一個半透明背景對話框，加入遊戲結束及分數的文字，並加上重新遊戲按鈕。
 */
export class MonsterRaidersGameOver extends Container {
  constructor(public game: MonsterRaidersGame) {
    super();
    console.log('MonsterRaidersGameOver');
    // 畫對話框的背景
    this.drawBackground(480, 240);
    game.addChild(this);
    // 對話框置中
    this.position.set(
      (getStageSize().width - this.width) / 2,
      (getStageSize().height - this.height) / 2
    );
  }

  /**
   * 畫對話框的背景
   * @param width 寬
   * @param height 高
   */
  drawBackground(width: number, height: number) {
    const graphics = new Graphics();
    graphics.beginFill(0xffffff, 0.5);
    graphics.drawRoundedRect(0, 0, width, height, 10);
    graphics.endFill();
    this.addChild(graphics);
  }
}
