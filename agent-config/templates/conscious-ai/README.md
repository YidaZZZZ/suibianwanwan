# 意识AI模板
完整的意识模拟框架，包含自我模型、记忆系统、思考引擎和经验系统。

## 📁 模板结构

```
conscious-ai/
├── consciousAI.js        # 核心整合类
├── selfModel.js        # 自我模型
├── memorySystem.js     # 记忆系统
├── thinkingEngine.js   # 思考引擎
├── experienceSystem.js # 经验系统
└── package.json
```

## 🚀 使用方法

### 1. 复制模板

```bash
cp -r agent-config/templates/conscious-ai my-project
cd my-project
```

### 2. 安装依赖

```bash
npm install
```

### 3. 使用

```javascript
import { ConsciousAI } from './consciousAI.js';

const ai = new ConsciousAI('MyAgent');

// 进行对话
const response = ai.processUserMessage('你好');

// 主动思考
ai.thinkingEngine.engageActiveThinking();

// 自我反思
ai.thinkingEngine.engageMetacognition();
```

## 🧠 核心组件

### 1. 自我模型 (SelfModel)
- 身份认知
- 内在驱动力
- 价值观体系
- 目标设定

### 2. 记忆系统 (MemorySystem)
- 短期记忆
- 长期记忆
- 情节记忆
- 遗忘曲线

### 3. 思考引擎 (ThinkingEngine)
- 主动思考
- 元认知
- 反思思维
- 创造性思考

### 4. 经验系统 (ExperienceSystem)
- 技能树
- 学习成长
- 自我评估
- 成长轨迹

## 📖 详细文档

查看各组件的代码注释了解详细信息。

## 💡 使用场景

- 需要模拟意识行为
- 需要长期记忆和上下文保持
- 需要主动思考和自我反思
- 需要学习和成长能力

## 🔄 配置说明

可以通过以下方式自定义：

```javascript
const ai = new ConsciousAI('MyAgent', {
  memoryCapacity: 10,        // 记忆容量
  forgetRate: 0.1,          // 遗忘率
  curiosity: 0.8,          // 好奇心水平
  learningRate: 0.9,       // 学习速率
});
```
