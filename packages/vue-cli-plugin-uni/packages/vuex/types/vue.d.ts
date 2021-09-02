/**
 * Extends interfaces in Vue.js
 */

import { ComponentCustomOptions } from "vue";
import { Store } from "./index";

declare module "@vue/runtime-core" {
  interface ComponentCustomOptions {
    store?: Store<any>;
  }
}
