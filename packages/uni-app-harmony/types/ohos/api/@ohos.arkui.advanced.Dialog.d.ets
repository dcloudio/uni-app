/*
* Copyright (C) 2023-2024 Huawei Device Co., Ltd.
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
 * @kit ArkUI
 */

/// <reference path="../component/units.d.ts" />
import { ResourceStr } from 'GlobalResource';
import { Theme, CustomTheme } from '@ohos.arkui.theme';
/**
 * Declare ButtonOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declare ButtonOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export declare class ButtonOptions {
    /**
     * Sets the Display Content of a Button.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the Display Content of a Button.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    value: ResourceStr;
    /**
     * Sets the Button Callback.
     * @type { ?() => void }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the Button Callback.
     * @type { ?() => void }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    action?: () => void;
    /**
     * Sets the background color of a button.
     * @type { ?ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the background color of a button.
     * @type { ?ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    background?: ResourceColor;
    /**
     * Sets the Button Text Color.
     * @type { ?ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the Button Text Color.
     * @type { ?ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    fontColor?: ResourceColor;
    /**
     * Describes the Button style.
     * @type { ?ButtonStyleMode }
     * @default ButtonStyleMode.TEXTUAL
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    buttonStyle?: ButtonStyleMode;
    /**
     * Describes the Button role.
     * @type { ?ButtonRole }
     * @default ButtonRole.NORMAL
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    role?: ButtonRole;
}
/**
 * Declare CustomDialog TipsDialog
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declare CustomDialog TipsDialog
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
@CustomDialog
export declare struct TipsDialog {
    /**
     * Sets the TipsDialog Controller.
     * @type { CustomDialogController }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the TipsDialog Controller.
     * @type { CustomDialogController }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    controller: CustomDialogController;
    /**
     * Sets the TipsDialog imageRes.
     * @type { Resource }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the TipsDialog imageRes.
     * @type { Resource }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    imageRes: Resource;
    /**
     * Sets the TipsDialog image size.
     * @type { SizeOptions }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the TipsDialog image size.
     * @type { SizeOptions }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Sets the TipsDialog image size.
     * @type { ?SizeOptions }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    imageSize?: SizeOptions;
    /**
     * Sets the TipsDialog title.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the TipsDialog title.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Sets the TipsDialog title.
     * @type { ?ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    title?: ResourceStr;
    /**
     * Sets the TipsDialog content.
     * @type { ?ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the TipsDialog content.
     * @type { ?ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    content?: ResourceStr;
    /**
     * Sets the TipsDialog checkbox tips.
     * @type { ?ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the TipsDialog checkbox tips.
     * @type { ?ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    checkTips?: ResourceStr;
    /**
     * Sets the TipsDialog checkbox check state.
     * @type { ?boolean }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the TipsDialog checkbox check state.
     * @type { ?boolean }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    @Prop
    isChecked?: boolean;
    /**
     * Sets the TipsDialog CheckBox Callback.
     * @type { ?(isChecked: boolean) => void }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 12
     */
    checkAction?: (isChecked: boolean) => void;
    /**
     * Sets the TipsDialog primary button.
     * @type { ?ButtonOptions }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the TipsDialog primary button.
     * @type { ?ButtonOptions }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    primaryButton?: ButtonOptions;
    /**
     * Sets the TipsDialog secondary button.
     * @type { ?ButtonOptions }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the TipsDialog secondary button.
     * @type { ?ButtonOptions }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    secondaryButton?: ButtonOptions;
    /**
     * Custom Theme.
     *
     * @type { ?(Theme | CustomTheme) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    theme?: Theme | CustomTheme;
}
/**
 * Declare CustomDialog SelectDialog
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declare CustomDialog SelectDialog
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
@CustomDialog
export declare struct SelectDialog {
    /**
     * Sets the SelectDialog Controller.
     * @type { CustomDialogController }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the SelectDialog Controller.
     * @type { CustomDialogController }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    controller: CustomDialogController;
    /**
     * Sets the SelectDialog title.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the SelectDialog title.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    title: ResourceStr;
    /**
     * Sets the SelectDialog content.
     * @type { ?ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the SelectDialog content.
     * @type { ?ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    content?: ResourceStr;
    /**
     * Sets the SelectDialog selected index.
     * @type { ?number }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the SelectDialog selected index.
     * @type { ?number }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    selectedIndex?: number;
    /**
     * Sets the SelectDialog confirm button.
     * @type { ?ButtonOptions }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the SelectDialog confirm button.
     * @type { ?ButtonOptions }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    confirm?: ButtonOptions;
    /**
     * Sets the SelectDialog sheets.
     * @type { Array<SheetInfo> }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the SelectDialog sheets.
     * @type { Array<SheetInfo> }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    radioContent: Array<SheetInfo>;
    /**
     * Custom Theme.
     *
     * @type { ?(Theme | CustomTheme) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    theme?: Theme | CustomTheme;
}
/**
 * Declare CustomDialog ConfirmDialog
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declare CustomDialog ConfirmDialog
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
@CustomDialog
export declare struct ConfirmDialog {
    /**
     * Sets the ConfirmDialog Controller.
     * @type { CustomDialogController }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the ConfirmDialog Controller.
     * @type { CustomDialogController }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    controller: CustomDialogController;
    /**
     * Sets the ConfirmDialog title.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the ConfirmDialog title.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    title: ResourceStr;
    /**
     * Sets the ConfirmDialog content.
     * @type { ?ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the ConfirmDialog content.
     * @type { ?ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    content?: ResourceStr;
    /**
     * Sets the ConfirmDialog checkbox tips.
     * @type { ?ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the ConfirmDialog checkbox tips.
     * @type { ?ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    checkTips?: ResourceStr;
    /**
     * Sets the ConfirmDialog checkbox state.
     * @type { ?boolean }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the ConfirmDialog checkbox state.
     * @type { ?boolean }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    @Prop
    isChecked?: boolean;
    /**
     * Sets the ConfirmDialog primary button.
     * @type { ?ButtonOptions }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the ConfirmDialog primary button.
     * @type { ?ButtonOptions }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    primaryButton?: ButtonOptions;
    /**
     * Sets the ConfirmDialog secondary button.
     * @type { ?ButtonOptions }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the ConfirmDialog secondary button.
     * @type { ?ButtonOptions }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    secondaryButton?: ButtonOptions;
    /**
     * Custom Theme.
     *
     * @type { ?(Theme | CustomTheme) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    theme?: Theme | CustomTheme;
}
/**
 * Declare CustomDialog AlertDialog
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declare CustomDialog AlertDialog
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
@CustomDialog
export declare struct AlertDialog {
    /**
     * Sets the AlertDialog Controller.
     * @type { CustomDialogController }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the AlertDialog Controller.
     * @type { CustomDialogController }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    controller: CustomDialogController;
    /**
     * Sets the AlertDialog title.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    primaryTitle?: ResourceStr;
    /**
     * Sets the AlertDialog secondary title.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    secondaryTitle?: ResourceStr;
    /**
     * Sets the AlertDialog content.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the AlertDialog content.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    content: ResourceStr;
    /**
     * Sets the AlertDialog primary button.
     * @type { ?ButtonOptions }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the AlertDialog primary button.
     * @type { ?ButtonOptions }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    primaryButton?: ButtonOptions;
    /**
     * Sets the AlertDialog secondary button.
     * @type { ?ButtonOptions }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the AlertDialog secondary button.
     * @type { ?ButtonOptions }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    secondaryButton?: ButtonOptions;
    /**
     * Custom Theme.
     *
     * @type { ?(Theme | CustomTheme) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    theme?: Theme | CustomTheme;
}
/**
 * Declare CustomDialog LoadingDialog
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declare CustomDialog LoadingDialog
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
@CustomDialog
export declare struct LoadingDialog {
    /**
     * Sets the LoadingDialog Controller.
     * @type { CustomDialogController }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the LoadingDialog Controller.
     * @type { CustomDialogController }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    Controller: CustomDialogController;
    /**
     * Sets the LoadingDialog content.
     * @type { ?ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Sets the LoadingDialog content.
     * @type { ?ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    content?: ResourceStr;
    /**
     * Custom Theme.
     *
     * @type { ?(Theme | CustomTheme) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    theme?: Theme | CustomTheme;
}
/**
 * Declare custom content dialog
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
@CustomDialog
export declare struct CustomContentDialog {
    /**
     * Sets the CustomContentDialog Controller.
     * @type { CustomDialogController }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    controller: CustomDialogController;
    /**
     * Sets the CustomContentDialog title.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    primaryTitle?: ResourceStr;
    /**
     * Sets the CustomContentDialog secondary title.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    secondaryTitle?: ResourceStr;
    /**
     * Sets the CustomContentDialog content.
     * @type { () => void }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    @BuilderParam
    contentBuilder: () => void;
    /**
     * Sets the CustomContentDialog content area padding.
     * @type { ?Padding }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    contentAreaPadding?: Padding;
    /**
     * Sets the CustomContentDialog buttons.
     * @type { ?ButtonOptions[] }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    buttons?: ButtonOptions[];
    /**
     * Custom Theme.
     *
     * @type { ?(Theme | CustomTheme) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    theme?: Theme | CustomTheme;
}
