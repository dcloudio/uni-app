/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
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
import { Callback } from './@ohos.base';
import window from './@ohos.window';
/**
 * uiExtension.
 *
 * @namespace uiExtension
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
declare namespace uiExtension {
    /**
     * The proxy of the UIExtension window.
     *
     * @interface WindowProxy
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    interface WindowProxy {
        /**
         * Get the avoid area.
         *
         * @param { window.AvoidAreaType } type - Type of the avoid area.
         * @returns { window.AvoidArea } Area where the window cannot be displayed.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        getWindowAvoidArea(type: window.AvoidAreaType): window.AvoidArea;
        /**
         * Register the callback of avoidAreaChange.
         *
         * @param { 'avoidAreaChange' } type - The value is fixed at 'avoidAreaChange', indicating the event of changes to the avoid area.
         * @param { Callback<AvoidAreaInfo> } callback - Callback used to return the avoid area information.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        on(type: 'avoidAreaChange', callback: Callback<AvoidAreaInfo>): void;
        /**
         * Unregister the callback of avoidAreaChange.
         *
         * @param { 'avoidAreaChange' } type - The value is fixed at 'avoidAreaChange', indicating the event of changes to the avoid area.
         * @param { Callback<AvoidAreaInfo> } callback - Callback used to return the avoid area information.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        off(type: 'avoidAreaChange', callback?: Callback<AvoidAreaInfo>): void;
        /**
         * Register the callback of windowSizeChange.
         *
         * @param { 'windowSizeChange' } type - The value is fixed at 'windowSizeChange', indicating the window size change event.
         * @param { Callback<window.Size> } callback - Callback used to return the window size.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        on(type: 'windowSizeChange', callback: Callback<window.Size>): void;
        /**
         * Unregister the callback of windowSizeChange.
         *
         * @param { 'windowSizeChange' } type - The value is fixed at 'windowSizeChange', indicating the window size change event.
         * @param { Callback<window.Size> } callback - Callback used to return the window size.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        off(type: 'windowSizeChange', callback?: Callback<window.Size>): void;
        /**
         * Create sub window.
         *
         * @param { string } name - window name of sub window.
         * @param { window.SubWindowOptions } subWindowOptions - options of sub window creation.
         * @returns { Promise<window.Window> } Promise used to return the subwindow.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         * <br> 1. Mandatory parameters are left unspecified.
         * <br> 2. Incorrect parameters types.
         * <br> 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported. Failed to call the API due to limited device capabilities.
         * @throws { BusinessError } 1300002 - This window state is abnormal.
         * @throws { BusinessError } 1300005 - This window proxy is abnormal.
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @StageModelOnly
         * @atomicservice
         * @since 12
         */
        createSubWindowWithOptions(name: string, subWindowOptions: window.SubWindowOptions): Promise<window.Window>;
    }
    /**
     * Defines the avoid area information.
     *
     * @interface AvoidAreaInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    interface AvoidAreaInfo {
        /**
         * Describes the type of avoid area.
         *
         * @type { window.AvoidAreaType }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        type: window.AvoidAreaType;
        /**
         * Describes the position and size of avoid area.
         *
         * @type { window.AvoidArea }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @atomicservice
         * @since 12
         */
        area: window.AvoidArea;
    }
}
export default uiExtension;
