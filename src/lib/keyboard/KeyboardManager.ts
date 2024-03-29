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

  /**
   * 等待鍵盤按鍵被按下去
   * @param keyCode 按鍵代碼 ex: KeyCode.A
   */
  async waitUserPressKey(keyCode: string) {
    return new Promise<void>(resolve => {
      // 宣告發現按鍵被按下去的 callback function
      const onPress = (event: KeyboardEvent) => {
        // 如果按鍵是我們正在等的
        if (event.code === keyCode) {
          // 取消 pressed 事件偵聽
          this.off('pressed', onPress);
          // 兌現承諾
          resolve();
        }
      };
      // 偵聽 pressed 事件
      this.on('pressed', onPress);
    });
  }

  /**
   * 等待鍵盤按鍵被放開
   * @param keyCode 按鍵代碼 ex: KeyCode.A
   */
  async waitUserReleaseKey(keyCode: string) {
    return new Promise<void>(resolve => {
      // 宣告發現按鍵被放開的 callback function
      const onRelease = (event: KeyboardEvent) => {
        // 如果按鍵是我們正在等的
        if (event.code === keyCode) {
          // 取消 released 事件偵聽
          this.off('released', onRelease);
          // 兌現承諾
          resolve();
        }
      };
      // 偵聽 released 事件
      this.on('released', onRelease);
    });
  }
}
// 一般情況下，鍵盤只有一個，只需要一個鍵盤管理員。
export const keyboardManager = new KeyboardManager();
