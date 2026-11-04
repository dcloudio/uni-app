import { parse } from '@babel/parser'
import { traverseFast } from '@babel/types'
import MagicString from 'magic-string'
import type { Plugin } from 'vite'

// 只在 Web Vapor 的条件编译后、脚本降级前安装；原生端、VDOM 仍使用原类构造流程。
// 元信息随类模块输出，框架构建和项目内 uni_modules 开发共用，不按文件路径猜组件。
export function transformUniElementClasses(code: string, id: string) {
  // 预筛不解析类头，避免注释、泛型等合法语法导致静默漏转换；精确判断交给 AST。
  if (!code.includes('class') || !/\bUni\w*Element\b/.test(code)) {
    return
  }
  const ast = parse(code, { sourceType: 'module', plugins: ['typescript'] })
  const output = new MagicString(code)
  // .uts 仍需后续类型检查，内部元信息不能改变类的静态继承类型或 init 的 this 推导。
  const typed =
    /\.(?:[cm]?ts|uts)(?:\?|$)/i.test(id) ||
    /[?&]lang[.=](?:ts|uts)(?:&|$)/.test(id)
  let changed = false
  let ambientEnd = -1
  traverseFast(ast, (node) => {
    // traverseFast 不提供跳过子树的接口；环境声明范围内的节点均不参与转换。
    // 内部类通常没有自己的 declare 标记，不能只检查类本身。
    if (node.start! < ambientEnd) return
    if (node.type === 'TSModuleDeclaration' && node.declare) {
      ambientEnd = node.end!
      return
    }
    if (
      node.type !== 'ClassDeclaration' ||
      node.declare ||
      !node.id ||
      !/^Uni\w*Element$/.test(node.id.name) ||
      node.superClass?.type !== 'Identifier' ||
      !/^Uni\w*Element(?:Impl)?$/.test(node.superClass.name)
    )
      return
    if (
      node.body.body.some(
        (member) =>
          'key' in member &&
          member.key.type === 'Identifier' &&
          member.key.name === '__uniElement'
      )
    )
      return
    const initializers: string[] = []
    let usesVm = false
    for (const member of node.body.body) {
      if ('static' in member && member.static) continue
      if (
        member.type === 'ClassPrivateProperty' ||
        member.type === 'ClassPrivateMethod' ||
        ('decorators' in member && member.decorators?.length)
      ) {
        throw new Error(
          `${id}: ${node.id.name} 的 Element 成员不支持私有字段或装饰器`
        )
      }
      traverseFast(member, (child) => {
        if (
          (child.type === 'MemberExpression' ||
            child.type === 'OptionalMemberExpression') &&
          child.object.type === 'ThisExpression' &&
          ((!child.computed &&
            child.property.type === 'Identifier' &&
            child.property.name === 'vm') ||
            (child.computed &&
              child.property.type === 'StringLiteral' &&
              child.property.value === 'vm'))
        )
          usesVm = true
      })
      if (member.type === 'ClassProperty') {
        // declare 和 abstract 字段都没有运行时定义，不能遮蔽派生类成员。
        if (member.declare || member.abstract) continue
        if (member.computed || member.key.type !== 'Identifier')
          throw new Error(
            `${id}: ${node.id.name} 的 Element 字段必须使用静态标识符`
          )
        // DOM 的标签名保持原生含义；逻辑名称已由 uniTagName 提供。
        if (['tagName', 'nodeName', 'vm'].includes(member.key.name)) continue
        if (member.value)
          traverseFast(member.value, (child) => {
            if (child.type === 'Super')
              throw new Error(`${id}: Element 字段初始化不支持 super`)
          })
        // 字段定义必须遮蔽继承访问器，不能用赋值触发 setter；无初值字段也有自身属性。
        initializers.push(
          `Object.defineProperty(this, ${JSON.stringify(
            member.key.name
          )}, {value: (${
            member.value
              ? code.slice(member.value.start!, member.value.end!)
              : 'void 0'
          }), writable: true, enumerable: true, configurable: true});`
        )
      } else if (
        member.type === 'ClassMethod' &&
        member.kind === 'constructor'
      ) {
        // 当前内置类没有显式构造器；不搬运构造器，避免改变字段与局部变量的作用域。
        throw new Error(
          `${id}: ${node.id.name} 的 Element 暂不支持自定义构造器`
        )
      }
    }
    // 不构造 HTMLElement，不复制实例；字段在真实根上按继承顺序定义一次。
    // 无字段的类不生成 init，未使用 vm 的类不保存组件接口或登记清理回调。
    const init = initializers.join('\n')
    // 字段表达式可能带有 T 等类型断言；移到静态方法后仍需保留原类的泛型作用域。
    const typeParameters = node.typeParameters
      ? code.slice(node.typeParameters.start!, node.typeParameters.end!)
      : ''
    output.appendLeft(
      node.body.end! - 1,
      `\nstatic __uniElement${typed ? ': any' : ''} = {${
        usesVm ? 'vm: true,' : ''
      }${
        init
          ? `init${typeParameters}(${typed ? 'this: any' : ''}) {${init}}`
          : ''
      }};\n`
    )
    changed = true
  })
  if (!changed) return
  return {
    code: output.toString(),
    map: output.generateMap({ source: id, includeContent: true, hires: true }),
  }
}

export function uniWebVaporElementPlugin(): Plugin {
  return {
    name: 'uni:web-vapor-element',
    // uni:pre 已先完成条件编译；必须在 UTS/esbuild 将字段降为构造器赋值前读取类声明。
    // 原始 SFC 和 raw/url 资源不参与，SFC 的脚本请求仍沿用同一模块处理。
    enforce: 'pre',
    transform(code, id) {
      const [filename, query = ''] = id.split('?', 2)
      const params = new URLSearchParams(query)
      if (
        params.has('raw') ||
        params.has('url') ||
        /\.d\.[cm]?ts$/i.test(filename)
      )
        return
      if (
        !/\.[cm]?[jt]s$|\.uts$/i.test(filename) &&
        !(params.get('type') === 'script')
      )
        return
      return transformUniElementClasses(code, id)
    },
  }
}
