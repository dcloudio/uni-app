import { DevtoolsPluginApi, App } from './api';
export * from './api';
export interface PluginDescriptor {
    id: string;
    label: string;
    app: App;
    packageName?: string;
    homepage?: string;
    componentStateTypes?: string[];
    logo?: string;
    disableAppScope?: boolean;
}
export declare type SetupFunction = (api: DevtoolsPluginApi) => void;
export declare function setupDevtoolsPlugin(pluginDescriptor: PluginDescriptor, setupFn: SetupFunction): void;
