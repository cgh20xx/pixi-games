import { Rectangle } from 'pixi.js';
import { CannonBall } from './CannonBall';
import { getStageSize } from 'lib/rwd-stage';

/**
 * 外星人的子彈
 * @class
 */
export class InvaderBullet extends CannonBall {
  /**
   * @override
   */
  protected getSpriteTextureFrame(): Rectangle {
    // 外星人子彈的圖範圍為 4x14
    return new Rectangle(6, 0, 6, 14);
  }

  /**
   * 外星人子彈移動的更新函式
   * @param dt 經過時間
   */
  moveUpdate(dt: number): void {
    const sprite = this.sprite;
    const speed = 2;
    sprite.y += speed * dt;
    // 向下超出舞台範圍時，刪除自己
    if (this.sprite.y > getStageSize().height * this.sprite.height) {
      this.destroy();
    } else {
      const cannon = this.game.cannon;
      const cannonBounds = cannon.sprite.getBounds();
      // 測試有沒有撞到玩家砲胎
      if (cannonBounds.intersects(sprite.getBounds())) {
        // 呼叫 game 裡處理砲台毀壞的函式
        // TODO：
        console.log('hit cannon');
        // 再把自己也銷毀
        this.destroy();
      }
    }
  }
}
