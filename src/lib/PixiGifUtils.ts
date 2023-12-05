import { AnimatedGIF, AnimatedGIFOptions } from '@pixi/gif';
import { Assets } from 'pixi.js';

/**
 * 依 GIF 資料來源建立 AnimatedGIF
 * @param source 產生 GIF 的資料來源，可以是網址或原始的 GIF 資料 (ArrayBuffer)
 * @param options [可選] AnimatedGIFOptions
 * @returns Promise<AnimatedGIF>
 */
export async function gifFrom(
  source: string | ArrayBuffer,
  options?: Partial<AnimatedGIFOptions>
) {
  // 如果 source 是 ArrayBuffer
  if (source instanceof ArrayBuffer) {
    // 直接產生 AnimatedGIF
    const gif = AnimatedGIF.fromBuffer(source);
    return Promise.resolve(gif);
  } else {
    // 使用 Pixi 的 Assets 資源管理系統載入 GIF
    const gif = await Assets.load<AnimatedGIF>({
      src: source,
      data: options
    });
    return gif;
  }
}
