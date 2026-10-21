export interface ItemInstance {
  size: number
  updateItemOffset(offset: number): void
}

export interface ItemInfo {
  key: string
  index: number
  size: number
  offset: number
}

// 对应 app 的 RecycleListItemDataStore，由 list-view 和 sticky-section 共用。
export class RecycleListItemDataStore {
  list: ItemInfo[] = []
  keyItemMap = new Map<string, ItemInfo>()
  itemInstanceMap = new Map<string, ItemInstance>()
  defaultItemSize = 150

  realItemSize(item: ItemInfo): number {
    return item.size < 0 ? this.defaultItemSize : item.size
  }

  get contentSize(): number {
    const last = this.list[this.list.length - 1]
    return last ? last.offset + this.realItemSize(last) : 0
  }

  updateKeyList(keys: string[]): void {
    const oldItems = this.keyItemMap
    this.keyItemMap = new Map()
    this.list = keys.map((key, index) => {
      const instance = this.itemInstanceMap.get(key)
      const item = oldItems.get(key) || {
        key,
        index,
        size: instance ? instance.size : -1,
        offset: 0,
      }
      item.index = index
      this.keyItemMap.set(key, item)
      return item
    })
    this.rebuildItemOffsetsFrom(0)
  }

  rebuildItemOffsetsFrom(start: number): void {
    for (let i = start; i < this.list.length; i++) {
      const previous = this.list[i - 1]
      this.list[i].offset = previous
        ? previous.offset + this.realItemSize(previous)
        : 0
    }
  }

  updateItemOffset(baseOffset: number): void {
    this.itemInstanceMap.forEach((instance, key) => {
      const item = this.keyItemMap.get(key)
      if (item) instance.updateItemOffset(item.offset + baseOffset)
    })
  }

  getRenderRange(min: number, max: number): [number, number] {
    let low = 0
    let high = this.list.length
    while (low < high) {
      const mid = (low + high) >>> 1
      const item = this.list[mid]
      if (item.offset + this.realItemSize(item) < min) low = mid + 1
      else high = mid
    }
    const start = low
    high = this.list.length
    while (low < high) {
      const mid = (low + high) >>> 1
      if (this.list[mid].offset <= max) low = mid + 1
      else high = mid
    }
    return [start, low - start]
  }
}

export interface RecycleContainer {
  store: RecycleListItemDataStore
  updateItemSize(key: string, size: number): void
  getItemOffset(key: string): number
}

export interface ScrollContext {
  containerSize: number
  headerSize: number
  renderStartOffset: number
  renderEndOffset: number
}

export interface SectionState {
  element: HTMLElement | null
  headerElement: HTMLElement | null
  headerSize: number
  placeholderSize: number
  offsetTop: number
  resolveKeyById(id: string): string | undefined
  getItemOffset(key: string): number
  onScrollContextUpdate(context: ScrollContext): void
  applyDefaultItemSize(size: number): void
}

export interface RecycleList {
  sectionMap: Map<number, SectionState>
  queueLayout(): void
  syncDefaultItemSize(size: number): void
}
