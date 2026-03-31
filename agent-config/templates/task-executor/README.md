# 任务执行器模板
专注于任务执行、验证和报告的Agent模板。

## 📁 模板结构

```
task-executor/
├── taskExecutor.js     # 核心执行器
├── validator.js       # 验证器
├── reporter.js        # 报告器
└── package.json
```

## 🚀 使用方法

```javascript
import { TaskExecutor } from './taskExecutor.js';

const executor = new TaskExecutor({
  maxRetries: 3,
  timeout: 60000,
});

// 执行任务
const result = await executor.execute({
  name: 'my-task',
  handler: async () => {
    // 任务逻辑
    return 'result';
  },
  validator: (result) => {
    return result !== null;
  },
});
```

## ✨ 特性

- ✅ 任务队列管理
- ✅ 自动重试机制
- ✅ 结果验证
- ✅ 详细的执行报告
- ✅ 错误处理和恢复

## 📊 任务类型

### 1. 简单任务
```javascript
{
  type: 'simple',
  handler: () => { /* 逻辑 */ }
}
```

### 2. 条件任务
```javascript
{
  type: 'conditional',
  condition: () => true,
  handler: () => { /* 逻辑 */ }
}
```

### 3. 并行任务
```javascript
{
  type: 'parallel',
  tasks: [task1, task2, task3]
}
```

### 4. 顺序任务
```javascript
{
  type: 'sequential',
  tasks: [task1, task2, task3]
}
```

## 🔧 配置选项

```javascript
{
  maxRetries: 3,         // 最大重试次数
  timeout: 60000,        // 超时时间（毫秒）
  logging: true,         // 是否记录日志
  reportFormat: 'json'   // 报告格式
}
```

## 📖 详细文档

查看代码注释了解详细API。
