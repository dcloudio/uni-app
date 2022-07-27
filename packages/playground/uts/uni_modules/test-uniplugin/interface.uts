export type RegisterOptions = {
  name: string
  callback1: (res: boolean) => void
  callback2: (res: boolean) => void
  abc: {
    callback3: (res: boolean) => void
  }
}

export type OnConnect = () => void

export default interface IUniLogin {
  login: (name: string, code: number) => void
  register: (opts: RegisterOptions) => Promise<void>
  onConnect: (callback: OnConnect) => void
}

// import UniLogin from '@uni_modules/uni-login'
// new UniLogin()
