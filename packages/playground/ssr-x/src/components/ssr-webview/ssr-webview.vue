<template>
  <web-view
    class="web-view-test"
    :allow="allow"
    :src="url"
    @message="getMessage"
  ></web-view>
</template>

<script lang="uts">
import { getCurrentInstance } from "vue";

export default {
  data() {
    return {
      url: "https://uniapp.dcloud.io/static/web-view.html",
      allow: "",
      sandbox: "",
    };
  },
  mounted() {

    window.addEventListener(
      "message",
      (...args) => {
        console.log("...args :>> ", ...args);
      },
      false
    );

    console.log("vm :>> ", getCurrentInstance()?.proxy);

    /* setInterval(() => {
      this.allow += 1;
      // this.sandbox += 1;
    }, 1000); */
  },
  methods: {
    getMessage(event) {
      uni.showModal({
        content: JSON.stringify(event.detail),
        showCancel: false,
      });
    },
  },
};
</script>

<style></style>
