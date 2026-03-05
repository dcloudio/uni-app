## 事件修饰符 @modifier

### stop


单击事件将停止传递

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | 3.9 | 4.11 | 4.61 |

### prevent


提交事件将不再重新加载页面

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x |

`android & ios 4.51 +` 支持 `touch` 事件通过 `preventDefault` 阻止滚动与点击事件

### capture


添加事件监听器时，使用 `capture` 捕获模式（例如：指向内部元素的事件，在被内部元素处理前，先被外部处理）

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x |

### self


仅当 event.target 是元素本身时才会触发事件处理器（仅当 event.target 是元素本身时才会触发事件处理器）

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x |

### once


点击事件最多被触发一次

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | 3.9 | x | x |

### passive


滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成（滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成）

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x |

## 按键修饰符

### enter


仅在 `key` 为 `Enter` 时调用事件处理器（keycode 为 13）

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x |

### tab


仅在 `key` 为 `Tab` 时调用事件处理器（keycode 为 9）

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x |

### delete


仅在 `key` 为 `Delete` 或 `Backspace` 时调用事件处理器

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x |

### esc


仅在 `key` 为 `Escape` 时调用事件处理器（keycode 为 27）

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x |

### space


仅在 `key` 为 `Space` 时调用事件处理器（keycode 为 32）

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x |

### up


仅在 `key` 为 `ArrowUp` 时调用事件处理器（keycode 为 38）

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x |

### down


仅在 `key` 为 `ArrowDown` 时调用事件处理器（keycode 为 40）

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x |

### left


仅在 `key` 为 `ArrowLeft` 时调用事件处理器（keycode 为 37）

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x |

### right


仅在 `key` 为 `ArrowRight` 时调用事件处理器（keycode 为 39）

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x |

## 鼠标按键修饰符

### left


单击鼠标左键时触发鼠标事件。

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x |

### right


单击鼠标右键时触发鼠标事件

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x |

### middle


单击鼠标中键（滚轮）时触发鼠标事件

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x |

## 系统按键修饰符

### ctrl


当按下 \<Control> 时触发鼠标或键盘事件。

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x |

### alt


当按下 \<Alt> 时触发鼠标或键盘事件。

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x |

### shift


当按下 \<Shift> 时触发鼠标或键盘事件。

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x |

### meta


当按下 \<Meta> 时触发鼠标或键盘事件。

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x |

### exact


`.exact` 修饰符允许控制触发事件所需的系统修饰符的精确组合。

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | x | x | x |

## props 修饰符

### sync






## v-model 修饰符

### lazy


默认情况下，`v-model` 会在每次 `input` 事件后更新数据 (IME 拼字阶段的状态例外)。你可以添加 `lazy` 修饰符来改为在每次 `change` 事件后更新数据

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | 3.9 | x | x |

### number


如果你想让用户输入自动转换为数字，你可以在 `v-model` 后添加 `.number` 修饰符来管理输入

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | 3.9 | x | x |

### trim


如果你想要默认自动去除用户输入内容中两端的空格，你可以在 `v-model` 后添加 `.trim` 修饰符

**兼容性** 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | 3.9 | x | x |
