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
 * @kit AbilityKit
 */
import { AsyncCallback } from './@ohos.base';
import * as _OverlayModuleInfo from './bundleManager/OverlayModuleInfo';
/**
 * Used for application interception overlay
 *
 * @namespace overlay
 * @syscap SystemCapability.BundleManager.BundleFramework.Overlay
 * @since 10
 */
declare namespace overlay {
    /**
     * Set enabled state of overlay module based on specified moduleName.
     *
     * @param { string } moduleName - Indicates the module name of the overlay module to be set.
     * @param { boolean } isEnabled - The value true means to enable overlay feature, and the value false means to disable overlay feature.
     * @param { AsyncCallback<void> } callback - The callback of setting specified overlay module enabled state result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 17700002 - The specified module name is not found.
     * @throws { BusinessError } 17700033 - The specified module is not an overlay module.
     * @syscap SystemCapability.BundleManager.BundleFramework.Overlay
     * @since 10
     */
    function setOverlayEnabled(moduleName: string, isEnabled: boolean, callback: AsyncCallback<void>): void;
    /**
     * Set enabled state of overlay module based on specified moduleName.
     *
     * @param { string } moduleName - Indicates the module name of the overlay module to be set.
     * @param { boolean } isEnabled - The value true means to enable overlay feature, and the value false means to disable overlay feature.
     * @returns { Promise<void> }
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 17700002 - The specified module name is not found.
     * @throws { BusinessError } 17700033 - The specified module is not an overlay module.
     * @syscap SystemCapability.BundleManager.BundleFramework.Overlay
     * @since 10
     */
    function setOverlayEnabled(moduleName: string, isEnabled: boolean): Promise<void>;
    /**
     * Obtain the OverlayModuleInfo of current application based on moduleName.
     *
     * @param { string } moduleName - Indicates the module name of the overlay module to be queried.
     * @param { AsyncCallback<OverlayModuleInfo> } callback - The callback of getting OverlayModuleInfo object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 17700002 - The specified module name is not found.
     * @throws { BusinessError } 17700032 - The specified bundle does not contain any overlay module.
     * @throws { BusinessError } 17700033 - The specified module is not an overlay module.
     * @syscap SystemCapability.BundleManager.BundleFramework.Overlay
     * @since 10
     */
    function getOverlayModuleInfo(moduleName: string, callback: AsyncCallback<OverlayModuleInfo>): void;
    /**
     * Obtain the OverlayModuleInfo of current application based on moduleName.
     *
     * @param { string } moduleName - Indicates the module name of the overlay module to be queried.
     * @returns { Promise<OverlayModuleInfo> }
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 17700002 - The specified module name is not found.
     * @throws { BusinessError } 17700032 - The specified bundle does not contain any overlay module.
     * @throws { BusinessError } 17700033 - The specified module is not an overlay module.
     * @syscap SystemCapability.BundleManager.BundleFramework.Overlay
     * @since 10
     */
    function getOverlayModuleInfo(moduleName: string): Promise<OverlayModuleInfo>;
    /**
     * Obtain the OverlayModuleInfo of current application based on moduleName.
     *
     * @param { string } targetModuleName - Indicates the target module name of the target module to be queried.
     * @param { AsyncCallback<Array<OverlayModuleInfo>> } callback - The callback of getting a list of OverlayModuleInfo object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 17700002 - The specified module name is not found.
     * @throws { BusinessError } 17700034 - The specified module is an overlay module.
     * @syscap SystemCapability.BundleManager.BundleFramework.Overlay
     * @since 10
     */
    function getTargetOverlayModuleInfos(targetModuleName: string, callback: AsyncCallback<Array<OverlayModuleInfo>>): void;
    /**
     * Obtain the OverlayModuleInfo of current application based on moduleName.
     *
     * @param { string } targetModuleName - Indicates the target module name of the target module to be queried.
     * @returns { Promise<Array<OverlayModuleInfo>> }
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 17700002 - The specified module name is not found.
     * @throws { BusinessError } 17700034 - The specified module is an overlay module.
     * @syscap SystemCapability.BundleManager.BundleFramework.Overlay
     * @since 10
     */
    function getTargetOverlayModuleInfos(targetModuleName: string): Promise<Array<OverlayModuleInfo>>;
    /**
     * Obtains configuration information about a overlay hap module.
     *
     * @typedef { _OverlayModuleInfo.OverlayModuleInfo }
     * @syscap SystemCapability.BundleManager.BundleFramework.Overlay
     * @since 10
     */
    export type OverlayModuleInfo = _OverlayModuleInfo.OverlayModuleInfo;
}
export default overlay;
