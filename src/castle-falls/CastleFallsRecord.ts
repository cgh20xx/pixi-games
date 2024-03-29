/**
 * 關卡紀錄的資料結構
 */
export interface LevelRecord {
  /**
   * 是否通關
   */
  cleared: boolean;
  // 未來可繼續新增 關卡分數、通關時間 等資料
}

/**
 * 遊戲的紀錄類別
 */
export class CastleFallsRecord {
  /**
   * 記憶體中暫存遊戲紀錄的物件
   */
  private levelRecords: { [key: string]: LevelRecord } = {};

  constructor() {
    this.load();
  }

  /**
   * 讀取之前的遊戲紀錄
   */
  private load(): void {
    const strData = localStorage.getItem('castleFallsRecords');
    if (strData) {
      this.levelRecords = JSON.parse(strData);
    } else {
      this.levelRecords = {};
    }
  }

  /**
   * 儲存遊戲紀錄至 localStorage
   */
  private save(): void {
    const strData = JSON.stringify(this.levelRecords);
    localStorage.setItem('castleFallsRecords', strData);
  }

  /**
   * 記錄關卡
   * @param level 關卡
   * @param record 關卡紀錄
   */
  public setLevelRecord(level: number, record: LevelRecord): void {
    this.levelRecords[level] = record;
    this.save();
  }

  /**
   * 檢查某關是否已通關
   * @param level 關卡
   */
  isLevelCleared(level: number): boolean {
    const record = this.levelRecords[level];
    return record && record.cleared;
  }

  /**
   * 檢查某關是否已解鎖
   * @param level 關卡
   */
  isLevelUnlocked(level: number): boolean {
    // 第一關預設開啟
    // 否則檢查第二關以後的關卡，需先檢查上一關是否通關。
    return level === 1 || this.isLevelCleared(level - 1);
  }
}
