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
 * Provides information about a shortcut, including the shortcut ID and label.
 *
 * @typedef ShortcutInfo
 * @syscap SystemCapability.BundleManager.BundleFramework
 * @since 7
 * @deprecated since 9
 */
export interface ShortcutInfo {
    /**
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly id: string;
    /**
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly bundleName: string;
    /**
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly hostAbility: string;
    /**
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly icon: string;
    /**
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 8
     * @deprecated since 9
     */
    readonly iconId: number;
    /**
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly label: string;
    /**
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 8
     * @deprecated since 9
     */
    readonly labelId: number;
    /**
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly disableMessage: string;
    /**
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly wants: Array<ShortcutWant>;
    /**
     * @default false
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly isStatic?: boolean;
    /**
     * @default false
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly isHomeShortcut?: boolean;
    /**
     * @default false
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly isEnabled?: boolean;
}
