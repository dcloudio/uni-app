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
 * @kit MDMKit
 */
import type systemManager from './@ohos.enterprise.systemManager';
/**
 * Class of the enterprise admin extension ability.
 *
 * @syscap SystemCapability.Customization.EnterpriseDeviceManager
 * @stagemodelonly
 * @since 12
 */
export default class EnterpriseAdminExtensionAbility {
    /**
     * Called back when an application is enabled.
     *
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    onAdminEnabled(): void;
    /**
     * Called back when an application is disabled.
     *
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    onAdminDisabled(): void;
    /**
     * Called back when a bundle is installed.
     *
     * @param { string } bundleName - bundleName indicates the name of the bundle installed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    onBundleAdded(bundleName: string): void;
    /**
     * Called back when a bundle is uninstalled.
     *
     * @param { string } bundleName - bundleName indicates the name of the bundle uninstalled.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    onBundleRemoved(bundleName: string): void;
    /**
     * Called back when an app is started.
     *
     * @param { string } bundleName - bundleName indicates the name of the app started.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    onAppStart(bundleName: string): void;
    /**
     * Called back when an app is stopped.
     *
     * @param { string } bundleName - bundleName indicates the name of the app stopped.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    onAppStop(bundleName: string): void;
    /**
     * Called back when a system version need to update.
     *
     * @param { systemManager.SystemUpdateInfo } systemUpdateInfo - the information of the system version.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    onSystemUpdate(systemUpdateInfo: systemManager.SystemUpdateInfo): void;
    /**
     * Called back when the enterprise admin extension is started.
     *
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    onStart(): void;
}
