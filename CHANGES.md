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
