declare namespace NodeJS {
  interface ProcessEnv {
    UNI_PLATFORM: UniApp.PLATFORM
    UNI_INPUT_DIR: string
    UNI_OUTPUT_DIR: string
    UNI_CLI_CONTEXT: string
  }
}
