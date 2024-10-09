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
 * @kit LocalizationKit
 */

/**
 * Provides international settings related APIs.
 *
 * @namespace i18n
 * @syscap SystemCapability.Global.I18n
 * @since 7
 */
/**
 * Provides international settings related APIs.
 *
 * @namespace i18n
 * @syscap SystemCapability.Global.I18n
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11
 */
declare namespace i18n {
    /**
     * Obtains the country or region name localized for display on a given locale.
     *
     * @param { string } country - The locale whose country or region name will be displayed.
     * @param { string } locale - The locale used to display the country or region.
     * @param { boolean } [sentenceCase] - Specifies whether the country or region name is displayed in sentence case.
     * @returns { string } the country or region name localized for display on a given locale.
     * @syscap SystemCapability.Global.I18n
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.System.getDisplayCountry
     */
    export function getDisplayCountry(country: string, locale: string, sentenceCase?: boolean): string;
    /**
     * Obtains the language name localized for display on a given locale.
     *
     * @param { string } language - The locale whose language name will be displayed.
     * @param { string } locale - The locale used to display the language.
     * @param { boolean } [sentenceCase] - Specifies whether the language name is displayed in sentence case.
     * @returns { string } the language name localized for display on a given locale.
     * @syscap SystemCapability.Global.I18n
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.System.getDisplayLanguage
     */
    export function getDisplayLanguage(language: string, locale: string, sentenceCase?: boolean): string;
    /**
     * Obtains the language currently used by the system.
     *
     * @returns { string } the language currently used by the system.
     * @syscap SystemCapability.Global.I18n
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.System.getSystemLanguage
     */
    export function getSystemLanguage(): string;
    /**
     * Obtains the region currently used by the system.
     *
     * @returns { string } the region currently used by the system.
     * @syscap SystemCapability.Global.I18n
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.System.getSystemRegion
     */
    export function getSystemRegion(): string;
    /**
     * Obtains the locale currently used by the system.
     *
     * @returns { string } the locale currently used by the system.
     * @syscap SystemCapability.Global.I18n
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.System.getSystemLocale
     */
    export function getSystemLocale(): string;
    /**
     * Provides system functions.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    /**
     * Provides system functions.
     *
     * @syscap SystemCapability.Global.I18n
     * @crossplatform
     * @since 10
     */
    /**
     * Provides system functions.
     *
     * @syscap SystemCapability.Global.I18n
     * @crossplatform
     * @form
     * @atomicservice
     * @since 11
     */
    export class System {
        /**
         * Obtains the country or region name localized for display on a given locale.
         *
         * @param { string } country - The locale whose country or region name will be displayed.
         * @param { string } locale - The locale used to display the country or region.
         * @param { boolean } [sentenceCase] - Specifies whether the country or region name is displayed in sentence case.
         * @returns { string } the country or region name localized for display on a given locale.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 890001 - param value not valid
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Obtains the country or region name localized for display on a given locale.
         *
         * @param { string } country - The locale whose country or region name will be displayed. It must be a valid country.
         * @param { string } locale - The locale used to display the country or region. It must be a valid locale.
         * @param { boolean } [sentenceCase] - Specifies whether the country or region name is displayed in sentence case.
         * @returns { string } the country or region name localized for display on a given locale.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 890001 - Invalid parameter. Possible causes: Parameter verification failed.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains the country or region name localized for display on a given locale.
         *
         * @param { string } country - The locale whose country or region name will be displayed. It must be a valid country.
         * @param { string } locale - The locale used to display the country or region. It must be a valid locale.
         * @param { boolean } [sentenceCase] - Specifies whether the country or region name is displayed in sentence case.
         * @returns { string } the country or region name localized for display on a given locale.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 890001 - Invalid parameter. Possible causes: Parameter verification failed.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        static getDisplayCountry(country: string, locale: string, sentenceCase?: boolean): string;
        /**
         * Obtains the language name localized for display on a given locale.
         *
         * @param { string } language - The locale whose language name will be displayed.
         * @param { string } locale - The locale used to display the language.
         * @param { boolean } [sentenceCase] - Specifies whether the language name is displayed in sentence case.
         * @returns { string } the language name localized for display on a given locale.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 890001 - param value not valid
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Obtains the language name localized for display on a given locale.
         *
         * @param { string } language - The locale whose language name will be displayed.
         * @param { string } locale - The locale used to display the language.
         * @param { boolean } [sentenceCase] - Specifies whether the language name is displayed in sentence case.
         * @returns { string } the language name localized for display on a given locale.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 890001 - param value not valid
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains the language name localized for display on a given locale.
         *
         * @param { string } language - The locale whose language name will be displayed. It must be a valid language.
         * @param { string } locale - The locale used to display the language. It must be a valid locale.
         * @param { boolean } [sentenceCase] - Specifies whether the language name is displayed in sentence case.
         * @returns { string } the language name localized for display on a given locale.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 890001 - Invalid parameter. Possible causes: Parameter verification failed.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        static getDisplayLanguage(language: string, locale: string, sentenceCase?: boolean): string;
        /**
         * Obtains all languages supported by the system.
         *
         * @returns { Array<string> } all languages supported by the system.
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Obtains all languages supported by the system.
         *
         * @returns { Array<string> } all languages supported by the system.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        static getSystemLanguages(): Array<string>;
        /**
         * Obtains all regions supported by the system in the language.
         *
         * @param { string } language - The language used to get the list of regions. It must be a valid language.
         * @returns { Array<string> } all countries or regions supported by the system in the language.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 890001 - Invalid parameter. Possible causes: Parameter verification failed.
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Obtains all regions supported by the system in the language.
         *
         * @param { string } language - The language used to get the list of regions. It must be a valid language.
         * @returns { Array<string> } all countries or regions supported by the system in the language.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 890001 - Invalid parameter. Possible causes: Parameter verification failed.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        static getSystemCountries(language: string): Array<string>;
        /**
         * Determine whether the current language or region is recommended.
         *
         * @param { string } language - The language code. It must be a valid language.
         * @param { string } [region] - The region code. It must be a valid region.
         * @returns { boolean } whether the current language or region is recommended.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 890001 - Invalid parameter. Possible causes: Parameter verification failed.
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Determine whether the current language or region is recommended.
         *
         * @param { string } language - The language code. It must be a valid language.
         * @param { string } [region] - The region code. It must be a valid region.
         * @returns { boolean } whether the current language or region is recommended.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 890001 - Invalid parameter. Possible causes: Parameter verification failed.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        static isSuggested(language: string, region?: string): boolean;
        /**
         * Obtains the language currently used by the system.
         *
         * @returns { string } the language currently used by the system.
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Obtains the language currently used by the system.
         *
         * @returns { string } the language currently used by the system.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains the language currently used by the system.
         *
         * @returns { string } the language currently used by the system.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @form
         * @atomicservice
         * @since 11
         */
        static getSystemLanguage(): string;
        /**
         * Obtains the region currently used by the system.
         *
         * @returns { string } the region currently used by the system.
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Obtains the region currently used by the system.
         *
         * @returns { string } the region currently used by the system.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains the region currently used by the system.
         *
         * @returns { string } the region currently used by the system.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        static getSystemRegion(): string;
        /**
         * Obtains the locale currently used by the system.
         *
         * @returns { string } the locale currently used by the system.
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Obtains the locale currently used by the system.
         *
         * @returns { string } the locale currently used by the system.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains the locale currently used by the system.
         *
         * @returns { string } the locale currently used by the system.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        static getSystemLocale(): string;
        /**
         * Check out whether system is 24-hour system.
         *
         * @returns { boolean } a boolean represent whether system is 24-hour system.
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Check out whether system is 24-hour system.
         *
         * @returns { boolean } a boolean represent whether system is 24-hour system.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Check out whether system is 24-hour system.
         *
         * @returns { boolean } a boolean represent whether system is 24-hour system.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @form
         * @since 11
         */
        /**
         * Check out whether system is 24-hour system.
         *
         * @returns { boolean } a boolean represent whether system is 24-hour system.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        static is24HourClock(): boolean;
        /**
         * Access the system preferred language list.
         *
         * @returns { Array<string> } a string Array represent the preferred language list.
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Access the system preferred language list.
         *
         * @returns { Array<string> } a string Array represent the preferred language list.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        static getPreferredLanguageList(): Array<string>;
        /**
         * Get the first preferred language of system.
         *
         * @returns { string } a string represent the first preferred language of system.
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Get the first preferred language of system.
         *
         * @returns { string } a string represent the first preferred language of system.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        static getFirstPreferredLanguage(): string;
        /**
         * Set the preferred language of App.
         *
         * @param { string } language - the language to be set. It must be a valid language.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 890001 - Invalid parameter. Possible causes: Parameter verification failed.
         * @syscap SystemCapability.Global.I18n
         * @since 11
         */
        /**
         * Set the preferred language of App.
         *
         * @param { string } language - the language to be set. It must be a valid language.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 890001 - Invalid parameter. Possible causes: Parameter verification failed.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        static setAppPreferredLanguage(language: string): void;
        /**
         * Get the preferred language of App.
         *
         * @returns { string } a string represent the preferred language of App.
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Get the preferred language of App.
         *
         * @returns { string } a string represent the preferred language of App.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        static getAppPreferredLanguage(): string;
        /**
         * Get whether to use local digit.
         *
         * @returns { boolean } a boolean represents whether to use local digit.
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Get whether to use local digit.
         *
         * @returns { boolean } a boolean represents whether to use local digit.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        static getUsingLocalDigit(): boolean;
    }
    /**
     * Provides util functions.
     *
     * @interface Util
     * @syscap SystemCapability.Global.I18n
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.i18n/i18n.I18NUtil
     */
    export interface Util {
        /**
         * Convert from unit to unit and format according to the locale.
         *
         * @param { UnitInfo } fromUnit - Information of the unit to be converted.
         * @param { UnitInfo } toUnit - Information about the unit to be converted to.
         * @param { number } value - Indicates the number to be formatted.
         * @param { string } locale - The locale to be used.
         * @param { string } [style] - The style of format.
         * @returns { string } converted number and unit.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.i18n/i18n.I18NUtil#unitConvert
         */
        unitConvert(fromUnit: UnitInfo, toUnit: UnitInfo, value: number, locale: string, style?: string): string;
    }
    /**
     * Provides util functions.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    /**
     * Provides util functions.
     *
     * @syscap SystemCapability.Global.I18n
     * @crossplatform
     * @since 10
     */
    /**
     * Provides util functions.
     *
     * @syscap SystemCapability.Global.I18n
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export class I18NUtil {
        /**
         * Convert from unit to unit and format according to the locale.
         *
         * @param { UnitInfo } fromUnit - Information of the unit to be converted.
         * @param { UnitInfo } toUnit - Information about the unit to be converted to.
         * @param { number } value - Indicates the number to be formatted.
         * @param { string } locale - The locale to be used.
         * @param { string } [style] - The style of format.
         * @returns { string } converted number and unit.
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Convert from unit to unit and format according to the locale.
         *
         * @param { UnitInfo } fromUnit - Information of the unit to be converted.
         * @param { UnitInfo } toUnit - Information about the unit to be converted to.
         * @param { number } value - Indicates the number to be formatted.
         * @param { string } locale - The locale to be used.
         * @param { string } [style] - The style of format.
         * @returns { string } converted number and unit.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        static unitConvert(fromUnit: UnitInfo, toUnit: UnitInfo, value: number, locale: string, style?: string): string;
        /**
         * Get the order of year, month, day in the specified locale. Year, month, day are separated by '-'.
         * 'y' stands for year, 'L' stands for month, d stands for day.
         *
         * @param { string } locale - Information of the locale
         * @returns { string } the string of 'y', 'L', 'd' joined by '-'.
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Get the order of year, month, day in the specified locale. Year, month, day are separated by '-'.
         * 'y' stands for year, 'L' stands for month, d stands for day.
         *
         * @param { string } locale - Information of the locale.
         * @returns { string } the string of 'y', 'L', 'd' joined by '-'.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Get the order of year, month, day in the specified locale. Year, month, day are separated by '-'.
         * 'y' stands for year, 'L' stands for month, d stands for day.
         *
         * @param { string } locale - Information of the locale.
         * @returns { string } the string of 'y', 'L', 'd' joined by '-'.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        static getDateOrder(locale: string): string;
        /**
         * Get the time period name for the specified hour.
         *
         * @param { number } hour - the hour value.
         * @param { string } [locale] - specified the locale. Use current app locale by default. It must be a valid locale.
         * @returns { string } the string of time period name. The return value may be empty string
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 890001 - Invalid parameter. Possible causes: Parameter verification failed.
         * @syscap SystemCapability.Global.I18n
         * @since 11
         */
        /**
         * Get the time period name for the specified hour.
         *
         * @param { number } hour - the hour value.
         * @param { string } [locale] - specified the locale. Use current app locale by default. It must be a valid locale.
         * @returns { string } the string of time period name. The return value may be empty string
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 890001 - Invalid parameter. Possible causes: Parameter verification failed.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        static getTimePeriodName(hour: number, locale?: string): string;
        /**
         * Get the best matched locale in the specified list.
         *
         * @param { string } locale - the origin locale. It must be a valid locale.
         * @param { string[] } localeList - a list of locales to be matched. It must be a valid locale.
         * @returns { string } the string of the best matched locale name.
         * The return value may be empty string due to none is matched.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 890001 - Invalid parameter. Possible causes: Parameter verification failed.
         * @static
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        static getBestMatchLocale(locale: string, localeList: string[]): string;
        /**
         * Get a three-letter abbreviation of the specified language.
         *
         * @param { string } locale - the origin locale or language code. It must be a valid locale.
         * @returns { string } 3 letter language code.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 890001 - Invalid parameter. Possible causes: Parameter verification failed.
         * @static
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        static getThreeLetterLanguage(locale: string): string;
        /**
         * Get a three-letter abbreviation of the specified region.
         *
         * @param { string } locale - the origin locale or region code. It must be a valid locale.
         * @returns { string } 3 letter region code.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 890001 - Invalid parameter. Possible causes: Parameter verification failed.
         * @static
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        static getThreeLetterRegion(locale: string): string;
    }
    /**
     * Provides the options of unit.
     *
     * @interface UnitInfo
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * Provides the options of unit.
     *
     * @interface UnitInfo
     * @syscap SystemCapability.Global.I18n
     * @atomicservice
     * @since 12
     */
    export interface UnitInfo {
        /**
         * Unit name.
         *
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Unit name.
         *
         * @type { string }
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        unit: string;
        /**
         * The measurement system of the unit.
         *
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * The measurement system of the unit.
         *
         * @type { string }
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        measureSystem: string;
    }
    /**
     * Provides the options of PhoneNumberFormat.
     *
     * @interface PhoneNumberFormatOptions
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * Provides the options of PhoneNumberFormat.
     *
     * @interface PhoneNumberFormatOptions
     * @syscap SystemCapability.Global.I18n
     * @crossplatform
     * @since 11
     */
    /**
     * Provides the options of PhoneNumberFormat.
     *
     * @interface PhoneNumberFormatOptions
     * @syscap SystemCapability.Global.I18n
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export interface PhoneNumberFormatOptions {
        /**
         * Indicates the type to format phone number.
         *
         * @type { string }
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Indicates the type to format phone number.
         *
         * @type { ?string }
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Indicates the type to format phone number.
         *
         * @type { ?string }
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 11
         */
        /**
         * Indicates the type to format phone number.
         *
         * @type { ?string }
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        type?: string;
    }
    /**
     * Provides the API for formatting phone number strings
     *
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * Provides the API for formatting phone number strings
     *
     * @syscap SystemCapability.Global.I18n
     * @crossplatform
     * @since 11
     */
    /**
     * Provides the API for formatting phone number strings
     *
     * @syscap SystemCapability.Global.I18n
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export class PhoneNumberFormat {
        /**
         * A constructor used to create a PhoneNumberFormat object.
         *
         * @param { string } country - Indicates a character string containing the country information for the PhoneNumberFormat object.
         * @param { PhoneNumberFormatOptions } [options] - format types: "E164", "RFC3966", "INTERNATIONAL", "NATIONAL".
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * A constructor used to create a PhoneNumberFormat object.
         *
         * @param { string } country - Indicates a character string containing the country information for the PhoneNumberFormat object.
         * @param { PhoneNumberFormatOptions } [options] - format types: "E164", "RFC3966", "INTERNATIONAL", "NATIONAL".
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 11
         */
        /**
         * A constructor used to create a PhoneNumberFormat object.
         *
         * @param { string } country - Indicates a character string containing the country information for the PhoneNumberFormat object.
         * @param { PhoneNumberFormatOptions } [options] - format types: "E164", "RFC3966", "INTERNATIONAL", "NATIONAL".
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        constructor(country: string, options?: PhoneNumberFormatOptions);
        /**
         * Judge whether phone number is valid.
         *
         * @param { string } number - Indicates the input phone number.
         * @returns { boolean } a boolean indicates whether the input phone number is valid.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Judge whether phone number is valid.
         *
         * @param { string } number - Indicates the input phone number.
         * @returns { boolean } a boolean indicates whether the input phone number is valid.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 11
         */
        /**
         * Judge whether phone number is valid.
         *
         * @param { string } number - Indicates the input phone number.
         * @returns { boolean } a boolean indicates whether the input phone number is valid.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        isValidNumber(number: string): boolean;
        /**
         * Obtains the formatted phone number strings of number.
         *
         * @param { string } number - Indicates the input phone number to be formatted.
         * @returns { string } the formatted phone number.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Obtains the formatted phone number strings of number.
         *
         * @param { string } number - Indicates the input phone number to be formatted.
         * @returns { string } the formatted phone number.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 11
         */
        /**
         * Obtains the formatted phone number strings of number.
         *
         * @param { string } number - Indicates the input phone number to be formatted.
         * @returns { string } the formatted phone number.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        format(number: string): string;
        /**
         * Determine the location by phone number, and return it according to the specified regional language.
         *
         * @param { string } number - input phone number.
         * @param { string } locale - locale ID.
         * @returns { string } a string represents phone number's location.
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Determine the location by phone number, and return it according to the specified regional language.
         *
         * @param { string } number - input phone number.
         * @param { string } locale - locale ID.
         * @returns { string } a string represents phone number's location.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        getLocationName(number: string, locale: string): string;
    }
    /**
     * Get a Calendar instance specified by locale and type.
     *
     * @param { string } locale - The locale used to get calendar.
     * @param { string } [type] - If type is not specified, get locale's default Calendar, else get the specified type of Calendar.
     *  such as buddhist, chinese, coptic, ethiopic, hebrew, gregory, indian, islamic_civil, islamic_tbla, islamic_umalqura,
     *  japanese, persian.
     * @returns { Calendar } Calendar object
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * Get a Calendar instance specified by locale and type.
     *
     * @param { string } locale - The locale used to get calendar.
     * @param { string } [type] - If type is not specified, get locale's default Calendar, else get the specified type of Calendar.
     *  such as buddhist, chinese, coptic, ethiopic, hebrew, gregory, indian, islamic_civil, islamic_tbla, islamic_umalqura,
     *  japanese, persian.
     * @returns { Calendar } Calendar object
     * @syscap SystemCapability.Global.I18n
     * @crossplatform
     * @since 10
     */
    /**
     * Get a Calendar instance specified by locale and type.
     *
     * @param { string } locale - The locale used to get calendar.
     * @param { string } [type] - If type is not specified, get locale's default Calendar, else get the specified type of Calendar.
     *  such as buddhist, chinese, coptic, ethiopic, hebrew, gregory, indian, islamic_civil, islamic_tbla, islamic_umalqura,
     *  japanese, persian.
     * @returns { Calendar } Calendar object
     * @syscap SystemCapability.Global.I18n
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export function getCalendar(locale: string, type?: string): Calendar;
    /**
     * Provides the API for accessing Calendar name, time and date related information.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 7
     */
    /**
     * Provides the API for accessing Calendar name, time and date related information.
     *
     * @syscap SystemCapability.Global.I18n
     * @crossplatform
     * @since 10
     */
    /**
     * Provides the API for accessing Calendar name, time and date related information.
     *
     * @syscap SystemCapability.Global.I18n
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export class Calendar {
        /**
         * set the date.
         *
         * @param { Date } date - Date object used to set the time and date.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * set the date.
         *
         * @param { Date } date - Date object used to set the time and date.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * set the date.
         *
         * @param { Date } date - Date object used to set the time and date.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        setTime(date: Date): void;
        /**
         * set the time.
         *
         * @param { number } time - Indicates the elapsed milliseconds from 1970.1.1 00:00:00 GMT.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * set the time.
         *
         * @param { number } time - Indicates the elapsed milliseconds from 1970.1.1 00:00:00 GMT.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * set the time.
         *
         * @param { number } time - Indicates the elapsed milliseconds from 1970.1.1 00:00:00 GMT.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        setTime(time: number): void;
        /**
         * Set the time
         *
         * @param { number } year - The year field of the calendar, ranges from 0 to 9999.
         * @param { number } month - The month field of the calendar, ranges from 0 to 11.
         * @param { number } date - The day field of the calendar, ranges from 1 to 31.
         * @param { number } hour - The hour field of the calendar, ranges from 0 to 23.
         * @param { number } minute - The minute field of the calendar, ranges from 0 to 59.
         * @param { number } second - the second field of the calendar, ranges from 0 to 59.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Set the time
         *
         * @param { number } year - The year field of the calendar, ranges from 0 to 9999.
         * @param { number } month - The month field of the calendar, ranges from 0 to 11.
         * @param { number } date - The day field of the calendar, ranges from 1 to 31.
         * @param { number } hour - The hour field of the calendar, ranges from 0 to 23.
         * @param { number } minute - The minute field of the calendar, ranges from 0 to 59.
         * @param { number } second - the second field of the calendar, ranges from 0 to 59.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Set the time
         *
         * @param { number } year - The year field of the calendar, ranges from 0 to 9999.
         * @param { number } month - The month field of the calendar, ranges from 0 to 11.
         * @param { number } date - The day field of the calendar, ranges from 1 to 31.
         * @param { number } hour - The hour field of the calendar, ranges from 0 to 23.
         * @param { number } minute - The minute field of the calendar, ranges from 0 to 59.
         * @param { number } second - the second field of the calendar, ranges from 0 to 59.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        set(year: number, month: number, date: number, hour?: number, minute?: number, second?: number): void;
        /**
         * Set the timezone of this calendar.
         *
         * @param { string } timezone - The id of a timezone.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Set the timezone of this calendar.
         *
         * @param { string } timezone - The id of a timezone.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Set the timezone of this calendar.
         *
         * @param { string } timezone - The id of a timezone.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        setTimeZone(timezone: string): void;
        /**
         * Get the timezone id of this calendar instance.
         *
         * @returns { string } the timezone id of this calendar.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Get the timezone id of this calendar instance.
         *
         * @returns { string } the timezone id of this calendar.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Get the timezone id of this calendar instance.
         *
         * @returns { string } the timezone id of this calendar.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getTimeZone(): string;
        /**
         * Get the start day of a week. 1 indicates Sunday, 7 indicates Saturday.
         *
         * @returns { number } start day of a week.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Get the start day of a week. 1 indicates Sunday, 7 indicates Saturday.
         *
         * @returns { number } start day of a week.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Get the start day of a week. 1 indicates Sunday, 7 indicates Saturday.
         *
         * @returns { number } start day of a week.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getFirstDayOfWeek(): number;
        /**
         * Set the start day of a week. 1 indicates Sunday, 7 indicates Saturday.
         *
         * @param { number } value - Indicates the start day of a week. 1 indicates Sunday, 7 indicates Saturday.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Set the start day of a week. 1 indicates Sunday, 7 indicates Saturday.
         *
         * @param { number } value - Indicates the start day of a week. 1 indicates Sunday, 7 indicates Saturday.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Set the start day of a week. 1 indicates Sunday, 7 indicates Saturday.
         *
         * @param { number } value - Indicates the start day of a week. 1 indicates Sunday, 7 indicates Saturday.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        setFirstDayOfWeek(value: number): void;
        /**
         * Get the minimal days of a week, which is needed for the first day of a year.
         *
         * @returns { number } the minimal days of a week.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Get the minimal days of a week, which is needed for the first day of a year.
         *
         * @returns { number } the minimal days of a week.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Get the minimal days of a week, which is needed for the first day of a year.
         *
         * @returns { number } the minimal days of a week.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getMinimalDaysInFirstWeek(): number;
        /**
         * Set the minimal days of a week, which is needed for the first week of a year.
         *
         * @param { number } value - The value to be set.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Set the minimal days of a week, which is needed for the first week of a year.
         *
         * @param { number } value - The value to be set.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Set the minimal days of a week, which is needed for the first week of a year.
         *
         * @param { number } value - The value to be set.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        setMinimalDaysInFirstWeek(value: number): void;
        /**
         * Get the associated value with the field.
         *
         * @param { string } field - Field values such as era, year, month, week_of_year, week_of_month, date, day_of_year, day_of_week
         *  day_of_week_in_month, hour, hour_of_day, minute, second, millisecond, zone_offset, dst_offset, year_woy,
         *  dow_local, extended_year, julian_day, milliseconds_in_day, is_leap_month.
         * @returns { number } the associated value.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Get the associated value with the field.
         *
         * @param { string } field - Field values such as era, year, month, week_of_year, week_of_month, date, day_of_year, day_of_week
         *  day_of_week_in_month, hour, hour_of_day, minute, second, millisecond, zone_offset, dst_offset, year_woy,
         *  dow_local, extended_year, julian_day, milliseconds_in_day, is_leap_month.
         * @returns { number } the associated value.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Get the associated value with the field.
         *
         * @param { string } field - Field values such as era, year, month, week_of_year, week_of_month, date, day_of_year, day_of_week
         *  day_of_week_in_month, hour, hour_of_day, minute, second, millisecond, zone_offset, dst_offset, year_woy,
         *  dow_local, extended_year, julian_day, milliseconds_in_day, is_leap_month.
         * @returns { number } the associated value.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        get(field: string): number;
        /**
         * Get calendar's name localized for display in the given locale.
         *
         * @param { string } locale - Locale used to get the localized name for this calendar. It must be a valid locale.
         * @returns { string } the localized name of this calendar.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Get calendar's name localized for display in the given locale.
         *
         * @param { string } locale - Locale used to get the localized name for this calendar. It must be a valid locale.
         * @returns { string } the localized name of this calendar.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        getDisplayName(locale: string): string;
        /**
         * Returns true if the given date is a weekend day. If the date is not given,
         *  the date object of this calendar is used.
         *
         * @param { Date } [date] - Date object whose attribute is desired.
         * @returns { boolean } whether the date is a weekend day.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Returns true if the given date is a weekend day. If the date is not given,
         *  the date object of this calendar is used.
         *
         * @param { Date } [date] - Date object whose attribute is desired.
         * @returns { boolean } whether the date is a weekend day.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Returns true if the given date is a weekend day. If the date is not given,
         *  the date object of this calendar is used.
         *
         * @param { Date } [date] - Date object whose attribute is desired.
         * @returns { boolean } whether the date is a weekend day.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        isWeekend(date?: Date): boolean;
        /**
         * Adds or subtract the specified amount of time to the given calendar field.
         *
         * @param { string } field - field values such as year, month, week_of_year, week_of_month, date, day_of_year, day_of_week
         *  day_of_week_in_month, hour, hour_of_day, minute, second, millisecond
         * @param { number } amount - the amount of date or time to be added to the field.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 890001 - Invalid parameter. Possible causes: Parameter verification failed.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 11
         */
        /**
         * Adds or subtract the specified amount of time to the given calendar field.
         *
         * @param { string } field - field values such as year, month, week_of_year, week_of_month, date, day_of_year, day_of_week
         *  day_of_week_in_month, hour, hour_of_day, minute, second, millisecond
         * @param { number } amount - the amount of date or time to be added to the field.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 890001 - Invalid parameter. Possible causes: Parameter verification failed.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        add(field: string, amount: number): void;
        /**
         * Get the UTC milliseconds.
         *
         * @returns { number }  the calendar time as UTC milliseconds.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 11
         */
        /**
         * Get the UTC milliseconds.
         *
         * @returns { number }  the calendar time as UTC milliseconds.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getTimeInMillis(): number;
        /**
         * Returns days comparison result.
         *
         * @param { Date } date - Date object to be compared.
         * @returns { number }  value of of the comparison result. A positive value indicates that the date is later,
         * and a negative value indicates that the date is earlier.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 11
         */
        /**
         * Returns days comparison result.
         *
         * @param { Date } date - Date object to be compared.
         * @returns { number }  value of of the comparison result. A positive value indicates that the date is later,
         * and a negative value indicates that the date is earlier.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        compareDays(date: Date): number;
    }
    /**
     * Judge whether the locale is RTL locale.
     *
     * @param { string } locale - The locale to be used.
     * @returns { boolean } true representing the locale is an RTL locale
     * @syscap SystemCapability.Global.I18n
     * @since 7
     */
    /**
     * Judge whether the locale is RTL locale.
     *
     * @param { string } locale - The locale to be used.
     * @returns { boolean } true representing the locale is an RTL locale
     * @syscap SystemCapability.Global.I18n
     * @crossplatform
     * @since 10
     */
    /**
     * Judge whether the locale is RTL locale.
     *
     * @param { string } locale - The locale to be used.
     * @returns { boolean } true representing the locale is an RTL locale
     * @syscap SystemCapability.Global.I18n
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export function isRTL(locale: string): boolean;
    /**
     * Obtains a BreakIterator object for finding the location of break point in text.
     *
     * @param { string } locale - the returned BreakIterator will adapt the rule, specified by the locale, to break text.
     * @returns { BreakIterator } a newly constructed BreakIterator object.
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * Obtains a BreakIterator object for finding the location of break point in text.
     *
     * @param { string } locale - the returned BreakIterator will adapt the rule, specified by the locale, to break text.
     * @returns { BreakIterator } a newly constructed BreakIterator object.
     * @syscap SystemCapability.Global.I18n
     * @atomicservice
     * @since 12
     */
    export function getLineInstance(locale: string): BreakIterator;
    /**
     * The BreakIterator class is used for finding the location of break point in text.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * The BreakIterator class is used for finding the location of break point in text.
     *
     * @syscap SystemCapability.Global.I18n
     * @atomicservice
     * @since 12
     */
    export class BreakIterator {
        /**
         * Obtains the current position of the BreakIterator instance.
         *
         * @returns { number } the current position of the BreakIterator instance.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Obtains the current position of the BreakIterator instance.
         *
         * @returns { number } the current position of the BreakIterator instance.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        current(): number;
        /**
         * Set the BreakIterator's position to the first break point, the first break point is always the beginning of the
         * processed text.
         *
         * @returns { number } the index of the first break point.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Set the BreakIterator's position to the first break point, the first break point is always the beginning of the
         * processed text.
         *
         * @returns { number } the index of the first break point.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        first(): number;
        /**
         * Set the BreakIterator's position to the last break point. the last break point is always the index beyond the
         * last character of the processed text.
         *
         * @returns { number } the index of the last break point.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Set the BreakIterator's position to the last break point. the last break point is always the index beyond the
         * last character of the processed text.
         *
         * @returns { number } the index of the last break point.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        last(): number;
        /**
         * Set the BreakIterator's position to the nth break point from the current break point.
         *
         * @param { number } [index] - indicates the number of break points to advance. If index is not given, n is treated as 1.
         * @returns { number } the index of the BreakIterator after moving. If there is not enough break points, returns -1.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Set the BreakIterator's position to the nth break point from the current break point.
         *
         * @param { number } [index] - indicates the number of break points to advance. If index is not given, n is treated as 1.
         * @returns { number } the index of the BreakIterator after moving. If there is not enough break points, returns -1.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        next(index?: number): number;
        /**
         * Set the BreakIterator's position to the break point preceding the current break point.
         *
         * @returns { number } the index of the BreakIterator after moving. If there is not enough break points, returns -1.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Set the BreakIterator's position to the break point preceding the current break point.
         *
         * @returns { number } the index of the BreakIterator after moving. If there is not enough break points, returns -1.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        previous(): number;
        /**
         * Set the text to be processed.
         *
         * @param { string } text - Indicates the text to be processed by the BreakIterator.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Set the text to be processed.
         *
         * @param { string } text - Indicates the text to be processed by the BreakIterator.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        setLineBreakText(text: string): void;
        /**
         * Set the BreakIterator's position to the first break point following the specified offset.
         *
         * @param { number } offset
         * @returns { number } the index of the BreakIterator after moving. If there is not enough break points, returns -1.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Set the BreakIterator's position to the first break point following the specified offset.
         *
         * @param { number } offset
         * @returns { number } the index of the BreakIterator after moving. If there is not enough break points, returns -1.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        following(offset: number): number;
        /**
         * Obtains the text being processed.
         *
         * @returns { string } the text that is processed by the BreakIterator.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Obtains the text being processed.
         *
         * @returns { string } the text that is processed by the BreakIterator.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        getLineBreakText(): string;
        /**
         * Returns true if the position indicated by the offset is a break point, otherwise false. The BreakIterator's
         * position will be set to the position indicated by the offset if it returns true, otherwise the BreakIterator
         * will be moved to the break point following the offset.
         *
         * @param { number } offset The offset to be checked.
         * @returns { boolean } true if the offset is a break point.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Returns true if the position indicated by the offset is a break point, otherwise false. The BreakIterator's
         * position will be set to the position indicated by the offset if it returns true, otherwise the BreakIterator
         * will be moved to the break point following the offset.
         *
         * @param { number } offset The offset to be checked.
         * @returns { boolean } true if the offset is a break point.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        isBoundary(offset: number): boolean;
    }
    /**
     * Get IndexUtil object.
     *
     * @param { string } [locale] - Indicates a character string containing the locale information, including
     *               the language and optionally the script and region, for the NumberFormat object.
     * @returns { IndexUtil } IndexUtil object.
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * Get IndexUtil object.
     *
     * @param { string } [locale] - Indicates a character string containing the locale information, including
     *               the language and optionally the script and region, for the NumberFormat object.
     * @returns { IndexUtil } IndexUtil object.
     * @syscap SystemCapability.Global.I18n
     * @atomicservice
     * @since 12
     */
    export function getInstance(locale?: string): IndexUtil;
    /**
     * Sequence text can be grouped under the specified area,
     * and grouping index with different lengths can be specified.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * Sequence text can be grouped under the specified area,
     * and grouping index with different lengths can be specified.
     *
     * @syscap SystemCapability.Global.I18n
     * @atomicservice
     * @since 12
     */
    export class IndexUtil {
        /**
         * Get a list of labels for use as a UI index
         *
         * @returns { Array<string> } a list of labels
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Get a list of labels for use as a UI index
         *
         * @returns { Array<string> } a list of labels
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        getIndexList(): Array<string>;
        /**
         * Add the index characters from a Locale to the index.
         *
         * @param { string } locale - The locale whose index characters are to be added.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Add the index characters from a Locale to the index.
         *
         * @param { string } locale - The locale whose index characters are to be added.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        addLocale(locale: string): void;
        /**
         * Get corresponding index of the input text.
         *
         * @param { string } text - input text
         * @returns { string } index of the input text
         * @syscap SystemCapability.Global.I18n
         * @since 8
         */
        /**
         * Get corresponding index of the input text.
         *
         * @param { string } text - input text
         * @returns { string } index of the input text
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        getIndex(text: string): string;
    }
    /**
     * Provides the API for accessing unicode character properties. For example, determine whether a character is a number.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 8
     * @deprecated since 9
     * @useinstead Unicode
     */
    export class Character {
        /**
         * Determines whether the specified code point is a digit character
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a digit character
         * @syscap SystemCapability.Global.I18n
         * @since 8
         * @deprecated since 9
         * @useinstead Unicode.isDigit
         */
        isDigit(char: string): boolean;
        /**
         * Determines if the specified character is a space character or not.
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a space character
         * @syscap SystemCapability.Global.I18n
         * @since 8
         * @deprecated since 9
         * @useinstead Unicode.isSpaceChar
         */
        isSpaceChar(char: string): boolean;
        /**
         * Determines if the specified character is a whitespace character
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a whitespace character
         * @syscap SystemCapability.Global.I18n
         * @since 8
         * @deprecated since 9
         * @useinstead Unicode.isWhitespace
         */
        isWhitespace(char: string): boolean;
        /**
         * Determines if the specified character is a RTL character or not.
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a RTL character
         * @syscap SystemCapability.Global.I18n
         * @since 8
         * @deprecated since 9
         * @useinstead Unicode.isRTL
         */
        isRTL(char: string): boolean;
        /**
         * Determines if the specified character is a Ideographic character or not.
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a Ideographic character
         * @syscap SystemCapability.Global.I18n
         * @since 8
         * @deprecated since 9
         * @useinstead Unicode.isIdeograph
         */
        isIdeograph(char: string): boolean;
        /**
         * Determines if the specified character is a Letter or not.
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a Letter
         * @syscap SystemCapability.Global.I18n
         * @since 8
         * @deprecated since 9
         * @useinstead Unicode.isLetter
         */
        isLetter(char: string): boolean;
        /**
         * Determines if the specified character is a LowerCase character or not.
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a LowerCase character
         * @syscap SystemCapability.Global.I18n
         * @since 8
         * @deprecated since 9
         * @useinstead Unicode.isLowerCase
         */
        isLowerCase(char: string): boolean;
        /**
         * Determines if the specified character is a UpperCase character or not.
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a UpperCase character
         * @syscap SystemCapability.Global.I18n
         * @since 8
         * @deprecated since 9
         * @useinstead Unicode.isUpperCase
         */
        isUpperCase(char: string): boolean;
        /**
         * Get the general category value of the specified character.
         *
         * @param { string } char - the character to be tested
         * @returns { string } the general category of the specified character.
         * @syscap SystemCapability.Global.I18n
         * @since 8
         * @deprecated since 9
         * @useinstead Unicode.getType
         */
        getType(char: string): string;
    }
    /**
     * Provides the API for accessing unicode character properties. For example, determine whether a character is a number.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    /**
     * Provides the API for accessing unicode character properties. For example, determine whether a character is a number.
     *
     * @syscap SystemCapability.Global.I18n
     * @crossplatform
     * @since 10
     */
    /**
     * Provides the API for accessing unicode character properties. For example, determine whether a character is a number.
     *
     * @syscap SystemCapability.Global.I18n
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export class Unicode {
        /**
         * Determines whether the specified code point is a digit character
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a digit character
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Determines whether the specified code point is a digit character
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a digit character
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Determines whether the specified code point is a digit character
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a digit character
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        static isDigit(char: string): boolean;
        /**
         * Determines if the specified character is a space character or not.
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a space character
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Determines if the specified character is a space character or not.
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a space character
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Determines if the specified character is a space character or not.
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a space character
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        static isSpaceChar(char: string): boolean;
        /**
         * Determines if the specified character is a whitespace character
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a whitespace character
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Determines if the specified character is a whitespace character
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a whitespace character
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Determines if the specified character is a whitespace character
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a whitespace character
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        static isWhitespace(char: string): boolean;
        /**
         * Determines if the specified character is a RTL character or not.
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a RTL character
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Determines if the specified character is a RTL character or not.
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a RTL character
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Determines if the specified character is a RTL character or not.
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a RTL character
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        static isRTL(char: string): boolean;
        /**
         * Determines if the specified character is a Ideographic character or not.
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a Ideographic character
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Determines if the specified character is a Ideographic character or not.
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a Ideographic character
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Determines if the specified character is a Ideographic character or not.
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a Ideographic character
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        static isIdeograph(char: string): boolean;
        /**
         * Determines if the specified character is a Letter or not.
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a Letter
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Determines if the specified character is a Letter or not.
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a Letter
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Determines if the specified character is a Letter or not.
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a Letter
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        static isLetter(char: string): boolean;
        /**
         * Determines if the specified character is a LowerCase character or not.
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a LowerCase character
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Determines if the specified character is a LowerCase character or not.
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a LowerCase character
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Determines if the specified character is a LowerCase character or not.
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a LowerCase character
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        static isLowerCase(char: string): boolean;
        /**
         * Determines if the specified character is a UpperCase character or not.
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a UpperCase character
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Determines if the specified character is a UpperCase character or not.
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a UpperCase character
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Determines if the specified character is a UpperCase character or not.
         *
         * @param { string } char - the character to be tested
         * @returns { boolean } true if the character is a UpperCase character
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        static isUpperCase(char: string): boolean;
        /**
         * Get the general category value of the specified character.
         *
         * @param { string } char - the character to be tested
         * @returns { string } the general category of the specified character.
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Get the general category value of the specified character.
         *
         * @param { string } char - the character to be tested
         * @returns { string } the general category of the specified character.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Get the general category value of the specified character.
         *
         * @param { string } char - the character to be tested
         * @returns { string } the general category of the specified character.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        static getType(char: string): string;
    }
    /**
     * check out whether system is 24-hour system.
     *
     * @returns { boolean } a boolean represent whether system is 24-hour system.
     * @syscap SystemCapability.Global.I18n
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.i18n/i18n.System#is24HourClock
     */
    export function is24HourClock(): boolean;
    /**
     * set 24-hour system.
     *
     * @permission ohos.permission.UPDATE_CONFIGURATION
     * @param { boolean } option - represent the boolean to be set.
     * @returns { boolean } a boolean represent whether setting 24-hour system success.
     * @syscap SystemCapability.Global.I18n
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.i18n/i18n.System#set24HourClock
     */
    export function set24HourClock(option: boolean): boolean;
    /**
     * Add one language to preferred language List.
     *
     * @permission ohos.permission.UPDATE_CONFIGURATION
     * @param { string } language - the language to be added.
     * @param { number } [index] - the position of preferred language list to be inserted.
     * @returns { boolean } a boolean represent whether language added success.
     * @syscap SystemCapability.Global.I18n
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.i18n/i18n.System#addPreferredLanguage
     */
    export function addPreferredLanguage(language: string, index?: number): boolean;
    /**
     * Remove one language from preferred language list.
     *
     * @permission ohos.permission.UPDATE_CONFIGURATION
     * @param { number } index - the position of removed language in preferred language list.
     * @returns { boolean } a boolean represent whether removed success.
     * @syscap SystemCapability.Global.I18n
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.i18n/i18n.System#removePreferredLanguage
     */
    export function removePreferredLanguage(index: number): boolean;
    /**
     * Access the system preferred language list.
     *
     * @returns { Array<string> } a string Array represent the preferred language list.
     * @syscap SystemCapability.Global.I18n
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.i18n/i18n.System#getPreferredLanguageList
     */
    export function getPreferredLanguageList(): Array<string>;
    /**
     * Get the first preferred language of system.
     *
     * @returns { string } a string represent the first preferred language of system.
     * @syscap SystemCapability.Global.I18n
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.i18n/i18n.System#getFirstPreferredLanguage
     */
    export function getFirstPreferredLanguage(): string;
    /**
     * Get the default TimeZone object or the TimeZone object corresponds to zoneID.
     *
     * @param { string } [zoneID] - TimeZone ID used to create TimeZone Object.
     * @returns { TimeZone } a TimeZone object corresponds to zoneID.
     * @syscap SystemCapability.Global.I18n
     * @since 7
     */
    /**
     * Get the default TimeZone object or the TimeZone object corresponds to zoneID.
     *
     * @param { string } [zoneID] - TimeZone ID used to create TimeZone Object.
     * @returns { TimeZone } a TimeZone object corresponds to zoneID.
     * @syscap SystemCapability.Global.I18n
     * @crossplatform
     * @since 10
     */
    /**
     * Get the default TimeZone object or the TimeZone object corresponds to zoneID.
     *
     * @param { string } [zoneID] - TimeZone ID used to create TimeZone Object.
     * @returns { TimeZone } a TimeZone object corresponds to zoneID.
     * @syscap SystemCapability.Global.I18n
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export function getTimeZone(zoneID?: string): TimeZone;
    /**
     * Provides the API for accessing TimeZone name, rawOffset and offset information.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 7
     */
    /**
     * Provides the API for accessing TimeZone name, rawOffset and offset information.
     *
     * @syscap SystemCapability.Global.I18n
     * @crossplatform
     * @since 10
     */
    /**
     * Provides the API for accessing TimeZone name, rawOffset and offset information.
     *
     * @syscap SystemCapability.Global.I18n
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export class TimeZone {
        /**
         * Get the id of the TimeZone object.
         *
         * @returns { string } a string represents the timezone id.
         * @syscap SystemCapability.Global.I18n
         * @since 7
         */
        /**
         * Get the id of the TimeZone object.
         *
         * @returns { string } a string represents the timezone id.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Get the id of the TimeZone object.
         *
         * @returns { string } a string represents the timezone id.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getID(): string;
        /**
         * Get the displayName of the TimeZone Object under the locale.
         *
         * @param { string } [locale] - the locale tag use to display timezone object's name.
         * @param { boolean } [isDST] - wether consider daylight saving time when display timezone object's name.
         * @returns { string } a string represents the display name.
         * @syscap SystemCapability.Global.I18n
         * @since 7
         */
        /**
         * Get the displayName of the TimeZone Object under the locale.
         *
         * @param { string } [locale] - the locale tag use to display timezone object's name.
         * @param { boolean } [isDST] - wether consider daylight saving time when display timezone object's name.
         * @returns { string } a string represents the display name.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        getDisplayName(locale?: string, isDST?: boolean): string;
        /**
         * Get the raw offset of the TimeZone object.
         *
         * @returns { number } a number represents the raw offset.
         * @syscap SystemCapability.Global.I18n
         * @since 7
         */
        /**
         * Get the raw offset of the TimeZone object.
         *
         * @returns { number } a number represents the raw offset.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Get the raw offset of the TimeZone object.
         *
         * @returns { number } a number represents the raw offset.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getRawOffset(): number;
        /**
         * Get the offset of the TimeZone object.
         *
         * @param { number } [date] - Indicates a date use to compute offset.
         * @returns { number } a number represents the offset with date.
         * @syscap SystemCapability.Global.I18n
         * @since 7
         */
        /**
         * Get the offset of the TimeZone object.
         *
         * @param { number } [date] - Indicates a date use to compute offset.
         * @returns { number } a number represents the offset with date.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Get the offset of the TimeZone object.
         *
         * @param { number } [date] - Indicates a date use to compute offset.
         * @returns { number } a number represents the offset with date.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getOffset(date?: number): number;
        /**
         * Get available TimeZone ID list.
         *
         * @returns { Array<string> } a string array represents the available TimeZone ID list.
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Get available TimeZone ID list.
         *
         * @returns { Array<string> } a string array represents the available TimeZone ID list.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @since 10
         */
        /**
         * Get available TimeZone ID list.
         *
         * @returns { Array<string> } a string array represents the available TimeZone ID list.
         * @syscap SystemCapability.Global.I18n
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        static getAvailableIDs(): Array<string>;
        /**
         * Get available Zone City ID list.
         *
         * @returns { Array<string> } a string array represents the available Zone City ID list.
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Get available Zone City ID list.
         *
         * @returns { Array<string> } a string array represents the available Zone City ID list.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        static getAvailableZoneCityIDs(): Array<string>;
        /**
         * Get City display name in a certain locale.
         *
         * @param { string } cityID - Zone City ID.
         * @param { string } locale - locale used to display city name.
         * @returns { string } a string represents the display name of City in locale.
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Get City display name in a certain locale.
         *
         * @param { string } cityID - Zone City ID.
         * @param { string } locale - locale used to display city name.
         * @returns { string } a string represents the display name of City in locale.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        static getCityDisplayName(cityID: string, locale: string): string;
        /**
         * Get TimeZone Object from city ID.
         *
         * @param { string } cityID - Zone City ID.
         * @returns { TimeZone } a TimeZone Object from city ID.
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Get TimeZone Object from city ID.
         *
         * @param { string } cityID - Zone City ID.
         * @returns { TimeZone } a TimeZone Object from city ID.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        static getTimezoneFromCity(cityID: string): TimeZone;
        /**
         * Get the possible time zones from the specified longitude and latitude.
         *
         * @param { number } longitude value
         * @param { number } latitude value
         * @returns { Array<TimeZone> } Returns a TimeZone array from the specified longitude and latitude.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 890001 - Invalid parameter. Possible causes: Parameter verification failed.
         * @syscap SystemCapability.Global.I18n
         * @since 10
         */
        /**
         * Get the possible time zones from the specified longitude and latitude.
         *
         * @param { number } longitude value
         * @param { number } latitude value
         * @returns { Array<TimeZone> } Returns a TimeZone array from the specified longitude and latitude.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 890001 - Invalid parameter. Possible causes: Parameter verification failed.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        static getTimezonesByLocation(longitude: number, latitude: number): Array<TimeZone>;
    }
    /**
     * Provides the API for transliterate text from one format to another.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    /**
     * Provides the API for transliterate text from one format to another.
     *
     * @syscap SystemCapability.Global.I18n
     * @atomicservice
     * @since 12
     */
    export class Transliterator {
        /**
         * Get a string array of all available transliterator ids.
         *
         * @returns { string[] } a string array of all available transliterator ids.
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Get a string array of all available transliterator ids.
         *
         * @returns { string[] } a string array of all available transliterator ids.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        static getAvailableIDs(): string[];
        /**
         * Get a Transliterator that is specified by id name.
         *
         * @param { string } id - specified the type of Transliterator. id is formed by source and dest. Transliterator will transliterate
         *           the input string from source format to the dest format. For example, a Simplified Chinese to Latn
         *           Transliterator will transform the text written in Chinese to Latn characters.
         * @returns { Transliterator } Transliterator that is specified by id name.
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Get a Transliterator that is specified by id name.
         *
         * @param { string } id - specified the type of Transliterator. id is formed by source and dest. Transliterator will transliterate
         *           the input string from source format to the dest format. For example, a Simplified Chinese to Latn
         *           Transliterator will transform the text written in Chinese to Latn characters.
         * @returns { Transliterator } Transliterator that is specified by id name.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        static getInstance(id: string): Transliterator;
        /**
         * Transform the input text.
         *
         * @param { string } text - text to be transliterated.
         * @returns { string } the output text that is transliterated from source format to the dest format.
         * @syscap SystemCapability.Global.I18n
         * @since 9
         */
        /**
         * Transform the input text.
         *
         * @param { string } text - text to be transliterated.
         * @returns { string } the output text that is transliterated from source format to the dest format.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        transform(text: string): string;
    }
    /**
     * Enumerates the Normalizer modes.
     *
     * @enum { number }
     * @syscap SystemCapability.Global.I18n
     * @since 10
     */
    /**
     * Enumerates the Normalizer modes.
     *
     * @enum { number }
     * @syscap SystemCapability.Global.I18n
     * @atomicservice
     * @since 12
     */
    export enum NormalizerMode {
        /**
         * Normalization form C, characters are decomposed and then re-composed by canonical equivalence
         *
         * @syscap SystemCapability.Global.I18n
         * @since 10
         */
        /**
         * Normalization form C, characters are decomposed and then re-composed by canonical equivalence
         *
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        NFC = 1,
        /**
         * Normalization form D, characters are decomposed by canonical equivalence
         *
         * @syscap SystemCapability.Global.I18n
         * @since 10
         */
        /**
         * Normalization form D, characters are decomposed by canonical equivalence
         *
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        NFD = 2,
        /**
         * Normalization form KC, characters are decomposed by compatibility, then re-composed by canonical equivalence
         *
         * @syscap SystemCapability.Global.I18n
         * @since 10
         */
        /**
         * Normalization form KC, characters are decomposed by compatibility, then re-composed by canonical equivalence
         *
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        NFKC = 3,
        /**
         * Normalization form KD, characters are decomposed by compatibility
         *
         * @syscap SystemCapability.Global.I18n
         * @since 10
         */
        /**
         * Normalization form KD, characters are decomposed by compatibility
         *
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        NFKD = 4
    }
    /**
     * Provides the API for text encoding normalization.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 10
     */
    /**
     * Provides the API for text encoding normalization.
     *
     * @syscap SystemCapability.Global.I18n
     * @atomicservice
     * @since 12
     */
    export class Normalizer {
        /**
         * Get a Normalizer that is specified by normalize mode.
         *
         * @param { NormalizerMode } mode - specified the mode of Normalizer. It must be a valid mode.
         * @returns { Normalizer } Transliterator that is specified by id name.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @syscap SystemCapability.Global.I18n
         * @since 10
         */
        /**
         * Get a Normalizer that is specified by normalize mode.
         *
         * @param { NormalizerMode } mode - specified the mode of Normalizer. It must be a valid mode.
         * @returns { Normalizer } Transliterator that is specified by id name.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        static getInstance(mode: NormalizerMode): Normalizer;
        /**
         * Get a normalized string of specified mode.
         *
         * @param { string } text - text to normalized.
         * @returns { string } a normalized string from source.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @syscap SystemCapability.Global.I18n
         * @since 10
         */
        /**
         * Get a normalized string of specified mode.
         *
         * @param { string } text - text to normalized.
         * @returns { string } a normalized string from source.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        normalize(text: string): string;
    }
    /**
     * Provides the informations of one holiday.
     *
     * @interface HolidayInfoItem
     * @syscap SystemCapability.Global.I18n
     * @since 11
     */
    /**
     * Provides the informations of one holiday.
     *
     * @interface HolidayInfoItem
     * @syscap SystemCapability.Global.I18n
     * @atomicservice
     * @since 12
     */
    export interface HolidayInfoItem {
        /**
         * Holiday base name.
         *
         * @type { string }
         * @syscap SystemCapability.Global.I18n
         * @since 11
         */
        /**
         * Holiday base name.
         *
         * @type { string }
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        baseName: string;
        /**
         * Holiday start year.
         *
         * @type { number }
         * @syscap SystemCapability.Global.I18n
         * @since 11
         */
        /**
         * Holiday start year.
         *
         * @type { number }
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        year: number;
        /**
         * Holiday start month.
         *
         * @type { number }
         * @syscap SystemCapability.Global.I18n
         * @since 11
         */
        /**
         * Holiday start month.
         *
         * @type { number }
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        month: number;
        /**
         * Holiday start day.
         *
         * @type { number }
         * @syscap SystemCapability.Global.I18n
         * @since 11
         */
        /**
         * Holiday start day.
         *
         * @type { number }
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        day: number;
        /**
         * Holiday local name array.
         *
         * @type { ?Array<HolidayLocalName> }
         * @syscap SystemCapability.Global.I18n
         * @since 11
         */
        /**
         * Holiday local name array.
         *
         * @type { ?Array<HolidayLocalName> }
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        localNames?: Array<HolidayLocalName>;
    }
    /**
     * Provides the informations holiday locale name.
     *
     * @interface HolidayLocalName
     * @syscap SystemCapability.Global.I18n
     * @since 11
     */
    /**
     * Provides the informations holiday locale name.
     *
     * @interface HolidayLocalName
     * @syscap SystemCapability.Global.I18n
     * @atomicservice
     * @since 12
     */
    export interface HolidayLocalName {
        /**
         * Holiday locale name language id.
         *
         * @type { string }
         * @syscap SystemCapability.Global.I18n
         * @since 11
         */
        /**
         * Holiday locale name language id.
         *
         * @type { string }
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        language: string;
        /**
         * Holiday local name.
         *
         * @type { string }
         * @syscap SystemCapability.Global.I18n
         * @since 11
         */
        /**
         * Holiday local name.
         *
         * @type { string }
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        name: string;
    }
    /**
     * Provide some functions to manage holidays in a country or region. Partly follows the RFC2445 standard.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 11
     */
    /**
     * Provide some functions to manage holidays in a country or region. Partly follows the RFC2445 standard.
     *
     * @syscap SystemCapability.Global.I18n
     * @atomicservice
     * @since 12
     */
    export class HolidayManager {
        /**
         * A constructor used to create a HolidayManager object.
         *
         * @param { String } icsPath - the path of the iCalendar format file to create HolidayManager object.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 890001 - Invalid parameter. Possible causes: Parameter verification failed.
         * @syscap SystemCapability.Global.I18n
         * @since 11
         */
        /**
         * A constructor used to create a HolidayManager object.
         *
         * @param { String } icsPath - the path of the iCalendar format file to create HolidayManager object.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 890001 - Invalid parameter. Possible causes: Parameter verification failed.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        constructor(icsPath: String);
        /**
         * Returns true if the given date is a holiday. If the date is not given,
         *  the date object of current time is used.
         *
         * @param { Date } [date] - Date object whose attribute is desired.
         * @returns { boolean } whether the date is a holiday day.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @syscap SystemCapability.Global.I18n
         * @since 11
         */
        /**
         * Returns true if the given date is a holiday. If the date is not given,
         *  the date object of current time is used.
         *
         * @param { Date } [date] - Date object whose attribute is desired.
         * @returns { boolean } whether the date is a holiday day.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        isHoliday(date?: Date): boolean;
        /**
         * Obtains holiday info array for a specified year
         *
         * @param { number } [year] - specified holiday year. If the year is not given,
         *  the current year is used.
         * @returns { Array<HolidayInfoItem> } holiday information array for one year.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 890001 - Invalid parameter. Possible causes: Parameter verification failed.
         * @syscap SystemCapability.Global.I18n
         * @since 11
         */
        /**
         * Obtains holiday info array for a specified year
         *
         * @param { number } [year] - specified holiday year. If the year is not given,
         *  the current year is used.
         * @returns { Array<HolidayInfoItem> } holiday information array for one year.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 890001 - Invalid parameter. Possible causes: Parameter verification failed.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        getHolidayInfoItemArray(year?: number): Array<HolidayInfoItem>;
    }
    /**
     * Provides the informations of one entity.
     *
     * @interface EntityInfoItem
     * @syscap SystemCapability.Global.I18n
     * @since 11
     */
    /**
     * Provides the informations of one entity.
     *
     * @interface EntityInfoItem
     * @syscap SystemCapability.Global.I18n
     * @atomicservice
     * @since 12
     */
    export interface EntityInfoItem {
        /**
         * Entity begin position.
         *
         * @type { number }
         * @syscap SystemCapability.Global.I18n
         * @since 11
         */
        /**
         * Entity begin position.
         *
         * @type { number }
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        begin: number;
        /**
         * Entity end position.
         *
         * @type { number }
         * @syscap SystemCapability.Global.I18n
         * @since 11
         */
        /**
         * Entity end position.
         *
         * @type { number }
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        end: number;
        /**
         * Entity type. Field values such as phone_number, date
         *
         * @type { string }
         * @syscap SystemCapability.Global.I18n
         * @since 11
         */
        /**
         * Entity type. Field values such as phone_number, date
         *
         * @type { string }
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        type: string;
    }
    /**
     * Provide some functions to find named entity in text.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 11
     */
    /**
     * Provide some functions to find named entity in text.
     *
     * @syscap SystemCapability.Global.I18n
     * @atomicservice
     * @since 12
     */
    export class EntityRecognizer {
        /**
         * A constructor used to create a EntityRecognizer object.
         *
         * @param { string } [locale] - specified the locale. Use current app locale by default. It must be a valid locale.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 890001 - Invalid parameter. Possible causes: Parameter verification failed.
         * @syscap SystemCapability.Global.I18n
         * @since 11
         */
        /**
         * A constructor used to create a EntityRecognizer object.
         *
         * @param { string } [locale] - specified the locale. Use current app locale by default. It must be a valid locale.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 890001 - Invalid parameter. Possible causes: Parameter verification failed.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        constructor(locale?: string);
        /**
         * Obtains holiday info array for a specified text
         *
         * @param { string } text - the text to find entities.
         * @returns { Array<EntityInfoItem> } entity information array found.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @syscap SystemCapability.Global.I18n
         * @since 11
         */
        /**
         * Obtains holiday info array for a specified text
         *
         * @param { string } text - the text to find entities.
         * @returns { Array<EntityInfoItem> } entity information array found.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @syscap SystemCapability.Global.I18n
         * @atomicservice
         * @since 12
         */
        findEntityInfo(text: string): Array<EntityInfoItem>;
    }
}
export default i18n;
