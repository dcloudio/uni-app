/**
 * 私有版回前台 scene 回归：读不到新 scene 时不能用空值覆盖旧 sc。
 */

const mockGetScene = jest.fn()
const mockGetResidenceTime = jest.fn()

jest.mock('../../src/utils/pageTime.js', () => ({
  get_first_visit_time: jest.fn(() => 1),
  get_last_visit_time: jest.fn(() => 0),
  get_page_residence_time: jest.fn(() => ({ residenceTime: 0 })),
  get_residence_time: (...args) => mockGetResidenceTime(...args),
  get_time: jest.fn(() => 1),
  get_total_visit_count: jest.fn(() => 1),
  set_first_time: jest.fn(),
  set_page_residence_time: jest.fn(),
}))

jest.mock('../../src/utils/pageInfo.js', () => ({
  calibration: jest.fn(),
  get_channel: jest.fn(() => ''),
  get_encodeURIComponent_options: jest.fn((value) => value),
  get_odid: jest.fn(() => ''),
  get_pack_name: jest.fn(() => ''),
  get_page_name: jest.fn(() => ''),
  get_page_route: jest.fn(() => ''),
  get_page_vm: jest.fn(() => null),
  get_platform_name: jest.fn(() => 'wx'),
  get_report_Interval: jest.fn(() => 10),
  get_route: jest.fn(() => ''),
  get_scene: (...args) => mockGetScene(...args),
  get_sgin: jest.fn(() => ''),
  get_splicing: jest.fn(() => ''),
  get_uuid: jest.fn(() => 'uuid'),
  get_version: jest.fn(() => ''),
  handle_data: jest.fn(() => ''),
  is_debug: false,
  is_handle_device: jest.fn(() => true),
  is_report_data: jest.fn(() => Promise.resolve()),
  log: jest.fn(),
  stat_config: { appid: 'ak' },
}))

jest.mock('../../src/utils/util.js', () => ({
  sys: {},
}))

jest.mock('../../src/utils/db.js', () => ({
  dbGet: jest.fn(),
  dbRemove: jest.fn(),
  dbSet: jest.fn(),
}))

jest.mock('../../src/config.ts', () => ({
  OPERATING_TIME: 10,
  STAT_H5_URL: '',
  STAT_URL: '',
  STAT_VERSION: '5.24',
}))

jest.mock('../../src/core/reportNetwork.js', () => ({
  ackPending: jest.fn(),
  gateSend: jest.fn(),
  initReportNetwork: jest.fn(),
  persistPending: jest.fn(),
  toWirePayload: (value) => value,
}))

function createReport() {
  global.__STAT_VERSION__ = '2'
  global.uni = {
    addInterceptor: undefined,
    getStorageSync: jest.fn(() => 'pages/home'),
  }
  const Report = require('../../src/core/report.js').default
  const report = new Report()
  report.__licationHide = true
  report.statData.sc = '1001'
  report.sendReportRequest = jest.fn()
  return report
}

describe('private Report.applicationShow scene', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetResidenceTime.mockReturnValue({ overtime: false })
  })

  afterEach(() => {
    delete global.uni
    delete global.__STAT_VERSION__
  })

  test('回前台读不到 scene 时不发空 sc 新启动', () => {
    mockGetScene.mockReturnValue('')
    const report = createReport()
    report.applicationShow({})
    expect(report.sendReportRequest).not.toHaveBeenCalled()
  })

  test('回前台 scene 变化时发新启动并携带新 sc', () => {
    mockGetScene.mockReturnValue('2002')
    const report = createReport()
    report.applicationShow({ scene: 2002 })
    expect(report.sendReportRequest).toHaveBeenCalledWith({
      path: 'pages/home',
      scene: '2002',
      cst: 2,
    })
  })

  test('后台超时但读不到 scene 时保留旧 sc', () => {
    mockGetResidenceTime.mockReturnValue({ overtime: true })
    mockGetScene.mockReturnValue('')
    const report = createReport()
    report.applicationShow({})
    expect(report.sendReportRequest).toHaveBeenCalledWith({
      path: 'pages/home',
      scene: '1001',
      cst: 2,
    })
  })
})
