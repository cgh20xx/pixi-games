import { Container, Texture, TilingSprite } from 'pixi.js';
import { MonsterRaidersGame } from './MonsterRaidersGame';
import starrySpaceImg from 'images/starry-space.png';
import starsImg from 'images/stars.png';
import { getStageSize } from 'lib/rwd-stage';

/**
 * 星空循環背景
 */
export class Background extends Container {
  /**
   * 黑底星空 TilingSprite
   * @see https://pixijs.com/examples/sprite/tiling-sprite
   */
  starrySprite: TilingSprite;

  /**
   * 半透明星空 TilingSprite
   * @see https://pixijs.com/examples/sprite/tiling-sprite
   */
  starsSprite: TilingSprite;

  constructor(public game: MonsterRaidersGame) {
    super();
    // 黑底星空
    this.starrySprite = new TilingSprite(
      Texture.from(starrySpaceImg),
      getStageSize().width,
      getStageSize().height
    );
    this.addChild(this.starrySprite);
    this.starrySprite.tileScale.set(0.5);
    // 將 Background 加入遊戲容器的最底層
    game.addChildAt(this, 0);
    // 半透明星空
    this.starsSprite = new TilingSprite(
      Texture.from(starsImg),
      getStageSize().width,
      getStageSize().height
    );
    this.addChild(this.starsSprite);
    this.starsSprite.tileScale.set(0.8);
    // 開始更新循環
    this.game.app.ticker.add(this.update, this);
  }

  /**
   * 銷毀背景容器
   * @override
   */
  destroy() {
    super.destroy();
    this.game.app.ticker.remove(this.update, this);
  }

  /**
   * 更新函式
   */
  update() {
    // 讓背景根據攝影機的位置以一定比例去平移
    const camera = this.game.camera;
    // 以 0.2 的比例平移最下層黑底星空的 tile 原點
    let shiftRate = 0.2;
    this.starrySprite.tilePosition.set(
      -camera.position.x * shiftRate,
      -camera.position.y * shiftRate
    );

    // 以 0.25 的比例平移半透明星空的 tile 原點，營造視差效果
    shiftRate = 0.25;
    this.starsSprite.tilePosition.set(
      -camera.position.x * shiftRate,
      -camera.position.y * shiftRate
    );
  }
}
