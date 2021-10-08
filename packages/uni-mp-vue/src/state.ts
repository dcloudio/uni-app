import { getCurrentInstance } from 'vue'
export function setState(name: string, value: unknown) {
  const { __state } = getCurrentInstance()!
}
