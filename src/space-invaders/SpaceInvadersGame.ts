import { Application } from 'pixi.js';
import { PlayerCannon } from './PlayerCannon';
import { Invader } from './Invader';

export class SpaceInvadersGame {
  // 玩家砲台
  cannon: PlayerCannon;
  // 侵略者大軍
  invaders: Invader[] = [];

  constructor(public app: Application) {
    this.cannon = new PlayerCannon(this);
    this.createInvadersRow({
      type: 0,
      x: 120,
      y: 240,
      amount: 6
    });
  }

  destroy(): void {
    this.cannon.destroy();
  }

  /**
   * 建立一排侵略者大軍
   * @param options
   */
  private createInvadersRow(options: {
    type: number; // 外形
    x: number; // 最左邊的 x
    y: number; // 這一排的 y
    amount: number; // 總共要幾隻
  }) {
    const xInterval = 60; // x 間隔
    for (let i = 0; i < options.amount; i++) {
      const invader = new Invader(
        this,
        options.x + xInterval * i,
        options.y,
        options.type
      );
      this.invaders.push(invader);
    }
  }
}
