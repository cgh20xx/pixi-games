/**
 * 取得 value 為 number 的 key
 */
export type GetNumberKeys<T> = keyof {
  [K in keyof T as T[K] extends number ? K : never]: T[K];
} & string
// type NumKeys = GetNumberKeys<{ id: 'aa'; hp: 1, age: 99 }>
// result type NumKeys = "hp" | "age"