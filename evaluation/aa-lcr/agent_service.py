"""
Agent服务封装
为AA-LCR评测提供HTTP API接口
"""

from flask import Flask, request, jsonify
import time
import sys
import os

# 添加agent-config到路径
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../../agent-config'))

app = Flask(__name__)

class MockAgent:
    """模拟Agent，实际使用时替换为真实的Agent实现"""
    
    def __init__(self):
        self.config = {
            'use_logic_engine': True,
            'timeout': 300,
            'max_retries': 3
        }
    
    def process_with_logic(self, documents, question):
        """处理带逻辑推理的查询"""
        start_time = time.time()
        
        # 模拟三种推理路径
        reasoning_paths = ['symbolic', 'neuroSymbolic', 'learnedDependentTypes']
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
    
    def _select_reasoning_path(self, documents, question):
        """选择推理路径"""
        import random
        return random.choice(['symbolic', 'neuroSymbolic', 'learnedDependentTypes'])
    
    def _generate_answer(self, documents, question, path):
        """生成答案（模拟）"""
        # 简单模拟：基于问题生成相关回答
        answers = [
            f"基于文档分析，{question}的答案是肯定的。",
            f"根据提供的文档，{question}涉及的关键因素包括...",
            f"经过综合推理，关于{question}，文档中明确指出...",
            f"对{question}的回答需要考虑文档A和文档B的关联...",
        ]
        import random
        return random.choice(answers)


# 初始化Agent
agent = MockAgent()


@app.route('/health', methods=['GET'])
def health():
    """健康检查"""
    return jsonify({
        'status': 'healthy',
        'agent': 'LogicalReasoningAgent',
        'version': '1.0.0'
    })


@app.route('/api/chat', methods=['POST'])
def chat():
    """处理推理请求"""
    try:
        data = request.json
        documents = data.get('documents', [])
        question = data.get('question', '')
        
        if not question:
            return jsonify({
                'error': 'Question is required'
            }), 400
        
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
        }), 500


@app.route('/api/evaluate', methods=['POST'])
def evaluate():
    """评测接口（适配EvalScope格式）"""
    try:
        data = request.json
        
        # Extract question and documents
        question = data.get('question') or data.get('prompt', '')
        documents = data.get('documents', data.get('context', []))
        
        if not question:
            return jsonify({
                'error': 'Question is required'
            }), 400
        
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
        }), 500


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
    
    app.run(host='0.0.0.0', port=8000, debug=False)
