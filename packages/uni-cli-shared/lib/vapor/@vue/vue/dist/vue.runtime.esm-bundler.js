/**
* vue v3.6.0-alpha.2
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
import { NOOP } from '@vue/shared';
import { initCustomFormatter, warn } from '@vue/runtime-dom';
export * from '@vue/runtime-dom';
export * from '@vue/runtime-vapor';

function initDev() {
  {
    initCustomFormatter();
  }
}

if (!!(process.env.NODE_ENV !== "production")) {
  initDev();
}
const compile = (_template) => {
  if (!!(process.env.NODE_ENV !== "production")) {
    warn(
      `Runtime compilation is not supported in this build of Vue.` + (` Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".` )
    );
  }
  return NOOP;
};

export { compile };
