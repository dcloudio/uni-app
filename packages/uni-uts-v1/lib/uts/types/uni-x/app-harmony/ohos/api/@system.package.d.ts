/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
 * @typedef CheckPackageHasInstalledResponse
 * @syscap SystemCapability.BundleManager.BundleFramework
 * @since 3
 * @deprecated since 9
 */
export interface CheckPackageHasInstalledResponse {
    /**
     * Whether the application exists, or whether the native application has been installed.
     *
     * @type { boolean }
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 3
     * @deprecated since 9
     */
    result: boolean;
}
/**
 * @typedef CheckPackageHasInstalledOptions
 * @syscap SystemCapability.BundleManager.BundleFramework
 * @since 3
 * @deprecated since 9
 */
export interface CheckPackageHasInstalledOptions {
    /**
     * Application bundle name.
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 3
     * @deprecated since 9
     */
    bundleName: string;
    /**
     * Called when native applications are installed.
     *
     * @type { ?function }
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 3
     * @deprecated since 9
     */
    success?: (data: CheckPackageHasInstalledResponse) => void;
    /**
     * Called when native applications fail to be installed.
     *
     * @type { ?function }
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 3
     * @deprecated since 9
     */
    fail?: (data: any, code: number) => void;
    /**
     * Called when the execution is completed.
     *
     * @type { ?function }
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 3
     * @deprecated since 9
     */
    complete?: () => void;
}
/**
 * @syscap SystemCapability.BundleManager.BundleFramework
 * @since 3
 * @deprecated since 9
 */
export default class Package {
    /**
     * Checks whether an application exists, or whether a native application has been installed.
     *
     * @param { CheckPackageHasInstalledOptions } options Options
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 3
     * @deprecated since 9
     */
    static hasInstalled(options: CheckPackageHasInstalledOptions): void;
}
