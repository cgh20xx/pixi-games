# 這個專案從 pixi.js v7 升級到v8所做的變更

待補

# v7升級到v8的重點

## App的初始化

Application 的初始化改成非同步，所以在 main.ts 要用非同步的方式啟動 Application，再設定其他有用到 Application 的物件。

另外，Application 中原本代表繪圖板的 view 屬性，改了名字變成 canvas。

```typescript
// v7 的啟動
let app = new Application<HTMLCanvasElement>();
document.body.appendChild(app.view);

// v8 的啟動
async function startApp() {
  let app = new Application();
  await app.init();
  document.body.appendChild(app.canvas);
  return app;
}
```

## Assets

以前用來載入資源的 Loader 改成 Assets，而且v8版鼓勵事件預載資源，所以現在無法用 BaseTexture.from(url) 先建立材質，讓 pixi 在內部載入完成後自動更新繪圖。

```typescript
// v7 以前可以這樣
let baseTexture = BaseTexture.from(url);
let texture = new Texture(baseTexture);
let sprite = new Sprite(texture);
// 此時的材質其實還沒載入完成，所以 sprite 實際上不會繪製圖形
baseTexture.once('loaded', () => {
  // 這個時候載入才完成，sprite 也才會有正確的長寬屬性
});
```

```typescript
// 在 v8 的時候可能就要改成這樣。
async function preload() {
  Assets.add({ alias: 'myImage', src: myImage_url });
  await Assets.load();
}
async function startGame() {
  // 以 Assets 先將圖形資源都載入
  await preload();
  // 然後再將材質取出來用
  let texture = Assets.get('myImage');
  let sprite = new Sprite({ texture: texture });
}
```
