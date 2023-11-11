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
    this.gui.add(options, 'seed', 1, 9999, 1);
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
