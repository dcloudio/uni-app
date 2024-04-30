/*
* Copyright (C) 2023 Huawei Device Co., Ltd.
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
 * @file
 * @kit AVSessionKit
 */
import { AVCastPickerState } from './@ohos.multimedia.avCastPickerParam';
/**
 * A picker view to show availale streaming device list.
 * @syscap SystemCapability.Multimedia.AVSession.AVCast
 * @since 10
 */
@Component
declare struct AVCastPicker {
    /**
     * Assigns the color of picker component at normal state .
     * @type { ? Color | number | string }
     * @syscap SystemCapability.Multimedia.AVSession.AVCast
     * @crossplatform
     * @since 11
     */
    @Prop
    normalColor?: Color | number | string;
    /**
     * Assigns the color of picker component at active state.
     * @type { ? Color | number | string }
     * @syscap SystemCapability.Multimedia.AVSession.AVCast
     * @crossplatform
     * @since 11
     */
    @Prop
    activeColor?: Color | number | string;
    /**
     * Picker state change callback.
     * @type { ?function }
     * @syscap SystemCapability.Multimedia.AVSession.AVCast
     * @crossplatform
     * @since 11
     */
    onStateChange?: (state: AVCastPickerState) => void;
}
export default AVCastPicker;
