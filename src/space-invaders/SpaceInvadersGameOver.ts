import { Container } from 'pixi.js';
import { SpaceInvadersGame } from './SpaceInvadersGame';

export class SpaceInvadersGameOver extends Container {
  constructor(public game: SpaceInvadersGame) {
    super();
    this.loadUI();
  }

  async loadUI() {}

  /**
   * 新增蓋住遊戲畫面的半透明黑布
   */
  private createBackground() {}

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
