import { type CompilerOptions, compile } from '@dcloudio/uni-mp-compiler'
import {
  createIsCustomElement,
  isMiniProgramUVueNativeTag,
} from '@dcloudio/uni-shared'
import {
  transformDirection,
  transformMPBuiltInTag,
} from '@dcloudio/uni-cli-shared'
import { type ElementNode, NodeTypes, baseParse } from '@vue/compiler-core'
import { customElements, getMiniProgramOptions } from '../src/compiler/options'
import { transformWaterflow } from '../src/x/compiler/transforms/transformWaterflow'

function compileWaterflow(template: string, options: CompilerOptions = {}) {
  let source = ''
  const result = compile(template, {
    mode: 'module',
    filename: 'foo.vue',
    prefixIdentifiers: true,
    inline: true,
    isX: true,
    isNativeTag: isMiniProgramUVueNativeTag,
    isCustomElement: createIsCustomElement(customElements),
    nodeTransforms: [
      transformWaterflow,
      transformMPBuiltInTag,
      transformDirection,
    ],
    miniProgram: {
      ...getMiniProgramOptions(true),
      emitFile({ source: templateSource }) {
        source = templateSource as string
        return ''
      },
    },
    ...options,
  })
  return {
    code: result.code,
    source,
    node: baseParse(source).children[0] as ElementNode,
  }
}

function children(node: ElementNode) {
  return node.children.filter(
    (child): child is ElementNode => child.type === NodeTypes.ELEMENT
  )
}

function attribute(node: ElementNode, name: string) {
  const prop = node.props.find(
    (prop) => prop.type === NodeTypes.ATTRIBUTE && prop.name === name
  )
  return prop?.type === NodeTypes.ATTRIBUTE ? prop.value?.content : undefined
}

describe('mp-weixin: waterflow', () => {
  beforeEach(() => {
    process.env.UNI_PLATFORM = 'mp-weixin'
  })

  test('wraps only the first keyed flow-item loop and preserves sibling order', () => {
    const { node, source, code } = compileWaterflow(`<waterflow>
      <view id="intro"/>
      <flow-item id="header"/>
      <flow-item v-for="item in unkeyed" id="unkeyed"/>
      <flow-item key="static" id="static"/>
      <flow-item v-for="item in items" :key="item.id" id="items"><text>{{item.text}}</text></flow-item>
      <flow-item v-for="item in more" :key="item.id" id="more"/>
      <flow-item id="footer"/>
      <text id="tail">tail</text>
    </waterflow>`)
    expect(node.tag).toBe('scroll-view')
    expect(attribute(node, 'type')).toBe('custom')
    expect(attribute(node, 'scroll-y')).toBe('true')
    expect(attribute(node, 'enable-flex')).toBe('true')
    expect(attribute(node, 'enhanced')).toBe('true')
    expect(
      children(node).map((child) => attribute(child, 'id') || child.tag)
    ).toEqual([
      'intro',
      'header',
      'unkeyed',
      'static',
      'grid-view',
      'more',
      'footer',
      'tail',
    ])
    const grid = children(node)[4]
    expect(attribute(grid, 'type')).toBe('masonry')
    expect(children(grid)).toHaveLength(1)
    expect(children(grid)[0].tag).toBe('view')
    expect(attribute(children(grid)[0], 'id')).toBe('items')
    expect(attribute(children(grid)[0], 'wx:key')).toBe('b')
    expect(code).toMatch(/b:\s*item\.id/)
    expect(attribute(children(grid)[0], 'wx:for')).toBeDefined()
    expect(source).not.toContain('flow-item')
    expect(source).not.toContain('waterflow')
  })

  test('moves static layout props to grid-view and keeps scroll props on scroll-view', () => {
    const { node } =
      compileWaterflow(`<waterflow id="flow" class="flow" style="height:300px"
      cross-axis-count="3" max-cross-axis-extent="200" main-axis-gap="10" cross-axis-gap="20" padding="[1,2,3,4]"
      scroll-top="100" upper-threshold="30" lower-threshold="40" show-scrollbar="false"
      refresher-enabled="true" refresher-default-style="none" @scroll="onScroll" @refresherrefresh="onRefresh">
      <flow-item v-for="item in items" :key="item.id"/>
    </waterflow>`)
    const grid = children(node)[0]
    for (const [name, value] of Object.entries({
      'cross-axis-count': '3',
      'max-cross-axis-extent': '200',
      'main-axis-gap': '10',
      'cross-axis-gap': '20',
      padding: '[1,2,3,4]',
    })) {
      expect(attribute(grid, name)).toBe(value)
      expect(attribute(node, name)).toBeUndefined()
    }
    for (const [name, value] of Object.entries({
      id: 'flow',
      class: 'flow',
      'scroll-top': '100',
      'upper-threshold': '30',
      'lower-threshold': '40',
      'show-scrollbar': 'false',
      'refresher-enabled': 'true',
      'refresher-default-style': 'none',
    })) {
      expect(attribute(node, name)).toBe(value)
      expect(attribute(grid, name)).toBeUndefined()
    }
    expect(attribute(node, 'style')).toContain('height:300px')
    expect(attribute(grid, 'style')).toBeUndefined()
    expect(attribute(node, 'bindscroll')).toBeDefined()
    expect(attribute(node, 'bindrefresherrefresh')).toBeDefined()
    expect(attribute(grid, 'bindscroll')).toBeUndefined()
  })

  test('handles dynamic layout props, camelCase and full v-bind syntax', () => {
    const { node, code } =
      compileWaterflow(`<waterflow :cross-axis-count="count" v-bind:maxCrossAxisExtent="extent"
      :mainAxisGap="gaps.main" :cross-axis-gap="gaps.cross" :padding="padding" :scroll-top="top">
      <flow-item v-for="item in items" :key="item.id"/>
    </waterflow>`)
    const grid = children(node)[0]
    for (const name of [
      'cross-axis-count',
      'max-cross-axis-extent',
      'main-axis-gap',
      'cross-axis-gap',
      'padding',
    ]) {
      expect(attribute(grid, name)).toMatch(/^\{\{.+\}\}$/)
      expect(attribute(node, name)).toBeUndefined()
    }
    expect(attribute(node, 'scroll-top')).toBeDefined()
    expect(attribute(grid, 'scroll-top')).toBeUndefined()
    for (const expression of [
      '_ctx.count',
      '_ctx.extent',
      '_ctx.gaps.main',
      '_ctx.gaps.cross',
      '_ctx.padding',
    ]) {
      expect(code).toContain(expression)
    }
    expect(code).not.toContain('_ctx._ctx')
  })

  test.each([
    '<waterflow/>',
    '<waterflow><flow-item id="header"/><flow-item v-for="item in items"/></waterflow>',
  ])('keeps an empty grid when no keyed loop exists: %s', (template) => {
    const { node } = compileWaterflow(template)
    const grid = children(node).at(-1)!
    expect(grid.tag).toBe('grid-view')
    expect(attribute(grid, 'type')).toBe('masonry')
    expect(children(grid)).toHaveLength(0)
    expect(
      children(node)
        .slice(0, -1)
        .every((child) => child.tag === 'view')
    ).toBe(true)
  })

  test('accepts a static key and keeps refresher and footer slots outside the grid', () => {
    const { node } = compileWaterflow(`<waterflow>
      <flow-item slot="refresher"/>
      <flow-item v-for="item in items" key="item"/>
      <flow-item slot="load-more"/>
    </waterflow>`)
    expect(children(node).map((child) => child.tag)).toEqual([
      'view',
      'grid-view',
      'view',
    ])
    expect(attribute(children(node)[0], 'slot')).toBe('refresher')
    expect(attribute(children(node)[2], 'slot')).toBe('load-more')
    expect(attribute(children(children(node)[1])[0], 'wx:for')).toBeDefined()
  })

  test('compiles nested waterflows and preserves v-for scopes', () => {
    const { source, code } = compileWaterflow(`<view>
      <waterflow v-for="group in groups" :key="group.id" :cross-axis-count="group.columns">
        <flow-item v-for="item in group.items" :key="item.id">
          <waterflow :main-axis-gap="item.gap"><flow-item v-for="child in item.children" :key="child.id"/></waterflow>
        </flow-item>
      </waterflow>
    </view>`)
    expect(source.match(/<grid-view/g)).toHaveLength(2)
    expect(source.match(/<scroll-view/g)).toHaveLength(2)
    expect(code).toContain('_f(group.items')
    expect(code).toContain('_f(item.children')
    expect(code).not.toMatch(/_ctx\.(group|item)\b/)
  })

  test('converts conditional flow-items and keeps the container condition', () => {
    const { source } = compileWaterflow(`<waterflow v-if="visible">
      <flow-item v-if="header" id="header"/>
      <flow-item v-for="item in items" :key="item.id"/>
      <flow-item v-if="footer" id="footer"/>
    </waterflow>`)
    expect(source).toContain('<scroll-view')
    expect(source.match(/wx:if=/g)).toHaveLength(3)
    expect(source).not.toContain('flow-item')
  })

  test('converts standalone flow-items to views', () => {
    const { node, source } = compileWaterflow(
      '<flow-item id="item" class="item" @click="onClick"><text>item</text></flow-item>'
    )
    expect(node.tag).toBe('view')
    expect(attribute(node, 'id')).toBe('item')
    expect(attribute(node, 'class')).toBe('item')
    expect(attribute(node, 'bindtap')).toBeDefined()
    expect(source).not.toContain('u-i=')
  })

  test.each([undefined, 'false', 'true'] as const)(
    'uni-app x 根据蒸汽模式注册 waterflow 转换（UNI_APP_X_VAPOR=%s）',
    (vapor) => {
      const previous = {
        UNI_APP_X: process.env.UNI_APP_X,
        UNI_APP_X_VAPOR: process.env.UNI_APP_X_VAPOR,
      }
      try {
        process.env.UNI_APP_X = 'true'
        if (vapor === undefined) {
          delete process.env.UNI_APP_X_VAPOR
        } else {
          process.env.UNI_APP_X_VAPOR = vapor
        }
        jest.isolateModules(() => {
          const { compilerOptions } = require('../src/compiler/options') as {
            compilerOptions: CompilerOptions
          }
          const { node } = compileWaterflow(
            '<waterflow><flow-item v-for="item in items" :key="item.id"/></waterflow>',
            compilerOptions
          )
          if (vapor === 'true') {
            expect(node.tag).toBe('scroll-view')
            expect(children(node)[0].tag).toBe('grid-view')
            expect(children(children(node)[0])[0].tag).toBe('view')
          } else {
            expect(node.tag).toBe('waterflow')
            expect(children(node)[0].tag).toBe('flow-item')
          }
        })
      } finally {
        Object.entries(previous).forEach(([name, value]) => {
          if (value === undefined) {
            delete process.env[name]
          } else {
            process.env[name] = value
          }
        })
      }
    }
  )
})
