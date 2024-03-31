# 這個專案從 pixi.js v7 升級到v8所做的變更

待補

# v7 升級到 v8 的重點

## App 的初始化

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

## Bounds

用來檢查繪圖物件邊界範圍的Bounds長得和 v7 的不一樣了。在 v7 的 Bounds 實際上就是一個 Rectangle，但在 v8 中的 Bounds 有自己的類別。

```typescript
// v7 的bounds
function collides(obj1: DisplayObject, obj2: DisplayObject): boolean {
  let bounds1: Rectangle = obj1.getBounds();
  let bounds2: Rectangle = obj2.getBounds();
  return bounds1.intersects(bounds2);
}
```

```typescript
// v8 的bounds
function collides(obj1: Container, obj2: Container): boolean {
  let bounds1: Bounds = obj1.getBounds();
  let bounds2: Bounds = obj2.getBounds();
  return bounds1.rectangle.intersects(bounds2.rectangle);
}
```

## Point 與 Rectangle

原本的專案中有幫 Point 與 Rectangle 加了許多功能，比如 length(), dot() 等向量的計算，但在 v8 中都有內建這些功能了。

不過 dot(內積), cross(外積), add(向量相加)等功能是寫在 math-extras 的外掛模組中，所以雖然寫程式時可以看到 Point 有這些功能，但實際在執行的時候呼叫這些函式會出錯。

所以在PointUtils.ts裏面，我們需要手動將 math-extras 載入我們的專案。

```typescript
/** PointUtils.ts */
...
import 'pixi.js/math-extras';
...
```

pixi.js v8 中給 Point 配上的 normalize() 和先前我們專案寫的不一樣。我們寫的 normalize(length?: number): number 可以給一個最後要給向量的長度作為參數，並回傳執行前的向量長度。

v8的normalize() 不接受參數，且回傳值為一個新的向量。所以要將向量調整成我們要的長度，就要用新的方法。

```typescript
// 在 v8 調整向量長度的方法
let point = new Point(3, 4);
// 將向量長度拉長到 50
let currentLength = point.length();
if (currentLength) {
  point.scale(50 / currentLength);
}
```
