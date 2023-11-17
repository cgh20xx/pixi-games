import { PlayOptions, Sound } from '@pixi/sound';

const soundLib: { [key: string]: Sound } = {};

export async function playSound(source: string, options?: PlayOptions) {
  let sound = soundLib[source];
  if (!sound) {
    soundLib[source] = sound = Sound.from(source);
  }
  // sound.play() 回傳的可能是 ImediaInstance | Promise
  // 所以前面加上 await，就算後面不是 Promise 也會被 Promise 包裝
  return await sound.play(options);
}
