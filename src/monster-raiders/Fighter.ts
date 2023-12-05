import { AnimatedGIF } from '@pixi/gif';
import { SpaceObject, SpaceObjectType } from './SpaceObject';
import fighterImg from 'images/space-fighter.gif';

export class Fighter extends SpaceObject {
  // 不用覆寫 constructor

  /**
   * 類型為`戰機`
   */
  get type(): SpaceObjectType {
    return 'fighter';
  }

  /**
   * 覆寫 SpaceObject.init()
   * @override
   */
  protected init(): void {
    this.zIndex = 4;
    this.loadFighterGIF();
  }

  private async loadFighterGIF() {
    // 取得下載 gif 的 response
    const res = await fetch(fighterImg);
    const buffer = await res.arrayBuffer();
    const gif = AnimatedGIF.fromBuffer(buffer);
    // 把 gif 加入戰機容器
    this.addChild(gif);
  }
}
