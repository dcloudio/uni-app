<template>
  <uni-page-wrapper>
    <uni-page-body>
      <slot />
    </uni-page-body>
  </uni-page-wrapper>
</template>
<style>
uni-page-wrapper {
  display: block;
  height: 100%;
  position: relative;
}

uni-page-head[uni-page-head-type="default"] ~ uni-page-wrapper {
  height: calc(100% - 44px);
  height: calc(100% - 44px - constant(safe-area-inset-top));
  height: calc(100% - 44px - env(safe-area-inset-top));
}

uni-page-body {
  display: block;
  box-sizing: border-box;
  width: 100%;
}
</style>
<script>
import appendCss from 'uni-platform/helpers/append-css'
import { tabBar } from '../app/observable'
export default {
  name: 'PageBody',
  mounted () {
    const HEIGTH = tabBar.height || '50px'
    let cssText = `.uni-app--showtabbar uni-page-wrapper {
                    display: block;
                    height: calc(100% - ${HEIGTH});
                    height: calc(100% - ${HEIGTH} - constant(safe-area-inset-bottom));
                    height: calc(100% - ${HEIGTH} - env(safe-area-inset-bottom));
                  }`
    cssText += '\n'
    cssText += `.uni-app--showtabbar uni-page-wrapper::after {
                  content: "";
                  display: block;
                  width: 100%;
                  height: ${HEIGTH};
                  height: calc(${HEIGTH} + constant(safe-area-inset-bottom));
                  height: calc(${HEIGTH} + env(safe-area-inset-bottom));
                }`
    cssText += '\n'
    cssText += `.uni-app--showtabbar uni-page-head[uni-page-head-type="default"] ~ uni-page-wrapper {
                  height: calc(100% - 44px - ${HEIGTH});
                  height: calc(100% - 44px - constant(safe-area-inset-top) - ${HEIGTH} - constant(safe-area-inset-bottom));
                  height: calc(100% - 44px - env(safe-area-inset-top) - ${HEIGTH} - env(safe-area-inset-bottom));
                }`
    appendCss(cssText)
  }
}
</script>
