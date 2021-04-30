function serializeDefine(define: Record<string, any>): string {
  let res = `{`
  for (const key in define) {
    const val = define[key]
    res += `${JSON.stringify(key)}: ${
      typeof val === 'string' ? `(${val})` : JSON.stringify(val)
    }, `
  }
  return res + `}`
}

export function generateSSREnvCode(define: Record<string, any>): string {
  return envCode.replace('__DEFINES__', serializeDefine(define))
}

const envCode = `const context = (() => {
    if (typeof globalThis !== 'undefined') {
        return globalThis;
    }
    else if (typeof self !== 'undefined') {
        return self;
    }
    else if (typeof window !== 'undefined') {
        return window;
    }
    else {
        return Function('return this')();
    }
})();
// assign defines
const defines = __DEFINES__;
Object.keys(defines).forEach((key) => {
    const segments = key.split('.');
    let target = context;
    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        if (i === segments.length - 1) {
            target[segment] = defines[key];
        }
        else {
            target = target[segment] || (target[segment] = {});
        }
    }
});`
