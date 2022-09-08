import { compileKotlin, parseKotlinPackage } from './kotlin'
import { compileSwift, parseSwiftPackage } from './swift'

export function getCompiler(type: 'kotlin' | 'swift') {
  if (type === 'swift') {
    return {
      compile: compileSwift,
      parsePackage: parseSwiftPackage,
    }
  }
  return {
    compile: compileKotlin,
    parsePackage: parseKotlinPackage,
  }
}
