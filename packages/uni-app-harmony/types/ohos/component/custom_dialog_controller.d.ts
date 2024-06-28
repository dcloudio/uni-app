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
 * @file
 * @kit ArkUI
 */
/**
 * Defines the options of CustomDialogController.
 *
 * @interface CustomDialogControllerOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the options of CustomDialogController.
 *
 * @interface CustomDialogControllerOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the options of CustomDialogController.
 *
 * @interface CustomDialogControllerOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface CustomDialogControllerOptions {
    /**
     * Custom builder function.
     *
     * @type { any }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Custom builder function.
     *
     * @type { any }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Custom builder function.
     *
     * @type { any }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    builder: any;
    /**
     * Defines the cancel function.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Defines the cancel function.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Defines the cancel function.
     *
     * @type { ?function }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    cancel?: () => void;
    /**
     * Defines if use auto cancel when click on the outside of the dialog.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Defines if use auto cancel when click on the outside of the dialog.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Defines if use auto cancel when click on the outside of the dialog.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    autoCancel?: boolean;
    /**
     * Defines the dialog alignment of the screen.
     *
     * @type { ?DialogAlignment }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Defines the dialog alignment of the screen.
     *
     * @type { ?DialogAlignment }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Defines the dialog alignment of the screen.
     *
     * @type { ?DialogAlignment }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    alignment?: DialogAlignment;
    /**
     * Defines the dialog offset.
     *
     * @type { ?Offset }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Defines the dialog offset.
     *
     * @type { ?Offset }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Defines the dialog offset.
     *
     * @type { ?Offset }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    offset?: Offset;
    /**
     * Defines if use custom style.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Defines if use custom style.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Defines if use custom style.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    customStyle?: boolean;
    /**
     * Grid count of dialog.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Grid count of dialog.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Grid count of dialog.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    gridCount?: number;
    /**
     * Mask color of dialog.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Mask color of dialog.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    maskColor?: ResourceColor;
    /**
     * Mask Region of dialog. The size cannot exceed the main window.
     *
     * @type { ?Rectangle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Mask Region of dialog. The size cannot exceed the main window.
     *
     * @type { ?Rectangle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    maskRect?: Rectangle;
    /**
     * Animation parameters of dialog opening.
     *
     * @type { ?AnimateParam }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Animation parameters of dialog opening.
     *
     * @type { ?AnimateParam }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    openAnimation?: AnimateParam;
    /**
     * Animation parameters of dialog closing.
     *
     * @type { ?AnimateParam }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Animation parameters of dialog closing.
     *
     * @type { ?AnimateParam }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    closeAnimation?: AnimateParam;
    /**
     * Whether to display in the sub window.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Whether to display in the sub window.
     *
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    showInSubWindow?: boolean;
    /**
     * Background color of dialog.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Background color of dialog.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    backgroundColor?: ResourceColor;
    /**
     * Corner radius of dialog.
     *
     * @type { ?(Dimension | BorderRadiuses) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Corner radius of dialog.
     *
     * @type { ?(Dimension | BorderRadiuses) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    cornerRadius?: Dimension | BorderRadiuses;
    /**
     * Whether it is a modal dialog
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Whether it is a modal dialog
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    isModal?: boolean;
    /**
     * Callback function when the CustomDialog interactive dismiss.
     *
     * @type { ?Callback<DismissDialogAction> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    onWillDismiss?: Callback<DismissDialogAction>;
    /**
     * Defines the custom dialog's width.
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    width?: Dimension;
    /**
     * Defines the custom dialog's height.
     *
     * @type { ?Dimension }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    height?: Dimension;
    /**
     * Defines the custom dialog's border width.
     *
     * @type { ?(Dimension | EdgeWidths) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    borderWidth?: Dimension | EdgeWidths;
    /**
     * Defines the custom dialog's border color.
     *
     * @type { ?(ResourceColor | EdgeColors) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    borderColor?: ResourceColor | EdgeColors;
    /**
     * Defines the custom dialog's border style.
     *
     * @type { ?(BorderStyle | EdgeStyles) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    borderStyle?: BorderStyle | EdgeStyles;
    /**
     * Defines the custom dialog's shadow.
     *
     * @type { ?(ShadowOptions | ShadowStyle) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    shadow?: ShadowOptions | ShadowStyle;
    /**
     * Defines the customDialog's background blur Style
     *
     * @type { ?BlurStyle }
     * @default BlurStyle.COMPONENT_ULTRA_THICK
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    backgroundBlurStyle?: BlurStyle;
}
/**
 * Component dialog dismiss action.
 *
 * @interface DismissDialogAction
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface DismissDialogAction {
    /**
     * Defines dialog dismiss function
     *
     * @type { Callback<void> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    dismiss: Callback<void>;
    /**
     * Dismiss reason type.
     *
     * @type { DismissReason }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    reason: DismissReason;
}
/**
 * Use the CustomDialogController class to display the custom pop-up window.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Use the CustomDialogController class to display the custom pop-up window.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Use the CustomDialogController class to display the custom pop-up window.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare class CustomDialogController {
    /**
     * The constructor transfers parameter settings.
     *
     * @param { CustomDialogControllerOptions } value
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * The constructor transfers parameter settings.
     *
     * @param { CustomDialogControllerOptions } value
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * The constructor transfers parameter settings.
     *
     * @param { CustomDialogControllerOptions } value
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    constructor(value: CustomDialogControllerOptions);
    /**
     * Display the content of the customized pop-up window. If the content has been displayed, it does not take effect.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Display the content of the customized pop-up window. If the content has been displayed, it does not take effect.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Display the content of the customized pop-up window. If the content has been displayed, it does not take effect.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    open();
    /**
     * Closes the custom pop-up window. If the window is closed, the window does not take effect.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Closes the custom pop-up window. If the window is closed, the window does not take effect.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Closes the custom pop-up window. If the window is closed, the window does not take effect.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    close();
}
