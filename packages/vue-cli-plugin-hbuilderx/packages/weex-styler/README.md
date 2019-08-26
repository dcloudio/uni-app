# Weex `<style>` Transformer

[![NPM version][npm-image]][npm-url]
[![Build status][circle-image]][circle-url]
[![Downloads][downloads-image]][downloads-url]

[npm-image]: https://img.shields.io/npm/v/weex-styler.svg?style=flat-square
[npm-url]: https://npmjs.org/package/weex-styler
[circle-image]: https://circleci.com/gh/alibaba/weex_toolchain.svg?style=svg
[circle-url]: https://circleci.com/gh/alibaba/weex_toolchain/tree/master
[downloads-image]: https://img.shields.io/npm/dm/weex-styler.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/weex-styler

## Features

- convert a `<style>` element to JSON format
- autofix common mistakes
- friendly warnings

## API

- `parse(code, done)`
- `validate(json, done)`
- `validateItem(name, value)`

### util api

- `util.hyphenedToCamelCase(value)`
- `util.camelCaseToHyphened(value)`

```javascript
/**
 * Parse `<style>` code to a JSON Object and log errors & warnings
 * 
 * @param {string} code
 * @param {function} done
 */
function parse(code, done) {}

/**
 * Validate a JSON Object and log errors & warnings
 * 
 * @param {object} json
 * @param {function} done
 */
function validate(json, done) {}

/**
 * Result callback
 *
 * data
 * - jsonStyle{}: `classname.propname.value`-like object
 * - log[{line, column, reason}]
 * 
 * @param {Error} err
 * @param {object} data
 */
function done(err, data) {}

/**
 * Validate a single name-value pair
 * 
 * @param  {string} name  camel cased
 * @param  {string} value
 * @return {object}
 * - value
 * - log{reason}
 */
function validateItem(name, value) {}
```

## Validation

- rule check: only common rule type supported, othres will be ignored
- selector check: only single-classname selector is supported, others will be ignored
- prop name check: out-of-defined prop name will be warned but preserved
- prop value check: common prop value mistakes will be autofixed or ignored
    + color type: keywords, `#xxx` -> warning: `#xxxxxx`
    + color type: `transparent` -> error: not supported
    + length type: `100px` -> warning: `100`

## Demo

```javascript
var styler = require('weex-styler')

var code = 'html {color: #000000;} .foo {color: red; -webkit-transform: rotate(90deg); width: 200px;}'

styler.parse(code, function (err, data) {
  // syntax error
  // format: {line, column, reason, ...}
  err
  // result
  // {foo: {color: '#ff0000', webkitTransform: 'rotate(90deg)', width: 200}}
  data.jsonStyle
  // format: {line, column, reason}
  // - Error: Selector `html` is not supported. Weex only support single-classname selector
  // - Warning: prop value `red` is autofixed to `#ff0000`
  // - Warning: prop name `-webkit-transform` is not supported
  // - Warning: prop value `200px` is autofixed to `200`
  data.log[]
})

var jsonStyle = {
  foo: {
    color: 'red',
    webkitTransform: 'rotate(90deg)',
    width: '200px'
  }
}

styler.validate(json, function (err, data) {
  // syntax error
  err
  // result
  // {foo: {color: '#ff0000', webkitTransform: 'rotate(90deg)', width: 200}}
  data.jsonStyle
  // format: {reason}
  // - Warning: prop value `red` is autofixed to `#ff0000`
  // - Warning: prop name `-webkit-transform` is not supported
  // - Warning: prop value `200px` is autofixed to `200`
  data.log[]
})
```
