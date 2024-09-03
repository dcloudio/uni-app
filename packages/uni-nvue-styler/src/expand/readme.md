# 同步 vuejs-core 脚本

- 读取 expand 所有 ts 文件
- 排除 index.ts
- 每个文件顶部写入 `const __NODE_JS__ = false`
