import { Application, Text } from 'pixi.js';

export class TreeGenerator {
  constructor(app: Application) {
    const text = new Text('Tree', {
      fill: ['#ff0000', '#ff00ff']
    });
    app.stage.addChild(text);
  }
}
