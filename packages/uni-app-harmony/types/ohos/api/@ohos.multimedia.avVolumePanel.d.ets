/*
* Copyright (C) 2024 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * @file Defines a panel to set the system audio output volume.
 * @kit AudioKit
 */
/**
 * Declare custom parameters used for volume panel.
 *
 * @syscap SystemCapability.Multimedia.Audio.Volume
 * @atomicservice
 * @since 12
 */
export declare class AVVolumePanelParameter {
    /**
     * Sets the position of volume panel.
     *
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @atomicservice
     * @since 12
     */
    position?: Position;
}
/**
 * A panel to set the system audio output volume.
 *
 * @syscap SystemCapability.Multimedia.Audio.Volume
 * @atomicservice
 * @since 12
 */
@Component
export declare struct AVVolumePanel {
    /**
     * Sets the device volume through the volume panel.
     * The value should be between mininum and maxinum current device volume, otherwise it will be discarded.
     *
     * @type { ?number }
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @atomicservice
     * @since 12
     */
    @Prop
    volumeLevel?: number;
    /**
     * Sets the custom parameters of volume panel.
     *
     * @type { ?AVVolumePanelParameter }
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @atomicservice
     * @since 12
     */
    @Prop
    volumeParameter?: AVVolumePanelParameter;
}
