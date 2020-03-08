<template>
  <div v-on="$listener">
    <text>
      <slot />
    </text>
  </div>
</template>
<script>
export default {
  name: 'Button'
}
</script>
<style>
</style>
