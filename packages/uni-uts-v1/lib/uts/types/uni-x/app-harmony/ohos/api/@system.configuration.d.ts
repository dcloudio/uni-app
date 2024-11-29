/*
 * Copyright (c) 2020 Huawei Device Co., Ltd.
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
 * @kit ArkUI
 */
/**
 * @interface LocaleResponse
 * @syscap SystemCapability.ArkUI.ArkUI.Lite
 * @since 3
 */
/**
 * @interface LocaleResponse
 * @syscap SystemCapability.ArkUI.ArkUI.Lite
 * @atomicservice
 * @since 12
 */
export interface LocaleResponse {
    /**
     * Current language of the application. Example: zh.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 3
     */
    /**
     * Current language of the application. Example: zh.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @atomicservice
     * @since 12
     */
    language: string;
    /**
     * Country or region. Example: CN.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 3
     */
    /**
     * Country or region. Example: CN.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @atomicservice
     * @since 12
     */
    countryOrRegion: string;
    /**
     * Text layout direction. Available values are as follows:
     * ltr: The text direction is from left to right.
     * rtl: The text direction is from right to left.
     *
     * @type { "ltr" | "rtl" }
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 3
     */
    /**
     * Text layout direction. Available values are as follows:
     * ltr: The text direction is from left to right.
     * rtl: The text direction is from right to left.
     *
     * @type { "ltr" | "rtl" }
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @atomicservice
     * @since 12
     */
    dir: "ltr" | "rtl";
}
/**
 * @syscap SystemCapability.ArkUI.ArkUI.Lite
 * @since 3
 */
/**
 * @syscap SystemCapability.ArkUI.ArkUI.Lite
 * @atomicservice
 * @since 12
 */
export default class Configuration {
    /**
     * Obtains the current locale of the application, which is the same as the system locale.
     *
     * @returns { LocaleResponse }
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @since 3
     */
    /**
     * Obtains the current locale of the application, which is the same as the system locale.
     *
     * @returns { LocaleResponse }
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @atomicservice
     * @since 12
     */
    static getLocale(): LocaleResponse;
}
