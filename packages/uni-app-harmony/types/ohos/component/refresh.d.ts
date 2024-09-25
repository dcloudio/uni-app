/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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
 * The refresh status of the drop-down refresh.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * The refresh status of the drop-down refresh.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * The refresh status of the drop-down refresh.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare enum RefreshStatus {
    /**
     * The refresh status of the drop-down refresh.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * The refresh status of the drop-down refresh.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The refresh status of the drop-down refresh.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    Inactive,
    /**
     * Drop down, but the drop-down distance is less than the refresh distance.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Drop down, but the drop-down distance is less than the refresh distance.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Drop down, but the drop-down distance is less than the refresh distance.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    Drag,
    /**
     * The pull-down exceeds the refresh distance.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * The pull-down exceeds the refresh distance.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The pull-down exceeds the refresh distance.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    OverDrag,
    /**
     * After the pull-down, it rebounds to the refresh distance and enters the refresh state.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * After the pull-down, it rebounds to the refresh distance and enters the refresh state.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * After the pull-down, it rebounds to the refresh distance and enters the refresh state.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    Refresh,
    /**
     * After refresh, return to the initial state.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * After refresh, return to the initial state.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * After refresh, return to the initial state.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    Done
}
/**
 * Defines the options of refresh component.
 *
 * @interface RefreshOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines the options of refresh component.
 *
 * @interface RefreshOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the options of refresh component.
 *
 * @interface RefreshOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface RefreshOptions {
    /**
     * Whether the current component is being refreshed.
     * This parameter supports $$ for two-way binding of variables.
     *
     * @type { boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Whether the current component is being refreshed.
     * This parameter supports $$ for two-way binding of variables.
     *
     * @type { boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Whether the current component is being refreshed.
     * This parameter supports $$ for two-way binding of variables.
     *
     * @type { boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    refreshing: boolean;
    /**
     * Distance to the top of the parent component from the component that
     * comes to rest after a successful pull-down gesture. Default value: 16, in vp
     *
     * @type { ?(number | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Distance to the top of the parent component from the component that
     * comes to rest after a successful pull-down gesture. Default value: 16, in vp
     *
     * @type { ?(number | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @deprecated since 11
     */
    offset?: number | string;
    /**
     * Coefficient of friction, which indicates the component's sensitivity to the pull-down gesture.
     * The value ranges from 0 to 100. Default value: 62
     *   - 0 indicates that the component is not sensitive to the pull-down gesture.
     *   - 100 indicates that the component is highly sensitive to the pull-down gesture.
     *   - A larger value indicates a more sensitive response of the component to the pull-down gesture.
     *
     * @type { ?(number | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Coefficient of friction, which indicates the component's sensitivity to the pull-down gesture.
     * The value ranges from 0 to 100. Default value: 62
     *   - 0 indicates that the component is not sensitive to the pull-down gesture.
     *   - 100 indicates that the component is highly sensitive to the pull-down gesture.
     *   - A larger value indicates a more sensitive response of the component to the pull-down gesture.
     *
     * @type { ?(number | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @deprecated since 11
     */
    friction?: number | string;
    /**
     * The text displayed during refreshing
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    promptText?: ResourceStr;
    /**
     * Custom component to display during dragging.
     *
     * @type { ?CustomBuilder }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Custom component to display during dragging.
     *
     * @type { ?CustomBuilder }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    builder?: CustomBuilder;
}
/**
 * Provides a pull-down refresh interface.
 *
 * @interface RefreshInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Provides a pull-down refresh interface.
 *
 * @interface RefreshInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides a pull-down refresh interface.
 *
 * @interface RefreshInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface RefreshInterface {
    /**
     * Called when the drop-down refresh is set.
     *
     * @param { RefreshOptions } value - The options of refresh component.
     * @returns { RefreshAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when the drop-down refresh is set.
     *
     * @param { RefreshOptions } value - The options of refresh component.
     * @returns { RefreshAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the drop-down refresh is set.
     *
     * @param { RefreshOptions } value - The options of refresh component.
     * @returns { RefreshAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    (value: RefreshOptions): RefreshAttribute;
}
/**
 * Defines the refresh attribute functions.
 *
 * @extends CommonMethod<RefreshAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines the refresh attribute functions.
 *
 * @extends CommonMethod<RefreshAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the refresh attribute functions.
 *
 * @extends CommonMethod<RefreshAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare class RefreshAttribute extends CommonMethod<RefreshAttribute> {
    /**
     * Called when the refresh state changes.
     *
     * @param { function } callback
     * @returns { RefreshAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when the refresh state changes.
     *
     * @param { function } callback
     * @returns { RefreshAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the refresh state changes.
     *
     * @param { function } callback
     * @returns { RefreshAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onStateChange(callback: (state: RefreshStatus) => void): RefreshAttribute;
    /**
     * Called when the refresh state is entered.
     *
     * @param { function } callback
     * @returns { RefreshAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when the refresh state is entered.
     *
     * @param { function } callback
     * @returns { RefreshAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the refresh state is entered.
     *
     * @param { function } callback
     * @returns { RefreshAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onRefreshing(callback: () => void): RefreshAttribute;
    /**
     * The pull-down offset to trigger refresh.
     *
     * @param { number } value
     * @returns { RefreshAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    refreshOffset(value: number): RefreshAttribute;
    /**
     * Sets whether to trigger refresh when the pull-down distance exceeds the refreshOffset.
     *
     * @param { boolean } value
     * @returns { RefreshAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    pullToRefresh(value: boolean): RefreshAttribute;
    /**
     * Called when the refresh offset changed.
     * The unit is vp.
     *
     * @param { Callback<number> } callback
     * @returns { RefreshAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    onOffsetChange(callback: Callback<number>): RefreshAttribute;
}
/**
 * Defines Refresh Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines Refresh Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Refresh Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const Refresh: RefreshInterface;
/**
 * Defines Refresh Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines Refresh Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Refresh Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const RefreshInstance: RefreshAttribute;
