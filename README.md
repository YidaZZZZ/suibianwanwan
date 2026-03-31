# WorkDir - 工作目录总览

## 📁 目录结构

```
workDir/
├── projects/           # 📦 项目目录
│   ├── conscious-ai-demo/  # 意识AI演示项目
│   └── README.md
│
├── conversations/       # 💬 临时对话目录
│   ├── 2026-03-31/      # 按日期归档
│   └── README.md
│
├── agent-config/        # 🔧 Agent配置中心
│   ├── templates/       # Agent模板
│   ├── configs/        # 通用配置
│   ├── core/           # 核心模块
│   ├── tools/          # 工具脚本
│   └── scripts/        # 初始化脚本
│
├── logs/               # 📊 日志目录（勿主动操作）
│   ├── system/         # 系统日志
│   ├── errors/         # 错误日志
│   ├── performance/    # 性能监控
│   ├── agents/         # Agent日志
│   ├── chats/          # 💬 重要聊天记录（Agent不可操作）
│   │   ├── important/  # 特别重要的对话
│   │   └── summaries/   # 对话摘要
│   ├── archive/        # 归档日志
│   └── README.md
│
├── README.md           # 📖 总览文档
├── README-TEMPLATES.md # 📋 模板详细说明
└── TEMPLATES-QUICK-START.md # 🚀 快速启动指南
```

---

## 📦 Projects（项目目录）

用于存放长期维护的完整项目。

### 当前项目

| 项目 | 路径 | 状态 | 描述 |
|------|------|------|------|
| conscious-ai-demo | `projects/conscious-ai-demo/` | ✅ 活跃 | 意识AI模拟框架 |
| config-generator | `projects/conscious-ai-demo/config-generator/` | ✅ 就绪 | 智能配置生成器 |

详见: [projects/README.md](projects/README.md)

---

## 💬 Conversations（临时对话目录）

用于存放临时对话产生的文件和实验性内容。

- 按日期归档
- 代码实验
- 测试文件
- 对话笔记

详见: [conversations/README.md](conversations/README.md)

---

## 🔧 Agent-Config（配置中心）

用于存放通用Agent配置和模板。

- Agent模板
- 配置文件
- 工具脚本
- 初始化脚本

---

## 🚀 快速导航

### 运行项目
```bash
# ConsciousAI 演示
node e:/AIworkbuddy/workDir/projects/conscious-ai-demo/index.js

# 配置生成器
cd e:/AIworkbuddy/workDir/projects/conscious-ai-demo/config-generator
smart-config generate
```

### 初始化Agent
```bash
# 创建新Agent
node e:/AIworkbuddy/workDir/agent-config/scripts/init.js conscious-ai my-agent
```

---

## 📝 维护规范

### 文件组织原则

1. **项目代码** → `projects/`
2. **临时实验** → `conversations/{date}/`
3. **通用配置** → `agent-config/`

### 快速启动

```bash
# 创建新项目
node agent-config/scripts/create-project.js --name=my-project

# 创建新对话
node agent-config/scripts/create-conversation.js --topic="主题"
```

详见: [TEMPLATES-QUICK-START.md](TEMPLATES-QUICK-START.md)

### 清理周期

- **每日**: 归档对话文件
- **每周**: 整理实验代码
- **每月**: 清理过期内容

---

**目录整理完成时间**: 2026-03-31
**总目录数**: 3 个（projects, conversations, agent-config）
**模板版本**: 1.0.0
