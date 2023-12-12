/**
 * 響應式 canvas 尺寸且舞台自動縮放並 fit 畫布
 * 這隻檔案適合用在有框架的環境
 */
import { Application, Graphics, Rectangle } from 'pixi.js';
import { EventEmitter } from 'eventemitter3';

// export let app: Application;
// export const app = new Application<HTMLCanvasElement>();
// document.body.appendChild(app.view);

// 新增一個繪圖元件來畫舞台的外框
const stageFrame = new Graphics();

export function initApp(app: Application) {
  app.stage.addChild(stageFrame);
}

// 使用通用物件來儲存舞台的尺寸
const stageSize = {
  width: 0,
  height: 0
};

/**
 * 全畫面範圍的矩形 (這裡的全畫面是以 stageSize 去盡可能的上下或左右延伸畫面，非 window 寬高)
 * */
export const fullScreenArea = new Rectangle();

/**
 * 事件發報機，當舞台大小改變時，用來發送事件
 */
export const stageSizeEvent = new EventEmitter();

/**
 * 重繪舞台的外框
 */
function redrawStageFrame(): void {
  stageFrame.clear(); // 清除繪圖器
  stageFrame.lineStyle({
    width: 2,
    color: 0xff0000
  });
  stageFrame.drawRect(0, 0, stageSize.width, stageSize.height);
}

/**
 * 設定舞台大小
 * @param width 舞台寬
 * @param height 舞台高
 */
export function setStageSize(width: number, height: number): void {
  stageSize.width = width;
  stageSize.height = height;
  redrawStageFrame();
}

/**
 * 根據舞台尺寸 (stageSize) 與瀏覽器視窗大小來調整 app.stage 的縮放與位置
 */
export function refreshCanvasAndStage(app: Application): void {
  // 首先取得瀏覽器的視窗大小
  const winSize = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  // console.log('innerWidth:', winSize.width);

  // 將 app 裡的畫布尺寸同步到視窗大小
  app.renderer.resize(winSize.width, winSize.height);

  // 計算舞台最多可以放大多少倍，才能儘量佔滿視窗又不超出畫面
  const scale = Math.min(
    winSize.width / stageSize.width,
    winSize.height / stageSize.height
  );
  // 將舞台按計算結果縮放尺寸
  app.stage.scale.set(scale);

  // 計算舞台在經過縮放後的實際尺寸
  const stageRealSize = {
    width: stageSize.width * scale,
    height: stageSize.height * scale
  };

  // 計算並平移舞台位置，讓舞台置中於視窗內
  app.stage.position.set(
    (winSize.width - stageRealSize.width) / 2,
    (winSize.height - stageRealSize.height) / 2
  );

  // 計算全畫面矩形的位置與大小
  fullScreenArea.x = -app.stage.x / scale;
  fullScreenArea.y = -app.stage.y / scale;
  fullScreenArea.width = winSize.width / scale;
  fullScreenArea.height = winSize.height / scale;
  // 發報舞台改變事件
  stageSizeEvent.emit('resize', stageSize);
}

/**
 * 設定外框顯示與否
 */
export function setStageFrameVisible(visible: boolean): void {
  stageFrame.visible = visible;
}

/**
 * 取得舞台尺寸
 */
export function getStageSize() {
  return {
    width: stageSize.width,
    height: stageSize.height
  };
}

// 偵聽視窗的 resize 事件 (改交由 react useEffect 處理)
// window.addEventListener('resize', refreshCanvasAndStage);
