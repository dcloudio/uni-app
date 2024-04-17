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
 * @kit IMEKit
 */
/**
 * Panel information.
 *
 * @typedef PanelInfo
 * @syscap SystemCapability.MiscServices.InputMethodFramework
 * @since 11
 */
export interface PanelInfo {
    /**
     * Panel type.
     *
     * @type { PanelType }
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 11
     */
    type: PanelType;
    /**
     * <p>Flag of Panel.</p>
     * <p>Currently only using for SOFT_KEYBOARD panel.</p>
     *
     * @type { ?PanelFlag }
     * @default FLG_FIXED
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 11
     */
    flag?: PanelFlag;
}
/**
 * Enumerates the flags of panel.
 *
 * @enum { number }
 * @syscap SystemCapability.MiscServices.InputMethodFramework
 * @since 11
 */
export enum PanelFlag {
    /**
     * Fixed style.
     * <p>It's provided for the panel with type of SOFT_KEYBOARD.
     * When the flag is set, the soft keyboard is fixed at the bottom of the screen.</p>
     *
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 11
     */
    FLAG_FIXED = 0,
    /**
     * Floating style.
     * <p>It's provided for the panel with type of SOFT_KEYBOARD.
     * When the flag is set, the soft keyboard is floating.</p>
     *
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 11
     */
    FLAG_FLOATING,
    /**
     * Candidate style.
     * <p>It's provided for the panel with type of SOFT_KEYBOARD.
     * When the flag is set, the soft keyboard is a candidate window which will show the possible characters when user types a input code.
     * Panel with candidate style will not be automatically shown or hidden by input method service.
     * Input method application developers are supposed to control the panel status on their own.</p>
     *
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 11
     */
    FLAG_CANDIDATE
}
/**
 * Enumerates the types of panel.
 *
 * @enum { number }
 * @syscap SystemCapability.MiscServices.InputMethodFramework
 * @since 11
 */
export enum PanelType {
    /**
     * Panel for displaying a virtual soft keyboard.
     *
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 11
     */
    SOFT_KEYBOARD = 0,
    /**
     * Panel for displaying status bar.
     *
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 11
     */
    STATUS_BAR
}
