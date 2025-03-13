declare global {
  const UTSObjectMarker: unique symbol;
  interface IUTSObject {}
  // 必须补充 new 构造器，后续支持了 new String()，就应该不需要了，不然 vue 的 PropType 会报错 { type: String, default: '' }
  interface StringConstructor {
    new (value?: any): String
    (value?: any): string
    readonly prototype: String
  }
  interface ArrayConstructor {
    new (arrayLength?: number): any[]
    new <T>(arrayLength: number): T[]
    new <T>(...items: T[]): T[]
    (arrayLength?: number): any[]
    <T>(arrayLength: number): T[]
    <T>(...items: T[]): T[]
    readonly prototype: any[]
  }
}

export {}
