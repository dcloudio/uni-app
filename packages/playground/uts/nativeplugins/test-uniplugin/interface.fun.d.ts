import { RegisterOptions, OnConnect } from './interface'

export interface login {
  (name: string, code: number): void
}

export interface register {
  (opts: RegisterOptions): Promise<void>
}

export interface onConnect {
  (callback: OnConnect): void
}
