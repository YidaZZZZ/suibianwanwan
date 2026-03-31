# Agent配置中心

## 📋 配置优先级

```
主目录配置 (configs/)
    ↓ 【最高优先级】不可被覆盖
项目/对话配置 (agent-config.json)
    ↓ 【仅补充】可以添加新配置项
```

## 📁 目录结构

```
agent-config/
├── configs/              # 主配置（不可覆盖）
│   ├── ai-models.json    # AI模型配置
│   ├── memory.json       # 记忆系统配置
│   └── thinking.json     # 思考引擎配置
│
├── core/                # 核心模块
│   ├── AgentConfigLoader.js  # 配置加载器
│   ├── AgentInitializer.js   # Agent初始化器
│   └── index.js            # 模块导出
│
├── scripts/             # 工具脚本
│   ├── init.js              # Agent初始化脚本
│   ├── validate.js          # 配置验证脚本
│   ├── verify-config.js      # 配置验证脚本
│   ├── create-project.js     # 创建项目脚本
│   └── create-conversation.js # 创建对话脚本
│
├── templates/           # Agent模板
│   ├── conscious-ai/
│   ├── task-executor/
│   └── earner/
│
├── .template/           # 项目/对话模板
│   ├── agent-config.json  # 配置文件模板
│   └── ...
│
├── CONFIG-PRIORITY.md   # 配置优先级文档
└── README.md            # 本文件
```

## 🚀 快速开始

### 使用配置加载器

```javascript
import { configLoader } from 'agent-config/core/AgentConfigLoader.js';

// 获取完整配置（主配置优先）
const config = configLoader.getAllConfigs('projects/my-project');

// 获取特定配置
const aiModels = configLoader.getAIModelConfig('projects/my-project');
const memory = configLoader.getMemoryConfig('projects/my-project');
const thinking = configLoader.getThinkingConfig('projects/my-project');

// 验证配置
const validation = configLoader.validateConfig(config);
```

### 初始化Agent

```javascript
import { agentInitializer } from 'agent-config/core/AgentInitializer.js';

// 初始化项目Agent
const agentData = agentInitializer.initializeProjectAgent('projects/my-project');

// 初始化对话Agent
const agentData = agentInitializer.initializeConversationAgent('conversations/2026-03-31');

// 创建Agent实例
const agent = agentInitializer.createAgentInstance(agentData);
```

## 🔍 验证配置

运行验证脚本：

```bash
node agent-config/scripts/verify-config.js
```

## 📖 详细文档

- [CONFIG-PRIORITY.md](CONFIG-PRIORITY.md) - 配置优先级详细说明

## ✅ 核心原则

1. **主配置优先**: `configs/` 中的配置具有最高优先级
2. **不可覆盖**: 主配置的值不会被项目/对话配置覆盖
3. **仅补充**: 项目/对话配置只能添加新配置项
4. **自动合并**: 配置自动按优先级合并

---

**版本**: 1.0.0
**更新**: 2026-03-31
