export default class IdentifierGenerator {
  // u 被框架占用了，不提供 u 开头的变量名
  private _chars: string = 'abcdefghijklmnopqrstvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  private _nextIds: number[] = [0]

  next(): string {
    const r: string[] = []
    for (const char of this._nextIds) {
      r.unshift(this._chars[char])
    }
    this._increment()
    const id = r.join('')
    if (keywords.includes(id)) {
      return this.next()
    }
    return id
  }

  _increment() {
    for (let i = 0; i < this._nextIds.length; i++) {
      const val = ++this._nextIds[i]
      if (val >= this._chars.length) {
        this._nextIds[i] = 0
      } else {
        return
      }
    }
    this._nextIds.push(0)
  }

  *[Symbol.iterator]() {
    while (true) {
      yield this.next()
    }
  }
}
const keywords = [
  'abstract',
  'arguments',
  'await',
  'boolean',
  'break',
  'byte',
  'case',
  'catch',
  'char',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'double',
  'else',
  'enum',
  'eval',
  'export',
  'extends',
  'false',
  'final',
  'finally',
  'float',
  'for',
  'function',
  'goto',
  'if',
  'implements',
  'import',
  'in',
  'instanceof',
  'int',
  'interface',
  'let',
  'long',
  'native',
  'new',
  'null',
  'package',
  'private',
  'protected',
  'public',
  'return',
  'short',
  'static',
  'super',
  'switch',
  'synchronized',
  'this',
  'throw',
  'throws',
  'transient',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'volatile',
  'while',
  'with',
  'yield',
]
