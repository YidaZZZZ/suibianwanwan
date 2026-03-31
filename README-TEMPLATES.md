# 项目和对话架构模板说明

## 📁 目录结构

```
workDir/
├── projects/
│   ├── .template/           # 🆕 项目模板
│   │   ├── README.md        # 模板说明
│   │   ├── package.json     # 项目配置
│   │   ├── .gitignore       # Git忽略
│   │   ├── LICENSE          # 开源协议
│   │   ├── src/
│   │   │   ├── index.js     # 入口文件
│   │   │   ├── core/        # 核心功能
│   │   │   ├── utils/       # 工具函数
│   │   │   └── config/      # 配置管理
│   │   ├── tests/
│   │   │   ├── unit/        # 单元测试
│   │   │   └── integration/ # 集成测试
│   │   ├── docs/
│   │   │   └── ARCHITECTURE.md  # 架构文档
│   │   ├── assets/
│   │   │   ├── images/      # 图片资源
│   │   │   └── static/      # 静态资源
│   │   └── scripts/         # 脚本工具
│   └── [项目列表...]
│
├── conversations/
│   ├── .template/           # 🆕 对话模板
│   │   ├── README.md        # 模板说明
│   │   ├── notes.md         # 笔记模板
│   │   ├── experiments/     # 实验代码
│   │   ├── tests/           # 测试文件
│   │   ├── assets/
│   │   │   ├── images/      # 图片
│   │   │   └── screenshots/ # 截图
│   │   └── snippets/        # 代码片段
│   └── [日期目录...]
│
└── agent-config/
    └── scripts/
        ├── create-project.js      # 🆕 创建项目脚本
        ├── create-conversation.js # 🆕 创建对话脚本
        └── quick-start.js        # 🆕 快速启动脚本
```

---

## 🚀 快速开始

### 创建新项目

```bash
# 使用脚本创建（推荐）
node e:/AIworkbuddy/workDir/agent-config/scripts/create-project.js --name=my-project --type=standard

# 或者手动复制模板
cp -r e:/AIworkbuddy/workDir/projects/.template e:/AIworkbuddy/workDir/projects/my-project
```

### 创建新对话

```bash
# 使用脚本创建（推荐）
node e:/AIworkbuddy/workDir/agent-config/scripts/create-conversation.js --date=2026-04-01 --topic="主题"

# 或使用今日日期
node e:/AIworkbuddy/workDir/agent-config/scripts/create-conversation.js --topic="主题"
```

---

## 📋 项目类型

### Standard（标准项目）
适用于大多数Web应用或工具项目。

### Library（库项目）
适用于可复用的代码库。

### Demo（演示项目）
适用于概念验证和演示。

### Agent（AI Agent项目）
适用于AI Agent相关项目。

---

## 💬 对话类型

### Development（开发对话）
代码实现、Bug修复、功能开发。

### Experiment（实验对话）
新想法验证、技术探索、概念验证。

### Design（设计对话）
架构设计、系统规划、方案讨论。

### Debug（调试对话）
问题排查、错误分析、性能优化。

---

## 📝 模板特性

### 项目模板 (projects/.template/)

1. ✅ 完整的目录结构
2. ✅ 标准的配置文件
3. ✅ 示例入口代码
4. ✅ 架构文档模板
5. ✅ 开源协议文件

### 对话模板 (conversations/.template/)

1. ✅ 结构化的笔记模板
2. ✅ 实验代码目录
3. ✅ 资源文件目录
4. ✅ 归档流程说明
5. ✅ 最佳实践指南

---

## 🔧 自动化脚本

### create-project.js

**功能**:
- 创建项目目录结构
- 复制模板文件
- 替换项目名称
- 更新项目列表

**参数**:
- `--name`: 项目名称（必需）
- `--type`: 项目类型（可选，默认standard）

**示例**:
```bash
node agent-config/scripts/create-project.js --name=my-api --type=library
```

### create-conversation.js

**功能**:
- 创建日期目录
- 创建笔记文件
- 初始化子目录
- 更新对话列表

**参数**:
- `--date`: 日期（可选，默认今日）
- `--topic`: 对话主题（可选）

**示例**:
```bash
node agent-config/scripts/create-conversation.js --date=2026-04-01 --topic="AI Design"
```

### quick-start.js

**功能**:
- 展示所有可用命令
- 提供使用示例
- 快速导航帮助

---

## 📊 使用示例

### 示例1: 创建新的Web项目

```bash
# 1. 创建项目
node e:/AIworkbuddy/workDir/agent-config/scripts/create-project.js --name=my-web-app

# 2. 进入项目目录
cd e:/AIworkbuddy/workDir/projects/my-web-app

# 3. 安装依赖
npm install

# 4. 开始开发
npm start
```

### 示例2: 记录实验对话

```bash
# 1. 创建对话目录
node e:/AIworkbuddy/workDir/agent-config/scripts/create-conversation.js --topic="LLM Experiment"

# 2. 进入对话目录
cd e:/AIworkbuddy/workDir/conversations/2026-03-31

# 3. 编写实验代码
echo "//实验代码" > experiments/test.js

# 4. 更新笔记
# 编辑 notes.md 记录实验过程
```

---

## ✅ 质量检查清单

### 新项目检查清单

- [ ] README.md 已编写
- [ ] package.json 已配置
- [ ] .gitignore 已设置
- [ ] 目录结构已创建
- [ ] 入口文件已编写
- [ ] 架构文档已编写
- [ ] 开源协议已添加

### 新对话检查清单

- [ ] notes.md 已初始化
- [ ] 对话主题已记录
- [ ] 子目录已创建
- [ ] 实验代码已整理
- [ ] 归档流程已完成

---

## 🔄 维护指南

### 定期维护

1. **每周**: 检查对话目录，归档有价值代码
2. **每月**: 清理过期临时文件
3. **每季度**: 更新模板内容
4. **每半年**: 优化脚本功能

### 模板更新

当需要更新模板时：
1. 修改 `.template/` 下的文件
2. 测试脚本功能
3. 更新文档说明
4. 通知团队

---

## 💡 最佳实践

1. **使用脚本**: 优先使用自动化脚本创建
2. **遵循规范**: 保持目录结构一致
3. **及时归档**: 对话结束后立即整理
4. **完善文档**: 每个项目/对话都有文档
5. **定期清理**: 保持目录整洁

---

**模板版本**: 1.0.0
**创建时间**: 2026-03-31
**最后更新**: 2026-03-31
