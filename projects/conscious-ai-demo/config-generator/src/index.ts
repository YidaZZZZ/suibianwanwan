/**
 * Smart Config Generator - 核心功能
 */

import * as fs from 'fs-extra';
import * as path from 'path';

export interface ConfigOptions {
  type: string;
  typescript?: boolean;
  tailwind?: boolean;
  eslint?: boolean;
  prettier?: boolean;
  jest?: boolean;
  docker?: boolean;
  database?: string;
  cache?: string;
}

export interface ProjectTemplate {
  files: Record<string, string | (() => string)>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  scripts?: Record<string, string>;
}

/**
 * 项目类型定义
 */
export const PROJECT_TYPES = [
  { name: 'React + Vite', value: 'react-vite', category: 'frontend' },
  { name: 'React + Next.js', value: 'nextjs', category: 'frontend' },
  { name: 'Vue 3', value: 'vue3', category: 'frontend' },
  { name: 'Node.js + Express', value: 'nodejs-express', category: 'backend' },
  { name: 'Node.js + NestJS', value: 'nodejs-nestjs', category: 'backend' },
  { name: 'Next.js + tRPC', value: 'nextjs-trpc', category: 'fullstack' },
  { name: 'React Native', value: 'react-native', category: 'mobile' },
];

/**
 * 配置模板生成器
 */
export class ConfigGenerator {
  constructor(private options: ConfigOptions) {}

  /**
   * 生成所有配置文件
   */
  async generate(targetDir: string): Promise<void> {
    console.log(`\n🚀 开始生成配置文件到 ${targetDir}`);

    const template = this.getTemplate();

    // 创建目录
    await fs.ensureDir(targetDir);

    // 生成文件
    for (const [filename, content] of Object.entries(template.files)) {
      const filePath = path.join(targetDir, filename);
      await fs.ensureDir(path.dirname(filePath));

      const fileContent = typeof content === 'function' ? content() : content;
      await fs.writeFile(filePath, fileContent, 'utf-8');

      console.log(`  ✓ ${filename}`);
    }

    // 更新或创建 package.json
    if (template.dependencies || template.devDependencies) {
      await this.updatePackageJson(targetDir, template);
    }

    console.log(`\n✅ 配置文件生成完成！\n`);
  }

  /**
   * 获取项目模板
   */
  private getTemplate(): ProjectTemplate {
    const { type } = this.options;

    switch (type) {
      case 'react-vite':
        return this.getReactViteTemplate();
      case 'nextjs':
        return this.getNextjsTemplate();
      case 'nodejs-express':
        return this.getNodejsExpressTemplate();
      default:
        return this.getReactViteTemplate();
    }
  }

  /**
   * React + Vite 模板
   */
  private getReactViteTemplate(): ProjectTemplate {
    return {
      files: {
        'package.json': this.getReactVitePackageJson(),
        'tsconfig.json': this.getTsConfig('react'),
        '.eslintrc.js': this.getEslintConfig('react'),
        '.prettierrc': this.getPrettierConfig(),
        'vite.config.ts': this.getViteConfig(),
        'jest.config.js': this.getJestConfig(),
      },
      dependencies: {
        'react': '^18.2.0',
        'react-dom': '^18.2.0',
      },
      devDependencies: {
        '@types/react': '^18.2.45',
        '@types/react-dom': '^18.2.18',
        '@vitejs/plugin-react': '^4.2.1',
        'typescript': '^5.3.3',
        'vite': '^5.0.8',
      },
    };
  }

  /**
   * Next.js 模板
   */
  private getNextjsTemplate(): ProjectTemplate {
    return {
      files: {
        'package.json': this.getNextjsPackageJson(),
        'tsconfig.json': this.getTsConfig('nextjs'),
        'next.config.js': this.getNextConfig(),
        '.eslintrc.json': this.getEslintConfig('nextjs'),
        '.prettierrc': this.getPrettierConfig(),
        'jest.config.js': this.getJestConfig('nextjs'),
      },
      dependencies: {
        'next': '^14.0.4',
        'react': '^18.2.0',
        'react-dom': '^18.2.0',
      },
      devDependencies: {
        '@types/node': '^20.10.5',
        '@types/react': '^18.2.45',
        'typescript': '^5.3.3',
        'eslint': '^8.56.0',
        'eslint-config-next': '^14.0.4',
        'prettier': '^3.1.1',
        '@testing-library/react': '^14.1.2',
      },
    };
  }

  /**
   * Node.js + Express 模板
   */
  private getNodejsExpressTemplate(): ProjectTemplate {
    return {
      files: {
        'package.json': this.getNodejsExpressPackageJson(),
        'tsconfig.json': this.getTsConfig('nodejs'),
        '.eslintrc.js': this.getEslintConfig('nodejs'),
        '.prettierrc': this.getPrettierConfig(),
        'jest.config.js': this.getJestConfig('nodejs'),
        '.env.example': () => this.getEnvTemplate('nodejs'),
      },
      dependencies: {
        'express': '^4.18.2',
        'cors': '^2.8.5',
        'helmet': '^7.1.0',
        'dotenv': '^16.3.1',
      },
      devDependencies: {
        '@types/express': '^4.17.21',
        '@types/node': '^20.10.5',
        'typescript': '^5.3.3',
        'ts-node-dev': '^2.0.0',
        'jest': '^29.7.0',
        '@types/jest': '^29.5.11',
      },
    };
  }

  /**
   * 更新 package.json
   */
  private async updatePackageJson(
    targetDir: string,
    template: ProjectTemplate
  ): Promise<void> {
    const packageJsonPath = path.join(targetDir, 'package.json');

    let packageJson: any = {};

    if (await fs.pathExists(packageJsonPath)) {
      packageJson = await fs.readJson(packageJsonPath);
    }

    // 合并依赖
    if (template.dependencies) {
      packageJson.dependencies = {
        ...packageJson.dependencies,
        ...template.dependencies,
      };
    }

    if (template.devDependencies) {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        ...template.devDependencies,
      };
    }

    if (template.scripts) {
      packageJson.scripts = {
        ...packageJson.scripts,
        ...template.scripts,
      };
    }

    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    console.log(`  ✓ 更新 package.json`);
  }

  // ========== 配置文件生成方法 ==========

  private getReactVitePackageJson(): string {
    return JSON.stringify(
      {
        name: 'my-react-app',
        version: '1.0.0',
        type: 'module',
        scripts: {
          dev: 'vite',
          build: 'tsc && vite build',
          preview: 'vite preview',
          test: 'jest',
          lint: 'eslint src --ext ts,tsx',
          format: 'prettier --write "src/**/*.{ts,tsx}"',
        },
      },
      null,
      2
    );
  }

  private getNextjsPackageJson(): string {
    return JSON.stringify(
      {
        name: 'my-nextjs-app',
        version: '1.0.0',
        scripts: {
          dev: 'next dev',
          build: 'next build',
          start: 'next start',
          lint: 'next lint',
          test: 'jest',
        },
      },
      null,
      2
    );
  }

  private getNodejsExpressPackageJson(): string {
    return JSON.stringify(
      {
        name: 'my-api',
        version: '1.0.0',
        main: 'dist/index.js',
        scripts: {
          dev: 'ts-node-dev src/index.ts',
          build: 'tsc',
          start: 'node dist/index.js',
          test: 'jest',
          lint: 'eslint src --ext .ts',
        },
      },
      null,
      2
    );
  }

  private getTsConfig(type: string): string {
    const configs: Record<string, any> = {
      react: {
        compilerOptions: {
          target: 'ES2020',
          useDefineForClassFields: true,
          lib: ['ES2020', 'DOM', 'DOM.Iterable'],
          module: 'ESNext',
          skipLibCheck: true,
          moduleResolution: 'bundler',
          allowImportingTsExtensions: true,
          resolveJsonModule: true,
          isolatedModules: true,
          noEmit: true,
          jsx: 'react-jsx',
          strict: true,
          noUnusedLocals: true,
          noUnusedParameters: true,
          noFallthroughCasesInSwitch: true,
        },
        include: ['src'],
        references: [{ path: './tsconfig.node.json' }],
      },
      nextjs: {
        compilerOptions: {
          target: 'es5',
          lib: ['dom', 'dom.iterable', 'esnext'],
          allowJs: true,
          skipLibCheck: true,
          strict: true,
          forceConsistentCasingInFileNames: true,
          noEmit: true,
          esModuleInterop: true,
          module: 'esnext',
          moduleResolution: 'bundler',
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: 'preserve',
          incremental: true,
          plugins: [
            {
              name: 'next',
            },
          ],
          paths: {
            '@/*': ['./src/*'],
          },
        },
        include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
        exclude: ['node_modules'],
      },
      nodejs: {
        compilerOptions: {
          target: 'ES2020',
          module: 'commonjs',
          lib: ['ES2020'],
          outDir: './dist',
          rootDir: './src',
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          resolveJsonModule: true,
          declaration: true,
          sourceMap: true,
          moduleResolution: 'node',
          types: ['node'],
        },
        include: ['src/**/*'],
        exclude: ['node_modules', 'dist', '**/*.test.ts'],
      },
    };

    return JSON.stringify(configs[type] || configs.react, null, 2);
  }

  private getEslintConfig(type: string): string {
    const configs: Record<string, any> = {
      react: {
        root: true,
        env: { browser: true, es2020: true },
        extends: [
          'eslint:recommended',
          'plugin:@typescript-eslint/recommended',
          'plugin:react-hooks/recommended',
        ],
        parser: '@typescript-eslint/parser',
        parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
        plugins: ['react-refresh'],
        rules: { 'react-refresh/only-export-components': 'warn' },
      },
      nextjs: {
        extends: ['next/core-web-vitals'],
        rules: {},
      },
      nodejs: {
        env: { node: true, es2021: true },
        extends: [
          'eslint:recommended',
          'plugin:@typescript-eslint/recommended',
        ],
        parser: '@typescript-eslint/parser',
        parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
      },
    };

    return `module.exports = ${JSON.stringify(configs[type] || configs.react, null, 2)}`;
  }

  private getPrettierConfig(): string {
    return JSON.stringify(
      {
        semi: true,
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
      },
      null,
      2
    );
  }

  private getViteConfig(): string {
    return `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});`;
  }

  private getNextConfig(): string {
    return `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;`;
  }

  private getJestConfig(type: string = 'react'): string {
    return `module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/vite-env.d.ts',
  ],
};`;
  }

  private getEnvTemplate(type: string): string {
    const templates: Record<string, string> = {
      nodejs: `# Environment Variables
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp
DB_USER=postgres
DB_PASSWORD=password

# JWT Secret
JWT_SECRET=your-secret-key

# Cache
REDIS_HOST=localhost
REDIS_PORT=6379
`,
    };

    return templates[type] || '';
  }
}

/**
 * 工厂函数：创建配置生成器
 */
export function createConfigGenerator(options: ConfigOptions): ConfigGenerator {
  return new ConfigGenerator(options);
}
