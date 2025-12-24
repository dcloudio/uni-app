<template>
  <teleport to="head">
    <slot />
  </teleport>
</template>
<script>
export default {
  name: 'PageMetaHead',
}
</script>
