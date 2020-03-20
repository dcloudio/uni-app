<template>
  <div v-on="$listeners">
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
