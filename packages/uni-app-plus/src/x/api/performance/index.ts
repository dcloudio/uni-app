import { getCurrentPage } from '@dcloudio/uni-core'
import {
  API_NAVIGATE_BACK as NAVIGATE_BACK,
  API_NAVIGATE_TO as NAVIGATE_TO,
  API_REDIRECT_TO as REDIRECT_TO,
  API_SWITCH_TAB as SWITCH_TAB,
} from '@dcloudio/uni-api'
import type {
  GetPerformance,
  Performance,
  PerformanceEntry,
  PerformanceObserver,
  PerformanceObserverCallback,
  PerformanceObserverEntryList,
  PerformanceObserverOptions,
} from '@dcloudio/uni-app-x/types/uni'
import { onAfterRoute, onBeforeRoute, onPageReady } from '../route/performance'

// TODO
const APP_LAUNCH = 'appLaunch'

const PERFORMANCE_BUFFER_SIZE = 30

const ENTRY_TYPE_RENDER = 'render'
const ENTRY_TYPE_NAVIGATION = 'navigation'

// const RENDER_TYPE_FIRST_PAINT = "firstPaint"
const RENDER_TYPE_FIRST_LAYOUT = 'firstLayout'
const RENDER_TYPE_FIRST_RENDER = 'firstRender'

const AppStartDuration = 1
// const PageRenderDuration = 1
// const PageLayoutDuration = 2
// const PageRenderCount = 3
// const PageLayoutCount = 4
// const PageFirstRenderStartTime = 5
// const PageFirstLayoutStartTime = 6
const PageFirstPageRenderDuration = 7
const PageFirstPageLayoutDuration = 8

/// status machine
class PerformanceEntryStatus {
  static STATE_EMPTY: number = 0
  static STATE_BEFORE: number = 1
  static STATE_AFTER: number = 2
  static STATE_READY: number = 3

  private _state: number = PerformanceEntryStatus.STATE_EMPTY

  get state(): number {
    return this._state
  }
  set state(state: number) {
    this._state = state

    if (this._state == PerformanceEntryStatus.STATE_BEFORE) {
      this.executeBefore()
    } else if (this._state == PerformanceEntryStatus.STATE_AFTER) {
      this.executeAfter()
    } else if (this._state == PerformanceEntryStatus.STATE_READY) {
      this.executeReady()
    }
  }

  _entryData: PerformanceEntry
  get entryData(): PerformanceEntry {
    return this._entryData
  }

  constructor(entryType: string, name: string) {
    this._entryData = {
      entryType,
      name,
      duration: 0,
      startTime: 0,
    } as PerformanceEntry
  }

  executeBefore() {
    const page = getCurrentPage()
    if (page != null) {
      this._entryData.referrerPath = page.route!
    }
  }

  executeAfter() {
    const page = getCurrentPage()
    if (page != null) {
      // @ts-expect-error
      this._entryData.pageId = parseInt(page.$nativePage.pageId)
      this._entryData.path = page.route!
    }
  }

  executeReady() {}

  getCurrentInnerPage(): IPage | null {
    const currentPage = getCurrentPage()
    if (currentPage == null) {
      return null
    }
    // @ts-expect-error
    return currentPage.$nativePage
  }
}

/// layout status machine
class PerformanceEntryStatusLayout extends PerformanceEntryStatus {
  constructor() {
    super(ENTRY_TYPE_RENDER, RENDER_TYPE_FIRST_LAYOUT)
  }

  override executeAfter() {
    super.executeAfter()

    this._entryData.startTime = Date.now()
  }

  override executeReady() {
    super.executeReady()

    const innerPage = super.getCurrentInnerPage()
    if (innerPage != null) {
      // @ts-expect-error
      this._entryData.duration = nativePage.getDuration(
        innerPage.pageId,
        PageFirstPageLayoutDuration
      )
    }
  }
}

/// render status machine
class PerformanceEntryStatusRender extends PerformanceEntryStatus {
  constructor() {
    super(ENTRY_TYPE_RENDER, RENDER_TYPE_FIRST_RENDER)
  }

  override executeAfter() {
    super.executeAfter()

    this._entryData.startTime = Date.now()
  }

  override executeReady() {
    super.executeReady()

    const innerPage = super.getCurrentInnerPage()
    if (innerPage != null) {
      // @ts-expect-error
      this._entryData.duration = nativePage.getDuration(
        innerPage.pageId,
        PageFirstPageRenderDuration
      )
    }
  }
}

/// navigation status machine
class PerformanceEntryStatusNavigation extends PerformanceEntryStatus {
  constructor(name: string, navigationType: string) {
    super(ENTRY_TYPE_NAVIGATION, name)
    this._entryData.navigationType = navigationType
  }

  override executeBefore() {
    super.executeBefore()

    this._entryData.startTime = Date.now()
  }

  override executeReady() {
    const innerPage = super.getCurrentInnerPage()
    if (innerPage != null) {
      this._entryData.duration = Date.now() - this._entryData.startTime
      if (this._entryData.name == APP_LAUNCH) {
        // @ts-expect-error
        this._entryData.duration += nativePage.getDuration(AppStartDuration)
      }
    }
  }
}

class PerformanceEntryQueue<T> extends Array<T> {
  private _queueSize: number = PERFORMANCE_BUFFER_SIZE

  get queueSize(): number {
    return this._queueSize
  }
  set queueSize(value: number) {
    this._queueSize = value
    if (this.length > value) {
      this.dequeue(this.length - value)
    }
  }

  override push(...do_not_transform_spread: T[]): number {
    return this.enqueue(...do_not_transform_spread)
  }

  enqueue(...do_not_transform_spread: T[]): number {
    if (this.length > this._queueSize - 1) {
      this.shift()
    }
    return super.push(...do_not_transform_spread)
  }

  dequeue(count = 1) {
    this.splice(0, count)
  }
}

class PerformanceObserverEntryListImpl implements PerformanceObserverEntryList {
  private _queue = new PerformanceEntryQueue<PerformanceEntry>()

  push(...do_not_transform_spread: PerformanceEntry[]) {
    this._queue.push(...do_not_transform_spread)
  }

  getEntries(): PerformanceEntry[] {
    return this._queue
  }

  getEntriesByType(entryType: string): PerformanceEntry[] {
    return this._queue.filter(
      (entry: PerformanceEntry): boolean => entry.entryType == entryType
    )
  }

  getEntriesByName(name: string, entryType: string): PerformanceEntry[] {
    return this._queue.filter(
      (entry: PerformanceEntry): boolean =>
        entry.entryType == entryType && entry.name == name
    )
  }

  clear() {
    this._queue.length = 0
  }

  get bufferSize(): number {
    return this._queue.queueSize
  }
  set bufferSize(size: number) {
    this._queue.queueSize = size
  }
}

class PerformanceObserverImpl implements PerformanceObserver {
  private _owner: PerformanceImpl
  private _entryTypes: string[] = []
  private _callback: PerformanceObserverCallback | null = null
  private _entryList = new PerformanceObserverEntryListImpl()

  constructor(
    performance: PerformanceImpl,
    callback: PerformanceObserverCallback
  ) {
    this._owner = performance
    this._callback = callback
  }

  observe(options: PerformanceObserverOptions) {
    if (options?.entryTypes != null) {
      this._entryTypes.length = 0
      this._entryTypes.push(...options.entryTypes!)
    }

    if (this._entryTypes.length > 0) {
      this._owner.connect(this)
    } else {
      this.disconnect()
    }
  }

  disconnect() {
    this._entryList.clear()
    this._owner.disconnect(this)
  }

  dispatchCallback() {
    this._callback?.(this._entryList)
  }

  get entryTypes(): string[] {
    return this._entryTypes
  }

  get entryList(): PerformanceObserverEntryListImpl {
    return this._entryList
  }
}

class PerformanceProvider {
  private _entryStatus: PerformanceEntryStatus[] = []
  get entryStatus(): PerformanceEntryStatus[] {
    return this._entryStatus
  }

  onBefore(type: string) {
    // create navigation status machine
    if (
      type == APP_LAUNCH ||
      type == SWITCH_TAB ||
      type == NAVIGATE_TO ||
      type == REDIRECT_TO ||
      type == NAVIGATE_BACK
    ) {
      this._pushEntryStatus(
        ENTRY_TYPE_NAVIGATION,
        this._navigationToName(type),
        type
      )
    }

    // create render status machine
    if (type == APP_LAUNCH || type == NAVIGATE_TO || type == REDIRECT_TO) {
      this._pushEntryStatus(ENTRY_TYPE_RENDER, RENDER_TYPE_FIRST_LAYOUT, type)
      this._pushEntryStatus(ENTRY_TYPE_RENDER, RENDER_TYPE_FIRST_RENDER, type)
    }

    // start status machine
    this._forwardState()
  }

  onAfter(type: string) {
    this._forwardState()
  }

  onReady() {
    this._forwardState()
  }

  removeAllStatus() {
    this._entryStatus.length = 0
  }

  _pushEntryStatus(entryType: string, name: string, navigationType: string) {
    let entry: PerformanceEntryStatus | null = null
    if (entryType == ENTRY_TYPE_NAVIGATION) {
      entry = new PerformanceEntryStatusNavigation(name, navigationType)
    } else if (entryType == ENTRY_TYPE_RENDER) {
      if (name == RENDER_TYPE_FIRST_LAYOUT) {
        entry = new PerformanceEntryStatusLayout()
      } else if (name == RENDER_TYPE_FIRST_RENDER) {
        entry = new PerformanceEntryStatusRender()
      }
    }

    if (entry != null) {
      this._entryStatus.push(entry)
    }
  }

  _forwardState() {
    this._entryStatus.forEach((entry) => {
      entry.state += 1
    })
  }

  _navigationToName(type: string): string {
    if (type == APP_LAUNCH) {
      return APP_LAUNCH
    }
    return 'route'
  }
}

class PerformanceAllocate {
  private _allEntryList: PerformanceObserverEntryListImpl
  private _observerList: PerformanceObserverImpl[]

  constructor(
    allEntryList: PerformanceObserverEntryListImpl,
    observerList: PerformanceObserverImpl[]
  ) {
    this._allEntryList = allEntryList
    this._observerList = observerList
  }

  pushEntryStatus(status: PerformanceEntryStatus[]) {
    this.pushAllEntryData(status)
    this.pushObserverList(status)
  }

  pushAllEntryData(status: PerformanceEntryStatus[]) {
    status.forEach((entryStatus) => {
      this._allEntryList.push(entryStatus.entryData)
    })
  }

  pushObserverList(status: PerformanceEntryStatus[]) {
    this._observerList.forEach((observer) => {
      const entryList = observer.entryList
      entryList.clear()

      status.forEach((entryStatus) => {
        const entryData = entryStatus.entryData
        if (observer.entryTypes.includes(entryData.entryType)) {
          entryList.push(entryData)
        }
      })

      observer.dispatchCallback()
    })
  }
}

class PerformanceImpl implements Performance {
  private _allEntryList = new PerformanceObserverEntryListImpl()
  private _observerList: PerformanceObserverImpl[] = []
  private _allocate: PerformanceAllocate
  private _provider: PerformanceProvider = new PerformanceProvider()

  constructor() {
    this._allocate = new PerformanceAllocate(
      this._allEntryList,
      this._observerList
    )

    onBeforeRoute((type: string) => {
      this._provider.onBefore(type)
    })
    onAfterRoute((type: string) => {
      this._provider.onAfter(type)
      if (type == NAVIGATE_BACK) {
        this.dispatchObserver()
      }
    })
    onPageReady((page) => {
      this.dispatchObserver()
    })
  }

  dispatchObserver() {
    this._provider.onReady()
    this._allocate.pushEntryStatus(this._provider.entryStatus)
    this._provider.removeAllStatus()
  }

  createObserver(callback: PerformanceObserverCallback): PerformanceObserver {
    return new PerformanceObserverImpl(this, callback)
  }

  connect(observer: PerformanceObserverImpl) {
    const index = this._observerList.indexOf(observer)
    if (index < 0) {
      this._observerList.push(observer)
    }
  }

  disconnect(observer: PerformanceObserverImpl) {
    const index = this._observerList.indexOf(observer)
    if (index >= 0) {
      this._observerList.splice(index, 1)
    }
  }

  getEntries(): PerformanceEntry[] {
    return this._allEntryList.getEntries()
  }

  getEntriesByType(entryType: string): PerformanceEntry[] {
    return this._allEntryList.getEntriesByType(entryType)
  }

  getEntriesByName(name: string, entryType: string): PerformanceEntry[] {
    return this._allEntryList.getEntriesByName(name, entryType)
  }

  setBufferSize(size: number) {
    this._allEntryList.bufferSize = size
  }
}

export const getPerformance: GetPerformance = function (): Performance {
  return new PerformanceImpl()
}
