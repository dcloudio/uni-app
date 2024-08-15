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
 * Define pattern options of keyboard.
 *
 * @interface PatternOptions
 * @syscap SystemCapability.MiscServices.InputMethodFramework
 * @since 11
 */
export interface PatternOptions {
    /**
     * The default selected pattern, The defaultSelected will default to 0 if left blank
     *
     * @type { number }
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 11
     */
    defaultSelected?: number;
    /**
     * the patterns of input method.
     *
     * @type { Array<Pattern> }
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 11
     */
    patterns: Array<Pattern>;
    /**
     * An action callback. When the pattern icon clicked, the callback will be invoked.
     *
     * @type { function }
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 11
     */
    action: (index: number) => void;
}
/**
 * Define pattern of keyboard. The caller must be the current inputmethod.
 *
 * @interface Pattern
 * @syscap SystemCapability.MiscServices.InputMethodFramework
 * @since 11
 */
export interface Pattern {
    /**
     * The icon resource of pattern.
     *
     * @type { Resource }
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 11
     */
    icon: Resource;
    /**
     * The selected icon resource of pattern.
     *
     * @type { Resource }
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 11
     */
    selectedIcon: Resource;
}
/**
 * Declare input method list dialog. The caller must be the current inputmethod.
 *
 * @syscap SystemCapability.MiscServices.InputMethodFramework
 * @since 11
 */
@CustomDialog
export declare struct InputMethodListDialog {
    /**
     * Sets the controller.
     *
     * @type { CustomDialogController }
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 11
     */
    controller: CustomDialogController;
    /**
     * Sets the pattern options. This parameter can be left blank when it is not default input method.
     *
     * @type { PatternOptions }
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 11
     */
    patternOptions?: PatternOptions;
}
