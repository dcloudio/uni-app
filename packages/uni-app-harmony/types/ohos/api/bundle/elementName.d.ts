/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
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
 * Contains basic Ability information, which uniquely identifies an ability.
 * You can use this class to obtain values of the fields set in an element,
 * such as the device ID, bundle name, and ability name.
 *
 * Contains basic Ability information, which uniquely identifies an ability
 *
 * @typedef ElementName
 * @syscap SystemCapability.BundleManager.BundleFramework
 * @since 7
 * @deprecated since 9
 * @useinstead ohos.bundle.bundleManager.ElementName
 */
export interface ElementName {
    /**
     * device id
     *
     * @default -
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    deviceId?: string;
    /**
     * bundle name
     *
     * @default -
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    bundleName: string;
    /**
     * ability name
     *
     * @default ability class name.
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    abilityName: string;
    /**
     * uri
     *
     * @default -
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    uri?: string;
    /**
     * shortName
     *
     * @default -
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    shortName?: string;
}
