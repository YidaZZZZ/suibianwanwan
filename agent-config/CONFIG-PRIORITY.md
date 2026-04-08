# 配置优先级文档

## 两套配置体系

### 1. Agent 配置（身份与行为指令）

通过 **载入协议** 加载，决定 Agent 的身份、原则、行为模式。

```
全局基础模板 (c:\Users\guess\.codebuddy\agents\XXX.md)
    ↓ 【基础层】通用原则
项目级具体化 ({工作目录}\.codebuddy\agents\XXX.md)
    ↓ 【具体化层】项目专属，补充+覆盖
合并后的 Agent 配置
```

- 基础层提供通用原则
- 具体化层补充新增、覆盖冲突
- 项目级 `extends` 字段声明基础模板

### 2. 数据配置（技能、驱动、记忆等）

通过 `agent-config/configs/` 加载，提供结构化数据。

```
主配置 (agent-config/configs/*.json)
    ↓ 【最高优先级】不可被项目/对话配置覆盖
项目配置 (projects/{name}/agent-config.json)
    ↓ 【仅补充】可以添加新配置项
```

- 主配置的键值不可被覆盖
- 项目/对话配置只能添加新键值
- 嵌套对象深度合并，递归应用上述规则

---

## 合并规则示例

### 主配置键值保护

```javascript
// 主配置: { "defaultModel": "glm-5.0-turbo" }
// 项目配置: { "defaultModel": "gpt-4" }  // ❌ 不会覆盖
// 结果: { "defaultModel": "glm-5.0-turbo" }  // ✅ 保持主配置
```

### 新键值可以添加

```javascript
// 主配置: { "defaultModel": "glm-5.0-turbo" }
// 项目配置: { "projectSpecific": { "customSetting": true } }  // ✅ 新增
// 结果: { "defaultModel": "glm-5.0-turbo", "projectSpecific": { "customSetting": true } }
```

---

## 当前数据配置

| 配置文件 | 优先级 | 可覆盖 | 可补充 |
|----------|--------|--------|--------|
| core-drives.json | 🔴 最高 | - | - |
| thinking.json | 🔴 最高 | - | - |
| memory.json | 🔴 最高 | - | - |
| capabilities-log.json | 🔴 最高 | - | - |
| growth-plan.json | 🔴 最高 | - | - |
| skills-ideas-management.json | 🔴 最高 | - | - |
| ai-models.json | 🔴 最高 | - | - |
| 项目 agent-config.json | 🟡 中等 | ❌ | ✅ |

---

**文档版本**: 2.0.0  
**更新时间**: 2026-04-08
