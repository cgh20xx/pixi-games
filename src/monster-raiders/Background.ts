import { Container, Texture, TilingSprite } from 'pixi.js';
import { MonsterRaidersGame } from './MonsterRaidersGame';
import starrySpaceImg from 'images/starry-space.png';
import { getStageSize } from 'lib/rwd-stage';

/**
 * 星空循環背景
 */
export class Background extends Container {
  /**
   * 星空 TilingSprite
   * @see https://pixijs.com/examples/sprite/tiling-sprite
   */
  starrySprite: TilingSprite;

  constructor(public game: MonsterRaidersGame) {
    super();
    // 黑底星空
    const texture = Texture.from(starrySpaceImg);
    this.starrySprite = new TilingSprite(
      texture,
      getStageSize().width,
      getStageSize().height
    );
    this.addChild(this.starrySprite);
    this.starrySprite.tileScale.set(0.5);
    // 將 Background 加入遊戲容器的最底層
    game.addChildAt(this, 0);
    // 開始更新循環
    this.game.app.ticker.add(this.update, this);
  }

  /**
   * 銷毀星空背景物件
   * @override
   */
  destroy() {
    super.destroy();
    this.game.app.ticker.remove(this.update, this);
  }

  /**
   * 更新函式
   * @param dt 經過時間
   */
  update(dt: number) {
    // 讓背景跟據攝影機的位置以一定比例去平移
    const camera = this.game.camera;
    // 以 0.2 的比例平移最下層黑底星空的 tile 原點
    const shiftRate = 0.2;
    this.starrySprite.tilePosition.set(
      -camera.position.x * shiftRate,
      -camera.position.y * shiftRate
    );
  }
}
