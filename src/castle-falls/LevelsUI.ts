import { Container, Sprite } from 'pixi.js';
import { CastleFalls } from './CastleFalls';
import castleBgImg from 'images/castle-bg.jpg';

export class LevelsUI extends Container {
  constructor(public gameApp: CastleFalls) {
    super();
    // 加入介面背景圖
    const bg = Sprite.from(castleBgImg);
    bg.scale.set(0.5);
    this.addChild(bg);
  }
}
