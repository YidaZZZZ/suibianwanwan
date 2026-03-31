"""测试agent_service的各个接口"""
import requests
import time
import sys

def test_health():
    """测试健康检查接口"""
    print("[1/3] Testing /health endpoint...")
    try:
        response = requests.get('http://localhost:8000/health')
        print(f"      Status: {response.status_code}")
        print(f"      Response: {response.json()}")
        return True
    except Exception as e:
        print(f"      ERROR: {e}")
        return False

def test_chat():
    """测试聊天接口"""
    print("\n[2/3] Testing /api/chat endpoint...")
    try:
        response = requests.post(
            'http://localhost:8000/api/chat',
            json={
                'question': 'What is the main topic of the documents?',
                'documents': ['Document A: Introduction to AI', 'Document B: Machine Learning Basics']
            }
        )
        print(f"      Status: {response.status_code}")
        data = response.json()
        print(f"      Success: {data.get('success')}")
        if data.get('success'):
            print(f"      Reasoning path: {data['data']['reasoning_path']}")
            print(f"      Confidence: {data['data']['confidence']}")
            print(f"      Time: {data['data']['reasoning_time']:.2f}s")
        return True
    except Exception as e:
        print(f"      ERROR: {e}")
        return False

def test_evaluate():
    """测试评测接口"""
    print("\n[3/3] Testing /api/evaluate endpoint...")
    try:
        response = requests.post(
            'http://localhost:8000/api/evaluate',
            json={
                'question': 'Summarize the key findings.',
                'context': ['Research paper on neural networks', 'Experimental results']
            }
        )
        print(f"      Status: {response.status_code}")
        data = response.json()
        print(f"      Answer: {data.get('answer', 'N/A')[:50]}...")
        print(f"      Confidence: {data.get('confidence', 'N/A')}")
        return True
    except Exception as e:
        print(f"      ERROR: {e}")
        return False

def main():
    print("=" * 70)
    print("Agent Service Test")
    print("=" * 70)
    print("Make sure agent_service.py is running on http://localhost:8000")
    print("=" * 70)
    print()

    results = {
        'health': test_health(),
        'chat': test_chat(),
        'evaluate': test_evaluate()
    }

    print("\n" + "=" * 70)
    print("Test Results Summary")
    print("=" * 70)
    for test_name, passed in results.items():
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"{test_name}: {status}")
    print("=" * 70)

    all_passed = all(results.values())
    if all_passed:
        print("All tests passed!")
        return 0
    else:
        print("Some tests failed!")
        return 1

if __name__ == '__main__':
    sys.exit(main())
