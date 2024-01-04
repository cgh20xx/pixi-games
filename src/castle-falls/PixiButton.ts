interface PixiButtonOptions {
  /**
   * 按鈕寬度
   */
  width: number;
  /**
   * 按鈕高度
   */
  height: number;
  /**
   * 按鈕圓角
   */
  cornerRadius: number;
  /**
   * 按鈕文字
   */
  label: string;
  /**
   * 按鈕大小
   */
  labelSize: number;
  /**
   * 按鈕文字在三種狀態下的顏色
   */
  labelColor: {
    default: number;
    hover: number;
    active: number;
  };
  /**
   * 按鈕背景在三種狀態下的顏色
   */
  backgroundColor: {
    default: number;
    hover: number;
    active: number;
  };
  /**
   * 按鈕觸發的回呼函式
   */
  onClick: () => void;
}
