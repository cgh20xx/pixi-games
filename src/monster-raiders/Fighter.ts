import { AnimatedGIF } from '@pixi/gif';
import { SpaceObject, SpaceObjectType } from './SpaceObject';
import fighterImg from 'images/space-fighter.gif';
import { gifFrom } from 'lib/PixiGifUtils';

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
}
