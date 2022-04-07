import path from 'path'
const EXTNAMES = [
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.json',
  '.cer',
  '.mp3',
  '.aac',
  '.m4a',
  '.mp4',
  '.wav',
  '.ogg',
  '.silk',
  '.wasm',
  '.br',
  '.cert',
]
export function isMiniProgramAssetFile(filename: string) {
  if (!path.isAbsolute(filename)) {
    return false
  }
  return EXTNAMES.includes(path.extname(filename))
}
