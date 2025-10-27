export class UniError extends Error {
  errSubject: string
  errCode: number
  cause?: Error
  data?: any
  constructor(
    errSubject?: string,
    errCode?: number | Record<string, any>,
    errMsg?: string
  ) {
    let options: Record<string, any> = {}
    const argsLength = Array.from(arguments).length
    switch (argsLength) {
      case 0:
        errSubject = ''
        errMsg = ''
        errCode = 0
        break
      case 1:
        errMsg = errSubject
        errSubject = ''
        errCode = 0
        break
      case 2:
        errMsg = errSubject
        options = errCode as unknown as Record<string, any>
        errCode = options.errCode || 0
        errSubject = options.errSubject || ''
        break
      case 3:
      default:
        break
    }
    super(errMsg)
    this.name = 'UniError'
    this.errSubject = errSubject as string
    this.errCode = errCode as number
    this.errMsg = errMsg as string
    if (options.data) {
      this.data = options.data
    }
    if (options.cause) {
      this.cause = options.cause
    }
  }

  set errMsg(msg: string) {
    this.message = msg
  }

  get errMsg(): string {
    return this.message
  }

  toString(): string {
    return this.errMsg
  }

  toJSON(): Record<string, any> {
    return {
      errSubject: this.errSubject,
      errCode: this.errCode,
      errMsg: this.errMsg,
      data: this.data,
      cause:
        this.cause && typeof (this.cause as UniError).toJSON === 'function'
          ? (this.cause as UniError).toJSON()
          : this.cause,
    }
  }
}
