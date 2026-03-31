/**
 * ConsciousAI 演示入口
 * 展示意识模拟框架的完整功能
 */

import { ConsciousAI } from './consciousAI.js';

// 创建意识AI实例
const ai = new ConsciousAI('Conscious');

// 运行完整演示
await ai.demoInteraction();

// 也可以单独测试各个功能
console.log('\n\n' + '='.repeat(50));
console.log('🧪 单独功能测试');
console.log('='.repeat(50));

// 测试主动思考
console.log('\n测试: 主动思考');
const thought = ai.thinkingEngine.engageActiveThinking();
console.log(JSON.stringify(thought, null, 2));

// 测试元认知
console.log('\n测试: 元认知分析');
const metacognition = ai.thinkingEngine.engageMetacognition();
console.log(JSON.stringify(metacognition, null, 2));

// 测试记忆系统
console.log('\n测试: 记忆检索');
const memories = ai.memorySystem.retrieveMemories('思考');
console.log(`找到 ${memories.length} 条相关记忆`);

// 测试经验系统
console.log('\n测试: 学习总结');
const learningSummary = ai.experienceSystem.generateLearningSummary();
console.log(JSON.stringify(learningSummary, null, 2));

console.log('\n✨ 所有测试完成!\n');
