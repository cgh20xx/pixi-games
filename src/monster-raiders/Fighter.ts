import { AnimatedGIF } from '@pixi/gif';
import { SpaceObject, SpaceObjectType } from './SpaceObject';
import fighterImg from 'images/space-fighter.gif';
import { gifFrom } from 'lib/PixiGifUtils';
// import { Rectangle } from 'pixi.js';
import { mouseGlobal } from 'lib/PixiMouseUtils';

export class Fighter extends SpaceObject {
  // 不用覆寫 constructor

  /**
   * 類型為`戰機`
   */
  get type(): SpaceObjectType {
    return 'fighter';
  }

  /**
   * 戰機的 GIF 繪圖器
   */
  private gif?: AnimatedGIF;

  /**
   * 覆寫 SpaceObject.init()
   * @override
   */
  protected init(): void {
    this.zIndex = 4;
    this.loadFighterGIF();
    this.hitRadius = 16;
    this.drawHitCircle();
    // this.startFacingMouse();
  }

  private async loadFighterGIF() {
    // 建立 AnimatedGIF
    this.gif = await gifFrom(fighterImg, {
      animationSpeed: 0.5
    });
    // 把 gif 加入戰機容器
    this.addChild(this.gif);
    this.gif.anchor.set(0.5);
    this.gif.scale.set(0.5);
  }

  /**
   * 使戰機轉向滑鼠方向 (棄用：改以滑鼠跟蹤器取代)
   */
  /*   private startFacingMouse() {
    // 開啟戰機容器的互動開關。(pixi v6 以前是使用 interactive = true)
    this.eventMode = 'static';
    // 將戰機可與滑鼠互動的範圍加大
    this.hitArea = new Rectangle(-5000, -5000, 10000, 10000);
    // 偵聽滑鼠移動事件
    this.on('pointermove', event => {
      // 取得滑鼠在遊戲畫面上的位置
      const mouseGlobal = event.global;
      // 將滑鼠座標轉換為戰機容器的相對位置
      const mouseLocal = this.toLocal(mouseGlobal);
      // 計算滑鼠座標相對於戰機的方向 (弧度)
      const radians = Math.atan2(mouseLocal.y, mouseLocal.x);
      // 將戰機轉向滑鼠的方向
      if (this.gif) {
        this.gif.rotation = radians;
      }
    });
  } */

  /**
   * 更新函式
   * @param dt 經過時間
   * @override
   */
  update(dt: number) {
    if (this.gif) {
      // 轉向滑鼠
      const facing = this.toLocal(mouseGlobal);
      const rotation = Math.atan2(facing.y, facing.x);
      this.gif.rotation = rotation;
    }
    super.update(dt);
  }
}
