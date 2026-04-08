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

    const configs = this.configLoader.getAllConfigs();

    console.log('✅ 配置加载成功');
    console.log('📋 已加载配置:', Object.keys(configs).join(', '));

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

    const configs = this.configLoader.getAllConfigs();

    console.log('✅ 配置加载成功');
    console.log('📋 已加载配置:', Object.keys(configs).join(', '));

    return {
      configs,
      conversationPath,
      initializedAt: new Date().toISOString()
    };
  }

  /**
   * 载入Agent配置（支持载入协议）
   */
  loadAgent(agentName, workspacePath) {
    return this.configLoader.loadAgentConfig(agentName, workspacePath);
  }
}

// 导出单例
export const agentInitializer = new AgentInitializer();

// 导出类
export default AgentInitializer;
