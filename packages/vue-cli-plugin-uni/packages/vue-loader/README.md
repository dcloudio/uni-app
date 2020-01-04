# vue-loader [![Build Status](https://circleci.com/gh/vuejs/vue-loader/tree/master.svg?style=shield)](https://circleci.com/gh/vuejs/vue-loader/tree/master) [![Windows Build status](https://ci.appveyor.com/api/projects/status/8cdonrkbg6m4k1tm/branch/master?svg=true)](https://ci.appveyor.com/project/yyx990803/vue-loader/branch/master)

> webpack loader for Vue Single-File Components

**NOTE:** The master branch now hosts the code for v15! Legacy code is now in the [v14 branch](https://github.com/vuejs/vue-loader/tree/v14).

- [Documentation](https://vue-loader.vuejs.org)
- [Migrating from v14](https://vue-loader.vuejs.org/migrating.html)

## What is Vue Loader?

`vue-loader` is a loader for [webpack](https://webpack.js.org/) that allows you to author Vue components in a format called [Single-File Components (SFCs)](./docs/spec.md):

``` vue
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>
```

There are many cool features provided by `vue-loader`:

- Allows using other webpack loaders for each part of a Vue component, for example Sass for `<style>` and Pug for `<template>`;
- Allows custom blocks in a `.vue` file that can have custom loader chains applied to them;
- Treat static assets referenced in `<style>` and `<template>` as module dependencies and handle them with webpack loaders;
- Simulate scoped CSS for each component;
- State-preserving hot-reloading during development.

In a nutshell, the combination of webpack and `vue-loader` gives you a modern, flexible and extremely powerful front-end workflow for authoring Vue.js applications.
