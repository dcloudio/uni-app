/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import type { Callback } from './@ohos.base';
import type UIAbilityContext from './application/UIAbilityContext';
/**
 * Register callbacks to observe ArkUI behavior.
 *
 * @namespace uiObserver
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Register callbacks to observe ArkUI behavior.
 *
 * @namespace uiObserver
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare namespace uiObserver {
    /**
     * NavDestination state.
     *
     * @enum { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 11
     */
    /**
     * NavDestination state.
     *
     * @enum { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    export enum NavDestinationState {
        /**
         * When the NavDestination is displayed.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @form
         * @since 11
         */
        /**
         * When the NavDestination displayed.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        ON_SHOWN = 0,
        /**
         * When the NavDestination is hidden.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @form
         * @since 11
         */
        /**
         * When the NavDestination is hidden.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        ON_HIDDEN = 1,
        /**
         * When the NavDestination appear.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        ON_APPEAR = 2,
        /**
         * When the NavDestination disappear.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        ON_DISAPPEAR = 3,
        /**
         * Before the NavDestination is displayed.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        ON_WILL_SHOW = 4,
        /**
         * Before the NavDestination is hidden.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        ON_WILL_HIDE = 5,
        /**
         * Before the NavDestination is appeared.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        ON_WILL_APPEAR = 6,
        /**
         * Before the NavDestination is disappeared.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        ON_WILL_DISAPPEAR = 7,
        /**
         * When back press event happened in NavDestination.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        ON_BACKPRESS = 100
    }
    /**
     * Router page state.
     *
     * @enum { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Router page state.
     *
     * @enum { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export enum RouterPageState {
        /**
         * When the router page create.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 11
         */
        /**
         * When the router page create.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        ABOUT_TO_APPEAR = 0,
        /**
         * When the router page destroy.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 11
         */
        /**
         * When the router page destroy.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        ABOUT_TO_DISAPPEAR = 1,
        /**
         * When the router page show.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 11
         */
        /**
         * When the router page show.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        ON_PAGE_SHOW = 2,
        /**
         * When the router page hide.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 11
         */
        /**
         * When the router page hide.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        ON_PAGE_HIDE = 3,
        /**
         * When back press event happened in the router page.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 11
         */
        /**
         * When back press event happened in the router page.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        ON_BACK_PRESS = 4
    }
    /**
     * ScrollEvent type.
     *
     * @enum { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export enum ScrollEventType {
        /**
         * When the ScrollEvent start.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        SCROLL_START = 0,
        /**
         * When the ScrollEvent stop.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        SCROLL_STOP = 1
    }
    /**
     * NavDestination info.
     *
     * @interface NavDestinationInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * NavDestination info.
     *
     * @interface NavDestinationInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export interface NavDestinationInfo {
        /**
         * Navigation id.
         *
         * @type { ResourceStr }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 11
         */
        /**
         * Navigation id.
         *
         * @type { ResourceStr }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        navigationId: ResourceStr;
        /**
         * Changed NavDestination name.
         *
         * @type { ResourceStr }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 11
         */
        /**
         * Changed NavDestination name.
         *
         * @type { ResourceStr }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        name: ResourceStr;
        /**
         * Changed NavDestination state.
         *
         * @type { NavDestinationState }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 11
         */
        /**
         * Changed NavDestination state.
         *
         * @type { NavDestinationState }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        state: NavDestinationState;
        /**
         * NavDestination index.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        index: number;
        /**
         * The detailed parameter of NavDestination.
         *
         * @type { ?Object }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        param?: Object;
        /**
         * Auto-generated navDestination id, which is different from common property id of Component.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        navDestinationId: string;
    }
    /**
     * Navigation info.
     *
     * @interface NavigationInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export interface NavigationInfo {
        /**
         * Navigation id.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        navigationId: string;
        /**
         * Navigation path stack.
         *
         * @type { NavPathStack }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        pathStack: NavPathStack;
    }
    /**
     * ScrollEvent info.
     *
     * @interface ScrollEventInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export interface ScrollEventInfo {
        /**
         * Scroll id.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        id: string;
        /**
         * The uniqueId of the scrollable component.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        uniqueId: number;
        /**
         * Changed ScrollEvent type.
         *
         * @type { ScrollEventType }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        scrollEvent: ScrollEventType;
        /**
         * Changed ScrollEvent offset.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        offset: number;
    }
    /**
     * observer options.
     *
     * @interface ObserverOptions
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export interface ObserverOptions {
        /**
         * component id.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        id: string;
    }
    /**
     * Router page info.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Router page info.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export class RouterPageInfo {
        /**
         * The context of the changed router page.
         *
         * @type { UIAbilityContext | UIContext }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 11
         */
        /**
         * The context of the changed router page.
         *
         * @type { UIAbilityContext | UIContext }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        context: UIAbilityContext | UIContext;
        /**
         * The index of the changed router page in router stack.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 11
         */
        /**
         * The index of the changed router page in router stack.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        index: number;
        /**
         * The name of the changed router page.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 11
         */
        /**
         * The name of the changed router page.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        name: string;
        /**
         * The path of the changed router page.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 11
         */
        /**
         * The path of the changed router page.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        path: string;
        /**
         * The state of the changed router page.
         *
         * @type { RouterPageState }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 11
         */
        /**
         * The state of the changed router page.
         *
         * @type { RouterPageState }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        state: RouterPageState;
        /**
         * The unique identifier of the router page.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        pageId: string;
    }
    /**
     * Density info.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export class DensityInfo {
        /**
         * The context of the changed screen density.
         *
         * @type { UIContext }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        context: UIContext;
        /**
         * The changed screen density.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        density: number;
    }
    /**
     * NavDestination switch info
     *
     * @interface NavDestinationSwitchInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export interface NavDestinationSwitchInfo {
        /**
         * The context of the navigation operation.
         *
         * @type { UIAbilityContext | UIContext }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        context: UIAbilityContext | UIContext;
        /**
         * From navigation content info.
         *
         * @type { NavDestinationInfo | NavBar }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        from: NavDestinationInfo | NavBar;
        /**
         * To navigation content info.
         *
         * @type { NavDestinationInfo | NavBar }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        to: NavDestinationInfo | NavBar;
        /**
         * The operation type.
         *
         * @type { NavigationOperation }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        operation: NavigationOperation;
    }
    /**
     * Indicates the options of NavDestination switch.
     *
     * @interface NavDestinationSwitchObserverOptions
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export interface NavDestinationSwitchObserverOptions {
        /**
         * The navigationId that need observation
         *
         * @type { ResourceStr }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        navigationId: ResourceStr;
    }
    /**
     * Registers a callback function to be called when the navigation destination is updated.
     *
     * @param { 'navDestinationUpdate' } type - The type of event to listen for. Must be 'navDestinationUpdate'.
     * @param { object } options - The options object.
     * @param { Callback<NavDestinationInfo> } callback - The callback function to be called when the navigation destination is updated.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Registers a callback function to be called when the navigation destination is updated.
     *
     * @param { 'navDestinationUpdate' } type - The type of event to listen for. Must be 'navDestinationUpdate'.
     * @param { object } options - The options object.
     * @param { Callback<NavDestinationInfo> } callback - The callback function to be called when the navigation destination is updated.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export function on(type: 'navDestinationUpdate', options: {
        navigationId: ResourceStr;
    }, callback: Callback<NavDestinationInfo>): void;
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'navDestinationUpdate' } type - The type of event to remove the listener for. Must be 'navDestinationUpdate'.
     * @param { object } options - The options object.
     * @param { Callback<NavDestinationInfo> } callback - The callback function to remove. If not provided, all callbacks for the given event type and
     *                                                    navigation ID will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'navDestinationUpdate' } type - The type of event to remove the listener for. Must be 'navDestinationUpdate'.
     * @param { object } options - The options object.
     * @param { Callback<NavDestinationInfo> } callback - The callback function to remove. If not provided, all callbacks for the given event type and
     *                                                    navigation ID will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export function off(type: 'navDestinationUpdate', options: {
        navigationId: ResourceStr;
    }, callback?: Callback<NavDestinationInfo>): void;
    /**
     * Registers a callback function to be called when the navigation destination is updated.
     *
     * @param { 'navDestinationUpdate' } type - The type of event to listen for. Must be 'navDestinationUpdate'.
     * @param { Callback<NavDestinationInfo> } callback - The callback function to be called when the navigation destination is updated.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Registers a callback function to be called when the navigation destination is updated.
     *
     * @param { 'navDestinationUpdate' } type - The type of event to listen for. Must be 'navDestinationUpdate'.
     * @param { Callback<NavDestinationInfo> } callback - The callback function to be called when the navigation destination is updated.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export function on(type: 'navDestinationUpdate', callback: Callback<NavDestinationInfo>): void;
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'navDestinationUpdate'} type - The type of event to remove the listener for. Must be 'navDestinationUpdate'.
     * @param { Callback<NavDestinationInfo> } [callback] - The callback function to remove. If not provided, all callbacks for the given event type
     *                                                      will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'navDestinationUpdate'} type - The type of event to remove the listener for. Must be 'navDestinationUpdate'.
     * @param { Callback<NavDestinationInfo> } [callback] - The callback function to remove. If not provided, all callbacks for the given event type
     *                                                      will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export function off(type: 'navDestinationUpdate', callback?: Callback<NavDestinationInfo>): void;
    /**
     * Registers a callback function to be called when the scroll event start or stop.
     *
     * @param { 'scrollEvent' } type - The type of event to listen for. Must be 'scrollEvent'.
     * @param { ObserverOptions } options - The options object.
     * @param { Callback<ScrollEventInfo> } callback - The callback function to be called when the scroll event start or stop.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export function on(type: 'scrollEvent', options: ObserverOptions, callback: Callback<ScrollEventInfo>): void;
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'scrollEvent' } type - The type of event to remove the listener for. Must be 'scrollEvent'.
     * @param { ObserverOptions } options - The options object.
     * @param { Callback<ScrollEventInfo> } callback - The callback function to remove. If not provided, all callbacks for the given event type and
     *                                                    scroll ID will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export function off(type: 'scrollEvent', options: ObserverOptions, callback?: Callback<ScrollEventInfo>): void;
    /**
     * Registers a callback function to be called when the scroll event start or stop.
     *
     * @param { 'scrollEvent' } type - The type of event to listen for. Must be 'scrollEvent'.
     * @param { Callback<ScrollEventInfo> } callback - The callback function to be called when the scroll event start or stop.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export function on(type: 'scrollEvent', callback: Callback<ScrollEventInfo>): void;
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'scrollEvent'} type - The type of event to remove the listener for. Must be 'scrollEvent'.
     * @param { Callback<ScrollEventInfo> } [callback] - The callback function to remove. If not provided, all callbacks for the given event type
     *                                                      will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export function off(type: 'scrollEvent', callback?: Callback<ScrollEventInfo>): void;
    /**
     * Registers a callback function to be called when the router page is updated.
     *
     * @param { 'routerPageUpdate' } type - The type of event to listen for. Must be 'routerPageUpdate'.
     * @param { UIAbilityContext | UIContext } context - The context scope of the observer.
     * @param { Callback<RouterPageInfo> } callback - The callback function to be called when the router page is updated.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Registers a callback function to be called when the router page is updated.
     *
     * @param { 'routerPageUpdate' } type - The type of event to listen for. Must be 'routerPageUpdate'.
     * @param { UIAbilityContext | UIContext } context - The context scope of the observer.
     * @param { Callback<RouterPageInfo> } callback - The callback function to be called when the router page is updated.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export function on(type: 'routerPageUpdate', context: UIAbilityContext | UIContext, callback: Callback<RouterPageInfo>): void;
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'routerPageUpdate' } type - The type of event to remove the listener for. Must be 'routerPageUpdate'.
     * @param { UIAbilityContext | UIContext } context - The context scope of the observer.
     * @param { Callback<RouterPageInfo> } [callback] - The callback function to remove. If not provided, all callbacks for the given event type
     *                                                               will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'routerPageUpdate' } type - The type of event to remove the listener for. Must be 'routerPageUpdate'.
     * @param { UIAbilityContext | UIContext } context - The context scope of the observer.
     * @param { Callback<RouterPageInfo> } [callback] - The callback function to remove. If not provided, all callbacks for the given event type
     *                                                               will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export function off(type: 'routerPageUpdate', context: UIAbilityContext | UIContext, callback?: Callback<RouterPageInfo>): void;
    /**
     * Registers a callback function to be called when the screen density is updated.
     *
     * @param { 'densityUpdate' } type - The type of event to listen for. Must be 'densityUpdate'.
     * @param { UIContext } context - The context scope of the observer.
     * @param { Callback<DensityInfo> } callback - The callback function to be called when the screen density is updated.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export function on(type: 'densityUpdate', context: UIContext, callback: Callback<DensityInfo>): void;
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'densityUpdate' } type - The type of event to remove the listener for. Must be 'densityUpdate'.
     * @param { UIContext } context - The context scope of the observer.
     * @param { Callback<DensityInfo> } [callback] - The callback function to remove. If not provided, all callbacks for the given event type
     *                                               will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export function off(type: 'densityUpdate', context: UIContext, callback?: Callback<DensityInfo>): void;
    /**
     * Registers a callback function to be called when the draw command will be drawn.
     *
     * @param { 'willDraw' } type - The type of event to listen for. Must be 'willDraw'.
     * @param { UIContext } context - The context scope of the observer.
     * @param { Callback<void> } callback - The callback function to be called when the draw command will be drawn.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export function on(type: 'willDraw', context: UIContext, callback: Callback<void>): void;
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'willDraw' } type - The type of event to remove the listener for. Must be 'willDraw'.
     * @param { UIContext } context - The context scope of the observer.
     * @param { Callback<void> } [callback] - The callback function to remove. If not provided, all callbacks for the given event type
     *                                               will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export function off(type: 'willDraw', context: UIContext, callback?: Callback<void>): void;
    /**
     * Registers a callback function to be called when the layout is done.
     *
     * @param { 'didLayout' } type - The type of event to listen for. Must be 'didLayout'.
     * @param { UIContext } context - The context scope of the observer.
     * @param { Callback<void> } callback - The callback function to be called when the layout is done.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export function on(type: 'didLayout', context: UIContext, callback: Callback<void>): void;
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'didLayout' } type - The type of event to remove the listener for. Must be 'didLayout'.
     * @param { UIContext } context - The context scope of the observer.
     * @param { Callback<void> } [callback] - The callback function to remove. If not provided, all callbacks for the given event type
     *                                               will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export function off(type: 'didLayout', context: UIContext, callback?: Callback<void>): void;
    /**
     * Registers a callback function to be called when the navigation switched to a new navDestination.
     *
     * @param { 'navDestinationSwitch' } type - The type of event to listen for. Must be 'navDestinationSwitch'.
     * @param { UIAbilityContext | UIContext } context - The context scope of the observer.
     * @param { Callback<NavDestinationSwitchInfo> } callback - The callback function to be called when the navigation switched to a new navDestination.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export function on(type: 'navDestinationSwitch', context: UIAbilityContext | UIContext, callback: Callback<NavDestinationSwitchInfo>): void;
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'navDestinationSwitch' } type - The type of event to remove the listener for. Must be 'navDestinationSwitch'.
     * @param { UIAbilityContext | UIContext } context - The context scope of the observer.
     * @param { Callback<NavDestinationSwitchInfo> } [callback] - The callback function to remove. If not provided, all callbacks for the given event type
     *                                                               will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export function off(type: 'navDestinationSwitch', context: UIAbilityContext | UIContext, callback?: Callback<NavDestinationSwitchInfo>): void;
    /**
     * Registers a callback function to be called when the navigation switched to a new navDestination.
     *
     * @param { 'navDestinationSwitch' } type - The type of event to listen for. Must be 'navDestinationSwitch'.
     * @param { UIAbilityContext | UIContext } context - The context scope of the observer.
     * @param { NavDestinationSwitchObserverOptions } observerOptions - Options.
     * @param { Callback<NavDestinationSwitchInfo> } callback - The callback function to be called when the navigation switched to a new navDestination.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export function on(type: 'navDestinationSwitch', context: UIAbilityContext | UIContext, observerOptions: NavDestinationSwitchObserverOptions, callback: Callback<NavDestinationSwitchInfo>): void;
    /**
     * Removes a callback function that was previously registered with `on()`.
     *
     * @param { 'navDestinationSwitch' } type - The type of event to remove the listener for. Must be 'navDestinationSwitch'.
     * @param { UIAbilityContext | UIContext } context - The context scope of the observer.
     * @param { NavDestinationSwitchObserverOptions } observerOptions - Options.
     * @param { Callback<NavDestinationSwitchInfo> } [callback] - The callback function to remove. If not provided, all callbacks for the given event type
     *                                                               will be removed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export function off(type: 'navDestinationSwitch', context: UIAbilityContext | UIContext, observerOptions: NavDestinationSwitchObserverOptions, callback?: Callback<NavDestinationSwitchInfo>): void;
}
export default uiObserver;
