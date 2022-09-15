import {
  compileKotlin,
  parseKotlinPackage,
  createKotlinResolveTypeReferenceName,
} from './kotlin'
import {
  compileSwift,
  parseSwiftPackage,
  createSwiftResolveTypeReferenceName,
} from './swift'

export function getCompiler(type: 'kotlin' | 'swift') {
  if (type === 'swift') {
    return {
      compile: compileSwift,
      parsePackage: parseSwiftPackage,
      createResolveTypeReferenceName: createSwiftResolveTypeReferenceName,
    }
  }
  return {
    compile: compileKotlin,
    parsePackage: parseKotlinPackage,
    createResolveTypeReferenceName: createKotlinResolveTypeReferenceName,
  }
}
