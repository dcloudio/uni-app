<script>
export default {
  name: 'View',
  functional: true,
  render (createElement, context) {
    return createElement('uni-view', context.data, context.children)
  }
}
</script>

<style>
uni-view {
  display: block;
}

uni-view[hidden] {
  display: none;
}
</style>
