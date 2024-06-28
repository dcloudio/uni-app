/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
 * The definition of ConfigurationConstant.
 *
 * @namespace ConfigurationConstant
 * @syscap SystemCapability.Ability.AbilityBase
 * @since 9
 */
/**
 * The definition of ConfigurationConstant.
 *
 * @namespace ConfigurationConstant
 * @syscap SystemCapability.Ability.AbilityBase
 * @atomicservice
 * @since 11
 */
/**
 * The definition of ConfigurationConstant.
 *
 * @namespace ConfigurationConstant
 * @syscap SystemCapability.Ability.AbilityBase
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare namespace ConfigurationConstant {
    /**
     * Color mode
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityBase
     * @since 9
     */
    /**
     * Color mode
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityBase
     * @crossplatform
     * @since 10
     */
    /**
     * Color mode
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityBase
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export enum ColorMode {
        /**
         * The color mode is not set.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @since 9
         */
        /**
         * The color mode is not set.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @crossplatform
         * @since 10
         */
        /**
         * The color mode is not set.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        COLOR_MODE_NOT_SET = -1,
        /**
         * Dark mode.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @since 9
         */
        /**
         * Dark mode.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @crossplatform
         * @since 10
         */
        /**
         * Dark mode.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        COLOR_MODE_DARK = 0,
        /**
         * Light mode.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @since 9
         */
        /**
         * Light mode.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @crossplatform
         * @since 10
         */
        /**
         * Light mode.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        COLOR_MODE_LIGHT = 1
    }
    /**
     * Screen direction.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityBase
     * @since 9
     */
    /**
     * Screen direction.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityBase
     * @crossplatform
     * @since 10
     */
    /**
     * Screen direction.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityBase
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export enum Direction {
        /**
         * The direction is not set.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @since 9
         */
        /**
         * The direction is not set.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @crossplatform
         * @since 10
         */
        /**
         * The direction is not set.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        DIRECTION_NOT_SET = -1,
        /**
         * Vertical direction.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @since 9
         */
        /**
         * Vertical direction.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @crossplatform
         * @since 10
         */
        /**
         * Vertical direction.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        DIRECTION_VERTICAL = 0,
        /**
         * Horizontal direction.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @since 9
         */
        /**
         * Horizontal direction.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @crossplatform
         * @since 10
         */
        /**
         * Horizontal direction.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        DIRECTION_HORIZONTAL = 1
    }
    /**
     * Screen density
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityBase
     * @since 9
     */
    /**
     * Screen density
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityBase
     * @atomicservice
     * @since 11
     */
    export enum ScreenDensity {
        /**
         * The screen pixel density is not set.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @since 9
         */
        /**
         * The screen pixel density is not set.
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 11
         */
        SCREEN_DENSITY_NOT_SET = 0,
        /**
         * Screen pixel density is 'SDPI'
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @since 9
         */
        /**
         * Screen pixel density is 'SDPI'
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 11
         */
        SCREEN_DENSITY_SDPI = 120,
        /**
         * Screen pixel density is 'MDPI'
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @since 9
         */
        /**
         * Screen pixel density is 'MDPI'
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 11
         */
        SCREEN_DENSITY_MDPI = 160,
        /**
         * Screen pixel density is 'LDPI'
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @since 9
         */
        /**
         * Screen pixel density is 'LDPI'
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 11
         */
        SCREEN_DENSITY_LDPI = 240,
        /**
         * Screen pixel density is 'XLDPI'
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @since 9
         */
        /**
         * Screen pixel density is 'XLDPI'
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 11
         */
        SCREEN_DENSITY_XLDPI = 320,
        /**
         * Screen pixel density is 'XXLDPI'
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @since 9
         */
        /**
         * Screen pixel density is 'XXLDPI'
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 11
         */
        SCREEN_DENSITY_XXLDPI = 480,
        /**
         * Screen pixel density is 'XXXLDPI'
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @since 9
         */
        /**
         * Screen pixel density is 'XXXLDPI'
         *
         * @syscap SystemCapability.Ability.AbilityBase
         * @atomicservice
         * @since 11
         */
        SCREEN_DENSITY_XXXLDPI = 640
    }
}
export default ConfigurationConstant;
