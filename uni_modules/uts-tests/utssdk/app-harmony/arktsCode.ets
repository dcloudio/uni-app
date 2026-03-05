interface INativeCode {
  getNativeStr: () => string;
}

export const NativeCode: INativeCode = {
  getNativeStr: () => {
    return "harmonyos-code";
  }
} as INativeCode;