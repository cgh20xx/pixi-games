import { Container } from 'pixi.js';
import { MonsterRaidersGame } from './MonsterRaidersGame';

/**
 * 遊戲結束畫面
 * @description 當遊戲結束，建立一個半透明背景對話框，加入遊戲結束及分數的文字，並加上重新遊戲按鈕。
 */
export class MonsterRaidersGameOver extends Container {
  constructor(public game: MonsterRaidersGame) {
    super();
    console.log('MonsterRaidersGameOver');
    game.addChild(this);
  }
}
