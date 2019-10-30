export function parseRelations (relations, vueComponentOptions) {
  if (!relations) {
    return
  }
  vueComponentOptions.mpRelations = relations
}
