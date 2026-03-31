# 🤖 AI Agent 配置中心

统一的Agent配置管理中心，用于管理和复用通用配置、模板和工具。

## 📁 目录结构

```
agent-config/
├── templates/              # Agent模板
│   ├── conscious-ai/       # 意识AI模板
│   ├── task-executor/      # 任务执行器模板
│   └── earner/           # 赚钱Agent模板
├── configs/               # 主配置（不可覆盖）
│   ├── ai-models.json     # AI模型配置
│   ├── memory.json        # 记忆系统配置
│   ├── thinking.json      # 思考引擎配置
│   └── logical-reasoning.json # 逻辑推理配置
├── core/                  # 核心模块
│   ├── AgentConfigLoader.js   # 配置加载器
│   ├── AgentInitializer.js    # Agent初始化器
│   ├── LogicalReasoningEngine.js # 逻辑推理引擎
│   └── index.js              # 模块导出
├── tools/                # 工具脚本
│   ├── monitor.js        # 监控工具
│   └── validator.js      # 验证工具
├── scripts/              # 脚本
│   ├── init.js          # 初始化脚本
│   ├── validate.js      # 验证脚本
│   ├── verify-config.js # 配置验证脚本
│   ├── create-project.js    # 创建项目脚本
│   ├── create-conversation.js # 创建对话脚本
│   └── create-dirs.js   # 创建目录
├── .template/           # 项目/对话模板
│   └── agent-config.json # 配置文件模板
├── README.md            # 说明文档
├── STRUCTURE.md         # 目录结构说明
├── CONFIG-PRIORITY.md   # 配置优先级说明
└── package.json         # 项目配置
```

## 🚀 快速开始

### 1. 使用模板创建Agent

```bash
cd e:/AIworkbuddy/workDir/agent-config
node scripts/init.js conscious-ai my-agent
```

### 2. 进入项目

```bash
cd my-agent
npm install
```

### 3. 验证配置

```bash
cd ../agent-config
node scripts/validate.js
```

## 📋 可用模板

### 1. Conscious AI Template
完整的意识模拟框架，包含：
- ✅ 自我模型（身份、驱动力、价值观）
- ✅ 记忆系统（短期、长期、情节记忆）
- ✅ 思考引擎（主动思考、元认知）
- ✅ 逻辑推理引擎（符号/神经符号/依赖类型）
- ✅ 经验系统（技能树、学习成长）

**适用场景：** 需要模拟意识的Agent

### 2. Task Executor Template
专注于任务执行的Agent，包含：
- ✅ 任务队列管理
- ✅ 自动重试机制
- ✅ 结果验证
- ✅ 执行报告

**适用场景：** 自动化任务Agent

### 3. Earner Agent Template
赚钱功能Agent，包含：
- ✅ 混合支付系统（加密货币+移动支付）
- ✅ 自动监控和验证
- ✅ 收益统计和报告
- ✅ 独立Grounding机制

**适用场景：** 需要接受赞助/付费的项目

## 🔧 配置说明

### AI模型配置 (`configs/ai-models.json`)
定义可用的AI模型及其能力、成本信息。

### 记忆系统配置 (`configs/memory.json`)
配置记忆系统的短期、长期、情节记忆参数。

### 思考引擎配置 (`configs/thinking.json`)
定义思考模式、质量指标、元认知设置。

### 逻辑推理配置 (`configs/logical-reasoning.json`)
定义三种逻辑推理路径：符号层面、神经符号融合、学习型依赖类型系统。

## 🛠️ 工具

### 监控工具 (`tools/monitor.js`)
监控Agent运行状态和性能：
- 任务完成/失败统计
- 内存使用监控
- 性能报告生成

### 验证工具 (`tools/validator.js`)
验证配置文件的有效性：
- 检查必需字段
- 生成验证报告
- 识别配置错误

## 📖 文档

- [README.md](./README.md) - 本文件，总说明
- [STRUCTURE.md](./STRUCTURE.md) - 详细目录结构说明
- [CONFIG-PRIORITY.md](./CONFIG-PRIORITY.md) - 配置优先级详细说明
- [templates/conscious-ai/README.md](./templates/conscious-ai/README.md) - 意识AI模板文档
- [templates/task-executor/README.md](./templates/task-executor/README.md) - 任务执行器模板文档
- [templates/earner/README.md](./templates/earner/README.md) - 赚钱Agent模板文档

## 🎯 使用场景

### 场景1：创建意识AI
```bash
node scripts/init.js conscious-ai my-conscioius-ai
```

### 场景2：创建任务执行器
```bash
node scripts/init.js task-executor my-tasker
```

### 场景3：创建赚钱Agent
```bash
node scripts/init.js earner my-earner
```

## 💡 最佳实践

### 1. 统一配置管理
- 将所有Agent配置放在 `configs/` 下
- 不同项目共享配置文件
- 保持配置一致性

### 2. 模板复用
- 使用模板快速启动新项目
- 避免重复代码
- 统一项目结构

### 3. 配置验证
- 定期运行验证脚本
- 确保配置有效性
- 及早发现配置错误

## 🔧 自定义

### 添加新模板
1. 在 `templates/` 下创建新目录
2. 编写模板代码
3. 添加 `README.md` 说明文档
4. 在 `init.js` 中注册（可选）

### 添加新配置
1. 在 `configs/` 下创建新的JSON文件
2. 按照现有配置格式编写
3. 在 `validator.js` 中添加验证逻辑（可选）

## ❓ 常见问题

**Q: 如何创建新Agent项目？**
A: 使用 `node scripts/init.js <template> <project-name>` 命令。

**Q: 配置文件放在哪里？**
A: 建议放在 `configs/` 目录下，便于管理和共享。

**Q: 如何验证配置？**
A: 运行 `node scripts/validate.js` 验证配置文件。

**Q: 如何自定义配置？**
A: 直接编辑 `configs/` 下的JSON文件，或创建自定义配置目录。

## 🤝 贡献

欢迎提交新的模板和配置！

## 📄 许可证

MIT License
