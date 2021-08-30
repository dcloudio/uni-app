import { Payload, Plugin } from "./index";

interface Logger extends Partial<Pick<Console, 'groupCollapsed' | 'group' | 'groupEnd'>> {
  log(message: string, color: string, payload: any): void;
  log(message: string): void;
}

export interface LoggerOption<S> {
  collapsed?: boolean;
  filter?: <P extends Payload>(mutation: P, stateBefore: S, stateAfter: S) => boolean;
  transformer?: (state: S) => any;
  mutationTransformer?: <P extends Payload>(mutation: P) => any;
  actionFilter?: <P extends Payload>(action: P, state: S) => boolean;
  actionTransformer?: <P extends Payload>(action: P) => any;
  logMutations?: boolean;
  logActions?: boolean;
  logger?: Logger;
}

export function createLogger<S>(option?: LoggerOption<S>): Plugin<S>;
