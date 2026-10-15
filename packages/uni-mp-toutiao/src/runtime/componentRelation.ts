import type { ComponentPublicInstance } from 'vue'
import type { MPComponentInstance } from '@dcloudio/uni-mp-core'

export interface RelationDetail {
  vuePid?: string
  nodeId: number
  webviewId: string
  pageVm?: ComponentPublicInstance
}

export interface RelationEvent {
  detail: RelationDetail
}

type CreateComponent = (
  parent?: ComponentPublicInstance
) => ComponentPublicInstance

interface PendingComponent {
  createComponent: CreateComponent
  virtualHost: boolean
}

const pendingComponents = new WeakMap<MPComponentInstance, PendingComponent>()
const pendingRelations = new WeakMap<MPComponentInstance, RelationEvent[]>()

export function registerPendingComponent(
  mpInstance: MPComponentInstance,
  createComponent: CreateComponent,
  virtualHost: boolean
) {
  pendingComponents.set(mpInstance, { createComponent, virtualHost })
}

export function createPendingComponent(
  mpInstance: MPComponentInstance,
  parent?: ComponentPublicInstance
) {
  const pendingComponent = pendingComponents.get(mpInstance)
  if (!pendingComponent) {
    return mpInstance.$vm
  }
  pendingComponents.delete(mpInstance)
  return pendingComponent.createComponent(parent)
}

export function isPendingVirtualHost(mpInstance: MPComponentInstance) {
  return pendingComponents.get(mpInstance)?.virtualHost === true
}

export function queueRelation(
  mpInstance: MPComponentInstance,
  event: RelationEvent
) {
  const relations = pendingRelations.get(mpInstance)
  if (relations) {
    relations.push(event)
  } else {
    pendingRelations.set(mpInstance, [event])
  }
}

export function takePendingRelations(mpInstance: MPComponentInstance) {
  const relations = pendingRelations.get(mpInstance)
  pendingRelations.delete(mpInstance)
  return relations || []
}

export function removePendingComponent(mpInstance: MPComponentInstance) {
  pendingComponents.delete(mpInstance)
  pendingRelations.delete(mpInstance)
}
