import { NodeTransform, NodeTypes } from '@vue/compiler-core'
import { parse } from '@dcloudio/uni-nvue-styler'
import { createCompilerError } from '../errors'

// Verify that the template style is in compliance with specifications
export const transformStyle: NodeTransform = (node, context) => {
  if (node.type === NodeTypes.ELEMENT) {
    node.props.forEach((p, i) => {
      if (p.type === NodeTypes.ATTRIBUTE && p.name === 'style' && p.value) {
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
