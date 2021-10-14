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
  //   test('v-bind:style object syntax + style', () => {
  //     assert(
  //       `<view :style="{ red: isRed }" style="foo  bar"/>`,
  //       `<view style="{{[a && 'red', 'foo bar']}}"/>`,
  //       `(_ctx, _cache) => {
  //   return { a: _ctx.isRed }
  // }`
  //     )
  //     assert(
  //       `<view style="foo  bar" :style="{ red: isRed }"/>`,
  //       `<view style="{{['foo bar', a && 'red']}}"/>`,
  //       `(_ctx, _cache) => {
  //   return { a: _ctx.isRed }
  // }`
  //     )
  //     assert(
  //       `<view :style="{ a: 1, b: 0, c: true, d: false, e: null, f: undefined, g: ok, h: handle(ok), i: ok>1, j, [k]:1, [l]:m, ...n, ...{a:true}, ...{b:o} }" style="foo  bar"/>`,
  //       `<view style="{{['a', 'c', a && 'g', b && 'h', c && 'i', d && 'j', e, g && f, h, i, j, 'foo bar']}}"/>`,
  //       `(_ctx, _cache) => {
  //   return { a: _ctx.ok, b: _ctx.handle(_ctx.ok), c: _ctx.ok > 1, d: _ctx.j, e: _ctx.k, f: _ctx.l, g: _ctx.m, h: _normalizeClass({ ..._ctx.n }), i: _normalizeClass({ ...{ a: true } }), j: _normalizeClass({ ...{ b: _ctx.o } }) }
  // }`
  //     )
  //     assert(
  //       `<view style="foo  bar" :style="{ a: 1, b: 0, c: true, d: false, e: null, f: undefined, g: ok, h: handle(ok), i: ok>1, j, [k]:1, [l]:m, ...n, ...{a:true}, ...{b:o} }"/>`,
  //       `<view style="{{['foo bar', 'a', 'c', a && 'g', b && 'h', c && 'i', d && 'j', e, g && f, h, i, j]}}"/>`,
  //       `(_ctx, _cache) => {
  //   return { a: _ctx.ok, b: _ctx.handle(_ctx.ok), c: _ctx.ok > 1, d: _ctx.j, e: _ctx.k, f: _ctx.l, g: _ctx.m, h: _normalizeClass({ ..._ctx.n }), i: _normalizeClass({ ...{ a: true } }), j: _normalizeClass({ ...{ b: _ctx.o } }) }
  // }`
  //     )
  //   })
  //   test('v-bind:style array syntax', () => {
  //     assert(
  //       `<view :style="[classA, classB]"/>`,
  //       `<view style="{{[a, b]}}"/>`,
  //       `(_ctx, _cache) => {
  //   return { a: _normalizeClass(_ctx.classA), b: _normalizeClass(_ctx.classB) }
  // }`
  //     )
  //     assert(
  //       `<view :style="[classA, classB, { classC: isC, classD: isD }, 'classE', isF ? 'classF' : '', isG && 'classG', ...classH, ...[classI,classJ], handle(classK) ]"/>`,
  //       `<view style="{{[a, b, c, 'classE', d, e, f, g, h]}}"/>`,
  //       `(_ctx, _cache) => {
  //   return { a: _normalizeClass(_ctx.classA), b: _normalizeClass(_ctx.classB), c: _normalizeClass({ classC: _ctx.isC, classD: _ctx.isD }), d: _normalizeClass(_ctx.isF ? 'classF' : ''), e: _normalizeClass(_ctx.isG && 'classG'), f: _normalizeClass([..._ctx.classH]), g: _normalizeClass([...[_ctx.classI, _ctx.classJ]]), h: _normalizeClass(_ctx.handle(_ctx.classK)) }
  // }`
  //     )
  //   })
  //   test('v-bind:style array syntax + style', () => {
  //     assert(
  //       `<view :style="[classA, classB]" style="foo  bar"/>`,
  //       `<view style="{{[a, b, 'foo bar']}}"/>`,
  //       `(_ctx, _cache) => {
  //   return { a: _normalizeClass(_ctx.classA), b: _normalizeClass(_ctx.classB) }
  // }`
  //     )
  //     assert(
  //       `<view style="foo  bar" :style="[classA, classB]"/>`,
  //       `<view style="{{['foo bar', a, b]}}"/>`,
  //       `(_ctx, _cache) => {
  //   return { a: _normalizeClass(_ctx.classA), b: _normalizeClass(_ctx.classB) }
  // }`
  //     )
  //     assert(
  //       `<view :style="[classA, classB, { classC: isC, classD: isD }, 'classE', isF ? 'classF' : '', isG && 'classG', ...classH, ...[classI,classJ], handle(classK) ]" style="foo  bar"/>`,
  //       `<view style="{{[a, b, c, 'classE', d, e, f, g, h, 'foo bar']}}"/>`,
  //       `(_ctx, _cache) => {
  //   return { a: _normalizeClass(_ctx.classA), b: _normalizeClass(_ctx.classB), c: _normalizeClass({ classC: _ctx.isC, classD: _ctx.isD }), d: _normalizeClass(_ctx.isF ? 'classF' : ''), e: _normalizeClass(_ctx.isG && 'classG'), f: _normalizeClass([..._ctx.classH]), g: _normalizeClass([...[_ctx.classI, _ctx.classJ]]), h: _normalizeClass(_ctx.handle(_ctx.classK)) }
  // }`
  //     )
  //     assert(
  //       `<view style="foo  bar" :style="[classA, classB, { classC: isC, classD: isD }, 'classE', isF ? 'classF' : '', isG && 'classG', ...classH, ...[classI,classJ], handle(classK) ]"/>`,
  //       `<view style="{{['foo bar', a, b, c, 'classE', d, e, f, g, h]}}"/>`,
  //       `(_ctx, _cache) => {
  //   return { a: _normalizeClass(_ctx.classA), b: _normalizeClass(_ctx.classB), c: _normalizeClass({ classC: _ctx.isC, classD: _ctx.isD }), d: _normalizeClass(_ctx.isF ? 'classF' : ''), e: _normalizeClass(_ctx.isG && 'classG'), f: _normalizeClass([..._ctx.classH]), g: _normalizeClass([...[_ctx.classI, _ctx.classJ]]), h: _normalizeClass(_ctx.handle(_ctx.classK)) }
  // }`
  //     )
  //   })
})
