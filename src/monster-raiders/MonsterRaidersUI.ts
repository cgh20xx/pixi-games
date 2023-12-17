import { Container, Sprite, Text } from 'pixi.js';
import { MonsterRaidersGame } from './MonsterRaidersGame';

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
  }

  private createScoreText() {}

  private createMusicButton() {}
}
