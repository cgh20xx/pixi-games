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
    // todo
  }

  /**
   * 儲存遊戲紀錄
   */
  private save(): void {
    // todo
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
    // todo
  }

  /**
   * 檢查某關是否已解鎖
   * @param level 關卡
   */
  isLevelUnlocked(level: number): boolean {
    // todo
  }
}
