import {
  parseLifecycle
} from './lifecycle-parser'

export function parseLifetimes (lifetimes, vueComponentOptions) {
  if (!lifetimes) {
    return
  }
  parseLifecycle(lifetimes, vueComponentOptions)
}
