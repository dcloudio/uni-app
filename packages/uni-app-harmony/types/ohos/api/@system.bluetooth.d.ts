/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
 * @kit ConnectivityKit
 */
/**
 * @typedef StartBLEScanOptions
 * @syscap SystemCapability.Communication.Bluetooth.Lite
 * @since 6
 */
export interface StartBLEScanOptions {
    /**
     * Time of delay for reporting the scan result
     *
     * @syscap SystemCapability.Communication.Bluetooth.Lite
     * @since 6
     */
    interval: number;
    /**
     * StartBLEScanOptions success
     *
     * @syscap SystemCapability.Communication.Bluetooth.Lite
     * @since 6
     */
    success: () => void;
    /**
     * StartBLEScanOptions failed
     *
     * @syscap SystemCapability.Communication.Bluetooth.Lite
     * @since 6
     */
    fail: (data: string, code: number) => void;
    /**
     * StartBLEScanOptions completed
     *
     * @syscap SystemCapability.Communication.Bluetooth.Lite
     * @since 6
     */
    complete: () => void;
}
/**
 * @typedef StopBLEScanOptions
 * @syscap SystemCapability.Communication.Bluetooth.Lite
 * @since 6
 */
export interface StopBLEScanOptions {
    /**
     * StopBLEScanOptions success
     *
     * @syscap SystemCapability.Communication.Bluetooth.Lite
     * @since 6
     */
    success: () => void;
    /**
     * StopBLEScanOptions failed
     *
     * @syscap SystemCapability.Communication.Bluetooth.Lite
     * @since 6
     */
    fail: (data: string, code: number) => void;
    /**
     * StopBLEScanOptions completed
     *
     * @syscap SystemCapability.Communication.Bluetooth.Lite
     * @since 6
     */
    complete: () => void;
}
/**
 * @typedef BluetoothDevice
 * @syscap SystemCapability.Communication.Bluetooth.Lite
 * @since 6
 */
export interface BluetoothDevice {
    /**
     * The addrType of address, may be public or random
     *
     * @syscap SystemCapability.Communication.Bluetooth.Lite
     * @since 6
     */
    addrType: 'public' | 'random';
    /**
     * Address of BluetoothDevice
     *
     * @syscap SystemCapability.Communication.Bluetooth.Lite
     * @since 6
     */
    addr: string;
    /**
     * RSSI of the remote device
     *
     * @syscap SystemCapability.Communication.Bluetooth.Lite
     * @since 6
     */
    rssi: number;
    /**
     * Transmission power level for advertising
     *
     * @syscap SystemCapability.Communication.Bluetooth.Lite
     * @since 6
     */
    txpower: string;
    /**
     * The data of BluetoothDevice
     *
     * @syscap SystemCapability.Communication.Bluetooth.Lite
     * @since 6
     */
    data: string;
}
/**
 * @typedef BLEFoundResponse
 * @syscap SystemCapability.Communication.Bluetooth.Lite
 * @since 6
 */
export interface BLEFoundResponse {
    /**
     * The devices of BLEFoundResponse
     *
     * @syscap SystemCapability.Communication.Bluetooth.Lite
     * @since 6
     */
    devices: Array<BluetoothDevice>;
}
/**
 * @typedef SubscribeBLEFoundOptions
 * @syscap SystemCapability.Communication.Bluetooth.Lite
 * @since 6
 */
export interface SubscribeBLEFoundOptions {
    /**
     * SubscribeBLEFoundOptions success
     *
     * @syscap SystemCapability.Communication.Bluetooth.Lite
     * @since 6
     */
    success: (data: BLEFoundResponse) => void;
    /**
     * SubscribeBLEFoundOptions failed
     *
     * @syscap SystemCapability.Communication.Bluetooth.Lite
     * @since 6
     */
    fail: (data: string, code: number) => void;
}
/**
 * Provides methods to manage BLE scan.
 *
 * @syscap SystemCapability.Communication.Bluetooth.Lite
 * @since 6
 */
export default class Bluetooth {
    /**
     * Start BLE scan
     *
     * @param { StartBLEScanOptions } options - Options
     * @syscap SystemCapability.Communication.Bluetooth.Lite
     * @since 6
     */
    static startBLEScan(options: StartBLEScanOptions): void;
    /**
     * Stop BLE scan
     *
     * @param { StopBLEScanOptions } options - Options
     * @syscap SystemCapability.Communication.Bluetooth.Lite
     * @since 6
     */
    static stopBLEScan(options: StopBLEScanOptions): void;
    /**
     * Subscribe BLE found
     *
     * @param { SubscribeBLEFoundOptions } options - Options
     * @syscap SystemCapability.Communication.Bluetooth.Lite
     * @since 6
     */
    static subscribeBLEFound(options: SubscribeBLEFoundOptions): void;
    /**
     * Stop the subscription of BLE found
     *
     * @syscap SystemCapability.Communication.Bluetooth.Lite
     * @since 6
     */
    static unsubscribeBLEFound(): void;
}
