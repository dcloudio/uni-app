import { compileKotlin } from './kotlin'
import { compileSwift } from './swift'

export function getCompiler(type: 'kotlin' | 'swift') {
  if (type === 'swift') {
    return {
      compile: compileSwift,
    }
  }
  return {
    compile: compileKotlin,
  }
}
