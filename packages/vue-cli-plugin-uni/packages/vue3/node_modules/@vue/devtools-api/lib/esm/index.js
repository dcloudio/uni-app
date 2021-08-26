import { getTarget, getDevtoolsGlobalHook } from './env';
import { HOOK_SETUP } from './const';
export * from './api';
export function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const hook = getDevtoolsGlobalHook();
    if (hook) {
        hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    }
    else {
        const target = getTarget();
        const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
        list.push({
            pluginDescriptor,
            setupFn
        });
    }
}
