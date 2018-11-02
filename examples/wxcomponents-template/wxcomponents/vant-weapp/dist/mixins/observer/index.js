import { behavior } from './behavior';
import { observeProps } from './props';

export function observe(sfc) {
  if (sfc.computed) {
    sfc.behaviors.push(behavior);
    sfc.methods = sfc.methods || {};
    sfc.methods.$options = () => sfc;

    if (sfc.properties) {
      observeProps(sfc.properties);
    }
  }
}
