<template>
  <view>{{result}}</view>
</template>

<script setup>
const result = ref('')

const foo1 = () => {
  result.value = "foo1"
}
const foo2 = (date1 : number) => {
  result.value = "foo2=" + date1
}
const foo3 = (date1 : number, date2 : number) => {
  result.value = "foo3=" + date1 + " " + date2
}
const foo4 = (callback : (() => void)) => {
  callback()
}
const foo5 = (text1 : string) : any | null => {
  return text1
}

defineExpose({
  foo1,
  foo2,
  foo3,
  foo4,
  foo5
})
</script>
