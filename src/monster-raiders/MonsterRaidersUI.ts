import { Container, Graphics, Sprite, Text } from 'pixi.js';
import { MonsterRaidersGame } from './MonsterRaidersGame';
import { getStageSize } from 'lib/rwd-stage';

export class MonsterRaidersUI extends Container {
  /**
   * 分數 UI
   */
  scoreText?: Text;

  /**
   * 音樂開關 UI
   */
  musicButton?: Sprite;

  constructor(public game: MonsterRaidersGame) {
    super();
    this.createScoreText();
  }

  /**
   * 建立遊戲分數
   */
  private async createScoreText() {
    // 等待字型載入
    await document.fonts.load('10px SpaceInvadersFont');
    // 畫分數文字的背景
    const graphics = new Graphics();
    graphics.beginFill(0x666666, 0.5);
    graphics.drawRoundedRect(-50, 0, 100, 28, 14);
    graphics.position.set(getStageSize().width / 2, 10);
    graphics.endFill();
    this.addChild(graphics);
    // 新增分數文字
    this.scoreText = new Text('', {
      fontFamily: 'SpaceInvadersFont',
      fontSize: 24,
      fill: 0xffffff
    });
    this.scoreText.y = 12;
    this.addChild(this.scoreText);
    // 設定分數
    this.setScore(this.game.score);
  }

  /**
   * 設定分數
   * @param score 分數
   */
  public setScore(score: number) {
    const scoreText = this.scoreText;
    if (scoreText) {
      scoreText.text = score.toLocaleString();
      // 分數置中
      scoreText.x = (getStageSize().width - scoreText.width) / 2;
    }
  }

  private createMusicButton() {}
}
