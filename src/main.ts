import './style.css'

// import './basic/add-text'
// import { setStageSize } from './basic/rwd-stage'
// import './games/DiceGame'
import { RandomGenerator } from './lib/RandomGenerator'

const rng = new RandomGenerator(1)

for (let index = 0; index < 10; index++) {
  let rnd = rng.next()
console.log(rnd)
}

// 設定舞台尺寸
// setStageSize(100, 200);