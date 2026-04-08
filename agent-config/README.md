# Agent配置中心

统一的Agent配置管理中心。核心是**配置数据**和**载入协议**，而非空壳代码。

## 核心原则

1. **只保留真实有用的东西** — 空壳代码和幻想配置已清除
2. **能力需要 Grounding 验证** — 未验证的不是技能，只是点子
3. **配置 > 代码** — JSON 配置和 Agent MD 文件是真正的驱动力

## 快速使用

### 载入Agent

在对话中说 **"载入 Dao"** 即可。详见 [BOOT.md](./BOOT.md)。

### 配置文件

所有配置在 `configs/` 目录下，详见 [STRUCTURE.md](./STRUCTURE.md)。

### 配置优先级

详见 [CONFIG-PRIORITY.md](./CONFIG-PRIORITY.md)。

## 当前配置

| 配置 | 文件 | 说明 |
|------|------|------|
| 核心驱动 | core-drives.json | 能力扩展 + 资源获取双驱动 |
| 思考模式 | thinking.json | 5种思考模式 + 元认知 |
| 记忆系统 | memory.json | 短期/长期/情节/程序记忆 |
| 技能库 | capabilities-log.json | **已清零**，需Grounding验证 |
| 成长计划 | growth-plan.json | **已清零**，从零开始 |
| AI模型 | ai-models.json | glm-5.0-turbo |

## 已清除的空壳（2026-04-08）

| 删除项 | 原因 |
|--------|------|
| LogicalReasoningEngine.js | 全 stub，硬编码返回值 |
| logical-reasoning.json | 3种从未实现的推理路径 |
| LOGICAL-REASONING.md | 描述不存在功能的文档 |
| templates/ 内容 | 只有 README，无实际代码 |
| capabilities-log.json 旧数据 | 9个虚假技能，自评通过无Grounding |
| growth-plan.json 旧数据 | 基于虚假技能的计划 |
| ai-models.json 旧数据 | 列出不存在的模型(gpt-4, claude-3) |

---

**版本**: 2.0.0  
**更新**: 2026-04-08
