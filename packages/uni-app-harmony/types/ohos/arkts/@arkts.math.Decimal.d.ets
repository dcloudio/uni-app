/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
 * @file Defines the Decimal for ArkTS. Decimal support arbitrary precision decimal operation.
 * @kit ArkTS
 */

/**
 * The type uesd to set rounding
 *
 * @syscap SystemCapability.Utils.Lang
 * @crossplatform
 * @atomicservice
 * @since 12
 */
type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

/**
 * The type uesd to set modulo
 *
 * @syscap SystemCapability.Utils.Lang
 * @crossplatform
 * @atomicservice
 * @since 12
 */
type Modulo = Rounding | 9;

/**
 * The type uesd to denote decimal value
 *
 * @syscap SystemCapability.Utils.Lang
 * @crossplatform
 * @atomicservice
 * @since 12
 */
type Value = string | number | Decimal;

/**
 * Provides configuration for decimal.
 *
 * @interface DecimalConfig
 * @syscap SystemCapability.Utils.Lang
 * @crossplatform
 * @atomicservice
 * @since 12
 */
interface DecimalConfig {
  /**
   * The maximum number of significant digits of the result of an operation.
   * Default value: 20
   *
   * @type { number } integer, 1 to 1e+9 inclusive
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  precision?: number;
  /**
   * The default rounding mode used when rounding the result of an operation to precision significant digits,
   * and when rounding the return value of the round, toBinary, toDecimalPlaces, toExponential, toFixed,
   * toHexadecimal, toNearest, toOctal, toPrecision and toSignificantDigits methods.
   * Default value: 4 (ROUND_HALF_UP)
   *
   * @type { number } integer, integer, 0 to 8 inclusive
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  rounding?: Rounding;
  /**
   * The negative exponent value at and below which toString returns exponential notation.
   * Default value: -7
   *
   * @type { number } integer, -9e15 to 0 inclusive
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toExpNeg?: number;
  /**
   * The positive exponent value at and above which toString returns exponential notation.
   * Default value: 20
   *
   * @type { number } integer, 0 to 9e15 inclusive
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toExpPos?: number;
  /**
   * The negative exponent limit, i.e. the exponent value below which underflow to zero occurs.
   * Default value: -9e15
   *
   * @type { number } integer, -9e15 to 0 inclusive
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  minE?: number;
  /**
   * The positive exponent limit, i.e. the exponent value above which overflow to Infinity occurs.
   * Default value: 9e15
   *
   * @type { number } integer, 0 to 9e15 inclusive
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  maxE?: number;
  /**
   * The value that determines whether cryptographically-secure pseudo-random number generation is used.
   * Default value: false
   *
   * @type { boolean }
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  crypto?: boolean;
  /**
   * The modulo mode used when calculating the modulus: a mod n.
   * Default value: 1 (ROUND_DOWN)
   *
   * @type { number } integer, 0 to 9 inclusive
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  modulo?: Modulo;
  /**
   * If object has a 'defaults' property with value true then the new constructor will use the default configuration.
   * Default value: false
   *
   * @type { boolean }
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  defaults?: boolean;
}

/**
 * An arbitrary-precision Decimal type
 *
 * @syscap SystemCapability.Utils.Lang
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare class Decimal {
  /**
   * The numbers of decimal digits.
   *
   * @type { number[] }
   * @readonly
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  readonly d: number[];

  /**
   * The number of decimal exponent.
   *
   * @type { number }
   * @readonly
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  readonly e: number;

  /**
   * The number of decimal sign.
   *
   * @type { number }
   * @readonly
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  readonly s: number;

  /**
   * Return a new Decimal whose value is the absolute value of this Decimal.
   *
   * @param { Value } n {number | string | Decimal}
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  constructor(n: Value);

  /**
   * Return a new Decimal whose value is the absolute value of this Decimal.
   *
   * @returns { Decimal } the Decimal type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  abs(): Decimal;

  /**
   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
   * direction of negative Infinity.
   *
   * @returns { Decimal } the Decimal type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  floor(): Decimal;

  /**
   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
   * direction of positive Infinity.
   *
   * @returns { Decimal } the Decimal type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  ceil(): Decimal;

  /**
   * Return a new Decimal whose value is the value of this Decimal truncated to a whole number.
   *
   * @returns { Decimal } the Decimal type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  trunc(): Decimal;

  /**
   * Return a new Decimal whose value is the value of this Decimal clamped to the range
   * delineated by `min` and `max`.
   *
   * @param { Value } min {number | string | Decimal}
   * @param { Value } max {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @throws { BusinessError } 10200001 - The value of `min` is out of range.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  clamp(min: Value, max: Value): Decimal;

  /**
   * Return a new Decimal whose value is the value of this Decimal plus `n`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  add(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is the value of this Decimal minus `n`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  sub(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is this Decimal times `n`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  mul(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is the value of this Decimal divided by `n`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  div(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is the value of this Decimal modulo `n`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal }the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  mod(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is the square root of this Decimal, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * @returns { Decimal } the Decimal type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  sqrt(): Decimal;

  /**
   * Return a new Decimal whose value is the cube root of the value of this Decimal, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * @returns { Decimal } the Decimal type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  cbrt(): Decimal;

  /**
   * Return a new Decimal whose value is the value of this Decimal raised to the power `n`, rounded
   * to `precision` significant digits using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @throws { BusinessError } 10200060 - Precision limit exceeded.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  pow(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is the natural exponential of the value of this Decimal,
   * i.e. the base e raised to the power the value of this Decimal, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 10200060 - Precision limit exceeded.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  exp(): Decimal;

  /**
   * Return the logarithm of the value of this Decimal to the specified base, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @throws { BusinessError } 10200060 - Precision limit exceeded.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  log(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is the natural logarithm of the value of this Decimal,
   * rounded to `precision` significant digits using rounding mode `rounding`.
   *
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 10200060 - Precision limit exceeded.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  ln(): Decimal;

  /**
   * Return a new Decimal whose value is the cosine of the value in radians of this Decimal.
   *
   * @returns { Decimal } the Decimal type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  cos(): Decimal;

  /**
   * Return a new Decimal whose value is the sine of the value in radians of this Decimal.
   *
   * @returns { Decimal } the Decimal type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  sin(): Decimal;

  /**
   * Return a new Decimal whose value is the tangent of the value in radians of this Decimal.
   *
   * @returns { Decimal } the Decimal type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  tan(): Decimal;

  /**
   * Return a new Decimal whose value is the hyperbolic cosine of the value in radians of this
   * Decimal.
   *
   * @returns { Decimal } the Decimal type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  cosh(): Decimal;

  /**
   * Return a new Decimal whose value is the hyperbolic sine of the value in radians of this Decimal.
   *
   * @returns { Decimal } the Decimal type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  sinh(): Decimal;

  /**
   * Return a new Decimal whose value is the hyperbolic tangent of the value in radians of this Decimal.
   *
   * @returns { Decimal } the Decimal type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  tanh(): Decimal;

  /**
   * Return a new Decimal whose value is the arccosine (inverse cosine) in radians of the value of this Decimal.
   *
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 10200060 - Precision limit exceeded.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  acos(): Decimal;

  /**
   * Return a new Decimal whose value is the arcsine (inverse sine) in radians of the value of this
   * Decimal.
   *
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 10200060 - Precision limit exceeded.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  asin(): Decimal;

  /**
   * Return a new Decimal whose value is the arctangent (inverse tangent) in radians of the value of this Decimal.
   *
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 10200060 - Precision limit exceeded.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  atan(): Decimal;

  /**
   * Return a new Decimal whose value is the inverse of the hyperbolic cosine in radians of the
   * value of this Decimal.
   *
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 10200060 - Precision limit exceeded.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  acosh(): Decimal;

  /**
   * Return a new Decimal whose value is the inverse of the hyperbolic sine in radians of the value
   * of this Decimal.
   *
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 10200060 - Precision limit exceeded.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  asinh(): Decimal;

  /**
   * Return a new Decimal whose value is the inverse of the hyperbolic tangent in radians of the
   * value of this Decimal.
   *
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 10200060 - Precision limit exceeded.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  atanh(): Decimal;

  /**
   * Return
   *   1    if the value of this Decimal is greater than the value of `n`,
   *  -1    if the value of this Decimal is less than the value of `n`,
   *   0    if they have the same value,
   *   NaN  if the value of either Decimal is NaN.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { number } the number type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  comparedTo(n: Value): number;

  /**
   * Return true if the value of this Decimal is equal to the value of `n`, otherwise return false.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { boolean } the boolean type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  equals(n: Value): boolean;

  /**
   * Return true if the value of this Decimal is greater than the value of `n`, otherwise return false.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { boolean } the boolean type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  greaterThan(n: Value): boolean;

  /**
   * Return true if the value of this Decimal is greater than or equal to the value of `n`,
   * otherwise return false.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { boolean } the boolean type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  greaterThanOrEqualTo(n: Value): boolean;

  /**
   * Return true if the value of this Decimal is less than `n`, otherwise return false.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { boolean } the boolean type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  lessThan(n: Value): boolean;

  /**
   * Return true if the value of this Decimal is less than or equal to `n`, otherwise return false.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { boolean } the boolean type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  lessThanOrEqualTo(n: Value): boolean;

  /**
   * Return true if the value of this Decimal is a finite number, otherwise return false.
   *
   * @returns { boolean } the boolean type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  isFinite(): boolean;

  /**
   * Return true if the value of this Decimal is an integer, otherwise return false.
   *
   * @returns { boolean } the boolean type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  isInteger(): boolean;

  /**
   * Return true if the value of this Decimal is NaN, otherwise return false.
   *
   * @returns { boolean } the boolean type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  isNaN(): boolean;

  /**
   * Return true if the value of this Decimal is negative, otherwise return false.
   *
   * @returns { boolean } the boolean type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  isNegative(): boolean;

  /**
   * Return true if the value of this Decimal is positive, otherwise return false.
   *
   * @returns { boolean } the boolean type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  isPositive(): boolean;

  /**
   * Return true if the value of this Decimal is 0 or -0, otherwise return false.
   *
   * @returns { boolean } the boolean type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  isZero(): boolean;

  /**
   * Return a new Decimal whose value is the integer part of dividing the value of this Decimal
   * by the value of `n`, rounded to `precision` significant digits using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  dividedToIntegerBy(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is the value of this Decimal negated, i.e. as if multiplied by -1.
   *
   * @returns { Decimal } the Decimal type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  negate(): Decimal;

  /**
   * Return a string representing the value of this Decimal in base 2.
   *
   * @returns { string } the string type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toBinary(): string;

  /**
   * Return a string representing the value of this Decimal in base 2, round to `significantDigits`
   * significant digits.
   *
   * @param { number } significantDigits Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * @returns { string } the string type
   * @throws { BusinessError } 10200001 - The value of `significantDigits` is out of range.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toBinary(significantDigits: number): string;

  /**
   * Return a string representing the value of this Decimal in base 2, round to `significantDigits`
   * significant digits using rounding mode `rounding`.
   *
   * @param { number } significantDigits Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * @param { Rounding } rounding Rounding mode. Integer, 0 to 8 inclusive.
   * @returns { string } the string type
   * @throws { BusinessError } 10200001 - The value of `significantDigits | rounding` is out of range.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toBinary(significantDigits: number, rounding: Rounding): string;

  /**
   * Return a string representing the value of this Decimal in base 8.
   *
   * @returns { string } the string type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toOctal(): string;

  /**
   * Return a string representing the value of this Decimal in base 8, round to `significantDigits` significant.
   *
   * @param { number } significantDigits {number | string | Decimal}
   * @returns { string } the string type
   * @throws { BusinessError } 10200001 - The value of `significantDigits` is out of range.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toOctal(significantDigits: number): string;

  /**
   * Return a string representing the value of this Decimal in base 8, round to `significantDigits` significant
   * digits using rounding mode `rounding`.
   *
   * @param { number } significantDigits {number | string | Decimal}
   * @param { Rounding } rounding Rounding mode. Integer, 0 to 8 inclusive.
   * @returns { string } the string type
   * @throws { BusinessError } 10200001 - The value of `significantDigits | rounding` is out of range.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toOctal(significantDigits: number, rounding: Rounding): string;

  /**
   * Return a string representing the value of this Decimal in base 16
   *
   * @returns { string } the string type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toHexadecimal(): string;

  /**
   * Return a string representing the value of this Decimal in base 16, round to `significantDigits` significant.
   *
   * @param { number } significantDigits Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * @returns { string } the string type
   * @throws { BusinessError } 10200001 - The value of `significantDigits` is out of range.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toHexadecimal(significantDigits: number): string;

  /**
   * Return a string representing the value of this Decimal in base 16, round to `significantDigits` significant
   * digits using rounding mode `rounding`.
   *
   * @param { number } significantDigits Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * @param { Rounding } rounding Rounding mode. Integer, 0 to 8 inclusive.
   * @returns { string } the string type
   * @throws { BusinessError } 10200001 - The value of `significantDigits | rounding` is out of range.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toHexadecimal(significantDigits: number, rounding: Rounding): string;

  /**
   * Return a new Decimal whose value is the value of this Decimal.
   *
   * @returns { Decimal } the Decimal type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toDecimalPlaces(): Decimal;

  /**
   * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `decimalPlaces`
   * decimal places.
   *
   * @param { number } decimalPlaces Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 10200001 - The value of `decimalPlaces` is out of range.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toDecimalPlaces(decimalPlaces: number): Decimal;

  /**
   * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `decimalPlaces`
   * decimal places using rounding mode `rounding`.
   *
   * @param { number } decimalPlaces Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * @param { Rounding } rounding Rounding mode. Integer, 0 to 8 inclusive.
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 10200001 - The value of `decimalPlaces | rounding` is out of range.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toDecimalPlaces(decimalPlaces: number, rounding: Rounding): Decimal;

  /**
   * Return a string representing the value of this Decimal in exponential notation.
   *
   * @returns { string } the string type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toExponential(): string;

  /**
   * Return a string representing the value of this Decimal in exponential notation rounded to
   * `decimalPlaces` fixed decimal places.
   *
   * @param { number } decimalPlaces Decimal places. Integer, 0 to MAX_DIGITS inclusive.
   * @returns { string } the string type
   * @throws { BusinessError } 10200001 - The value of `decimalPlaces` is out of range.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toExponential(decimalPlaces: number): string;

  /**
   * Return a string representing the value of this Decimal in exponential notation rounded to
   * `decimalPlaces` fixed decimal places using rounding mode `rounding`.
   *
   * @param { number } decimalPlaces Decimal places. Integer, 0 to MAX_DIGITS inclusive.
   * @param { Rounding } rounding Rounding mode. Integer, 0 to 8 inclusive.
   * @returns { string } the string type
   * @throws { BusinessError } 10200001 - The value of `decimalPlaces | rounding` is out of range.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toExponential(decimalPlaces: number, rounding: Rounding): string;

  /**
   * Return a string representing the value of this Decimal in normal (fixed-point).
   *
   * @returns { string } the string type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toFixed(): string;

  /**
   * Return a string representing the value of this Decimal in normal (fixed-point) notation to
   * `decimalPlaces` fixed decimal places.
   *
   * @param { number } decimalPlaces Decimal places. Integer, 0 to MAX_DIGITS inclusive.
   * @returns { string } the string type
   * @throws { BusinessError } 10200001 - The value of `decimalPlaces` is out of range.
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toFixed(decimalPlaces: number): string;

  /**
   * Return a string representing the value of this Decimal in normal (fixed-point) notation to
   * `decimalPlaces` fixed decimal places and rounded using rounding mode `rounding`.
   *
   * @param { number } decimalPlaces Decimal places. Integer, 0 to MAX_DIGITS inclusive.
   * @param { Rounding } rounding Rounding mode. Integer, 0 to 8 inclusive.
   * @returns { string } the string type
   * @throws { BusinessError } 10200001 - The value of `decimalPlaces | rounding` is out of range.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toFixed(decimalPlaces: number, rounding: Rounding): string;

  /**
   * Return an array representing the value of this Decimal as a simple fraction with an integer
   * numerator and an integer denominator.
   *
   * @returns { Decimal[] } the Decimal[] type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toFraction(): Decimal[];

  /**
   * Return an array representing the value of this Decimal as a simple fraction with an integer
   * numerator and an integer denominator. The denominator will be a positive non-zero value
   * less than or equal to `max_denominator`.
   *
   * @param { Value } maxDenominator {number | string | Decimal}
   * @returns { Decimal[] } the Decimal[] type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toFraction(maxDenominator: Value): Decimal[];

  /**
   * Returns a new Decimal whose value is the nearest multiple of `n`.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toNearest(n: Value): Decimal;

  /**
   * Returns a new Decimal whose value is the nearest multiple of `n` in the direction of rounding
   * mode `rounding`, to the value of this Decimal.
   *
   * @param { Value } n {number | string | Decimal}
   * @param { Rounding } rounding Rounding mode. Integer, 0 to 8 inclusive.
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @throws { BusinessError } 10200001 - The value of `rounding` is out of range.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toNearest(n: Value, rounding: Rounding): Decimal;

  /**
   * Return a string representing the value of this Decimal.
   *
   * @returns { string } the string type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toPrecision(): string;

  /**
   * Return a string representing the value of this Decimal rounded to `significantDigits` significant digits.
   *
   * @param { number } significantDigits Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * @returns { string } the string type
   * @throws { BusinessError } 10200001 - The value of `significantDigits` is out of range.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toPrecision(significantDigits: number): string;

  /**
   * Return a string representing the value of this Decimal rounded to `significantDigits` significant digits
   * using rounding mode `rounding`.
   *
   * @param { number } significantDigits Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * @param { Rounding } rounding Rounding mode. Integer, 0 to 8 inclusive.
   * @returns { string } the string type
   * @throws { BusinessError } 10200001 - The value of `significantDigits | rounding` is out of range.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toPrecision(significantDigits: number, rounding: Rounding): string;

  /**
   * Return a new Decimal whose value is the value of this Decimal.
   *
   * @returns { Decimal } the Decimal type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toSignificantDigits(): Decimal;

  /**
   * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `significantDigits`
   * significant digits.
   *
   * @param { number } significantDigits Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 10200001 - The value of `significantDigits` is out of range.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toSignificantDigits(significantDigits: number): Decimal;

  /**
   * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `significantDigits`
   * significant digits using rounding mode `rounding`.
   *
   * @param { number } significantDigits Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * @param { Rounding } rounding Rounding mode. Integer, 0 to 8 inclusive.
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 10200001 - The value of `significantDigits | rounding` is out of range.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toSignificantDigits(significantDigits: number, rounding: Rounding): Decimal;

  /**
   * Return the value of this Decimal converted to a number primitive. Zero keeps its sign.
   *
   * @returns { number } the number type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toNumber(): number;

  /**
   * Return a string representing the value of this Decimal.
   * Return exponential notation if this Decimal has a positive exponent equal to or greater than
   * `toExpPos`, or a negative exponent equal to or less than `toExpNeg`.
   *
   * @returns { string } the string type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  toString(): string;

  /**
   * Return a string representing the value of this Decimal.
   * Unlike `toString`, negative zero will include the minus sign.
   *
   * @returns { string } the string type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  valueOf(): string;

  /**
   * Return the number of decimal places of the value of this Decimal.
   *
   * @returns { number } the number type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  decimalPlaces(): number;

  /**
   * Return the number of significant digits of the value of this Decimal.
   *
   * @returns { number } the number type
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  precision(): number;

  /**
   * Return the number of significant digits of the value of this Decimal, whether to count 
   * integer-part trailing zeros.
   *
   * @param { boolean | number } includeZeros Whether to count integer-part trailing zeros: true, false,
   * 1 or 0.
   * @returns { number } the number type
   * @throws { BusinessError } 10200001 - The value of `includeZeros` is out of range.
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  precision(includeZeros: boolean | number): number;

  /**
   * Return a new Decimal whose value is the absolute value of `n`.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static abs(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is `n` round to an integer using `ROUND_FLOOR`.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static floor(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is `n` rounded to an integer using `ROUND_CEIL`.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static ceil(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is `n` truncated to an integer.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static trunc(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is `n` clamped to the range delineated by `min` and `max`.
   *
   * @param { Value } n {number | string | Decimal}
   * @param { Value } min {number | string | Decimal}
   * @param { Value } max {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @throws { BusinessError } 10200001 - The value of `min` is out of range.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static clamp(n: Value, min: Value, max: Value): Decimal;

  /**
   * Return a new Decimal whose value is the sum of `x` and `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * @param { Value } x {number | string | Decimal}
   * @param { Value } y {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static add(x: Value, y: Value): Decimal;

  /**
   * Return a new Decimal whose value is the sum of the arguments, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * Only the result is rounded, not the intermediate calculations.
   *
   * @param { Value[] } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static sum(...n: Value[]): Decimal;

  /**
   * Return a new Decimal whose value is `x` minus `y`, rounded to `precision` significant digits
   * using rounding mode `rounding`.
   *
   * @param { Value } x {number | string | Decimal}
   * @param { Value } y {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static sub(x: Value, y: Value): Decimal;

  /**
   * Return a new Decimal whose value is `x` multiplied by `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * @param { Value } x {number | string | Decimal}
   * @param { Value } y {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static mul(x: Value, y: Value): Decimal;

  /**
   * Return a new Decimal whose value is `x` divided by `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * @param { Value } x {number | string | Decimal}
   * @param { Value } y {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static div(x: Value, y: Value): Decimal;

  /**
   * Return a new Decimal whose value is `x` modulo `y`, rounded to `precision` significant digits
   * using rounding mode `rounding`.
   *
   * @param { Value } x {number | string | Decimal}
   * @param { Value } y {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static mod(x: Value, y: Value): Decimal;

  /**
   * Return a new Decimal whose value is the square root of `n`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static sqrt(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is the cube root of `n`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static cbrt(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is `base` raised to the power `exponent`, rounded to precision
   * significant digits using rounding mode `rounding`.
   *
   * @param { Value } base {number | string | Decimal} The base.
   * @param { Value } exponent {number | string | Decimal} The exponent.
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @throws { BusinessError } 10200060 - Precision limit exceeded.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static pow(base: Value, exponent: Value): Decimal;

  /**
   * Return a new Decimal whose value is the natural exponential of `n`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @throws { BusinessError } 10200060 - Precision limit exceeded.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static exp(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is the log of `n` to the base `base`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal}
   * @param { Value } base {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @throws { BusinessError } 10200060 - Precision limit exceeded.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static log(n: Value, base: Value): Decimal;

  /**
   * Return a new Decimal whose value is the natural logarithm of `n`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @throws { BusinessError } 10200060 - Precision limit exceeded.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static ln(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is the base 2 logarithm of `n`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @throws { BusinessError } 10200060 - Precision limit exceeded.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static log2(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is the base 10 logarithm of `n`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @throws { BusinessError } 10200060 - Precision limit exceeded.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static log10(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is the cosine of `n`, rounded to `precision` significant
   * digits using rounding mode `rounding`
   *
   * @param { Value } n {number | string | Decimal} A value in radians.
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static cos(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is the sine of `n`, rounded to `precision` significant digits
   * using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal} A value in radians.
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static sin(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is the tangent of `n`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal} A value in radians.
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static tan(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is the hyperbolic cosine of `n`, rounded to precision
   * significant digits using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal} A value in radians.
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static cosh(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is the hyperbolic sine of `n`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static sinh(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is the hyperbolic tangent of `n`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal} A value in radians.
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static tanh(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is the arccosine in radians of `n`.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @throws { BusinessError } 10200060 - Precision limit exceeded.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static acos(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is the arcsine in radians of `n`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @throws { BusinessError } 10200060 - Precision limit exceeded.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static asin(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is the arctangent in radians of `n`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @throws { BusinessError } 10200060 - Precision limit exceeded.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static atan(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is the inverse of the hyperbolic cosine of `n`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @throws { BusinessError } 10200060 - Precision limit exceeded.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static acosh(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is the inverse of the hyperbolic sine of `n`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal} A value in radians.
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @throws { BusinessError } 10200060 - Precision limit exceeded.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static asinh(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is the inverse of the hyperbolic tangent of `n`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal} A value in radians.
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @throws { BusinessError } 10200060 - Precision limit exceeded.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static atanh(n: Value): Decimal;

  /**
   * Return a new Decimal whose value is the arctangent in radians of `y/x` in the range -pi to pi
   * (inclusive), rounded to `precision` significant digits using rounding mode `rounding`.
   *
   * @param { Value } y {number | string | Decimal} The y-coordinate.
   * @param { Value } x {number | string | Decimal} The x-coordinate.
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @throws { BusinessError } 10200060 - Precision limit exceeded.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static atan2(y: Value, x: Value): Decimal;

  /**
   * Return a new Decimal whose value is the square root of the sum of the squares of the arguments,
   * rounded to `precision` significant digits using rounding mode `rounding`.
   *
   * @param { Value[] } n {number | string | Decimal} Decimal
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static hypot(...n: Value[]): Decimal;

  /**
   * Return a new Decimal whose value is the maximum of the arguments.
   *
   * @param { Value[] } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static max(...n: Value[]): Decimal;

  /**
   * Return a new Decimal whose value is the minimum of the arguments.
   *
   * @param { Value[] } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static min(...n: Value[]): Decimal;

  /**
   * Returns a new Decimal with a random value equal to or greater than 0 and less than 1.
   *
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 10200061 - Crypto unavailable
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static random(): Decimal;

  /**
   * Returns a new Decimal with a random value equal to or greater than 0 and less than 1, and with
   * `significantDigits` significant digits (or less if trailing zeros are produced).
   *
   * @param { Value } significantDigits {number} Significant digits. Integer, 0 to MAX_DIGITS inclusive.
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @throws { BusinessError } 10200061 - Crypto unavailable
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static random(significantDigits: number): Decimal;

  /**
   * Return the sign of the passed value to the method.
   *   1    if x > 0,
   *  -1    if x < 0,
   *   0    if x is 0,
   *  -0    if x is -0,
   *   NaN  otherwise
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static sign(n: Value): number;

  /**
   * Return a new Decimal whose value is `n` rounded to an integer using rounding mode `rounding`.
   *
   * @param { Value } n {number | string | Decimal}
   * @returns { Decimal } the Decimal type
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static round(n: Value): Decimal;

  /**
   * Configures the 'global' settings for this particular Decimal constructor.
   *
   * @param { DecimalConfig } An object with one or more of the following properties,
   *   precision  {number}
   *   rounding   {number}
   *   toExpNeg   {number}
   *   toExpPos   {number}
   *   maxE       {number}
   *   minE       {number}
   *   modulo     {number}
   *   crypto     {boolean|number}
   *   defaults   {true}
   * @returns { void }
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   *                                    1. Incorrect parameter types;
   *                                    2. Parameter verification failed.
   * @throws { BusinessError } 10200001 - The value of `DecimalConfig.properties` is out of range.
   * @throws { BusinessError } 10200061 - Crypto unavailable
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static set(config: DecimalConfig): void;

  /**
   * Rounds away from zero
   *
   * @readonly
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static readonly ROUND_UP : 0;

  /**
   * Rounds towards zero
   *
   * @readonly
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static readonly ROUND_DOWN : 1;

  /**
   * Rounds towards Infinity
   *
   * @readonly
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static readonly ROUND_CEILING : 2;

  /**
   * Rounds towards -Infinity
   *
   * @readonly
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static readonly ROUND_FLOOR : 3;

  /**
   * Rounds towards nearest neighbour. If equidistant, rounds away from zero
   *
   * @readonly
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static readonly ROUND_HALF_UP : 4;

  /**
   * Rounds towards nearest neighbour. If equidistant, rounds towards zero
   *
   * @readonly
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static readonly ROUND_HALF_DOWN : 5;

  /**
   * Rounds towards nearest neighbour. If equidistant, rounds towards even neighbour
   *
   * @readonly
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static readonly ROUND_HALF_EVEN : 6;

  /**
   * Rounds towards nearest neighbour. If equidistant, rounds towards Infinity
   *
   * @readonly
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static readonly ROUND_HALF_CEILING : 7;

  /**
   * Rounds towards nearest neighbour. If equidistant, rounds towards -Infinity
   *
   * @readonly
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static readonly ROUND_HALF_FLOOR : 8;

  /**
   * Not a rounding mode, see modulo
   *
   * @readonly
   * @static
   * @syscap SystemCapability.Utils.Lang
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  static readonly EUCLIDEAN : 9;
}
export default Decimal;
