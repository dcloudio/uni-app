import {
  parseComponentOptions
} from './parser'

export default function createVueComponent (mpComponentOptions) {
  return parseComponentOptions(mpComponentOptions)
}
