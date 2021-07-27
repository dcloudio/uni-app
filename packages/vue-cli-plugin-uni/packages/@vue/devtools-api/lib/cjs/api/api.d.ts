import { ComponentBounds, Hookable } from './hooks';
import { Context } from './context';
import { ComponentInstance, ComponentState, StateBase } from './component';
import { App } from './app';
import { ID } from './util';
export interface DevtoolsPluginApi {
    on: Hookable<Context>;
    notifyComponentUpdate(instance?: ComponentInstance): any;
    addTimelineLayer(options: TimelineLayerOptions): any;
    addTimelineEvent(options: TimelineEventOptions): any;
    addInspector(options: CustomInspectorOptions): any;
    sendInspectorTree(inspectorId: string): any;
    sendInspectorState(inspectorId: string): any;
    selectInspectorNode(inspectorId: string, nodeId: string): any;
    getComponentBounds(instance: ComponentInstance): Promise<ComponentBounds>;
    getComponentName(instance: ComponentInstance): Promise<string>;
    getComponentInstances(app: App): Promise<ComponentInstance[]>;
    highlightElement(instance: ComponentInstance): any;
    unhighlightElement(): any;
}
export interface AppRecord {
    id: number;
    name: string;
    instanceMap: Map<string, ComponentInstance>;
    rootInstance: ComponentInstance;
}
export interface TimelineLayerOptions<TData = any, TMeta = any> {
    id: string;
    label: string;
    color: number;
    skipScreenshots?: boolean;
    groupsOnly?: boolean;
    ignoreNoDurationGroups?: boolean;
    screenshotOverlayRender?: (event: TimelineEvent<TData, TMeta> & ScreenshotOverlayEvent, ctx: ScreenshotOverlayRenderContext) => ScreenshotOverlayRenderResult | Promise<ScreenshotOverlayRenderResult>;
}
export interface ScreenshotOverlayEvent {
    layerId: string;
    renderMeta: any;
}
export interface ScreenshotOverlayRenderContext<TData = any, TMeta = any> {
    screenshot: ScreenshotData;
    events: (TimelineEvent<TData, TMeta> & ScreenshotOverlayEvent)[];
    index: number;
}
export declare type ScreenshotOverlayRenderResult = HTMLElement | string | false;
export interface ScreenshotData {
    time: number;
}
export interface TimelineEventOptions {
    layerId: string;
    event: TimelineEvent;
    all?: boolean;
}
export interface TimelineEvent<TData = any, TMeta = any> {
    time: number;
    data: TData;
    logType?: 'default' | 'warning' | 'error';
    meta?: TMeta;
    groupId?: ID;
    title?: string;
    subtitle?: string;
}
export interface CustomInspectorOptions {
    id: string;
    label: string;
    icon?: string;
    treeFilterPlaceholder?: string;
    stateFilterPlaceholder?: string;
    noSelectionText?: string;
    actions?: {
        icon: string;
        tooltip?: string;
        action: () => void | Promise<void>;
    }[];
}
export interface CustomInspectorNode {
    id: string;
    label: string;
    children?: CustomInspectorNode[];
    tags?: InspectorNodeTag[];
}
export interface InspectorNodeTag {
    label: string;
    textColor: number;
    backgroundColor: number;
    tooltip?: string;
}
export interface CustomInspectorState {
    [key: string]: (StateBase | Omit<ComponentState, 'type'>)[];
}
