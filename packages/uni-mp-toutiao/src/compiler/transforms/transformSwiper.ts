import { createBindDirectiveNode } from '@dcloudio/uni-cli-shared'
import { genExpr } from '@dcloudio/uni-mp-compiler'
import {
  findProp,
  NodeTypes,
  RootNode,
  TemplateChildNode,
} from '@vue/compiler-core'

export function transformSwiper(node: RootNode | TemplateChildNode) {
  if (node.type !== NodeTypes.ELEMENT || node.tag !== 'swiper') {
    return
  }
  const disableTouchProp = findProp(node, 'disable-touch', false, true)
  if (!disableTouchProp) {
    return
  }
  const { props } = node
  if (disableTouchProp.type === NodeTypes.ATTRIBUTE) {
    // <swiper disable-touch/> => <swiper :touchable="false"/>
    props.splice(
      props.indexOf(disableTouchProp),
      1,
      createBindDirectiveNode('touchable', 'false')
    )
  } else {
    if (disableTouchProp.exp) {
      // <swiper :disable-touch="true"/> => <swiper :touchable="!(true)"/>
      let touchable = ''
      if (disableTouchProp.exp.type === NodeTypes.SIMPLE_EXPRESSION) {
        if (disableTouchProp.exp.content === 'true') {
          touchable = 'false'
        } else if (disableTouchProp.exp.content === 'false') {
          touchable = 'true'
        }
      }

      props.splice(
        props.indexOf(disableTouchProp),
        1,
        createBindDirectiveNode(
          'touchable',
          touchable || `!(${genExpr(disableTouchProp.exp)})`
        )
      )
    }
  }
}
