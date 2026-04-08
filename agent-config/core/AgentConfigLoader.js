/**
 * Agent配置加载器
 * 加载主配置 + 新增驱动/技能配置
 * 支持载入协议：全局基础模板 + 项目级具体化
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AgentConfigLoader {
  constructor() {
    this.mainConfigPath = path.join(__dirname, '..', 'configs');
    this.mainConfigs = new Map();
    this.loadMainConfigs();
  }

  /**
   * 加载主配置（自动扫描 configs/ 下所有 .json 文件）
   */
  loadMainConfigs() {
    if (!fs.existsSync(this.mainConfigPath)) {
      console.warn('⚠️  配置目录不存在:', this.mainConfigPath);
      return;
    }

    const files = fs.readdirSync(this.mainConfigPath).filter(f => f.endsWith('.json'));

    files.forEach(file => {
      const filePath = path.join(this.mainConfigPath, file);
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const config = JSON.parse(content);
        const key = file.replace('.json', '');
        this.mainConfigs.set(key, config);
      } catch (error) {
        console.warn(`⚠️  配置文件解析失败: ${file}`, error.message);
      }
    });
  }

  /**
   * 获取指定配置
   */
  getConfig(name) {
    return this.mainConfigs.get(name) || null;
  }

  /**
   * 获取所有配置名
   */
  getConfigNames() {
    return Array.from(this.mainConfigs.keys());
  }

  /**
   * 获取核心驱动配置
   */
  getCoreDrivesConfig() {
    return this.getConfig('core-drives');
  }

  /**
   * 获取思考配置
   */
  getThinkingConfig() {
    return this.getConfig('thinking');
  }

  /**
   * 获取记忆配置
   */
  getMemoryConfig() {
    return this.getConfig('memory');
  }

  /**
   * 获取技能库
   */
  getCapabilitiesLog() {
    return this.getConfig('capabilities-log');
  }

  /**
   * 获取成长计划
   */
  getGrowthPlan() {
    return this.getConfig('growth-plan');
  }

  /**
   * 获取技能管理配置
   */
  getSkillsManagementConfig() {
    return this.getConfig('skills-ideas-management');
  }

  /**
   * 获取AI模型配置
   */
  getAIModelConfig() {
    return this.getConfig('ai-models');
  }

  /**
   * 获取完整配置
   */
  getAllConfigs() {
    const result = {};
    this.mainConfigs.forEach((config, name) => {
      result[name] = config;
    });
    return result;
  }

  /**
   * 载入Agent配置（支持载入协议）
   * @param {string} agentName - Agent名称（不含.md）
   * @param {string} workspacePath - 工作目录路径
   * @returns {object} 合并后的配置
   */
  loadAgentConfig(agentName, workspacePath) {
    const result = {
      agentName,
      baseLayer: null,
      specificLayer: null,
      dataConfigs: {}
    };

    // 1. 尝试读取项目级 Agent 配置
    const projectAgentPath = path.join(workspacePath, '.codebuddy', 'agents', `${agentName}.md`);
    if (fs.existsSync(projectAgentPath)) {
      result.specificLayer = fs.readFileSync(projectAgentPath, 'utf-8');

      // 解析 extends 字段
      const extendsMatch = result.specificLayer.match(/^---\n[\s\S]*?extends:\s*(.+)\n[\s\S]*?---/m);
      if (extendsMatch) {
        const baseName = extendsMatch[1].trim();
        const basePath = path.join(
          process.env.USERPROFILE || process.env.HOME,
          '.codebuddy', 'agents', `${baseName}.md`
        );
        if (fs.existsSync(basePath)) {
          result.baseLayer = fs.readFileSync(basePath, 'utf-8');
        }
      }
    } else {
      // 2. 尝试读取全局 Agent 配置
      const globalAgentPath = path.join(
        process.env.USERPROFILE || process.env.HOME,
        '.codebuddy', 'agents', `${agentName}.md`
      );
      if (fs.existsSync(globalAgentPath)) {
        result.baseLayer = fs.readFileSync(globalAgentPath, 'utf-8');
      }
    }

    // 3. 加载数据配置
    result.dataConfigs = this.getAllConfigs();

    return result;
  }

  /**
   * 写入技能到 capabilities-log.json
   */
  writeCapability(newSkill) {
    const logPath = path.join(this.mainConfigPath, 'capabilities-log.json');
    if (!fs.existsSync(logPath)) return false;

    try {
      const log = JSON.parse(fs.readFileSync(logPath, 'utf-8'));

      if (newSkill.type === 'skill') {
        log.skills.push(newSkill.data);
        log.current_state.skills_count = log.skills.length;
      } else if (newSkill.type === 'capability') {
        log.capabilities.push(newSkill.data);
        log.current_state.capabilities_count = log.capabilities.length;
      }

      log.last_updated = new Date().toISOString();

      fs.writeFileSync(logPath, JSON.stringify(log, null, 2));
      return true;
    } catch (error) {
      console.error('写入技能失败:', error.message);
      return false;
    }
  }
}

// 导出单例
export const configLoader = new AgentConfigLoader();

// 导出类
export default AgentConfigLoader;
