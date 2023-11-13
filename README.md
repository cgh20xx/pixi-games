# Pixi Games 🕹️

此專案為學習 pixi.js + TypeScript 開發小遊戲，搭配 Vitest 進行單元測試及 React router 切換不同小遊戲。

## 🔧 技術棧：

- PixiJS
- TypeScript
- Vite
- Vitest
- React

## 📁 專案結構：

```
.
├── public
│   └── favicon.png
├── src
│   ├── basic
│   │   ├── add-text.ts
│   │   └── rwd-stage-vanilla.ts
│   ├── images
│   │   └── cannon.png
│   ├── lib
│   │   ├── keyboard
│   │   │   ├── KeyCode.ts
│   │   │   └── KeyboardManager.ts
│   │   ├── ArrayUtils.ts
│   │   ├── Dice.ts
│   │   ├── MathUtils.ts
│   │   ├── PointUtils.ts
│   │   ├── RandomGenerator.ts
│   │   ├── RectUtils.ts
│   │   ├── StringUtils.ts
│   │   └── rwd-stage.ts
│   ├── pages
│   │   ├── NotFound.tsx
│   │   ├── SpaceInvaders.tsx
│   │   └── Tree.tsx
│   ├── space-invaders
│   │   ├── PlayerCannon.ts
│   │   └── SpaceInvadersGame.ts
│   ├── test
│   │   ├── ArrayUtils.test.ts
│   │   ├── Dice.test.ts
│   │   ├── PointUtils.test.ts
│   │   ├── RandomGenerator.test.ts
│   │   ├── RectUtils.test.ts
│   │   └── StringUtils.test.ts
│   ├── tree-generator
│   │   ├── Branch.ts
│   │   ├── OptionsEditor.ts
│   │   └── TreeGenerator.ts
│   ├── types
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── routes.tsx
│   ├── style.css
│   └── vite-env.d.ts
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── prettier.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
