import {
  AdapterListener,
  AdapterSnapshot,
  DeviceFoundEvent,
  DeviceFoundListener,
  ConnectionEvent,
  ConnectionEventListener,
  ValueEvent,
  ValueEventListener,
  MtuEvent,
  MtuEventListener
} from './types';

export class BluetoothEventHub {
  readonly discovery: ListenerSet<DeviceFoundEvent> = new ListenerSet();
  readonly connection: ListenerSet<ConnectionEvent> = new ListenerSet();
  readonly value: ListenerSet<ValueEvent> = new ListenerSet();
  readonly mtu: ListenerSet<MtuEvent> = new ListenerSet();
  private nextToken: number = 0;
  private adapterListeners: Map<number, AdapterListener> = new Map();
  private adapterStates: Map<number, AdapterSnapshot> = new Map();
  private adapterEpoch: number = 0;

  addAdapter(listener: AdapterListener): number {
    const token = ++this.nextToken;
    this.adapterListeners.set(token, listener);
    return token;
  }

  removeAdapter(listener: number | AdapterListener | null = null): void {
    if (typeof listener === 'number') {
      this.adapterListeners.delete(listener);
      this.adapterStates.delete(listener);
    } else if (listener === null) {
      this.adapterListeners.clear();
      this.adapterStates.clear();
    } else {
      this.adapterListeners.forEach((registered: AdapterListener, token: number): void => {
        if (registered === listener) {
          this.adapterListeners.delete(token);
          this.adapterStates.delete(token);
        }
      });
    }
  }

  adapterListenerCount(): number {
    return this.adapterListeners.size;
  }

  resetAdapterState(): void {
    // close 保留应用监听，但新生命周期不得复用上次交付记录。
    ++this.adapterEpoch;
    this.adapterStates.clear();
  }

  emitAdapter(state: AdapterSnapshot): void {
    const epoch = this.adapterEpoch;
    // 固定本轮 token；回调中新加的监听不参与本轮，已删除的监听不再调用。
    const tokens: number[] = [];
    this.adapterListeners.forEach((_listener: AdapterListener, token: number): void => {
      tokens.push(token);
    });
    tokens.forEach((token: number): void => {
      // 监听内 close 后终止旧分发，避免重新写入已清除的去重记录。
      if (epoch !== this.adapterEpoch) {
        return;
      }
      const listener = this.adapterListeners.get(token);
      if (listener !== undefined) {
        const previous = this.adapterStates.get(token);
        if (
          previous !== undefined &&
          previous.available === state.available &&
          previous.discovering === state.discovering
        ) {
          return;
        }
        // 按监听保存独立快照，先记录再回调，隔离入参修改、异常及同状态重入。
        this.adapterStates.set(token, {
          available: state.available,
          discovering: state.discovering
        });
        try {
          listener({ available: state.available, discovering: state.discovering });
        } catch (_) {
          // 单个监听异常不影响其他监听。
        }
      }
    });
  }
}

// 其他事件复用相同 token/函数身份语义；一个类别一个实例。
export class ListenerSet<T> {
  private nextToken: number = 0;
  private listeners: Map<number, (event: T) => void> = new Map();

  add(listener: (event: T) => void): number {
    const token = ++this.nextToken;
    this.listeners.set(token, listener);
    return token;
  }

  remove(listener: number | ((event: T) => void) | null = null): void {
    if (typeof listener === 'number') {
      this.listeners.delete(listener);
    } else if (listener === null) {
      this.listeners.clear();
    } else {
      this.listeners.forEach((registered: (event: T) => void, token: number): void => {
        if (registered === listener) {
          this.listeners.delete(token);
        }
      });
    }
  }

  emit(event: T, isCurrent: (() => boolean) | undefined = undefined): void {
    const tokens = Array.from(this.listeners.keys());
    tokens.forEach((token: number): void => {
      // 前一监听可同步关闭/重置扫描；每次投递前重新核验源事件的轮次。
      if (isCurrent !== undefined && !isCurrent()) {
        return;
      }
      const listener = this.listeners.get(token);
      if (listener !== undefined) {
        try {
          listener(event);
        } catch (_) {
          // 单个监听异常不影响其他监听。
        }
      }
    });
  }
}
