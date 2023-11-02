/**
 * 常用字串函式庫
 */
export class StringUtils {
  
  /**
   * 將一句英文裡的每個字的第一個字母變成大寫
   * @param str 目標字串
   * @returns 字母大寫的字串
   */
  static capitalize(str: string): string {
    return str.replace(/\b\w/g, (match, offset) => {
      const char = str[offset - 1];
      // 如果前一個字元是單引號則返回原字串 (避免 don't 變成 Don'T)
      if (char === '\'') {
        return match
      }
      return match.toUpperCase()
    })
  }
}