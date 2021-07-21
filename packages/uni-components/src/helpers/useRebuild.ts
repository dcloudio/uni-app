import { getCurrentInstance } from 'vue'

export function useRebuild(callback: () => void) {
  const instance = getCurrentInstance() as any
  instance.rebuild = callback
}
