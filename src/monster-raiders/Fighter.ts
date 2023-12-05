import { SpaceObject, SpaceObjectType } from './SpaceObject';

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
  }
}
