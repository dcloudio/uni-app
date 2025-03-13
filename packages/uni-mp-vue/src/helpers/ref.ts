import {
  type ComponentInternalInstance,
  type Ref,
  getCurrentInstance,
} from 'vue'

export type VNodeRef =
  | string
  | Ref
  | ((ref: object | null, refs: Record<string, any>) => void)

export type TemplateRef = {
  i: string // id
  r: VNodeRef
  k?: string // setup ref key
  f?: boolean // refInFor marker
}

export function setRef(
  ref: VNodeRef,
  id: string,
  opts: {
    k?: string
    f?: boolean
  } = {}
): void {
  const { $templateRefs } =
    getCurrentInstance()! as ComponentInternalInstance & {
      $templateRefs: TemplateRef[]
    }
  $templateRefs.push({ i: id, r: ref, k: opts.k, f: opts.f })
}
