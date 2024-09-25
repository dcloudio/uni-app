import { addFont } from '@dcloudio/uni-shared'
import { getRealPath } from '@dcloudio/uni-platform'

export function loadFontFace(
  {
    family,
    source,
    desc,
  }: { family: string; source: string; desc?: UniApp.LoadFontFaceOptionsDesc },
  publish: (err?: string) => void
) {
  if (source.startsWith(`url("`) || source.startsWith(`url('`)) {
    source = `url('${getRealPath(source.substring(5, source.length - 2))}')`
  } else if (source.startsWith('url(')) {
    source = `url('${getRealPath(source.substring(4, source.length - 1))}')`
  } else {
    source = getRealPath(source)
  }
  addFont(family, source, desc)
    .then(() => {
      publish()
    })
    .catch((err) => {
      publish(err.toString())
    })
}
