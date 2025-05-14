interface DataView {
  /**
     ArrayBuffer 是引用该缓冲区的视图。在构造时会被固定，因此该属性只读。
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  readonly buffer : ArrayBuffer;
  /**
     视图的长度（以字节为单位）。在构造时会被固定，因此该属性只读。
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
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
     至 ArrayBuffer 的视图开始位置的字节偏移量。在构造时会被固定，因此该属性只读。
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
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
     获取指定字节偏移处的 Float32 值。没有对齐约束；多字节值可以从任何偏移处获取。
     @param byteOffset 从视图开始检索值的位置。
     @param littleEndian 如果为 false 或未定义，则读取大端值。
     @return 返回指定位置的 Float32 值。
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  getFloat32(byteOffset : number, littleEndian ?: boolean) : number;

  /**
     获取指定字节偏移处的 Float64 值。没有对齐约束；多字节值可以从任何偏移处获取。
     @param byteOffset 从视图开始检索值的位置。
     @param littleEndian 如果为 false 或未定义，则读取大端值。
     @return 返回指定位置的 Float64 值。
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  getFloat64(byteOffset : number, littleEndian ?: boolean) : number;

  /**
     获取指定字节偏移处的 Int8 值。没有对齐约束；多字节值可以从任何偏移处获取。
     @param byteOffset 从视图开始检索值的位置。
     @return 返回指定位置的 Int8 值。
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  getInt8(byteOffset : number) : number;

  /**
     获取指定字节偏移处的 Int16 值。没有对齐约束；多字节值可以从任何偏移处获取。
     @param byteOffset 从视图开始检索值的位置。
     @param littleEndian 如果为 false 或未定义，则读取大端值。
     @return 返回指定位置的 Int16 值。
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  getInt16(byteOffset : number, littleEndian ?: boolean) : number;

  /**
     获取指定字节偏移处的 Int32 值。没有对齐约束；多字节值可以从任何偏移处获取。
     @param byteOffset 从视图开始检索值的位置。
     @param littleEndian 如果为 false 或未定义，则读取大端值。
     @return 返回指定位置的 Int32 值。
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  getInt32(byteOffset : number, littleEndian ?: boolean) : number;

  /**
     获取指定字节偏移处的 Uint8 值。没有对齐约束；多字节值可以从任何偏移处获取。
     @param byteOffset 从视图开始检索值的位置。
     @return 返回指定位置的 Uint8 值。
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  getUint8(byteOffset : number) : number;

  /**
     获取指定字节偏移处的 Uint16 值。没有对齐约束；多字节值可以从任何偏移处获取。
     @param byteOffset 从视图开始检索值的位置。
     @param littleEndian 如果为 false 或未定义，则读取大端值。
     @return 返回指定位置的 Uint16 值。
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  getUint16(byteOffset : number, littleEndian ?: boolean) : number;

  /**
     获取指定字节偏移处的 Uint32 值。没有对齐约束；多字节值可以从任何偏移处获取。
     @param byteOffset 从视图开始检索值的位置。
     @param littleEndian 如果为 false 或未定义，则读取大端值。
     @return 返回指定位置的 Uint32 值。
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  getUint32(byteOffset : number, littleEndian ?: boolean) : number;

  /**
     在指定的字节偏移处存储一个 Float32 值。
     @param byteOffset 从视图开始设置值的位置。
     @param value 要设置的值。
     @param littleEndian 如果为 false 或未定义，则写入大端值。
     @return 无返回值。
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  setFloat32(byteOffset : number, value : number, littleEndian ?: boolean) : void;

  /**
     在指定的字节偏移处存储一个 Float64 值。
     @param byteOffset 从视图开始设置值的位置。
     @param value 要设置的值。
     @param littleEndian 如果为 false 或未定义，则写入大端值。
     @return 无返回值。
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  setFloat64(byteOffset : number, value : number, littleEndian ?: boolean) : void;

  /**
     在指定的字节偏移处存储一个 Int8 值。
     @param byteOffset 从视图开始设置值的位置。
     @param value 要设置的值。
     @return 无返回值。
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  setInt8(byteOffset : number, value : number) : void;

  /**
     在指定的字节偏移处存储一个 Int16 值。
     @param byteOffset 从视图开始设置值的位置。
     @param value 要设置的值。
     @param littleEndian 如果为 false 或未定义，则写入大端值。
     @return 无返回值。
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  setInt16(byteOffset : number, value : number, littleEndian ?: boolean) : void;

  /**
     在指定的字节偏移处存储一个 Int32 值。
     @param byteOffset 从视图开始设置值的位置。
     @param value 要设置的值。
     @param littleEndian 如果为 false 或未定义，则写入大端值。
     @return 无返回值。
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  setInt32(byteOffset : number, value : number, littleEndian ?: boolean) : void;

  /**
     在指定的字节偏移处存储一个 Uint8 值。
     @param byteOffset 从视图开始设置值的位置。
     @param value 要设置的值。
     @return 无返回值。
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  setUint8(byteOffset : number, value : number) : void;

  /**
     在指定的字节偏移处存储一个 Uint16 值。
     @param byteOffset 从视图开始设置值的位置。
     @param value 要设置的值。
     @param littleEndian 如果为 false 或未定义，则写入大端值。
     @return 无返回值。
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  setUint16(byteOffset : number, value : number, littleEndian ?: boolean) : void;

  /**
     在指定的字节偏移处存储一个 Uint32 值。
     @param byteOffset 从视图开始设置值的位置。
     @param value 要设置的值。
     @param littleEndian 如果为 false 或未定义，则写入大端值。
     @return 无返回值。
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  setUint32(byteOffset : number, value : number, littleEndian ?: boolean) : void;
}

interface DataViewConstructor {
  /**
     当使用 ArrayBuffer  实例以及可选的 byteOffset 和 length 参数调用时，将创建一个新的指定缓冲区的DataView视图。byteOffset 和 length 参数指定视图将暴露的内存范围。如果忽略这两个参数，则是整个视图的所有 buffer；如果仅忽略 length，则是从 byteOffset 开始的 buffer 剩余部分的视图。
     @param buffer ArrayBuffer实例
     @param byteOffset 可选，偏移量，单位字节
     @param byteLength 长度
     @return 实例对象
     @uniPlatform {
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
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "web": {
           "uniVer": "√",
           "unixVer": "√"
        }
     }
   */
  new(buffer : ArrayBufferLike & { BYTES_PER_ELEMENT ?: never; }, byteOffset ?: number, byteLength ?: number) : DataView;
}
declare var DataView : DataViewConstructor;
