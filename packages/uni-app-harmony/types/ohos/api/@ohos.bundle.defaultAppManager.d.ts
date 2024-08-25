/*
 * Copyright (c) 2022-2024 Huawei Device Co., Ltd.
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
/**
 * Default application manager.
 *
 * @namespace defaultAppManager
 * @syscap SystemCapability.BundleManager.BundleFramework.DefaultApp
 * @since 9
 */
declare namespace defaultAppManager {
    /**
     * The constant for application type.
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.DefaultApp
     * @since 9
     */
    export enum ApplicationType {
        /**
         * Default browser identifier.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.DefaultApp
         * @since 9
         */
        BROWSER = 'Web Browser',
        /**
         * Default image identifier.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.DefaultApp
         * @since 9
         */
        IMAGE = 'Image Gallery',
        /**
         * Default audio identifier.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.DefaultApp
         * @since 9
         */
        AUDIO = 'Audio Player',
        /**
         * Default video identifier.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.DefaultApp
         * @since 9
         */
        VIDEO = 'Video Player',
        /**
         * Default PDF identifier.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.DefaultApp
         * @since 9
         */
        PDF = 'PDF Viewer',
        /**
         * Default word identifier.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.DefaultApp
         * @since 9
         */
        WORD = 'Word Viewer',
        /**
         * Default excel identifier.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.DefaultApp
         * @since 9
         */
        EXCEL = 'Excel Viewer',
        /**
         * Default PPT identifier.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.DefaultApp
         * @since 9
         */
        PPT = 'PPT Viewer',
        /**
         * Default email identifier.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.DefaultApp
         * @since 12
         */
        EMAIL = 'Email'
    }
    /**
     * Query whether the caller is default application based on type.
     *
     * @param { string } type - Application type or a file type that conforms to media type format.
     * @param { AsyncCallback<boolean> } callback - The callback of querying default application result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.BundleManager.BundleFramework.DefaultApp
     * @since 9
     */
    function isDefaultApplication(type: string, callback: AsyncCallback<boolean>): void;
    /**
     * Query whether the caller is default application based on type.
     *
     * @param { string } type - Application type or a file type that conforms to media type format.
     * @returns { Promise<boolean> } Return true if caller is default application; return false otherwise.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.BundleManager.BundleFramework.DefaultApp
     * @since 9
     */
    function isDefaultApplication(type: string): Promise<boolean>;
    /**
     * Query whether the caller is default application based on type.
     *
     * @param { string } type - Application type or a file type that conforms to media type format.
     * @returns { boolean } Return true if caller is default application; return false otherwise.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.BundleManager.BundleFramework.DefaultApp
     * @since 10
     */
    function isDefaultApplicationSync(type: string): boolean;
}
export default defaultAppManager;
