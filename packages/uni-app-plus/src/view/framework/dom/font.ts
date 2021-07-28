import { addFont } from '@dcloudio/uni-shared'

export function loadFontFace(
  {
    family,
    source,
    desc,
  }: { family: string; source: string; desc?: UniApp.LoadFontFaceOptionsDesc },
  publish: (err?: string) => void
) {
  addFont(family, source, desc)
    .then(() => {
      publish()
    })
    .catch((err) => {
      publish(err.toString())
    })
}
