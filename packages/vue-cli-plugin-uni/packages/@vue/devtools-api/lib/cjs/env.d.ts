import { PluginDescriptor, SetupFunction } from '.';
interface GlobalTarget {
    __VUE_DEVTOOLS_PLUGINS__: Array<{
        pluginDescriptor: PluginDescriptor;
        setupFn: SetupFunction;
    }>;
}
export declare function getDevtoolsGlobalHook(): any;
export declare function getTarget(): GlobalTarget;
export {};
