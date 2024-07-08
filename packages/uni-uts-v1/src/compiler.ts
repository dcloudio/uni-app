import { checkAndroidVersionTips, runKotlinDev, runKotlinProd } from './kotlin'
import { checkIOSVersionTips, runSwiftDev, runSwiftProd } from './swift'

export function getCompiler(type: 'kotlin' | 'swift') {
  if (type === 'swift') {
    return {
      runProd: runSwiftProd,
      runDev: runSwiftDev,
      checkVersionTips: checkIOSVersionTips,
    }
  }
  return {
    runProd: runKotlinProd,
    runDev: runKotlinDev,
    checkVersionTips: checkAndroidVersionTips,
  }
}
