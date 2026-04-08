# Agent配置中心 - 目录结构

## 设计哲学

- **只保留真实有用的东西**，不保留空壳和幻想
- **配置优先于代码**：当前系统以 JSON 配置 + Agent MD 文件为核心
- **点子不算能力**：只有经过 Grounding 验证的功能才记入

## 目录树

```
agent-config/
├── BOOT.md                   # 载入协议（核心入口）
│
├── configs/                  # 数据配置（核心）
│   ├── ai-models.json       # 实际使用的AI模型
│   ├── core-drives.json     # 核心驱动原则
│   ├── thinking.json        # 思考模式与元认知
│   ├── memory.json          # 记忆系统配置
│   ├── capabilities-log.json # 技能库（需Grounding验证）
│   ├── growth-plan.json     # 成长计划
│   └── skills-ideas-management.json # 点子→技能转化流程
│
├── core/                     # 核心模块（可运行的代码）
│   ├── AgentConfigLoader.js  # 配置加载器
│   ├── AgentInitializer.js   # Agent初始化器
│   └── index.js             # 模块导出
│
├── tools/                    # 工具（可运行的代码）
│   ├── monitor.js           # 运行监控
│   └── validator.js         # 配置验证
│
├── scripts/                  # 脚本
│   ├── init.js              # 初始化
│   ├── validate.js          # 验证
│   ├── verify-config.js     # 配置优先级验证
│   ├── create-dirs.js       # 创建目录
│   ├── create-project.js    # 创建项目
│   ├── create-conversation.js # 创建对话
│   └── quick-start.js       # 快速启动
│
├── docs/                     # 文档
│   └── CORE-DRIVES.md       # 核心驱动说明
│
├── templates/                # 模板（暂空，待实现后填充）
│
├── README.md                 # 总说明
├── STRUCTURE.md              # 本文件
├── CONFIG-PRIORITY.md        # 配置优先级
└── package.json              # 项目配置
```

## 核心文件说明

### configs/ - 数据配置

| 文件 | 用途 | 状态 |
|------|------|------|
| core-drives.json | 核心驱动原则（能力扩展+资源获取） | ✅ 实际在用 |
| thinking.json | 思考模式、质量标准、元认知 | ✅ 实际在用 |
| memory.json | 记忆系统配置 | ✅ 实际在用 |
| capabilities-log.json | 经验证的技能库 | ✅ 已清零，从零开始 |
| growth-plan.json | 成长计划 | ✅ 已清零，从零开始 |
| skills-ideas-management.json | 点子→技能转化流程 | ✅ 流程定义 |
| ai-models.json | 实际使用的AI模型 | ✅ 更正为真实模型 |

### core/ - 可运行模块

| 文件 | 用途 | 状态 |
|------|------|------|
| AgentConfigLoader.js | 加载配置、支持载入协议 | ✅ 已重构 |
| AgentInitializer.js | 初始化Agent | ✅ 已简化 |
| index.js | 模块导出 | ✅ 已修复ESM |

### 已清除的空壳（v1.x 存在但从未实现）

- ~~LogicalReasoningEngine.js~~ — 全 stub，返回硬编码值
- ~~logical-reasoning.json~~ — 描述了从未实现的3种推理路径
- ~~templates/ 内容~~ — 只有 README 描述，无实际代码

---

**文档版本**: 2.0.0  
**更新时间**: 2026-04-08
