import { Application, Text } from 'pixi.js'

let app = new Application<HTMLCanvasElement>()
document.body.appendChild(app.view)

const text = new Text('Hello Pixi', {
  fill: ['#ff0000', '#ff00ff']
})

app.stage.addChild(text)