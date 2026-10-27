interface TestUasm {
  add(a: number, b: number): number
  concat(a: string, b: string): string
}

declare const testUasm: TestUasm

export = testUasm
