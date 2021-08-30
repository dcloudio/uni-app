import { ComponentPublicInstance } from 'vue';
import { Dispatch, Commit } from './index';

type Computed = () => any;
type InlineComputed<T extends Function> = T extends (...args: any[]) => infer R ? () => R : never
type MutationMethod = (...args: any[]) => void;
type ActionMethod = (...args: any[]) => Promise<any>;
type InlineMethod<T extends (fn: any, ...args: any[]) => any> = T extends (fn: any, ...args: infer Args) => infer R ? (...args: Args) => R : never
type CustomVue = ComponentPublicInstance & Record<string, any>;

interface Mapper<R> {
  <Key extends string>(map: Key[]): { [K in Key]: R };
  <Map extends Record<string, string>>(map: Map): { [K in keyof Map]: R };
}

interface MapperWithNamespace<R> {
  <Key extends string>(namespace: string, map: Key[]): { [K in Key]: R };
  <Map extends Record<string, string>>(namespace: string, map: Map): { [K in keyof Map]: R };
}

interface MapperForState {
  <S, Map extends Record<string, (this: CustomVue, state: S, getters: any) => any> = {}>(
    map: Map
  ): { [K in keyof Map]: InlineComputed<Map[K]> };
}

interface MapperForStateWithNamespace {
  <S, Map extends Record<string, (this: CustomVue, state: S, getters: any) => any> = {}>(
    namespace: string,
    map: Map
  ): { [K in keyof Map]: InlineComputed<Map[K]> };
}

interface MapperForAction {
  <Map extends Record<string, (this: CustomVue, dispatch: Dispatch, ...args: any[]) => any>>(
    map: Map
  ): { [K in keyof Map]: InlineMethod<Map[K]> };
}

interface MapperForActionWithNamespace {
  <Map extends Record<string, (this: CustomVue, dispatch: Dispatch, ...args: any[]) => any>>(
    namespace: string,
    map: Map
  ): { [K in keyof Map]: InlineMethod<Map[K]> };
}

interface MapperForMutation {
  <Map extends Record<string, (this: CustomVue, commit: Commit, ...args: any[]) => any>>(
    map: Map
  ): { [K in keyof Map]: InlineMethod<Map[K]> };
}

interface MapperForMutationWithNamespace {
  <Map extends Record<string, (this: CustomVue, commit: Commit, ...args: any[]) => any>>(
    namespace: string,
    map: Map
  ): { [K in keyof Map]: InlineMethod<Map[K]> };
}


interface NamespacedMappers {
  mapState: Mapper<Computed> & MapperForState;
  mapMutations: Mapper<MutationMethod> & MapperForMutation;
  mapGetters: Mapper<Computed>;
  mapActions: Mapper<ActionMethod> & MapperForAction;
}

export declare const mapState: Mapper<Computed>
  & MapperWithNamespace<Computed>
  & MapperForState
  & MapperForStateWithNamespace;

export declare const mapMutations: Mapper<MutationMethod>
  & MapperWithNamespace<MutationMethod>
  & MapperForMutation
  & MapperForMutationWithNamespace;

export declare const mapGetters: Mapper<Computed>
  & MapperWithNamespace<Computed>;

export declare const mapActions: Mapper<ActionMethod>
  & MapperWithNamespace<ActionMethod>
  & MapperForAction
  & MapperForActionWithNamespace;

export declare function createNamespacedHelpers(namespace: string): NamespacedMappers;
