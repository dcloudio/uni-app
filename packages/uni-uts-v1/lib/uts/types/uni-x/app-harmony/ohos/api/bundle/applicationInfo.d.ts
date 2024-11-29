/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
import { ModuleInfo } from './moduleInfo';
import { CustomizeData } from './customizeData';
/**
 * Obtains configuration information about an application
 *
 * @typedef ApplicationInfo
 * @syscap SystemCapability.BundleManager.BundleFramework
 * @since 7
 * @deprecated since 9
 * @useinstead ohos.bundle.bundleManager.ApplicationInfo
 */
export interface ApplicationInfo {
    /**
     * @default Indicates the application name, which is the same as {@code bundleName}
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly name: string;
    /**
     * @default Description of application
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly description: string;
    /**
     * @default Indicates the description id of the application
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly descriptionId: number;
    /**
     * @default Indicates whether the application is a system application
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly systemApp: boolean;
    /**
     * @default Indicates whether or not this application may be instantiated
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly enabled: boolean;
    /**
     * @default Indicates the label of the application
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly label: string;
    /**
     * @default Indicates the label id of the application
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bundle.bundleManager.ApplicationInfo.labelIndex
     */
    readonly labelId: string;
    /**
     * @default Indicates the icon of the application
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly icon: string;
    /**
     * @default Indicates the icon id of the application
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.bundle.bundleManager.ApplicationInfo.iconIndex
     */
    readonly iconId: string;
    /**
     * @default Process of application, if user do not set it ,the value equal bundleName
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly process: string;
    /**
     * @default Indicates the running mode supported by the application
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly supportedModes: number;
    /**
     * @default Indicates the path storing the module resources of the application
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly moduleSourceDirs: Array<string>;
    /**
     * @default Indicates the permissions required for accessing the application.
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly permissions: Array<string>;
    /**
     * @default Indicates module information about an application
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly moduleInfos: Array<ModuleInfo>;
    /**
     * @default Indicates the path where the {@code Entry.hap} file of the application is saved
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly entryDir: string;
    /**
     * @default Indicates the application source code path
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 8
     * @deprecated since 9
     */
    readonly codePath: string;
    /**
     * @default Indicates the metadata of module
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 8
     * @deprecated since 9
     */
    readonly metaData: Map<string, Array<CustomizeData>>;
    /**
     * @default Indicates whether or not this application may be removable
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 8
     * @deprecated since 9
     */
    readonly removable: boolean;
    /**
     * @default Indicates the access token of the application
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 8
     * @deprecated since 9
     */
    readonly accessTokenId: number;
    /**
     * @default Indicates the uid of the application
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 8
     * @deprecated since 9
     */
    readonly uid: number;
    /**
     * @default Indicates entity type of the application
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 8
     * @deprecated since 9
     */
    readonly entityType: string;
}
