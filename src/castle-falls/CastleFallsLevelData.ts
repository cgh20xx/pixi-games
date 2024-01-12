import { IBodyDefinition } from 'matter-js';

/**
 * 彈弓的介面
 */
export interface ICFSlingshot {
  /**
   * 彈弓的 x 座標
   */
  x: number;
  /**
   * 彈弓的 y 座標
   */
  y: number;
  /**
   * 橡皮筋的剛性(彈性)程度
   */
  stiffness: number;
}

/**
 * 遊戲中組成世界物件的介面
 */
export interface ICFObject {
  /**
   * 物件類別
   */
  type: string;
  /**
   * 物件的 x 座標
   */
  x: number;
  /**
   * 物件的 y 座標
   */
  y: number;
  /**
   * 旋轉角度
   */
  angleDeg?: number;
  /**
   * 若是矩形則定義這筆資料
   */
  rect?: {
    width: number;
    height: number;
  };
  /**
   * 若是圓形則定義這筆資料
   */
  circle?: {
    radius: number;
  };
}

/**
 * 關卡資料的介面
 */
export interface ICastleFallsLevelData {
  slingshot: ICFSlingshot;
  objects: ICFObject[];
}

/**
 * 物體類別對應物理性質的通用物件
 */
export const BodyOptionsMap: { [key: string]: IBodyDefinition } = {
  /**
   * 地板
   */
  ground: {
    isStatic: true,
    friction: 1,
    // 要看的見 render 的樣子，必需先將 Render.create 裡的 options.wireframes 設為 false
    render: {
      fillStyle: 'transparent',
      strokeStyle: '#00ff00',
      lineWidth: 2
    }
  },
  /**
   * 磚塊
   */
  brick: {
    density: 0.1,
    friction: 0.5,
    render: {
      fillStyle: 'transparent',
      strokeStyle: '#ffff00',
      lineWidth: 2
    }
  },
  /**
   * 魔王
   */
  boss: {
    density: 0.1,
    friction: 0.5,
    render: {
      fillStyle: 'transparent',
      strokeStyle: '#ff0000',
      lineWidth: 2
    }
  },
  /**
   * 石頭
   */
  rock: {
    density: 0.1,
    friction: 0.5,
    render: {
      fillStyle: 'transparent',
      strokeStyle: '#ffffff',
      lineWidth: 2
    }
  }
};
