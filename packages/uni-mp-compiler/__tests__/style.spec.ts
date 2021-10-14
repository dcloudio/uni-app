import { assert } from './testUtils'

describe('compiler: transform style', () => {
  test(`static style`, () => {
    assert(
      `<view style="color: green"/>`,
      `<view style="color: green"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<view style="color: green;font-size:  15px"/>`,
      `<view style="color: green;font-size:  15px"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('v-bind:style basic', () => {
    assert(
      `<view :style="foo"/>`,
      `<view style="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _normalizeStyle(_ctx.foo) }
}`
    )
    assert(
      `<view :style="foo | bar"/>`,
      `<view style="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _normalizeStyle(_ctx.foo | _ctx.bar) }
}`
    )
  })
  test('v-bind:style basic + style ', () => {
    assert(
      `<view :style="foo" style="color:green;"/>`,
      `<view style="{{a + ';' + 'color:green;'}}"/>`,
      `(_ctx, _cache) => {
  return { a: _normalizeStyle(_ctx.foo) }
}`
    )
    assert(
      `<view style="color:green;" :style="foo"/>`,
      `<view style="{{'color:green;' + ';' + a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _normalizeStyle(_ctx.foo) }
}`
    )
  })
  test('v-bind:style object syntax', () => {
    assert(
      `<view :style="{ color: 'green' }"/>`,
      `<view style="{{'color:' + 'green'}}"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    // 暂不支持数组，用的较少
    // display:['-webkit-box', '-ms-flexbox', 'flex']
    assert(
      `<view :style="{color:'green',fontSize:'15px',backgroundColor: handle(bg),fontWeight,[padding]:box.padding,...style,...{margin:'0px'}}"/>`,
      `<view style="{{'color:' + 'green' + ';' + ('font-size:' + '15px') + ';' + ('background-color:' + a) + ';' + ('font-weight:' + b) + ';' + (c + ':' + d) + ';' + e + ';' + f}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.handle(_ctx.bg), b: _ctx.fontWeight, c: _hyphenate(_ctx.padding), d: _ctx.box.padding, e: _normalizeStyle(_ctx.style), f: _normalizeStyle({ margin: '0px' }) }
}`
    )
  })
  test('v-bind:style object syntax + style', () => {
    assert(
      `<view :style="{ color: 'green' }" style="font-size:15px"/>`,
      `<view style="{{'color:' + 'green' + ';' + 'font-size:15px'}}"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<view style="font-size:15px" :style="{ color: 'green' }"/>`,
      `<view style="{{'font-size:15px' + ';' + ('color:' + 'green')}}"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<view :style="{color:'green',fontSize:'15px',backgroundColor: handle(bg),fontWeight,[padding]:box.padding,...style,...{margin:'0px'}}" style="font-size:15px"/>`,
      `<view style="{{'color:' + 'green' + ';' + ('font-size:' + '15px') + ';' + ('background-color:' + a) + ';' + ('font-weight:' + b) + ';' + (c + ':' + d) + ';' + e + ';' + f + ';' + 'font-size:15px'}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.handle(_ctx.bg), b: _ctx.fontWeight, c: _hyphenate(_ctx.padding), d: _ctx.box.padding, e: _normalizeStyle(_ctx.style), f: _normalizeStyle({ margin: '0px' }) }
}`
    )
    assert(
      `<view style="font-size:15px" :style="{color:'green',fontSize:'15px',backgroundColor: handle(bg),fontWeight,[padding]:box.padding,...style,...{margin:'0px'}}"/>`,
      `<view style="{{'font-size:15px' + ';' + ('color:' + 'green' + ';' + ('font-size:' + '15px') + ';' + ('background-color:' + a) + ';' + ('font-weight:' + b) + ';' + (c + ':' + d) + ';' + e + ';' + f)}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.handle(_ctx.bg), b: _ctx.fontWeight, c: _hyphenate(_ctx.padding), d: _ctx.box.padding, e: _normalizeStyle(_ctx.style), f: _normalizeStyle({ margin: '0px' }) }
}`
    )
  })
  test('v-bind:style array syntax', () => {
    assert(
      `<view :style="[styleA, styleB]"/>`,
      `<view style="{{a + ';' + b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _normalizeStyle(_ctx.styleA), b: _normalizeStyle(_ctx.styleB) }
}`
    )
    assert(
      `<view :style="[styleA, styleB, { color:'red',fontSize }, 'font-weight:bold', ...styleC, ...[styleD,styleE], handle(styleF) ]"/>`,
      `<view style="{{a + ';' + b + ';' + c + ';' + 'font-weight:bold' + ';' + d + ';' + e + ';' + f}}"/>`,
      `(_ctx, _cache) => {
  return { a: _normalizeStyle(_ctx.styleA), b: _normalizeStyle(_ctx.styleB), c: _normalizeStyle({ color: 'red', fontSize: _ctx.fontSize }), d: _normalizeStyle(_ctx.styleC), e: _normalizeStyle([_ctx.styleD, _ctx.styleE]), f: _normalizeStyle(_ctx.handle(_ctx.styleF)) }
}`
    )
  })
  test('v-bind:style array syntax + style', () => {
    assert(
      `<view :style="[styleA, styleB]" style="font-size:15px"/>`,
      `<view style="{{a + ';' + b + ';' + 'font-size:15px'}}"/>`,
      `(_ctx, _cache) => {
  return { a: _normalizeStyle(_ctx.styleA), b: _normalizeStyle(_ctx.styleB) }
}`
    )
    assert(
      `<view style="font-size:15px" :style="[styleA, styleB]"/>`,
      `<view style="{{'font-size:15px' + ';' + (a + ';' + b)}}"/>`,
      `(_ctx, _cache) => {
  return { a: _normalizeStyle(_ctx.styleA), b: _normalizeStyle(_ctx.styleB) }
}`
    )
    assert(
      `<view :style="[styleA, styleB, { color:'red',fontSize }, 'font-weight:bold', ...styleC, ...[styleD,styleE], handle(styleF) ]" style="font-size:15px"/>`,
      `<view style="{{a + ';' + b + ';' + c + ';' + 'font-weight:bold' + ';' + d + ';' + e + ';' + f + ';' + 'font-size:15px'}}"/>`,
      `(_ctx, _cache) => {
  return { a: _normalizeStyle(_ctx.styleA), b: _normalizeStyle(_ctx.styleB), c: _normalizeStyle({ color: 'red', fontSize: _ctx.fontSize }), d: _normalizeStyle(_ctx.styleC), e: _normalizeStyle([_ctx.styleD, _ctx.styleE]), f: _normalizeStyle(_ctx.handle(_ctx.styleF)) }
}`
    )
    assert(
      `<view style="font-size:15px" :style="[styleA, styleB, { color:'red',fontSize }, 'font-weight:bold', ...styleC, ...[styleD,styleE], handle(styleF) ]"/>`,
      `<view style="{{'font-size:15px' + ';' + (a + ';' + b + ';' + c + ';' + 'font-weight:bold' + ';' + d + ';' + e + ';' + f)}}"/>`,
      `(_ctx, _cache) => {
  return { a: _normalizeStyle(_ctx.styleA), b: _normalizeStyle(_ctx.styleB), c: _normalizeStyle({ color: 'red', fontSize: _ctx.fontSize }), d: _normalizeStyle(_ctx.styleC), e: _normalizeStyle([_ctx.styleD, _ctx.styleE]), f: _normalizeStyle(_ctx.handle(_ctx.styleF)) }
}`
    )
  })
})
