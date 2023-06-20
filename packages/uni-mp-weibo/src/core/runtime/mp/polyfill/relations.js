function initRelationHandlers (type, handler, target, ctx) {
  if (!handler) {
    return
  }
  const name = `_$${type}Handlers`;
  (ctx[name] || (ctx[name] = [])).push(function () {
    handler.call(ctx, target)
  })
}

function initLinkedHandlers (relation, target, ctx) {
  const type = 'linked'
  const name = relation.name
  const relationNodes = ctx._$relationNodes || (ctx._$relationNodes = Object.create(null));
  (relationNodes[name] || (relationNodes[name] = [])).push(target)
  initRelationHandlers(type, relation[type], target, ctx)
}

function initUnlinkedHandlers (relation, target, ctx) {
  const type = 'unlinked'
  initRelationHandlers(type, relation[type], target, ctx)
}

function findParentRelation (parentVm, target, type) {
  const relations = parentVm &&
    parentVm.$options.mpOptions &&
    parentVm.$options.mpOptions.relations

  if (!relations) {
    return []
  }
  const name = Object.keys(relations).find(name => {
    const relation = relations[name]
    return relation.target === target && relation.type === type
  })
  if (!name) {
    return []
  }
  return [relations[name], parentVm]
}

function initParentRelation (vm, childRelation, match) {
  const [parentRelation, parentVm] = match(vm, vm.$options.mpOptions.path)
  if (!parentRelation) {
    return
  }

  initLinkedHandlers(parentRelation, vm, parentVm)
  initLinkedHandlers(childRelation, parentVm, vm)

  initUnlinkedHandlers(parentRelation, vm, parentVm)
  initUnlinkedHandlers(childRelation, parentVm, vm)
}

function initRelation (relation, vm) {
  const type = relation.type
  if (type === 'parent') {
    initParentRelation(vm, relation, function matchParent (vm, target) {
      return findParentRelation(vm.$parent, target, 'child')
    })
  } else if (type === 'ancestor') {
    initParentRelation(vm, relation, function matchAncestor (vm, target) {
      let $parent = vm.$parent
      while ($parent) {
        const ret = findParentRelation($parent, target, 'descendant')
        if (ret.length) {
          return ret
        }
        $parent = $parent.$parent
      }
      return []
    })
  }
}

export function initRelations (vm) {
  const {
    relations
  } = vm.$options.mpOptions || {}
  if (!relations) {
    return
  }
  Object.keys(relations).forEach(name => {
    initRelation(relations[name], vm)
  })
}

export function handleRelations (vm, type) {
  // TODO 需要移除 relationNodes
  const handlers = vm[`_$${type}Handlers`]
  if (!handlers) {
    return
  }
  handlers.forEach(handler => handler())
}
