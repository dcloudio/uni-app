import path from 'path'
process.env.UNI_CLI_CONTEXT = __dirname
process.env.UNI_INPUT_DIR = path.resolve(__dirname, 'src')
process.env.UNI_OUTPUT_DIR = path.resolve(__dirname, 'dist')
process.env.UNI_PLATFORM = 'h5'
