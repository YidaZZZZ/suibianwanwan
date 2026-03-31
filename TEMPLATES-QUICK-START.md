# 模板快速启动指南

## 🚀 一分钟快速开始

### 创建新项目

```bash
node e:/AIworkbuddy/workDir/agent-config/scripts/create-project.js --name=my-project
```

### 创建新对话

```bash
node e:/AIworkbuddy/workDir/agent-config/scripts/create-conversation.js --topic="今日主题"
```

---

## 📖 详细文档

完整的模板说明请查看: [README-TEMPLATES.md](README-TEMPLATES.md)

---

## 🎯 项目模板结构

```
projects/.template/
├── README.md           # 模板说明
├── package.json        # 项目配置
├── .gitignore          # Git忽略
├── LICENSE             # 开源协议
├── README-TEMPLATE.md  # README模板
├── src/
│   ├── index.js        # 入口文件
│   ├── core/           # 核心功能
│   ├── utils/          # 工具函数
│   └── config/         # 配置管理
├── tests/
│   ├── unit/           # 单元测试
│   └── integration/    # 集成测试
├── docs/
│   └── ARCHITECTURE.md # 架构文档
├── assets/
│   ├── images/         # 图片资源
│   └── static/         # 静态资源
└── scripts/            # 脚本工具
```

---

## 💬 对话模板结构

```
conversations/.template/
├── README.md           # 模板说明
├── notes.md            # 笔记模板
├── experiments/        # 实验代码
├── tests/              # 测试文件
├── assets/
│   ├── images/         # 图片
│   └── screenshots/    # 截图
└── snippets/           # 代码片段
```

---

## 🔧 可用脚本

| 脚本 | 功能 | 使用方法 |
|------|------|---------|
| `create-project.js` | 创建新项目 | `--name=<name> --type=<type>` |
| `create-conversation.js` | 创建新对话 | `--date=<date> --topic=<topic>` |
| `quick-start.js` | 快速启动帮助 | 直接运行 |

---

## 💡 使用示例

### 创建标准项目

```bash
node agent-config/scripts/create-project.js --name=my-web-app --type=standard
```

### 创建库项目

```bash
node agent-config/scripts/create-project.js --name=my-library --type=library
```

### 创建今日对话

```bash
node agent-config/scripts/create-conversation.js --topic="AI实验"
```

### 创建指定日期对话

```bash
node agent-config/scripts/create-conversation.js --date=2026-04-01 --topic="主题"
```

---

**快速启动** | **详细文档**: [README-TEMPLATES.md](README-TEMPLATES.md)
