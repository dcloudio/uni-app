import type { Declaration } from 'postcss'
import { createDecl } from '../../utils'
import { capitalize } from '../../shared'

export function mergeShorthand(
  decls: Declaration[],
  property: 'color' | 'style',
  defaultValue: string
): boolean {
  const suffix = property
  const borderProps = {
    [`border-top-${suffix}`]: null as Declaration | null,
    [`border-right-${suffix}`]: null as Declaration | null,
    [`border-bottom-${suffix}`]: null as Declaration | null,
    [`border-left-${suffix}`]: null as Declaration | null,
  }

  const indices: number[] = []

  for (let i = 0; i < decls.length; i++) {
    const decl = decls[i]
    const name = (decl as any).__originalProp || decl.prop
    if (name in borderProps) {
      borderProps[name as keyof typeof borderProps] = decl
      indices.push(i)
    }
  }

  if (indices.length === 0) {
    return false
  }

  const topValue = borderProps[`border-top-${suffix}`]?.value || defaultValue
  const rightValue =
    borderProps[`border-right-${suffix}`]?.value || defaultValue
  const bottomValue =
    borderProps[`border-bottom-${suffix}`]?.value || defaultValue
  const leftValue = borderProps[`border-left-${suffix}`]?.value || defaultValue

  const value = `${topValue} ${rightValue} ${bottomValue} ${leftValue}`

  const firstDecl =
    borderProps[`border-top-${suffix}`] ||
    borderProps[`border-right-${suffix}`] ||
    borderProps[`border-bottom-${suffix}`] ||
    borderProps[`border-left-${suffix}`]!

  const newDecl = createDecl(
    `border${capitalize(suffix)}`,
    value,
    firstDecl.important || false,
    firstDecl.raws,
    firstDecl.source
  )

  ;(newDecl as any).__originalProp = `border-${suffix}`

  for (let i = indices.length - 1; i >= 0; i--) {
    decls.splice(indices[i], 1)
  }

  decls.splice(indices[0], 0, newDecl)

  return true
}

export function borderColor(decls: Declaration[]): boolean {
  return mergeShorthand(decls, 'color', '#00000000')
}
