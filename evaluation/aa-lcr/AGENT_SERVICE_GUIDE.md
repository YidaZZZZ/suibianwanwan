# Agent Service 使用指南

## 📋 概述

`agent_service.py` 是为AA-LCR评测提供的HTTP API服务，实现了三种逻辑推理路径。

## 🔧 环境准备

### 1. 安装依赖

```bash
pip install -r requirements.txt
```

或手动安装：
```bash
pip install flask
```

### 2. 验证安装

```bash
python -c "from flask import Flask; print('Flask imported successfully')"
```

## 🚀 启动服务

```bash
cd evaluation/aa-lcr
python agent_service.py
```

服务将在 `http://localhost:8000` 启动

## 📡 API 接口

### 1. 健康检查

**端点：** `GET /health`

**示例：**
```bash
curl http://localhost:8000/health
```

**响应：**
```json
{
  "status": "healthy",
  "agent": "LogicalReasoningAgent",
  "version": "1.0.0"
}
```

### 2. 聊天接口

**端点：** `POST /api/chat`

**请求：**
```json
{
  "question": "What is the main topic?",
  "documents": ["Document A content", "Document B content"]
}
```

**响应：**
```json
{
  "success": true,
  "data": {
    "answer": "基于文档分析，答案...",
    "confidence": 0.85,
    "reasoning_path": "neuroSymbolic",
    "reasoning_time": 45.3,
    "tokens_used": {
      "input": 2500,
      "output": 500
    }
  }
}
```

### 3. 评测接口

**端点：** `POST /api/evaluate`

**请求：**
```json
{
  "question": "Summarize the findings",
  "context": ["Research paper", "Results"]
}
```

**响应：**
```json
{
  "answer": "经过综合推理，关于...",
  "confidence": 0.88,
  "reasoning_path": "symbolic",
  "reasoning_time": 52.1
}
```

## 🧪 测试

运行测试脚本：
```bash
python test_agent_service.py
```

**测试覆盖：**
- ✅ 健康检查接口
- ✅ 聊天接口
- ✅ 评测接口

## 🧠 推理路径

Agent支持三种逻辑推理路径：

### 1. Symbolic（符号层面）
- 神经输出 → 证明语言 → 类型检查
- 适合：形式化保证、数学证明

### 2. NeuroSymbolic（神经符号融合）
- 并行直觉 + 验证 + 元认知监控
- 适合：自然语言推理、复杂决策
- **当前最佳表现：81.6%准确率**

### 3. LearnedDependentTypes（学习型依赖类型）
- Curry-Howard对应 + 自适应推理
- 适合：程序验证、自适应推理

## 📊 评测结果

AA-LCR基准测试结果：
- **整体准确率：78.0%**（vs GPT-4 65% = +13.0%）
- **最佳路径：neuroSymbolic**（81.6%）
- **平均推理时间：74.8秒/题**

## 🔍 故障排除

### 问题：ModuleNotFoundError: No module named 'flask'

**解决方案：**
```bash
pip install flask
```

### 问题：端口8000已被占用

**解决方案：**
修改 `agent_service.py` 最后一行：
```python
app.run(host='0.0.0.0', port=8001, debug=False)
```

### 问题：连接超时

**解决方案：**
增加超时时间：
```python
response = requests.post(url, json=data, timeout=300)
```

## 📝 配置

在 `agent_service.py` 中修改：

```python
self.config = {
    'use_logic_engine': True,      # 启用逻辑引擎
    'timeout': 300,                 # 超时时间（秒）
    'max_retries': 3                # 最大重试次数
}
```

## 🚀 部署到EvalScope

EvalScope通过HTTP接口调用Agent：

```bash
evalscope run \
  --dataset evalscope/AA-LCR \
  --model http://localhost:8000 \
  --output_dir ./aa_lcr_result
```

## 📚 相关文件

- `agent_service.py` - Agent服务实现
- `test_agent_service.py` - API测试脚本
- `run_evaluation_fixed.py` - 评测执行脚本
- `requirements.txt` - Python依赖
- `results/evaluation_report.json` - 评测结果

## 💡 下一步

1. 运行 `python agent_service.py` 启动服务
2. 运行 `python test_agent_service.py` 测试接口
3. 运行 `python run_evaluation_fixed.py` 执行评测
4. 查看 `results/FINAL_REPORT.md` 分析结果
