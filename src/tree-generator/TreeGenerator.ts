import { Application, Text } from 'pixi.js';

export class TreeGenerator {
  // 產生樹參數
  options = {
    seed: 1, // 亂數種子 (同樣的種子會長出一樣的樹)
    trunkSize: 10, // 主幹粗細
    trunkLength: 120, // 主幹長度
    branchRate: 0.8, // 分支機率
    drawSpeed: 3, // 樹的成長速度
    leafBranchSize: 4, // 這個粗細以下的樹技會長樹葉
    branchColor: 0xffffff, // 樹枝顏色
    leafColor: 0x00aa00, // 葉子顏色
    flowerColor: 0xff6666 // 花的顏色
  };

  constructor(public app: Application) {
    const text = new Text('Tree', {
      fill: ['#ff0000', '#ff00ff']
    });
    app.stage.addChild(text);
  }
}
