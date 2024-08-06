/// <reference no-default-lib="true"/>

interface Symbol {}

interface SymbolConstructor {
  /**
   * A reference to the prototype.
   */
  readonly prototype: Symbol
}

declare var Symbol: SymbolConstructor

declare type PropertyKey = string | number | symbol

interface PropertyDescriptor {
  configurable?: boolean
  enumerable?: boolean
  value?: any
  writable?: boolean
  get?(): any
  set?(v: any): void
}

interface PropertyDescriptorMap {
  [key: PropertyKey]: PropertyDescriptor
}

interface Object {
  /** The initial value of Object.prototype.constructor is the standard built-in Object constructor. */
  constructor: Function

  /** Returns a string representation of an object. */
  toString(): string

  /** Returns a date converted to a string using the current locale. */
  toLocaleString(): string

  /** Returns the primitive value of the specified object. */
  valueOf(): Object

  /**
   * Determines whether an object has a property with the specified name.
   * @param v A property name.
   */
  hasOwnProperty(v: PropertyKey): boolean

  /**
   * Determines whether an object exists in another object's prototype chain.
   * @param v Another object whose prototype chain is to be checked.
   */
  isPrototypeOf(v: Object): boolean

  /**
   * Determines whether a specified property is enumerable.
   * @param v A property name.
   */
  propertyIsEnumerable(v: PropertyKey): boolean
}

interface ObjectConstructor {
  new (value?: any): Object
  (): any
  (value: any): any

  /** A reference to the prototype for a class of objects. */
  readonly prototype: Object

  /**
   * Returns the prototype of an object.
   * @param o The object that references the prototype.
   */
  getPrototypeOf(o: any): any

  /**
   * Returns the names of the enumerable string properties and methods of an object.
   * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
   */
  keys(o: object): string[]
}

/**
 * Provides functionality common to all JavaScript objects.
 */
declare var Object: ObjectConstructor

/**
 * Provides functionality common to all JavaScript objects.
 */
declare var Object: ObjectConstructor

interface Function {
  /**
   * Returns the name of the function. Function names are read-only and can not be changed.
   */
  readonly name: string
}

/**
 * Creates a new function.
 */
interface Function {
  /**
   * Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.
   * @param thisArg The object to be used as the this object.
   * @param argArray A set of arguments to be passed to the function.
   */
  apply(this: Function, thisArg: any, argArray?: any): any

  /**
   * Calls a method of an object, substituting another object for the current object.
   * @param thisArg The object to be used as the current object.
   * @param argArray A list of arguments to be passed to the method.
   */
  call(this: Function, thisArg: any, ...argArray: any[]): any

  /**
   * For a given function, creates a bound function that has the same body as the original function.
   * The this object of the bound function is associated with the specified object, and has the specified initial parameters.
   * @param thisArg An object to which the this keyword can refer inside the new function.
   * @param argArray A list of arguments to be passed to the new function.
   */
  bind(this: Function, thisArg: any, ...argArray: any[]): any

  /** Returns a string representation of a function. */
  toString(): string

  prototype: any
  readonly length: number

  // Non-standard extensions
  arguments: any
  caller: Function
}

interface FunctionConstructor {
  /**
   * Creates a new function.
   * @param args A list of arguments the function accepts.
   */
  new (...args: string[]): Function
  (...args: string[]): Function
  readonly prototype: Function
}

declare var Function: FunctionConstructor

/**
 * Extracts the type of the 'this' parameter of a function type, or 'unknown' if the function type has no 'this' parameter.
 */
type ThisParameterType<T> = T extends (this: infer U, ...args: never) => any
  ? U
  : unknown

/**
 * Removes the 'this' parameter from a function type.
 */
type OmitThisParameter<T> = unknown extends ThisParameterType<T>
  ? T
  : T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T

interface CallableFunction extends Function {
  /**
   * Calls the function with the specified object as the this value and the elements of specified array as the arguments.
   * @param thisArg The object to be used as the this object.
   */
  apply<T, R>(this: (this: T) => R, thisArg: T): R

  /**
   * Calls the function with the specified object as the this value and the elements of specified array as the arguments.
   * @param thisArg The object to be used as the this object.
   * @param args An array of argument values to be passed to the function.
   */
  apply<T, A extends any[], R>(
    this: (this: T, ...args: A) => R,
    thisArg: T,
    args: A
  ): R

  /**
   * Calls the function with the specified object as the this value and the specified rest arguments as the arguments.
   * @param thisArg The object to be used as the this object.
   * @param args Argument values to be passed to the function.
   */
  call<T, A extends any[], R>(
    this: (this: T, ...args: A) => R,
    thisArg: T,
    ...args: A
  ): R

  /**
   * For a given function, creates a bound function that has the same body as the original function.
   * The this object of the bound function is associated with the specified object, and has the specified initial parameters.
   * @param thisArg The object to be used as the this object.
   */
  bind<T>(this: T, thisArg: ThisParameterType<T>): OmitThisParameter<T>

  /**
   * For a given function, creates a bound function that has the same body as the original function.
   * The this object of the bound function is associated with the specified object, and has the specified initial parameters.
   * @param thisArg The object to be used as the this object.
   * @param args Arguments to bind to the parameters of the function.
   */
  bind<T, A extends any[], B extends any[], R>(
    this: (this: T, ...args: [...A, ...B]) => R,
    thisArg: T,
    ...args: A
  ): (...args: B) => R
}

interface NewableFunction extends Function {
  /**
   * Calls the function with the specified object as the this value and the elements of specified array as the arguments.
   * @param thisArg The object to be used as the this object.
   */
  apply<T>(this: new () => T, thisArg: T): void
  /**
   * Calls the function with the specified object as the this value and the elements of specified array as the arguments.
   * @param thisArg The object to be used as the this object.
   * @param args An array of argument values to be passed to the function.
   */
  apply<T, A extends any[]>(
    this: new (...args: A) => T,
    thisArg: T,
    args: A
  ): void

  /**
   * Calls the function with the specified object as the this value and the specified rest arguments as the arguments.
   * @param thisArg The object to be used as the this object.
   * @param args Argument values to be passed to the function.
   */
  call<T, A extends any[]>(
    this: new (...args: A) => T,
    thisArg: T,
    ...args: A
  ): void

  /**
   * For a given function, creates a bound function that has the same body as the original function.
   * The this object of the bound function is associated with the specified object, and has the specified initial parameters.
   * @param thisArg The object to be used as the this object.
   */
  bind<T>(this: T, thisArg: any): T

  /**
   * For a given function, creates a bound function that has the same body as the original function.
   * The this object of the bound function is associated with the specified object, and has the specified initial parameters.
   * @param thisArg The object to be used as the this object.
   * @param args Arguments to bind to the parameters of the function.
   */
  bind<A extends any[], B extends any[], R>(
    this: new (...args: [...A, ...B]) => R,
    thisArg: any,
    ...args: A
  ): new (...args: B) => R
}

interface PromiseLike<T> {
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ): PromiseLike<TResult1 | TResult2>
}

/**
 * Recursively unwraps the "awaited type" of a type. Non-promise "thenables" should resolve to `never`. This emulates the behavior of `await`.
 */
type Awaited<T> = T extends null | undefined
  ? T // special case for `null | undefined` when not in `--strictNullChecks` mode
  : T extends object & { then(onfulfilled: infer F, ...args: infer _): any } // `await` only unwraps object types with a callable `then`. Non-object types are not unwrapped
  ? F extends (value: infer V, ...args: infer _) => any // if the argument to `then` is callable, extracts the first argument
    ? Awaited<V> // recursively unwrap the value
    : never // the argument to `then` was not callable
  : T // non-object or non-thenable

interface ArrayLike<T> {
  readonly length: number
  readonly [n: number]: T
}

/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P]
}

/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P]
}

/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
  [P in K]: T
}

/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T

/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never

/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T & {}

/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never

/**
 * Obtain the parameters of a constructor function type in a tuple
 */
type ConstructorParameters<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never

/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any

/**
 * Obtain the return type of a constructor function type
 */
type InstanceType<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any) => infer R ? R : any

/**
 * Convert string literal type to uppercase
 */
type Uppercase<S extends string> = intrinsic

/**
 * Convert string literal type to lowercase
 */
type Lowercase<S extends string> = intrinsic

/**
 * Convert first character of string literal type to uppercase
 */
type Capitalize<S extends string> = intrinsic

/**
 * Convert first character of string literal type to lowercase
 */
type Uncapitalize<S extends string> = intrinsic

/**
 * Marker for contextual 'this' type
 */
interface ThisType<T> {}

/**
 * Stores types to be used with WeakSet, WeakMap, WeakRef, and FinalizationRegistry
 */
interface WeakKeyTypes {
  object: object
}

type WeakKey = WeakKeyTypes[keyof WeakKeyTypes]
