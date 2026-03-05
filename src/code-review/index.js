const { Gitlab } = require('@gitbeaker/rest');
const axios = require('axios');
const yaml = require('yaml');
const fs = require('fs');
const minimatch = require('minimatch');
require('dotenv').config();

// 阿里百炼 https://bailian.console.aliyun.com/
const BAILIAN_API_KEY = process.env.BAILIAN_API_KEY;
const BAILIAN_API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';

// 阿波罗AI https://api.ablai.top/personal
const ABLAI_API_KEY = process.env.ABLAI_API_KEY;
const ABLAI_API_URL = 'https://api.ablai.top/v1/chat/completions';

const GITLAB_TOKEN = process.env.GITLAB_TOKEN;
const GITLAB_URL = process.env.CI_SERVER_URL || 'http://git.dcloud.io';

const api = new Gitlab({
  token: GITLAB_TOKEN,
  host: GITLAB_URL
});

// AI 服务商配置
const AI_PROVIDERS = {
  bailian: {
    name: '阿里百炼',
    apiKey: BAILIAN_API_KEY,
    apiUrl: BAILIAN_API_URL,
    envKey: 'BAILIAN_API_KEY'
  },
  ablai: {
    name: '阿波罗',
    apiKey: ABLAI_API_KEY,
    apiUrl: ABLAI_API_URL,
    envKey: 'ABLAI_API_KEY'
  }
};

// 检查提交是否已经被评审过
async function isCommitReviewed(projectId, commitId) {
  try {
    const discussions = await api.CommitDiscussions.all(projectId, commitId);
    return discussions.some(discussion => 
      discussion.notes.some(note => 
        note.body.includes('🤖 AI 代码评审结果')
      )
    );
  } catch (error) {
    console.error(`检查提交 ${commitId} 评审状态时出错:`, error);
    return false;
  }
}

// 加载项目配置
function loadProjectConfig() {
  try {
    // 在 GitLab CI 环境中，工作目录是 /builds/username/project-name/
    const configPath = `${process.env.CI_PROJECT_DIR}/code-review/configs/code-review.yaml`;
    const configContent = fs.readFileSync(configPath, 'utf8');
    const config = yaml.parse(configContent);

    if (!config || !config.project) {
      throw new Error('配置文件格式错误');
    }

    return {
      reviewGuidelines: config.project.reviewGuidelines || '',
      ignoreFiles: config.ignore || [],
      aiModel: config.project.aiModel || "qwen-turbo-2025-04-28",
      provider: config.project.provider || 'ablai',
      maxTokens: config.project.maxTokens || 5000
    };
  } catch (error) {
    console.error('Error loading config:', error);
    return null;
  }
}

// 生成 AI 评审提示词
function generateReviewPrompt(projectConfig, changes, commitInfo = null) {
  const { reviewGuidelines } = projectConfig;

  // 格式化变更信息
  const formattedChanges = changes.map(change => {
    return `
#### 文件路径：${change.file}
##### 变更内容：
${change.diff}
${change.content ? `##### 文件完整内容：
${change.content}` : ''}
`;
  }).join('\n');

  // 添加 commit 信息
  const commitInfoText = commitInfo ? `${commitInfo.message}` : '';

  return `
${reviewGuidelines}

### 提交日志 (Commit Message):
${commitInfoText}

### 代码变更及上下文：
${formattedChanges}
`;
}

// 添加重试函数
async function retryWithDelay(fn, maxRetries = 5, delay = 3000) {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (error.response && error.response.status >= 500) {
        console.log(`API 请求失败 (状态码: ${error.response.status})，${i + 1}/${maxRetries} 次重试...`);
        if (i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
      }
      throw error;
    }
  }
  throw lastError;
}

// 调用 AI API 进行评审
async function getAIReview(prompt, projectConfig) {
  try {
    console.log('调用 AI API...');
    console.log(prompt);

    const model = projectConfig.aiModel || "qwen-turbo-2025-04-28";
    const provider = projectConfig.provider || 'ablai';

    console.log('provider', provider);
    
    // 获取服务商配置
    const providerConfig = AI_PROVIDERS[provider];
    if (!providerConfig) {
      throw new Error(`不支持的服务商: ${provider}`);
    }

    if (!providerConfig.apiKey) {
      throw new Error(`${providerConfig.name} API Key (${providerConfig.envKey}) 未设置`);
    }
    
    // 创建 axios 实例
    const axiosInstance = axios.create({
      proxy: false,
      timeout: 600000 // 设置超时时间为 10 分钟
    });

    // 使用重试机制发送请求
    const response = await retryWithDelay(async () => {
      return await axiosInstance.post(providerConfig.apiUrl, {
        model: model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: projectConfig.maxTokens || 5000
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${providerConfig.apiKey}`
        }
      });
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling AI API:', error);
    if (error.code === 'ECONNABORTED') {
      console.error('API 请求超时，请检查网络连接或增加超时时间');
    }
    throw error;
  }
}

// 获取代码变更内容
async function getChanges(projectId, sourceType, sourceId) {
  try {
    let changes;
    if (sourceType === 'merge_request') {
      console.log(`获取合并请求 ${sourceId} 的代码变更...`);
      changes = await api.MergeRequests.allDiffs(projectId, sourceId, {
        accessRawDiffs: true
      });
      console.log(`成功获取合并请求 ${sourceId} 的代码变更，共 ${changes.length} 个文件`);
    } else if (sourceType === 'push') {
      console.log(`获取提交 ${sourceId} 的代码变更...`);
      // 获取单个 commit 的变更
      const diff = await api.Commits.showDiff(projectId, sourceId);
      changes = diff.map(change => ({
        new_path: change.new_path,
        old_path: change.old_path,
        diff: change.diff
      }));
      console.log(`成功获取提交 ${sourceId} 的代码变更，共 ${changes.length} 个文件`);
    } else {
      console.error(`不支持的类型: ${sourceType}`);
      throw new Error(`不支持的类型: ${sourceType}`);
    }

    const projectConfig = loadProjectConfig();
    const ignorePatterns = projectConfig.ignoreFiles || [];

    // 获取变更文件的完整内容
    const changesWithContent = await Promise.all(changes
      .filter(change => {
        // 检查文件是否在忽略列表中
        return !ignorePatterns.some(pattern => {
          // 使用 minimatch 进行 glob 模式匹配
          const shouldIgnore =
            (change.new_path && minimatch(change.new_path, pattern)) ||
            (change.old_path && minimatch(change.old_path, pattern));

          if (shouldIgnore) {
            console.log(`忽略文件: ${change.new_path || change.old_path} (匹配模式: ${pattern})`);
          }

          return shouldIgnore;
        });
      })
      .map(async change => {
        const filePath = change.new_path || change.old_path;
        try {
          console.log(`正在获取文件 ${filePath} 的完整内容...`);
          // 获取文件的完整内容
          const fileContent = await api.RepositoryFiles.show(projectId, filePath, sourceId);
          // 对 base64 编码的内容进行解码
          const decodedContent = Buffer.from(fileContent.content, 'base64').toString('utf-8');
          console.log(`成功获取文件 ${filePath} 的完整内容`);
          return {
            file: filePath,
            diff: change.diff,
            content: decodedContent
          };
        } catch (error) {
          console.error(`无法获取文件 ${filePath} 的完整内容:`, error);
          return {
            file: filePath,
            diff: change.diff
          };
        }
      }));

    console.log(`成功处理所有文件变更，共 ${changesWithContent.length} 个文件`);
    return changesWithContent;
  } catch (error) {
    console.error('获取代码变更失败:', error);
    throw error;
  }
}

// 添加评审评论
async function addReviewComment(projectId, sourceType, sourceId, review) {
  try {
    console.log(`添加评审评论 - 项目ID: ${projectId}, 来源类型: ${sourceType}, 来源ID: ${sourceId}`);

    if (!projectId) {
      throw new Error('项目ID不能为空');
    }
    if (!sourceId) {
      throw new Error('来源ID不能为空');
    }
    if (!review) {
      throw new Error('评审内容不能为空');
    }

    const note = `🤖 AI 代码评审结果：\n\n${review}`;
    if (sourceType === 'merge_request') {
      console.log('正在为合并请求添加评论...');
      await api.MergeRequestNotes.create(projectId, sourceId, note);
      console.log('合并请求评论添加成功');
    } else if (sourceType === 'push') {
      console.log('正在为提交添加评论...');
      await api.CommitDiscussions.create(projectId, sourceId, note);
      console.log('提交评论添加成功');
    } else {
      throw new Error(`不支持的来源类型: ${sourceType}`);
    }
  } catch (error) {
    console.error('添加评审评论失败:', {
      error: error.message,
      projectId,
      sourceType,
      sourceId,
      reviewLength: review?.length
    });
    if (error.cause?.description) {
      console.error('错误详情:', error.cause.description);
    }
    throw error;
  }
}

// 主处理函数
async function processReview(projectId, sourceType, sourceId) {
  try {
    const projectConfig = loadProjectConfig();
    if (!projectConfig) {
      console.error('Project configuration not found');
      process.exit(1);
    }

    if (sourceType === 'push') {
      console.log(process.env.CI_COMMIT_BEFORE_SHA);
      console.log(process.env.CI_COMMIT_SHA);
      console.log(process.env.CI_COMMIT_BRANCH);

      // 获取本次 push 的所有 commit
      let commits;
      if (process.env.CI_COMMIT_BEFORE_SHA && process.env.CI_COMMIT_SHA) {
        commits = await api.Repositories.compare(projectId, process.env.CI_COMMIT_BEFORE_SHA, process.env.CI_COMMIT_SHA);
        commits = commits.commits || [];
        console.log('获取本次提交的信息：', commits);
      } else {
        commits = await api.Commits.all(projectId, {
          ref_name: process.env.CI_COMMIT_BRANCH,
          per_page: 1
        });
        console.log('获取首次提交的信息：', commits);
      }

      // 过滤掉合并分支的提交
      commits = commits.filter(commit => !commit.message.startsWith('Merge branch'));
      console.log(`获取到 ${commits.length} 个提交需要评审（已过滤合并分支的提交）`);

      // 对每个 commit 进行评审
      for (const commit of commits) {
        console.log(`开始评审提交: ${commit.id}`);
        console.log(`提交信息: ${commit.message}`);

        // 检查提交是否已经被评审过
        const isReviewed = await isCommitReviewed(projectId, commit.id);
        if (isReviewed) {
          console.log(`提交 ${commit.id} 已经评审过，跳过评审`);
          continue;
        }

        // 获取该 commit 的变更
        const changes = await getChanges(projectId, sourceType, commit.id);

        if (changes.length === 0) {
          console.log(`提交 ${commit.id} 没有代码变更，跳过评审`);
          continue;
        }

        console.log(`提交 ${commit.id} 包含 ${changes.length} 个文件变更`);

        // 生成评审提示词
        const prompt = generateReviewPrompt(projectConfig, changes, {
          author_name: commit.author_name,
          created_at: commit.created_at,
          message: commit.message,
          ref_name: process.env.CI_COMMIT_BRANCH
        });

        // 获取 AI 评审结果
        const review = await getAIReview(prompt, projectConfig);

        // 添加评审评论到 commit
        await addReviewComment(projectId, sourceType, commit.id, review);

        console.log(`提交 ${commit.id} 评审完成`);
      }
    } else if (sourceType === 'merge_request') {
      const changes = await getChanges(projectId, sourceType, sourceId);
      if (changes.length === 0) {
        console.log('No changes to review');
        return;
      }

      // 获取合并请求信息
      const mrInfo = await api.MergeRequests.show(projectId, sourceId);

      const prompt = generateReviewPrompt(projectConfig, changes, {
        author_name: mrInfo.author.name,
        created_at: mrInfo.created_at,
        message: mrInfo.description,
        ref_name: mrInfo.source_branch
      });

      const review = await getAIReview(prompt, projectConfig);

      await addReviewComment(projectId, sourceType, sourceId, review);
    }

    console.log('Review completed successfully');
  } catch (error) {
    console.error('Error processing review:', error);
    if (error.cause?.description?.includes('401 Unauthorized')) {
      console.error('GitLab API authentication failed. Please check your GITLAB_TOKEN.');
    }
    process.exit(1);
  }
}

// 导出需要测试的函数
module.exports = {
  loadProjectConfig,
  generateReviewPrompt,
  getAIReview,
  getChanges,
  addReviewComment,
  processReview
};

// 只在直接运行 index.js 时执行
if (require.main === module) {
  const projectId = process.env.CI_PROJECT_ID;
  const sourceType = process.env.CI_PIPELINE_SOURCE === 'merge_request_event' ? 'merge_request' : 'push';
  const sourceId = sourceType === 'merge_request' ? process.env.CI_MERGE_REQUEST_IID : process.env.CI_COMMIT_SHA;

  if (!GITLAB_TOKEN) {
    console.error('GITLAB_TOKEN is not set');
    process.exit(1);
  }

  if (!projectId) {
    console.error('CI_PROJECT_ID is not set');
    process.exit(1);
  }

  if (!sourceId) {
    console.error('Source ID is not set');
    process.exit(1);
  }

  processReview(projectId, sourceType, sourceId);
} 