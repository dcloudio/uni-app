export function parseRelations (relations, vueComponentOptions) {
  if (!relations) {
    return
  }
  vueComponentOptions.mpOptions.relations = relations
}
