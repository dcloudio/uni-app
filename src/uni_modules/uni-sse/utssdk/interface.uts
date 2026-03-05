
export type ConnectEventSourceOptions = {
	/**
	 * 服务器地址
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "osVer": "5.0",
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.51"
	      },
	      "ios": {
	        "osVer": "12.0",
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.63",
	        "unixUtsPlugin": "4.63"
	      },
	      "harmony": {
	        "osVer": "x",
	        "uniVer": "x",
	        "unixVer": "x"
	      }
	    },
	    "web": {
	      "uniVer": "x",
	      "unixVer": "x"
	    }
	  }
	 */
	url : string,
	/**
	 * 请求头
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "osVer": "5.0",
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61"
	      },
	      "ios": {
	        "osVer": "12.0",
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.63",
	        "unixUtsPlugin": "4.63"
	      },
	      "harmony": {
	        "osVer": "x",
	        "uniVer": "x",
	        "unixVer": "x"
	      }
	    },
	    "web": {
	      "uniVer": "x",
	      "unixVer": "x"
	    }
	  }
	 */
	header?:UTSJSONObject | null
}
export type ConnectEventSourceCallback = (ev : UniMessageEvent) => void
export type ConnectEventSourceErrorCallback = (error : UniError) => void

export interface Uni {
  /**
   * 连接 SSE
	 * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/connect-event-source.html#connecteventsource
	 * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/connect-event-source.html#connecteventsource
   * @param {ConnectEventSourceOptions} options
   * @uniPlatform
    {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "x",
          "uniUtsPlugin": "x",
          "unixVer": "4.51"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "x",
          "uniUtsPlugin": "x",
          "unixVer": "4.63",
          "unixUtsPlugin": "4.63"
        },
        "harmony": {
          "osVer": "x",
          "uniVer": "x",
          "unixVer": "x"
        }
      },
      "web": {
        "uniVer": "x",
        "unixVer": "x"
      }
    }
   */
	connectEventSource(options : ConnectEventSourceOptions) : UniEventSource;
}
export type ConnectEventSource = (options : ConnectEventSourceOptions) => UniEventSource;
export interface UniEventSource {
	/**
	 *  message 事件，会在通过事件源收到数据时触发。
	 * @param {ConnectEventSourceCallback} callback  事件回调
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "osVer": "5.0",
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.51"
	      },
	      "ios": {
	        "osVer": "12.0",
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.63",
	        "unixUtsPlugin": "4.63"
	      },
	      "harmony": {
	        "osVer": "x",
	        "uniVer": "x",
	        "unixVer": "x"
	      }
	    },
	    "web": {
	      "uniVer": "x",
	      "unixVer": "x"
	    }
	  }
	 */
	onMessage(callback : ConnectEventSourceCallback) : void
	/**
	 * onerror 是当发生错误且这个错误事件（error）被 UniEventSource 触发时调用的一个事件处理函数。
	 * @param {ConnectEventSourceErrorCallback} callback  事件回调
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "osVer": "5.0",
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.51"
	      },
	      "ios": {
	        "osVer": "12.0",
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.63",
	        "unixUtsPlugin": "4.63"
	      },
	      "harmony": {
	        "osVer": "x",
	        "uniVer": "x",
	        "unixVer": "x"
	      }
	    },
	    "web": {
	      "uniVer": "x",
	      "unixVer": "x"
	    }
	  }
	 */
	onError(callback : ConnectEventSourceErrorCallback) : void
	/**
	 * 一个事件处理器，它在收到 open 事件时被调用，在那时，连接刚被打开。
	 * @param {ConnectEventSourceCallback} callback  事件回调
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "osVer": "5.0",
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.51"
	      },
	      "ios": {
	        "osVer": "12.0",
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.63",
	        "unixUtsPlugin": "4.63"
	      },
	      "harmony": {
	        "osVer": "x",
	        "uniVer": "x",
	        "unixVer": "x"
	      }
	    },
	    "web": {
	      "uniVer": "x",
	      "unixVer": "x"
	    }
	  }
	 */
	onOpen(callback : ConnectEventSourceCallback) : void
	/**
	 * 关闭当前的连接
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "osVer": "5.0",
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.51"
	      },
	      "ios": {
	        "osVer": "12.0",
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.63",
	        "unixUtsPlugin": "4.63"
	      },
	      "harmony": {
	        "osVer": "x",
	        "uniVer": "x",
	        "unixVer": "x"
	      }
	    },
	    "web": {
	      "uniVer": "x",
	      "unixVer": "x"
	    }
	  }
	 */
	close() : void
}
export class UniMessageEvent {
	/**
	 * 事件类型。
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "osVer": "5.0",
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.51"
	      },
	      "ios": {
	        "osVer": "12.0",
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.63",
	        "unixUtsPlugin": "4.63"
	      },
	      "harmony": {
	        "osVer": "x",
	        "uniVer": "x",
	        "unixVer": "x"
	      }
	    },
	    "web": {
	      "uniVer": "x",
	      "unixVer": "x"
	    }
	  }
	 */
	type : string | null = null;
	/**
	 * 消息发射器发出的数据。
	 * @param {ConnectEventSourceOptions} options
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "osVer": "5.0",
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.51"
	      },
	      "ios": {
	        "osVer": "12.0",
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.63",
	        "unixUtsPlugin": "4.63"
	      },
	      "harmony": {
	        "osVer": "x",
	        "uniVer": "x",
	        "unixVer": "x"
	      }
	    },
	    "web": {
	      "uniVer": "x",
	      "unixVer": "x"
	    }
	  }
	 */
	data : any | null = null;
	/**
	 * 一个字符串，表示事件的唯一 ID。
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "osVer": "5.0",
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.51"
	      },
	      "ios": {
	        "osVer": "12.0",
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.63",
	        "unixUtsPlugin": "4.63"
	      },
	      "harmony": {
	        "osVer": "x",
	        "uniVer": "x",
	        "unixVer": "x"
	      }
	    },
	    "web": {
	      "uniVer": "x",
	      "unixVer": "x"
	    }
	  }
	 */
	lastEventId : string | null = null
}
