# @vue/composition-api

Vue 2 plugin for **Composition API**

[![npm](https://img.shields.io/npm/v/@vue/composition-api)](https://www.npmjs.com/package/@vue/composition-api)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/vuejs/composition-api/Build%20&%20Test)](https://github.com/vuejs/composition-api/actions?query=workflow%3A%22Build+%26+Test%22)
[![Minzipped size](https://badgen.net/bundlephobia/minzip/@vue/composition-api)](https://bundlephobia.com/result?p=@vue/composition-api)

English | [中文](./README.zh-CN.md) ・ [**Composition API Docs**](https://v3.vuejs.org/guide/composition-api-introduction.html)


> ⚠️ With the release of [Vue 2.7](https://blog.vuejs.org/posts/vue-2-7-naruto.html), which has Composition API built-in, **you no longer need this plugin**. Thereby this plugin has entered maintenance mode and will only support Vue 2.6 or earlier. This project will reach End of Life by the end of 2022.

## Installation

### NPM

```bash
npm install @vue/composition-api
# or
yarn add @vue/composition-api
```

You must install `@vue/composition-api` as a plugin via `Vue.use()` before you can use the [Composition API](https://composition-api.vuejs.org/) to compose your component.

```js
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)
```

```js
// use the APIs
import { ref, reactive } from '@vue/composition-api'
```

> :bulb: When you migrate to Vue 3, just replacing `@vue/composition-api` to `vue` and your code should just work.

### CDN

Include `@vue/composition-api` after Vue and it will install itself automatically.

<!--cdn-links-start-->
```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6"></script>
<script src="https://cdn.jsdelivr.net/npm/@vue/composition-api@1.7.0"></script>
```
<!--cdn-links-end-->

`@vue/composition-api` will be exposed to global variable `window.VueCompositionAPI`.

```ts
const { ref, reactive } = VueCompositionAPI
```

## TypeScript Support

> TypeScript version **>4.2** is required

To let TypeScript properly infer types inside Vue component options, you need to define components with `defineComponent`

```ts
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  // type inference enabled
})
```

### JSX/TSX

JSX is now officially supported on [vuejs/jsx](https://github.com/vuejs/jsx). You can enable it by following [this document](https://github.com/vuejs/jsx/tree/dev/packages/babel-preset-jsx#usage). A community maintained version can be found at [babel-preset-vca-jsx](https://github.com/luwanquan/babel-preset-vca-jsx) by [@luwanquan](https://github.com/luwanquan).

To support TSX, create a declaration file with the following content in your project.

```ts
// file: shim-tsx.d.ts
import Vue, { VNode } from 'vue';
import { ComponentRenderProxy } from '@vue/composition-api';

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends ComponentRenderProxy {}
    interface ElementAttributesProperty {
      $props: any; // specify the property name to use
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
```

## SSR

Even if there is no definitive Vue 3 API for SSR yet, this plugin implements the `onServerPrefetch` lifecycle hook that allows you to use the `serverPrefetch` hook found in the classic API.

```js
import { onServerPrefetch } from '@vue/composition-api'

export default {
  setup(props, { ssrContext }) {
    const result = ref()

    onServerPrefetch(async () => {
      result.value = await callApi(ssrContext.someId)
    })

    return {
      result,
    }
  }
}
```

## Browser Compatibility

`@vue/composition-api` supports all modern browsers and IE11+. For lower versions IE you should install `WeakMap` polyfill (for example from `core-js` package).

## Limitations

> :white_check_mark: Support &nbsp;&nbsp;&nbsp;&nbsp;:x: Not Supported

### `Ref` Unwrap

<details>
<summary>
❌ <b>Should NOT</b> use <code>ref</code> in a plain object when working with <code>Array</code>
</summary>

```js
const a = {
  count: ref(0),
}
const b = reactive({
  list: [a], // `a.count` will not unwrap!!
})

// no unwrap for `count`, `.value` is required
b.list[0].count.value === 0 // true
```

```js
const b = reactive({
  list: [
    {
      count: ref(0), // no unwrap!!
    },
  ],
})

// no unwrap for `count`, `.value` is required
b.list[0].count.value === 0 // true
```

</details>

<details>
<summary>
✅ <b>Should</b> always use <code>ref</code> in a <code>reactive</code> when working with <code>Array</code>
</summary>

```js
const a = reactive({
  list: [
    reactive({
      count: ref(0),
    }),
  ]
})
// unwrapped
a.list[0].count === 0 // true

a.list.push(
  reactive({
    count: ref(1),
  })
)
// unwrapped
a.list[1].count === 1 // true
```

</details>

### Template Refs

<details>
<summary>
✅ String ref && return it from <code>setup()</code>
</summary>

```html
<template>
  <div ref="root"></div>
</template>

<script>
  export default {
    setup() {
      const root = ref(null)

      onMounted(() => {
        // the DOM element will be assigned to the ref after initial render
        console.log(root.value) // <div/>
      })

      return {
        root,
      }
    },
  }
</script>
```

</details>

<details>
<summary>
✅ String ref && return it from <code>setup()</code> && Render Function / JSX
</summary>

```jsx
export default {
  setup() {
    const root = ref(null)

    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      console.log(root.value) // <div/>
    })

    return {
      root,
    }
  },
  render() {
    // with JSX
    return () => <div ref="root" />
  },
}
```

</details>

<details>
<summary>
❌ Function ref
</summary>

```html
<template>
  <div :ref="el => root = el"></div>
</template>

<script>
  export default {
    setup() {
      const root = ref(null)

      return {
        root,
      }
    },
  }
</script>
```

</details>

<details>
<summary>
❌ Render Function / JSX in <code>setup()</code>
</summary>

```jsx
export default {
  setup() {
    const root = ref(null)

    return () =>
      h('div', {
        ref: root,
      })

    // with JSX
    return () => <div ref={root} />
  },
}
```

</details>

<details>
<summary>
⚠️ <code>$refs</code> accessing workaround
</summary>

<br>

> :warning: **Warning**: The `SetupContext.refs` won't exist in `Vue 3.0`. `@vue/composition-api` provide it as a workaround here.

If you really want to use template refs in this case, you can access `vm.$refs` via `SetupContext.refs`

```jsx
export default {
  setup(initProps, setupContext) {
    const refs = setupContext.refs
    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      console.log(refs.root) // <div/>
    })

    return () =>
      h('div', {
        ref: 'root',
      })

    // with JSX
    return () => <div ref="root" />
  },
}
```

</details>

### Reactive

<details>
<summary>
⚠️ <code>reactive()</code> <b>mutates</b> the original object
</summary>

`reactive` uses `Vue.observable` underneath which will ***mutate*** the original object.

> :bulb: In Vue 3, it will return an new proxy object.

</details>

<details>
<summary>
⚠️ <code>set</code> and <code>del</code> workaround for adding and deleting reactive properties
</summary>

> ⚠️ Warning: `set` and `del` do NOT exist in Vue 3. We provide them as a workaround here, due to the limitation of [Vue 2.x reactivity system](https://vuejs.org/v2/guide/reactivity.html#For-Objects).
>
> In Vue 2, you will need to call `set` to track new keys on an `object`(similar to `Vue.set` but for `reactive objects` created by the Composition API). In Vue 3, you can just assign them like normal objects.
>
> Similarly, in Vue 2 you will need to call `del` to [ensure a key deletion triggers view updates](https://vuejs.org/v2/api/#Vue-delete) in reactive objects (similar to `Vue.delete` but for `reactive objects` created by the Composition API). In Vue 3 you can just delete them by calling `delete foo.bar`.

```ts
import { reactive, set, del } from '@vue/composition-api'

const a = reactive({
  foo: 1
})

// add new reactive key
set(a, 'bar', 1)

// remove a key and trigger reactivity
del(a, 'bar')
```

</details>

### Watch

<details>
<summary>
❌ <code>onTrack</code> and <code>onTrigger</code> are not available in <code>WatchOptions</code>
</summary>

```js
watch(() => {
    /* ... */
}, {
  immediate: true,
  onTrack() {}, // not available
  onTrigger() {}, // not available
})
```

</details>

### `createApp`

<details>
<summary>
⚠️ <code>createApp()</code> is global
</summary>

In Vue 3, `createApp()` is introduced to provide context(plugin, components, etc.) isolation between app instances. Due the the design of Vue 2, in this plugin, we provide `createApp()` as a forward compatible API which is just an alias of the global.

```ts
const app1 = createApp(RootComponent1)
app1.component('Foo', Foo) // equivalent to Vue.component('Foo', Foo)
app1.use(VueRouter) // equivalent to Vue.use(VueRouter)

const app2 = createApp(RootComponent2)
app2.component('Bar', Bar) // equivalent to Vue.use('Bar', Bar)
```

</details>

### `createElement` / `h`

<details>
<summary>
⚠️ <code>createElement</code> / <code>h</code> workaround
</summary>

<br>

`createElement` / `h` in Vue 2 is only accessable in `render()` function. To use it outside of `render()`, you can explicitly bind a component instance to it.

> :warning: **Warning**: This ability is provided as a workaround Vue 2, it's not part of the Vue 3 API.

```jsx
import { h as _h } from '@vue/composition-api'

export default {
  setup() {
    const vm = getCurrentInstance()
    const h = _h.bind(vm)

    return () =>
      h('div', {
        ref: 'root',
      })
  },
}
```

</details>


### `shallowReadonly`

<details>
<summary>
⚠️ <code>shallowReadonly()</code> will create a new object and with the same root properties, new properties added will <b>not</b> be readonly or reactive.
</summary>

> :bulb: In Vue 3, it will return an new proxy object.

</details>

### `readonly`

<details>
<summary>
⚠️ <code>readonly()</code> provides <b>only type-level</b> readonly check. 
</summary>

`readonly()` is provided as API alignment with Vue 3 on type-level only. Use <code>isReadonly()</code> on it or it's properties can not be guaranteed.

</details>

### `props`

<details>
<summary>
⚠️ <code>toRefs(props.foo)</code> will incorrectly warn when accessing nested levels of props. <br>
&nbsp;&nbsp;&nbsp;&nbsp;⚠️ <code>isReactive(props.foo)</code> will return false.
</summary>

```ts
defineComponent({
  setup(props) {
    const { bar } = toRefs(props.foo) // it will `warn`

    // use this instead
    const { foo } = toRefs(props)
    const a = foo.value.bar
  }
})
```

</details>

### `computed().effect`

<details>
<summary>
⚠️ <code>computed()</code> has a property <code>effect</code> set to <code>true</code> instead of a <code>ReactiveEffect<T></code>.
</summary>

Due to the difference in implementation, there is no such concept as a `ReactiveEffect` in `@vue/composition-api`. Therefore, `effect` is merely `true` to enable differentiating computed from refs:

```ts
function isComputed<T>(o: ComputedRef<T> | unknown): o is ComputedRef<T>
function isComputed(o: any): o is ComputedRef {
  return !!(isRef(o) && o.effect)
}
```

</details>

### Missing APIs

The following APIs introduced in Vue 3 are not available in this plugin.

- `onRenderTracked`
- `onRenderTriggered`
- `isProxy`

### Reactive APIs in `data()`

<details>
<summary>
❌ Passing <code>ref</code>, <code>reactive</code> or other reactive apis to <code>data()</code> would not work.
</summary>

```jsx
export default {
  data() {
    return {
      // will result { a: { value: 1 } } in template
      a: ref(1),
    }
  },
}
```

</details>

### `emits` Options

<details>
<summary>
❌ <code>emits</code> option is provided in type-level only, in order to align with Vue 3's type interface. Does NOT have actual effects on the code.
</summary>

```ts
defineComponent({
  emits: {
    // has no effects
    submit: (eventOption) => {
      if (...) {
        return true
      } else {
        console.warn('Invalid submit event payload!')
        return false
      }
    }
  }
})
```

</details>

### Performance Impact

Due the the limitation of Vue2's public API. `@vue/composition-api` inevitably introduces some performance overhead. Note that in most scenarios, this shouldn't be the source of performance issues.

You can check the [benchmark results](https://antfu.github.io/vue-composition-api-benchmark-results/) for more details.
