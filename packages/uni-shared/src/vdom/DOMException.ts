export class DOMException extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'DOMException'
  }
}
