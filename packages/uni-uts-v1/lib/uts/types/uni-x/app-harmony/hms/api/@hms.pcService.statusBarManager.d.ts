/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file Defines the capabilities of status bar manager module.
 * @kit StatusBarExtensionKit
 */
import image from '@ohos.multimedia.image';
import common from '@ohos.app.ability.common';
/**
 * This module provides api to access to the status bar.
 * @namespace statusBarManager
 *
 * @syscap SystemCapability.PCService.StatusBarManager
 * @since 5.0.0(12)
 */
declare namespace statusBarManager {
    /**
     * The details of the StatusBar item.
     *
     * @typedef StatusBarItem
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.0(12)
     */
    interface StatusBarItem {
        /**
         * The icon information.
         *
         * @type { StatusBarIcon }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        icons: StatusBarIcon;
        /**
         * Quick operation information in the left-click pop-up window.
         *
         * @type { QuickOperation }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        quickOperation: QuickOperation;
        /**
         * Information about the right-click menu of the icon in the status bar.
         *
         * @type { ?Array<StatusBarGroupMenu> }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        statusBarGroupMenu?: Array<StatusBarGroupMenu>;
    }
    /**
     *  The app icon in status bar.
     *
     * @typedef StatusBarIcon
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.0(12)
     */
    interface StatusBarIcon {
        /**
         * The icon on the dark background
         *
         * @type { image.PixelMap }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        white: image.PixelMap;
        /**
         * The icon on the light background.
         *
         * @type { image.PixelMap }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        black: image.PixelMap;
    }
    /**
     * The menu group information of the icon of status bar.
     *
     * @typedef Array<StatusBarMenuItem>
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.0(12)
     */
    type StatusBarGroupMenu = Array<StatusBarMenuItem>;
    /**
     * The information of single menu item in the status bar.
     *
     * @typedef StatusBarMenuItem
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.0(12)
     */
    interface StatusBarMenuItem {
        /**
         * The title of the menu item.
         *
         * @type { string }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        title: string;
        /**
         * The action information of the menu item.
         *
         * @type { ?StatusBarMenuAction }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        menuAction?: StatusBarMenuAction;
        /**
         * Submenu information.
         *
         * @type { ?Array<StatusBarSubMenuItem> }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        subMenu?: Array<StatusBarSubMenuItem>;
    }
    /**
     * Menu Item Action.
     * The function of starting ability of the current application is supported currently.
     *
     * @typedef StatusBarMenuAction
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.0(12)
     */
    interface StatusBarMenuAction {
        /**
         * ability name of application.
         *
         * @type { string }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        abilityName: string;
        /**
         * The description of an module name in an want.
         *
         * @type { ?string }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        moduleName?: string;
    }
    /**
     * The information of submenu item in the statusbar.
     *
     * @typedef StatusBarSubMenuItem
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.0(12)
     */
    interface StatusBarSubMenuItem {
        /**
         * The title of the submenu item.
         *
         * @type { string }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        subTitle: string;
        /**
         * The action information of the submenu item.
         *
         * @type { StatusBarMenuAction }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        menuAction: StatusBarMenuAction;
    }
    /**
     * Quick operation information in the left-click pop-up window corresponding to the icon in the status bar.
     *
     * @typedef QuickOperation
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.0(12)
     */
    interface QuickOperation {
        /**
         * The title of QuickOperation window.
         *
         * @type { string }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        title: string;
        /**
         * The height of QuickOperation window.
         *
         * @type { number }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        height: number;
        /**
         * The name of the custom StatusBarViewExtensionAbility
         *
         * @type { string }
         * @syscap SystemCapability.PCService.StatusBarManager
         * @since 5.0.0(12)
         */
        abilityName: string;
        /**
        * The description of an module name in an want.
        *
        * @type { ?string }
        * @syscap SystemCapability.PCService.StatusBarManager
        * @since 5.0.0(12)
        */
        moduleName?: string;
    }
    /**
     * Add the app icon to the status bar.
     *
     * @param { common.Context } context - context.
     * @param { StatusBarItem } statusbarItem - The details of the icon in status bar.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1010710001 - The size of the pixelmap exceeds the limit.
     * @throws { BusinessError } 1010710002 - The number of menu items or submenu items exceeds the limit.
     * @throws { BusinessError } 1010720001 - A menu item contains neither submenu nor menuAction.
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.0(12)
     */
    function addToStatusBar(context: common.Context, statusbarItem: StatusBarItem): void;
    /**
     * Remove the app icon from the status bar.
     *
     * @param { common.Context } context - context.
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.0(12)
     */
    function removeFromStatusBar(context: common.Context): void;
    /**
     * Updated the right-click menu information of the app icon in the status bar.
     *
     * @param { common.Context } context - context.
     * @param { Array<StatusBarGroupMenu> } statusBarGroupMenus - The menu information of the icon of status bar.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1010710002 - The number of menu items or submenu items exceeds the limit.
     * @throws { BusinessError } 1010720001 - A menu item contains neither submenu nor menuAction.
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.0(12)
     */
    function updateStatusBarMenu(context: common.Context, statusBarGroupMenus: Array<StatusBarGroupMenu>): void;
    /**
     * Updated the left-click menu height of the app icon in the status bar.
     *
     * @param { common.Context } context - context.
     * @param { number } height - The height of the custom area in the left-click pop-up window.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.0(12)
     */
    function updateQuickOperationHeight(context: common.Context, height: number): void;
    /**
     * Update the app icon in the status bar.
     *
     * @param { common.Context } context - context.
     * @param { StatusBarIcon } statusBarIcon - The information of the app icon in status bar.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1010710001 - The size of the pixelmap exceeds the limit.
     * @syscap SystemCapability.PCService.StatusBarManager
     * @since 5.0.0(12)
     */
    function updateStatusBarIcon(context: common.Context, statusBarIcon: StatusBarIcon): void;
}
export default statusBarManager;
