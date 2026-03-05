const path = require("path");
const fs = require("fs");
const {
    configureToMatchImageSnapshot
} = require('jest-image-snapshot');
let saveImageSnapshotDir = process.env.saveImageSnapshotDir || path.join(__dirname, '__snapshot__');

const oldProgramNavigation = {
    navigateTo: program.navigateTo.bind(program),
    navigateBack: program.navigateBack.bind(program),
    reLaunch: program.reLaunch.bind(program),
}

const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
const isMP = platformInfo.startsWith('mp')

const randomClass = `.automator-not-exist-class-${Math.random().toString(36).substring(7)}`

function parseSelector(selector) {
  if(selector.startsWith('#')) {
    // 微信小程序子组件真实渲染的id为`xxxx--id`，页面内渲染出的id属性为`id`
    return `page [id="${selector.slice(1)}"]:not(${randomClass}),page [id$="--${selector.slice(1)}"]:not(${randomClass})`
  }
  return `${selector}:not(${randomClass})`
}

function setupPage (page) {
    const old$ = page.$.bind(page)
    const old$$ = page.$$.bind(page)
    page.$$ = async function (selector) {
        const elements = await old$$.call(this, parseSelector(selector))
        return elements
    }
    page.$ = async function (selector) {
        const element = await old$.call(this, parseSelector(selector))
        return element
    }
}

function setupProgramNavigation (program, methodName, oldMethod) {
    program[methodName] = async function (...args) {
        const page = await oldMethod.apply(this, args)
        setupPage(page)
        return page
    }
}

function setupProgram (program) {
    ['navigateTo', 'navigateBack', 'reLaunch'].forEach(methodName => {
        setupProgramNavigation(program, methodName, oldProgramNavigation[methodName])
    })
}

if (isMP) {
    /**
     * hack微信小程序自动化测试方法，非标准用法。可能随小程序自动化测试工具升级失效，可能不适用于其他小程序
     * 处理小程序page对象无法获取子组件内元素的问题
     */
    setupProgram(program)
}

expect.extend({
    toMatchImageSnapshot: configureToMatchImageSnapshot({
        customSnapshotIdentifier (args) {
            return args.currentTestName.replace(/\//g, "-").replace(" ", "-");
        },
        customSnapshotsDir: process.env.saveImageSnapshotDir,
        customDiffDir: path.join(saveImageSnapshotDir, "diff"),
    }),
    toSaveSnapshot,
    toSaveImageSnapshot,
});

const testCaseToSnapshotFilePath =
    process.env.testCaseToSnapshotFilePath || "./testCaseToSnapshotFilePath.json";

if (!fs.existsSync(testCaseToSnapshotFilePath)) {
    fs.writeFileSync(testCaseToSnapshotFilePath, "{}");
}

function writeTestCaseToSnapshotFile (testCaseName, snapshotFilePath) {
    const data = JSON.parse(fs.readFileSync(testCaseToSnapshotFilePath));

    if (testCaseName.includes(__dirname)) {
        testCaseName = testCaseName.substring(`${__dirname}`.length);
        if (testCaseName[0] == '/' || testCaseName[0] == '\\') {
            testCaseName = testCaseName.substring(1);
        };
    };

    if (!data[testCaseName]) {
        data[testCaseName] = [snapshotFilePath];
    } else {
        data[testCaseName].push(snapshotFilePath);
    }
    fs.writeFileSync(testCaseToSnapshotFilePath, JSON.stringify(data, null, 2));
}

function toSaveSnapshot (received, {
    customSnapshotsDir,
    fileName
} = {}) {
    const {
        snapshotState: {
            _rootDir
        },
        testPath,
        currentTestName,
    } = this;
    const SNAPSHOTS_DIR = "__file_snapshots__";
    const snapshotDir =
        process.env.saveSnapshotDir ||
        createSnapshotDir({
            customSnapshotsDir,
            testPath,
            SNAPSHOTS_DIR,
        });
    const _fileName = createFileName({
        fileName,
        testPath,
        currentTestName,
    });
    const filePath = path.join(snapshotDir, _fileName);
    let message = () => `${currentTestName} toSaveSnapshot success`;
    let pass = true;

    try {
        checkSnapshotDir(path.dirname(filePath));
        fs.writeFileSync(filePath, received);
        writeTestCaseToSnapshotFile(testPath.replace(`${_rootDir}/`, ""), filePath);
    } catch (e) {
        console.log("toSaveSnapshot fail", e);
        message = () => e.message;
        pass = false;
    }

    return {
        message,
        pass,
    };
}

function toSaveImageSnapshot (
    received, {
        customSnapshotsDir,
        customSnapshotIdentifier
    } = {}
) {
    const {
        snapshotState: {
            _rootDir
        },
        testPath,
        currentTestName,
    } = this;
    const SNAPSHOTS_DIR = "__image_snapshots__";
    const snapshotDir =
        process.env.saveImageSnapshotDir ||
        createSnapshotDir({
            customSnapshotsDir,
            testPath,
            SNAPSHOTS_DIR,
        });
    const _fileName = createFileName({
        fileName: customSnapshotIdentifier ? `${customSnapshotIdentifier()}.png` : "",
        testPath,
        currentTestName,
        fileType: "png",
    });
    const filePath = path.join(snapshotDir, _fileName);
    let message = () => `${currentTestName} toSaveImageSnapshot success`;
    let pass = true;

    try {
        checkSnapshotDir(path.dirname(filePath));
        fs.writeFileSync(filePath, Buffer.from(received, "base64"));
        writeTestCaseToSnapshotFile(testPath.replace(`${_rootDir}/`, ""), filePath);
    } catch (e) {
        console.log("toSaveImageSnapshot fail", e);
        message = () => e.message;
        pass = false;
    }

    return {
        message,
        pass,
    };
}

function createSnapshotDir ({
    customSnapshotsDir,
    testPath,
    SNAPSHOTS_DIR
}) {
    return customSnapshotsDir || path.join(path.dirname(testPath), SNAPSHOTS_DIR);
}

function createFileName ({
    fileName,
    testPath,
    currentTestName,
    fileType
}) {
    return (
        fileName ||
        createSnapshotIdentifier({
            testPath,
            currentTestName,
            fileType,
        })
    );
}

function createSnapshotIdentifier ({
    testPath,
    currentTestName,
    fileType = "txt",
}) {
    const snapshotIdentifier = kebabCase(
        `${path.basename(testPath)}-${currentTestName}`
    );
    const counter = timesCalled.get(`${snapshotIdentifier}-${fileType}`) || 1;
    timesCalled.set(`${snapshotIdentifier}-${fileType}`, counter + 1);
    return `${snapshotIdentifier}-${counter}.${fileType}`;
}

function kebabCase (str) {
    return str
        .replaceAll(/([a-z])([A-Z])/g, "$1-$2")
        .replaceAll(/\s+/g, "-")
        .replaceAll(/_+/g, "-")
        .replaceAll(/\/+/g, "-")
        .replaceAll(/\.+/g, "-")
        .toLowerCase();
}

function checkSnapshotDir (snapshotDir) {
    if (!fs.existsSync(snapshotDir)) {
        fs.mkdirSync(snapshotDir, {
            recursive: true,
        });
    }
}

const timesCalled = new Map();

