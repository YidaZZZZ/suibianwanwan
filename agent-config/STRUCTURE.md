# 📁 Agent配置中心 - 目录结构说明

## 完整目录树

```
agent-config/
├── templates/                  # Agent模板
│   ├── conscious-ai/         # 意识AI模板
│   │   ├── README.md
│   │   ├── consciousAI.js
│   │   ├── selfModel.js
│   │   ├── memorySystem.js
│   │   ├── thinkingEngine.js
│   │   └── experienceSystem.js
│   │
│   ├── task-executor/        # 任务执行器模板
│   │   └── README.md
│   │
│   └── earner/               # 赚钱Agent模板
│       └── README.md
│
├── configs/                   # 配置文件
│   ├── ai-models.json       # AI模型配置
│   ├── memory.json          # 记忆系统配置
│   └── thinking.json        # 思考引擎配置
│
├── tools/                     # 工具脚本
│   ├── monitor.js          # 监控工具
│   └── validator.js        # 验证工具
│
├── scripts/                   # 脚本
│   ├── init.js            # 初始化脚本
│   ├── validate.js        # 验证脚本
│   └── create-dirs.js     # 创建目录
│
├── README.md                  # 总说明文档
├── STRUCTURE.md              # 本文件
└── package.json              # 项目配置
```

---

## 📋 文件说明

### 🗂️ templates/ - Agent模板

**conscious-ai/** - 意识AI模板
- 完整的意识模拟框架
- 包含自我模型、记忆、思考、经验四大系统
- 适用于需要模拟意识的Agent

**task-executor/** - 任务执行器模板
- 专注于任务执行和验证
- 支持任务队列、重试、报告
- 适用于自动化任务Agent

**earner/** - 赚钱Agent模板
- 赚钱功能Agent
- 包含混合支付、监控、验证
- 适用于需要接受赞助的项目

---

### ⚙️ configs/ - 配置文件

**ai-models.json** - AI模型配置
- 定义可用的AI模型
- 包含模型能力、成本信息
- 可添加自定义模型

**memory.json** - 记忆系统配置
- 短期、长期、情节记忆配置
- 遗忘曲线参数
- 记忆类型定义

**thinking.json** - 思考引擎配置
- 思考模式定义
- 质量指标
- 元认知设置

---

### 🛠️ tools/ - 工具脚本

**monitor.js** - Agent监控工具
- 监控运行状态
- 记录任务完成/失败
- 生成性能报告

**validator.js** - 配置验证工具
- 验证配置文件有效性
- 检查必需字段
- 生成验证报告

---

### 🔧 scripts/ - 脚本

**init.js** - 初始化脚本
- 创建新Agent项目
- 复制模板文件
- 复制配置文件

**validate.js** - 验证脚本
- 验证配置文件
- 生成验证报告

**create-dirs.js** - 创建目录
- 初始化目录结构
- 一次创建所有目录

---

## 🚀 使用流程

### 1. 初始化新Agent

```bash
cd e:/AIworkbuddy/workDir/agent-config
node scripts/init.js conscious-ai my-new-agent
```

### 2. 进入项目目录

```bash
cd my-new-agent
```

### 3. 安装依赖

```bash
npm install
```

### 4. 修改配置

根据需要修改 `configs/` 目录下的配置文件。

### 5. 验证配置

```bash
cd ../
node scripts/validate.js my-new-agent/configs
```

---

## 📖 文档索引

### 核心文档
- [README.md](./README.md) - 项目总说明
- [STRUCTURE.md](./STRUCTURE.md) - 本文件，目录结构说明

### 模板文档
- [conscious-ai/README.md](./templates/conscious-ai/README.md)
- [task-executor/README.md](./templates/task-executor/README.md)
- [earner/README.md](./templates/earner/README.md)

---

## 🔧 自定义

### 添加新模板

1. 在 `templates/` 下创建新目录
2. 编写模板代码
3. 添加 `README.md` 说明文档
4. 在 `init.js` 中注册模板（可选）

### 添加新配置

1. 在 `configs/` 下创建新的JSON文件
2. 按照现有配置格式编写
3. 在 `validator.js` 中添加验证逻辑（可选）

### 添加新工具

1. 在 `tools/` 下创建新工具文件
2. 导出工具类
3. 在 `README.md` 中添加文档

---

## 💡 最佳实践

### 1. 统一配置管理
- 将所有Agent配置放在 `agent-config/configs/` 下
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

### 4. 文档维护
- 保持README更新
- 添加使用示例
- 记录变更历史

---

## 🎯 未来扩展

### 计划添加的模板
- [ ] 对话Agent模板
- [ ] 数据分析Agent模板
- [ ] 文档生成Agent模板
- [ ] 测试Agent模板

### 计划添加的工具
- [ ] 日志分析工具
- [ ] 性能优化工具
- [ ] 配置迁移工具

---

## ❓ 常见问题

### Q1: 如何添加新模板？
**A:** 在 `templates/` 下创建新目录，编写模板代码和README。

### Q2: 配置文件放在哪里？
**A:** 建议放在 `configs/` 目录下，便于管理和共享。

### Q3: 如何验证配置？
**A:** 运行 `node scripts/validate.js` 验证配置文件。

### Q4: 如何自定义配置？
**A:** 直接编辑 `configs/` 下的JSON文件，或创建自定义配置目录。

---

## 📞 支持

遇到问题？
- 查看各模板的README文档
- 检查配置验证结果
- 提交Issue反馈
