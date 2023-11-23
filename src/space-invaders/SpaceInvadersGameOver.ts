import { Container, Graphics, Text } from 'pixi.js';
import { SpaceInvadersGame } from './SpaceInvadersGame';
import { getStageSize } from 'lib/rwd-stage';

export class SpaceInvadersGameOver extends Container {
  constructor(public game: SpaceInvadersGame) {
    super();
    this.loadUI();
  }

  async loadUI() {
    this.createBackground();
    this.createGameOverText();
    await this.game.wait(60);
    this.createRestartText();
    await this.waitUserPressSpace();
    // 重建遊戲
    // this.destroy();
    // new SpaceInvadersGame(this.game.app);
    // TODO: 可用觀察者模式發佈 GameOver 事件？
  }

  /**
   * 新增蓋住遊戲畫面的半透明黑布
   */
  private createBackground() {
    const marginTop = 30;
    const stageSize = getStageSize();
    const graphics = new Graphics();
    graphics.beginFill(0, 0.8);
    graphics.drawRect(
      0,
      marginTop,
      stageSize.width,
      stageSize.height - marginTop
    );
    graphics.endFill();
    this.addChild(graphics);
  }

  /**
   * 新增 GAME OVER 字幕
   */
  private createGameOverText() {
    const text = new Text('GAME OVER', {
      fontFamily: 'SpaceInvadersFont',
      fontSize: 40,
      fill: '#ff0000'
    });
    const stageSize = getStageSize();
    text.position.set(
      (stageSize.width - text.width) / 2,
      stageSize.height / 2 - text.height
    );
    this.addChild(text);
  }

  /**
   * 新增再玩一次的提示 & 閃動動畫
   */
  private async createRestartText() {
    const text = new Text('Press SPACE to try again', {
      fontFamily: 'SpaceInvadersFont',
      fontSize: 24,
      fill: '#ff0000'
    });
    const stageSize = getStageSize();
    text.position.set(
      (stageSize.width - text.width) / 2,
      stageSize.height * 0.6
    );
    this.addChild(text);
    // 文字閃動效果，無限迴圈，直到 text 被 destroy
    while (!text.destroyed) {
      text.visible = !text.visible;
      await this.game.wait(30);
    }
  }

  /**
   * 等待玩家按下空白鍵
   */
  async waitUserPressSpace() {}
}
