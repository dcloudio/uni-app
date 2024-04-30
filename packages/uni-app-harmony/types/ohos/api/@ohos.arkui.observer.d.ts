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
declare namespace uiObserver {
    /**
     * NavDestination state.
     *
     * @enum { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     * @form
     */
    export enum NavDestinationState {
        /**
         * When the NavDestination show.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 11
         * @form
         */
        ON_SHOWN = 0,
        /**
         * When the NavDestination hidden.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 11
         * @form
         */
        ON_HIDDEN = 1
    }
    /**
     * Router page state.
     *
     * @enum { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    export enum RouterPageState {
        /**
         * When the router page create.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 11
         */
        ABOUT_TO_APPEAR = 0,
        /**
         * When the router page destroy.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 11
         */
        ABOUT_TO_DISAPPEAR = 1,
        /**
         * When the router page show.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 11
         */
        ON_PAGE_SHOW = 2,
        /**
         * When the router page hide.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 11
         */
        ON_PAGE_HIDE = 3,
        /**
         * When back press event happened in the router page.
         *
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 11
         */
        ON_BACK_PRESS = 4
    }
    /**
     * NavDestination info.
     *
     * @interface NavDestinationInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
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
        navigationId: ResourceStr;
        /**
         * Changed NavDestination name.
         *
         * @type { ResourceStr }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 11
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
        state: NavDestinationState;
    }
    /**
     * Router page info.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
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
        context: UIAbilityContext | UIContext;
        /**
         * The index of the changed router page in router stack.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 11
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
        name: string;
        /**
         * The path of the changed router page.
         *
         * @type { string }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 11
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
        state: RouterPageState;
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
    export function off(type: 'navDestinationUpdate', callback?: Callback<NavDestinationInfo>): void;
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
    export function off(type: 'routerPageUpdate', context: UIAbilityContext | UIContext, callback?: Callback<RouterPageInfo>): void;
}
export default uiObserver;
