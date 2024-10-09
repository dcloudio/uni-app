/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
 * Implement this interface to provide data prefetching for the LazyForEach component.
 *
 * @interface IDataSourcePrefetching
 * @extends IDataSource
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export interface IDataSourcePrefetching extends IDataSource {
    /**
     * Prefetches data for the specified element in the data collection.
     * This method can be either synchronous or asynchronous.
     *
     * @param { number } index - Index of the item in the collection.
     * @returns { Promise<void> | void }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    prefetch(index: number): Promise<void> | void;
    /**
     * Cancels prefetching data for the specified element in the data collection.
     * This method can be either synchronous or asynchronous.
     *
     * @param { number } index - Index of the item in the collection.
     * @returns { Promise<void> | void }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    cancel?(index: number): Promise<void> | void;
}
/**
 * Implement this interface to provide prefetcher logic.
 *
 * @interface IPrefetcher
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export interface IPrefetcher {
    /**
     * Sets the data source to bind to this prefetcher.
     *
     * @param { IDataSourcePrefetching } dataSource - Data source that supports prefetching.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    setDataSource(dataSource: IDataSourcePrefetching): void;
    /**
     * Call this method when the visible area boundaries were changed.
     *
     * @param { number } minVisible - Index of the first visible data item.
     * @param { number } maxVisible - Index of the last visible data item.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    visibleAreaChanged(minVisible: number, maxVisible: number): void;
}
/**
 * Basic implementation of {@link IPrefetcher}.
 * It provides an intelligent data prefetching algorithm to make decisions about which data
 * items should be prefetched in response to the real-time changes of visible on-screen area
 * and changes in the duration of the prefetching. It also determines which prefetch requests
 * should be canceled based on user scrolling actions.
 *
 * @implements IPrefetcher
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export class BasicPrefetcher implements IPrefetcher {
    /**
     * Constructs a basic prefetcher instance and optionally sets the data source.
     *
     * @param { IDataSourcePrefetching } dataSource - Data source that supports prefetching.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor(dataSource?: IDataSourcePrefetching);
    /**
     * Sets the data source to bind to this prefetcher.
     *
     * @param { IDataSourcePrefetching } dataSource - Data source that supports prefetching.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    setDataSource(dataSource: IDataSourcePrefetching): void;
    /**
     * Call this method when the visible area changed.
     *
     * @param { number } minVisible - Index of the first visible data item.
     * @param { number } maxVisible - Index of the last visible data item.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    visibleAreaChanged(minVisible: number, maxVisible: number): void;
}
