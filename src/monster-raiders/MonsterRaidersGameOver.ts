import { Container, Graphics, Text } from 'pixi.js';
import { MonsterRaidersGame } from './MonsterRaidersGame';
import { getStageSize } from 'lib/rwd-stage';

/**
 * 遊戲結束畫面
 * @description 當遊戲結束，建立一個半透明背景對話框，加入遊戲結束及分數的文字，並加上重新遊戲按鈕。
 */
export class MonsterRaidersGameOver extends Container {
  constructor(public game: MonsterRaidersGame) {
    super();
    // 畫對話框的背景
    this.drawBackground(480, 240);
    // 寫上遊戲結束的字
    this.drawGameOverText(20);
    // 寫上分數文字
    this.drawScoreText(100);
    // 加入遊戲容器中
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

  /**
   * 寫上遊戲結束文字
   * @param y 垂直座標
   */
  drawGameOverText(y: number) {
    const gameOverText = new Text('GAME OVER', {
      fontFamily: 'SpaceInvadersFont',
      fontSize: 64,
      fill: 0x990000
    });
    gameOverText.resolution = 2;
    gameOverText.position.set((this.width - gameOverText.width) / 2, y);
    this.addChild(gameOverText);
  }

  /**
   * 寫上分數文字
   * @param y 垂直座標
   */
  drawScoreText(y: number) {
    const score = this.game.score.toLocaleString();
    const scoreText = new Text(`SCORE ${score}`, {
      fontFamily: 'SpaceInvadersFont',
      fontSize: 32,
      fill: 0x006600
    });
    scoreText.resolution = 2;
    scoreText.position.set((this.width - scoreText.width) / 2, y);
    this.addChild(scoreText);
  }
}
