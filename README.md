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
│   ├── fonts
│   │   └── upheavtt.ttf
│   ├── images
│   │   ├── asteroid.png
│   │   ├── cannon.png
│   │   ├── cannonballs.png
│   │   ├── explosion-spritesheet.png
│   │   ├── invaders.png
│   │   ├── missile.png
│   │   ├── music-notes.png
│   │   ├── space-fighter.gif
│   │   ├── space-monster.png
│   │   ├── starry-space.png
│   │   └── stars.png
│   ├── lib
│   │   ├── camera
│   │   │   └── Camera2D.ts
│   │   ├── keyboard
│   │   │   ├── KeyCode.ts
│   │   │   └── KeyboardManager.ts
│   │   ├── ArrayUtils.ts
│   │   ├── Dice.ts
│   │   ├── MathUtils.ts
│   │   ├── PixiGifUtils.ts
│   │   ├── PixiMouseUtils.ts
│   │   ├── PointUtils.ts
│   │   ├── RandomGenerator.ts
│   │   ├── RectUtils.ts
│   │   ├── SoundUtils.ts
│   │   ├── StringUtils.ts
│   │   ├── WaitManager.ts
│   │   └── rwd-stage.ts
│   ├── monster-raiders
│   │   ├── Asteroid.ts
│   │   ├── Background.ts
│   │   ├── Explosion.ts
│   │   ├── Fighter.ts
│   │   ├── Missile.ts
│   │   ├── Monster.ts
│   │   ├── MonsterRaidersGame.ts
│   │   ├── MonsterRaidersGameOver.ts
│   │   ├── MonsterRaidersUI.ts
│   │   └── SpaceObject.ts
│   ├── pages
│   │   ├── Home.tsx
│   │   ├── MonsterRaiders.tsx
│   │   ├── NotFound.tsx
│   │   ├── SpaceInvaders.tsx
│   │   └── Tree.tsx
│   ├── sounds
│   │   ├── cannonExplode.wav
│   │   ├── cannonShoot.wav
│   │   ├── fighter-explode.mp3
│   │   ├── invaderKilled.wav
│   │   ├── invadersMove.wav
│   │   ├── missile-explode.mp3
│   │   ├── missile-launch.mp3
│   │   ├── monster-explode.mp3
│   │   └── yemingkenoshisaido.mp3
│   ├── space-invaders
│   │   ├── CannonBall.ts
│   │   ├── EarthShield.ts
│   │   ├── Invader.ts
│   │   ├── InvaderBoss.ts
│   │   ├── InvaderBullet.ts
│   │   ├── PlayerCannon.ts
│   │   ├── SpaceInvadersGame.ts
│   │   ├── SpaceInvadersGameOver.ts
│   │   └── SpaceInvadersUI.ts
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
