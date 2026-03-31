/**
 * 配置验证工具
 * 验证Agent配置文件的有效性
 */

import fs from 'fs';
import path from 'path';

export class ConfigValidator {
  constructor(configDir) {
    this.configDir = configDir;
    this.errors = [];
    this.warnings = [];
  }

  /**
   * 验证所有配置文件
   */
  async validateAll() {
    console.log('🔍 开始验证配置文件...\n');

    await this.validateAIModels();
    await this.validateMemory();
    await this.validateThinking();

    this.printReport();

    return {
      valid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
    };
  }

  /**
   * 验证AI模型配置
   */
  async validateAIModels() {
    const filePath = path.join(this.configDir, 'ai-models.json');

    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      if (!data.models || !Array.isArray(data.models)) {
        this.addError('ai-models.json', 'models字段缺失或不是数组');
        return;
      }

      data.models.forEach((model, index) => {
        if (!model.name) {
          this.addError('ai-models.json', `模型${index}缺少name字段`);
        }
        if (!model.provider) {
          this.addError('ai-models.json', `模型${model.name}缺少provider字段`);
        }
        if (!model.capabilities || !Array.isArray(model.capabilities)) {
          this.addWarning('ai-models.json', `模型${model.name}缺少capabilities字段`);
        }
      });

      console.log('✅ AI模型配置验证通过');
    } catch (error) {
      this.addError('ai-models.json', error.message);
    }
  }

  /**
   * 验证记忆系统配置
   */
  async validateMemory() {
    const filePath = path.join(this.configDir, 'memory.json');

    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      if (!data.system) {
        this.addError('memory.json', 'system字段缺失');
        return;
      }

      const requiredFields = ['shortTerm', 'longTerm', 'episodic'];
      requiredFields.forEach(field => {
        if (!data.system[field]) {
          this.addError('memory.json', `system.${field}字段缺失`);
        }
      });

      console.log('✅ 记忆系统配置验证通过');
    } catch (error) {
      this.addError('memory.json', error.message);
    }
  }

  /**
   * 验证思考引擎配置
   */
  async validateThinking() {
    const filePath = path.join(this.configDir, 'thinking.json');

    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      if (!data.modes) {
        this.addError('thinking.json', 'modes字段缺失');
        return;
      }

      if (!data.quality) {
        this.addWarning('thinking.json', 'quality字段缺失');
      }

      console.log('✅ 思考引擎配置验证通过');
    } catch (error) {
      this.addError('thinking.json', error.message);
    }
  }

  /**
   * 添加错误
   */
  addError(file, message) {
    this.errors.push({ file, message, timestamp: Date.now() });
  }

  /**
   * 添加警告
   */
  addWarning(file, message) {
    this.warnings.push({ file, message, timestamp: Date.now() });
  }

  /**
   * 打印报告
   */
  printReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 验证报告');
    console.log('='.repeat(60) + '\n');

    if (this.errors.length === 0) {
      console.log('✅ 所有配置文件验证通过！\n');
    } else {
      console.log('❌ 发现错误：\n');
      this.errors.forEach((error, index) => {
        console.log(`  ${index + 1}. [${error.file}] ${error.message}`);
      });
      console.log();
    }

    if (this.warnings.length > 0) {
      console.log('⚠️  警告：\n');
      this.warnings.forEach((warning, index) => {
        console.log(`  ${index + 1}. [${warning.file}] ${warning.message}`);
      });
      console.log();
    }

    console.log('='.repeat(60) + '\n');
  }
}

/**
 * 创建验证器实例
 */
export function createValidator(configDir) {
  return new ConfigValidator(configDir);
}
