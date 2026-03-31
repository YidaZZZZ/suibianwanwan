# 项目模板 - 新项目快速启动

## 🚀 快速创建新项目

### 方法1: 使用脚本创建（推荐）

```bash
node e:/AIworkbuddy/workDir/agent-config/scripts/create-project.js --name your-project --type standard
```

### 方法2: 手动创建

1. 复制此模板到新项目目录
2. 更新项目配置
3. 开始开发

---

## 📁 项目标准结构

```
your-project/
├── src/                    # 源代码目录
│   ├── index.js           # 入口文件
│   ├── core/              # 核心功能
│   ├── utils/             # 工具函数
│   └── config/            # 配置文件
│
├── tests/                  # 测试目录
│   ├── unit/              # 单元测试
│   └── integration/       # 集成测试
│
├── docs/                   # 文档目录
│   ├── README.md          # 项目说明
│   ├── API.md             # API文档
│   ├── ARCHITECTURE.md    # 架构设计
│   └── CHANGELOG.md       # 变更日志
│
├── assets/                 # 资源文件
│   ├── images/            # 图片
│   └── static/            # 静态资源
│
├── scripts/                # 脚本工具
│   ├── build.js           # 构建脚本
│   ├── deploy.js          # 部署脚本
│   └── dev.js             # 开发脚本
│
├── .gitignore             # Git忽略配置
├── package.json           # 项目配置
├── README.md              # 项目说明（必需）
├── LICENSE                # 开源协议
└── CONTRIBUTING.md        # 贡献指南
```

---

## 📝 README.md 模板

```markdown
# 项目名称

## 📖 简介

简要描述项目的作用和价值。

## ✨ 特性

- 特性1
- 特性2
- 特性3

## 🚀 快速开始

### 安装

\`\`\`bash
npm install
\`\`\`

### 运行

\`\`\`bash
npm start
\`\`\`

### 开发

\`\`\`bash
npm run dev
\`\`\`

## 📦 项目结构

\`\`\`
src/          # 源代码
tests/        # 测试
docs/         # 文档
\`\`\`

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT
```

---

## 🎯 项目类型

### 1. Standard（标准项目）

适用于大多数Web应用或工具项目。

```
standard-project/
├── src/
├── tests/
├── docs/
├── package.json
└── README.md
```

### 2. Library（库项目）

适用于可复用的代码库。

```
library-project/
├── src/
├── tests/
├── examples/
├── docs/
├── package.json
└── README.md
```

### 3. Demo（演示项目）

适用于概念验证和演示。

```
demo-project/
├── src/
├── docs/
└── README.md
```

### 4. Agent（AI Agent项目）

适用于AI Agent相关项目。

```
agent-project/
├── src/
│   ├── agent/
│   ├── tools/
│   └── memory/
├── prompts/
├── tests/
└── README.md
```

---

## 📋 项目检查清单

### 新项目必备

- [ ] README.md（项目说明）
- [ ] package.json（依赖配置）
- [ ] .gitignore（Git忽略）
- [ ] LICENSE（开源协议）

### 可选文件

- [ ] ARCHITECTURE.md（架构设计）
- [ ] API.md（API文档）
- [ ] CONTRIBUTING.md（贡献指南）
- [ ] CHANGELOG.md（变更日志）

---

## 🔧 开发工具配置

### ESLint（代码规范）
```bash
npm install --save-dev eslint
npx eslint --init
```

### Prettier（代码格式化）
```bash
npm install --save-dev prettier
```

### TypeScript（类型检查）
```bash
npm install --save-dev typescript
npx tsc --init
```

---

## 📊 项目健康度

### 优秀项目的特征

1. ✅ 清晰的文档（README + API + 架构）
2. ✅ 完整的测试覆盖
3. ✅ 规范的代码风格
4. ✅ 持续集成配置
5. ✅ 详细的变更日志
6. ✅ 明确的贡献指南

---

**模板版本**: 1.0.0
**创建时间**: 2026-03-31
