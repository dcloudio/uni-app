export function resolveFrameworkDistDir() {
  return resolveDistDir()
}

export function resolveVueDistDir() {
  return resolveDistDir()
}

export function resolveDistDir() {
  // 重要：目前只要manifest.json中配置了vapor:true，就认为是vapor版本（虽然还没有支持）
  return process.env.UNI_APP_X_VAPOR === 'true'
    ? 'dist-x-vapor'
    : process.env.UNI_APP_X === 'true'
    ? 'dist-x'
    : 'dist'
}
