declare function isInstanceOf(value: any, type: Function): boolean

declare const JSON_2: {
  parse: (
    text: string,
    reviver: (this: any, key: string, value: any) => any
  ) => any | null
  parseArray(text: string): Array<any> | null
  parseObject(text: string): UTSJSONObject | null
  stringify: (value: any) => string
}
export { JSON_2 as JSON }

export declare const UTS: {
  isInstanceOf: typeof isInstanceOf
}

export declare class UTSJSONObject {
  [key: string]: any
  private _content
  constructor(content?: Record<string, any>)
  toJSON(): Record<string, any>
  private _getValue
  get(key: string): any | null
  set(key: string, value: any): void
  getAny(key: string): any | null
  getString(key: string): string | null
  getNumber(key: string): number | null
  getBoolean(key: string): boolean | null
  getJSON(key: string): UTSJSONObject | null
  getArray<T = any>(key: string): Array<T> | null
  toMap(): Map<string, any>
  forEach(callback: (value: any, key: string) => void): void
}

export * from 'tslib'

export {}
