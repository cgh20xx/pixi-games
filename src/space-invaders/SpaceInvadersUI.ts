import { BaseTexture, Container, Sprite, Text } from 'pixi.js';
import cannonImage from 'images/cannon.png';

/**
 * 建立遊戲 UI 文字
 */
export class SpaceInvadersUI extends Container {
  /**
   * 遊戲分數
   */
  private score = 0;

  // 因會等到字型載入完成才建立文字繪圖器，所以 scoreText 會有一小段時間是空值
  /**
   * 遊戲分數 UI
   */
  private scoreText?: Text;

  /**
   * 砲台生命數
   */
  private lives = 3;

  /**
   * 砲台生命圖陣列
   */
  private liveSprites: Sprite[] = [];

  constructor() {
    super();
    this.loadUI();
  }

  private async loadUI() {
    // 等待字型載入完畢 (load 第 1 個參數格式為 css font 格式)
    await document.fonts.load('10px SpaceInvadersFont');
    this.createText('SCORE', '#ffffff', 30, 10);
    this.createText('LIVES', '#ffffff', 430, 10);
    // 顯示分數的繪圖器
    this.scoreText = this.createText(
      this.score.toLocaleString(),
      '#99ff00',
      110,
      10
    );
    this.setLives(this.lives);
  }

  /**
   * 建立文字到舞台中
   * @param label 文字
   * @param color 填充顏色
   * @param x 水平座標
   * @param y 垂直座標
   * @returns Text
   */
  private createText(label: string, color: string, x: number, y: number) {
    // 新增 Pixi 提供的 Text 物件
    const text = new Text(label, {
      fontFamily: 'SpaceInvadersFont',
      fontSize: 24,
      fill: color
    });
    // 提高文字解析度
    text.resolution = 2;
    text.position.set(x, y);
    this.addChild(text);
    return text;
  }

  /**
   * 增加遊戲分數
   * @param score 要增加的遊戲分數
   */
  addScore(score: number): void {
    this.score += score;
    if (this.scoreText) {
      this.scoreText.text = this.score.toLocaleString();
    }
  }

  /**
   * 取得遊戲分數
   * @returns score
   */
  getScore(): number {
    return this.score;
  }

  /**
   * 更新砲台生命數
   * @param lives 生命數
   */
  setLives(lives: number) {
    // 更新生命數
    this.lives = lives;
    // 將多餘的砲台生命圖清掉
    while (this.liveSprites.length > this.lives) {
      const sprite = this.liveSprites.pop();
      sprite?.destroy();
    }
    // 準備砲台的材質基底備用
    const baseTexture = BaseTexture.from(cannonImage);
    // 補足不夠的砲台生命圖
    while (this.liveSprites.length < this.lives) {
      // 下一個生命圖的 index
      const index = this.liveSprites.length;
      // 新增精靈圖、設定位置並縮小、加入 UI 容器
      const sprite = Sprite.from(baseTexture);
      sprite.position.set(510 + 42 * index, 11);
      sprite.scale.set(0.6);
      this.addChild(sprite);
      // 將新增的精靈圖加入生命圖陣列
      this.liveSprites.push(sprite);
    }
  }

  /**
   * 取得砲台生命數
   * @returns 砲台生命數
   */
  getLives(): number {
    return this.lives;
  }
}
