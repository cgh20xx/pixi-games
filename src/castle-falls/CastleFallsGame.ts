import { Container } from 'pixi.js';
import { CastleFalls } from './CastleFalls';
import { Engine, Runner } from 'matter-js';
import { MatterRender } from 'lib/matter/MatterRender';
import { getStageSize, stageSizeEvent } from 'lib/rwd-stage';

export class CastleFallsGame extends Container {
  engine = Engine.create();
  runner = Runner.create();
  matterRender: MatterRender;

  constructor(
    public gameApp: CastleFalls,
    public level: number
  ) {
    super();
    // 用 zIndex 來安排 pixi 繪圖物件的層級
    this.sortableChildren = true;
    // 建立 matter.js 除錯用的繪圖器
    this.matterRender = new MatterRender(
      this.engine,
      this.gameApp.app.stage,
      getStageSize()
    );

    stageSizeEvent.on('resize', this.matterRender.align, this.matterRender);
  }

  destroy() {
    super.destroy();
    stageSizeEvent.off('resize', this.matterRender.align, this.matterRender);
    this.matterRender.destroy();
    Runner.stop(this.runner);
  }
}
