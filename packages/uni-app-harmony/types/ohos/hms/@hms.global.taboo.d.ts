/*
 * Copyright (c) 2023 Huawei Device Co., Ltd. All rights reserved.
 */
import { BusinessError } from '@ohos.base';
/**
 * Provides taboo related APIs to deal with political, religious, or cultural data.
 *
 * @namespace taboo
 * @syscap SystemCapability.Global.I18nExt
 * @since 4.0.0(10)
 */
declare namespace taboo {
    /**
     * Provides APIs for obtaining taboo information which is used to avoid political, religious, or cultural complaints.
     *
     * @syscap SystemCapability.Global.I18nExt
     * @since 4.0.0(10)
     */
    export class Taboo {
        /**
         * A constructor used to create a Taboo object.
         *
         * @syscap SystemCapability.Global.I18nExt
         * @since 4.0.0(10)
         */
        constructor();
        /**
         * Obtain blocked language array.
         *
         * @returns { Array<string> } a array containing language codes that are not allowed.
         * @syscap SystemCapability.Global.I18nExt
         * @since 4.0.0(10)
         */
        getBlockedLanguages(): Array<string>;
        /**
         * Obtain blocked region array.
         *
         * @param { string } language - Specifies the language in which the region is not allowed.
         * @returns { Array<string> } a array containing region codes that are not allowed.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 890001 - param value not valid
         * @syscap SystemCapability.Global.I18nExt
         * @since 4.0.0(10)
         */
        getBlockedRegions(language: string): Array<string>;
        /**
         * Obtain blocked city array.
         *
         * @returns { Array<string> } a array containing city codes that are not allowed.
         * @syscap SystemCapability.Global.I18nExt
         * @since 4.0.0(10)
         */
        getBlockedCities(): Array<string>;
    }
}
export default taboo;
