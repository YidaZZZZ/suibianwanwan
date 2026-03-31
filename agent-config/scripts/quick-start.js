import { createProject } from './create-project.js';
import { createConversation } from './create-conversation.js';
import path from 'path';

/**
 * 快速启动脚本
 * 根据用户需求选择创建项目或对话
 */

async function main() {
  console.log('\n🚀 Quick Start - Choose what you want to create:\n');
  console.log('1. 📦 Create a new project');
  console.log('2. 💬 Create a new conversation');
  console.log('3. 📋 List all projects');
  console.log('4. 💭 List all conversations');
  console.log('5. ❌ Exit\n');

  // 在实际使用中，这里应该有用户输入
  // 现在只是展示功能

  console.log('\n💡 Usage examples:\n');
  console.log('# Create a new project');
  console.log('node agent-config/scripts/create-project.js --name=my-project --type=standard\n');

  console.log('# Create a new conversation');
  console.log('node agent-config/scripts/create-conversation.js --date=2026-03-31 --topic="AI Consciousness"\n');

  console.log('# List directories');
  console.log('ls e:/AIworkbuddy/workDir/projects/');
  console.log('ls e:/AIworkbuddy/workDir/conversations/\n');
}

main().catch(console.error);
