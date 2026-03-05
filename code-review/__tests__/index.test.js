const { loadProjectConfig, generateReviewPrompt, getAIReview, getChanges, addReviewComment, processReview } = require('../index');
const fs = require('fs');
const path = require('path');

// 输出环境变量
console.log('测试环境变量:');
console.log('GITLAB_TOKEN:', process.env.GITLAB_TOKEN ? '已设置' : '未设置');
console.log('GITLAB_URL:', process.env.GITLAB_URL);
console.log('DEEPSEEK_API_KEY:', process.env.DEEPSEEK_API_KEY ? '已设置' : '未设置');
console.log('CI_PROJECT_ID:', process.env.CI_PROJECT_ID);
console.log('CI_MERGE_REQUEST_IID:', process.env.CI_MERGE_REQUEST_IID);
console.log('CI_COMMIT_SHA:', process.env.CI_COMMIT_SHA);
console.log('CI_COMMIT_BRANCH:', process.env.CI_COMMIT_BRANCH);
console.log('CI_PIPELINE_SOURCE:', process.env.CI_PIPELINE_SOURCE);
console.log('CI_PROJECT_DIR:', process.env.CI_PROJECT_DIR);
console.log('----------------------------------------');

describe('Code Review System', () => {
  // 测试配置文件加载
  describe('loadProjectConfig', () => {
    it('should load project configuration correctly', async () => {
      const config = loadProjectConfig();
      console.log('项目配置:', JSON.stringify(config, null, 2));
      expect(config).toBeDefined();
      expect(config.language).toBeDefined();
      expect(config.reviewGuidelines).toBeDefined();
      expect(config.reviewRules).toBeDefined();
      expect(config.ignoreFiles).toBeDefined();
    });
  });

  // 测试提示词生成
  describe('generateReviewPrompt', () => {
    it('should generate review prompt correctly', () => {
      const config = loadProjectConfig();
      const changes = [
        {
          file: 'test.js',
          diff: 'console.log("test");'
        }
      ];
      const prompt = generateReviewPrompt(config, JSON.stringify(changes));
      console.log('评审提示词:', prompt);
      expect(prompt).toContain(config.language);
      expect(prompt).toContain(config.reviewGuidelines);
      expect(prompt).toContain('test.js');
    });
  });

  // 测试获取代码变更
  describe('getChanges', () => {
    it('should get changes from merge request', async () => {
      const changes = await getChanges(
        process.env.CI_PROJECT_ID,
        'merge_request',
        process.env.CI_MERGE_REQUEST_IID
      );
      console.log('合并请求变更:', JSON.stringify(changes, null, 2));
      expect(Array.isArray(changes)).toBe(true);
      if (changes.length > 0) {
        expect(changes[0]).toHaveProperty('file');
        expect(changes[0]).toHaveProperty('diff');
      }
    }, 30000); // 设置超时时间为 30 秒

    it('should get changes from push', async () => {
      const changes = await getChanges(
        process.env.CI_PROJECT_ID,
        'push',
        process.env.CI_COMMIT_SHA
      );
      console.log('推送变更:', JSON.stringify(changes, null, 2));
      expect(Array.isArray(changes)).toBe(true);
      if (changes.length > 0) {
        expect(changes[0]).toHaveProperty('file');
        expect(changes[0]).toHaveProperty('diff');
      }
    }, 30000);
  });

  // 测试 AI 评审
  describe('getAIReview', () => {
    it('should get AI review for changes', async () => {
      console.log('开始 AI 评审测试...');
      
      console.log('加载项目配置...');
      const config = loadProjectConfig();
      console.log('项目配置加载完成');
      
      console.log('获取代码变更...');
      const sourceType = process.env.CI_PIPELINE_SOURCE === 'merge_request_event' ? 'merge_request' : 'push';
      const sourceId = sourceType === 'merge_request' ? process.env.CI_MERGE_REQUEST_IID : process.env.CI_COMMIT_SHA;
      console.log(`变更来源: ${sourceType}, ID: ${sourceId}`);
      
      const changes = await getChanges(
        process.env.CI_PROJECT_ID,
        sourceType,
        sourceId
      );
      console.log(`获取到 ${changes.length} 个文件变更`);
      changes.forEach(change => {
        console.log(`文件: ${change.file}`);
        console.log(`变更内容:\n${change.diff}`);
      });
      
      console.log('生成评审提示词...');
      const prompt = generateReviewPrompt(config, JSON.stringify(changes));
      console.log('评审提示词生成完成');
      
      console.log('调用 AI 进行评审...');
      const review = await getAIReview(prompt);
      console.log('AI 评审完成');
      console.log('评审结果:', review);
      
      expect(typeof review).toBe('string');
      expect(review.length).toBeGreaterThan(0);
      console.log('AI 评审测试完成');
    }, 120000); // 设置测试超时时间为 120 秒
  });

  // 测试添加评审评论
  describe('addReviewComment', () => {
    // it('should add review comment to merge request', async () => {
    //   const review = 'Test review comment';
    //   console.log('添加合并请求评论:', review);
    //   await expect(addReviewComment(
    //     process.env.CI_PROJECT_ID,
    //     'merge_request',
    //     process.env.CI_MERGE_REQUEST_IID,
    //     review
    //   )).resolves.not.toThrow();
    // }, 30000);

    it('should add review comment to commit', async () => {
      const review = 'Test review comment';
      console.log('添加提交评论:', review);
      await expect(addReviewComment(
        process.env.CI_PROJECT_ID,
        'push',
        process.env.CI_COMMIT_SHA,
        review
      )).resolves.not.toThrow();
    }, 30000);
  });

  // 测试完整评审流程
  describe('processReview', () => {
    // it('should process review for merge request', async () => {
    //   console.log('开始处理合并请求评审...');
    //   await expect(processReview(
    //     process.env.CI_PROJECT_ID,
    //     'merge_request',
    //     process.env.CI_MERGE_REQUEST_IID
    //   )).resolves.not.toThrow();
    //   console.log('合并请求评审完成');
    // }, 120000); // 设置超时时间为 120 秒

    it('should process review for push', async () => {
      console.log('开始处理推送评审...');
      await expect(processReview(
        process.env.CI_PROJECT_ID,
        'push',
        process.env.CI_COMMIT_SHA
      )).resolves.not.toThrow();
      console.log('推送评审完成');
    }, 120000);
  });
}); 