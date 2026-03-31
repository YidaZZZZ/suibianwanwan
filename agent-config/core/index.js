/**
 * Agent核心模块导出
 */

export { AgentConfigLoader, configLoader } from './AgentConfigLoader.js';
export { AgentInitializer, agentInitializer } from './AgentInitializer.js';

/**
 * 快速初始化Agent
 */
export function quickInitAgent(path) {
  const { agentInitializer } = require('./AgentInitializer.js');

  // 判断是项目还是对话
  if (path.includes('projects')) {
    const agentData = agentInitializer.initializeProjectAgent(path);
    return agentInitializer.createAgentInstance(agentData);
  } else if (path.includes('conversations')) {
    const agentData = agentInitializer.initializeConversationAgent(path);
    return agentInitializer.createAgentInstance(agentData);
  } else {
    throw new Error('路径必须包含 projects 或 conversations');
  }
}

/**
 * 获取配置
 */
export function getAgentConfig(path) {
  const { configLoader } = require('./AgentConfigLoader.js');
  return configLoader.getAllConfigs(path);
}

/**
 * 验证配置
 */
export function validateAgentConfig(config) {
  const { configLoader } = require('./AgentConfigLoader.js');
  return configLoader.validateConfig(config);
}
