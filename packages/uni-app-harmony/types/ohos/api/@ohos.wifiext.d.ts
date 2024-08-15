/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
 * @kit ConnectivityKit
 */
import { AsyncCallback } from './@ohos.base';
/**
 * Provides extended methods to operate or manage Wi-Fi.
 *
 * <p>The APIs involved in this file are non-general APIs.
 * These extended APIs are only used by some product types, such as routers.
 * Common products should not use these APIs.</p>
 *
 * @namespace wifiext
 * @since 8
 */
declare namespace wifiext {
    /**
     * Enables a Wi-Fi hotspot.
     *
     * @permission ohos.permission.MANAGE_WIFI_HOTSPOT_EXT
     * @returns { boolean } Returns {@code true} if this method is called successfully; returns {@code false} otherwise.
     * @syscap SystemCapability.Communication.WiFi.AP.Extension
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManagerExt/wifiManagerExt.enableHotspot
     */
    function enableHotspot(): boolean;
    /**
     * Disables a Wi-Fi hotspot.
     * @permission ohos.permission.MANAGE_WIFI_HOTSPOT_EXT
     * @returns { boolean } Returns {@code true} if this method is called successfully; returns {@code false} otherwise.
     * @syscap SystemCapability.Communication.WiFi.AP.Extension
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManagerExt/wifiManagerExt.disableHotspot
     */
    function disableHotspot(): boolean;
    /**
     * Obtains the supported power model.
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { Promise<Array<PowerModel>> } Returns the array of supported power model.
     * @syscap SystemCapability.Communication.WiFi.AP.Extension
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManagerExt/wifiManagerExt.getSupportedPowerMode
     */
    function getSupportedPowerModel(): Promise<Array<PowerModel>>;
    /**
     * Obtains the supported power model.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { AsyncCallback<Array<PowerModel>> } callback - callback function, no return value.
     * @syscap SystemCapability.Communication.WiFi.AP.Extension
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManagerExt/wifiManagerExt.getSupportedPowerMode
     */
    function getSupportedPowerModel(callback: AsyncCallback<Array<PowerModel>>): void;
    /**
     * Obtains the current Wi-Fi power mode.
     * @permission ohos.permission.GET_WIFI_INFO
     * @returns { Promise<PowerModel> } Returns the current Wi-Fi power mode. If a value less than zero is returned, it indicates a failure.
     * @syscap SystemCapability.Communication.WiFi.AP.Extension
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManagerExt/wifiManagerExt.getPowerMode
     */
    function getPowerModel(): Promise<PowerModel>;
    /**
     * Obtains the current Wi-Fi power mode.
     * @permission ohos.permission.GET_WIFI_INFO
     * @param { AsyncCallback<PowerModel> } callback - callback function, no return value.
     * @syscap SystemCapability.Communication.WiFi.AP.Extension
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManagerExt/wifiManagerExt.getPowerMode
     */
    function getPowerModel(callback: AsyncCallback<PowerModel>): void;
    /**
     * Set the current Wi-Fi power mode.
     * @permission ohos.permission.MANAGE_WIFI_HOTSPOT_EXT
     * @param { PowerModel } model - model indicates model file description to be loaded.
     * @returns { boolean } Returns {@code true} if the Wi-Fi is active; returns {@code false} otherwise.
     * @syscap SystemCapability.Communication.WiFi.AP.Extension
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManagerExt/wifiManagerExt.setPowerMode
     */
    function setPowerModel(model: PowerModel): boolean;
    /**
     * The power model enumeration.
     *
     * @enum { number } PowerModel
     * @syscap SystemCapability.Communication.WiFi.AP.Extension
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.wifiManagerExt/wifiManagerExt.PowerMode
     */
    export enum PowerModel {
        /**
        * Sleeping model.
        * @syscap SystemCapability.Communication.WiFi.AP.Extension
        * @since 8
        * @deprecated since 9
        * @useinstead ohos.wifiManagerExt/wifiManagerExt.PowerMode
        */
        SLEEPING = 0,
        /**
        * General model.
        * @syscap SystemCapability.Communication.WiFi.AP.Extension
        * @since 8
        * @deprecated since 9
        * @useinstead ohos.wifiManagerExt/wifiManagerExt.PowerMode
        */
        GENERAL = 1,
        /**
        * Through wall model.
        * @syscap SystemCapability.Communication.WiFi.AP.Extension
        * @since 8
        * @deprecated since 9
        * @useinstead ohos.wifiManagerExt/wifiManagerExt.PowerMode
        */
        THROUGH_WALL = 2
    }
}
export default wifiext;
