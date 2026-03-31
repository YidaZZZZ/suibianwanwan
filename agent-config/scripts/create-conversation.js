import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATE_PATH = path.join(__dirname, '../../conversations/.template');
const CONVERSATIONS_PATH = path.join(__dirname, '../../conversations');

/**
 * 创建新对话目录
 */
async function createConversation(date, topic) {
  console.log(`\n💬 Creating new conversation: ${date}\n`);

  // 创建日期目录
  const conversationPath = path.join(CONVERSATIONS_PATH, date);
  if (fs.existsSync(conversationPath)) {
    console.log(`⚠️  Conversation "${date}" already exists, adding to it...\n`);
  } else {
    fs.mkdirSync(conversationPath, { recursive: true });
    console.log(`✅ Created: ${date}/`);
  }

  // 创建子目录
  const dirs = ['experiments', 'tests', 'assets/images', 'assets/screenshots', 'snippets'];

  dirs.forEach(dir => {
    const dirPath = path.join(conversationPath, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`✅ Created: ${date}/${dir}/`);
    }
  });

  // 检查是否已有 notes.md
  const notesPath = path.join(conversationPath, 'notes.md');
  if (!fs.existsSync(notesPath)) {
    // 复制模板
    const templatePath = path.join(TEMPLATE_PATH, 'notes.md');
    let content = fs.readFileSync(templatePath, 'utf-8');

    // 替换日期和主题
    content = content.replace(/YYYY-MM-DD/g, date);
    content = content.replace(/\[在此处简述本次对话的主题\]/g, topic || '待更新');

    fs.writeFileSync(notesPath, content);
    console.log(`✅ Created: ${date}/notes.md`);
  } else {
    console.log(`ℹ️  Notes file already exists: ${date}/notes.md`);
  }

  // 更新 conversations/README.md
  const conversationsReadmePath = path.join(CONVERSATIONS_PATH, 'README.md');
  if (fs.existsSync(conversationsReadmePath)) {
    let readme = fs.readFileSync(conversationsReadmePath, 'utf-8');

    // 检查是否已记录该日期
    if (!readme.includes(date)) {
      const newEntry = `\n- **${date}**: [${topic || '对话记录'}](${date}/)`;
      readme = readme + newEntry;
      fs.writeFileSync(conversationsReadmePath, readme);
      console.log(`✅ Updated: conversations/README.md`);
    }
  }

  // 复制Agent配置模板
  const agentConfigTemplatePath = path.join(__dirname, '../../.template/agent-config.json');
  const agentConfigPath = path.join(conversationPath, 'agent-config.json');
  if (fs.existsSync(agentConfigTemplatePath)) {
    let content = fs.readFileSync(agentConfigTemplatePath, 'utf-8');
    fs.writeFileSync(agentConfigPath, content);
    console.log(`✅ Created: agent-config.json`);
  }

  console.log(`\n✨ Conversation "${date}" created successfully!\n`);
  console.log('Next steps:');
  console.log(`  cd ${conversationPath}`);
  console.log(`  # Edit notes.md to record the conversation\n`);
}

// 获取今天的日期（YYYY-MM-DD）
function getTodayDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 命令行参数解析
const args = process.argv.slice(2);
const dateArg = args.find(arg => arg.startsWith('--date='));
const topicArg = args.find(arg => arg.startsWith('--topic='));

const date = dateArg ? dateArg.split('=')[1] : getTodayDate();
const topic = topicArg ? topicArg.split('=')[1] : '';

createConversation(date, topic).catch(console.error);
