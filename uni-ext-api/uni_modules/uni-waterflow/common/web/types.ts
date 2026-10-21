export interface FlowItemInstance {
  size: number
  updateItemOffset(x: number, y: number): void
  updateItemCrossAxisSize(width: number): void
}

export interface RecycleWaterflow {
  itemInstanceMap: Map<string, FlowItemInstance>
  updateItemSize(key: string, size: number): void
  getItemOffset(key: string): [number, number]
  getItemCrossAxisSize(): number
}
