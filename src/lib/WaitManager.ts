import { Ticker } from 'pixi.js';
import { ArrayUtils } from './ArrayUtils';

class WaitProxy {
  constructor(
    /**
     * 結束時間 (單位為 frame)
     */
    public endTime: number,
    public resolve: () => void,
    public reject: (error: string) => void
  ) {}

  cancel() {
    this.reject('Wait canceled');
  }
}

/**
 * 等待管理員
 * @class 處理所有等待者，每個等待者會在指定的時間到會觸發 Promise.resolve()
 */
export class WaitManager {
  /**
   * 儲存所有 WaitProxy 的陣列
   */
  private waits: WaitProxy[] = [];

  /**
   * 目前經過的時間 單位：frame
   */
  private now = 0;

  constructor(public ticker: Ticker) {
    ticker.add(this.update, this);
  }

  /**
   * 取消偵聽 Ticker
   */
  destroy() {
    this.ticker.remove(this.update, this);
  }

  /**
   * 每次更新，累加經過時間，檢查所有等待 (WaitProxy) 是否有時間到，
   * 有的話執行 resolve() 並移除等待陣列。
   * @param dt deltaTime (frame)
   */
  private update(dt: number) {
    this.now += dt;
    // 持續 loop 直到等待陣列為空
    while (this.waits.length) {
      // 取得最前面的等待
      const first = this.waits[0];
      // 如果時間還沒到，離開 loop，不用再往下查
      if (first.endTime > this.now) {
        break;
      }
      // 把最前面的等待移除
      this.waits.shift();
      // 兌現等待的承諾
      first.resolve();
    }
  }

  /**
   * 新增等待的時間，回傳 Promise
   * @param ticks 等待的時間 ticks (frames)
   */
  add(ticks: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // 建立等待物件
      const wait = new WaitProxy(this.now + ticks, resolve, reject);
      // 放到等待陣列
      this.waits.push(wait);
      // 將陣列以 endTime 由小到大排序
      ArrayUtils.sortNumericOn(this.waits, 'endTime');
    });
  }
}
