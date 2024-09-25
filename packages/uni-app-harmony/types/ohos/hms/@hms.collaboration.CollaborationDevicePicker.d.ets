/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file Defines the component of CollaborationDevicePicker.
 * @kit ServiceCollaborationKit
 */
import devicePicker from '@hms.collaboration.devicePicker';
/**
 * Provides collaboration device picker component, the caller use it to implement multi-device
 * collaboration business. When the component is clicked, the devcie picker panel is displayed.
 *
 * @syscap SystemCapability.Collaboration.DevicePicker
 * @since 4.0.0(10)
 */
@Component
export struct CollaborationDevicePicker {
    /**
     * Device picker controller, can interact with the device picker. You can through
     * { @link devicePicker.createDevicePickerController } function create it.
     *
     * @type { devicePicker.DevicePickerController }
     * @syscap SystemCapability.Collaboration.DevicePicker
     * @since 4.0.0(10)
     */
    controller: devicePicker.DevicePickerController;
    /**
     * Device picker attribute, indicates the description that the application wants to display to the user,
     * is displayed at the top of the device picker panel.
     *
     * @type { devicePicker.DevicePickerAttribute }
     * @syscap SystemCapability.Collaboration.DevicePicker
     * @since 4.0.0(10)
     */
    attribute: devicePicker.DevicePickerAttribute;
    build(): void;
}
