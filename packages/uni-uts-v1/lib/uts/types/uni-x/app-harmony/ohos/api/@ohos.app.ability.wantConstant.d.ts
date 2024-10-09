/*
 * Copyright (c) 2022-2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License"),
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
 * the constant for params and flags in the want
 *
 * @namespace wantConstant
 * @syscap SystemCapability.Ability.AbilityBase
 * @since 9
 */
/**
 * the constant for params and flags in the want
 *
 * @namespace wantConstant
 * @syscap SystemCapability.Ability.AbilityBase
 * @atomicservice
 * @since 11
 */
declare namespace wantConstant {
    /**
     * The constant for params of the want
     *
     * @enum { string }
     * @syscap SystemCapability.Ability.AbilityBase
     * @since 9
     */
    /**
     * The constant for params of the want
     *
     * @enum { string }
     * @syscap SystemCapability.Ability.AbilityBase
     * @atomicservice
     * @since 11
     */
    export enum Params {
        /**
         * Indicates the ability in this want can back to the current top ability even though they are not in the same
         * mission stack.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @since 9
         */
        /**
         * Indicates the ability in this want can back to the current top ability even though they are not in the same
         * mission stack.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 11
         */
        ABILITY_BACK_TO_OTHER_MISSION_STACK = 'ability.params.backToOtherMissionStack',
        /**
         * Indicates the param of ability failure restart recovery identification
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @since 10
         */
        /**
         * Indicates the param of ability failure restart recovery identification
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 11
         */
        ABILITY_RECOVERY_RESTART = 'ohos.ability.params.abilityRecoveryRestart',
        /**
         * Indicates the param of extra content title
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @since 10
         */
        /**
         * Indicates the param of extra content title
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 11
         */
        CONTENT_TITLE_KEY = 'ohos.extra.param.key.contentTitle',
        /**
         * Indicates the param of extra shared abstract
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @since 10
         */
        /**
         * Indicates the param of extra shared abstract
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 11
         */
        SHARE_ABSTRACT_KEY = 'ohos.extra.param.key.shareAbstract',
        /**
         * Indicates the param of extra shareURL
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @since 10
         */
        /**
         * Indicates the param of extra shareURL
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 11
         */
        SHARE_URL_KEY = 'ohos.extra.param.key.shareUrl',
        /**
         * Indicates the param of extra support continue page stack.
         * The default value of the param is true,
         * and the system will automatically flow the page stack information by default.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @since 10
         */
        /**
         * Indicates the param of extra support continue page stack.
         * The default value of the param is true,
         * and the system will automatically flow the page stack information by default.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 11
         */
        SUPPORT_CONTINUE_PAGE_STACK_KEY = 'ohos.extra.param.key.supportContinuePageStack',
        /**
         * Indicates the param of extra stop source ability on continue.
         * The default value of the param is true,
         * and the system will exit the source application by default.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @since 10
         */
        /**
         * Indicates the param of extra stop source ability on continue.
         * The default value of the param is true,
         * and the system will exit the source application by default.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 11
         */
        SUPPORT_CONTINUE_SOURCE_EXIT_KEY = 'ohos.extra.param.key.supportContinueSourceExit',
        /**
         * Indicates the param of show mode key.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 12
         */
        SHOW_MODE_KEY = 'ohos.extra.param.key.showMode',
        /**
         * Cross-application sharing of file URIs.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 12
         */
        PARAMS_STREAM = 'ability.params.stream',
        /**
         * Indicates the param of app clone index.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 12
         */
        APP_CLONE_INDEX_KEY = 'ohos.extra.param.key.appCloneIndex',
        /**
         * Indicates the param of page path.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 12
         */
        PAGE_PATH = 'ohos.param.atomicservice.pagePath',
        /**
         * Indicates the param of router name.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 12
         */
        ROUTER_NAME = 'ohos.param.atomicservice.routerName',
        /**
         * Indicates the param of page source file.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 12
         */
        PAGE_SOURCE_FILE = 'ohos.param.atomicservice.pageSourceFile',
        /**
         * Indicates the param of build function.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 12
         */
        BUILD_FUNCTION = 'ohos.param.atomicservice.buildFunction',
        /**
         * Indicates the param of subpackage name.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 12
         */
        SUB_PACKAGE_NAME = 'ohos.param.atomicservice.subpackageName'
    }
    /**
     * Used to indicate how Want is handled.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityBase
     * @since 9
     */
    /**
     * Used to indicate how Want is handled.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityBase
     * @atomicservice
     * @since 11
     */
    export enum Flags {
        /**
         * Indicates the grant to perform read operations on the URI.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @since 9
         */
        /**
         * Indicates the grant to perform read operations on the URI.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 11
         */
        FLAG_AUTH_READ_URI_PERMISSION = 0x00000001,
        /**
         * Indicates the grant to perform write operations on the URI.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @since 9
         */
        /**
         * Indicates the grant to perform write operations on the URI.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 11
         */
        FLAG_AUTH_WRITE_URI_PERMISSION = 0x00000002,
        /**
         * Indicates that the URI can be persisted by the callee.
         * @syscap SystemCapability.Ability.AbilityBase
         * @since 12
         */
        FLAG_AUTH_PERSISTABLE_URI_PERMISSION = 0x00000040,
        /**
         * Install the specified ability if it's not installed.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @since 9
         */
        /**
         * Install the specified ability if it's not installed.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 11
         */
        FLAG_INSTALL_ON_DEMAND = 0x00000800,
        /**
         * Indicates that if implicit start ability couldn't match any application, no tip dialog will be pulled up.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @since 11
         */
        FLAG_START_WITHOUT_TIPS = 0x40000000
    }
    /**
     * Used to indicate show mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityBase
     * @atomicservice
     * @since 12
     */
    export enum ShowMode {
        /**
         * Indicates the window show mode.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 12
         */
        WINDOW = 0,
        /**
         * Indicates the embedded full show mode.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 12
         */
        EMBEDDED_FULL = 1
    }
}
export default wantConstant;
