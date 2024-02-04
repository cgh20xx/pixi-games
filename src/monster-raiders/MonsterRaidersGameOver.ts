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
    // 建立再玩一次按鈕
    this.createRestartButton(160);
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

  /**
   * 建立再玩一次按鈕
   * @param y 垂直座標
   */
  createRestartButton(y: number) {
    // 先建立整個按鈕的容器
    const button = new Container();
    // 幫按鈕加上圓角矩形背景
    const bg = new Graphics();
    bg.beginFill(0xffffff);
    bg.drawRoundedRect(0, 0, 240, 48, 24);
    bg.endFill();
    // 預設的按鈕背景底色
    bg.tint = 0x283593; // 使用 tint 較不吃系統資源
    button.addChild(bg);
    // 再加上重玩一次的按鈕標籤
    const label = new Text('Restart', {
      fontFamily: 'SpaceInvadersFont',
      fontSize: 36,
      fill: 0xffffff
    });
    label.resolution = 2;
    label.position.set(
      (bg.width - label.width) / 2,
      (bg.height - label.height) / 2
    );
    button.addChild(label);
    // 設定按鈕互動屬性
    button.eventMode = 'static';
    button.cursor = 'pointer';
    // 設定按鈕在對話框水平置中
    button.position.set((this.width - button.width) / 2, y);

    // 加入對話框容器
    this.addChild(button);

    // 偵聽滑鼠事件
    button.on('click', () => {
      this.game.destroy();
      new MonsterRaidersGame(this.game.app);
    });

    // 手機的觸碰結束事件
    button.on('touchend', event => {
      button.emit('click', event);
    });

    // 滑鼠滑入
    button.on('pointerover', () => {
      bg.tint = 0x3f51b5;
    });

    // 滑鼠滑出
    button.on('pointerout', () => {
      bg.tint = 0x283593;
    });
  }
}
