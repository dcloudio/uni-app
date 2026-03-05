// 设置测试环境变量
process.env.NODE_ENV = 'test';

// GitLab 相关配置
process.env.GITLAB_TOKEN = process.env.TEST_GITLAB_TOKEN;
process.env.GITLAB_URL = process.env.TEST_GITLAB_URL || 'http://git.dcloud.io';

// DeepSeek API 配置
process.env.DEEPSEEK_API_KEY = process.env.TEST_DEEPSEEK_API_KEY;

// 测试项目配置
process.env.TEST_PROJECT_ID = '602';
process.env.TEST_MERGE_REQUEST_IID = '1';
process.env.TEST_COMMIT_SHA = 'f07f0dfe33e4099256bb23412d004502973c55c8';
process.env.TEST_BRANCH = 'dev';
process.env.TEST_PIPELINE_SOURCE = 'merge_request_event';
process.env.CI_PROJECT_DIR = process.cwd();

// 添加新的配置
process.env.CI_PROJECT_ID = process.env.TEST_PROJECT_ID;
process.env.CI_MERGE_REQUEST_IID = process.env.TEST_MERGE_REQUEST_IID;
process.env.CI_COMMIT_SHA = process.env.TEST_COMMIT_SHA;
process.env.CI_COMMIT_BRANCH = process.env.TEST_BRANCH || 'dev';
process.env.CI_PIPELINE_SOURCE = process.env.TEST_PIPELINE_SOURCE || 'push';
process.env.CI_PROJECT_DIR = process.cwd() + '/../'; 