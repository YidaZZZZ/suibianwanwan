# 🔬 逻辑推理引擎说明

## 概述

逻辑推理引擎为Agent提供形式化逻辑推理能力，基于三种不同路径实现：
1. **符号层面路径** - 将神经网络输出转换为形式化证明语言并验证
2. **神经符号融合路径** - 结合神经网络直觉和符号系统验证
3. **学习型依赖类型系统** - 基于Curry-Howard对应的自适应推理

---

## 三条路径详解

### 1. 符号层面路径

**工作流程：**
```
神经网络输出
    ↓
证明转换（翻译为Coq/Lean/Agda等）
    ↓
类型检查器验证
    ↓
真值评估
```

**特点：**
- 简单直接，易于实现
- 依赖现有证明助手
- 适合需要形式化保证的场景

**配置项：**
```json
{
  "symbolic": {
    "proofTranslator": { "supportedLanguages": ["Coq", "Lean", "Agda", "Isabelle/HOL"] },
    "typeChecker": { "strictness": "formal" },
    "truthEvaluator": { "output": "True/False/Unknown" }
  }
}
```

---

### 2. 神经符号融合路径

**架构：**
```
神经模块 ←→ 符号模块
    ↓           ↓
    元认知监控 → 反馈循环
```

**特点：**
- 结合两种系统的优势
- 神经网络提供直觉猜测
- 符号系统提供形式化验证
- 元认知模块监控和调整

**集成策略：**
- **并行**：神经和符号同时运行
- **顺序**：神经输出→符号验证
- **迭代**：多次直到收敛

**决策策略：**
```javascript
if (neuralConfidence >= 0.9 && symbolicValid) {
  trust_neural // 信任神经输出
} else if (neuralConfidence < 0.7 && symbolicComplete) {
  trust_symbolic // 信任符号证明
} else {
  request_human // 请求人工干预
}
```

---

### 3. 学习型依赖类型系统

**理论基础：**
- **Curry-Howard对应**：命题即类型，证明即程序
- **依赖类型论**：类型可以依赖值

**架构：**
```
类型学习器 → 推断依赖类型
    ↓
证明生成器 → 合成证明项
    ↓
验证内核 → 类型检查
```

**学习机制：**
1. **类型模式提取** - 从证明示例中学习
2. **依赖类型推断** - 梯度基类型推断
3. **证明合成** - 搜索基证明生成

**类型系统示例：**
```coq
Inductive LogicalReasoning (brain: NeuralNetwork) : Type :=
  | PatternRecognition: {pattern: NeuralInput}
      → brain.prediction
      → Confidence
      → LogicalReasoning brain
  | FormalVerification: {proof: ProofScript}
      → TypeCheck proof Success
      → LogicalReasoning brain
```

---

## 全局配置

### 活跃路径设置

```json
{
  "globalSettings": {
    "activePath": "all",  // "all" | "symbolic" | "neuroSymbolic" | "learnedDependentTypes"
    "pathPriority": {
      "symbolic": 1,
      "neuroSymbolic": 2,
      "learnedDependentTypes": 3
    }
  }
}
```

### 置信度聚合

```json
{
  "confidenceAggregation": {
    "method": "weighted_average",
    "weights": {
      "symbolic": 0.3,
      "neuroSymbolic": 0.4,
      "learnedDependentTypes": 0.3
    }
  }
}
```

---

## 使用示例

### 基础使用

```javascript
import LogicalReasoningEngine from './core/LogicalReasoningEngine.js';
import { configLoader } from './core/AgentConfigLoader.js';

// 初始化
const engine = new LogicalReasoningEngine(neuralNetwork);

// 执行推理
const result = await engine.reason({
  type: "proposition",
  content: "forall n m, n + m = m + n"
}, {
  path: "all"  // 使用所有路径
});

console.log(result);
// {
//   result: true,
//   confidence: 0.85,
//   bestPath: "neuroSymbolic",
//   allResults: [...]
// }
```

### 单一路径推理

```javascript
// 仅使用符号路径
const symbolicResult = await engine.reason(problem, {
  path: "symbolic",
  language: "Lean"
});

// 仅使用神经符号融合
const neuroSymbolicResult = await engine.reason(problem, {
  path: "neuroSymbolic",
  integrationStrategy: "iterative"
});

// 仅使用学习型依赖类型
const learnedResult = await engine.reason(problem, {
  path: "learnedDependentTypes"
});
```

### 学习和适应

```javascript
// 提供反馈进行学习
await engine.learnFromFeedback(
  originalProblem,
 推理结果,
  { correct: true, confidence: 0.9 }
);

// 成功的证明会自动整合到记忆系统
```

---

## 与其他模块的集成

### 与思考引擎集成

```json
{
  "integration": {
    "withThinkingEngine": {
      "enabled": true,
      "mapping": {
        "analytical": "symbolic",
        "reflective": "neuroSymbolic",
        "creative": "learnedDependentTypes"
      }
    }
  }
}
```

### 与记忆系统集成

```json
{
  "integration": {
    "withMemorySystem": {
      "enabled": true,
      "learningFromProofs": {
        "type": "episodic",
        "consolidateAfter": "successful_verification"
      },
      "typeKnowledge": {
        "type": "semantic",
        "persistence": true
      }
    }
  }
}
```

---

## 性能优化

### 并行执行

多条路径默认并行执行，可显著提升速度：

```javascript
// 自动并行执行
const result = await engine.reason(problem, { path: "all" });
```

### 迭代收敛控制

```javascript
const result = await engine.reason(problem, {
  path: "neuroSymbolic",
  integrationStrategy: {
    maxIterations: 10,
    convergenceThreshold: 0.95
  }
});
```

---

## 故障处理

### 所有路径失败

```javascript
{
  "result": "Unknown",
  "confidence": 0,
  "message": "所有推理路径均失败",
  "requiresHumanIntervention": true
}
```

### 路径冲突处理

当多条路径结果不一致时：
1. 计算加权置信度
2. 选择置信度最高的结果
3. 标记冲突供人工审查

---

## 扩展和自定义

### 添加新的证明语言

```javascript
class ProofTranslator {
  async translate(neuralOutput, language) {
    if (language === 'MyLanguage') {
      return this.translateToMyLanguage(neuralOutput);
    }
    // ... 其他语言
  }
}
```

### 添加新的决策策略

```javascript
_makeDecision(neuralResult, symbolicResult, comparison, policy) {
  // 自定义决策逻辑
  return {
    action: 'my_strategy',
    reason: '...'
  };
}
```

---

## 应用场景

### 1. 数学定理证明
使用符号路径获得形式化保证：
```javascript
const theoremProof = await engine.reason({
  type: "theorem",
  statement: "forall n, n + 0 = n"
}, { path: "symbolic", language: "Coq" });
```

### 2. 自然语言推理
使用神经符号融合处理模糊问题：
```javascript
const nlReasoning = await engine.reason({
  type: "natural_language",
  text: "如果所有乌鸦都是黑的，看到一只白鸟，可以得出什么结论？"
}, { path: "neuroSymbolic" });
```

### 3. 程序验证
使用学习型依赖类型验证代码：
```javascript
const codeVerification = await engine.reason({
  type: "code",
  code: "function add(x, y) { return x + y; }"
}, { path: "learnedDependentTypes" });
```

---

## 参考文献

### 形式化证明语言
- [Coq Proof Assistant](https://coq.inria.fr/)
- [The Lean Theorem Prover](https://lean-lang.org/)
- [Isabelle](https://isabelle.in.tum.de/)

### 理论基础
- [Curry-Howard Correspondence](https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence)
- [Dependent Type Theory](https://en.wikipedia.org/wiki/Type_theory#Dependent_type_theory)

### 神经符号AI
- [Deep Learning and Symbolic Reasoning](https://arxiv.org/abs/2011.15861)
- [Neuro-Symbolic AI: The 3rd Wave](https://www.youtube.com/watch?v=V5z4pE2d7Ls)

---

## 常见问题

**Q: 三条路径如何选择？**
A: 根据任务需求选择。需要形式化保证用符号路径，需要直觉判断用神经符号融合，需要自适应推理用学习型依赖类型。

**Q: 可以同时使用多条路径吗？**
A: 可以，设置 `activePath: "all"`，引擎会并行执行所有路径并聚合结果。

**Q: 如何处理推理失败？**
A: 引擎会返回 `result: "Unknown"` 和 `requiresHumanIntervention: true`，并提供详细的错误信息。

**Q: 性能如何优化？**
A: 使用并行执行、调整迭代次数、选择合适路径、缓存常用推理结果。
