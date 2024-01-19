### usage

```ts
import { preprocess } from '@dcloudio/uni-preprocess'

const { code, map } = preprocess(
  `a
  // #ifdef B
  b
  // #endif
  // #ifdef C
  c
  // #endif
  // #ifndef D
  d
  // #endif
  e
  `,
  {
    /**
     * 可选值 js | html | auto
     * 如果是处理 js、ts、uts、css、scss、less 等文件(识别的是单行或多行注释`// #ifdef `和`\/* #ifdef *\/`)，可以传 js
     * 如果是处理 html 等模板文件（识别的是<!-- #ifdef -->），可以传 html
     * 如果是处理 vue、nvue、uvue 文件（需要同时识别上述两种），可以传 auto
     **/
    type: 'js',
    context: { B: true },
    sourceMap: {
      /**
       * Whether the mapping should be high-resolution.
       * Hi-res mappings map every single character, meaning (for example) your devtools will always
       * be able to pinpoint the exact location of function calls and so on.
       * With lo-res mappings, devtools may only be able to identify the correct
       * line - but they're quicker to generate and less bulky.
       * You can also set `"boundary"` to generate a semi-hi-res mappings segmented per word boundary
       * instead of per character, suitable for string semantics that are separated by words.
       * If sourcemap locations have been specified with s.addSourceMapLocation(), they will be used here.
       */
      hires: true,
      /**
       * The filename where you plan to write the sourcemap.
       */
      file: 'test',
      /**
       * The filename of the file containing the original source.
       */
      source: 'test.uts',
      /**
       * Whether to include the original content in the map's sourcesContent array.
       */
      includeContent: false,
    },
  }
)
console.log('code:\n', code)
console.log('sourceMap:\n', map)
```
