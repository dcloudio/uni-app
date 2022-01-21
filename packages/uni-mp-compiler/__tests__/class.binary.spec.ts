import { assert as baseAssert, miniProgram } from './testUtils'

const assert: typeof baseAssert = (
  template,
  templateCode,
  renderCode,
  options
) => {
  return baseAssert(template, templateCode, renderCode, {
    ...options,
    miniProgram: {
      ...miniProgram,
      class: {
        array: false,
      },
      emitFile({ source }) {
        expect(source).toBe(templateCode)
        return ''
      },
    },
  })
}

describe('compiler: transform class to binary expression', () => {
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
  return { a: _n(_ctx.foo) }
}`
    )
    assert(
      `<view :class="foo | bar"/>`,
      `<view class="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _n(_ctx.foo | _ctx.bar) }
}`
    )
  })
  test('v-bind:class basic + class ', () => {
    assert(
      `<view :class="foo" class="bar"/>`,
      `<view class="{{(a) + ' ' + 'bar'}}"/>`,
      `(_ctx, _cache) => {
  return { a: _n(_ctx.foo) }
}`
    )
    assert(
      `<view class="bar" :class="foo"/>`,
      `<view class="{{('bar') + ' ' + a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _n(_ctx.foo) }
}`
    )
  })
  test('v-bind:class object syntax', () => {
    assert(
      `<view :class="{ red: \`\${isRed}\` }"/>`,
      `<view class="{{(a && 'red')}}"/>`,
      `(_ctx, _cache) => {
  return { a: \`\${_ctx.isRed}\` ? 1 : '' }
}`
    )
    assert(
      `<view :class="{ a: 1, b: 0, c: true, d: false, e: null, f: undefined, g: ok, h: handle(ok), i: ok>1, j, [k]:1, [l]:m, ...n, ...{a:true}, ...{b:o} }"/>`,
      `<view class="{{('a') + ' ' + 'c' + ' ' + (a && 'g') + ' ' + (b && 'h') + ' ' + (c && 'i') + ' ' + (d && 'j') + ' ' + e + ' ' + (g && f) + ' ' + h + ' ' + i + ' ' + j}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.ok ? 1 : '', b: _ctx.handle(_ctx.ok) ? 1 : '', c: _ctx.ok > 1 ? 1 : '', d: _ctx.j ? 1 : '', e: _ctx.k, f: _ctx.l, g: _ctx.m ? 1 : '', h: _n(_ctx.n), i: _n({ a: true }), j: _n({ b: _ctx.o }) }
}`
    )
  })
  test('v-bind:class object syntax + class', () => {
    assert(
      `<view :class="{ red: isRed }" class="foo  bar"/>`,
      `<view class="{{(a && 'red') + ' ' + 'foo' + ' ' + 'bar'}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.isRed ? 1 : '' }
}`
    )
    assert(
      `<view class="foo  bar" :class="{ red: isRed }"/>`,
      `<view class="{{('foo') + ' ' + 'bar' + ' ' + (a && 'red')}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.isRed ? 1 : '' }
}`
    )
    assert(
      `<view :class="{ a: 1, b: 0, c: true, d: false, e: null, f: undefined, g: ok, h: handle(ok), i: ok>1, j, [k]:1, [l]:m, ...n, ...{a:true}, ...{b:o} }" class="foo  bar"/>`,
      `<view class="{{('a') + ' ' + 'c' + ' ' + (a && 'g') + ' ' + (b && 'h') + ' ' + (c && 'i') + ' ' + (d && 'j') + ' ' + e + ' ' + (g && f) + ' ' + h + ' ' + i + ' ' + j + ' ' + 'foo' + ' ' + 'bar'}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.ok ? 1 : '', b: _ctx.handle(_ctx.ok) ? 1 : '', c: _ctx.ok > 1 ? 1 : '', d: _ctx.j ? 1 : '', e: _ctx.k, f: _ctx.l, g: _ctx.m ? 1 : '', h: _n(_ctx.n), i: _n({ a: true }), j: _n({ b: _ctx.o }) }
}`
    )
    assert(
      `<view class="foo  bar" :class="{ a: 1, b: 0, c: true, d: false, e: null, f: undefined, g: ok, h: handle(ok), i: ok>1, j, [k]:1, [l]:m, ...n, ...{a:true}, ...{b:o} }"/>`,
      `<view class="{{('foo') + ' ' + 'bar' + ' ' + 'a' + ' ' + 'c' + ' ' + (a && 'g') + ' ' + (b && 'h') + ' ' + (c && 'i') + ' ' + (d && 'j') + ' ' + e + ' ' + (g && f) + ' ' + h + ' ' + i + ' ' + j}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.ok ? 1 : '', b: _ctx.handle(_ctx.ok) ? 1 : '', c: _ctx.ok > 1 ? 1 : '', d: _ctx.j ? 1 : '', e: _ctx.k, f: _ctx.l, g: _ctx.m ? 1 : '', h: _n(_ctx.n), i: _n({ a: true }), j: _n({ b: _ctx.o }) }
}`
    )
  })
  test('v-bind:class array syntax', () => {
    assert(
      `<view :class="[classA, \`\${classB}\`]"/>`,
      `<view class="{{(a) + ' ' + b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _n(_ctx.classA), b: _n(\`\${_ctx.classB}\`) }
}`
    )
    assert(
      `<view :class="[classA, classB]"/>`,
      `<view class="{{(a) + ' ' + b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _n(_ctx.classA), b: _n(_ctx.classB) }
}`
    )
    assert(
      `<view :class="[classA, classB, { classC: isC, classD: isD }, 'classE', isF ? 'classF' : '', isG && 'classG', ...classH, ...[classI,classJ], handle(classK) ]"/>`,
      `<view class="{{(a) + ' ' + b + ' ' + c + ' ' + 'classE' + ' ' + d + ' ' + e + ' ' + f + ' ' + g + ' ' + h}}"/>`,
      `(_ctx, _cache) => {
  return { a: _n(_ctx.classA), b: _n(_ctx.classB), c: _n({ classC: _ctx.isC, classD: _ctx.isD }), d: _n(_ctx.isF ? 'classF' : ''), e: _n(_ctx.isG && 'classG'), f: _n(_ctx.classH), g: _n([_ctx.classI, _ctx.classJ]), h: _n(_ctx.handle(_ctx.classK)) }
}`
    )
  })
  test('v-bind:class array syntax + class', () => {
    assert(
      `<view :class="[classA, classB]" class="foo  bar"/>`,
      `<view class="{{(a) + ' ' + b + ' ' + 'foo' + ' ' + 'bar'}}"/>`,
      `(_ctx, _cache) => {
  return { a: _n(_ctx.classA), b: _n(_ctx.classB) }
}`
    )
    assert(
      `<view class="foo  bar" :class="[classA, classB]"/>`,
      `<view class="{{('foo') + ' ' + 'bar' + ' ' + a + ' ' + b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _n(_ctx.classA), b: _n(_ctx.classB) }
}`
    )
    assert(
      `<view :class="[classA, classB, { classC: isC, classD: isD }, 'classE', isF ? 'classF' : '', isG && 'classG', ...classH, ...[classI,classJ], handle(classK) ]" class="foo  bar"/>`,
      `<view class="{{(a) + ' ' + b + ' ' + c + ' ' + 'classE' + ' ' + d + ' ' + e + ' ' + f + ' ' + g + ' ' + h + ' ' + 'foo' + ' ' + 'bar'}}"/>`,
      `(_ctx, _cache) => {
  return { a: _n(_ctx.classA), b: _n(_ctx.classB), c: _n({ classC: _ctx.isC, classD: _ctx.isD }), d: _n(_ctx.isF ? 'classF' : ''), e: _n(_ctx.isG && 'classG'), f: _n(_ctx.classH), g: _n([_ctx.classI, _ctx.classJ]), h: _n(_ctx.handle(_ctx.classK)) }
}`
    )
    assert(
      `<view class="foo  bar" :class="[classA, classB, { classC: isC, classD: isD }, 'classE', isF ? 'classF' : '', isG && 'classG', ...classH, ...[classI,classJ], handle(classK) ]"/>`,
      `<view class="{{('foo') + ' ' + 'bar' + ' ' + a + ' ' + b + ' ' + c + ' ' + 'classE' + ' ' + d + ' ' + e + ' ' + f + ' ' + g + ' ' + h}}"/>`,
      `(_ctx, _cache) => {
  return { a: _n(_ctx.classA), b: _n(_ctx.classB), c: _n({ classC: _ctx.isC, classD: _ctx.isD }), d: _n(_ctx.isF ? 'classF' : ''), e: _n(_ctx.isG && 'classG'), f: _n(_ctx.classH), g: _n([_ctx.classI, _ctx.classJ]), h: _n(_ctx.handle(_ctx.classK)) }
}`
    )
  })
})
