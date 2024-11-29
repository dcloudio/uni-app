/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS;
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file
 * @kit InputKit
 */
/**
 * KeyCode
 *
 * @enum { number }
 * @syscap SystemCapability.MultimodalInput.Input.Core
 * @since 9
 */
export declare enum KeyCode {
    /**
     * KEYCODE_FN
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_FN = 0,
    /**
     * KEYCODE_UNKNOWN
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_UNKNOWN = -1,
    /**
     * KEYCODE_HOME
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_HOME = 1,
    /**
     * KEYCODE_BACK
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BACK = 2,
    /**
     * KEYCODE_MEDIA_PLAY_PAUSE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    /**
     * KEYCODE_MEDIA_PLAY_PAUSE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @atomicservice
     * @since 12
     */
    KEYCODE_MEDIA_PLAY_PAUSE = 10,
    /**
     * KEYCODE_MEDIA_STOP
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    /**
     * KEYCODE_MEDIA_STOP
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @atomicservice
     * @since 12
     */
    KEYCODE_MEDIA_STOP = 11,
    /**
     * KEYCODE_MEDIA_NEXT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    /**
     * KEYCODE_MEDIA_NEXT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @atomicservice
     * @since 12
     */
    KEYCODE_MEDIA_NEXT = 12,
    /**
     * KEYCODE_MEDIA_PREVIOUS
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    /**
     * KEYCODE_MEDIA_PREVIOUS
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @atomicservice
     * @since 12
     */
    KEYCODE_MEDIA_PREVIOUS = 13,
    /**
     * KEYCODE_MEDIA_REWIND
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    /**
     * KEYCODE_MEDIA_REWIND
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @atomicservice
     * @since 12
     */
    KEYCODE_MEDIA_REWIND = 14,
    /**
     * KEYCODE_MEDIA_FAST_FORWARD
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    /**
     * KEYCODE_MEDIA_FAST_FORWARD
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @atomicservice
     * @since 12
     */
    KEYCODE_MEDIA_FAST_FORWARD = 15,
    /**
     * KEYCODE_VOLUME_UP
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_VOLUME_UP = 16,
    /**
     * KEYCODE_VOLUME_DOWN
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_VOLUME_DOWN = 17,
    /**
     * KEYCODE_POWER
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_POWER = 18,
    /**
     * KEYCODE_CAMERA
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_CAMERA = 19,
    /**
     * KEYCODE_VOLUME_MUTE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_VOLUME_MUTE = 22,
    /**
     * KEYCODE_MUTE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_MUTE = 23,
    /**
     * KEYCODE_BRIGHTNESS_UP
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BRIGHTNESS_UP = 40,
    /**
     * KEYCODE_BRIGHTNESS_DOWN
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BRIGHTNESS_DOWN = 41,
    /**
     * KEYCODE_0
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_0 = 2000,
    /**
     * KEYCODE_1
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_1 = 2001,
    /**
     * KEYCODE_2
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_2 = 2002,
    /**
     * KEYCODE_3
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_3 = 2003,
    /**
     * KEYCODE_4
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_4 = 2004,
    /**
     * KEYCODE_5
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_5 = 2005,
    /**
     * KEYCODE_6
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_6 = 2006,
    /**
     * KEYCODE_7
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_7 = 2007,
    /**
     * KEYCODE_8
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_8 = 2008,
    /**
     * KEYCODE_9
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_9 = 2009,
    /**
     * KEYCODE_STAR
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_STAR = 2010,
    /**
     * KEYCODE_POUND
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_POUND = 2011,
    /**
     * KEYCODE_DPAD_UP
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_DPAD_UP = 2012,
    /**
     * KEYCODE_DPAD_DOWN
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_DPAD_DOWN = 2013,
    /**
     * KEYCODE_DPAD_LEFT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_DPAD_LEFT = 2014,
    /**
     * KEYCODE_DPAD_RIGHT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_DPAD_RIGHT = 2015,
    /**
     * KEYCODE_DPAD_CENTER
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_DPAD_CENTER = 2016,
    /**
     * KEYCODE_A
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_A = 2017,
    /**
     * KEYCODE_B
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_B = 2018,
    /**
     * KEYCODE_C
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_C = 2019,
    /**
     * KEYCODE_D
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_D = 2020,
    /**
     * KEYCODE_E
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_E = 2021,
    /**
     * KEYCODE_F
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_F = 2022,
    /**
     * KEYCODE_G
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_G = 2023,
    /**
     * KEYCODE_H
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_H = 2024,
    /**
     * KEYCODE_I
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_I = 2025,
    /**
     * KEYCODE_J
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_J = 2026,
    /**
     * KEYCODE_K
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_K = 2027,
    /**
     * KEYCODE_L
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_L = 2028,
    /**
     * KEYCODE_M
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_M = 2029,
    /**
     * KEYCODE_N
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_N = 2030,
    /**
     * KEYCODE_O
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_O = 2031,
    /**
     * KEYCODE_P
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_P = 2032,
    /**
     * KEYCODE_Q
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_Q = 2033,
    /**
     * KEYCODE_R
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_R = 2034,
    /**
     * KEYCODE_S
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_S = 2035,
    /**
     * KEYCODE_T
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_T = 2036,
    /**
     * KEYCODE_U
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_U = 2037,
    /**
     * KEYCODE_V
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_V = 2038,
    /**
     * KEYCODE_W
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_W = 2039,
    /**
     * KEYCODE_X
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_X = 2040,
    /**
     * KEYCODE_Y
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_Y = 2041,
    /**
     * KEYCODE_Z
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_Z = 2042,
    /**
     * KEYCODE_COMMA
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_COMMA = 2043,
    /**
     * KEYCODE_PERIOD
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_PERIOD = 2044,
    /**
     * KEYCODE_ALT_LEFT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_ALT_LEFT = 2045,
    /**
     * KEYCODE_ALT_RIGHT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_ALT_RIGHT = 2046,
    /**
     * KEYCODE_SHIFT_LEFT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SHIFT_LEFT = 2047,
    /**
     * KEYCODE_SHIFT_RIGHT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SHIFT_RIGHT = 2048,
    /**
     * KEYCODE_TAB
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_TAB = 2049,
    /**
     * KEYCODE_SPACE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SPACE = 2050,
    /**
     * KEYCODE_SYM
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SYM = 2051,
    /**
     * KEYCODE_EXPLORER
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_EXPLORER = 2052,
    /**
     * KEYCODE_ENVELOPE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_ENVELOPE = 2053,
    /**
     * KEYCODE_ENTER
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_ENTER = 2054,
    /**
     * KEYCODE_DEL
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_DEL = 2055,
    /**
     * KEYCODE_GRAVE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_GRAVE = 2056,
    /**
     * KEYCODE_MINUS
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_MINUS = 2057,
    /**
     * KEYCODE_EQUALS
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_EQUALS = 2058,
    /**
     * KEYCODE_LEFT_BRACKET
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_LEFT_BRACKET = 2059,
    /**
     * KEYCODE_RIGHT_BRACKET
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_RIGHT_BRACKET = 2060,
    /**
     * KEYCODE_BACKSLASH
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BACKSLASH = 2061,
    /**
     * KEYCODE_SEMICOLON
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SEMICOLON = 2062,
    /**
     * KEYCODE_APOSTROPHE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_APOSTROPHE = 2063,
    /**
     * KEYCODE_SLASH
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SLASH = 2064,
    /**
     * KEYCODE_AT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_AT = 2065,
    /**
     * KEYCODE_PLUS
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_PLUS = 2066,
    /**
     * KEYCODE_MENU
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_MENU = 2067,
    /**
     * KEYCODE_PAGE_UP
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_PAGE_UP = 2068,
    /**
     * KEYCODE_PAGE_DOWN
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_PAGE_DOWN = 2069,
    /**
     * KEYCODE_ESCAPE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_ESCAPE = 2070,
    /**
     * KEYCODE_FORWARD_DEL
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_FORWARD_DEL = 2071,
    /**
     * KEYCODE_CTRL_LEFT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_CTRL_LEFT = 2072,
    /**
     * KEYCODE_CTRL_RIGHT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_CTRL_RIGHT = 2073,
    /**
     * KEYCODE_CAPS_LOCK
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_CAPS_LOCK = 2074,
    /**
     * KEYCODE_SCROLL_LOCK
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SCROLL_LOCK = 2075,
    /**
     * KEYCODE_META_LEFT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_META_LEFT = 2076,
    /**
     * KEYCODE_META_RIGHT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_META_RIGHT = 2077,
    /**
     * KEYCODE_FUNCTION
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_FUNCTION = 2078,
    /**
     * KEYCODE_SYSRQ
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SYSRQ = 2079,
    /**
     * KEYCODE_BREAK
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BREAK = 2080,
    /**
     * KEYCODE_MOVE_HOME
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_MOVE_HOME = 2081,
    /**
     * KEYCODE_MOVE_END
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_MOVE_END = 2082,
    /**
     * KEYCODE_INSERT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_INSERT = 2083,
    /**
     * KEYCODE_FORWARD
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_FORWARD = 2084,
    /**
     * KEYCODE_MEDIA_PLAY
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    /**
     * KEYCODE_MEDIA_PLAY
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @atomicservice
     * @since 12
     */
    KEYCODE_MEDIA_PLAY = 2085,
    /**
     * KEYCODE_MEDIA_PAUSE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    /**
     * KEYCODE_MEDIA_PAUSE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @atomicservice
     * @since 12
     */
    KEYCODE_MEDIA_PAUSE = 2086,
    /**
     * KEYCODE_MEDIA_CLOSE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_MEDIA_CLOSE = 2087,
    /**
     * KEYCODE_MEDIA_EJECT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_MEDIA_EJECT = 2088,
    /**
     * KEYCODE_MEDIA_RECORD
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_MEDIA_RECORD = 2089,
    /**
     * KEYCODE_F1
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_F1 = 2090,
    /**
     * KEYCODE_F2
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_F2 = 2091,
    /**
     * KEYCODE_F3
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_F3 = 2092,
    /**
     * KEYCODE_F4
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_F4 = 2093,
    /**
     * KEYCODE_F5
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_F5 = 2094,
    /**
     * KEYCODE_F6
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_F6 = 2095,
    /**
     * KEYCODE_F7
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_F7 = 2096,
    /**
     * KEYCODE_F8
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_F8 = 2097,
    /**
     * KEYCODE_F9
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_F9 = 2098,
    /**
     * KEYCODE_F10
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_F10 = 2099,
    /**
     * KEYCODE_F11
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_F11 = 2100,
    /**
     * KEYCODE_F12
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_F12 = 2101,
    /**
     * KEYCODE_NUM_LOCK
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_NUM_LOCK = 2102,
    /**
     * KEYCODE_NUMPAD_0
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_NUMPAD_0 = 2103,
    /**
     * KEYCODE_NUMPAD_1
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_NUMPAD_1 = 2104,
    /**
     * KEYCODE_NUMPAD_2
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_NUMPAD_2 = 2105,
    /**
     * KEYCODE_NUMPAD_3
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_NUMPAD_3 = 2106,
    /**
     * KEYCODE_NUMPAD_4
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_NUMPAD_4 = 2107,
    /**
     * KEYCODE_NUMPAD_5
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_NUMPAD_5 = 2108,
    /**
     * KEYCODE_NUMPAD_6
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_NUMPAD_6 = 2109,
    /**
     * KEYCODE_NUMPAD_7
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_NUMPAD_7 = 2110,
    /**
     * KEYCODE_NUMPAD_8
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_NUMPAD_8 = 2111,
    /**
     * KEYCODE_NUMPAD_9
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_NUMPAD_9 = 2112,
    /**
     * KEYCODE_NUMPAD_DIVIDE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_NUMPAD_DIVIDE = 2113,
    /**
     * KEYCODE_NUMPAD_MULTIPLY
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_NUMPAD_MULTIPLY = 2114,
    /**
     * KEYCODE_NUMPAD_SUBTRACT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_NUMPAD_SUBTRACT = 2115,
    /**
     * KEYCODE_NUMPAD_ADD
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_NUMPAD_ADD = 2116,
    /**
     * KEYCODE_NUMPAD_DOT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_NUMPAD_DOT = 2117,
    /**
     * KEYCODE_NUMPAD_COMMA
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_NUMPAD_COMMA = 2118,
    /**
     * KEYCODE_NUMPAD_ENTER
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_NUMPAD_ENTER = 2119,
    /**
     * KEYCODE_NUMPAD_EQUALS
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_NUMPAD_EQUALS = 2120,
    /**
     * KEYCODE_NUMPAD_LEFT_PAREN
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_NUMPAD_LEFT_PAREN = 2121,
    /**
     * KEYCODE_NUMPAD_RIGHT_PAREN
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_NUMPAD_RIGHT_PAREN = 2122,
    /**
     * KEYCODE_VIRTUAL_MULTITASK
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_VIRTUAL_MULTITASK = 2210,
    /**
     * KEYCODE_SLEEP
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SLEEP = 2600,
    /**
     * KEYCODE_ZENKAKU_HANKAKU
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_ZENKAKU_HANKAKU = 2601,
    /**
     * KEYCODE_102ND
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_102ND = 2602,
    /**
     * KEYCODE_RO
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_RO = 2603,
    /**
     * KEYCODE_KATAKANA
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_KATAKANA = 2604,
    /**
     * KEYCODE_HIRAGANA
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_HIRAGANA = 2605,
    /**
     * KEYCODE_HENKAN
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_HENKAN = 2606,
    /**
     * KEYCODE_KATAKANA_HIRAGANA
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_KATAKANA_HIRAGANA = 2607,
    /**
     * KEYCODE_MUHENKAN
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_MUHENKAN = 2608,
    /**
     * KEYCODE_LINEFEED
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_LINEFEED = 2609,
    /**
     * KEYCODE_MACRO
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_MACRO = 2610,
    /**
     * KEYCODE_NUMPAD_PLUSMINUS
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_NUMPAD_PLUSMINUS = 2611,
    /**
     * KEYCODE_SCALE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SCALE = 2612,
    /**
     * KEYCODE_HANGUEL
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_HANGUEL = 2613,
    /**
     * KEYCODE_HANJA
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_HANJA = 2614,
    /**
     * KEYCODE_YEN
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_YEN = 2615,
    /**
     * KEYCODE_STOP
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_STOP = 2616,
    /**
     * KEYCODE_AGAIN
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_AGAIN = 2617,
    /**
     * KEYCODE_PROPS
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_PROPS = 2618,
    /**
     * KEYCODE_UNDO
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_UNDO = 2619,
    /**
     * KEYCODE_COPY
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_COPY = 2620,
    /**
     * KEYCODE_OPEN
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_OPEN = 2621,
    /**
     * KEYCODE_PASTE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_PASTE = 2622,
    /**
     * KEYCODE_FIND
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_FIND = 2623,
    /**
     * KEYCODE_CUT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_CUT = 2624,
    /**
     * KEYCODE_HELP
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_HELP = 2625,
    /**
     * KEYCODE_CALC
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_CALC = 2626,
    /**
     * KEYCODE_FILE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_FILE = 2627,
    /**
     * KEYCODE_BOOKMARKS
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BOOKMARKS = 2628,
    /**
     * KEYCODE_NEXT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_NEXT = 2629,
    /**
     * KEYCODE_PLAYPAUSE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_PLAYPAUSE = 2630,
    /**
     * KEYCODE_PREVIOUS
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_PREVIOUS = 2631,
    /**
     * KEYCODE_STOPCD
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_STOPCD = 2632,
    /**
     * KEYCODE_CONFIG
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_CONFIG = 2634,
    /**
     * KEYCODE_REFRESH
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_REFRESH = 2635,
    /**
     * KEYCODE_EXIT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_EXIT = 2636,
    /**
     * KEYCODE_EDIT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_EDIT = 2637,
    /**
     * KEYCODE_SCROLLUP
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SCROLLUP = 2638,
    /**
     * KEYCODE_SCROLLDOWN
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SCROLLDOWN = 2639,
    /**
     * KEYCODE_NEW
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_NEW = 2640,
    /**
     * KEYCODE_REDO
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_REDO = 2641,
    /**
     * KEYCODE_CLOSE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_CLOSE = 2642,
    /**
     * KEYCODE_PLAY
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_PLAY = 2643,
    /**
     * KEYCODE_BASSBOOST
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BASSBOOST = 2644,
    /**
     * KEYCODE_PRINT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_PRINT = 2645,
    /**
     * KEYCODE_CHAT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_CHAT = 2646,
    /**
     * KEYCODE_FINANCE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_FINANCE = 2647,
    /**
     * KEYCODE_CANCEL
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_CANCEL = 2648,
    /**
     * KEYCODE_KBDILLUM_TOGGLE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_KBDILLUM_TOGGLE = 2649,
    /**
     * KEYCODE_KBDILLUM_DOWN
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_KBDILLUM_DOWN = 2650,
    /**
     * KEYCODE_KBDILLUM_UP
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_KBDILLUM_UP = 2651,
    /**
     * KEYCODE_SEND
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SEND = 2652,
    /**
     * KEYCODE_REPLY
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_REPLY = 2653,
    /**
     * KEYCODE_FORWARDMAIL
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_FORWARDMAIL = 2654,
    /**
     * KEYCODE_SAVE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SAVE = 2655,
    /**
     * KEYCODE_DOCUMENTS
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_DOCUMENTS = 2656,
    /**
     * KEYCODE_VIDEO_NEXT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_VIDEO_NEXT = 2657,
    /**
     * KEYCODE_VIDEO_PREV
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_VIDEO_PREV = 2658,
    /**
     * KEYCODE_BRIGHTNESS_CYCLE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BRIGHTNESS_CYCLE = 2659,
    /**
     * KEYCODE_BRIGHTNESS_ZERO
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BRIGHTNESS_ZERO = 2660,
    /**
     * KEYCODE_DISPLAY_OFF
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_DISPLAY_OFF = 2661,
    /**
     * KEYCODE_BTN_MISC
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BTN_MISC = 2662,
    /**
     * KEYCODE_GOTO
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_GOTO = 2663,
    /**
     * KEYCODE_INFO
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_INFO = 2664,
    /**
     * KEYCODE_PROGRAM
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_PROGRAM = 2665,
    /**
     * KEYCODE_PVR
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_PVR = 2666,
    /**
     * KEYCODE_SUBTITLE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SUBTITLE = 2667,
    /**
     * KEYCODE_FULL_SCREEN
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_FULL_SCREEN = 2668,
    /**
     * KEYCODE_KEYBOARD
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_KEYBOARD = 2669,
    /**
     * KEYCODE_ASPECT_RATIO
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_ASPECT_RATIO = 2670,
    /**
     * KEYCODE_PC
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_PC = 2671,
    /**
     * KEYCODE_TV
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_TV = 2672,
    /**
     * KEYCODE_TV2
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_TV2 = 2673,
    /**
     * KEYCODE_VCR
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_VCR = 2674,
    /**
     * KEYCODE_VCR2
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_VCR2 = 2675,
    /**
     * KEYCODE_SAT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SAT = 2676,
    /**
     * KEYCODE_CD
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_CD = 2677,
    /**
     * KEYCODE_TAPE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_TAPE = 2678,
    /**
     * KEYCODE_TUNER
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_TUNER = 2679,
    /**
     * KEYCODE_PLAYER
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_PLAYER = 2680,
    /**
     * KEYCODE_DVD
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_DVD = 2681,
    /**
     * KEYCODE_AUDIO
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_AUDIO = 2682,
    /**
     * KEYCODE_VIDEO
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_VIDEO = 2683,
    /**
     * KEYCODE_MEMO
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_MEMO = 2684,
    /**
     * KEYCODE_CALENDAR
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_CALENDAR = 2685,
    /**
     * KEYCODE_RED
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_RED = 2686,
    /**
     * KEYCODE_GREEN
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_GREEN = 2687,
    /**
     * KEYCODE_YELLOW
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_YELLOW = 2688,
    /**
     * KEYCODE_BLUE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BLUE = 2689,
    /**
     * KEYCODE_CHANNELUP
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_CHANNELUP = 2690,
    /**
     * KEYCODE_CHANNELDOWN
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_CHANNELDOWN = 2691,
    /**
     * KEYCODE_LAST
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_LAST = 2692,
    /**
     * KEYCODE_RESTART
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_RESTART = 2693,
    /**
     * KEYCODE_SLOW
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SLOW = 2694,
    /**
     * KEYCODE_SHUFFLE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SHUFFLE = 2695,
    /**
     * KEYCODE_VIDEOPHONE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_VIDEOPHONE = 2696,
    /**
     * KEYCODE_GAMES
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_GAMES = 2697,
    /**
     * KEYCODE_ZOOMIN
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_ZOOMIN = 2698,
    /**
     * KEYCODE_ZOOMOUT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_ZOOMOUT = 2699,
    /**
     * KEYCODE_ZOOMRESET
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_ZOOMRESET = 2700,
    /**
     * KEYCODE_WORDPROCESSOR
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_WORDPROCESSOR = 2701,
    /**
     * KEYCODE_EDITOR
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_EDITOR = 2702,
    /**
     * KEYCODE_SPREADSHEET
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SPREADSHEET = 2703,
    /**
     * KEYCODE_GRAPHICSEDITOR
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_GRAPHICSEDITOR = 2704,
    /**
     * KEYCODE_PRESENTATION
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_PRESENTATION = 2705,
    /**
     * KEYCODE_DATABASE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_DATABASE = 2706,
    /**
     * KEYCODE_NEWS
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_NEWS = 2707,
    /**
     * KEYCODE_VOICEMAIL
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_VOICEMAIL = 2708,
    /**
     * KEYCODE_ADDRESSBOOK
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_ADDRESSBOOK = 2709,
    /**
     * KEYCODE_MESSENGER
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_MESSENGER = 2710,
    /**
     * KEYCODE_BRIGHTNESS_TOGGLE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BRIGHTNESS_TOGGLE = 2711,
    /**
     * KEYCODE_SPELLCHECK
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SPELLCHECK = 2712,
    /**
     * KEYCODE_COFFEE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_COFFEE = 2713,
    /**
     * KEYCODE_MEDIA_REPEAT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_MEDIA_REPEAT = 2714,
    /**
     * KEYCODE_IMAGES
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_IMAGES = 2715,
    /**
     * KEYCODE_BUTTONCONFIG
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BUTTONCONFIG = 2716,
    /**
     * KEYCODE_TASKMANAGER
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_TASKMANAGER = 2717,
    /**
     * KEYCODE_JOURNAL
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_JOURNAL = 2718,
    /**
     * KEYCODE_CONTROLPANEL
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_CONTROLPANEL = 2719,
    /**
     * KEYCODE_APPSELECT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_APPSELECT = 2720,
    /**
     * KEYCODE_SCREENSAVER
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SCREENSAVER = 2721,
    /**
     * KEYCODE_ASSISTANT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_ASSISTANT = 2722,
    /**
     * KEYCODE_KBD_LAYOUT_NEXT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_KBD_LAYOUT_NEXT = 2723,
    /**
     * KEYCODE_BRIGHTNESS_MIN
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BRIGHTNESS_MIN = 2724,
    /**
     * KEYCODE_BRIGHTNESS_MAX
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BRIGHTNESS_MAX = 2725,
    /**
     * KEYCODE_KBDINPUTASSIST_PREV
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_KBDINPUTASSIST_PREV = 2726,
    /**
     * KEYCODE_KBDINPUTASSIST_NEXT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_KBDINPUTASSIST_NEXT = 2727,
    /**
     * KEYCODE_KBDINPUTASSIST_PREVGROUP
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_KBDINPUTASSIST_PREVGROUP = 2728,
    /**
     * KEYCODE_KBDINPUTASSIST_NEXTGROUP
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_KBDINPUTASSIST_NEXTGROUP = 2729,
    /**
     * KEYCODE_KBDINPUTASSIST_ACCEPT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_KBDINPUTASSIST_ACCEPT = 2730,
    /**
     * KEYCODE_KBDINPUTASSIST_CANCEL
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_KBDINPUTASSIST_CANCEL = 2731,
    /**
     * KEYCODE_FRONT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_FRONT = 2800,
    /**
     * KEYCODE_SETUP
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SETUP = 2801,
    /**
     * KEYCODE_WAKEUP
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_WAKEUP = 2802,
    /**
     * KEYCODE_SENDFILE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SENDFILE = 2803,
    /**
     * KEYCODE_DELETEFILE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_DELETEFILE = 2804,
    /**
     * KEYCODE_XFER
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_XFER = 2805,
    /**
     * KEYCODE_PROG1
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_PROG1 = 2806,
    /**
     * KEYCODE_PROG2
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_PROG2 = 2807,
    /**
     * KEYCODE_MSDOS
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_MSDOS = 2808,
    /**
     * KEYCODE_SCREENLOCK
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SCREENLOCK = 2809,
    /**
     * KEYCODE_DIRECTION_ROTATE_DISPLAY
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_DIRECTION_ROTATE_DISPLAY = 2810,
    /**
     * KEYCODE_CYCLEWINDOWS
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_CYCLEWINDOWS = 2811,
    /**
     * KEYCODE_COMPUTER
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_COMPUTER = 2812,
    /**
     * KEYCODE_EJECTCLOSECD
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_EJECTCLOSECD = 2813,
    /**
     * KEYCODE_ISO
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_ISO = 2814,
    /**
     * KEYCODE_MOVE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_MOVE = 2815,
    /**
     * KEYCODE_F13
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_F13 = 2816,
    /**
     * KEYCODE_F14
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_F14 = 2817,
    /**
     * KEYCODE_F15
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_F15 = 2818,
    /**
     * KEYCODE_F16
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_F16 = 2819,
    /**
     * KEYCODE_F17
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_F17 = 2820,
    /**
     * KEYCODE_F18
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_F18 = 2821,
    /**
     * KEYCODE_F19
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_F19 = 2822,
    /**
     * KEYCODE_F20
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_F20 = 2823,
    /**
     * KEYCODE_F21
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_F21 = 2824,
    /**
     * KEYCODE_F22
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_F22 = 2825,
    /**
     * KEYCODE_F23
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_F23 = 2826,
    /**
     * KEYCODE_F24
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_F24 = 2827,
    /**
     * KEYCODE_PROG3
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_PROG3 = 2828,
    /**
     * KEYCODE_PROG4
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_PROG4 = 2829,
    /**
     * KEYCODE_DASHBOARD
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_DASHBOARD = 2830,
    /**
     * KEYCODE_SUSPEND
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SUSPEND = 2831,
    /**
     * KEYCODE_HP
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_HP = 2832,
    /**
     * KEYCODE_SOUND
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SOUND = 2833,
    /**
     * KEYCODE_QUESTION
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_QUESTION = 2834,
    /**
     * KEYCODE_CONNECT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_CONNECT = 2836,
    /**
     * KEYCODE_SPORT
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SPORT = 2837,
    /**
     * KEYCODE_SHOP
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SHOP = 2838,
    /**
     * KEYCODE_ALTERASE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_ALTERASE = 2839,
    /**
     * KEYCODE_SWITCHVIDEOMODE
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_SWITCHVIDEOMODE = 2841,
    /**
     * KEYCODE_BATTERY
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BATTERY = 2842,
    /**
     * KEYCODE_BLUETOOTH
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BLUETOOTH = 2843,
    /**
     * KEYCODE_WLAN
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_WLAN = 2844,
    /**
     * KEYCODE_UWB
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_UWB = 2845,
    /**
     * KEYCODE_WWAN_WIMAX
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_WWAN_WIMAX = 2846,
    /**
     * KEYCODE_RFKILL
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_RFKILL = 2847,
    /**
     * KEYCODE_CHANNEL
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_CHANNEL = 3001,
    /**
     * KEYCODE_BTN_0
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BTN_0 = 3100,
    /**
     * KEYCODE_BTN_1
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BTN_1 = 3101,
    /**
     * KEYCODE_BTN_2
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BTN_2 = 3102,
    /**
     * KEYCODE_BTN_3
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BTN_3 = 3103,
    /**
     * KEYCODE_BTN_4
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BTN_4 = 3104,
    /**
     * KEYCODE_BTN_5
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BTN_5 = 3105,
    /**
     * KEYCODE_BTN_6
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BTN_6 = 3106,
    /**
     * KEYCODE_BTN_7
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BTN_7 = 3107,
    /**
     * KEYCODE_BTN_8
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BTN_8 = 3108,
    /**
     * KEYCODE_BTN_9
     *
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    KEYCODE_BTN_9 = 3109
}
