import { ModuleOptions } from 'vue-template-compiler'
// render-whole => append="tree"
export function createRenderWholeModule() {
  return {
    preTransformNode(el) {
      if (!Object.hasOwnProperty.call(el.attrsMap, 'append')) {
        const name = 'render-whole'
        const value = el.attrsMap[name]
        if (value === true || value === 'true') {
          // remove
          delete el.attrsMap.append
          const index = el.attrsList.findIndex((item) => item.name === name)
          const attr = el.attrsList[index]
          el.attrsList.splice(index, 1)

          el.appendAsTree = true
          el.attrsMap.append = 'tree'
          el.attrsList.push({
            name: 'append',
            value: 'tree',
            bool: false,
            start: (attr as any).start,
            end: (attr as any).end,
          } as any)
        }
      }
      return el
    },
  } as ModuleOptions
}
