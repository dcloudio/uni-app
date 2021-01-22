export { initProvide, initInjections } from './runtime/apiInject'
export {
  parse as parsePage,
  initLifetimes as initPageLifetimes,
} from './runtime/parsePageOptions'
export {
  instances,
  parse as parseComponent,
  initLifetimes as initComponentLifetimes,
} from './runtime/parseComponentOptions'
