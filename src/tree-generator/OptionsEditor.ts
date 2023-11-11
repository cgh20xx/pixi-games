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
  }

  onButtonGrow(): void {
    this.generator.newTree();
  }
}
