import { assert } from './testUtils'

describe('compiler: transform class', () => {
  test(`static class`, () => {
    assert(
      `<view class="foo"/>`,
      `<view class="foo"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<view class="foo bar"/>`,
      `<view class="foo bar"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<view class="foo  bar"/>`,
      `<view class="foo bar"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('v-bind:class basic', () => {
    assert(
      `<view :class="foo"/>`,
      `<view class="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _normalizeClass(_ctx.foo) }
}`
    )
    assert(
      `<view :class="foo | bar"/>`,
      `<view class="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _normalizeClass(_ctx.foo | _ctx.bar) }
}`
    )
  })
  test('v-bind:class basic + class ', () => {
    assert(
      `<view :class="foo" class="bar"/>`,
      `<view class="{{[a, 'bar']}}"/>`,
      `(_ctx, _cache) => {
  return { a: _normalizeClass(_ctx.foo) }
}`
    )
    assert(
      `<view class="bar" :class="foo"/>`,
      `<view class="{{['bar', a]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _normalizeClass(_ctx.foo) }
}`
    )
  })
  test('v-bind:class object syntax', () => {
    assert(
      `<view :class="{ red: \`\${isRed}\` }"/>`,
      `<view class="{{[a && 'red']}}"/>`,
      `(_ctx, _cache) => {
  return { a: \`\${_ctx.isRed}\` ? 1 : 0 }
}`
    )
    assert(
      `<view :class="{ a: 1, b: 0, c: true, d: false, e: null, f: undefined, g: ok, h: handle(ok), i: ok>1, j, [k]:1, [l]:m, ...n, ...{a:true}, ...{b:o} }"/>`,
      `<view class="{{['a', 'c', a && 'g', b && 'h', c && 'i', d && 'j', e, g && f, h, i, j]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.ok ? 1 : 0, b: _ctx.handle(_ctx.ok) ? 1 : 0, c: _ctx.ok > 1 ? 1 : 0, d: _ctx.j ? 1 : 0, e: _ctx.k, f: _ctx.l, g: _ctx.m ? 1 : 0, h: _normalizeClass(_ctx.n), i: _normalizeClass({ a: true }), j: _normalizeClass({ b: _ctx.o }) }
}`
    )
  })
  test('v-bind:class object syntax + class', () => {
    assert(
      `<view :class="{ red: isRed }" class="foo  bar"/>`,
      `<view class="{{[a && 'red', 'foo bar']}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.isRed ? 1 : 0 }
}`
    )
    assert(
      `<view class="foo  bar" :class="{ red: isRed }"/>`,
      `<view class="{{['foo bar', a && 'red']}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.isRed ? 1 : 0 }
}`
    )
    assert(
      `<view :class="{ a: 1, b: 0, c: true, d: false, e: null, f: undefined, g: ok, h: handle(ok), i: ok>1, j, [k]:1, [l]:m, ...n, ...{a:true}, ...{b:o} }" class="foo  bar"/>`,
      `<view class="{{['a', 'c', a && 'g', b && 'h', c && 'i', d && 'j', e, g && f, h, i, j, 'foo bar']}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.ok ? 1 : 0, b: _ctx.handle(_ctx.ok) ? 1 : 0, c: _ctx.ok > 1 ? 1 : 0, d: _ctx.j ? 1 : 0, e: _ctx.k, f: _ctx.l, g: _ctx.m ? 1 : 0, h: _normalizeClass(_ctx.n), i: _normalizeClass({ a: true }), j: _normalizeClass({ b: _ctx.o }) }
}`
    )
    assert(
      `<view class="foo  bar" :class="{ a: 1, b: 0, c: true, d: false, e: null, f: undefined, g: ok, h: handle(ok), i: ok>1, j, [k]:1, [l]:m, ...n, ...{a:true}, ...{b:o} }"/>`,
      `<view class="{{['foo bar', 'a', 'c', a && 'g', b && 'h', c && 'i', d && 'j', e, g && f, h, i, j]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.ok ? 1 : 0, b: _ctx.handle(_ctx.ok) ? 1 : 0, c: _ctx.ok > 1 ? 1 : 0, d: _ctx.j ? 1 : 0, e: _ctx.k, f: _ctx.l, g: _ctx.m ? 1 : 0, h: _normalizeClass(_ctx.n), i: _normalizeClass({ a: true }), j: _normalizeClass({ b: _ctx.o }) }
}`
    )
  })
  test('v-bind:class array syntax', () => {
    assert(
      `<view :class="[classA, \`\${classB}\`]"/>`,
      `<view class="{{[a, b]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _normalizeClass(_ctx.classA), b: _normalizeClass(\`\${_ctx.classB}\`) }
}`
    )
    assert(
      `<view :class="[classA, classB]"/>`,
      `<view class="{{[a, b]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _normalizeClass(_ctx.classA), b: _normalizeClass(_ctx.classB) }
}`
    )
    assert(
      `<view :class="[classA, classB, { classC: isC, classD: isD }, 'classE', isF ? 'classF' : '', isG && 'classG', ...classH, ...[classI,classJ], handle(classK) ]"/>`,
      `<view class="{{[a, b, c, 'classE', d, e, f, g, h]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _normalizeClass(_ctx.classA), b: _normalizeClass(_ctx.classB), c: _normalizeClass({ classC: _ctx.isC, classD: _ctx.isD }), d: _normalizeClass(_ctx.isF ? 'classF' : ''), e: _normalizeClass(_ctx.isG && 'classG'), f: _normalizeClass(_ctx.classH), g: _normalizeClass([_ctx.classI, _ctx.classJ]), h: _normalizeClass(_ctx.handle(_ctx.classK)) }
}`
    )
  })
  test('v-bind:class array syntax + class', () => {
    assert(
      `<view :class="[classA, classB]" class="foo  bar"/>`,
      `<view class="{{[a, b, 'foo bar']}}"/>`,
      `(_ctx, _cache) => {
  return { a: _normalizeClass(_ctx.classA), b: _normalizeClass(_ctx.classB) }
}`
    )
    assert(
      `<view class="foo  bar" :class="[classA, classB]"/>`,
      `<view class="{{['foo bar', a, b]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _normalizeClass(_ctx.classA), b: _normalizeClass(_ctx.classB) }
}`
    )
    assert(
      `<view :class="[classA, classB, { classC: isC, classD: isD }, 'classE', isF ? 'classF' : '', isG && 'classG', ...classH, ...[classI,classJ], handle(classK) ]" class="foo  bar"/>`,
      `<view class="{{[a, b, c, 'classE', d, e, f, g, h, 'foo bar']}}"/>`,
      `(_ctx, _cache) => {
  return { a: _normalizeClass(_ctx.classA), b: _normalizeClass(_ctx.classB), c: _normalizeClass({ classC: _ctx.isC, classD: _ctx.isD }), d: _normalizeClass(_ctx.isF ? 'classF' : ''), e: _normalizeClass(_ctx.isG && 'classG'), f: _normalizeClass(_ctx.classH), g: _normalizeClass([_ctx.classI, _ctx.classJ]), h: _normalizeClass(_ctx.handle(_ctx.classK)) }
}`
    )
    assert(
      `<view class="foo  bar" :class="[classA, classB, { classC: isC, classD: isD }, 'classE', isF ? 'classF' : '', isG && 'classG', ...classH, ...[classI,classJ], handle(classK) ]"/>`,
      `<view class="{{['foo bar', a, b, c, 'classE', d, e, f, g, h]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _normalizeClass(_ctx.classA), b: _normalizeClass(_ctx.classB), c: _normalizeClass({ classC: _ctx.isC, classD: _ctx.isD }), d: _normalizeClass(_ctx.isF ? 'classF' : ''), e: _normalizeClass(_ctx.isG && 'classG'), f: _normalizeClass(_ctx.classH), g: _normalizeClass([_ctx.classI, _ctx.classJ]), h: _normalizeClass(_ctx.handle(_ctx.classK)) }
}`
    )
  })
})
