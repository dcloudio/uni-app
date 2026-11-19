import { BluetoothRuntimeError } from './errors';
import { BluetoothClock, RuntimeConfiguration } from './types';

// 只管理准入、期限与提交槽；不匹配 GATT 路径或通知。
export class RequestContext {
  submitted: boolean = false;
  callerSettled: boolean = false;
  deadline: number = Number.POSITIVE_INFINITY;
  private clock: BluetoothClock;

  constructor(clock: BluetoothClock) {
    this.clock = clock;
  }

  canPublish(): boolean {
    return !this.callerSettled && this.clock.monotonicNowMs() < this.deadline;
  }
}

export class RequestBudget {
  count: number = 0;
  bytes: number = 0;
}

class QueueTask extends RequestContext {
  execute: (task: QueueTask) => void;
  reject: (error: Error) => void;
  bytes: number;
  wn: boolean;
  timer: number = -1;
  released: boolean = false;
  revision: number | undefined = undefined;

  constructor(
    clock: BluetoothClock,
    execute: (task: QueueTask) => void,
    reject: (error: Error) => void,
    bytes: number,
    wn: boolean,
    deadline: number
  ) {
    super(clock);
    this.execute = execute;
    this.reject = reject;
    this.bytes = bytes;
    this.wn = wn;
    this.deadline = deadline;
  }
}

export class DeviceRequestQueue {
  private pending: QueueTask[] = [];
  private active: QueueTask | undefined = undefined;
  private disposed: boolean = false;
  private paused: boolean = false;
  private scheduled: boolean = false;
  private wakeTimer: number = -1;
  private nextWnAt: number = 0;
  private count: number = 0;
  private bytes: number = 0;
  private configuration: RuntimeConfiguration;
  private budget: RequestBudget;
  private clock: BluetoothClock;

  constructor(
    clock: BluetoothClock,
    configuration: RuntimeConfiguration = new RuntimeConfiguration(),
    budget: RequestBudget = new RequestBudget()
  ) {
    this.configuration = configuration;
    this.budget = budget;
    this.clock = clock;
  }

  submit<T>(
    run: (context: RequestContext) => Promise<T>,
    timeoutMs: number = this.configuration.operationTimeoutMs,
    bytes: number = 0,
    wn: boolean = false,
    prepare: (() => void) | undefined = undefined,
    revision: number | undefined = undefined
  ): Promise<T> {
    if (this.disposed) {
      return Promise.reject(
        new BluetoothRuntimeError(1509003, 'BLE connection is closed', 'queue')
      );
    }
    if (this.paused) {
      return Promise.reject(
        new BluetoothRuntimeError(1509000, 'Previous system operation is unresolved', 'queuePaused')
      );
    }
    if (
      this.count >= this.configuration.sessionRequestLimit ||
      this.budget.count >= this.configuration.runtimeRequestLimit ||
      this.bytes + bytes > this.configuration.sessionPayloadLimit ||
      this.budget.bytes + bytes > this.configuration.runtimePayloadLimit
    ) {
      return Promise.reject(
        new BluetoothRuntimeError(1509000, 'BLE request budget exceeded', 'resourceLimit')
      );
    }
    const acceptedAt = this.clock.monotonicNowMs();
    // 在复制写输入前扣预算；prepare 同步执行，拒收时不复制。
    ++this.count;
    ++this.budget.count;
    this.bytes += bytes;
    this.budget.bytes += bytes;
    try {
      prepare?.();
    } catch (e) {
      --this.count;
      --this.budget.count;
      this.bytes -= bytes;
      this.budget.bytes -= bytes;
      return Promise.reject(e as Error);
    }
    return new Promise<T>((resolve, reject): void => {
      const task = new QueueTask(
        this.clock,
        (current: QueueTask): void => {
          try {
            run(current).then(
              (value: T): void => {
                this.checkCompletionDeadline(current);
                const deliver = !current.callerSettled;
                this.finish(current);
                if (deliver) {
                  current.callerSettled = true;
                  resolve(value);
                }
              },
              (error: Error): void => {
                this.checkCompletionDeadline(current);
                const deliver = !current.callerSettled;
                this.finish(current);
                if (deliver) {
                  current.callerSettled = true;
                  reject(error);
                }
              }
            );
          } catch (e) {
            this.checkCompletionDeadline(current);
            const deliver = !current.callerSettled;
            this.finish(current);
            if (deliver) {
              current.callerSettled = true;
              reject(e as Error);
            }
          }
        },
        reject,
        bytes,
        wn,
        acceptedAt + timeoutMs
      );
      task.revision = revision;
      this.armTimeout(task, task.deadline - this.clock.monotonicNowMs());
      this.pending.push(task);
      this.schedule();
    });
  }

  invalidateRevision(revision: number): void {
    const pending = this.pending.slice();
    pending.forEach((task: QueueTask): void => {
      if (task.revision !== revision) {
        return;
      }
      const index = this.pending.indexOf(task);
      if (index >= 0) {
        this.pending.splice(index, 1);
      }
      this.release(task);
      this.failCaller(
        task,
        new BluetoothRuntimeError(
          1509000,
          'GATT catalog invalidated before submission',
          'catalogInvalidated'
        ) as Error
      );
    });
    if (this.active?.revision === revision) {
      this.failCaller(
        this.active,
        new BluetoothRuntimeError(
          1509000,
          'GATT catalog invalidated; outcomeUnknown',
          'submittedOutcomeUnknown'
        ) as Error
      );
    }
  }

  dispose(): void {
    if (this.disposed) {
      return;
    }
    this.disposed = true;
    if (this.wakeTimer !== -1) {
      clearTimeout(this.wakeTimer);
    }
    this.wakeTimer = -1;
    const error: Error = new BluetoothRuntimeError(
      1509003,
      'BLE connection is closed',
      'connection'
    ) as Error;
    this.rejectPending(error);
    if (this.active !== undefined) {
      this.failCaller(this.active, error);
      this.release(this.active);
      this.active = undefined;
    }
  }

  private failCaller(task: QueueTask, error: Error): void {
    if (task.callerSettled) {
      return;
    }
    task.callerSettled = true;
    task.reject(error);
  }

  private rejectPending(error: Error): void {
    const tasks = this.pending.splice(0);
    tasks.forEach((task: QueueTask): void => {
      this.release(task);
      this.failCaller(task, error);
    });
  }

  private armTimeout(task: QueueTask, remainingMs: number): void {
    task.timer = setTimeout(
      (): void => this.onTimeout(task),
      Math.max(0, Math.ceil(remainingMs))
    );
  }

  private onTimeout(task: QueueTask): void {
    if (task.released) {
      return;
    }
    task.timer = -1;
    const remainingMs = task.deadline - this.clock.monotonicNowMs();
    // 定时器只负责唤醒；提前回调时按同一单调期限重新安排。
    if (remainingMs > 0) {
      this.armTimeout(task, remainingMs);
      return;
    }
    this.expire(task);
  }

  private expire(task: QueueTask): void {
    if (task.released) {
      return;
    }
    clearTimeout(task.timer);
    task.timer = -1;
    const error: Error = new BluetoothRuntimeError(
      1509005,
      task.submitted
        ? 'System operation timed out; outcomeUnknown'
        : 'Request expired before submission',
      task.submitted ? 'submittedOutcomeUnknown' : 'queued'
    ) as Error;
    this.failCaller(task, error);
    if (this.active === task) {
      // 本地 timer 不代表系统完成：保留槽和预算，停收并终结未提交项。
      this.paused = true;
      this.rejectPending(
        new BluetoothRuntimeError(
          1509000,
          'Previous system operation is unresolved',
          'queuePaused'
        ) as Error
      );
    } else {
      const index = this.pending.indexOf(task);
      if (index >= 0) {
        this.pending.splice(index, 1);
      }
      this.release(task);
    }
    this.schedule();
  }

  private checkCompletionDeadline(task: QueueTask): void {
    // 慢同步监听可推迟 timer；不能因此把超过总期限的 Promise 结果当作准时完成。
    if (!task.callerSettled && this.clock.monotonicNowMs() >= task.deadline) {
      this.failCaller(
        task,
        new BluetoothRuntimeError(
          1509005,
          'System result arrived after deadline; outcomeUnknown',
          'submittedOutcomeUnknown'
        ) as Error
      );
    }
  }

  private release(task: QueueTask): void {
    if (task.released) {
      return;
    }
    task.released = true;
    clearTimeout(task.timer);
    --this.count;
    --this.budget.count;
    this.bytes -= task.bytes;
    this.budget.bytes -= task.bytes;
  }

  private finish(task: QueueTask): void {
    this.release(task);
    if (this.active === task) {
      this.active = undefined;
      this.paused = false;
    }
    this.schedule();
  }

  private schedule(): void {
    if (this.scheduled || this.disposed) {
      return;
    }
    this.scheduled = true;
    // 异步推进并合并重入唤醒；业务层回调/异步处理不持有系统提交槽。
    Promise.resolve().then((): void => {
      Promise.resolve().then((): void => {
        this.scheduled = false;
        this.drain();
      });
    });
  }

  private drain(): void {
    if (this.active !== undefined || this.disposed || this.paused || this.pending.length === 0) {
      return;
    }
    const task = this.pending[0];
    const now = this.clock.monotonicNowMs();
    if (now >= task.deadline) {
      this.expire(task);
      return;
    }
    const delay = task.wn ? this.nextWnAt - now : 0;
    if (delay > 0) {
      if (this.wakeTimer !== -1) {
        clearTimeout(this.wakeTimer);
      }
      this.wakeTimer = setTimeout((): void => {
        this.wakeTimer = -1;
        this.schedule();
      }, delay);
      return;
    }
    this.pending.shift();
    this.active = task;
    task.submitted = true;
    if (task.wn) {
      this.nextWnAt = this.clock.monotonicNowMs() + this.configuration.wnSubmitIntervalMs;
    }
    task.execute(task);
  }
}
