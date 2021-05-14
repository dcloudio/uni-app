<template>
  <uni-cover-image ref="root" :src="src">
    <div class="uni-cover-image">
      <img v-if="src" :src="getRealPath(src)" @load="_load" @error="_error" />
    </div>
  </uni-cover-image>
</template>
<script>
import { ref } from "vue";
import { getRealPath } from "@dcloudio/uni-platform";
import { useCustomEvent } from "@dcloudio/uni-components";

export default {
  name: "CoverImage",
  compatConfig: {
    MODE: 3
  },
  props: {
    src: {
      type: String,
      default: "",
    },
  },
  methods: {
    getRealPath,
    _load($event) {
      this.$trigger("load", $event);
    },
    _error($event) {
      this.$trigger("error", $event);
    },
  },
  mounted() {
    this.$trigger = useCustomEvent({ value: this.root }, this.$emit);
  },
  setup() {
    const root = ref(null);

    return {
      root,
    };
  },
};
</script>
