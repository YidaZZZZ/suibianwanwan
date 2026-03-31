/**
 * 配置验证脚本
 */

import { createValidator } from '../tools/validator.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const args = process.argv.slice(2);

  // 配置目录
  let configDir = args[0] || path.join(__dirname, '..', 'configs');

  // 检查目录是否存在
  const fs = await import('fs');
  if (!fs.existsSync(configDir)) {
    console.error(`❌ 配置目录不存在: ${configDir}`);
    process.exit(1);
  }

  // 创建验证器
  const validator = createValidator(configDir);

  // 验证配置
  const result = await validator.validateAll();

  // 返回退出码
  process.exit(result.valid ? 0 : 1);
}

// 运行
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
