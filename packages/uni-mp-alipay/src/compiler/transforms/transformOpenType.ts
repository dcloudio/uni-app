import {
  findProp,
  isSimpleIdentifier,
  NodeTypes,
  RootNode,
  TemplateChildNode,
} from '@vue/compiler-core'
import {
  createAttributeNode,
  createOnDirectiveNode,
} from '@dcloudio/uni-cli-shared'

export function transformOpenType(node: RootNode | TemplateChildNode) {
  if (node.type !== NodeTypes.ELEMENT || node.tag !== 'button') {
    return
  }
  const openTypeProp = findProp(node, 'open-type')
  if (!openTypeProp) {
    return
  }
  if (
    openTypeProp.type !== NodeTypes.ATTRIBUTE ||
    openTypeProp.value?.content !== 'getPhoneNumber'
  ) {
    return
  }
  openTypeProp.value.content = 'getAuthorize'
  const { props } = node
  props.splice(
    props.indexOf(openTypeProp) + 1,
    0,
    createAttributeNode('scope', 'phoneNumber')
  )
  let getPhoneNumberMethodName = ''
  const getPhoneNumberPropIndex = props.findIndex((prop) => {
    if (prop.type === NodeTypes.DIRECTIVE && prop.name === 'on') {
      const { arg, exp } = prop
      if (
        arg?.type === NodeTypes.SIMPLE_EXPRESSION &&
        exp?.type === NodeTypes.SIMPLE_EXPRESSION &&
        arg.isStatic &&
        arg.content === 'getphonenumber'
      ) {
        getPhoneNumberMethodName = exp.content
        return true
      }
    }
  })
  if (!getPhoneNumberMethodName) {
    return
  }
  props.splice(getPhoneNumberPropIndex, 1)
  const method = isSimpleIdentifier(getPhoneNumberMethodName)
    ? getPhoneNumberMethodName
    : `$event => { ${getPhoneNumberMethodName} }`
  props.push(
    createOnDirectiveNode(
      'getAuthorize',
      `$onAliGetAuthorize(${method},$event)`
    )
  )
  props.push(
    createOnDirectiveNode('error', `$onAliAuthError(${method},$event)`)
  )
}
