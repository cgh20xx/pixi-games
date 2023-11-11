import { GUI } from 'dat.gui';
import { TreeGenerator } from './TreeGenerator';

/**
 * GUI 參數編輯器
 */
export class OptionsEditor {
  // 建立參數面板
  gui = new GUI();

  constructor(public generator: TreeGenerator) {
    const options = generator.options;
    this.gui.add(options, 'seed', 1, 9999, 1).name('亂數種子');
    this.gui.add(options, 'trunkSize', 1, 15, 1).name('主幹粗細');
    this.gui.add(options, 'trunkLength', 1, 200, 1).name('主幹長度');
    this.gui.add(options, 'branchRate', 0, 1, 0.1).name('分支機率');
    this.gui.add(options, 'drawSpeed', 1, 100, 1).name('生長速度');
    this.gui.add(options, 'leafBranchSize', 1, 10, 1).name('長葉支幹粗細');
    this.gui.addColor(options, 'branchColor').name('枝幹顏色');
    this.gui.addColor(options, 'leafColor').name('樹葉顏色');
    this.gui.addColor(options, 'flowerColor').name('花朵顏色');
    this.gui.add(this, 'onButtonGrow').name('重新生長');
    this.gui.add(this, 'onButtonNext').name('重新生長下一顆樹');
  }

  /**
   * 重新生長
   */
  onButtonGrow(): void {
    this.generator.newTree();
  }

  /**
   * 重新生長下一棵樹
   */
  onButtonNext(): void {
    this.generator.options.seed += 1;
    this.generator.newTree();
    // 因手動改變 seed，但 GUI 不知道，所以要呼叫 updateDisplay()
    this.gui.updateDisplay();
  }
}
