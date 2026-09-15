type ScopeSource = Pick<Element, 'attributes'>
type ScopeTarget = Pick<Element, 'setAttribute' | 'removeAttribute'>

const scopeIdRE = /^data-v-[a-z0-9]+(?:-s)?$/i
const currentScopeIds = new WeakMap<ScopeTarget, Set<string>>()

function isScopeId(name: string) {
  return name !== 'data-v-inspector' && scopeIdRE.test(name)
}

export function syncScopeIdsToBody(
  source: ScopeSource | null,
  target: ScopeTarget
) {
  const nextScopeIds = new Set<string>()
  if (source) {
    Array.from(source.attributes).forEach((attribute) => {
      if (isScopeId(attribute.name)) {
        nextScopeIds.add(attribute.name)
      }
    })
  }

  const previousScopeIds = currentScopeIds.get(target)
  previousScopeIds?.forEach((scopeId) => {
    if (!nextScopeIds.has(scopeId)) {
      target.removeAttribute(scopeId)
    }
  })
  nextScopeIds.forEach((scopeId) => target.setAttribute(scopeId, ''))
  currentScopeIds.set(target, nextScopeIds)
}
