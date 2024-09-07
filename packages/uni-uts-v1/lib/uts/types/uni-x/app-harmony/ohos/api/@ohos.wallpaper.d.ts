/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
 * @kit BasicServicesKit
 */
import { AsyncCallback } from './@ohos.base';
import image from './@ohos.multimedia.image';
/**
 * System wallpaper
 *
 * @namespace wallpaper
 * @syscap SystemCapability.MiscServices.Wallpaper
 * @since 7
 */
declare namespace wallpaper {
    /**
     * RgbaColor definition
     *
     * @typedef RgbaColor
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    interface RgbaColor {
        /**
         * The range is 0 to 255.
         *
         * @type { number }
         * @syscap SystemCapability.MiscServices.Wallpaper
         * @since 7
         * @deprecated since 9
         */
        red: number;
        /**
         * The range is 0 to 255.
         *
         * @type { number }
         * @syscap SystemCapability.MiscServices.Wallpaper
         * @since 7
         * @deprecated since 9
         */
        green: number;
        /**
         * The range is 0 to 255.
         *
         * @type { number }
         * @syscap SystemCapability.MiscServices.Wallpaper
         * @since 7
         * @deprecated since 9
         */
        blue: number;
        /**
         * The range is 0 to 255.
         *
         * @type { number }
         * @syscap SystemCapability.MiscServices.Wallpaper
         * @since 7
         * @deprecated since 9
         */
        alpha: number;
    }
    /**
     * Indicates wallpaper type.
     *
     * @enum { number } WallpaperType
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     */
    enum WallpaperType {
        /**
         * Indicates the home screen wallpaper.
         *
         * @syscap SystemCapability.MiscServices.Wallpaper
         * @since 7
         */
        WALLPAPER_SYSTEM,
        /**
         * Indicates the lock screen wallpaper.
         *
         * @syscap SystemCapability.MiscServices.Wallpaper
         * @since 7
         */
        WALLPAPER_LOCKSCREEN
    }
    /**
     * Obtains the wallpaper colors for the wallpaper of the specified type. Returns rgbaColor type of array callback function.
     *
     * @param { WallpaperType } wallpaperType - indicates the wallpaper type.
     * @param { AsyncCallback<Array<RgbaColor>> } callback - the callback of getColors.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function getColors(wallpaperType: WallpaperType, callback: AsyncCallback<Array<RgbaColor>>): void;
    /**
     * Obtains the wallpaper colors for the wallpaper of the specified type. Returns rgbaColor type of array callback function.
     *
     * @param { WallpaperType } wallpaperType - indicates the wallpaper type.
     * @returns { Promise<Array<RgbaColor>> } the promise returned by the function.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function getColors(wallpaperType: WallpaperType): Promise<Array<RgbaColor>>;
    /**
     * Obtains the ID of the wallpaper of the specified type. Returns an integer greater than or equal to {@code 0} representing the wallpaper ID.
     * if the specified type of wallpaper has been set; returns {@code -1} otherwise. The return value is an integer ranging from -1 to 2^31 - 1.
     *
     * @param { WallpaperType } wallpaperType - indicates the wallpaper type.
     * @param { AsyncCallback<number> } callback - the callback of getId.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function getId(wallpaperType: WallpaperType, callback: AsyncCallback<number>): void;
    /**
     * Obtains the ID of the wallpaper of the specified type. Returns an integer greater than or equal to {@code 0} representing the wallpaper ID.
     * if the specified type of wallpaper has been set; returns {@code -1} otherwise. The return value is an integer ranging from -1 to 2^31 - 1.
     *
     * @param { WallpaperType } wallpaperType - indicates the wallpaper type.
     * @returns { Promise<number> } the promise returned by the function.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function getId(wallpaperType: WallpaperType): Promise<number>;
    /**
     * Obtains a file of the wallpaper of the specified type. Returns the file descriptor.
     * When usage is complete, the caller needs to close the file descriptor in time.
     *
     * @permission ohos.permission.GET_WALLPAPER
     * @param { WallpaperType } wallpaperType - indicates the wallpaper type.
     * @param { AsyncCallback<number> } callback - the callback of getFile.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 8
     * @deprecated since 9
     */
    function getFile(wallpaperType: WallpaperType, callback: AsyncCallback<number>): void;
    /**
     * Obtains a file of the wallpaper of the specified type. Returns the file descriptor.
     * When usage is complete, the caller needs to close the file descriptor in time.
     *
     * @permission ohos.permission.GET_WALLPAPER
     * @param { WallpaperType } wallpaperType - indicates the wallpaper type.
     * @returns { Promise<number> } the promise returned by the function.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 8
     * @deprecated since 9
     */
    function getFile(wallpaperType: WallpaperType): Promise<number>;
    /**
     * Obtains the minimum height of the wallpaper. in pixels. returns 0 if no wallpaper has been set.
     *
     * @param { AsyncCallback<number> } callback - the callback of getMinHeight.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function getMinHeight(callback: AsyncCallback<number>): void;
    /**
     * Obtains the minimum height of the wallpaper. in pixels. returns 0 if no wallpaper has been set.
     *
     * @returns { Promise<number> } the promise returned by the function.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function getMinHeight(): Promise<number>;
    /**
     * Obtains the minimum width of the wallpaper. in pixels. returns 0 if no wallpaper has been set.
     *
     * @param { AsyncCallback<number> } callback - the callback of getMinWidth.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function getMinWidth(callback: AsyncCallback<number>): void;
    /**
     * Obtains the minimum width of the wallpaper. in pixels. returns 0 if no wallpaper has been set.
     *
     * @returns { Promise<number> } the promise returned by the function.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function getMinWidth(): Promise<number>;
    /**
     * Checks whether to allow the application to change the wallpaper for the current user.
     * Returns true if the application is allowed to set a wallpaper for the current user. returns false otherwise.
     *
     * @param { AsyncCallback<boolean> } callback - the callback of isChangePermitted.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function isChangePermitted(callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether to allow the application to change the wallpaper for the current user.
     * Returns true if the application is allowed to set a wallpaper for the current user. returns false otherwise.
     *
     * @returns { Promise<boolean> } the promise returned by the function.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function isChangePermitted(): Promise<boolean>;
    /**
     * Checks whether a user is allowed to set wallpapers.
     * Returns true if a user is allowed to set wallpapers. returns false otherwise.
     *
     * @param { AsyncCallback<boolean> } callback - the callback of isOperationAllowed.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function isOperationAllowed(callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether a user is allowed to set wallpapers.
     * Returns true if a user is allowed to set wallpapers. returns false otherwise.
     *
     * @returns { Promise<boolean> } the promise returned by the function.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function isOperationAllowed(): Promise<boolean>;
    /**
     * Removes a wallpaper of the specified type and restores the default one.
     *
     * @permission ohos.permission.SET_WALLPAPER
     * @param { WallpaperType } wallpaperType - indicates the wallpaper type.
     * @param { AsyncCallback<void> } callback - the callback of reset.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function reset(wallpaperType: WallpaperType, callback: AsyncCallback<void>): void;
    /**
     * Removes a wallpaper of the specified type and restores the default one.
     *
     * @permission ohos.permission.SET_WALLPAPER
     * @param { WallpaperType } wallpaperType - indicates the wallpaper type.
     * @returns { Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function reset(wallpaperType: WallpaperType): Promise<void>;
    /**
     * Sets a wallpaper of the specified type based on the uri path from a JPEG or PNG file or the pixel map of a PNG file.
     *
     * @permission ohos.permission.SET_WALLPAPER
     * @param { string | image.PixelMap } source - indicates the uri path from a JPEG or PNG file or the pixel map of the PNG file.
     * @param { WallpaperType } wallpaperType - indicates the wallpaper type.
     * @param { AsyncCallback<void> } callback - the callback of setWallpaper.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function setWallpaper(source: string | image.PixelMap, wallpaperType: WallpaperType, callback: AsyncCallback<void>): void;
    /**
     * Sets a wallpaper of the specified type based on the uri path from a JPEG or PNG file or the pixel map of a PNG file.
     *
     * @permission ohos.permission.SET_WALLPAPER
     * @param { string | image.PixelMap } source - indicates the uri path from a JPEG or PNG file or the pixel map of the PNG file.
     * @param { WallpaperType } wallpaperType - indicates the wallpaper type.
     * @returns { Promise<void> } the promise returned by the function.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function setWallpaper(source: string | image.PixelMap, wallpaperType: WallpaperType): Promise<void>;
    /**
     * Registers a listener for wallpaper color changes to receive notifications about the changes.
     *
     * @param { 'colorChange' } type - the incoming colorChange table open receiver pick a color change wallpaper wallpaper color changes.
     * @param { function } callback - provides dominant colors of the wallpaper.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function on(type: 'colorChange', callback: (colors: Array<RgbaColor>, wallpaperType: WallpaperType) => void): void;
    /**
     * Unregisters a listener for wallpaper color changes.
     *
     * @param { 'colorChange' } type - incoming colorChange table delete receiver to pick up a color change wallpaper wallpaper color changes
     * @param { function } callback - provides dominant colors of the wallpaper.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function off(type: 'colorChange', callback?: (colors: Array<RgbaColor>, wallpaperType: WallpaperType) => void): void;
}
export default wallpaper;
