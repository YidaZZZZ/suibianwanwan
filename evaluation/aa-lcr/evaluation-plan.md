# AA-LCR 评测执行计划

## 📅 时间线

| 阶段 | 预计时间 | 任务 |
|------|---------|------|
| 准备阶段 | 1-2小时 | 环境配置、Agent封装 |
| 文档读取 | 2-4小时 | 加载30个文档（3M tokens） |
| 问题解答 | 3-5小时 | 回答100道题（含重试） |
| 裁判评分 | 0.5小时 | Qwen模型评分 |
| 数据整理 | 1小时 | 结果汇总、统计分析 |
| 报告撰写 | 2-3小时 | 深度分析报告 |
| **总计** | **10-16小时** | |

---

## 🔧 技术准备

### 1. 环境配置

```bash
# Python环境
python --version  # 3.9+

# 安装EvalScope
pip install evalscope[all]

# 验证
evalscope --version

# 安装依赖
pip install torch transformers accelerate
```

### 2. Agent服务封装

```python
# agent_service.py
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    documents = data.get('documents', [])
    question = data.get('question', '')

    # 调用你的Agent
    response = agent.process_with_logic(
        documents=documents,
        question=question
    )

    return jsonify({
        'answer': response['answer'],
        'confidence': response['confidence'],
        'reasoning_path': response['path']
    })

if __name__ == '__main__':
    app.run(port=8000)
```

### 3. EvalScope配置

```yaml
# config.yaml
dataset:
  name: evalscope/AA-LCR
  split: test

model:
  type: api
  endpoint: http://localhost:8000/api/chat
  api_key: your_api_key
  max_retries: 3
  timeout: 300

evaluation:
  metrics:
    - accuracy
    - response_time
  output_dir: ./aa_lcr_result
  save_predictions: true
```

---

## 📊 执行步骤详解

### Step 1: 数据加载验证

```bash
# 下载并验证数据集
python -c "
from evalscope.datasets import load_dataset
dataset = load_dataset('evalscope/AA-LCR')
print(f'文档数: {len(dataset)}')
print(f'问题数: {dataset[0][\"questions\"]}')
"
```

**验证点：**
- [ ] 数据集下载成功
- [ ] 文档可访问
- [ ] 问题格式正确

### Step 2: 文档预处理

```python
# 读取30个文档，预处理为统一格式
documents = []
for doc_id in range(30):
    doc = dataset[doc_id]
    documents.append({
        'id': doc_id,
        'content': doc['text'],
        'metadata': doc['metadata']
    })

# 按token大小统计
total_tokens = sum(len(d['content']) for d in documents)
print(f'总tokens: {total_tokens}')
```

### Step 3: 单题测试

```bash
# 测试单个问题
python test_single_question.py \
  --question_id 1 \
  --agent_endpoint http://localhost:8000/api/chat

# 验证：
# - Agent能正常调用
# - 返回格式正确
# - 推理时间合理（< 300秒）
```

### Step 4: 批量执行

```bash
# 启动评测
evalscope run \
  --dataset evalscope/AA-LCR \
  --model your_agent \
  --config config.yaml \
  --num_parallel 4 \
  --log_file aa_lcr_execution.log
```

**监控要点：**
- 实时准确率
- 推理速度
- Token消耗
- 错误率

### Step 5: 裁判评分

```python
# 使用Qwen作为裁判
from evalscope.judges import QwenJudge

judge = QwenJudge(model="qwen-72b")
results = judge.evaluate(
    predictions=agent_answers,
    ground_truth=ground_truth
)
```

---

## 💾 数据记录模板

### 执行日志

```json
{
  "execution": {
    "start_time": "2026-03-31T10:00:00Z",
    "end_time": "2026-03-31T22:00:00Z",
    "total_duration": "12h",
    "token_usage": {
      "input": 3200000,
      "output": 250000
    },
    "cost_estimate": {
      "dollars": 26.06,
      "credits": 27
    }
  }
}
```

### 问题级结果

```json
{
  "question_id": "Q001",
  "question_text": "...",
  "documents_used": ["doc_01", "doc_05"],
  "agent_answer": "...",
  "ground_truth": "...",
  "is_correct": true,
  "confidence": 0.95,
  "reasoning_time": 45.3,
  "tokens_used": {
    "input": 2500,
    "output": 120
  },
  "reasoning_path": "symbolic"
}
```

---

## 📈 分析维度

### 1. 整体准确率
```
总准确率 = 正确数 / 总数
分类准确率 = 各类题正确数 / 该类总数
```

### 2. 按文档类型
| 文档类型 | 题数 | 正确 | 准确率 |
|---------|------|------|--------|
| 法律 | 25 | | |
| 财务 | 20 | | |
| 技术 | 30 | | |
| 新闻 | 25 | | |

### 3. 按推理步骤
| 步骤数 | 题数 | 正确 | 准确率 |
|--------|------|------|--------|
| 1-2步 | 30 | | |
| 3-5步 | 40 | | |
| 6+步 | 30 | | |

### 4. 按推理路径
| 路径类型 | 题数 | 准确率 | 平均时间 |
|---------|------|--------|---------|
| symbolic | | | |
| neuroSymbolic | | | |
| learnedDependentTypes | | | |

---

## 🔍 深度分析要点

### 1. 错误分析

```markdown
## 错误模式分类

### A. 信息提取错误
- 现象：遗漏关键信息
- 原因：上下文窗口限制
- 解决方案：增加检索精度

### B. 逻辑推理错误
- 现象：推理链断裂
- 原因：推理路径选择不当
- 解决方案：增强元认知监控

### C. 幻觉生成错误
- 现象：编造不存在的事实
- 原因：过度自信，缺乏验证
- 解决方案：强化符号验证

### D. 理解错误
- 现象：题意理解偏差
- 原因：语义歧义
- 解决方案：增加追问机制
```

### 2. 性能分析

```markdown
## 性能指标

- 平均推理时间：___秒
- 最长推理时间：___秒
- 最短推理时间：___秒
- 时间标准差：___秒

## 效率优化方向

1. 缓存常用文档
2. 并行读取文档
3. 优化推理路径选择
```

### 3. 成本效益分析

```markdown
## 成本分解

| 项目 | Tokens | 成本 | 占比 |
|------|--------|------|------|
| 文档读取 | 3M | $22.5 | 86% |
| 问题回答 | 250K | $3.5 | 13% |
| 裁判评分 | 30K | $0.06 | 0.2% |

## 优化建议

1. 本地缓存文档
2. 智能重试机制
3. 裁判使用更便宜模型
```

---

## 📋 输出清单

### 必须输出
- [ ] 完整评测日志
- [ ] 100道题的详细结果
- [ ] 准确率统计
- [ ] Token使用记录
- [ ] 成本统计

### 分析报告
- [ ] 整体性能评估
- [ ] 错误分析
- [ ] 对比分析
- [ ] 优化建议
- [ ] 可视化图表

### 可选输出
- [ ] 推理过程记录
- [ ] 各推理路径对比
- [ ] 基准模型对比
- [ ] 榜单排名预测

---

## ⚠️ 风险管理

| 风险 | 可能性 | 影响 | 缓解措施 |
|------|--------|------|---------|
| API超时 | 中 | 高 | 设置合理超时和重试 |
| Token超预算 | 低 | 中 | 实时监控，及时停止 |
| Agent崩溃 | 低 | 高 | 异常处理，断点续传 |
| 数据格式错误 | 低 | 中 | 预验证，格式转换 |
| 网络问题 | 中 | 中 | 本地缓存，离线模式 |

---

## 🎯 成功标准

| 指标 | 目标 | 实际 | 达成 |
|------|------|------|------|
| 准确率 | >60% | | |
| 完成率 | 100% | | |
| 成本 | ≤30积分 | | |
| 时间 | ≤16小时 | | |

---

**准备就绪后，即可开始执行评测！**
