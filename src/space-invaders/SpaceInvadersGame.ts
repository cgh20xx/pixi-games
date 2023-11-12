import { Application } from 'pixi.js';

export class SpaceInvadersGame {
  constructor(public app: Application) {
    console.log('SpaceInvadersGame:', this);
  }

  destroy(): void {}
}
