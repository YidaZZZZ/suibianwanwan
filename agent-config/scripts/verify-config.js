/**
 * 验证配置加载器
 * 确保主配置优先级正确
 */

import { configLoader } from '../core/AgentConfigLoader.js';

console.log('\n🔍 验证Agent配置加载器\n');
console.log('='.repeat(60));

// 1. 测试主配置加载
console.log('\n1️⃣ 测试主配置加载');
console.log('-'.repeat(60));
const mainConfigs = configLoader.mainConfigs;
console.log(`✅ 已加载 ${mainConfigs.size} 个主配置`);
mainConfigs.forEach((config, name) => {
  console.log(`   - ${name}.json`);
});

// 2. 测试配置获取
console.log('\n2️⃣ 测试配置获取');
console.log('-'.repeat(60));

try {
  const aiModels = configLoader.getAIModelConfig();
  console.log(`✅ AI模型配置: ${aiModels.models.length} 个模型`);
  console.log(`   默认模型: ${aiModels.defaultModel}`);

  const memory = configLoader.getMemoryConfig();
  console.log(`✅ 记忆配置: 短期记忆容量 ${memory.system.shortTerm.capacity}`);

  const thinking = configLoader.getThinkingConfig();
  console.log(`✅ 思考配置: ${thinking.modes.active.name}`);
} catch (error) {
  console.error(`❌ 错误: ${error.message}`);
}

// 3. 测试配置合并
console.log('\n3️⃣ 测试配置合并逻辑');
console.log('-'.repeat(60));

const mainConfig = {
  a: 1,
  b: {
    x: 10,
    y: 20
  }
};

const projectConfig = {
  a: 999, // 试图覆盖
  b: {
    y: 999, // 试图覆盖
    z: 30   // 新增
  },
  c: 3    // 新增
};

const merged = configLoader.mergeConfig(mainConfig, projectConfig);

console.log('主配置:', JSON.stringify(mainConfig, null, 2));
console.log('项目配置:', JSON.stringify(projectConfig, null, 2));
console.log('合并结果:', JSON.stringify(merged, null, 2));

// 验证主配置值未被覆盖
console.log('\n验证结果:');
console.log(`  merged.a === mainConfig.a: ${merged.a === mainConfig.a} (${merged.a} === ${mainConfig.a})`);
console.log(`  merged.b.x === mainConfig.b.x: ${merged.b.x === mainConfig.b.x} (${merged.b.x} === ${mainConfig.b.x})`);
console.log(`  merged.b.y === mainConfig.b.y: ${merged.b.y === mainConfig.b.y} (${merged.b.y} === ${mainConfig.b.y})`);
console.log(`  merged.c === projectConfig.c: ${merged.c === projectConfig.c} (${merged.c} === ${projectConfig.c})`);

if (merged.a !== mainConfig.a) {
  console.error('❌ 错误: 主配置值被覆盖！');
} else {
  console.log('✅ 主配置值未被覆盖');
}

// 4. 测试配置验证
console.log('\n4️⃣ 测试配置验证');
console.log('-'.repeat(60));

const validConfig = configLoader.getAllConfigs();
const validation = configLoader.validateConfig(validConfig);
console.log(`验证结果: ${validation.valid ? '✅ 通过' : '❌ 失败'}`);
if (!validation.valid) {
  console.log('错误:', validation.errors);
}

// 5. 测试项目配置加载
console.log('\n5️⃣ 测试项目配置加载');
console.log('-'.repeat(60));

const projectPath = process.argv[2];
if (projectPath) {
  console.log(`测试项目路径: ${projectPath}`);
  const projectConfigs = configLoader.getAllConfigs(projectPath);
  console.log('✅ 项目配置加载成功');
  console.log(`   AI模型默认: ${projectConfigs.aiModels.defaultModel}`);
} else {
  console.log('ℹ️  未指定项目路径，跳过项目配置测试');
}

console.log('\n' + '='.repeat(60));
console.log('✅ 验证完成\n');
