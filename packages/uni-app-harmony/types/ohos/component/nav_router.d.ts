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
 * @kit ArkUI
 */
/**
 * Indicates the information of the route page.
 *
 * @interface RouteInfo
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Indicates the information of the route page.
 *
 * @interface RouteInfo
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface RouteInfo {
    /**
     * The name of the route page.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The name of the route page.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    name: string;
    /**
     * The detailed parameter of the route page.
     *
     * @type { ?unknown }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The detailed parameter of the route page.
     *
     * @type { ?unknown }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    param?: unknown;
}
/**
 * The construct function of NavRouter.
 *
 * @interface NavRouterInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * The construct function of NavRouter.
 *
 * @interface NavRouterInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * The construct function of NavRouter.
 *
 * @interface NavRouterInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface NavRouterInterface {
    /**
     * Constructor.
     *
     * @returns { NavRouterAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Constructor.
     *
     * @returns { NavRouterAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Constructor.
     *
     * @returns { NavRouterAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    (): NavRouterAttribute;
    /**
     * NavDestination Constructor.
     *
     * @param { RouteInfo } value - Indicates the information of route page.
     * @returns { NavRouterAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * NavDestination Constructor.
     *
     * @param { RouteInfo } value - Indicates the information of route page.
     * @returns { NavRouterAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    (value: RouteInfo): NavRouterAttribute;
}
/**
 * Define the route mode.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Define the route mode.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare enum NavRouteMode {
    /**
     * Create a new page to replace the current. The old page is destroyed but kept in the stack for recreating.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Create a new page to replace the current. The old page is destroyed but kept in the stack for recreating.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    PUSH_WITH_RECREATE,
    /**
     * Create a new page to cover the current. The old page is remained and kept in the stack.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Create a new page to cover the current. The old page is remained and kept in the stack.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    PUSH,
    /**
     * Create a new page to replace the current. The old page is destroyed and removed out of the stack.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Create a new page to replace the current. The old page is destroyed and removed out of the stack.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    REPLACE
}
/**
 * The attribute function of NavRouter
 *
 * @extends CommonMethod<NavRouterAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * The attribute function of NavRouter
 *
 * @extends CommonMethod<NavRouterAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * The attribute function of NavRouter
 *
 * @extends CommonMethod<NavRouterAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare class NavRouterAttribute extends CommonMethod<NavRouterAttribute> {
    /**
     * Trigger callback when NavigationView state change.
     *
     * @param { function } callback
     * @returns { NavRouterAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Trigger callback when NavigationView state change.
     *
     * @param { function } callback
     * @returns { NavRouterAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Trigger callback when NavigationView state change.
     *
     * @param { function } callback
     * @returns { NavRouterAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onStateChange(callback: (isActivated: boolean) => void): NavRouterAttribute;
    /**
     * Define the route mode.
     *
     * @param { NavRouteMode } mode - The route mode of the NavRouter.
     * @returns { NavRouterAttribute } Returns the instance of the NavRouterAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Define the route mode.
     *
     * @param { NavRouteMode } mode - The route mode of the NavRouter.
     * @returns { NavRouterAttribute } Returns the instance of the NavRouterAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    mode(mode: NavRouteMode): NavRouterAttribute;
}
/**
 * Defines NavRouter Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines NavRouter Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines NavRouter Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const NavRouter: NavRouterInterface;
/**
 * Defines NavRouter Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines NavRouter Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines NavRouter Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const NavRouterInstance: NavRouterAttribute;
