export function getScrollViewContext(selector: string): Promise<ScrollViewContext & UniElement> {
  return new Promise<ScrollViewContext & UniElement>((resolve) => {
    uni
      .createSelectorQuery()
      .select(selector)
      .node((result) => {
        resolve(result!.node as ScrollViewContext & UniElement)
      })
      .exec()
  })
}
