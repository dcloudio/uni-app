// #ifdef UNI-APP-X
/**
 * uni-app x 安装包 SHA256 校验
 *
 * 仅当发布记录开启 verify_sha256 时调用；uni1 不支持运行时校验，不参与。
 * - sha256 为空：发布配置错误，不可重试
 * - 摘要不匹配或读取失败：文件可能损坏，可重新下载后重试
 */
export function verifyPackageSha256(filePath : string, sha256 : string | null,
  onSuccess : () => void,
  onFail : (message : string, retryable : boolean) => void) : void {
  const expected = (sha256 ?? '').trim().toLowerCase()
  if (expected.length == 0) {
    onFail('安装包校验失败，sha256 为空', false)
    return
  }
  // 摘要格式非法属发布配置错误，重新下载无法修复
  if (!/^[0-9a-f]{64}$/.test(expected)) {
    onFail('安装包校验失败', false)
    return
  }
  uni.getFileSystemManager().getFileInfo({
    filePath,
    digestAlgorithm: 'sha256',
    success: (res) => {
      if (res.digest.toLowerCase() != expected) {
        onFail('安装包校验失败', true)
        return
      }
      onSuccess()
    },
    fail: () => {
      onFail('安装包校验失败', true)
    }
  })
}
// #endif
