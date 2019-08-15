# rollup-plugin-require-context

rollup plugin for resovling webpack require-context.

## usage

```javascript
import requireContext from 'rollup-plugin-require-context';

export default {
  input: 'main.js',
  output: {
    file: 'bundle.js',
    format: 'iife'
  },
  plugins: [
    requireContext()
  ]
};
```
