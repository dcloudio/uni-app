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

uni-page-head ~ uni-page-wrapper {
  height: calc(100% - 44px);
}

.uni-app--showtabbar uni-page-wrapper {
  display: block;
  height: calc(100% - 50px);
}

.uni-app--showtabbar uni-page-wrapper::after {
  content: "";
  display: block;
  width: 100%;
  height: 50px;
}

.uni-app--showtabbar uni-page-head ~ uni-page-wrapper {
  height: calc(100% - 44px - 50px);
}

uni-page-body {
  display: block;
  box-sizing: border-box;
  width: 100%;
}
</style>
<script>
export default {
  name: 'PageBody'
}
</script>
