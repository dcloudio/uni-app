const { Gitlab } = require('@gitbeaker/rest');
const axios = require('axios');
const yaml = require('yaml');
const fs = require('fs');
const minimatch = require('minimatch');
const { execSync } = require('child_process');
require('dotenv').config();

// 阿里百炼 https://bailian.console.aliyun.com/
const BAILIAN_API_KEY = process.env.BAILIAN_API_KEY;
const BAILIAN_API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';

// 阿波罗AI https://api.ablai.top/personal
const ABLAI_API_KEY = process.env.ABLAI_API_KEY;
const ABLAI_API_URL = 'https://api.ablai.top/v1/chat/completions';

// Gemini CLI 配置
const CODE_ASSIST_ENDPOINT = process.env.CODE_ASSIST_ENDPOINT || 'https://ww3.html5plus.org/gemini';
const GOOGLE_CLOUD_ACCESS_TOKEN = process.env.GOOGLE_CLOUD_ACCESS_TOKEN;
const GOOGLE_GENAI_USE_GCA = process.env.GOOGLE_GENAI_USE_GCA || 'true';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-pro';

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
  },
  gemini_cli: {
    name: 'Gemini CLI',
    type: 'cli',
    accessToken: GOOGLE_CLOUD_ACCESS_TOKEN,
    endpoint: CODE_ASSIST_ENDPOINT,
    useGCA: GOOGLE_GENAI_USE_GCA,
    model: GEMINI_MODEL,
    envKey: 'GOOGLE_CLOUD_ACCESS_TOKEN'
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
      aiModel: config.project.aiModel || process.env.AI_MODEL || "gemini-2.5-pro",
      provider: config.project.provider || process.env.AI_PROVIDER || 'ablai',
      maxTokens: config.project.maxTokens || parseInt(process.env.AI_MAX_TOKENS) || 5000
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

// 添加重试函数 - 支持更多错误类型
async function retryWithDelay(fn, maxRetries = 5, delay = 3000) {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // 判断是否应该重试
      const shouldRetry = 
        // 5xx 服务器错误
        (error.response && error.response.status >= 500) ||
        // 网络错误
        error.code === 'ECONNRESET' ||
        error.code === 'ETIMEDOUT' ||
        error.code === 'ENOTFOUND' ||
        error.code === 'ECONNREFUSED' ||
        // Axios 超时
        error.code === 'ECONNABORTED' ||
        // 429 限流错误
        (error.response && error.response.status === 429);
      
      if (shouldRetry && i < maxRetries - 1) {
        const errorMsg = error.response 
          ? `状态码: ${error.response.status}` 
          : `错误: ${error.code || error.message}`;
        console.warn(`AI API 请求失败 (${errorMsg})，正在进行第 ${i + 1}/${maxRetries} 次重试...`);
        
        // 如果是 429 限流,等待更长时间
        const retryDelay = error.response?.status === 429 ? delay * 2 : delay;
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        continue;
      }
      
      // 不应该重试的错误,直接抛出
      throw error;
    }
  }
  throw lastError;
}

// 使用 Gemini CLI 进行评审 - 带重试机制
async function getGeminiCLIReview(prompt, providerConfig, retryCount = 0) {
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 3000; // 3秒

  console.log('使用 Gemini CLI 调用...');

  if (!providerConfig.accessToken) {
    throw new Error(`Gemini Access Token (${providerConfig.envKey}) 未设置`);
  }

  if (!providerConfig.endpoint) {
    throw new Error('CODE_ASSIST_ENDPOINT 未设置');
  }

  // 将 prompt 写入临时文件，避免命令行参数过长
  const tempFile = `/tmp/gemini_prompt_${Date.now()}.txt`;
  fs.writeFileSync(tempFile, prompt, 'utf8');

  try {
    // 构建环境变量
    const env = {
      ...process.env,
      CODE_ASSIST_ENDPOINT: providerConfig.endpoint,
      GOOGLE_CLOUD_ACCESS_TOKEN: providerConfig.accessToken,
      GOOGLE_GENAI_USE_GCA: providerConfig.useGCA
    };

    // 使用本地 gemini CLI 执行，从文件读取 prompt
    const geminiPath = './node_modules/.bin/gemini';
    const command = `${geminiPath} -m ${providerConfig.model} < "${tempFile}"`;
    console.log(`执行命令: ${geminiPath} -m ${providerConfig.model} < [prompt file]`);

    const result = execSync(command, {
      env,
      encoding: 'utf8',
      maxBuffer: 50 * 1024 * 1024, // 50MB buffer
      timeout: 600000, // 10 分钟超时
      shell: true
    });

    // 过滤掉 Gemini CLI 的提示信息
    const cleanedResult = result
      .replace(/Data collection is disabled\./g, '')
      .trim();

    return cleanedResult;
  } catch (error) {
    // 判断是否应该重试
    const shouldRetry = 
      // 命令执行超时
      error.code === 'ETIMEDOUT' ||
      // 命令执行失败(非零退出码),可能是临时网络问题
      (error.status && error.status !== 0 && retryCount < MAX_RETRIES);
    
    if (shouldRetry) {
      console.warn(`Gemini CLI 调用失败 (${error.message})，正在进行第 ${retryCount + 1}/${MAX_RETRIES} 次重试...`);
      
      // 清理临时文件
      if (fs.existsSync(tempFile)) {
        fs.unlinkSync(tempFile);
      }
      
      // 等待后重试
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return getGeminiCLIReview(prompt, providerConfig, retryCount + 1);
    }
    
    // 不应该重试或已达到最大重试次数,抛出错误
    throw error;
  } finally {
    // 清理临时文件
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
  }
}

// 调用 AI API 进行评审
async function getAIReview(prompt, projectConfig) {
  try {
    console.log('调用 AI...');
    console.log(prompt);

    const model = projectConfig.aiModel || "gemini-3-pro-preview";
    const provider = projectConfig.provider || 'ablai';

    console.log('provider', provider);

    // 获取服务商配置
    const providerConfig = AI_PROVIDERS[provider];
    if (!providerConfig) {
      throw new Error(`不支持的服务商: ${provider}`);
    }

    // 根据服务商类型选择调用方式
    if (providerConfig.type === 'cli') {
      // 使用 Gemini CLI 调用
      return await getGeminiCLIReview(prompt, providerConfig);
    }

    // 使用 HTTP API 调用
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
    console.error('Error calling AI:', error);
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
async function addReviewComment(projectId, sourceType, sourceId, review, retryCount = 0) {
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000; // 1秒

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
    // 检查是否是连接错误(Keep-Alive 超时导致的 socket 关闭)
    const isSocketError = error.cause?.code === 'UND_ERR_SOCKET' || 
                          error.message === 'fetch failed' ||
                          error.cause?.message?.includes('other side closed');
    
    if (isSocketError && retryCount < MAX_RETRIES) {
      console.warn(`连接错误,正在进行第 ${retryCount + 1}/${MAX_RETRIES} 次重试...`);
      // 等待一段时间后重试
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return addReviewComment(projectId, sourceType, sourceId, review, retryCount + 1);
    }

    console.error('添加评审评论失败:', {
      error: error.message,
      projectId,
      sourceType,
      sourceId,
      reviewLength: review?.length,
      retryCount
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
      console.log('上一次提交的 SHA:', process.env.CI_COMMIT_BEFORE_SHA);
      console.log('当前提交的 SHA:', process.env.CI_COMMIT_SHA);
      console.log('当前分支:', process.env.CI_COMMIT_BRANCH);

      // 获取本次 push 的所有 commit
      let commits;
      // 检查 CI_COMMIT_BEFORE_SHA 是否为全 0 (新分支的首次提交)
      const isNewBranch = !process.env.CI_COMMIT_BEFORE_SHA || 
                          process.env.CI_COMMIT_BEFORE_SHA === '0000000000000000000000000000000000000000' ||
                          /^0+$/.test(process.env.CI_COMMIT_BEFORE_SHA);
      
      if (process.env.CI_COMMIT_BEFORE_SHA && process.env.CI_COMMIT_SHA && !isNewBranch) {
        // 正常的 push,比较两个 commit 之间的差异
        console.log('正常 push,比较提交差异...');
        commits = await api.Repositories.compare(projectId, process.env.CI_COMMIT_BEFORE_SHA, process.env.CI_COMMIT_SHA);
        commits = commits.commits || [];
        console.log('获取本次提交的信息：', commits);
      } else {
        // 新分支的首次提交或没有 BEFORE_SHA,只获取当前提交
        console.log('新分支首次提交或无法比较,获取当前提交...');
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
        console.log(`AI 评审结果: ${review}`);

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
    // 在测试环境中抛出错误,而不是退出进程
    if (process.env.NODE_ENV === 'test') {
      throw error;
    }
    process.exit(1);
  }
}

// 导出需要测试的函数
module.exports = {
  loadProjectConfig,
  generateReviewPrompt,
  getAIReview,
  getGeminiCLIReview,
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