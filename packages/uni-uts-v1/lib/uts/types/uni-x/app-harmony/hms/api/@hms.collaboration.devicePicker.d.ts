/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file Defines the capabilities of device picker.
 * @kit ServiceCollaborationKit
 */
import type { Callback } from '@ohos.base';
import type distributedDeviceManager from '@ohos.distributedDeviceManager';
/**
 * Provides device picker and DevicePickerController for distributed business, can be used
 * with the { @link CollaborationDevicePicker }. The DevicePickerController can interact with
 * the device picker, such as obtain information about the selected device, and update the
 * current state of the device, and so on.
 *
 * @namespace devicePicker
 * @syscap SystemCapability.Collaboration.DevicePicker
 * @since 4.0.0(10)
 */
declare namespace devicePicker {
    /**
     * Device event definitions. { @link 'deviceSelected' } corresponds the user clicks the device
     * in { @link IDLE } state, { @link 'deviceUnselected' } corresponds the user clicks the device
     * in { @link SUCCESSFUL } state, { @link 'selectedDeviceOffline' } corresponds the device in
     * { @link SUCCESSFUL } state offline.
     *
     * { 'deviceSelected' | 'deviceUnselected' | 'selectedDeviceOffline' }
     * @typedef DeviceEvent
     * @syscap SystemCapability.Collaboration.DevicePicker
     * @since 4.0.0(10)
     */
    type DeviceEvent = 'deviceSelected' | 'deviceUnselected' | 'selectedDeviceOffline';
    /**
     * Create { @link DevicePickerController } instance.
     *
     * @returns { DevicePickerController } The DevicePickerController instance.
     * @syscap SystemCapability.Collaboration.DevicePicker
     * @since 4.0.0(10)
     */
    function createDevicePickerController(): DevicePickerController;
    /**
     * DevicePicker controller definitions, the controller can interact with the device picker. Contains
     * event registration function for { @link DeviceEvent }, and updateState function, and so on.
     *
     * @syscap SystemCapability.Collaboration.DevicePicker
     * @since 4.0.0(10)
     */
    class DevicePickerController {
        /**
         * Register { @link DeviceEvent } callback, for example { @link 'deviceSelected' } callback
         * called when the user clicks a device in { @link IDLE state }; { @link 'deviceUnselected' }
         * callback called when the user clicks the device in { @link SUCCESSFUL } state;
         * { @link 'selectedDeviceOffline' } callback called when the device in { @link SUCCESSFUL }
         * state offline. You can use the {@code distributedDeviceManager.DeviceBasicInfo } to
         * implement your own processing logic in this { @link callback }.
         *
         * @param { DeviceEvent } event - Device event.
         * @param { Callback<distributedDeviceManager.DeviceBasicInfo> } callback - Called when
         * user selects a device.
         * @syscap SystemCapability.Collaboration.DevicePicker
         * @since 4.0.0(10)
         */
        on(event: DeviceEvent, callback: Callback<distributedDeviceManager.DeviceBasicInfo>): void;
        /**
         * Cancel the callback registered through { @link on }.
         *
         * @param { DeviceEvent } event - Device event.
         * @param { Callback<distributedDeviceManager.DeviceBasicInfo> } callback - Callback
         * function of the DeviceEvent.
         * @syscap SystemCapability.Collaboration.DevicePicker
         * @since 4.0.0(10)
         */
        off(event: DeviceEvent, callback?: Callback<distributedDeviceManager.DeviceBasicInfo>): void;
        /**
         * Update the business state, then the device picker will display the current state.
         *
         * @param { string } networkId - Indicates the networkId of the device whose state is to be updated.
         * @param { BusinessState } state - Indicates the business state to be updated.
         * @param { ResourceStr } desc - Indicates the detailed description to display with the state,
         * when the state is { @link FAILED }, you can describe the cause of the failure, the maximum
         * length of the desc is 128.
         * @syscap SystemCapability.Collaboration.DevicePicker
         * @since 4.0.0(10)
         */
        updateState(networkId: string, state: BusinessState, desc?: ResourceStr): void;
        /**
         * Release the instance created by function of { @link createDevicePickerController }.
         *
         * @syscap SystemCapability.Collaboration.DevicePicker
         * @since 4.0.0(10)
         */
        release(): void;
    }
    /**
     * Device picker attribute definitions, this information is displayed at the top of
     * the device picker panel.
     *
     * @syscap SystemCapability.Collaboration.DevicePicker
     * @since 4.0.0(10)
     */
    class DevicePickerAttribute {
        /**
         * The icon for caller ability or custom icon that you want to display to the user.
         *
         * @type { ?ResourceStr }
         * @default the icon declare in module.json5 file
         * @syscap SystemCapability.Collaboration.DevicePicker
         * @since 4.0.0(10)
         */
        abilityIcon?: ResourceStr;
        /**
         * The name for caller ability or custom name that you want to display to the user.
         *
         * @type { ?ResourceStr }
         * @default the name declare in module.json5 file
         * @syscap SystemCapability.Collaboration.DevicePicker
         * @since 4.0.0(10)
         */
        abilityName?: ResourceStr;
        /**
         * The description for caller ability or custom description that you want to display to the user.
         *
         * @type { ?ResourceStr }
         * @default the description declare in module.json5 file
         * @syscap SystemCapability.Collaboration.DevicePicker
         * @since 4.0.0(10)
         */
        abilityDesc?: ResourceStr;
        /**
         * The description for business type, for example "cast to"、 "flow to".
         *
         * @type { ?ResourceStr }
         * @default "flow to"
         * @syscap SystemCapability.Collaboration.DevicePicker
         * @since 4.0.0(10)
         */
        businessDesc?: ResourceStr;
    }
    /**
     * Business state type definitions, the current state is displayed on the device picker along with
     * the device name.
     *
     * @enum { number }
     * @syscap SystemCapability.Collaboration.DevicePicker
     * @since 4.0.0(10)
     */
    enum BusinessState {
        /**
         * Indicates the idle state.
         *
         * @syscap SystemCapability.Collaboration.DevicePicker
         * @since 4.0.0(10)
         */
        IDLE = 0,
        /**
         * Indicates business succeed.
         *
         * @syscap SystemCapability.Collaboration.DevicePicker
         * @since 4.0.0(10)
         */
        SUCCESSFUL = 1,
        /**
         * Indicates business fail.
         *
         * @syscap SystemCapability.Collaboration.DevicePicker
         * @since 4.0.0(10)
         */
        FAILED = 2
    }
}
export default devicePicker;
