import { EventEmitter } from 'eventemitter3';
// npm i pixi.js 內就有依賴 eventemitter3 所以不需再 npm install
/**
 * 鍵盤按鍵管理員
 */
export class KeyboardManager extends EventEmitter {
  /**
   * 記錄每個鍵是否在按下去的狀態
   */
  private isKeyDownMap: { [key: string]: boolean } = {};

  constructor() {
    super();
    this.listenToEvents();
  }

  /**
   * 偵聽 keydown keyup 事件
   */
  private listenToEvents(): void {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  /**
   * 提供遊戲函式檢查某個鍵是否在按下去的狀態
   * @param keyCode 按鍵的 keyCode. Ex: 'KeyA'
   * @returns 某鍵是否按下？
   */
  isKeyDown(keyCode: string): boolean {
    return this.isKeyDownMap[keyCode];
  }

  /**
   * 在鍵盤按下去時的處理函式
   * @param event window 發出的 KeyboardEvent 事件
   * @fires KeyboardManager#keydown
   * @fires KeyboardManager#pressed
   */
  private onKeyDown = (event: KeyboardEvent) => {
    // 雖然遊戲很少用到 keydown 事件，但還是把 keydown 原始事件發出，在有需要下可以使用。
    this.emit('keydown', event);

    if (!this.isKeyDown(event.code)) {
      this.isKeyDownMap[event.code] = true;
      this.emit('pressed', event);
    }
  };

  /**
   * 在放開鍵盤上的鍵時的處理函式
   * @param event window 發出的 KeyboardEvent 事件
   * @fires KeyboardManager#keyup
   * @fires KeyboardManager#released
   */
  private onKeyUp = (event: KeyboardEvent) => {
    // 雖然遊戲很少用到 keyup 事件，但還是把 keyup 原始事件發出，在有需要下可以使用。
    this.emit('keyup', event);

    if (this.isKeyDown(event.code)) {
      this.isKeyDownMap[event.code] = false;
      this.emit('released', event);
    }
  };
}
// 一般情況下，鍵盤只有一個，只需要一個鍵盤管理員。
export const keyboardManager = new KeyboardManager();
