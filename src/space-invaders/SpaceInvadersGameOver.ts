import { Container, Graphics } from 'pixi.js';
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
    await this.game.wait(120);
    this.createRestartText();
    await this.waitUserPressSpace();
    // 重建遊戲
    this.destroy();
    new SpaceInvadersGame(this.game.app);
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
   * 新增遊戲結速的字幕
   */
  private createGameOverText() {}

  /**
   * 新增再玩一次的提示 & 動畫
   */
  private async createRestartText() {}

  /**
   * 等待玩家按下空白鍵
   */
  async waitUserPressSpace() {}
}
