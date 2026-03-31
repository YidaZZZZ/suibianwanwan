import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATE_PATH = path.join(__dirname, '../../projects/.template');
const PROJECTS_PATH = path.join(__dirname, '../../projects');

/**
 * 创建新项目
 */
async function createProject(name, type = 'standard') {
  console.log(`\n🚀 Creating new project: ${name}\n`);

  // 创建项目目录
  const projectPath = path.join(PROJECTS_PATH, name);
  if (fs.existsSync(projectPath)) {
    console.error(`❌ Project "${name}" already exists!`);
    return;
  }

  // 创建目录结构
  const dirs = [
    'src',
    'src/core',
    'src/utils',
    'src/config',
    'tests',
    'tests/unit',
    'tests/integration',
    'docs',
    'assets/images',
    'assets/static',
    'scripts',
    'experiments',
  ];

  dirs.forEach(dir => {
    const dirPath = path.join(projectPath, dir);
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created: ${dir}/`);
  });

  // 复制模板文件
  const templateFiles = [
    { src: 'README.md', dest: 'README.md' },
    { src: 'package.json', dest: 'package.json' },
    { src: '.gitignore', dest: '.gitignore' },
    { src: 'LICENSE', dest: 'LICENSE' },
    { src: 'src/index.js', dest: 'src/index.js' },
    { src: 'docs/ARCHITECTURE.md', dest: 'docs/ARCHITECTURE.md' },
  ];

  templateFiles.forEach(file => {
    const srcPath = path.join(TEMPLATE_PATH, file.src);
    const destPath = path.join(projectPath, file.dest);
    if (fs.existsSync(srcPath)) {
      let content = fs.readFileSync(srcPath, 'utf-8');
      // 替换项目名称
      content = content.replace(/your-project-name/g, name);
      content = content.replace(/Your Project/g, name);
      fs.writeFileSync(destPath, content);
      console.log(`✅ Created: ${file.dest}`);
    }
  });

  // 复制Agent配置模板
  const agentConfigTemplatePath = path.join(__dirname, '../../.template/agent-config.json');
  const agentConfigPath = path.join(projectPath, 'agent-config.json');
  if (fs.existsSync(agentConfigTemplatePath)) {
    let content = fs.readFileSync(agentConfigTemplatePath, 'utf-8');
    // 替换项目名称
    content = content.replace(/your-project-name/g, name);
    fs.writeFileSync(agentConfigPath, content);
    console.log(`✅ Created: agent-config.json`);
  }

  // 更新 projects/README.md
  const projectsReadmePath = path.join(PROJECTS_PATH, 'README.md');
  if (fs.existsSync(projectsReadmePath)) {
    let readme = fs.readFileSync(projectsReadmePath, 'utf-8');
    const tableEndIndex = readme.indexOf('详见:');
    if (tableEndIndex !== -1) {
      const newEntry = `| ${name} | \`projects/${name}/\` | 🆕 新项目 | 待更新 |\n`;
      readme = readme.slice(0, tableEndIndex) + newEntry + readme.slice(tableEndIndex);
      fs.writeFileSync(projectsReadmePath, readme);
      console.log(`✅ Updated: projects/README.md`);
    }
  }

  console.log(`\n✨ Project "${name}" created successfully!\n`);
  console.log('Next steps:');
  console.log(`  cd ${projectPath}`);
  console.log(`  npm install`);
  console.log(`  npm start\n`);
}

// 命令行参数解析
const args = process.argv.slice(2);
const nameArg = args.find(arg => arg.startsWith('--name='));
const typeArg = args.find(arg => arg.startsWith('--type='));

const name = nameArg ? nameArg.split('=')[1] : null;
const type = typeArg ? typeArg.split('=')[1] : 'standard';

if (!name) {
  console.log('Usage: node create-project.js --name=<project-name> [--type=<standard|library|demo|agent>]');
  process.exit(1);
}

createProject(name, type).catch(console.error);
