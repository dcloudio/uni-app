/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
 * @kit InputKit
 */
import type { AsyncCallback } from './@ohos.base';
import type image from './@ohos.multimedia.image';
/**
 * Declares interfaces related to mouse pointer attributes.
 *
 * @namespace pointer
 * @syscap SystemCapability.MultimodalInput.Input.Pointer
 * @since 9
 */
/**
 * Declares interfaces related to mouse pointer attributes.
 *
 * @namespace pointer
 * @syscap SystemCapability.MultimodalInput.Input.Pointer
 * @atomicservice
 * @since 12
 */
declare namespace pointer {
    /**
     * Pointer style.
     *
     * @enum { number }
     * @syscap SystemCapability.MultimodalInput.Input.Pointer
     * @since 9
     */
    /**
     * Pointer style.
     *
     * @enum { number }
     * @syscap SystemCapability.MultimodalInput.Input.Pointer
     * @atomicservice
     * @since 12
     */
    enum PointerStyle {
        /**
         * Default
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        DEFAULT,
        /**
         * East arrow
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        EAST,
        /**
         * West arrow
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        WEST,
        /**
         * South arrow
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        SOUTH,
        /**
         * North arrow
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        NORTH,
        /**
         * East-west arrow
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        WEST_EAST,
        /**
         * North-south arrow
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        NORTH_SOUTH,
        /**
         * North-east arrow
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        NORTH_EAST,
        /**
         * North-west arrow
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        NORTH_WEST,
        /**
         * South-east arrow
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        SOUTH_EAST,
        /**
         * South-west arrow
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        SOUTH_WEST,
        /**
         * Northeast and southwest adjustment
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        NORTH_EAST_SOUTH_WEST,
        /**
         * Northwest and southeast adjustment
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        NORTH_WEST_SOUTH_EAST,
        /**
         * Cross (accurate selection)
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        CROSS,
        /**
         * Copy
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        CURSOR_COPY,
        /**
         * Forbid
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        CURSOR_FORBID,
        /**
         * Sucker
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        COLOR_SUCKER,
        /**
         * Grabbing hand
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        HAND_GRABBING,
        /**
         * Opening hand
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        HAND_OPEN,
        /**
         * Hand-shaped pointer
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        HAND_POINTING,
        /**
         * Help
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        HELP,
        /**
         * Move
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        MOVE,
        /**
         * Left and right resizing
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        RESIZE_LEFT_RIGHT,
        /**
         * Up and down resizing
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        RESIZE_UP_DOWN,
        /**
         * Screenshot crosshair
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        SCREENSHOT_CHOOSE,
        /**
         * Screenshot
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        SCREENSHOT_CURSOR,
        /**
         * Text selection
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        TEXT_CURSOR,
        /**
         * Zoom in
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        ZOOM_IN,
        /**
         * Zoom out
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        ZOOM_OUT,
        /**
         * Scrolling east
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        MIDDLE_BTN_EAST,
        /**
         * Scrolling west
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        MIDDLE_BTN_WEST,
        /**
         * Scrolling south
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        MIDDLE_BTN_SOUTH,
        /**
         * Scrolling north
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        MIDDLE_BTN_NORTH,
        /**
         * Scrolling north and south
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        MIDDLE_BTN_NORTH_SOUTH,
        /**
         * Scrolling northeast
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        MIDDLE_BTN_NORTH_EAST,
        /**
         * Scrolling northwest
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        MIDDLE_BTN_NORTH_WEST,
        /**
         * Scrolling southeast
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        MIDDLE_BTN_SOUTH_EAST,
        /**
         * Scrolling southwest
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        MIDDLE_BTN_SOUTH_WEST,
        /**
         * Moving as a cone in four directions
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 9
         */
        MIDDLE_BTN_NORTH_SOUTH_WEST_EAST,
        /**
         * Horizontal text selection
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 10
         */
        HORIZONTAL_TEXT_CURSOR,
        /**
         * Precise selection
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 10
         */
        CURSOR_CROSS,
        /**
         * Cursor with circle style
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 10
         */
        CURSOR_CIRCLE,
        /**
         * Loading state with dynamic cursor
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 10
         */
        /**
         * Loading state with dynamic cursor
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @atomicservice
         * @since 12
         */
        LOADING,
        /**
         * Running state with dynamic cursor
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 10
         */
        /**
         * Running state with dynamic cursor
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @atomicservice
         * @since 12
         */
        RUNNING
    }
    /**
     * Mouse button.
     *
     * @enum { number }
     * @syscap SystemCapability.MultimodalInput.Input.Pointer
     * @since 10
     */
    enum PrimaryButton {
        /**
         * Left mouse button
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 10
         */
        LEFT = 0,
        /**
         * Right mouse button
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 10
         */
        RIGHT = 1
    }
    /**
     * Device right menu type.
     *
     * @enum { number }
     * @syscap SystemCapability.MultimodalInput.Input.Pointer
     * @since 10
     */
    enum RightClickType {
        /**
         * Touchpad right button
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 10
         */
        TOUCHPAD_RIGHT_BUTTON = 1,
        /**
         * Touchpad left button
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 10
         */
        TOUCHPAD_LEFT_BUTTON = 2,
        /**
         * Touchpad two fingers tap
         *
         * @syscap SystemCapability.MultimodalInput.Input.Pointer
         * @since 10
         */
        TOUCHPAD_TWO_FINGER_TAP = 3
    }
    /**
     * Sets the pointer style.
     *
     * @param { number } windowId - Window ID.
     * @param { PointerStyle } pointerStyle - Pointer style.
     * @param { AsyncCallback<void> } callback - Callback used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.MultimodalInput.Input.Pointer
     * @since 9
     */
    function setPointerStyle(windowId: number, pointerStyle: PointerStyle, callback: AsyncCallback<void>): void;
    /**
     * Sets the pointer style.
     *
     * @param { number } windowId - Window ID.
     * @param { PointerStyle } pointerStyle - Pointer style.
     * @returns { Promise<void> } Returns the result through a promise.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.MultimodalInput.Input.Pointer
     * @since 9
     */
    function setPointerStyle(windowId: number, pointerStyle: PointerStyle): Promise<void>;
    /**
     * Sets the pointer style through sync mode.
     *
     * @param { number } windowId - Window ID.
     * @param { PointerStyle } pointerStyle - Pointer style.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.MultimodalInput.Input.Pointer
     * @since 10
     */
    function setPointerStyleSync(windowId: number, pointerStyle: PointerStyle): void;
    /**
     * Queries the pointer style.
     *
     * @param { number } windowId - Window ID.
     * @param { AsyncCallback<PointerStyle> } callback - Callback used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.MultimodalInput.Input.Pointer
     * @since 9
     */
    function getPointerStyle(windowId: number, callback: AsyncCallback<PointerStyle>): void;
    /**
     * Queries the pointer style.
     *
     * @param { number } windowId - Window ID.
     * @returns { Promise<PointerStyle> } Returns the result through a promise.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.MultimodalInput.Input.Pointer
     * @since 9
     */
    function getPointerStyle(windowId: number): Promise<PointerStyle>;
    /**
     * Queries the pointer style through sync mode.
     *
     * @param { number } windowId - Window ID.
     * @returns { PointerStyle } Returns the pointerStyle.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.MultimodalInput.Input.Pointer
     * @since 10
     */
    function getPointerStyleSync(windowId: number): PointerStyle;
    /**
     * Sets whether the pointer icon is visible.
     *
     * @param { boolean } visible Whether the pointer icon is visible. The value true indicates that the pointer
     * icon is visible, and the value false indicates the opposite.
     * @param { AsyncCallback<void> } callback - Callback for the input device event.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.MultimodalInput.Input.Pointer
     * @since 9
     */
    function setPointerVisible(visible: boolean, callback: AsyncCallback<void>): void;
    /**
     * Sets whether the pointer icon is visible.
     *
     * @param { boolean } visible Whether the pointer icon is visible. The value true indicates that the pointer
     * icon is visible, and the value false indicates the opposite.
     * @returns { Promise<void> } Returns the result through a promise.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.MultimodalInput.Input.Pointer
     * @since 9
     */
    function setPointerVisible(visible: boolean): Promise<void>;
    /**
     * Sets whether the pointer icon is visible through sync mode.
     *
     * @param { boolean } visible Whether the pointer icon is visible. The value true indicates that the pointer
     * icon is visible, and the value false indicates the opposite.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.MultimodalInput.Input.Pointer
     * @since 10
     */
    function setPointerVisibleSync(visible: boolean): void;
    /**
     * Checks whether the pointer icon is visible.
     *
     * @param { AsyncCallback<boolean> } callback - Returns <b>true</b> if the pointer icon is visible,
     * returns <b>false</b> otherwise.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.MultimodalInput.Input.Pointer
     * @since 9
     */
    function isPointerVisible(callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether the pointer icon is visible.
     *
     * @returns { Promise<boolean> } Returns <b>true</b> if the pointer icon is visible; returns <b>false</b> otherwise.
     * @syscap SystemCapability.MultimodalInput.Input.Pointer
     * @since 9
     */
    function isPointerVisible(): Promise<boolean>;
    /**
     * Checks whether the pointer icon is visible through sync mode.
     *
     * @returns { boolean } Returns true if the pointer icon is visible, returns false otherwise.
     * @syscap SystemCapability.MultimodalInput.Input.Pointer
     * @since 10
     */
    function isPointerVisibleSync(): boolean;
    /**
     * Sets the custom cursor.
     *
     * @param { number } windowId - Window ID.
     * @param { image.PixelMap } pixelMap - the cursor of pixelMap.
     * @param { number } focusX - focus x.
     * @param { number } focusY - focus y.
     * @returns { Promise<void> } Returns the result through a promise.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.MultimodalInput.Input.Pointer
     * @since 11
     */
    function setCustomCursor(windowId: number, pixelMap: image.PixelMap, focusX?: number, focusY?: number): Promise<void>;
    /**
     * Sets the custom cursor through sync mode.
     *
     * @param { number } windowId - Window ID.
     * @param { image.PixelMap } pixelMap - the cursor of pixelMap.
     * @param { number } focusX - focus x.
     * @param { number } focusY - focus y.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.MultimodalInput.Input.Pointer
     * @since 11
     */
    function setCustomCursorSync(windowId: number, pixelMap: image.PixelMap, focusX?: number, focusY?: number): void;
}
export default pointer;
