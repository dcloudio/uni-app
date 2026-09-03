/**
 * 读取 DOM2 编译器提供的字节码兼容版本。
 * 编译器未导出合法正整数版本时返回 undefined，避免把无效值写入 manifest。
 */
export function getDom2BytecodeVersion(): number | undefined {
  const { BYTECODE_VERSION } = require('@dcloudio/compiler-vapor-dom2')
  return Number.isInteger(BYTECODE_VERSION) && BYTECODE_VERSION > 0
    ? BYTECODE_VERSION
    : undefined
}
