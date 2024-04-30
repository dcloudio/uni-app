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
 * Data Change Listener.
 *
 * @interface DataChangeListener
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Data Change Listener.
 *
 * @interface DataChangeListener
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Data Change Listener.
 *
 * @interface DataChangeListener
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface DataChangeListener {
    /**
     * Data ready.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Data ready.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Data ready.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onDataReloaded(): void;
    /**
     * Data added.
     *
     * @param { number } index
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 8
     * @useinstead onDataAdd
     */
    onDataAdded(index: number): void;
    /**
     * Data added.
     *
     * @param { number } index
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Data added.
     *
     * @param { number } index
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Data added.
     *
     * @param { number } index
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onDataAdd(index: number): void;
    /**
     * Data moved.
     *
     * @param { number } from
     * @param { number } to
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 8
     * @useinstead onDataMove
     */
    onDataMoved(from: number, to: number): void;
    /**
     * Data moved.
     *
     * @param { number } from
     * @param { number } to
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Data moved.
     *
     * @param { number } from
     * @param { number } to
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Data moved.
     *
     * @param { number } from
     * @param { number } to
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onDataMove(from: number, to: number): void;
    /**
     * Data deleted.
     *
     * @param { number } index
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 8
     * @useinstead onDataDelete
     */
    onDataDeleted(index: number): void;
    /**
     * Data deleted.
     *
     * @param { number } index
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Data deleted.
     *
     * @param { number } index
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Data deleted.
     *
     * @param { number } index
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onDataDelete(index: number): void;
    /**
     * Call when has data change.
     *
     * @param { number } index
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 8
     * @useinstead onDataChange
     */
    onDataChanged(index: number): void;
    /**
     * Call when has data change.
     *
     * @param { number } index
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Call when has data change.
     *
     * @param { number } index
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Call when has data change.
     *
     * @param { number } index
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    onDataChange(index: number): void;
}
/**
 * Developers need to implement this interface to provide data to LazyForEach component.
 *
 * @interface IDataSource
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Developers need to implement this interface to provide data to LazyForEach component.
 *
 * @interface IDataSource
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Developers need to implement this interface to provide data to LazyForEach component.
 *
 * @interface IDataSource
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface IDataSource {
    /**
     * Total data count.
     *
     * @returns { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Total data count.
     *
     * @returns { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Total data count.
     *
     * @returns { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    totalCount(): number;
    /**
     * Return the data of index.
     *
     * @param { number } index
     * @returns { any }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Return the data of index.
     *
     * @param { number } index
     * @returns { any }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Return the data of index.
     *
     * @param { number } index
     * @returns { any }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    getData(index: number): any;
    /**
     * Register data change listener.
     *
     * @param { DataChangeListener } listener
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Register data change listener.
     *
     * @param { DataChangeListener } listener
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Register data change listener.
     *
     * @param { DataChangeListener } listener
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    registerDataChangeListener(listener: DataChangeListener): void;
    /**
     * Unregister data change listener.
     *
     * @param { DataChangeListener } listener
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Unregister data change listener.
     *
     * @param { DataChangeListener } listener
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Unregister data change listener.
     *
     * @param { DataChangeListener } listener
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    unregisterDataChangeListener(listener: DataChangeListener): void;
}
/**
 * Lazy loading.
 *
 * @interface LazyForEachInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Lazy loading.
 *
 * @interface LazyForEachInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Lazy loading.
 *
 * @interface LazyForEachInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface LazyForEachInterface {
    /**
     * Enter the value to obtain the LazyForEach.
     *
     * @param { IDataSource } dataSource
     * @param { function } itemGenerator
     * @param { function } keyGenerator
     * @returns { LazyForEachInterface }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Enter the value to obtain the LazyForEach.
     *
     * @param { IDataSource } dataSource
     * @param { function } itemGenerator
     * @param { function } keyGenerator
     * @returns { LazyForEachInterface }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Enter the value to obtain the LazyForEach.
     *
     * @param { IDataSource } dataSource
     * @param { function } itemGenerator
     * @param { function } keyGenerator
     * @returns { LazyForEachInterface }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    (dataSource: IDataSource, itemGenerator: (item: any, index: number) => void, keyGenerator?: (item: any, index: number) => string): LazyForEachInterface;
}
/**
 * Defines LazyForEach Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines LazyForEach Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines LazyForEach Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const LazyForEach: LazyForEachInterface;
