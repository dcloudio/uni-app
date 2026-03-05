<template>
  <view>{{result}}</view>
</template>

<script>
  export default {
    props: {

    },
    data() {
      return {
        result: ''
      }
    },
    emits:['propsChanged'],
    watch: {

    },
    methods: {
      foo1() {
        this.result = "foo1"
      },
      foo2(date1: number) {
        this.result = "foo2=" + date1
      },
      foo3(date1: number, date2: number) {
        this.result = "foo3=" + date1 + " " + date2
      },
      foo4(callback: (() => void)) {
        callback()
      },
      foo5(text1: string): any | null {
        this.result = text1
        return text1
      }
    }
  }
</script>
