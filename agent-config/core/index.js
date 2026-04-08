/**
 * Agent核心模块导出
 */

export { AgentConfigLoader, configLoader } from './AgentConfigLoader.js';
export { AgentInitializer, agentInitializer } from './AgentInitializer.js';

/**
 * 快速初始化Agent
 */
export async function quickInitAgent(path) {
  const { agentInitializer } = await import('./AgentInitializer.js');

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
export async function getAgentConfig(path) {
  const { configLoader } = await import('./AgentConfigLoader.js');
  return configLoader.getAllConfigs();
}

/**
 * 验证配置
 */
export async function validateAgentConfig(config) {
  const { configLoader } = await import('./AgentConfigLoader.js');
  return configLoader.validateConfig(config);
}
