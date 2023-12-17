import {
  BaseTexture,
  Container,
  Graphics,
  Rectangle,
  Sprite,
  Text,
  Texture
} from 'pixi.js';
import { MonsterRaidersGame } from './MonsterRaidersGame';
import { getStageSize } from 'lib/rwd-stage';
import musicNotesImg from 'images/music-notes.png';

export class MonsterRaidersUI extends Container {
  /**
   * 分數 UI
   */
  scoreText?: Text;

  /**
   * 音樂開關 UI
   */
  musicButton?: Sprite;

  constructor(public game: MonsterRaidersGame) {
    super();
    this.createScoreText();
    this.createMusicButton();
  }

  /**
   * 建立遊戲分數
   */
  private async createScoreText() {
    // 等待字型載入
    await document.fonts.load('10px SpaceInvadersFont');
    // 畫分數文字的背景
    const graphics = new Graphics();
    graphics.beginFill(0x666666, 0.5);
    graphics.drawRoundedRect(-50, 0, 100, 28, 14);
    graphics.position.set(getStageSize().width / 2, 10);
    graphics.endFill();
    this.addChild(graphics);
    // 新增分數文字
    this.scoreText = new Text('', {
      fontFamily: 'SpaceInvadersFont',
      fontSize: 24,
      fill: 0xffffff
    });
    this.scoreText.y = 12;
    this.addChild(this.scoreText);
    // 設定分數
    this.setScore(this.game.score);
  }

  /**
   * 設定分數
   * @param score 分數
   */
  public setScore(score: number) {
    const scoreText = this.scoreText;
    if (scoreText) {
      scoreText.text = score.toLocaleString();
      // 分數置中
      scoreText.x = (getStageSize().width - scoreText.width) / 2;
    }
  }

  /**
   * 建立音樂開關按鈕
   */
  private createMusicButton() {
    // 準備音樂開與關兩個圖示材質 (從同一個 BaseTexture 分別建立)
    const baseTexture = BaseTexture.from(musicNotesImg);
    // 音樂開材質
    const musicOnTexture = new Texture(
      baseTexture,
      new Rectangle(0, 0, 64, 64)
    );
    // 音樂關材質
    const musicOffTexture = new Texture(
      baseTexture,
      new Rectangle(64, 0, 64, 64)
    );
    // 建立按鈕的精靈啤
    const button = new Sprite();
    button.position.set(getStageSize().width - 36, 12);
    button.scale.set(0.4);
    button.eventMode = 'static';
    button.cursor = 'pointer';
    this.addChild(button);

    /**
     * 更新按鈕的圖案
     */
    const refreshButton = () => {
      const music = this.game.music;
      if (music && music.muted) {
        button.texture = musicOffTexture;
      } else {
        button.texture = musicOnTexture;
      }
    };

    refreshButton();
  }
}
