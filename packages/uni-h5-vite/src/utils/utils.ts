import { isUniAppXWebVapor } from '@dcloudio/uni-cli-shared'

export function resolveFrameworkDistDir() {
  return resolveDistDir()
}

export function resolveVueDistDir() {
  return resolveDistDir()
}

export function resolveDistDir() {
  return isUniAppXWebVapor()
    ? 'dist-x-vapor'
    : process.env.UNI_APP_X === 'true'
    ? 'dist-x'
    : 'dist'
}
