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
/**
 * Obtains configuration information about a overlay hap module.
 *
 * @typedef OverlayModuleInfo
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @since 10
 */
export interface OverlayModuleInfo {
    /**
     * Indicates the name of the bundle
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 10
     */
    readonly bundleName: string;
    /**
     * Indicates the name of the .hap package to which the capability belongs
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 10
     */
    readonly moduleName: string;
    /**
     * Indicates the name of target module which is overlaid by the overlay module
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 10
     */
    readonly targetModuleName: string;
    /**
     * Indicates the priority of the overlay module
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 10
     */
    readonly priority: number;
    /**
     * Indicates the state of the overlay module
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 10
     */
    readonly state: number;
}
