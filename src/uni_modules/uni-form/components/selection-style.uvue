<template>
  <view style="display: none; position: absolute; width: 0; height: 0; overflow: hidden; pointer-events: none;"></view>
</template>

<script setup lang="ts">
  // Observe the external class on a component root so CSS variables, media
  // queries and class removal use the same style resolver as other controls.
  const style = useComputedStyle({
    // Prevent an external class's display value from revealing the probe.
    properties: ['background-color', 'display'],
    filterProperties: true
  })
  const emit = defineEmits<{
    change: [color: string]
  }>()
  watch(() => style.get('background-color'), value => {
    emit('change', typeof value === 'string' ? value : '')
  }, { immediate: true })
</script>
