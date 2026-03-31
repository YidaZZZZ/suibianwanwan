# Agent配置优先级文档

## 📋 配置优先级规则

```
主目录配置 (agent-config/configs/)
    ↓
    【最高优先级】不可被覆盖
    ↓
项目/对话配置 (agent-config.json)
    ↓
    【仅补充】可以添加新配置项
```

---

## 🎯 核心原则

### 1. 主配置优先
- 位置: `agent-config/configs/`
- 优先级: **最高**
- 特性: **不可被覆盖**

### 2. 项目配置补充
- 位置: `projects/{name}/agent-config.json`
- 优先级: **次之**
- 特性: **仅添加新配置项**

### 3. 对话配置补充
- 位置: `conversations/{date}/agent-config.json`
- 优先级: **次之**
- 特性: **仅添加新配置项**

---

## 🔍 配置合并规则

### 规则1: 主配置键值保护
如果主配置中已存在某个键，项目/对话配置中的同名键**不会**覆盖主配置的值。

```javascript
// 主配置
{
  "aiModels": {
    "defaultModel": "gpt-4"
  }
}

// 项目配置
{
  "aiModels": {
    "defaultModel": "gpt-3.5-turbo"  // ❌ 不会覆盖
  }
}

// 结果
{
  "aiModels": {
    "defaultModel": "gpt-4"  // ✅ 保持主配置值
  }
}
```

### 规则2: 新键值可以添加
如果主配置中不存在某个键，项目/对话配置中的新键值会被添加。

```javascript
// 主配置
{
  "aiModels": {
    "defaultModel": "gpt-4"
  }
}

// 项目配置
{
  "aiModels": {
    "projectSpecific": {  // ✅ 新键值，可以添加
      "customModel": "custom"
    }
  }
}

// 结果
{
  "aiModels": {
    "defaultModel": "gpt-4",
    "projectSpecific": {
      "customModel": "custom"
    }
  }
}
```

### 规则3: 嵌套对象深度合并
对于嵌套对象，递归应用规则1和规则2。

```javascript
// 主配置
{
  "memory": {
    "system": {
      "shortTerm": {
        "capacity": 7
      }
    }
  }
}

// 项目配置
{
  "memory": {
    "system": {
      "shortTerm": {
        "capacity": 5      // ❌ 不会覆盖
      },
      "longTerm": {        // ✅ 新增
        "custom": true
      }
    }
  }
}

// 结果
{
  "memory": {
    "system": {
      "shortTerm": {
        "capacity": 7     // ✅ 保持主配置值
      },
      "longTerm": {
        "custom": true     // ✅ 新增
      }
    }
  }
}
```

---

## 📁 配置文件结构

### 主配置目录
```
agent-config/configs/
├── ai-models.json      # AI模型配置（不可覆盖）
├── memory.json         # 记忆系统配置（不可覆盖）
└── thinking.json       # 思考引擎配置（不可覆盖）
```

### 项目配置文件
```
projects/my-project/agent-config.json
{
  "_comment": "项目级配置，主配置不会被覆盖",
  "aiModels": {
    "_comment": "只能添加新配置项，不能覆盖主配置"
  },
  "memory": {
    "_comment": "只能添加新配置项，不能覆盖主配置"
  },
  "thinking": {
    "_comment": "只能添加新配置项，不能覆盖主配置"
  }
}
```

### 对话配置文件
```
conversations/2026-03-31/agent-config.json
{
  "_comment": "对话级配置，主配置不会被覆盖",
  "aiModels": {
    "_comment": "只能添加新配置项，不能覆盖主配置"
  },
  "memory": {
    "_comment": "只能添加新配置项，不能覆盖主配置"
  },
  "thinking": {
    "_comment": "只能添加新配置项，不能覆盖主配置"
  }
}
```

---

## 🔧 使用API

### 1. 获取配置（自动合并）

```javascript
import { configLoader } from 'agent-config/core/AgentConfigLoader.js';

// 获取项目配置（主配置优先）
const config = configLoader.getAllConfigs('projects/my-project');

// 获取对话配置（主配置优先）
const config = configLoader.getAllConfigs('conversations/2026-03-31');

// 仅获取主配置
const config = configLoader.getAllConfigs();
```

### 2. 获取特定配置

```javascript
// 获取AI模型配置
const aiModels = configLoader.getAIModelConfig('projects/my-project');

// 获取记忆配置
const memory = configLoader.getMemoryConfig('projects/my-project');

// 获取思考配置
const thinking = configLoader.getThinkingConfig('projects/my-project');
```

### 3. 验证配置

```javascript
const validation = configLoader.validateConfig(config);
if (!validation.valid) {
  console.error('配置错误:', validation.errors);
}
```

### 4. 创建配置模板

```javascript
configLoader.createProjectConfigTemplate('projects/my-project');
```

---

## 🧪 验证配置优先级

运行验证脚本：

```bash
node e:/AIworkbuddy/workDir/agent-config/scripts/verify-config.js
```

验证内容包括：
1. 主配置加载
2. 配置获取
3. 配置合并逻辑
4. 配置验证
5. 项目配置加载

---

## ✅ 最佳实践

### 1. 主配置管理
- ✅ 所有基础配置放在 `agent-config/configs/`
- ✅ 保持配置的完整性和稳定性
- ✅ 定期审查和更新主配置

### 2. 项目配置管理
- ✅ 仅添加项目特定的配置项
- ❌ 不要试图覆盖主配置的值
- ✅ 使用 `_comment` 字段说明用途

### 3. 对话配置管理
- ✅ 仅添加对话特定的配置项
- ❌ 不要试图覆盖主配置的值
- ✅ 保持配置简洁

### 4. 配置测试
- ✅ 使用 `verify-config.js` 验证配置
- ✅ 检查配置合并结果
- ✅ 确保主配置未被覆盖

---

## 📊 配置优先级对比

| 配置源 | 优先级 | 可覆盖主配置 | 可添加新配置 |
|--------|--------|-------------|-------------|
| 主配置 | 🔴 最高 | - | - |
| 项目配置 | 🟡 中等 | ❌ 否 | ✅ 是 |
| 对话配置 | 🟡 中等 | ❌ 否 | ✅ 是 |

---

**文档版本**: 1.0.0
**创建时间**: 2026-03-31
