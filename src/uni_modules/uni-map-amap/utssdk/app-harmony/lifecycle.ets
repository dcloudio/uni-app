import { FrameNode } from '@kit.ArkUI';
import { UniNativeAppImpl, UniPageImpl, UniNativeViewElement } from '@dcloudio/uni-app-x-vapor-runtime';

type VisibilityListener = (visible: boolean) => void;
const pages = new Map<number, PageVisibility>();

// Share one native page observer so maps on the same page do not replace it.
class PageVisibility {
  visible: boolean = false;
  private id: number;
  private disposed: boolean = false;
  private frame: FrameNode;
  private listeners: Set<VisibilityListener> = new Set();

  constructor(frame: FrameNode) {
    this.frame = frame;
    this.id = frame.getUniqueId();
    this.refresh();
    frame.commonEvent.setOnVisibleAreaApproximateChange({ ratios: [0, 1], expectedUpdateInterval: 16 },
      (_expanding: boolean, ratio: number): void => {
        if (this.disposed) return;
        const visible = ratio > 0;
        if (this.visible === visible) return;
        this.visible = visible;
        this.listeners.forEach(listener => listener(visible));
      });
  }
  refresh(): void {
    let visible = !this.frame.isDisposed() && this.frame.isAttached();
    let ancestor: FrameNode | null = visible ? this.frame : null;
    while (ancestor != null && visible) {
      visible = ancestor.isVisible();
      ancestor = ancestor.getParent();
    }
    if (this.visible === visible) return;
    this.visible = visible;
    this.listeners.forEach(listener => listener(visible));
  }
  add(listener: VisibilityListener): void { this.listeners.add(listener); listener(this.visible); }
  remove(listener: VisibilityListener): void {
    this.listeners.delete(listener);
    if (this.listeners.size === 0) {
      this.disposed = true;
      if (!this.frame.isDisposed()) this.frame.commonEvent.setOnVisibleAreaApproximateChange({ ratios: [0, 1] }, undefined);
      pages.delete(this.id);
    }
  }
}

export class NativeAmapLifecycle {
  private app: UniNativeAppImpl;
  private owner: UniPageImpl;
  private page?: PageVisibility;
  private pageVisible: boolean = false;
  private appVisible: boolean = true;
  private disposed: boolean = false;
  private apply: VisibilityListener;
  private onShow = (): void => { this.appVisible = true; this.attach(); this.page?.refresh(); this.update(); };
  private onHide = (): void => { this.appVisible = false; this.update(); };
  private onPage = (visible: boolean): void => { this.pageVisible = visible; this.update(); };

  constructor(element: UniNativeViewElement, apply: VisibilityListener) {
    this.apply = apply;
    this.owner = element.getPage() as UniPageImpl;
    this.app = this.owner.getNativePage().app;
    this.appVisible = this.app.window.isWindowShowing();
    this.attach();
    this.app.on('show', this.onShow);
    this.app.on('hide', this.onHide);
    this.update();
  }

  attach(): void {
    if (this.disposed || this.page != null) return;
    // The page container can be created after AmapMap. Retry from Builder
    // attachment/layout, observing the page rather than the map viewport.
    const page = this.owner.getNativePage();
    const uniqueId = page.page?.getUniqueId();
    if (uniqueId == null) return;
    const frame = this.app.window.getUIContext().getFrameNodeByUniqueId(uniqueId);
    if (frame == null) return;
    let observer = pages.get(frame.getUniqueId());
    if (observer == null) { observer = new PageVisibility(frame); pages.set(frame.getUniqueId(), observer); }
    this.page = observer;
    observer.add(this.onPage);
  }

  private update(): void { if (!this.disposed) this.apply(this.pageVisible && this.appVisible); }
  destroy(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.app.off('show', this.onShow);
    this.app.off('hide', this.onHide);
    this.page?.remove(this.onPage);
    this.page = undefined;
  }
}
