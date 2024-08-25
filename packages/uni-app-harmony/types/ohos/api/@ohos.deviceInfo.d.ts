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
 * @kit BasicServicesKit
 */
/**
 * A static class pertaining to the product information.
 *
 * @namespace deviceInfo
 * @syscap SystemCapability.Startup.SystemInfo
 * @since 6
 */
/**
 * A static class pertaining to the product information.
 *
 * @namespace deviceInfo
 * @syscap SystemCapability.Startup.SystemInfo
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare namespace deviceInfo {
    /**
     * Obtains the device type represented by a string,
     * which can be {@code phone} (or {@code default} for phones), {@code wearable}, {@code liteWearable},
     * {@code tablet}, {@code tv}, {@code car}, or {@code smartVision}.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the device type represented by a string,
     * which can be {@code phone} (or {@code default} for phones), {@code wearable}, {@code liteWearable},
     * {@code tablet}, {@code tv}, {@code car}, or {@code smartVision}.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains the device type represented by a string,
     * which can be {@code phone} (or {@code default} for phones), {@code wearable}, {@code liteWearable},
     * {@code tablet}, {@code tv}, {@code car}, or {@code smartVision}.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    const deviceType: string;
    /**
     * Obtains the device manufacturer represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the device manufacturer represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    const manufacture: string;
    /**
     * Obtains the device brand represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the device brand represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains the device brand represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    const brand: string;
    /**
     * Obtains the external product series represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the external product series represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    const marketName: string;
    /**
     * Obtains the product series represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the product series represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    const productSeries: string;
    /**
     * Obtains the product model represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the product model represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains the product model represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    const productModel: string;
    /**
     * Obtains the software model represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the software model represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    const softwareModel: string;
    /**
     * Obtains the hardware model represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the hardware model represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    const hardwareModel: string;
    /**
     * Obtains the hardware profile represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     * @deprecated since 9
     */
    const hardwareProfile: string;
    /**
     * Obtains the device serial number represented by a string.
     * This API can be called only by system applications.
     *
     * @permission ohos.permission.sec.ACCESS_UDID
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    const serial: string;
    /**
     * Obtains the bootloader version number represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the bootloader version number represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    const bootloaderVersion: string;
    /**
     * Obtains the application binary interface (Abi) list represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the application binary interface (Abi) list represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    const abiList: string;
    /**
     * Obtains the security patch level represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the security patch level represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    const securityPatchTag: string;
    /**
     * Obtains the product version represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the product version represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    const displayVersion: string;
    /**
     * Obtains the incremental version represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the incremental version represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    const incrementalVersion: string;
    /**
     * Obtains the OS release type represented by a string.
     * <p>The OS release category can be {@code Release}, {@code Beta}, or {@code Canary}.
     * The specific release type may be {@code Release}, {@code Beta1}, or others alike.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the OS release type represented by a string.
     * <p>The OS release category can be {@code Release}, {@code Beta}, or {@code Canary}.
     * The specific release type may be {@code Release}, {@code Beta1}, or others alike.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    const osReleaseType: string;
    /**
     * Obtains the OS version represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the OS version represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains the OS version represented by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    const osFullName: string;
    /**
     * Obtains the major (M) version number, which increases with any updates to the overall architecture.
     * <p>The M version number monotonically increases from 1 to 99.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the major (M) version number, which increases with any updates to the overall architecture.
     * <p>The M version number monotonically increases from 1 to 99.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    const majorVersion: number;
    /**
     * Obtains the senior (S) version number, which increases with any updates to the partial
     * architecture or major features.
     * <p>The S version number monotonically increases from 0 to 99.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the senior (S) version number, which increases with any updates to the partial
     * architecture or major features.
     * <p>The S version number monotonically increases from 0 to 99.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    const seniorVersion: number;
    /**
     * Obtains the feature (F) version number, which increases with any planned new features.
     * <p>The F version number monotonically increases from 0 or 1 to 99.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the feature (F) version number, which increases with any planned new features.
     * <p>The F version number monotonically increases from 0 or 1 to 99.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    const featureVersion: number;
    /**
     * Obtains the build (B) version number, which increases with each new development build.
     * <p>The B version number monotonically increases from 0 or 1 to 999.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the build (B) version number, which increases with each new development build.
     * <p>The B version number monotonically increases from 0 or 1 to 999.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    const buildVersion: number;
    /**
     * Obtains the SDK API version number.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the SDK API version number.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    const sdkApiVersion: number;
    /**
     * Obtains the first API version number.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the first API version number.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    const firstApiVersion: number;
    /**
     * Obtains the version ID by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the version ID by a string.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    const versionId: string;
    /**
     * Obtains the build types of the same baseline code.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the build types of the same baseline code.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    const buildType: string;
    /**
     * Obtains the different build user of the same baseline code.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the different build user of the same baseline code.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    const buildUser: string;
    /**
     * Obtains the different build host of the same baseline code.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the different build host of the same baseline code.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    const buildHost: string;
    /**
     * Obtains the build time.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the build time.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    const buildTime: string;
    /**
     * Obtains the version hash.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 6
     */
    /**
     * Obtains the version hash.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @crossplatform
     * @since 10
     */
    const buildRootHash: string;
    /**
     * Obtains the device udid.
     * This API can be called only by system applications.
     *
     * @permission ohos.permission.sec.ACCESS_UDID
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 7
     */
    const udid: string;
    /**
     * Obtains the Distribution OS name.
     * <p>Independent Software Vendor (ISV) may distribute OHOS with their own OS name.
     * distributionOsName will return the ISV OS name
     * If ISV not specified, it will return an empty string
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 10
     */
    const distributionOSName: string;
    /**
     * Obtains the Distribution OS version.
     * <p>Independent Software Vendor (ISV) may distribute OHOS with their own OS version.
     * distributionOSVersion will return the ISV OS version
     * If ISV not specified, it will return the same value as osFullName
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 10
     */
    const distributionOSVersion: string;
    /**
     * Obtains the Distribution OS version.
     * <p>Independent Software Vendor (ISV) may distribute OHOS with their own OS api version.
     * distributionOSVersion will return the ISV OS api version
     * If ISV not specified, it will return the same value as sdkApiVersion
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 10
     */
    const distributionOSApiVersion: number;
    /**
     * Obtains the Distribution OS release type.
     * <p>Independent Software Vendor (ISV) may distribute OHOS with their own OS release type.
     * distributionOSVersion will return the ISV OS release type
     * If ISV not specified, it will return the same value as osReleaseType
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 10
     */
    const distributionOSReleaseType: string;
    /**
     * Open Device Identifier (ODID): a developer-level non-permanent device identifier.
     * A developer can be an enterprise or individual developer.
     * Example: dff3cdfd-7beb-1e7d-fdf7-1dbfddd7d30c
     *
     * An ODID will be regenerate in the following scenarios:
     * Restore a phone to its factory settings.
     * Uninstall and reinstall all apps of one developer on one device.
     *
     * An ODID is generated based on the following rules:
     * For apps from the same developer, which are running on the same device, they have the same ODID.
     * For apps from different developers, which are running on the same device, each of them has its own ODID.
     * For apps from the same developer, which are running on different devices, each of them has its own ODID.
     * For apps from different developers, which are running on different devices, each of them has its own ODID.
     *
     * @constant
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 12
     */
    const ODID: string;
}
export default deviceInfo;
