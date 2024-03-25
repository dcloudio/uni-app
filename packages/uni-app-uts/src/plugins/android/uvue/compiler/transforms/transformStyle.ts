import { DirectiveNode, NodeTypes, SourceLocation } from '@vue/compiler-core'
import { parse } from '@dcloudio/uni-nvue-styler'
import { createCompilerError } from '../errors'
import { NodeTransform } from '../transform'
import { parseStringStyle } from '@vue/shared'

// Verify that the template style is in compliance with specifications
export const transformStyle: NodeTransform = (node, context) => {
  if (node.type === NodeTypes.ELEMENT) {
    node.props.forEach((p, i) => {
      if (p.type === NodeTypes.ATTRIBUTE && p.name === 'style' && p.value) {
        // 静态 style 编译成对象，减少运行时解析
        const styleObjectStr = parseStyleString2ObjectString(p.value.content)
        node.props[i] = createVBindStyleExp(styleObjectStr, p.loc)

        parse(p.value.content, {
          logLevel: 'WARNING',
          map: true,
          ts: true,
          noCode: true,
          type: 'uvue',
          platform: process.env.UNI_UTS_PLATFORM,
        }).then(({ messages }) => {
          messages.forEach((message) => {
            context.onWarn(
              createCompilerError(100, p.loc, {
                100: message.text,
              })
            )
          })
        })
      }
    })
  }
}

function parseStyleString2ObjectString(styleString: string) {
  const styleObject = parseStringStyle(styleString)
  return JSON.stringify(styleObject)
}

function createVBindStyleExp(
  styleObjectStr: string,
  loc: SourceLocation
): DirectiveNode {
  return {
    type: NodeTypes.DIRECTIVE,
    name: 'bind',
    arg: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      content: 'style',
      isStatic: true,
      constType: 3,
      loc: {
        end: loc.end,
        start: loc.start,
        source: 'style',
      },
    },
    exp: {
      constType: 0,
      content: styleObjectStr,
      isStatic: false,
      type: NodeTypes.SIMPLE_EXPRESSION,
      loc: {
        end: loc.end,
        start: loc.start,
        source: styleObjectStr,
      },
    },
    modifiers: [],
    loc: {
      end: loc.end,
      start: loc.start,
      source: `:style="${styleObjectStr}"`,
    },
  }
}
