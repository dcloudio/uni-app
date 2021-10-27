import QuillClass from 'quill'

export default function (Quill: typeof QuillClass) {
  const Link = Quill.import('formats/link')
  Link.sanitize = (url: string) => {
    const anchor = document.createElement('a')
    anchor.href = url
    const protocol = anchor.href.slice(0, anchor.href.indexOf(':'))
    return Link.PROTOCOL_WHITELIST.concat('file').indexOf(protocol) > -1
      ? url
      : Link.SANITIZED_URL
  }
}
