<template>
  <view>
    <editor
      id="editorId"
      @ready="onEditorReady"
      @input="bingEditorInput"
    ></editor>
  </view>
</template>

<script lang="uts">
export default {
  data() {
    return {
      editorCtx: null as EditorContext | null
    }
  },
  methods: {
    onEditorReady: function () {
      uni.createSelectorQuery()
        .select('#editorId')
        .context(res => {
          console.log(res.context);
          this.editorCtx = res.context as EditorContext;
          this.insertImageFun();
        })
        .exec();
    },
    insertImageFun: function () {
      this.editorCtx!.insertImage({
        src: "/static/logo.png",
        width: '25px',
        height: '25px'
      });
    },
    bingEditorInput: function (e) {
      console.log("bingEditorInput()")
    }
  }
}
</script>

<style>
</style>
