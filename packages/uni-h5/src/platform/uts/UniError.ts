export class UniError extends Error {
  errSubject: string
  errCode: number
  errMsg: string
  cause?: Error
  data?: any
  constructor(errSubject: string, errCode: number, errMsg: string) {
    super(errMsg)
    this.name = 'UniError'
    this.errSubject = errSubject
    this.errCode = errCode
    this.errMsg = errMsg
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
