#!/usr/bin/env node

const os = require('os')
const path = require('path')
const { toKotlin, toSwift } = require('../dist')
const isWindows = os.platform() === 'win32'

const args = process.argv

const fileName = args[2]
if (!fileName) {
    console.log('Please specify a file name')
    process.exit(1)
}

const filename = normalizePath(path.resolve(fileName))
const inputDir = normalizePath(path.dirname(filename))

const out = normalizePath(path.resolve(resolveArg('--out', '-o') || inputDir))
const outSwiftFile = out.endsWith('.swift')
const outKotlinFile = out.endsWith('.kt')
const isOutFile = outSwiftFile || outKotlinFile
const isSwift = args.some((arg) => arg === '--swift') || outSwiftFile
const outDir = isOutFile ? path.dirname(out) : out
const outFilename = path.basename(isOutFile ? out : filename)

const package = resolveArg('--package', '-p')
const imports = resolveArgs('--import', '-i')

function normalizePath(id) {
    return isWindows ? id.replace(/\\/g, '/') : id
}

function resolveArg(name, alias = '') {
    const index = args.findIndex((arg) => arg === name || (alias && arg === alias))
    return index > -1 ? args[index + 1] : ''
}

function resolveArgs(name, alias = '') {
    const values = []
    args.forEach((arg, index) => {
        if (arg === name || (alias && arg === alias)) {
            values.push(args[index + 1])
        }
    })
    return values
}


async function run() {

    const options = {
        input: {
            root: inputDir,
            filename,
            comments: true
        },
        output: {
            outDir,
            outFilename,
            extname: isSwift ? 'swift' : 'kt',
            removeImports: true,
            package,
            imports,
        }
    }
    console.log(options)
    let result = {}
    if (isSwift) {
        result = await toSwift(options)
    } else {
        result = await toKotlin(options)
    }
    console.log(result)
}

run()