 /**
     迭代器执行返回结果，包含当前迭代值，以及是否已迭代完成
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "x",
          "uniUtsPlugin": "4.41",
          "unixVer": "4.41",
          "unixUtsPlugin": "4.41"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "x",
          "uniUtsPlugin": "4.41",
          "unixVer": "x",
          "unixUtsPlugin": "4.41"
        },
        "harmony": {
            "osVer": "5.0.0",
            "uniVer": "√",
            "uniUtsPlugin": "x",
            "unixVer": "4.61"
            "unixUtsPlugin": "x"
        }
      },
      "web": {
        "uniVer": "x",
        "unixVer": "4.41"
      }
    }
 */
type UTSIteratorResult<T> = {
  done: boolean;
  value: T;
}
 /**
     UTS 迭代器对象，其提供了 next() 方法用以返回迭代器结果对象
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "x",
          "uniUtsPlugin": "4.41",
          "unixVer": "4.41",
          "unixUtsPlugin": "4.41"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "x",
          "uniUtsPlugin": "4.41",
          "unixVer": "x",
          "unixUtsPlugin": "4.41"
        },
        "harmony": {
            "osVer": "5.0.0",
            "uniVer": "√",
            "uniUtsPlugin": "x",
            "unixVer": "4.61"
            "unixUtsPlugin": "x"
        }
      },
      "web": {
        "uniVer": "x",
        "unixVer": "4.41"
      }
    }
 */
type UTSIterator<T> = {
  next:() => UTSIteratorResult<T>
}

 /**
     可迭代协议，用来定义 for..of 迭代规则
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "x",
          "uniUtsPlugin": "4.41",
          "unixVer": "4.41",
          "unixUtsPlugin": "4.41"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "x",
          "uniUtsPlugin": "4.41",
          "unixVer": "x",
          "unixUtsPlugin": "4.41"
        },
        "harmony": {
            "osVer": "5.0.0",
            "uniVer": "x",
            "uniUtsPlugin": "x",
            "unixVer": "x"
            "unixUtsPlugin": "x"
        }
      },
      "web": {
        "uniVer": "x",
        "unixVer": "4.41"
      }
    }
 */
interface UTSValueIterable<T> {
  valueIterator() : UTSIterator<T>
}
 /**
     可枚举协议，用来定义 for..in 枚举规则
     @uniPlatform {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "x",
          "uniUtsPlugin": "4.41",
          "unixVer": "4.41",
          "unixUtsPlugin": "4.41"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "x",
          "uniUtsPlugin": "4.41",
          "unixVer": "x",
          "unixUtsPlugin": "4.41"
        },
        "harmony": {
            "osVer": "5.0.0",
            "uniVer": "x",
            "uniUtsPlugin": "x",
            "unixVer": "x"
            "unixUtsPlugin": "x"
        }
      },
      "web": {
        "uniVer": "x",
        "unixVer": "4.41"
      }
    }
 */
interface UTSKeyIterable {
  keyIterator() : UTSIterator<string>
  ignoredKeys(): Array<String>
}

interface SymbolConstructor {
    /**
     * A method that returns the default iterator for an object. Called by the semantics of the
     * for-of statement.
     */
    readonly iterator: unique symbol;
}

interface IteratorYieldResult<TYield> {
    done?: false;
    value: TYield;
}

interface IteratorReturnResult<TReturn> {
    done: true;
    value: TReturn;
}

type IteratorResult<T, TReturn = any> = IteratorYieldResult<T> | IteratorReturnResult<TReturn>;

interface Iterator<T, TReturn = any, TNext = undefined> {
    // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
    next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
    return?(value?: TReturn): IteratorResult<T, TReturn>;
    throw?(e?: any): IteratorResult<T, TReturn>;
}

interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
}

interface IterableIterator<T> extends Iterator<T> {
    [Symbol.iterator](): IterableIterator<T>;
}

interface ArrayLike<T> {
    readonly length: number;
    readonly [n: number]: T;
}

interface Array<T> {
    /** Iterator */
    [Symbol.iterator](): IterableIterator<T>;
}

interface ArrayConstructor {
    /**
     * Creates an array from an iterable object.
     * @param iterable An iterable object to convert to an array.
     */
    from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];

    /**
     * Creates an array from an iterable object.
     * @param iterable An iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
}

interface ReadonlyArray<T> {
    /** Iterator of values in the array. */
    [Symbol.iterator](): IterableIterator<T>;
}

interface IArguments {
    /** Iterator */
    [Symbol.iterator](): IterableIterator<any>;
}

interface Map<K, V> {
    /** Returns an iterable of entries in the map. */
    [Symbol.iterator](): IterableIterator<[K, V]>;
}

declare type NonNullable<T> = T & {};

interface ReadonlyMap<K, V> {
    /** Returns an iterable of entries in the map. */
    [Symbol.iterator](): IterableIterator<[K, V]>;
}

interface MapConstructor {
    new(): Map<any, any>;
    new <K, V>(iterable?: Iterable<readonly [K, V]> | null): Map<K, V>;
}

interface Set<T> {
    /** Iterates over values in the set. */
    [Symbol.iterator](): IterableIterator<T>;
}

interface ReadonlySet<T> {
    /** Iterates over values in the set. */
    [Symbol.iterator](): IterableIterator<T>;
}

interface SetConstructor {
    new <T>(iterable?: Iterable<T> | null): Set<T>;
}

interface String {
    /** Iterator */
    [Symbol.iterator](): IterableIterator<string>;
}
