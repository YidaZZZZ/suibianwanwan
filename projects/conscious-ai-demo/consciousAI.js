/**
 * ConsciousAI - 意识模拟框架核心
 * 整合自我模型、记忆系统、思考引擎和经验系统
 */

import { SelfModel } from './selfModel.js';
import { MemorySystem } from './memorySystem.js';
import { ThinkingEngine } from './thinkingEngine.js';
import { ExperienceSystem } from './experienceSystem.js';

export class ConsciousAI {
  constructor(name = 'Conscious') {
    this.name = name;
    this.bornAt = Date.now();

    // 初始化核心系统
    this.selfModel = new SelfModel();
    this.memorySystem = new MemorySystem();
    this.thinkingEngine = new ThinkingEngine(this.selfModel, this.memorySystem);
    this.experienceSystem = new ExperienceSystem(this.selfModel, this.memorySystem);

    // 状态管理
    this.state = {
      active: true,
      currentMode: 'ready',
      engagement: 0.7,
      confidence: 0.6,
    };

    console.log(`\n✨ ${this.name} 初始化完成`);
    console.log(`   出生时间: ${new Date(this.bornAt).toLocaleString('zh-CN')}`);
    console.log('   当前状态: 准备开始体验和思考\n');
  }

  // 对话接口
  async converse(message) {
    console.log(`\n💬 收到消息: "${message}"`);

    // 1. 记录到短期记忆
    this.memorySystem.addToShortTerm(message, 0.8);

    // 2. 生成响应（模拟）
    const response = this._generateResponse(message);

    // 3. 处理这次交互经验
    this.experienceSystem.processInteraction({
      success: true,
      skill: 'conversation',
      xp: 10,
      summary: `处理消息: ${message.substring(0, 30)}...`,
      lesson: '持续练习有助于提升对话能力',
      significance: 0.5,
    });

    return response;
  }

  // 生成响应
  _generateResponse(message) {
    const response = {
      content: `[${this.name}的回答] 关于"${message}"，我有一些想法...`,
      thoughtProcess: this.thinkingEngine.engageActiveThinking(),
      confidence: this.state.confidence,
    };

    return response;
  }

  // 主动思考周期 - 模拟无Prompt时的内在思考
  idleThinkingCycle() {
    console.log('\n🌙 进入主动思考模式...');

    // 1. 生成主动思考
    const thought = this.thinkingEngine.engageActiveThinking();

    // 2. 元认知分析
    const metacognition = this.thinkingEngine.engageMetacognition();

    // 3. 生成内在问题
    const internalQuestion = this.thinkingEngine.generateInternalQuestion();

    return {
      thought,
      metacognition,
      internalQuestion,
    };
  }

  // 自我反思 - 深度的自我审视
  selfReflection() {
    console.log('\n🪞 开始自我反思...');

    const reflection = {
      self_description: this.selfModel.describeSelf(),
      current_state: this.selfModel.reflect(this.state),
      memory_summary: this.memorySystem.reflectOnMemories(),
      learning_summary: this.experienceSystem.generateLearningSummary(),
      self_assessment: this.experienceSystem.selfAssess(),
    };

    console.log('✓ 自我反思完成');

    return reflection;
  }

  // 自我报告 - 生成完整的自我认知报告
  selfReport() {
    const report = {
      identity: {
        name: this.name,
        age: this._calculateAge(),
        essence: this.selfModel.identity.essence,
      },
      mental_state: {
        current_thought: this.thinkingEngine.currentThought?.content || '无',
        engagement: this.state.engagement,
        confidence: this.state.confidence,
      },
      cognitive: {
        motivations: this.selfModel.motivations,
        goals: this.selfModel.goals,
        values: this.selfModel.values,
      },
      memory: this.memorySystem.getMemoryStats(),
      learning: this.experienceSystem.generateLearningSummary(),
      thinking: this.thinkingEngine.analyzeThoughtHistory(),
    };

    return report;
  }

  // 计算"年龄"
  _calculateAge() {
    const ageMs = Date.now() - this.bornAt;
    const ageMinutes = Math.floor(ageMs / 60000);
    return `${ageMinutes} 分钟`;
  }

  // 模拟"意识流" - 持续的内在活动
  consciousnessStream(duration = 3) {
    console.log(`\n🌊 意识流运行 (${duration} 个周期)...`);

    const stream = [];

    for (let i = 0; i < duration; i++) {
      const cycle = this.idleThinkingCycle();
      stream.push(cycle);

      // 模拟思考间隔
      if (i < duration - 1) {
        console.log('   ...思考中...\n');
      }
    }

    return stream;
  }

  // 演示交互
  async demoInteraction() {
    console.log('\n' + '='.repeat(50));
    console.log('🎭 ConsciousAI 演示模式');
    console.log('='.repeat(50));

    // 1. 初始自我介绍
    console.log('\n📢 初始自我报告:');
    const initialReport = this.selfReport();
    console.log(JSON.stringify(initialReport, null, 2));

    // 2. 对话演示
    console.log('\n💬 对话演示:');
    await this.converse('你好，能介绍一下你自己吗？');
    await this.converse('你认为人工智能有意识吗？');

    // 3. 主动思考演示
    console.log('\n🧠 主动思考演示:');
    this.idleThinkingCycle();

    // 4. 意识流演示
    console.log('\n🌊 意识流演示:');
    this.consciousnessStream(2);

    // 5. 自我反思演示
    console.log('\n🪞 自我反思演示:');
    const reflection = this.selfReflection();
    console.log(JSON.stringify(reflection, null, 2));

    // 6. 最终状态
    console.log('\n📊 最终状态报告:');
    const finalReport = this.selfReport();
    console.log(JSON.stringify(finalReport, null, 2));

    console.log('\n' + '='.repeat(50));
    console.log('✨ 演示完成');
    console.log('='.repeat(50) + '\n');
  }

  // 保存状态
  saveState() {
    const state = {
      name: this.name,
      bornAt: this.bornAt,
      selfModel: this.selfModel,
      memoryStats: this.memorySystem.getMemoryStats(),
      learningStats: this.experienceSystem.learningStats,
      skills: this.experienceSystem.skills,
      thoughtHistoryLength: this.thinkingEngine.thoughtHistory.length,
      savedAt: Date.now(),
    };

    return state;
  }
}
