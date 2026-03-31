import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirs = [
  'templates',
  'templates/conscious-ai',
  'templates/task-executor',
  'templates/earner',
  'configs',
  'tools',
  'scripts',
];

const rootDir = __dirname;

dirs.forEach(dir => {
  const fullPath = path.join(rootDir, '..', dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ 创建目录: ${dir}`);
  } else {
    console.log(`✓ 目录已存在: ${dir}`);
  }
});

console.log('\n✅ 目录结构创建完成！');
