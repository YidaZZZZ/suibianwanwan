#!/usr/bin/env node

/**
 * Smart Config Generator CLI
 */

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { PROJECT_TYPES, ConfigGenerator } from './index';

const program = new Command();

program
  .name('smart-config-generator')
  .description('智能配置生成器 - 一键生成各种项目的最佳配置文件')
  .version('1.0.0');

program
  .option('--type <type>', '项目类型')
  .option('--typescript', '启用 TypeScript')
  .option('--tailwind', '启用 Tailwind CSS')
  .option('--eslint', '启用 ESLint')
  .option('--prettier', '启用 Prettier')
  .option('--jest', '启用 Jest')
  .option('--docker', '生成 Docker 配置')
  .option('--database <database>', '数据库类型 (postgresql/mysql/mongodb)')
  .option('--cache <cache>', '缓存类型 (redis/memcached)')
  .action(async (options) => {
    try {
      let config: any = { ...options };

      // 如果没有指定类型，进入交互模式
      if (!config.type) {
        const answers = await inquirer.prompt([
          {
            type: 'list',
            name: 'type',
            message: '选择项目类型:',
            choices: PROJECT_TYPES,
          },
          {
            type: 'confirm',
            name: 'typescript',
            message: '启用 TypeScript?',
            default: true,
          },
          {
            type: 'confirm',
            name: 'eslint',
            message: '启用 ESLint?',
            default: true,
          },
          {
            type: 'confirm',
            name: 'prettier',
            message: '启用 Prettier?',
            default: true,
          },
          {
            type: 'confirm',
            name: 'jest',
            message: '启用 Jest?',
            default: true,
          },
        ]);

        config = { ...config, ...answers };
      }

      // 询问输出目录
      const targetDirAnswer = await inquirer.prompt([
        {
          type: 'input',
          name: 'targetDir',
          message: '输出目录:',
          default: './',
        },
      ]);

      const targetDir = targetDirAnswer.targetDir;

      // 显示配置信息
      console.log('\n' + chalk.blue('配置信息:'));
      console.log(JSON.stringify(config, null, 2));

      // 确认
      const confirm = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'proceed',
          message: '确认生成配置文件?',
          default: true,
        },
      ]);

      if (!confirm.proceed) {
        console.log(chalk.yellow('\n已取消'));
        process.exit(0);
      }

      // 开始生成
      const spinner = ora('生成配置文件中...').start();

      const generator = new ConfigGenerator(config);
      await generator.generate(targetDir);

      spinner.succeed(chalk.green('配置文件生成完成！'));

      // 显示下一步提示
      console.log('\n' + chalk.cyan('下一步:'));
      console.log(`  1. cd ${targetDir}`);
      console.log('  2. npm install');
      console.log('  3. npm run dev');
      console.log('\n' + chalk.yellow('提示: 根据项目需求修改配置文件\n'));
    } catch (error: any) {
      console.error(chalk.red('\n错误:'), error.message);
      process.exit(1);
    }
  });

program.parse();
