/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
 * @kit FormKit
 */

/**
 * Interface of formBindingData.
 *
 * @namespace formBindingData
 * @syscap SystemCapability.Ability.Form
 * @since 9
 */
/**
 * Interface of formBindingData.
 *
 * @namespace formBindingData
 * @syscap SystemCapability.Ability.Form
 * @atomicservice
 * @since 11
 */
declare namespace formBindingData {
    /**
     * Create an FormBindingData instance.
     *
     * @param { Object | string } [obj] - Indicates the FormBindingData instance data.
     * @returns { FormBindingData } Returns the FormBindingData.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    /**
     * Create an FormBindingData instance.
     *
     * @param { Object | string } [obj] - Indicates the FormBindingData instance data.
     * @returns { FormBindingData } Returns the FormBindingData.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     *     1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed.
     * @syscap SystemCapability.Ability.Form
     * @atomicservice
     * @since 11
     */
    function createFormBindingData(obj?: Object | string): FormBindingData;
    /**
     * Defines the createFormBindingData result interface.
     *
     * @typedef FormBindingData
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    /**
     * Defines the createFormBindingData result interface.
     *
     * @typedef FormBindingData
     * @syscap SystemCapability.Ability.Form
     * @atomicservice
     * @since 11
     */
    interface FormBindingData {
        /**
         * Data for updating.
         *
         * @type { Object }
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        /**
         * Data for updating.
         *
         * @type { Object }
         * @syscap SystemCapability.Ability.Form
         * @atomicservice
         * @since 11
         */
        data: Object;
        /**
         * proxies for updating.
         *
         * @type { ?Array<ProxyData> }
         * @syscap SystemCapability.Ability.Form
         * @StageModelOnly
         * @since 10
         */
        /**
         * proxies for updating.
         *
         * @type { ?Array<ProxyData> }
         * @syscap SystemCapability.Ability.Form
         * @StageModelOnly
         * @atomicservice
         * @since 11
         */
        proxies?: Array<ProxyData>;
    }
    /**
     * Defines the form proxy data.
     *
     * @typedef ProxyData
     * @syscap SystemCapability.Ability.Form
     * @StageModelOnly
     * @since 10
     */
    /**
     * Defines the form proxy data.
     *
     * @typedef ProxyData
     * @syscap SystemCapability.Ability.Form
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    interface ProxyData {
        /**
         * Key for proxy. The value depend data publisher.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @StageModelOnly
         * @since 10
         */
        /**
         * Key for proxy. The value depend data publisher.
         *
         * @type { string }
         * @syscap SystemCapability.Ability.Form
         * @StageModelOnly
         * @atomicservice
         * @since 11
         */
        key: string;
        /**
         * SubscriberId. The value depend data publisher. The default value is current formId.
         *
         * @type { ?string }
         * @syscap SystemCapability.Ability.Form
         * @StageModelOnly
         * @since 10
         */
        /**
         * SubscriberId. The value depend data publisher. The default value is current formId.
         *
         * @type { ?string }
         * @syscap SystemCapability.Ability.Form
         * @StageModelOnly
         * @atomicservice
         * @since 11
         */
        subscriberId?: string;
    }
}
export default formBindingData;
