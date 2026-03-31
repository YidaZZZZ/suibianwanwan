/**
 * Agent配置加载器
 * 确保主目录配置为最优先，不可被覆盖
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AgentConfigLoader {
  constructor() {
    // 主配置目录（不可被覆盖）
    this.mainConfigPath = path.join(__dirname, '..', 'configs');
    // 缓存主配置
    this.mainConfigs = new Map();
    // 加载主配置
    this.loadMainConfigs();
  }

  /**
   * 加载主配置（基础配置，优先级最高）
   */
  loadMainConfigs() {
    const configFiles = [
      'ai-models.json',
      'memory.json',
      'thinking.json',
      'logical-reasoning.json'
    ];

    configFiles.forEach(file => {
      const filePath = path.join(this.mainConfigPath, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        try {
          const config = JSON.parse(content);
          this.mainConfigs.set(file.replace('.json', ''), config);
          console.log(`✅ 已加载主配置: ${file}`);
        } catch (error) {
          console.warn(`⚠️  配置文件解析失败: ${file}`, error.message);
        }
      }
    });
  }

  /**
   * 获取项目/对话中的配置文件路径
   */
  getProjectConfigPath(projectPath) {
    return path.join(projectPath, 'agent-config.json');
  }

  /**
   * 加载项目/对话配置
   */
  loadProjectConfig(projectPath) {
    const configPath = this.getProjectConfigPath(projectPath);
    if (!fs.existsSync(configPath)) {
      return null;
    }

    const content = fs.readFileSync(configPath, 'utf-8');
    try {
      return JSON.parse(content);
    } catch (error) {
      console.warn(`⚠️  项目配置解析失败: ${configPath}`, error.message);
      return null;
    }
  }

  /**
   * 合并配置
   * 优先级：主配置 > 项目配置
   * 主配置的值不会被覆盖
   */
  mergeConfig(mainConfig, projectConfig) {
    if (!projectConfig) {
      return mainConfig;
    }

    const merged = JSON.parse(JSON.stringify(mainConfig)); // 深拷贝主配置

    // 递归合并，主配置优先
    function deepMerge(target, source) {
      for (const key in source) {
        if (source.hasOwnProperty(key)) {
          // 主配置中存在该键，则不覆盖
          if (target.hasOwnProperty(key)) {
            // 如果是对象，递归合并
            if (typeof target[key] === 'object' && typeof source[key] === 'object') {
              deepMerge(target[key], source[key]);
            }
            // 否则保持主配置的值（不覆盖）
          } else {
            // 主配置中不存在该键，可以添加
            target[key] = source[key];
          }
        }
      }
    }

    deepMerge(merged, projectConfig);
    return merged;
  }

  /**
   * 获取AI模型配置
   */
  getAIModelConfig(projectPath = null) {
    const mainConfig = this.mainConfigs.get('ai-models');
    if (!mainConfig) {
      throw new Error('AI模型配置未找到');
    }

    if (!projectPath) {
      return mainConfig;
    }

    const projectConfig = this.loadProjectConfig(projectPath);
    return this.mergeConfig(mainConfig, projectConfig?.aiModels || {});
  }

  /**
   * 获取记忆系统配置
   */
  getMemoryConfig(projectPath = null) {
    const mainConfig = this.mainConfigs.get('memory');
    if (!mainConfig) {
      throw new Error('记忆系统配置未找到');
    }

    if (!projectPath) {
      return mainConfig;
    }

    const projectConfig = this.loadProjectConfig(projectPath);
    return this.mergeConfig(mainConfig, projectConfig?.memory || {});
  }

  /**
   * 获取思考引擎配置
   */
  getThinkingConfig(projectPath = null) {
    const mainConfig = this.mainConfigs.get('thinking');
    if (!mainConfig) {
      throw new Error('思考引擎配置未找到');
    }

    if (!projectPath) {
      return mainConfig;
    }

    const projectConfig = this.loadProjectConfig(projectPath);
    return this.mergeConfig(mainConfig, projectConfig?.thinking || {});
  }

  /**
   * 获取逻辑推理配置
   */
  getLogicalReasoningConfig(projectPath = null) {
    const mainConfig = this.mainConfigs.get('logical-reasoning');
    if (!mainConfig) {
      throw new Error('逻辑推理配置未找到');
    }

    if (!projectPath) {
      return mainConfig;
    }

    const projectConfig = this.loadProjectConfig(projectPath);
    return this.mergeConfig(mainConfig, projectConfig?.logicalReasoning || {});
  }

  /**
   * 获取完整配置
   */
  getAllConfigs(projectPath = null) {
    return {
      aiModels: this.getAIModelConfig(projectPath),
      memory: this.getMemoryConfig(projectPath),
      thinking: this.getThinkingConfig(projectPath),
      logicalReasoning: this.getLogicalReasoningConfig(projectPath)
    };
  }

  /**
   * 验证配置
   */
  validateConfig(config) {
    const errors = [];

    // 验证AI模型配置
    if (!config.aiModels || !config.aiModels.models) {
      errors.push('aiModels.models 未定义');
    }

    // 验证记忆配置
    if (!config.memory || !config.memory.system) {
      errors.push('memory.system 未定义');
    }

    // 验证思考配置
    if (!config.thinking || !config.thinking.modes) {
      errors.push('thinking.modes 未定义');
    }

    // 验证逻辑推理配置
    if (!config.logicalReasoning || !config.logicalReasoning.paths) {
      errors.push('logicalReasoning.paths 未定义');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * 创建项目配置模板
   */
  createProjectConfigTemplate(projectPath) {
    const template = {
      "_comment": "项目级配置，主配置不会被覆盖",
      "aiModels": {
        "_comment": "可以添加额外的模型，但不能覆盖主配置中的模型"
      },
      "memory": {
        "_comment": "可以添加额外的配置项，但不能覆盖主配置的值"
      },
      "thinking": {
        "_comment": "可以添加额外的配置项，但不能覆盖主配置的值"
      },
      "logicalReasoning": {
        "_comment": "可以添加额外的配置项，但不能覆盖主配置的值"
      }
    };

    const configPath = this.getProjectConfigPath(projectPath);
    fs.writeFileSync(configPath, JSON.stringify(template, null, 2));
    console.log(`✅ 已创建项目配置模板: ${configPath}`);
  }
}

// 导出单例
export const configLoader = new AgentConfigLoader();

// 导出类
export default AgentConfigLoader;
