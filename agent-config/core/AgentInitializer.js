/**
 * Agent初始化器
 * 基于主目录配置初始化项目/对话的Agent
 */

import { configLoader } from './AgentConfigLoader.js';

class AgentInitializer {
  constructor() {
    this.configLoader = configLoader;
  }

  /**
   * 初始化项目的Agent
   */
  initializeProjectAgent(projectPath) {
    console.log(`\n🤖 初始化项目Agent: ${projectPath}\n`);

    // 加载配置（主配置优先）
    const configs = this.configLoader.getAllConfigs(projectPath);

    // 验证配置
    const validation = this.configLoader.validateConfig(configs);
    if (!validation.valid) {
      console.error('❌ 配置验证失败:', validation.errors);
      return null;
    }

    console.log('✅ 配置加载成功');
    console.log('📋 配置来源:');
    console.log('  - 主配置: agent-config/configs/ (优先级最高)');
    console.log('  - 项目配置: agent-config.json (仅补充)');

    return {
      configs,
      projectPath,
      initializedAt: new Date().toISOString()
    };
  }

  /**
   * 初始化对话的Agent
   */
  initializeConversationAgent(conversationPath) {
    console.log(`\n💬 初始化对话Agent: ${conversationPath}\n`);

    // 加载配置（主配置优先）
    const configs = this.configLoader.getAllConfigs(conversationPath);

    // 验证配置
    const validation = this.configLoader.validateConfig(configs);
    if (!validation.valid) {
      console.error('❌ 配置验证失败:', validation.errors);
      return null;
    }

    console.log('✅ 配置加载成功');
    console.log('📋 配置来源:');
    console.log('  - 主配置: agent-config/configs/ (优先级最高)');
    console.log('  - 对话配置: agent-config.json (仅补充)');

    return {
      configs,
      conversationPath,
      initializedAt: new Date().toISOString()
    };
  }

  /**
   * 显示配置信息
   */
  displayConfigInfo(agentData) {
    const { configs } = agentData;

    console.log('\n📊 Agent配置信息:\n');

    // AI模型配置
    console.log('🤖 AI模型:');
    console.log(`  默认模型: ${configs.aiModels.defaultModel}`);
    console.log(`  备用模型: ${configs.aiModels.fallbackModel}`);
    console.log(`  可用模型: ${configs.aiModels.models.map(m => m.name).join(', ')}`);

    // 记忆配置
    console.log('\n🧠 记忆系统:');
    console.log(`  短期记忆容量: ${configs.memory.system.shortTerm.capacity}`);
    console.log(`  长期记忆: ${configs.memory.system.longTerm.persistence ? '启用' : '禁用'}`);

    // 思考配置
    console.log('\n💭 思考引擎:');
    console.log(`  元认知: ${configs.thinking.metacognition.enabled ? '启用' : '禁用'}`);
    console.log(`  思考深度: ${configs.thinking.quality.depth.current}`);

    // 逻辑推理配置
    console.log('\n🔬 逻辑推理引擎:');
    console.log(`  活跃路径: ${configs.logicalReasoning.globalSettings.activePath}`);
    console.log(`  可用路径:`);
    Object.keys(configs.logicalReasoning.paths).forEach(path => {
      const priority = configs.logicalReasoning.globalSettings.pathPriority[path];
      console.log(`    ${priority}. ${path}: ${configs.logicalReasoning.paths[path].name}`);
    });

    console.log('');
  }

  /**
   * 创建Agent实例（示例）
   */
  createAgentInstance(agentData) {
    const { configs, projectPath, conversationPath } = agentData;

    // 这里可以根据配置创建实际的Agent实例
    // 现在只是返回配置信息

    return {
      type: projectPath ? 'project' : 'conversation',
      path: projectPath || conversationPath,
      configs,
      createdAt: new Date().toISOString()
    };
  }
}

// 导出单例
export const agentInitializer = new AgentInitializer();

// 导出类
export default AgentInitializer;
