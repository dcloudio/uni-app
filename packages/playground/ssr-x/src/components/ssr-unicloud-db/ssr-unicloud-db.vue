<template>
  <unicloud-db
    collection="book"
    v-slot:default="{ data }"
  >
    <view v-for="(item, index) in data" :key="index">
      {{item.id}}{{item.name}}
    </view>
  </unicloud-db>
</template>