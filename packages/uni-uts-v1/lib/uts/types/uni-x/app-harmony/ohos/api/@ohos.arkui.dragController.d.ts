/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file
 * @kit ArkUI
 */
import type { AsyncCallback, Callback } from './@ohos.base';
import type unifiedDataChannel from './@ohos.data.unifiedDataChannel';
/**
 * This module allows developers to trigger a drag event.
 * @namespace dragController
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * This module allows developers to trigger a drag event.
 * @namespace dragController
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
declare namespace dragController {
    /**
     * Defines the Drag Status.
     *
     * @enum { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * Defines the Drag Status.
     *
     * @enum { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    const enum DragStatus {
        /**
         * Drag has started.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Drag has started.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        STARTED = 0,
        /**
         * Drag has ended.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Drag has ended.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        ENDED = 1
    }
    /**
     * Drag and drop information
     *
     * @interface DragAndDropInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * Drag and drop information
     *
     * @interface DragAndDropInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    interface DragAndDropInfo {
        /**
         * The drag status.
         * @type { DragStatus }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * The drag status.
         * @type { DragStatus }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        status: DragStatus;
        /**
         * The information containing the drag event.
         * @type { DragEvent }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * The information containing the drag event.
         * @type { DragEvent }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        event: DragEvent;
        /**
         * Additional information about the drag info.
         * @type { ?string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Additional information about the drag info.
         * @type { ?string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        extraParams?: string;
    }
    /**
     * One drag action object for drag process
     *
     * @interface DragAction
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * One drag action object for drag process
     *
     * @interface DragAction
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    interface DragAction {
        /**
         * trigger drag action
         *
         * @returns { Promise<void> } A Promise can indicate the start result.
         * @throws { BusinessError } 100001 - Internal handling failed.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * trigger drag action
         *
         * @returns { Promise<void> } A Promise can indicate the start result.
         * @throws { BusinessError } 100001 - Internal handling failed.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        startDrag(): Promise<void>;
        /**
         * Registers a callback for listening on drag status changes.
         * This callback is triggered when the drag status change.
         *
         * @param { 'statusChange' } type for status changing
         * @param { Callback<DragAndDropInfo> } callback with drag event and status information
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Registers a callback for listening on drag status changes.
         * This callback is triggered when the drag status change.
         *
         * @param { 'statusChange' } type for status changing
         * @param { Callback<DragAndDropInfo> } callback with drag event and status information
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        on(type: 'statusChange', callback: Callback<DragAndDropInfo>): void;
        /**
         * Deregisters a callback for listening on drag status changes.
         * This callback is not triggered when the drag status change.
         *
         * @param { 'statusChange' } type for status changing
         * @param { Callback<DragAndDropInfo> } callback with drag event and status information
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Deregisters a callback for listening on drag status changes.
         * This callback is not triggered when the drag status change.
         *
         * @param { 'statusChange' } type for status changing
         * @param { Callback<DragAndDropInfo> } callback with drag event and status information
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        off(type: 'statusChange', callback?: Callback<DragAndDropInfo>): void;
    }
    /**
     * DragInfo object description
     *
     * @interface DragInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * DragInfo object description
     *
     * @interface DragInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    interface DragInfo {
        /**
         * A unique identifier to identify which touch point.
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 10
         */
        /**
         * A unique identifier to identify which touch point.
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        pointerId: number;
        /**
        * Drag data.
        * @type { ?unifiedDataChannel.UnifiedData }
        * @syscap SystemCapability.ArkUI.ArkUI.Full
        * @since 10
        */
        /**
        * Drag data.
        * @type { ?unifiedDataChannel.UnifiedData }
        * @syscap SystemCapability.ArkUI.ArkUI.Full
        * @atomicservice
        * @since 12
        */
        data?: unifiedDataChannel.UnifiedData;
        /**
        * Additional information about the drag info.
        * @type { ?string }
        * @syscap SystemCapability.ArkUI.ArkUI.Full
        * @since 10
        */
        /**
        * Additional information about the drag info.
        * @type { ?string }
        * @syscap SystemCapability.ArkUI.ArkUI.Full
        * @atomicservice
        * @since 12
        */
        extraParams?: string;
        /**
         * Touch point coordinates.
         * @type { ?TouchPoint }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Touch point coordinates.
         * @type { ?TouchPoint }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        touchPoint?: TouchPoint;
        /**
         * Drag preview options.
         * @type { ?DragPreviewOptions }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Drag preview options.
         * @type { ?DragPreviewOptions }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        previewOptions?: DragPreviewOptions;
    }
    /**
     * Defines the animation options for drag preview.
     *
     * @interface AnimationOptions
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * Defines the animation options for drag preview.
     *
     * @interface AnimationOptions
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    interface AnimationOptions {
        /**
         * Animation duration, in ms.
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * Animation duration, in ms.
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        duration?: number;
        /**
        * Animation curve.
        * @type { ?(Curve | ICurve) }
        * @syscap SystemCapability.ArkUI.ArkUI.Full
        * @since 11
        */
        /**
         * Animation curve.
         * @type { ?(Curve | ICurve) }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        curve?: Curve | ICurve;
    }
    /**
     * Provides the functions of setting color or updating animation.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * Provides the functions of setting color or updating animation.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    export class DragPreview {
        /**
         * change foreground color of preview
         * @param { ResourceColor } color - color value
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * change foreground color of preview
         * @param { ResourceColor } color - color value
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        setForegroundColor(color: ResourceColor): void;
        /**
         * update preview style with animation
         * @param { AnimationOptions } options - animation options
         * @param { function } handler - change style functions
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 11
         */
        /**
         * update preview style with animation
         * @param { AnimationOptions } options - animation options
         * @param { function } handler - change style functions
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        animate(options: AnimationOptions, handler: () => void): void;
    }
    /**
     * Define the drag event paramters
     *
     * @interface DragEventParam
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    interface DragEventParam {
        /**
         * The information containing the drag event.
         * @type { DragEvent }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 10
         */
        /**
         * The information containing the drag event.
         * @type { DragEvent }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        event: DragEvent;
        /**
         * Additional information about the drag info.
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 10
         */
        /**
         * Additional information about the drag info.
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        extraParams: string;
    }
    /**
     * Execute a drag event.
     * @param { CustomBuilder | DragItemInfo } custom - Object used for prompts displayed when the object is dragged.
     * @param { DragInfo } dragInfo - Information about the drag event.
     * @param { AsyncCallback<{ event: DragEvent, extraParams: string }> } callback - Callback that contains the drag event information.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal handling failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Execute a drag event.
     * @param { CustomBuilder | DragItemInfo } custom - Object used for prompts displayed when the object is dragged.
     * @param { DragInfo } dragInfo - Information about the drag event.
     * @param { AsyncCallback<DragEventParam> } callback - Callback that contains the drag event information.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal handling failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    function executeDrag(custom: CustomBuilder | DragItemInfo, dragInfo: DragInfo, callback: AsyncCallback<DragEventParam>): void;
    /**
     * Execute a drag event.
     * @param { CustomBuilder | DragItemInfo } custom - Object used for prompts displayed when the object is dragged.
     * @param { DragInfo } dragInfo - Information about the drag event.
     * @returns { Promise<{ event: DragEvent, extraParams: string }> } A Promise with the drag event information.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal handling failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Execute a drag event.
     * @param { CustomBuilder | DragItemInfo } custom - Object used for prompts displayed when the object is dragged.
     * @param { DragInfo } dragInfo - Information about the drag event.
     * @returns { Promise<DragEventParam> } A Promise with the drag event information.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal handling failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    function executeDrag(custom: CustomBuilder | DragItemInfo, dragInfo: DragInfo): Promise<DragEventParam>;
    /**
     * Create one drag action object, which can be used for starting drag later or monitoring
     * the drag status after drag started.
     * @param { Array<CustomBuilder | DragItemInfo> } customArray - Objects used for prompts
     * displayed when the objects are dragged.
     * @param { DragInfo } dragInfo - Information about the drag event.
     * @returns { DragAction } one drag action object
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal handling failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * Create one drag action object, which can be used for starting drag later or monitoring
     * the drag status after drag started.
     * @param { Array<CustomBuilder | DragItemInfo> } customArray - Objects used for prompts
     * displayed when the objects are dragged.
     * @param { DragInfo } dragInfo - Information about the drag event.
     * @returns { DragAction } one drag action object
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Internal handling failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    function createDragAction(customArray: Array<CustomBuilder | DragItemInfo>, dragInfo: DragInfo): DragAction;
    /**
     * Get drag preview object.
     * @returns { DragPreview } An drag preview object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * Get drag preview object.
     * @returns { DragPreview } An drag preview object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    function getDragPreview(): DragPreview;
}
export default dragController;
