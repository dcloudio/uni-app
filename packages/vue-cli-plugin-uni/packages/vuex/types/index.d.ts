import { App, WatchOptions, InjectionKey } from "vue";

// augment typings of Vue.js
import "./vue";

import { mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers } from "./helpers";
import { createLogger } from "./logger";

export * from "./helpers";
export * from "./logger";

export declare class Store<S> {
  constructor(options: StoreOptions<S>);

  readonly state: S;
  readonly getters: any;

  install(app: App, injectKey?: InjectionKey<Store<any>> | string): void;

  replaceState(state: S): void;

  dispatch: Dispatch;
  commit: Commit;

  subscribe<P extends MutationPayload>(fn: (mutation: P, state: S) => any, options?: SubscribeOptions): () => void;
  subscribeAction<P extends ActionPayload>(fn: SubscribeActionOptions<P, S>, options?: SubscribeOptions): () => void;
  watch<T>(getter: (state: S, getters: any) => T, cb: (value: T, oldValue: T) => void, options?: WatchOptions): () => void;

  registerModule<T>(path: string, module: Module<T, S>, options?: ModuleOptions): void;
  registerModule<T>(path: string[], module: Module<T, S>, options?: ModuleOptions): void;

  unregisterModule(path: string): void;
  unregisterModule(path: string[]): void;

  hasModule(path: string): boolean;
  hasModule(path: string[]): boolean;

  hotUpdate(options: {
    actions?: ActionTree<S, S>;
    mutations?: MutationTree<S>;
    getters?: GetterTree<S, S>;
    modules?: ModuleTree<S>;
  }): void;
}

export const storeKey: string;

export function createStore<S>(options: StoreOptions<S>): Store<S>;

export function useStore<S = any>(injectKey?: InjectionKey<Store<S>> | string): Store<S>;

export interface Dispatch {
  (type: string, payload?: any, options?: DispatchOptions): Promise<any>;
  <P extends Payload>(payloadWithType: P, options?: DispatchOptions): Promise<any>;
}

export interface Commit {
  (type: string, payload?: any, options?: CommitOptions): void;
  <P extends Payload>(payloadWithType: P, options?: CommitOptions): void;
}

export interface ActionContext<S, R> {
  dispatch: Dispatch;
  commit: Commit;
  state: S;
  getters: any;
  rootState: R;
  rootGetters: any;
}

export interface Payload {
  type: string;
}

export interface MutationPayload extends Payload {
  payload: any;
}

export interface ActionPayload extends Payload {
  payload: any;
}

export interface SubscribeOptions {
  prepend?: boolean
}

export type ActionSubscriber<P, S> = (action: P, state: S) => any;
export type ActionErrorSubscriber<P, S> = (action: P, state: S, error: Error) => any;

export interface ActionSubscribersObject<P, S> {
  before?: ActionSubscriber<P, S>;
  after?: ActionSubscriber<P, S>;
  error?: ActionErrorSubscriber<P, S>;
}

export type SubscribeActionOptions<P, S> = ActionSubscriber<P, S> | ActionSubscribersObject<P, S>;

export interface DispatchOptions {
  root?: boolean;
}

export interface CommitOptions {
  silent?: boolean;
  root?: boolean;
}

export interface StoreOptions<S> {
  state?: S | (() => S);
  getters?: GetterTree<S, S>;
  actions?: ActionTree<S, S>;
  mutations?: MutationTree<S>;
  modules?: ModuleTree<S>;
  plugins?: Plugin<S>[];
  strict?: boolean;
  devtools?: boolean;
}

export type ActionHandler<S, R> = (this: Store<R>, injectee: ActionContext<S, R>, payload?: any) => any;
export interface ActionObject<S, R> {
  root?: boolean;
  handler: ActionHandler<S, R>;
}

export type Getter<S, R> = (state: S, getters: any, rootState: R, rootGetters: any) => any;
export type Action<S, R> = ActionHandler<S, R> | ActionObject<S, R>;
export type Mutation<S> = (state: S, payload?: any) => any;
export type Plugin<S> = (store: Store<S>) => any;

export interface Module<S, R> {
  namespaced?: boolean;
  state?: S | (() => S);
  getters?: GetterTree<S, R>;
  actions?: ActionTree<S, R>;
  mutations?: MutationTree<S>;
  modules?: ModuleTree<R>;
}

export interface ModuleOptions {
  preserveState?: boolean;
}

export interface GetterTree<S, R> {
  [key: string]: Getter<S, R>;
}

export interface ActionTree<S, R> {
  [key: string]: Action<S, R>;
}

export interface MutationTree<S> {
  [key: string]: Mutation<S>;
}

export interface ModuleTree<R> {
  [key: string]: Module<any, R>;
}

declare const _default: {
  Store: typeof Store;
  mapState: typeof mapState,
  mapMutations: typeof mapMutations,
  mapGetters: typeof mapGetters,
  mapActions: typeof mapActions,
  createNamespacedHelpers: typeof createNamespacedHelpers,
  createLogger: typeof createLogger
};
export default _default;
