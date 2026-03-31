"""
Agent服务封装
为AA-LCR评测提供HTTP API接口
"""

from flask import Flask, request, jsonify, Response
from werkzeug import Request as WerkzeugRequest
import time
import sys
import os
import random
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    # 类型检查时的导入
    pass

# 添加agent-config到路径
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../../agent-config'))

app = Flask(__name__)

class MockAgent:
    """模拟Agent，实际使用时替换为真实的Agent实现"""

    def __init__(self) -> None:
        self.config: dict[str, str | int | bool] = {
            'use_logic_engine': True,
            'timeout': 300,
            'max_retries': 3
        }

    def process_with_logic(
        self,
        documents: list[str],
        question: str
    ) -> dict[str, str | float | dict[str, int]]:
        """处理带逻辑推理的查询"""
        start_time = time.time()

        # 选择推理路径
        selected_path = self._select_reasoning_path(documents, question)

        # 模拟推理过程
        answer = self._generate_answer(documents, question, selected_path)

        elapsed_time = time.time() - start_time

        return {
            'answer': answer,
            'confidence': 0.85,
            'reasoning_path': selected_path,
            'reasoning_time': elapsed_time,
            'tokens_used': {
                'input': len(str(documents)) + len(question),
                'output': len(answer)
            }
        }

    def _select_reasoning_path(
        self,
        documents: list[str],
        question: str
    ) -> str:
        """选择推理路径"""
        _ = documents  # 用于未来扩展
        _ = question   # 用于未来扩展
        return random.choice(['symbolic', 'neuroSymbolic', 'learnedDependentTypes'])

    def _generate_answer(
        self,
        documents: list[str],
        question: str,
        path: str
    ) -> str:
        """生成答案（模拟）"""
        _ = documents  # 用于未来扩展
        _ = path       # 用于未来扩展
        # 简单模拟：基于问题生成相关回答
        answers = [
            f"基于文档分析，{question}的答案是肯定的。",
            f"根据提供的文档，{question}涉及的关键因素包括...",
            f"经过综合推理，关于{question}，文档中明确指出...",
            f"对{question}的回答需要考虑文档A和文档B的关联...",
        ]
        return random.choice(answers)


# 初始化Agent
agent = MockAgent()


@app.route('/health', methods=['GET'])
def health() -> Response:
    """健康检查"""
    return jsonify({
        'status': 'healthy',
        'agent': 'LogicalReasoningAgent',
        'version': '1.0.0'
    })


@app.route('/api/chat', methods=['POST'])
def chat() -> Response | tuple[Response, int]:
    """处理推理请求"""
    try:
        req_json: dict[str, object] | None = request.get_json()
        if not req_json:
            return jsonify({'success': False, 'error': 'Invalid JSON'}), 400  # type: ignore[misc]

        documents = req_json.get('documents', [])
        question = req_json.get('question', '')

        if not isinstance(documents, list):
            documents = []
        if not isinstance(question, str):
            question = str(question) if question else ''

        if not question:
            return jsonify({
                'error': 'Question is required'
            }), 400  # type: ignore[misc]

        # 调用Agent
        result = agent.process_with_logic(documents, question)

        return jsonify({
            'success': True,
            'data': result
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500  # type: ignore[misc]


@app.route('/api/evaluate', methods=['POST'])
def evaluate() -> Response | tuple[Response, int]:
    """评测接口（适配EvalScope格式）"""
    try:
        req_json: dict[str, object] | None = request.get_json()
        if not req_json:
            return jsonify({'error': 'Invalid JSON'}), 400  # type: ignore[misc]

        # Extract question and documents
        question = req_json.get('question') or req_json.get('prompt', '')
        documents = req_json.get('documents', req_json.get('context', []))

        if not isinstance(question, str):
            question = str(question) if question else ''
        if not isinstance(documents, list):
            documents = []

        if not question:
            return jsonify({
                'error': 'Question is required'
            }), 400  # type: ignore[misc]

        # Call agent
        result = agent.process_with_logic(documents, question)

        return jsonify({
            'answer': result['answer'],
            'confidence': result['confidence'],
            'reasoning_path': result['reasoning_path'],
            'reasoning_time': result['reasoning_time']
        })

    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500  # type: ignore[misc]


if __name__ == '__main__':
    print("=" * 50)
    print("Agent Service Starting...")
    print("=" * 50)
    print(f"Agent: LogicalReasoningAgent v1.0.0")
    print(f"Port: 8000")
    print(f"Reasoning paths: symbolic, neuroSymbolic, learnedDependentTypes")
    print("=" * 50)
    print("Endpoints:")
    print("  GET  /health - Health check")
    print("  POST /api/chat - Chat interface")
    print("  POST /api/evaluate - Evaluation interface")
    print("=" * 50)

    app.run(host='0.0.0.0', port=8000, debug=False)  # type: ignore[arg-type]
