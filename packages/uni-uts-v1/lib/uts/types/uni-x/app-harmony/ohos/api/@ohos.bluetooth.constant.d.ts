/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
 * The definition of constant.
 *
 * @namespace constant
 * @syscap SystemCapability.Communication.Bluetooth.Core
 * @since 10
 */
/**
 * The definition of constant.
 *
 * @namespace constant
 * @syscap SystemCapability.Communication.Bluetooth.Core
 * @atomicservice
 * @since 12
 */
declare namespace constant {
    /**
     * The enum of profile id.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    export enum ProfileId {
        /**
         * A2DP profile.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        PROFILE_A2DP_SOURCE = 1,
        /**
         * HFP profile.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        PROFILE_HANDSFREE_AUDIO_GATEWAY = 4,
        /**
         * Human Interface Device (HID) profile.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        PROFILE_HID_HOST = 6,
        /**
         * PAN profile.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        PROFILE_PAN_NETWORK = 7
    }
    /**
     * Enum for the profile's uuid
     *
     * @enum { string }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @systemapi
     * @since 10
     */
    /**
     * Enum for the profile's uuid
     *
     * @enum { string }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 12
     */
    export enum ProfileUuids {
        /**
         * Hands-Free Profile: Audio Gateway
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @systemapi
         * @since 10
         */
        /**
         * Hands-Free Profile: Audio Gateway
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 12
         */
        PROFILE_UUID_HFP_AG = '0000111F-0000-1000-8000-00805F9B34FB',
        /**
         * Hands-Free Profile: Hands Free
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @systemapi
         * @since 10
         */
        /**
         * Hands-Free Profile: Hands Free
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 12
         */
        PROFILE_UUID_HFP_HF = '0000111E-0000-1000-8000-00805F9B34FB',
        /**
         * Headset Profile: Audio Gateway
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @systemapi
         * @since 10
         */
        /**
         * Headset Profile: Audio Gateway
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 12
         */
        PROFILE_UUID_HSP_AG = '00001112-0000-1000-8000-00805F9B34FB',
        /**
         * Headset Profile: Headset
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @systemapi
         * @since 10
         */
        /**
         * Headset Profile: Headset
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 12
         */
        PROFILE_UUID_HSP_HS = '00001108-0000-1000-8000-00805F9B34FB',
        /**
         * Advanced Audio Distribution Profile: Source
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @systemapi
         * @since 10
         */
        /**
         * Advanced Audio Distribution Profile: Source
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 12
         */
        PROFILE_UUID_A2DP_SRC = '0000110A-0000-1000-8000-00805F9B34FB',
        /**
         * Advanced Audio Distribution Profile: Sink
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @systemapi
         * @since 10
         */
        /**
         * Advanced Audio Distribution Profile: Sink
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 12
         */
        PROFILE_UUID_A2DP_SINK = '0000110B-0000-1000-8000-00805F9B34FB',
        /**
         * Audio/Video Remote Control Profile: Controller
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @systemapi
         * @since 10
         */
        /**
         * Audio/Video Remote Control Profile: Controller
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 12
         */
        PROFILE_UUID_AVRCP_CT = '0000110E-0000-1000-8000-00805F9B34FB',
        /**
         * Audio/Video Remote Control Profile: Target
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @systemapi
         * @since 10
         */
        /**
         * Audio/Video Remote Control Profile: Target
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 12
         */
        PROFILE_UUID_AVRCP_TG = '0000110C-0000-1000-8000-00805F9B34FB',
        /**
         * Human Interface Device Profile
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @systemapi
         * @since 10
         */
        /**
         * Human Interface Device Profile
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 12
         */
        PROFILE_UUID_HID = '00001124-0000-1000-8000-00805F9B34FB',
        /**
         * HID over GATT Profile
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @systemapi
         * @since 10
         */
        /**
         * HID over GATT Profile
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 12
         */
        PROFILE_UUID_HOGP = '00001812-0000-1000-8000-00805F9B34FB'
    }
    /**
     * The enum of profile connection state.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    /**
     * The enum of profile connection state.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @atomicservice
     * @since 12
     */
    export enum ProfileConnectionState {
        /**
         * the current profile is disconnected
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        /**
         * the current profile is disconnected
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @atomicservice
         * @since 12
         */
        STATE_DISCONNECTED = 0,
        /**
         * the current profile is being connected
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        /**
         * the current profile is being connected
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @atomicservice
         * @since 12
         */
        STATE_CONNECTING = 1,
        /**
         * the current profile is connected
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        /**
         * the current profile is connected
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @atomicservice
         * @since 12
         */
        STATE_CONNECTED = 2,
        /**
         * the current profile is being disconnected
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        /**
         * the current profile is being disconnected
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @atomicservice
         * @since 12
         */
        STATE_DISCONNECTING = 3
    }
    /**
     * The enum of major class of a bluetooth device.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    export enum MajorClass {
        /**
         * Miscellaneous device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        MAJOR_MISC = 0x0000,
        /**
         * Computer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        MAJOR_COMPUTER = 0x0100,
        /**
         * Mobile phone.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        MAJOR_PHONE = 0x0200,
        /**
         * Network device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        MAJOR_NETWORKING = 0x0300,
        /**
         * Audio or video device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        MAJOR_AUDIO_VIDEO = 0x0400,
        /**
         * Peripheral device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        MAJOR_PERIPHERAL = 0x0500,
        /**
         * Imaging device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        MAJOR_IMAGING = 0x0600,
        /**
         * Wearable device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        MAJOR_WEARABLE = 0x0700,
        /**
         * Toy.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        MAJOR_TOY = 0x0800,
        /**
         * Health device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        MAJOR_HEALTH = 0x0900,
        /**
         * Unclassified device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        MAJOR_UNCATEGORIZED = 0x1F00
    }
    /**
     * The enum of major minor class of a bluetooth device.
     *
     * @enum { number }
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    export enum MajorMinorClass {
        /**
         * The Minor Device Class field
         * Computer Major Class
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        COMPUTER_UNCATEGORIZED = 0x0100,
        /**
         * Desktop computer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        COMPUTER_DESKTOP = 0x0104,
        /**
         * Server.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        COMPUTER_SERVER = 0x0108,
        /**
         * Laptop.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        COMPUTER_LAPTOP = 0x010C,
        /**
         * Hand-held computer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        COMPUTER_HANDHELD_PC_PDA = 0x0110,
        /**
         * Palmtop computer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        COMPUTER_PALM_SIZE_PC_PDA = 0x0114,
        /**
         * Wearable computer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        COMPUTER_WEARABLE = 0x0118,
        /**
         * Tablet.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        COMPUTER_TABLET = 0x011C,
        /**
         * Phone Major Class
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        PHONE_UNCATEGORIZED = 0x0200,
        /**
         * Portable phone.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        PHONE_CELLULAR = 0x0204,
        /**
         * Cordless phone.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        PHONE_CORDLESS = 0x0208,
        /**
         * Smartphone.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        PHONE_SMART = 0x020C,
        /**
         * Modem or gateway phone.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        PHONE_MODEM_OR_GATEWAY = 0x0210,
        /**
         * ISDN phone.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        PHONE_ISDN = 0x0214,
        /**
         * LAN/Network Access Point Major Class
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        NETWORK_FULLY_AVAILABLE = 0x0300,
        /**
         * Device used on network 1 to 17.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        NETWORK_1_TO_17_UTILIZED = 0x0320,
        /**
         * Device used on network 17 to 33.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        NETWORK_17_TO_33_UTILIZED = 0x0340,
        /**
         * Device used on network 33 to 50.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        NETWORK_33_TO_50_UTILIZED = 0x0360,
        /**
         * Device used on network 60 to 67.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        NETWORK_60_TO_67_UTILIZED = 0x0380,
        /**
         * Device used on network 67 to 83.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        NETWORK_67_TO_83_UTILIZED = 0x03A0,
        /**
         * Device used on network 83 to 99.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        NETWORK_83_TO_99_UTILIZED = 0x03C0,
        /**
         * Device without network service.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        NETWORK_NO_SERVICE = 0x03E0,
        /**
         * Unclassified audio or video device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        AUDIO_VIDEO_UNCATEGORIZED = 0x0400,
        /**
         * Wearable audio or video headset.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        AUDIO_VIDEO_WEARABLE_HEADSET = 0x0404,
        /**
         * Hands-free audio or video device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        AUDIO_VIDEO_HANDSFREE = 0x0408,
        /**
         * Audio or video microphone.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        AUDIO_VIDEO_MICROPHONE = 0x0410,
        /**
         * Audio or video loudspeaker.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        AUDIO_VIDEO_LOUDSPEAKER = 0x0414,
        /**
         * Audio or video headphones.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        AUDIO_VIDEO_HEADPHONES = 0x0418,
        /**
         * Portable audio or video device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        AUDIO_VIDEO_PORTABLE_AUDIO = 0x041C,
        /**
         * In-vehicle audio or video device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        AUDIO_VIDEO_CAR_AUDIO = 0x0420,
        /**
         * Audio or video STB device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        AUDIO_VIDEO_SET_TOP_BOX = 0x0424,
        /**
         * High-fidelity speaker device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        AUDIO_VIDEO_HIFI_AUDIO = 0x0428,
        /**
         * Video cassette recording (VCR) device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        AUDIO_VIDEO_VCR = 0x042C,
        /**
         * Camera.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        AUDIO_VIDEO_VIDEO_CAMERA = 0x0430,
        /**
         * Camcorder.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        AUDIO_VIDEO_CAMCORDER = 0x0434,
        /**
         * Audio or video monitor.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        AUDIO_VIDEO_VIDEO_MONITOR = 0x0438,
        /**
         * Video display or loudspeaker.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        AUDIO_VIDEO_VIDEO_DISPLAY_AND_LOUDSPEAKER = 0x043C,
        /**
         * Video conferencing device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        AUDIO_VIDEO_VIDEO_CONFERENCING = 0x0440,
        /**
         * Audio or video gaming toy.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        AUDIO_VIDEO_VIDEO_GAMING_TOY = 0x0448,
        /**
         * Peripheral Major Class
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        PERIPHERAL_NON_KEYBOARD_NON_POINTING = 0x0500,
        /**
         * Keyboard device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        PERIPHERAL_KEYBOARD = 0x0540,
        /**
         * Pointing peripheral device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        PERIPHERAL_POINTING_DEVICE = 0x0580,
        /**
         * Keyboard pointing device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        PERIPHERAL_KEYBOARD_POINTING = 0x05C0,
        /**
         * Unclassified peripheral device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        PERIPHERAL_UNCATEGORIZED = 0x0500,
        /**
         * Peripheral joystick.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        PERIPHERAL_JOYSTICK = 0x0504,
        /**
         * Peripheral game pad.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        PERIPHERAL_GAMEPAD = 0x0508,
        /**
         * Peripheral remote control device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        PERIPHERAL_REMOTE_CONTROL = 0x05C0,
        /**
         * Peripheral sensing device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        PERIPHERAL_SENSING_DEVICE = 0x0510,
        /**
         * Peripheral digitizer tablet.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        PERIPHERAL_DIGITIZER_TABLET = 0x0514,
        /**
         * Peripheral card reader.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        PERIPHERAL_CARD_READER = 0x0518,
        /**
         * Peripheral digital pen.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        PERIPHERAL_DIGITAL_PEN = 0x051C,
        /**
         * Peripheral RFID scanner.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        PERIPHERAL_SCANNER_RFID = 0x0520,
        /**
         * Gesture input device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        PERIPHERAL_GESTURAL_INPUT = 0x0522,
        /**
         * Imaging Major Class
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        IMAGING_UNCATEGORIZED = 0x0600,
        /**
         * Imaging display device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        IMAGING_DISPLAY = 0x0610,
        /**
         * Imaging camera device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        IMAGING_CAMERA = 0x0620,
        /**
         * Imaging scanner.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        IMAGING_SCANNER = 0x0640,
        /**
         * Imaging printer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        IMAGING_PRINTER = 0x0680,
        /**
         * Wearable Major Class
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        WEARABLE_UNCATEGORIZED = 0x0700,
        /**
         * Smart watch.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        WEARABLE_WRIST_WATCH = 0x0704,
        /**
         * Wearable pager.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        WEARABLE_PAGER = 0x0708,
        /**
         * Smart jacket.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        WEARABLE_JACKET = 0x070C,
        /**
         * Wearable helmet.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        WEARABLE_HELMET = 0x0710,
        /**
         * Wearable glasses.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        WEARABLE_GLASSES = 0x0714,
        /**
         * Minor Device Class field - Toy Major Class
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        TOY_UNCATEGORIZED = 0x0800,
        /**
         * Toy robot.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        TOY_ROBOT = 0x0804,
        /**
         * Toy vehicle.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        TOY_VEHICLE = 0x0808,
        /**
         * Humanoid toy doll.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        TOY_DOLL_ACTION_FIGURE = 0x080C,
        /**
         * Toy controller.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        TOY_CONTROLLER = 0x0810,
        /**
         * Toy gaming device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        TOY_GAME = 0x0814,
        /**
         * Minor Device Class field - Health
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        HEALTH_UNCATEGORIZED = 0x0900,
        /**
         * Blood pressure device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        HEALTH_BLOOD_PRESSURE = 0x0904,
        /**
         * Thermometer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        HEALTH_THERMOMETER = 0x0908,
        /**
         * Body scale.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        HEALTH_WEIGHING = 0x090C,
        /**
         * Blood glucose monitor.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        HEALTH_GLUCOSE = 0x0910,
        /**
         * Pulse oximeter.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        HEALTH_PULSE_OXIMETER = 0x0914,
        /**
         * Heart rate monitor.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        HEALTH_PULSE_RATE = 0x0918,
        /**
         * Health data display.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        HEALTH_DATA_DISPLAY = 0x091C,
        /**
         * Step counter.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        HEALTH_STEP_COUNTER = 0x0920,
        /**
         * Body composition analyzer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        HEALTH_BODY_COMPOSITION_ANALYZER = 0x0924,
        /**
         * Hygrometer.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        HEALTH_PEAK_FLOW_MONITOR = 0x0928,
        /**
         * Medication monitor.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        HEALTH_MEDICATION_MONITOR = 0x092C,
        /**
         * Prosthetic knee.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        HEALTH_KNEE_PROSTHESIS = 0x0930,
        /**
         * Prosthetic ankle.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        HEALTH_ANKLE_PROSTHESIS = 0x0934,
        /**
         * Generic health management device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        HEALTH_GENERIC_HEALTH_MANAGER = 0x0938,
        /**
         * Personal mobility device.
         *
         * @syscap SystemCapability.Communication.Bluetooth.Core
         * @since 10
         */
        HEALTH_PERSONAL_MOBILITY_DEVICE = 0x093C
    }
}
export default constant;
