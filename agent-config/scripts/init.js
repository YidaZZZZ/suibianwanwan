/**
 * Agent配置初始化脚本
 * 用于快速初始化新Agent项目
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 初始化Agent
 */
async function initAgent(options) {
  const { template, projectName, configDir } = options;

  console.log(`🚀 初始化Agent: ${projectName}`);
  console.log(`📋 使用模板: ${template}\n`);

  // 检查模板是否存在
  const templatePath = path.join(__dirname, '..', 'templates', template);
  if (!fs.existsSync(templatePath)) {
    console.error(`❌ 模板不存在: ${template}`);
    console.log('\n可用模板:');
    await listTemplates();
    process.exit(1);
  }

  // 创建项目目录
  const projectPath = path.join(process.cwd(), projectName);
  if (fs.existsSync(projectPath)) {
    console.error(`❌ 目录已存在: ${projectName}`);
    process.exit(1);
  }

  fs.mkdirSync(projectPath, { recursive: true });

  // 复制模板文件
  await copyTemplate(templatePath, projectPath);

  // 复制配置文件（如果指定）
  if (configDir) {
    await copyConfigs(configDir, projectPath);
  }

  console.log('\n✅ Agent初始化完成！\n');
  console.log('📁 项目路径:', projectPath);
  console.log('\n下一步:');
  console.log(`  cd ${projectName}`);
  console.log('  npm install');
  console.log('  npm run dev');
}

/**
 * 列出可用模板
 */
async function listTemplates() {
  const templatesPath = path.join(__dirname, '..', 'templates');
  const templates = fs.readdirSync(templatesPath);

  templates.forEach(template => {
    const readmePath = path.join(templatesPath, template, 'README.md');
    if (fs.existsSync(readmePath)) {
      const readme = fs.readFileSync(readmePath, 'utf-8');
      const description = readme.match(/# (.+)\n/)?.[1] || template;
      console.log(`  - ${template}: ${description}`);
    } else {
      console.log(`  - ${template}`);
    }
  });
}

/**
 * 复制模板文件
 */
async function copyTemplate(templatePath, projectPath) {
  const copyDir = (src, dest) => {
    const entries = fs.readdirSync(src, { withFileTypes: true });

    entries.forEach(entry => {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
        console.log(`  ✓ ${entry.name}`);
      }
    });
  };

  copyDir(templatePath, projectPath);
}

/**
 * 复制配置文件
 */
async function copyConfigs(configDir, projectPath) {
  const srcPath = path.join(__dirname, '..', 'configs');
  const destPath = path.join(projectPath, 'configs');

  if (fs.existsSync(destPath)) {
    console.log('  ✓ configs目录已存在，跳过复制');
    return;
  }

  fs.mkdirSync(destPath, { recursive: true });

  const files = fs.readdirSync(srcPath);
  files.forEach(file => {
    const src = path.join(srcPath, file);
    const dest = path.join(destPath, file);
    fs.copyFileSync(src, dest);
    console.log(`  ✓ configs/${file}`);
  });
}

/**
 * 命令行接口
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
使用方法: node init.js <template> <project-name> [options]

模板:
  conscious-ai      意识AI模板
  task-executor    任务执行器模板
  earner           赚钱Agent模板

选项:
  --config <dir>   复制配置文件到指定目录

示例:
  node init.js conscious-ai my-agent
  node init.js earner my-earner --config ./custom-configs
    `);
    process.exit(0);
  }

  const [template, projectName] = args;
  const configIndex = args.indexOf('--config');

  await initAgent({
    template,
    projectName,
    configDir: configIndex !== -1 ? args[configIndex + 1] : null,
  });
}

// 运行
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { initAgent, listTemplates };
