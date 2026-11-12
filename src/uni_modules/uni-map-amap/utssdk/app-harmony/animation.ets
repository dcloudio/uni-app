// One cancellable clock per marker; public duration is always milliseconds.
export class MarkerAnimation {
  private timer: number = -1;
  private started: number = 0;
  private elapsed: number = 0;
  private active: boolean = false;
  private stopped: boolean = false;
  private duration: number;
  private step: (progress: number) => void;
  private done: (completed: boolean) => void;
  constructor(duration: number, step: (progress: number) => void, done: (completed: boolean) => void) {
    this.duration = Math.max(0, duration);
    this.step = step;
    this.done = done;
  }
  start(visible: boolean): void {
    if (this.duration === 0) {
      this.step(1);
      this.finish(true);
    } else {
      this.step(0);
      this.setVisible(visible);
    }
  }
  setVisible(visible: boolean): void {
    if (this.stopped || this.active === visible) return;
    this.active = visible;
    if (visible) {
      this.started = Date.now();
      this.tick();
    } else {
      this.elapsed += Date.now() - this.started;
      if (this.timer >= 0) clearTimeout(this.timer);
      this.timer = -1;
    }
  }
  cancel(): void { this.finish(false); }
  private tick(): void {
    if (this.stopped || !this.active) return;
    const progress = Math.min(1, (this.elapsed + Date.now() - this.started) / this.duration);
    try { this.step(progress); } catch (_) { this.finish(false); return; }
    if (progress >= 1) this.finish(true);
    else this.timer = setTimeout(() => { this.tick(); }, 16);
  }
  private finish(completed: boolean): void {
    if (this.stopped) return;
    this.stopped = true;
    this.active = false;
    if (this.timer >= 0) clearTimeout(this.timer);
    this.timer = -1;
    this.done(completed);
  }
}
