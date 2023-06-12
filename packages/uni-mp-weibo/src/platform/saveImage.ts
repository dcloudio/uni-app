export function saveImage(
  base64: string,
  dirname: string,
  callback: (error: Error | null, tempFilePath: string) => void
) {
  callback(null, base64)
}
