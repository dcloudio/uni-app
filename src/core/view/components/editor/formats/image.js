export default function (Quill) {
  const Image = Quill.import('formats/image')
  Image.sanitize = url => url
}
