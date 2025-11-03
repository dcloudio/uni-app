interface Int32Array extends TypedArray {
  /**
     数组的长度
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  readonly length : number;
  /**
     数组中每个元素的字节大小。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  readonly BYTES_PER_ELEMENT : number;

  /**
     数组引用的ArrayBuffer实例。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  readonly buffer : ArrayBufferLike;

  /**
     数组的字节长度。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  readonly byteLength : number;

  /**
     数组的字节偏移量。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  readonly byteOffset : number;

  /**
     返回this对象，将数组中由start和end标识的部分复制到从位置target开始的相同数组。
     @param target 如果target为负数，则视为length+target，其中length为数组的长度。
     @param start 如果start为负数，则视为length+start。如果省略end，则使用this对象的长度作为其默认值。
     @param end 如果未指定，默认使用this对象的长度。
     @return 修改后的类型化数组。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  copyWithin(target : number, start : number, end ?: number) : this;

  /**
     确定数组的所有成员是否满足指定的测试。
     @param predicate 一个最多接受三个参数的函数。every方法对数组中的每个元素调用predicate函数，直到predicate返回一个可转换为布尔值false的值，或者直到数组结束。
     @return 返回 true，除非 callbackFn 对类型化数组中的某个元素返回了假值（在这种情况下，立即返回 false）。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  every(predicate : (value : number, index : number, array : Int32Array) => boolean) : boolean;

  /**
     将数组中的所有元素更改为静态值value，并返回修改后的数组。
     @param value 用于填充数组部分的值。
     @param start 开始填充数组的索引。如果start为负数，则视为length+start，其中length为数组的长度。
     @param end 停止填充数组的索引。如果end为负数，则视为length+end。
     @return 修改后的类型化数组。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  fill(value : number, start ?: number, end ?: number) : this;

  /**
     返回满足回调函数中指定条件的数组元素。
     @param predicate 一个最多接受三个参数的函数。filter方法对数组中的每个元素调用predicate函数。
     @return 新的类型化数组，含有通过测试的元素
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  filter(predicate : (value : number, index : number, array : Int32Array) => any) : Int32Array;

  /**
     返回数组中第一个满足条件的元素的值，否则返回undefined。
     @param predicate 对数组中的每个元素调用一次predicate，直到找到一个使predicate返回true的元素为止。
     @return 如果元素通过了测试，则为该元素，否则为undefined。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  find(predicate : (value : number, index : number, obj : Int32Array) => boolean) : number | undefined;

  /**
     返回数组中第一个满足条件的元素的索引，否则返回-1。
     @param predicate 对数组中的每个元素调用一次predicate，直到找到一个使predicate返回true的元素为止。
     @return 如果元素通过了测试，则为数组下标，否则为 -1。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  findIndex(predicate : (value : number, index : number, obj : Int32Array) => boolean) : number;

  /**
     对数组的每个元素执行指定的操作。
     @param callbackfn 一个最多接受三个参数的函数。forEach方法对数组中的每个元素调用callbackfn函数。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  forEach(callbackfn : (value : number, index : number, array : Int32Array) => void) : void;

  /**
     返回数组中第一个出现的指定值的索引，如果不存在则返回-1。
     @param searchElement 要在数组中查找的值。
     @param fromIndex 开始搜索的数组索引。如果省略，则从索引0开始搜索。
     @return 数组中元素的第一个下标；没有找到则返回**-1** 。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  indexOf(searchElement : number, fromIndex ?: number) : number;

  /**
     将数组中所有元素连接成一个字符串。
     @param separator 用于分隔数组元素的字符串。如果省略，则使用逗号分隔数组元素。
     @return 所有元素连接后的字符串。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  join(separator ?: string) : string;

  /**
     对数组的每个元素执行指定的操作，并返回包含执行结果的数组。
     @param callbackfn 一个最多接受三个参数的函数。map方法对数组中的每个元素调用callbackfn函数。
     @return 新的类型化数组
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  map(callbackfn : (value : number, index : number, array : Int32Array) => number) : Int32Array;

  /**
     对数组的每个元素执行指定的累加操作。
     @param callbackfn 一个最多接受四个参数的函数。reduce方法对数组中的每个元素调用callbackfn函数。
     @param initialValue 如果指定了initialValue，则作为累加器的初始值。如果未提供initialValue，则使用数组的第一个元素作为初始值，并从第二个元素开始累加。
     @return 由归约返回的结果。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  reduce(callbackfn : (previousValue : number, currentValue : number, currentIndex : number, array : Int32Array) => number) : number;
  reduce(callbackfn : (previousValue : number, currentValue : number, currentIndex : number, array : Int32Array) => number, initialValue : number) : number;

  /**
     对数组的每个元素执行指定的累加操作，从右向左处理。
     @param callbackfn 一个最多接受四个参数的函数。reduceRight方法从数组的最后一个元素向第一个元素逐个调用callbackfn函数。
     @param initialValue 如果指定了initialValue，则作为累加器的初始值。如果未提供initialValue，则使用数组的最后一个元素作为初始值，并从倒数第二个元素开始累加。
     @return 由归约返回的结果。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  reduceRight(callbackfn : (previousValue : number, currentValue : number, currentIndex : number, array : Int32Array) => number) : number;
  reduceRight(callbackfn : (previousValue : number, currentValue : number, currentIndex : number, array : Int32Array) => number, initialValue : number) : number;

  /**
     反转数组中的元素。
     @return 翻转的数组。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  reverse() : Int32Array;

  /**
     设置一个值或数组的值。
     @param array 要设置的值或数组。
     @param offset 要写入值的当前数组中的索引。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  set(array : ArrayLike<number>, offset ?: number) : void;

  /**
     返回数组的一部分。
     @param start 指定部分的起始索引。
     @param end 指定部分的结束索引。不包括索引'end'处的元素。
     @return 包含取出元素的新 typed array。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  slice(start ?: number, end ?: number) : Int32Array;

  /**
     确定数组的任何元素是否满足指定的测试。
     @param predicate 一个最多接受三个参数的函数。some方法对数组中的每个元素调用predicate函数，直到predicate返回一个可转换为布尔值true的值，或者直到数组结束。
     @return true 如果 callback 函数以任一数组元素为参数调用时，返回 true; 否则，false.
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  some(predicate : (value : number, index : number, array : Int32Array) => boolean) : boolean;

  /**
     对数组进行排序。
     @param compareFn 用于确定元素顺序的函数。如果省略，则元素按升序排序。
     @return 排序后的类型化数组。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  sort(compareFn ?: (a : number, b : number) => number) : this;

  /**
     获取此数组的ArrayBuffer存储的新的Int32Array视图，引用从begin（包括）到end（不包括）的元素。
     @param begin 开始数组的索引。
     @param end 结束数组的索引。
     @return 一个新的 TypedArray 对象。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  subarray(begin ?: number, end ?: number) : Int32Array;

  /**
     返回数组的字符串表示形式。
     @return 一个字符串，表示类型数组 (typed array) 的元素。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  toString() : string;

  /**
     返回指定对象的原始值。
     @return 新的 Array Iterator 对象。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "x",
                "unixVer": "x",
                "unixUtsPlugin": "x"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  valueOf() : Iterator<Number>;
  /**
     为数组中的每个条目返回一个键值对数组
     @return {IterableIterator<[number, number]>} 数组条目的键值对迭代器
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  entries() : IterableIterator<[number, number]>;

  /**
     确定数组是否包含某个元素，返回 true 或 false。
     @param searchElement 要搜索的元素。
     @param fromIndex 开始搜索 searchElement 的数组位置。
     @return 如果数组包含指定的元素则返回 true，否则返回 false。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  includes(searchElement : number, fromIndex ?: number) : boolean;

  /**
     返回数组中的键列表
     @return {IterableIterator<number>} 数组键的迭代器
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  keys() : IterableIterator<number>;

  /**
     返回数组中的值列表
     @return {IterableIterator<number>} 数组值的迭代器
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  values() : IterableIterator<number>;

  [index : number] : number;
}

interface Int32ArrayConstructor {
  /**
     初始化一个对象
     @param length 当使用非对象调用时，该参数将被视为指定类型化数组长度的数字。在内存中创建一个内部数组缓冲区，大小长度乘以 BYTES_PER_ELEMENT 字节，用 0 填充。省略所有参数，等同于使用 0 作为参数。
     @return 实例对象
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  new(length : number) : Int32Array;
  /**
     初始化一个对象
     @param array 当使用 TypedArray 子类的实例调用时，typedArray 会被拷贝到一个新的类型数组中。对于非 bigint TypeedArray 构造函数，typedArray 参数仅可以是非 bigint 类型（例如 Int32Array）。同样，对于 bigint TypedArray 构造函数（BigInt64Array 或 BigUint64Array），typedArray 参数仅可以是 bigint 类型。typedArray 中的每个值在拷贝到新数组之前都转换为构造函数的相应类型。新的类型化数组的长度与 typedArray 参数的长度相同。
     @return 实例对象
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  new(array : ArrayLike<number> | ArrayBufferLike) : Int32Array;
  /**
     当使用 ArrayBuffer  实例以及可选的 byteOffset 和 length 参数调用时，将创建一个新的指定缓冲区的类型化数组视图。byteOffset 和 length 参数指定类型化数组视图将暴露的内存范围。如果忽略这两个参数，则是整个视图的所有 buffer；如果仅忽略 length，则是从 byteOffset 开始的 buffer 剩余部分的视图。
     @param buffer ArrayBuffer实例
     @param byteOffset 可选，偏移量，单位字节
     @param length 可选，长度
     @return 实例对象
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  new(buffer : ArrayBufferLike, byteOffset ?: number, length ?: number) : Int32Array;

  /**
     数组中每个元素的字节大小。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  readonly BYTES_PER_ELEMENT : number;

  /**
     从一组元素创建一个新数组。
     @param items 要包含在新数组对象中的一组元素。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  of(...items : number[]) : Int32Array;

  /**
     从类似数组或可迭代对象创建数组。
     @param arrayLike 要转换为数组的类似数组或可迭代对象。
     @param mapfn 可选参数。如果指定了该参数，则最后生成的类型数组会经过该函数的加工处理后再返回。
     @uniPlatform {
        "app": {
            "android": {
                "osVer": "5.0",
                "uniVer": "√",
                "uniUtsPlugin": "√",
                "unixVer": "4.25",
                "unixUtsPlugin": "4.25"
            },
            "ios": {
                "osVer": "12.0",
                "uniVer": "√",
                "uniUtsPlugin": "4.51",
                "unixVer": "4.11",
                "unixUtsPlugin": "4.51"
              },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  from(arrayLike : ArrayLike<number>, mapfn ?: (v : number, k : number) => number) : Int32Array;
}
declare var Int32Array : Int32ArrayConstructor;
