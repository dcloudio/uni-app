import IUniLogin, { OnConnect, RegisterOptions } from '../interface'

export default class UniLogin implements IUniLogin {
  //@UniJSMethod({ uiThread: true })
  login(name: string, code: number) {
    console.log(name, code)
  }

  // {"name":"fxy","callback1":{__type__:"fun",id:1},"callback2":{__type__:"fun",id:1}}
  // => RegisterOptions
  async register(opts: RegisterOptions) {
    opts.callback1(true)
    opts.callback2(true)
    opts.abc.callback3(true)
  }

  onConnect(callback: OnConnect) {}
}
